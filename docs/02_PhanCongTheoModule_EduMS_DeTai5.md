# Phân công công việc đồ án theo module

> Nguồn chuyển đổi: `02_PhanCongTheoModule_EduMS_DeTai5.docx`

TRƯỜNG ĐẠI HỌC SÀI GÒN KHOA CÔNG NGHỆ THÔNG TIN HỌC PHẦN: ĐỒ ÁN CHUYÊN NGÀNH

PHÂN CÔNG CÔNG VIỆC ĐỒ ÁN THEO MODULE

ĐỀ TÀI 5 - NỀN TẢNG QUẢN TRỊ GIÁO DỤC TOÀN DIỆN & CỔNG TUYỂN SINH TRỰC TUYẾN (EDUMS)

Nhóm thực hiện: Sơn - Tài - Thái - Phước - Phát

Nhóm trưởng: Phước

Nguyên tắc: Mỗi người sở hữu một khối chức năng end-to-end, khối lượng cân bằng 20%

# 1. NGUYÊN TẮC PHÂN CÔNG

- Mỗi thành viên sở hữu một Vertical Slice: tự chịu trách nhiệm phân tích chi tiết, bảng dữ liệu, API backend, giao diện frontend, unit/integration test và tài liệu kỹ thuật cho module của mình.

- Không chia kiểu một người chỉ frontend, một người chỉ backend vì sẽ tạo phụ thuộc dây chuyền. Mỗi module phải có thể phát triển bằng mock contract khi module khác chưa xong.

- Khối lượng chuẩn hóa 30 Effort Points/người, tương ứng 20% tổng công việc. Nhóm trưởng Phước có thêm điều phối, vì vậy phần kỹ thuật Core được giới hạn vừa đủ để tổng tải vẫn ngang các thành viên khác.

- Các điểm giao nhau giữa module phải đi qua API contract/event đã thống nhất; không được truy cập trực tiếp bảng của module khác nếu không có lý do được cả nhóm duyệt.

- Mọi PR cần ít nhất một reviewer và tác giả không tự merge. Các thay đổi schema dùng chung, auth, payment hoặc timetable phải có 2 người xác nhận.

# 2. MA TRẬN SỞ HỮU MODULE

| Module | Owner | Phạm vi chính |
| --- | --- | --- |
| M1 - Core Identity & Organization | Phước | Auth/JWT/RBAC, tài khoản, danh mục dùng chung, audit, integration shell, DevOps/CI. |
| M2 - Online Admissions Portal | Sơn | Portal tuyển sinh, hồ sơ, minh chứng, nguyện vọng, xét duyệt, kết quả, mã trúng tuyển. |
| M3 - Academic & Timetable | Tài | Môn/lớp/phòng, phân công, khung giờ, bộ sinh thời khóa biểu, conflict detector, lịch thi. |
| M4 - Grades & Attendance | Thái | Điểm, nhận xét, class session, QR attendance, sĩ số, chuyên cần, màn hình giáo viên/học sinh. |
| M5 - Family, Notification & Finance | Phát | Liên kết phụ huynh, family dashboard, realtime alert, học phí, VietQR, đối soát và lịch sử thông báo. |

# 3. RANH GIỚI TÍCH HỢP ĐỂ GIẢM PHỤ THUỘC

| Module phát | Hợp đồng cung cấp | Module sử dụng |
| --- | --- | --- |
| M1 - Phước | userId, role/permission, studentId/teacherId cơ bản, academicYearId/semesterId; auth middleware. | Tất cả module. |
| M2 - Sơn | ADMISSION_ACCEPTED(applicationId, admissionNo, programId, applicantProfile). | M1/M3 dùng để tạo hồ sơ học sinh và xếp lớp sau nhập học. |
| M3 - Tài | classId, subjectId, roomId, timetableEntryId, classSession schedule. | M4 dùng cho điểm/điểm danh; M5 đọc lịch học/lịch thi. |
| M4 - Thái | GRADE_PUBLISHED, ATTENDANCE_CHANGED(studentId, sessionId, status). | M5 dùng để hiển thị kết quả và tạo thông báo phụ huynh. |
| M5 - Phát | invoiceId/paymentStatus/notificationId; không ghi ngược vào bảng M3/M4. | M1/Admin dashboard có thể đọc tổng hợp. |

Lưu ý: Trong tuần 2-3, mỗi owner phải viết OpenAPI/JSON mẫu cho hợp đồng của mình. Nếu API thật chưa có, frontend dùng mock response đúng contract; nhờ vậy người khác không bị chặn.

# 4. CHI TIẾT PHÂN CÔNG TỪNG THÀNH VIÊN

## 4.1. Phước - Nhóm trưởng - Core Platform Lead

Khối sở hữu: M1 - Core Identity & Organization

### Nhiệm vụ chính

1. Khởi tạo kiến trúc repository, quy ước branch/PR, biến môi trường và cấu trúc Spring Boot/Next.js dùng chung.

2. Thiết kế users, roles, permissions, user_roles, role_permissions, refresh_tokens, audit_logs, academic_years, semesters và migration tương ứng.

3. Triển khai đăng nhập, refresh token, logout, BCrypt/Argon2, Spring Security filter, JWT claims và API lấy current user.

4. Triển khai RBAC ở backend; route/menu frontend ẩn theo capability nhưng không dùng frontend làm lớp bảo mật chính.

5. Quản lý tài khoản Staff/Teacher/Student/Parent/Applicant theo trạng thái; cung cấp API lookup ID cho module khác.

6. Xây dựng audit framework dùng chung cho thay đổi nhạy cảm; chuẩn hóa error response và exception handler.

7. Thiết lập CI build/test, CORS, Dockerfile, health endpoint, deploy backend; hỗ trợ tích hợp final nhưng không viết thay code module khác.

8. Điều phối sprint, chốt contract và release; tổng hợp issue/blocker, không gánh tài liệu thay cả nhóm.

Sản phẩm bắt buộc: Auth/RBAC chạy hoàn chỉnh; schema core; API user/role; audit; Swagger; CI; backend deploy; tài liệu kiến trúc core.

Khối lượng chuẩn hóa: 25 điểm kỹ thuật + 5 điểm điều phối = 30

## 4.2. Sơn - Admissions Portal Lead

Khối sở hữu: M2 - Online Admissions Portal

### Nhiệm vụ chính

1. Thiết kế admission_campaigns, admission_programs, applications, application_documents, application_preferences, application_reviews, admission_results.

2. Xây dựng trang tuyển sinh công khai bằng Next.js App Router, metadata/SEO, danh sách đợt/chương trình và trang chi tiết.

3. Xây dựng Applicant Portal: thông tin cá nhân/học tập, upload minh chứng, checklist hồ sơ, nguyện vọng kéo-thả/thứ tự.

4. Backend validation hồ sơ, giới hạn file, lưu metadata/object key; trạng thái DRAFT -> SUBMITTED -> UNDER_REVIEW -> NEED_SUPPLEMENT -> ADMITTED/REJECTED.

5. Xây dựng màn hình cán bộ tuyển sinh: hàng đợi hồ sơ, xem file, yêu cầu bổ sung, ghi nhận kết quả.

6. Sinh Admission Number trong transaction, chống trùng; công bố kết quả và sự kiện ADMISSION_ACCEPTED.

7. Viết unit/integration/E2E cho nộp lặp, thiếu hồ sơ, bổ sung, trúng tuyển và chuyển nhập học.

8. Viết tài liệu nghiệp vụ tuyển sinh, Use Case/Sequence và hướng dẫn demo module.

Sản phẩm bắt buộc: Public admission portal + Applicant/Officer dashboard + API + upload + workflow + admission number + test + tài liệu.

Khối lượng chuẩn hóa: 30 điểm = 20%

## 4.3. Tài - Academic & Scheduling Lead

Khối sở hữu: M3 - Academic & Timetable

### Nhiệm vụ chính

1. Thiết kế subjects, rooms, classes, class_students, teaching_assignments, time_slots, timetable_versions, timetable_entries, teacher_unavailabilities, exams/exam_schedules.

2. Xây dựng CRUD môn/lớp/phòng; phân công giáo viên; gán học sinh; khung giờ và điều kiện phòng.

3. Xây thuật toán xếp lịch MVP: sắp yêu cầu theo độ khó, duyệt slot hợp lệ, tính soft score, lưu bản nháp.

4. Xây conflict detector chung cho giáo viên/phòng/lớp và dùng lại cả khi auto-generate lẫn chỉnh tay.

5. Xây giao diện ma trận tuần/lịch, danh sách Unscheduled có lý do, thao tác đổi phòng/slot.

6. Versioning và Publish timetable; API read-only cho Student/Parent/Teacher.

7. Lịch thi cơ bản: tạo exam, phòng, thời gian; áp dụng cùng conflict detector.

8. Viết bộ test dataset xung đột, test thuật toán và tài liệu giải thích heuristic/giới hạn.

Sản phẩm bắt buộc: Academic master + timetable generator + conflict detector + timetable UI + exam schedule + test + tài liệu thuật toán.

Khối lượng chuẩn hóa: 30 điểm = 20%

## 4.4. Thái - Grades & Attendance Lead

Khối sở hữu: M4 - Grades & Attendance

### Nhiệm vụ chính

1. Thiết kế grade_components, student_grades, teacher_comments, class_sessions, attendance_records, qr_attendance_tokens.

2. Xây API cấu hình cột điểm theo lớp-môn, nhập điểm hàng loạt, validation thang điểm và trọng số.

3. Tính điểm tổng kết theo trọng số; publish/unpublish theo quyền; audit khi sửa sau công bố.

4. Xây màn hình gradebook dạng bảng, nhập nhanh điểm/nhận xét, lọc học sinh và lịch sử thay đổi cơ bản.

5. Tạo Class Session từ timetable; giáo viên mở/đóng điểm danh và xem sĩ số realtime.

6. Sinh/kiểm tra QR token ngắn hạn; endpoint scan; chống scan lặp; Late/Absent/Excused; manual override.

7. Cung cấp API kết quả/chuyên cần read-only cho M5 và phát event GRADE_PUBLISHED/ATTENDANCE_CHANGED.

8. Viết unit/integration/E2E và tài liệu quy tắc điểm/chuyên cần.

Sản phẩm bắt buộc: Gradebook + teacher comments + QR attendance + session management + events + test + tài liệu.

Khối lượng chuẩn hóa: 30 điểm = 20%

## 4.5. Phát - Family, Realtime & Finance Lead

Khối sở hữu: M5 - Family Portal, Notification & Tuition

### Nhiệm vụ chính

1. Thiết kế parents, parent_students, notifications, notification_recipients, tuition_invoices, invoice_items, payment_transactions.

2. Xây quy trình liên kết phụ huynh - học sinh bằng mã mời/xác nhận bởi nhà trường; bảo vệ ownership.

3. Xây Family Dashboard tổng hợp điểm, nhận xét, chuyên cần, lịch học và lịch thi qua API contract M3/M4.

4. Xây Notification Service và WebSocket/SSE: tạo thông báo Absent/Late, grade published, lịch thi/học phí; unread/read history.

5. Xây màn hình notification center và realtime toast; có fallback polling/refresh khi socket lỗi.

6. Quản lý khoản thu/hóa đơn, deadline, trạng thái; sinh payload/VietQR; mã đối soát duy nhất.

7. Xây màn hình đối soát thủ công; chuẩn bị interface webhook cho OnePay/VNPay nhưng không bắt buộc kích hoạt ở MVP.

8. Viết security/E2E: parent A không thấy child B, thông báo không gửi lặp, payment transition hợp lệ; tài liệu demo.

Sản phẩm bắt buộc: Family Portal + parent linkage + realtime notification + tuition/invoice + VietQR + test + tài liệu.

Khối lượng chuẩn hóa: 30 điểm = 20%

# 5. BẢNG CÂN BẰNG KHỐI LƯỢNG

| Thành viên | Backend/DB | Frontend | Thuật toán/Tích hợp | Test/Tài liệu/Điều phối | Effort |
| --- | --- | --- | --- | --- | --- |
| Phước | Cao | Vừa | Auth/RBAC/DevOps - Cao | Test bảo mật + Leader - Cao | 30 (20%) |
| Sơn | Cao | Cao | Upload/workflow - Cao | E2E tuyển sinh - Cao | 30 (20%) |
| Tài | Cao | Cao | Timetable algorithm - Rất cao | Conflict test - Cao | 30 (20%) |
| Thái | Cao | Cao | QR/grade logic - Cao | E2E học vụ - Cao | 30 (20%) |
| Phát | Cao | Cao | Realtime/VietQR - Cao | Security/E2E - Cao | 30 (20%) |

Lưu ý: Mức độ khó khác nhau được bù trừ bằng phạm vi. Ví dụ Tài có thuật toán xếp lịch khó nên không gánh thêm DevOps; Phước có điều phối nên Core chỉ tập trung identity/RBAC/integration framework; Phát có module phụ thuộc dữ liệu read-only nên bù bằng realtime + finance.

# 6. MA TRẬN REVIEW CHÉO

| Tác giả chính | Reviewer 1 | Reviewer 2 khi thay đổi nhạy cảm |
| --- | --- | --- |
| Phước | Phát | Tài đối với schema/core |
| Sơn | Phước | Phát đối với file/privacy |
| Tài | Sơn | Thái đối với thuật toán/schema |
| Thái | Tài | Phát đối với event/attendance |
| Phát | Thái | Phước đối với payment/security |

# 7. QUY ƯỚC GIT VÀ BÀN GIAO

- Nhánh chính: main chỉ nhận PR đã review. Nhánh phát triển cá nhân/feature: feat/Mx-ten-chuc-nang.

- Mỗi PR phải có: mô tả phạm vi, ảnh/video nếu là UI, cách test, migration liên quan và checklist không lộ secret.

- Không sửa trực tiếp bảng/module của người khác nếu chưa có issue/contract thống nhất.

- Mỗi owner duy trì file README của module: mục tiêu, endpoint, bảng sở hữu, biến môi trường, cách chạy test.

- Đến cuối tuần 8 phải khóa contract; tuần 9 Feature Freeze, chỉ sửa lỗi và hoàn thiện trải nghiệm.

- Đóng góp được tính bằng deliverable chạy được và PR chất lượng, không chỉ số lượng commit.

# 8. DEFINITION OF DONE CHO MỘT MODULE

| Điều kiện | Yêu cầu |
| --- | --- |
| Nghiệp vụ | Luồng chính + ngoại lệ quan trọng chạy đúng và có rule rõ. |
| Database | Migration chạy từ database trống; có FK/unique/index cần thiết. |
| Backend | API có validation, quyền, error handling, Swagger. |
| Frontend | Màn hình có loading/empty/error state, responsive ở mức cần thiết. |
| Test | Ít nhất unit + integration cho nghiệp vụ khó; một E2E happy path. |
| Tài liệu | README/module spec + ảnh/sequence/API contract cập nhật. |
| Review | PR được reviewer chạy test và duyệt; không tự merge. |
| Demo | Có seed data/kịch bản để trình bày trong dưới 3 phút/module. |
