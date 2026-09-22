# EduMS Backend

Spring Boot REST API cho EduMS.

## Yêu cầu

- Java 21
- Sử dụng Maven Wrapper có sẵn trong repository

## Chạy với MySQL

Profile mặc định là `dev`. Hãy chuẩn bị MySQL bằng Docker Desktop hoặc cài trực tiếp theo [DATABASE_SETUP.md](../docs/setup/DATABASE_SETUP.md), sau đó chạy backend.

Trên Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

Trên macOS/Linux:

```bash
./mvnw spring-boot:run
```

Kiểm tra:

```text
GET http://localhost:8080/api/health
```

Khi kết nối thành công, response có `data.database` bằng `UP`. Flyway tự chạy migration trong `src/main/resources/db/migration`.

Để khởi động riêng nền tảng mà không có database:

```powershell
.\mvnw.cmd spring-boot:run "-Dspring-boot.run.profiles=baseline"
```

## Biến môi trường development

| Biến | Mặc định | Mục đích |
| --- | --- | --- |
| `DB_HOST` | `localhost` | Máy chủ MySQL |
| `DB_PORT` | `3306` | Cổng MySQL |
| `DB_NAME` | `edums` | Tên database |
| `DB_USERNAME` | `edums_app` | Tài khoản development |
| `DB_PASSWORD` | `edums_dev_password` | Mật khẩu development mẫu |
| `DB_SSL_MODE` | `DISABLED` | SSL mode cho local; môi trường cloud phải cấu hình phù hợp |
| `BACKEND_PORT` | `8080` | Cổng HTTP của Spring Boot |
| `APP_VERSION` | `0.0.1-SNAPSHOT` | Phiên bản hiển thị qua health API |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:3000` | Danh sách origin frontend, phân tách bằng dấu phẩy |

Spring Boot có thể đọc file `.env` ở thư mục gốc hoặc biến môi trường của hệ điều hành/IDE. Không commit `.env`.

## Package nền

```text
com.edums
├── common
│   ├── api          Response envelope dùng chung
│   └── exception    Xử lý lỗi REST tập trung
├── config           CORS và Spring Security baseline
└── health           Health endpoint
```

Security baseline chỉ công khai `GET /api/health` và CORS preflight. Các endpoint khác bị từ chối mặc định cho đến khi Auth/RBAC được triển khai.

## Kiểm tra

```powershell
.\mvnw.cmd test
```

Nếu Maven báo `PKIX path building failed`, Java truststore trên máy chưa tin chứng chỉ của Maven Central hoặc proxy mạng. Cần bổ sung đúng CA vào môi trường Java/proxy rồi chạy lại; không nên vô hiệu hóa kiểm tra TLS.

Trên Windows, có thể yêu cầu Maven dùng Windows trusted root store mà vẫn giữ xác minh TLS:

```powershell
.\mvnw.cmd "-Djavax.net.ssl.trustStoreType=Windows-ROOT" test
```
