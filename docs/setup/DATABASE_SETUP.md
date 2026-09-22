# Thiết lập MySQL cho EduMS

EduMS dùng MySQL 8.x. Mỗi thành viên chạy một database local riêng; cấu trúc được đồng bộ bằng Flyway migration trong Git. Docker Desktop là tùy chọn hỗ trợ, không phải yêu cầu bắt buộc.

## Quy ước chung

- Database: `edums`
- Development user: `edums_app`
- Port mặc định: `3306`
- Character set: `utf8mb4`
- Collation: `utf8mb4_0900_ai_ci`
- Thời gian lưu trong database: UTC
- JPA chỉ `validate`; không dùng `ddl-auto=update`.
- Không chỉnh bảng thủ công. Mọi thay đổi schema phải đi qua Flyway migration.

## Chuẩn bị biến môi trường

Từ thư mục gốc repository, sao chép file mẫu:

```powershell
Copy-Item .env.example .env
```

`.env` chỉ dùng local và đã được `.gitignore` loại trừ. Các giá trị mẫu chỉ dành cho môi trường phát triển.

## Cách A - Docker Desktop

Khởi động Docker Desktop, sau đó chạy tại thư mục gốc:

```powershell
docker compose up -d mysql
docker compose ps
```

Docker chỉ mở MySQL trên `127.0.0.1`, vì vậy database local không bị công khai ra mạng LAN/Internet.

Xem log khi cần:

```powershell
docker compose logs -f mysql
```

Dừng container mà vẫn giữ dữ liệu:

```powershell
docker compose stop mysql
```

Không chạy `docker compose down -v` nếu chưa chủ động muốn xóa toàn bộ dữ liệu local.

## Cách B - MySQL cài trực tiếp

Cài MySQL 8.x, đăng nhập bằng tài khoản quản trị và chạy:

```sql
CREATE DATABASE edums
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_0900_ai_ci;

CREATE USER 'edums_app'@'localhost'
    IDENTIFIED BY 'edums_dev_password';

GRANT ALL PRIVILEGES ON edums.* TO 'edums_app'@'localhost';
FLUSH PRIVILEGES;
```

Nếu thay thông tin đăng nhập, cập nhật `.env` hoặc biến môi trường trên máy; không sửa giá trị riêng vào file được commit.

## Chạy backend

Từ `backend/`:

```powershell
.\mvnw.cmd spring-boot:run
```

Profile mặc định `dev` đọc cấu hình MySQL từ biến môi trường hoặc file `.env` ở thư mục gốc. Khi backend khởi động, Flyway tự chạy migration từ:

```text
backend/src/main/resources/db/migration/
```

Kiểm tra kết nối:

```text
GET http://localhost:8080/api/health
```

Khi thành công, `data.database` trả về `UP`.

## Quy tắc Flyway

1. Không sửa migration đã được chia sẻ hoặc đã chạy trên database của người khác.
2. Mỗi thay đổi schema tạo một migration mới.
3. Tên file theo mẫu `V<version>__<description>.sql`.
4. Chỉ dùng chữ thường, chữ số và dấu gạch dưới trong phần mô tả.
5. Không đưa dữ liệu cá nhân hoặc mật khẩu thật vào migration.
6. Dữ liệu demo/dev đặt trong `db/seed`, không tự động chạy ở production.
7. Vùng version cho từng module sẽ được khóa ở Giai đoạn 7 trước khi các thành viên phát triển song song.

Migration `V1__baseline.sql` chỉ xác nhận Flyway hoạt động và chưa tạo bảng nghiệp vụ trước khi ERD/contract được duyệt.

## Database dùng chung của nhóm

Trong quá trình code hằng ngày, “dùng chung” có nghĩa là cùng MySQL 8.x, cùng migration và cùng quy ước; không phải cùng truy cập MySQL trên máy một thành viên.

Khi cần tích hợp hoặc demo, nhóm có thể tạo thêm một MySQL development/staging được quản lý trên cloud. Không mở cổng `3306` từ Docker Desktop của máy cá nhân ra Internet.

