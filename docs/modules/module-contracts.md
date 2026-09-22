# Module Contracts — Bảng sở hữu, Flyway và Event

Tài liệu này chốt ranh giới module, bảng sở hữu, vùng Flyway migration và event contract giữa các module. Mỗi owner chỉ tạo migration và sửa bảng trong phạm vi module của mình.

## 1. Phân vùng Flyway migration

| Module | Owner | Vùng version | Ví dụ |
|--------|-------|-------------|-------|
| M1 — Core Identity & Organization | Phước | V1 – V99 | `V2__create_users.sql`, `V3__create_roles.sql` |
| M2 — Online Admissions Portal | Sơn | V100 – V199 | `V100__create_admission_campaigns.sql` |
| M3 — Academic & Timetable | Tài | V200 – V299 | `V200__create_subjects.sql` |
| M4 — Grades & Attendance | Thái | V300 – V399 | `V300__create_grade_components.sql` |
| M5 — Family, Notification & Finance | Phát | V400 – V499 | `V400__create_parents.sql` |

> **Lưu ý**: `V1__baseline.sql` đã tồn tại và chỉ chứa `SELECT 1`. Mỗi owner bắt đầu từ version đầu tiên trong vùng của mình.

## 2. Bảng sở hữu chi tiết

### M1 — Core Identity & Organization (Phước)

| Bảng | Mô tả |
|------|-------|
| `users` | Tài khoản người dùng (email, password hash, status) |
| `roles` | Vai trò hệ thống (SYSTEM_ADMIN, ACADEMIC_ADMIN, ...) |
| `permissions` | Quyền cụ thể (READ_STUDENTS, MANAGE_GRADES, ...) |
| `user_roles` | Gán vai trò cho user |
| `role_permissions` | Gán quyền cho vai trò |
| `refresh_tokens` | JWT refresh token storage |
| `audit_logs` | Nhật ký thay đổi nhạy cảm |
| `academic_years` | Năm học |
| `semesters` | Học kỳ theo năm học |

### M2 — Online Admissions Portal (Sơn)

| Bảng | Mô tả |
|------|-------|
| `admission_campaigns` | Đợt tuyển sinh (tên, mốc thời gian, trạng thái) |
| `admission_programs` | Chương trình/ngành tuyển sinh trong đợt |
| `applications` | Hồ sơ tuyển sinh của ứng viên |
| `application_documents` | Minh chứng đính kèm (metadata + object key) |
| `application_preferences` | Nguyện vọng xếp theo thứ tự ưu tiên |
| `application_reviews` | Lịch sử kiểm tra/đánh giá hồ sơ |
| `admission_results` | Kết quả xét tuyển + admission number |

### M3 — Academic & Timetable (Tài)

| Bảng | Mô tả |
|------|-------|
| `teachers` | Hồ sơ giáo viên (liên kết user_id) |
| `students` | Hồ sơ học sinh (liên kết user_id) |
| `subjects` | Môn học |
| `rooms` | Phòng học (loại, sức chứa) |
| `classes` | Lớp học (niên khóa, chương trình) |
| `class_students` | Học sinh thuộc lớp |
| `teaching_assignments` | Phân công giáo viên → lớp/môn |
| `time_slots` | Khung giờ chuẩn (tiết 1, tiết 2, ...) |
| `timetable_versions` | Phiên bản thời khóa biểu (draft/published) |
| `timetable_entries` | Mỗi ô trong thời khóa biểu |
| `teacher_unavailabilities` | Khoảng giáo viên không rảnh |
| `exams` | Kỳ thi / bài kiểm tra |
| `exam_schedules` | Lịch thi (phòng, thời gian) |

### M4 — Grades & Attendance (Thái)

| Bảng | Mô tả |
|------|-------|
| `grade_components` | Cột điểm thành phần (tên, trọng số, lớp/môn) |
| `student_grades` | Điểm từng học sinh theo cột |
| `teacher_comments` | Nhận xét giáo viên cho học sinh |
| `class_sessions` | Buổi học cụ thể (từ timetable entry) |
| `attendance_records` | Bản ghi điểm danh từng học sinh |
| `qr_attendance_tokens` | Token QR sinh cho phiên điểm danh |

### M5 — Family, Notification & Finance (Phát)

| Bảng | Mô tả |
|------|-------|
| `parents` | Hồ sơ phụ huynh (liên kết user_id) |
| `parent_students` | Liên kết phụ huynh ↔ học sinh |
| `notifications` | Thông báo hệ thống |
| `notification_recipients` | Người nhận + trạng thái đọc |
| `tuition_invoices` | Hóa đơn học phí |
| `invoice_items` | Chi tiết khoản thu trong hóa đơn |
| `payment_transactions` | Giao dịch thanh toán + đối soát |

## 3. Event contract giữa các module

Các module giao tiếp qua Spring Application Event (nội bộ JVM). Không dùng message broker ở MVP.

### M2 → M1/M3: Ứng viên trúng tuyển

```
Event: ADMISSION_ACCEPTED
Payload:
  applicationId: Long
  admissionNumber: String
  programId: Long
  applicantProfile:
    firstName: String
    lastName: String
    dateOfBirth: LocalDate
    email: String
    phone: String
Trigger: Khi admission_result.status = ADMITTED
Consumer: M1 tạo user account (role STUDENT), M3 tạo student record
```

### M4 → M5: Điểm được công bố

```
Event: GRADE_PUBLISHED
Payload:
  classId: Long
  subjectId: String
  semesterId: Long
  teacherId: Long
Trigger: Khi giáo viên publish điểm cuối kỳ
Consumer: M5 tạo notification cho phụ huynh liên kết
```

### M4 → M5: Trạng thái điểm danh thay đổi

```
Event: ATTENDANCE_CHANGED
Payload:
  studentId: Long
  sessionId: Long
  status: "LATE" | "ABSENT"
  teacherId: Long
  timestamp: Instant
Trigger: Khi attendance_record được tạo/cập nhật với status LATE hoặc ABSENT
Consumer: M5 tạo notification realtime cho phụ huynh
```

### M5 → M1: Thanh toán cập nhật

```
Event: PAYMENT_UPDATED
Payload:
  invoiceId: Long
  studentId: Long
  status: "PAID" | "CANCELLED" | "REFUNDED"
  amount: BigDecimal
  updatedBy: Long
Trigger: Khi payment_transaction được tạo/xác nhận
Consumer: M1 ghi audit log
```

## 4. Quy tắc tích hợp

1. **Không truy cập bảng module khác trực tiếp.** Dùng API hoặc event.
2. **Chỉ đọc ID từ module khác** qua interface/service đã thống nhất. Ví dụ: M4 cần `classId` từ M3, gọi `AcademicQueryService.getClass(id)`.
3. **Mock contract** khi API thật chưa có. Frontend dùng mock JSON từ `docs/api/`.
4. **Không sửa migration đã chạy** trên database người khác.
5. **Event là fire-and-forget** ở MVP. Consumer lỗi không ảnh hưởng producer.
