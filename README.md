# EduMS

**Comprehensive Education Management & Online Admissions Portal** là nền tảng quản trị giáo dục và cổng tuyển sinh trực tuyến. Hệ thống hướng tới các nhóm người dùng: ứng viên, cán bộ tuyển sinh, quản trị đào tạo, giáo viên, học sinh và phụ huynh.

## Trạng thái hiện tại

Repository đã hoàn thành **Giai đoạn 2 - Spring Boot baseline** và **Giai đoạn 4 - Next.js baseline**. Phần cấu hình của Giai đoạn 3 đã có, nhưng việc chạy MySQL thực tế vẫn chờ Docker Desktop trên máy hoạt động ổn định. CI và hợp đồng module sẽ được thiết lập trong các giai đoạn tiếp theo; dự án chưa được xem là chạy end-to-end.

Lộ trình baseline được theo dõi tại [docs/BASELINE_ROADMAP.md](docs/BASELINE_ROADMAP.md).

## Công nghệ đã thống nhất

- Backend: Java 21, Spring Boot 3.x, Spring Security, Spring Data JPA.
- Frontend: Next.js App Router, TypeScript, Tailwind CSS.
- Database: MySQL 8.x và Flyway migration.
- Local database: hỗ trợ cả Docker Desktop và MySQL cài trực tiếp.
- CI: GitHub Actions.

## Cấu trúc repository

```text
.
├── backend/          Spring Boot API
├── frontend/         Next.js web application (khởi tạo ở Giai đoạn 4)
├── docs/             Đặc tả, kế hoạch và tài liệu kỹ thuật
├── .github/          Workflow và mẫu cộng tác GitHub
├── .env.example      Danh sách biến môi trường mẫu
├── .gitignore        Quy tắc loại trừ file local/build/secret
└── README.md         Hướng dẫn tổng quan dự án
```

## Tài liệu nghiệp vụ

- [Đặc tả đề tài](docs/01_DacTaDeTai_EduMS_DeTai5.md)
- [Phân công theo module](docs/02_PhanCongTheoModule_EduMS_DeTai5.md)
- [Kế hoạch 12 tuần](docs/03_KeHoach12Tuan_EduMS_DeTai5.md)

## Quy tắc môi trường

1. Không commit `.env`, mật khẩu, token, khóa API hoặc dữ liệu cá nhân.
2. Sao chép `.env.example` thành `.env` và thay giá trị phù hợp trên máy cá nhân.
3. Thành viên có thể dùng MySQL trong Docker Desktop hoặc MySQL cài trực tiếp, nhưng phải dùng cùng MySQL 8.x và cùng Flyway migration.
4. Không tự chỉnh schema database bằng công cụ quản trị rồi giữ thay đổi chỉ trên máy cá nhân.

## Backend hiện tại

Yêu cầu Java 21. Có thể chạy backend baseline bằng Maven Wrapper:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

Trên macOS/Linux:

```bash
cd backend
./mvnw spring-boot:run
```

Health endpoint: `GET http://localhost:8080/api/health`.

Profile mặc định hiện tại là `dev` và yêu cầu MySQL. Hãy chuẩn bị database theo [hướng dẫn thiết lập database](docs/setup/DATABASE_SETUP.md), sau đó chạy backend. Profile `baseline` vẫn có thể dùng để khởi động không có database khi kiểm tra nền tảng. Xem thêm [backend/README.md](backend/README.md).

## Frontend hiện tại

Yêu cầu Node.js 20.9 trở lên. Từ thư mục `frontend/`:

```powershell
npm ci
Copy-Item .env.example .env.local
npm run dev
```

Mở `http://localhost:3000`. Đây chỉ là trang kiểm tra kỹ thuật gọi `/api/health`, chưa phải UI nghiệp vụ. Xem [frontend/README.md](frontend/README.md) để biết cách lint và build.

## Quy tắc cộng tác tạm thời

- `main` chỉ nhận baseline hoặc Pull Request đã được kiểm tra.
- Không đưa build artifact như `target/`, `.next/`, `node_modules/` lên Git.
- Chưa tạo branch module trước khi hoàn thành baseline và Module-ready contract.
- Mỗi module sau này đi theo chu trình: `DB → Backend → Frontend → Test → Documentation`.
