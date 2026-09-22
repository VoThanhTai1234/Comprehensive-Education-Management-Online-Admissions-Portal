# Lộ trình baseline EduMS trước khi làm UI bằng Antigravity

Tài liệu này ghi lại trình tự đã thống nhất cho repository EduMS. Antigravity chỉ được sử dụng sau khi tám giai đoạn dưới đây hoàn thành và baseline đã được kiểm tra.

## Nguyên tắc chung

- Giữ MySQL 8.x đúng với đặc tả và dependency backend hiện tại.
- Docker Desktop là cách chạy MySQL tùy chọn, không phải điều kiện bắt buộc cho mọi thành viên.
- Người không dùng Docker có thể cài MySQL 8.x trực tiếp và chạy cùng Flyway migration.
- Không chia branch module trước khi baseline và Module-ready contract được chốt.
- Không commit secret, `.env`, dữ liệu cá nhân hoặc build artifact.

## Giai đoạn 1 - Chuẩn hóa repository

**Trạng thái:** Hoàn thành.

- Chuẩn hóa `backend/`, `frontend/`, `docs/`, `.github/`.
- Hoàn thiện khung `.gitignore`, `.env.example`, `README.md` và `.editorconfig`.
- Giữ tài liệu đặc tả, phân công và kế hoạch trong `docs/`.
- Chưa cài frontend, chưa cấu hình database, chưa commit hoặc push.

## Giai đoạn 2 - Hoàn thiện Spring Boot baseline

**Trạng thái:** Hoàn thành.

- Chuẩn hóa cấu hình Spring Boot và package nền.
- Thêm cấu hình môi trường, CORS, error response và health endpoint.
- Đảm bảo backend compile/test ở mức baseline.
- Chưa triển khai đầy đủ nghiệp vụ hoặc Auth/RBAC.

Kết quả: backend có profile `baseline` chưa phụ thuộc database, response envelope, exception handler, CORS, security mặc định từ chối và `GET /api/health`. MySQL/JPA được tạm tắt ở profile này và sẽ được bật lại tại Giai đoạn 3.

Kiểm chứng local: main source và test source biên dịch thành công; toàn bộ test chạy đạt; ứng dụng khởi động; health endpoint và CORS hoạt động đúng. Trên máy hiện tại Maven cần dùng Windows trust store bằng `-Djavax.net.ssl.trustStoreType=Windows-ROOT`; xác minh TLS vẫn được giữ nguyên.

## Giai đoạn 3 - MySQL, Docker Compose và Flyway

**Trạng thái:** Hoàn thành.

- Dùng MySQL 8.x.
- Thêm Docker Compose cho thành viên sử dụng Docker Desktop.
- Viết hướng dẫn MySQL cài trực tiếp cho thành viên không dùng Docker.
- Thêm Flyway migration nền và quy trình dữ liệu mẫu an toàn.

Kết quả: đã thêm `compose.yaml` dùng MySQL 8.4, profile `dev`, DataSource/JPA validation, Flyway MySQL, migration `V1__baseline.sql`, health check database và hướng dẫn cho cả Docker lẫn MySQL cài trực tiếp. `docker compose config` hợp lệ và backend/test biên dịch thành công.

Kiểm chứng runtime: Docker Desktop 4.91.0, MySQL 8.4 container healthy, Flyway tạo `flyway_schema_history` và apply `V1__baseline` thành công, `/api/health` trả `database: UP`, CORS preflight hoạt động đúng.

## Giai đoạn 4 - Next.js baseline

**Trạng thái:** Hoàn thành.

- Khởi tạo Next.js App Router, TypeScript, Tailwind CSS và ESLint.
- Thêm API client và biến môi trường frontend.
- Chỉ tạo giao diện kỹ thuật tối giản, chưa thiết kế UI nghiệp vụ.

Kết quả: frontend dùng Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS 4 và ESLint. Đã có API client có kiểu dữ liệu, biến `NEXT_PUBLIC_API_URL`, trang health kỹ thuật với trạng thái loading/error/retry và tài liệu chạy. `npm ci`, lint, production build và development server đều được kiểm tra thành công; chưa có UI nghiệp vụ.

## Giai đoạn 5 - Kiểm tra kết nối toàn hệ thống

**Trạng thái:** Hoàn thành.

- Kiểm tra `Next.js → Spring Boot → MySQL`.
- Kiểm tra backend khởi động, Flyway chạy và health endpoint phản hồi.
- Kiểm tra frontend development, lint và production build.

Kiểm chứng: MySQL 8.4 container healthy, Spring Boot khởi động với profile `dev` kết nối MySQL thành công, Flyway apply migration, `/api/health` trả `database: UP`. Frontend lint không lỗi, production build biên dịch thành công (Turbopack 675ms), dev server khởi động (497ms) tại `localhost:3000`, trang health check hiển thị `edums-backend: UP · Database: UP` xác nhận chuỗi `Next.js → Spring Boot → MySQL` hoạt động end-to-end.

## Giai đoạn 6 - GitHub Actions

**Trạng thái:** Hoàn thành.

- Thêm backend compile/test.
- Thêm frontend lint/build.
- Không đưa secret thật vào workflow.

Kết quả: đã tạo `.github/workflows/ci.yml` với hai job song song. Job `backend` dùng JDK 21 Temurin, Maven cache, compile và test với `SPRING_PROFILES_ACTIVE=baseline` (không cần MySQL). Job `frontend` dùng Node.js 22, npm cache, `npm ci`, lint và build. Workflow chạy trên push/PR vào `main`, không chứa secret. Tất cả bốn bước CI đã được kiểm tra thành công trên local.

## Giai đoạn 7 - Module-ready contract và tài liệu UI

**Trạng thái:** Hoàn thành.

- Chốt quy ước ID, database naming, API/error format và quyền truy cập (`docs/conventions.md`).
- Chốt bảng sở hữu, vùng Flyway và event contract của từng module (`docs/modules/module-contracts.md`).
- Tạo route map, screen map, role matrix, mock data và API contract (`docs/ui/` và `docs/api/`).

Kết quả: Toàn bộ tài liệu quy chuẩn, ma trận phân quyền, API mock và cấu trúc UI đã được hoàn thiện. Sẵn sàng chuyển qua Giai đoạn 8 để kiểm tra baseline, sau đó tiến hành phát triển song song.

## Giai đoạn 8 - Kiểm tra baseline

**Trạng thái:** Hoàn thành.

- Chạy toàn bộ kiểm tra backend, frontend, database và CI.
- Kiểm tra repository không chứa secret/build artifact.

Kết quả: Đã chạy `mvnw clean test` (profile `baseline`) thành công; `npm run lint` và `npm run build` thành công. Kiểm tra `.gitignore` cấu hình chuẩn, không có secret thật hay build artifact nào trong repository (`.env.example` an toàn). Dự án sạch và sẵn sàng.

## Sau Giai đoạn 8

1. Mở toàn bộ repository bằng Antigravity.
2. Cho Antigravity làm UI trong `frontend/` bằng mock data và tài liệu tại `docs/ui/`.
3. Không cho Antigravity tự thay đổi backend, migration, Docker hoặc CI.
4. Đưa kết quả UI trở lại Codex để kiểm tra lint/build, cấu trúc component và khả năng tích hợp API.
5. Commit UI shell đã kiểm tra.
6. Tạo branch module và triển khai `DB → Backend → Frontend → Test → Documentation`.
