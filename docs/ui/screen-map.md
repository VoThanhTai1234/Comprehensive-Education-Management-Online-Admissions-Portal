# Screen Map — Danh sách màn hình theo module

Mỗi màn hình liệt kê: tên, mô tả chức năng chính, owner module và trạng thái phát triển.

## Trạng thái

- 🔲 `PLANNED` — Chưa bắt đầu
- 🟡 `MOCK` — Có mock data, chưa kết nối API thật
- 🟢 `DONE` — Hoàn thành và kết nối API

---

## M1 — Core Identity & Organization (Phước)

| # | Màn hình | Mô tả | Trạng thái |
|---|----------|-------|------------|
| 1.1 | Login | Form đăng nhập email/password | 🔲 PLANNED |
| 1.2 | Register (Applicant) | Form đăng ký tài khoản ứng viên | 🔲 PLANNED |
| 1.3 | Forgot Password | Form quên mật khẩu | 🔲 PLANNED |
| 1.4 | Profile | Thông tin cá nhân, đổi mật khẩu | 🔲 PLANNED |
| 1.5 | User Management | CRUD tài khoản, gán vai trò, trạng thái | 🔲 PLANNED |
| 1.6 | Role Management | CRUD vai trò, gán quyền | 🔲 PLANNED |
| 1.7 | Academic Year/Semester | Quản lý năm học, học kỳ | 🔲 PLANNED |
| 1.8 | Audit Log | Xem nhật ký kiểm toán, lọc theo thời gian/hành động | 🔲 PLANNED |
| 1.9 | Admin Dashboard | Tổng quan hệ thống: số user, lớp, hồ sơ, thống kê | 🔲 PLANNED |

## M2 — Online Admissions Portal (Sơn)

| # | Màn hình | Mô tả | Trạng thái |
|---|----------|-------|------------|
| 2.1 | Public Campaign List | Trang công khai danh sách đợt tuyển sinh (SSR/SEO) | 🔲 PLANNED |
| 2.2 | Public Campaign Detail | Chi tiết đợt: mốc thời gian, chương trình, hướng dẫn | 🔲 PLANNED |
| 2.3 | Applicant Dashboard | Tổng quan hồ sơ, trạng thái, thông báo | 🔲 PLANNED |
| 2.4 | Application Form | Form thông tin cá nhân/học tập, multi-step | 🔲 PLANNED |
| 2.5 | Document Upload | Tải minh chứng, preview, checklist | 🔲 PLANNED |
| 2.6 | Preference Ordering | Kéo thả nguyện vọng xếp thứ tự | 🔲 PLANNED |
| 2.7 | Application Submit | Xác nhận cam kết + nộp hồ sơ | 🔲 PLANNED |
| 2.8 | Result View | Xem kết quả xét tuyển, admission number | 🔲 PLANNED |
| 2.9 | Officer Queue | Hàng đợi hồ sơ chờ duyệt, lọc/tìm kiếm | 🔲 PLANNED |
| 2.10 | Officer Review | Chi tiết hồ sơ, xem file, yêu cầu bổ sung, quyết định | 🔲 PLANNED |
| 2.11 | Campaign Management | CRUD đợt tuyển sinh | 🔲 PLANNED |
| 2.12 | Result Publication | Công bố kết quả hàng loạt | 🔲 PLANNED |

## M3 — Academic & Timetable (Tài)

| # | Màn hình | Mô tả | Trạng thái |
|---|----------|-------|------------|
| 3.1 | Subject Management | CRUD môn học | 🔲 PLANNED |
| 3.2 | Class Management | CRUD lớp, gán học sinh | 🔲 PLANNED |
| 3.3 | Room Management | CRUD phòng học (loại, sức chứa) | 🔲 PLANNED |
| 3.4 | Teacher Management | CRUD giáo viên | 🔲 PLANNED |
| 3.5 | Student Management | CRUD học sinh | 🔲 PLANNED |
| 3.6 | Teaching Assignment | Phân công giáo viên → lớp/môn | 🔲 PLANNED |
| 3.7 | Timetable Generator | Chọn phạm vi + sinh TKB tự động + xem kết quả | 🔲 PLANNED |
| 3.8 | Timetable View (Matrix) | Ma trận tuần/lịch, danh sách Unscheduled | 🔲 PLANNED |
| 3.9 | Timetable Edit | Kéo thả/chỉnh slot, conflict check realtime | 🔲 PLANNED |
| 3.10 | Timetable Publish | Công bố TKB cho GV/HS/PH | 🔲 PLANNED |
| 3.11 | My Timetable (Teacher) | Xem TKB cá nhân giáo viên | 🔲 PLANNED |
| 3.12 | My Timetable (Student) | Xem TKB cá nhân học sinh | 🔲 PLANNED |
| 3.13 | Exam Management | CRUD kỳ thi/lịch thi | 🔲 PLANNED |
| 3.14 | Exam Schedule View | Xem lịch thi (HS/PH/GV) | 🔲 PLANNED |

## M4 — Grades & Attendance (Thái)

| # | Màn hình | Mô tả | Trạng thái |
|---|----------|-------|------------|
| 4.1 | Grade Component Config | Cấu hình cột điểm (tên, trọng số) theo lớp/môn | 🔲 PLANNED |
| 4.2 | Gradebook (Teacher) | Bảng nhập điểm hàng loạt, validation | 🔲 PLANNED |
| 4.3 | Comment Entry | Nhập nhận xét cho học sinh | 🔲 PLANNED |
| 4.4 | Grade Publish | Publish/unpublish điểm cuối kỳ | 🔲 PLANNED |
| 4.5 | My Grades (Student) | Xem điểm/nhận xét của bản thân | 🔲 PLANNED |
| 4.6 | Attendance Session | Mở/đóng phiên điểm danh, xem sĩ số realtime | 🔲 PLANNED |
| 4.7 | QR Display (Teacher) | Hiển thị QR code cho học sinh quét | 🔲 PLANNED |
| 4.8 | QR Scan (Student) | Quét QR điểm danh trên mobile web | 🔲 PLANNED |
| 4.9 | Attendance List | Danh sách điểm danh, chỉnh ngoại lệ, chốt phiên | 🔲 PLANNED |
| 4.10 | My Attendance (Student) | Xem chuyên cần cá nhân | 🔲 PLANNED |

## M5 — Family, Notification & Finance (Phát)

| # | Màn hình | Mô tả | Trạng thái |
|---|----------|-------|------------|
| 5.1 | Parent Linkage | Liên kết phụ huynh ↔ học sinh (mã mời) | 🔲 PLANNED |
| 5.2 | Family Dashboard | Tổng quan con: điểm, chuyên cần, lịch, học phí | 🔲 PLANNED |
| 5.3 | Child Grades View | Điểm/nhận xét của con (read-only) | 🔲 PLANNED |
| 5.4 | Child Attendance View | Chuyên cần của con | 🔲 PLANNED |
| 5.5 | Notification Center | Danh sách thông báo, unread/read, lịch sử | 🔲 PLANNED |
| 5.6 | Realtime Toast | Toast thông báo vắng/trễ (WebSocket/SSE) | 🔲 PLANNED |
| 5.7 | Tuition Invoice List | Danh sách hóa đơn, trạng thái, hạn | 🔲 PLANNED |
| 5.8 | Invoice Detail + VietQR | Chi tiết hóa đơn + sinh mã QR thanh toán | 🔲 PLANNED |
| 5.9 | Payment Reconciliation | Đối soát thanh toán (admin) | 🔲 PLANNED |
| 5.10 | Tuition Overview (Student) | Xem học phí cá nhân + VietQR | 🔲 PLANNED |

---

## Tổng kết

| Module | Số màn hình | Owner |
|--------|------------|-------|
| M1 | 9 | Phước |
| M2 | 12 | Sơn |
| M3 | 14 | Tài |
| M4 | 10 | Thái |
| M5 | 10 | Phát |
| **Tổng** | **55** | |
