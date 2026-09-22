# Quy ước chung EduMS

Tài liệu này chốt các quy ước dùng chung cho toàn bộ hệ thống EduMS. Mọi thành viên phải tuân theo khi phát triển module của mình.

## 1. ID và khóa chính

| Quy ước | Chi tiết |
|---------|----------|
| Kiểu PK | `BIGINT AUTO_INCREMENT` cho tất cả bảng chính |
| Public-facing ID | UUID v4 string cho token công khai (QR token, admission number, mã mời phụ huynh, mã đối soát thanh toán) |
| Foreign key | Cùng kiểu với PK được tham chiếu (`BIGINT`) |
| Soft delete | Dùng cột `deleted_at DATETIME NULL` khi cần; không xóa vật lý dữ liệu nghiệp vụ quan trọng |

## 2. Database naming

| Quy ước | Ví dụ |
|---------|-------|
| Tên bảng | `snake_case`, số ít: `application`, `class_session`, `student_grade` |
| Tên cột | `snake_case`: `first_name`, `created_at`, `academic_year_id` |
| Foreign key | `<bảng_tham_chiếu>_id`: `user_id`, `class_id`, `semester_id` |
| Index | `idx_<bảng>_<cột>`: `idx_application_status`, `idx_student_grade_class_id` |
| Unique constraint | `uq_<bảng>_<cột>`: `uq_user_email`, `uq_admission_result_number` |
| Không prefix module | Tên bảng theo đặc tả gốc, không thêm prefix `adm_`, `aca_`, v.v. |
| Character set | `utf8mb4`, collation `utf8mb4_0900_ai_ci` |
| Thời gian | Lưu UTC trong database; cột dùng `DATETIME` hoặc `TIMESTAMP` |

## 3. Cột chuẩn mỗi bảng

Mỗi bảng chính phải có các cột audit tối thiểu:

```sql
id          BIGINT       NOT NULL AUTO_INCREMENT PRIMARY KEY,
created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

Bảng có soft delete thêm:

```sql
deleted_at  DATETIME     NULL DEFAULT NULL
```

## 4. API format

### 4.1. URL

| Quy ước | Chi tiết |
|---------|----------|
| Base path | `/api/` |
| Resource | `kebab-case`, số nhiều: `/api/applications`, `/api/teaching-assignments` |
| Nested resource | `/api/classes/{classId}/grades`, `/api/sessions/{sessionId}/attendance` |
| Action endpoint | `POST /api/timetables/generate`, `POST /api/applications/{id}/submit` |
| Versioning | Không version URL ở MVP; dùng header nếu cần sau này |

### 4.2. Response envelope

Tất cả API response dùng envelope `ApiResponse<T>` đã có:

```json
{
  "success": true,
  "data": { ... },
  "error": null,
  "timestamp": "2026-09-21T14:30:00Z"
}
```

Error response:

```json
{
  "success": false,
  "data": null,
  "error": {
    "status": 400,
    "code": "VALIDATION_ERROR",
    "message": "Dữ liệu gửi lên không hợp lệ.",
    "path": "/api/applications",
    "details": {
      "firstName": "Không được để trống."
    }
  },
  "timestamp": "2026-09-21T14:30:00Z"
}
```

### 4.3. Error code chuẩn

| Code | HTTP Status | Ý nghĩa |
|------|-------------|----------|
| `VALIDATION_ERROR` | 400 | Dữ liệu đầu vào không hợp lệ |
| `INVALID_REQUEST_BODY` | 400 | Body không đúng JSON/format |
| `INVALID_PARAMETER` | 400 | Query/path param sai kiểu |
| `UNAUTHORIZED` | 401 | Chưa đăng nhập hoặc token hết hạn |
| `FORBIDDEN` | 403 | Không có quyền truy cập |
| `RESOURCE_NOT_FOUND` | 404 | Không tìm thấy tài nguyên |
| `CONFLICT` | 409 | Trùng dữ liệu hoặc vi phạm ràng buộc |
| `INTERNAL_SERVER_ERROR` | 500 | Lỗi hệ thống ngoài dự kiến |

### 4.4. Phân trang

Request:

```
GET /api/students?page=0&size=20&sort=lastName,asc
```

Response `data` cho danh sách phân trang:

```json
{
  "content": [ ... ],
  "page": 0,
  "size": 20,
  "totalElements": 142,
  "totalPages": 8
}
```

### 4.5. Datetime format

- API request/response: ISO-8601 UTC — `2026-09-21T14:30:00Z`
- Frontend hiển thị: chuyển sang `Asia/Ho_Chi_Minh` trên client
- Database: UTC

## 5. Authentication và Authorization

### 5.1. Xác thực

| Cơ chế | Chi tiết |
|--------|----------|
| Đăng nhập | `POST /api/auth/login` với email + password |
| Token | JWT Access Token (ngắn hạn, 15 phút) + Refresh Token (dài hạn, 7 ngày) |
| Mật khẩu | BCrypt với strength 12 |
| Header | `Authorization: Bearer <access_token>` |
| Refresh | `POST /api/auth/refresh` với refresh token trong body |
| Đăng xuất | `POST /api/auth/logout` — revoke refresh token |

### 5.2. Vai trò (Role)

7 vai trò theo đặc tả §2:

| Role | Code | Phạm vi dữ liệu |
|------|------|-----------------|
| Quản trị hệ thống | `SYSTEM_ADMIN` | Quản trị tài khoản, vai trò, cấu hình, audit log |
| Quản trị đào tạo | `ACADEMIC_ADMIN` | Dữ liệu đào tạo toàn đơn vị |
| Cán bộ tuyển sinh | `ADMISSIONS_OFFICER` | Hồ sơ thuộc đợt tuyển sinh được phân công |
| Giáo viên | `TEACHER` | Chỉ lớp/môn được phân công |
| Học sinh | `STUDENT` | Chỉ dữ liệu của bản thân |
| Phụ huynh | `PARENT` | Chỉ học sinh đã xác nhận liên kết |
| Ứng viên | `APPLICANT` | Chỉ hồ sơ tuyển sinh của chính mình |

### 5.3. Nguyên tắc phân quyền

1. Backend là lớp bảo mật chính; frontend chỉ ẩn UI, không thay thế kiểm tra quyền.
2. Mỗi endpoint phải có annotation `@PreAuthorize` hoặc kiểm tra role/ownership trong service.
3. Ownership check: giáo viên chỉ thấy lớp mình, phụ huynh chỉ thấy con mình, v.v.
4. Mặc định `denyAll()`; chỉ mở quyền cho endpoint cụ thể.

## 6. Quy ước code

### 6.1. Backend (Java/Spring Boot)

| Quy ước | Chi tiết |
|---------|----------|
| Package | `com.edums.<module>`: `com.edums.identity`, `com.edums.admission`, `com.edums.academic`, `com.edums.grade`, `com.edums.attendance`, `com.edums.family`, `com.edums.finance`, `com.edums.notification` |
| Entity | PascalCase, singular: `Application`, `ClassSession`, `StudentGrade` |
| Repository | `<Entity>Repository`: `ApplicationRepository` |
| Service | `<Entity>Service` hoặc `<Feature>Service`: `ApplicationService`, `TimetableGeneratorService` |
| Controller | `<Entity>Controller`: `ApplicationController` |
| DTO | `<Action><Entity>Request/Response`: `CreateApplicationRequest`, `ApplicationResponse` |

### 6.2. Frontend (TypeScript/Next.js)

| Quy ước | Chi tiết |
|---------|----------|
| Component | PascalCase: `HealthCheck`, `ApplicationForm`, `GradeTable` |
| File | kebab-case: `health-check.tsx`, `application-form.tsx` |
| Route | App Router: `app/(role)/feature/page.tsx` |
| API client | `lib/api/<module>.ts` |
| Types | `types/<module>.ts` |

## 7. Git convention

| Quy ước | Chi tiết |
|---------|----------|
| Branch | `feat/M<x>-ten-chuc-nang`, `fix/M<x>-mo-ta`, `docs/M<x>-mo-ta` |
| Commit message | `feat(M<x>): mô tả ngắn`, `fix(M3): sửa conflict detector` |
| PR | Mô tả phạm vi + cách test + ảnh/video nếu UI |
| Review | Ít nhất 1 reviewer; schema/auth/payment cần 2 reviewer |
| Merge | Không tự merge PR của mình |
