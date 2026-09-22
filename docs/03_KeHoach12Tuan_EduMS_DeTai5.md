# Kế hoạch công việc và phân công 12 tuần

> Nguồn chuyển đổi: `03_KeHoach12Tuan_EduMS_DeTai5.docx`

TRƯỜNG ĐẠI HỌC SÀI GÒN KHOA CÔNG NGHỆ THÔNG TIN HỌC PHẦN: ĐỒ ÁN CHUYÊN NGÀNH

KẾ HOẠCH CÔNG VIỆC VÀ PHÂN CÔNG 12 TUẦN

ĐỀ TÀI 5 - NỀN TẢNG QUẢN TRỊ GIÁO DỤC TOÀN DIỆN & CỔNG TUYỂN SINH TRỰC TUYẾN (EDUMS)

Nhóm: Sơn - Tài - Thái - Phước - Phát

Nhóm trưởng: Phước

Thời gian: 11/09/2026 - 03/12/2026

# 1. CÁC MỐC BẮT BUỘC CỦA HỌC PHẦN

| Mốc | Thời gian | Sản phẩm phải có |
| --- | --- | --- |
| Tuần 1 | 11/09/2026 | Chốt nhóm, đề tài, nhóm trưởng; Git repo; Draft 1 và phân công sơ bộ. |
| Tuần 2 | 18/09 - 24/09/2026 | Bản thảo đề cương đầy đủ; nộp bản thảo lấy nhận xét 17h00 19/09; bản nộp chấm trước 11h30 24/09. |
| Tuần 3 | 25/09/2026 | Thẩm định, chỉnh sửa và chấm duyệt đề cương; chốt phạm vi sau góp ý. |
| Tuần 6 | 16/10/2026 | Hoàn tất khảo sát hiện trạng và thiết kế mức 0: BFD/BPMN, Use Case, Sequence, ERD, API Specs, UI Mockup. |
| Tuần 9 | 06/11/2026 | Demo MVP chạy end-to-end; Feature Freeze; bắt đầu kiểm thử ổn định. |
| Tuần 11 | 11h30 23/11/2026 | Hạn chót nộp toàn bộ đồ án: quyển báo cáo, file PDF, source code GitHub và link triển khai Cloud. |
| Tuần 12 | 27/11/2026 | Bảo vệ đồ án, vấn đáp và demo trước hội đồng/GVHD; sau đó lưu trữ bản final. |

# 2. KẾ HOẠCH CHI TIẾT THEO TUẦN

## Tuần 01 - 11/09/2026 - 17/09/2026: Khởi tạo & Đề cương

Mục tiêu tuần: Chốt phạm vi Đề tài 5, phân nhóm, repo và Draft 1.

| Thành viên | Nhiệm vụ chính trong tuần |
| --- | --- |
| Phước | Tổ chức kick-off; tạo GitHub repo, branch convention, issue board; khởi tạo skeleton Spring Boot + Next.js; tổng hợp Mục 1-5 đề cương. |
| Sơn | Phân tích toàn bộ quy trình tuyển sinh: tác nhân, dữ liệu hồ sơ, trạng thái, nguyện vọng, minh chứng; phác Use Case M2. |
| Tài | Khảo sát nghiệp vụ quản lý môn/lớp/phòng/thời khóa biểu; lập danh sách hard/soft constraints cho xếp lịch. |
| Thái | Khảo sát nghiệp vụ nhập điểm, nhận xét, điểm danh; đề xuất QR attendance và trạng thái chuyên cần. |
| Phát | Khảo sát Family Portal, realtime alert, học phí và VietQR; xác định thông tin phụ huynh cần tra cứu. |

Sản phẩm/điều kiện nghiệm thu tuần: Biên bản nhóm + Draft 1 + repo + sơ đồ phạm vi 5 module.

## Tuần 02 - 18/09/2026 - 24/09/2026: Kế hoạch, kiến trúc & Đề cương chi tiết

Mục tiêu tuần: Hoàn tất Mục 1-10 đề cương, WBS, giả thuyết/điểm mới, kiến trúc và môi trường.

| Thành viên | Nhiệm vụ chính trong tuần |
| --- | --- |
| Phước | Hoàn thiện kiến trúc tổng thể, stack Spring Boot/Next.js/MySQL, RBAC, quy ước integration; lập WBS 12 tuần và ma trận trách nhiệm; dựng CI cơ bản. |
| Sơn | Viết đặc tả M2: application lifecycle, document upload, admission number; wireframe public admission portal + applicant dashboard; OpenAPI draft. |
| Tài | Viết đặc tả M3 và pseudocode timetable generator/conflict detector; draft ERD academic/schedule; wireframe timetable. |
| Thái | Viết đặc tả M4: gradebook, class session, QR token, attendance rules; wireframe teacher grade/attendance screens; OpenAPI draft. |
| Phát | Viết đặc tả M5: parent linkage, notification events, invoice/VietQR; wireframe family dashboard; OpenAPI draft. |

Sản phẩm/điều kiện nghiệm thu tuần: Nộp bản thảo trước 17h 19/09; bản đề cương hoàn chỉnh trước 11h30 24/09; môi trường dev chạy được.

## Tuần 03 - 25/09/2026 - 01/10/2026: Thẩm định & chốt baseline

Mục tiêu tuần: Tiếp thu góp ý, khóa phạm vi và contract trước khi thiết kế sâu.

| Thành viên | Nhiệm vụ chính trong tuần |
| --- | --- |
| Phước | Trình bày tổng quan đề cương; ghi biên bản góp ý; cập nhật scope/MVP; chốt coding convention, package/module, error model và auth contract. |
| Sơn | Sửa phần tuyển sinh theo góp ý; chốt bảng M2 và state machine; tạo mock API + seed hồ sơ. |
| Tài | Sửa phạm vi lịch; chốt hard/soft constraints, input/output của generator; tạo bộ dữ liệu lịch mẫu. |
| Thái | Chốt công thức điểm, attendance state, QR expiry, quyền sửa/chốt; tạo mock API + test cases. |
| Phát | Chốt event notification, parent-child ownership, invoice/payment state; tạo mock API + test cases. |

Sản phẩm/điều kiện nghiệm thu tuần: Đề cương chính thức được duyệt + biên bản đánh giá; contract v1 của 5 module.

## Tuần 04 - 02/10/2026 - 08/10/2026: Phân tích & Thiết kế mức 0 - phần 1

Mục tiêu tuần: Khảo sát hiện trạng, BFD/BPMN, ERD khung và auth/core foundation.

| Thành viên | Nhiệm vụ chính trong tuần |
| --- | --- |
| Phước | Hoàn thiện BFD tổng; BPMN liên module; triển khai schema core users/roles/permissions; auth login/refresh skeleton; chuẩn hóa Swagger. |
| Sơn | BPMN tuyển sinh; ERD M2; sequence nộp hồ sơ/duyệt; bắt đầu migration + backend application CRUD. |
| Tài | BPMN quản lý đào tạo/xếp lịch; ERD M3; sequence generate/publish timetable; bắt đầu master data CRUD. |
| Thái | BPMN điểm/điểm danh; ERD M4; sequence open QR/scan/close; bắt đầu grade/attendance entity. |
| Phát | BPMN family/notification/payment; ERD M5; sequence absent->notify và invoice->VietQR; bắt đầu parent/notification entity. |

Sản phẩm/điều kiện nghiệm thu tuần: BFD/BPMN draft + ERD module v1 + auth/core skeleton + migration đầu tiên.

## Tuần 05 - 09/10/2026 - 15/10/2026: Phân tích & Thiết kế mức 0 - phần 2

Mục tiêu tuần: Hoàn thiện Use Case, Sequence, UI mockup và API contract; code nền từng module.

| Thành viên | Nhiệm vụ chính trong tuần |
| --- | --- |
| Phước | Hoàn thiện RBAC backend, current-user API, audit framework, exception handler; review schema dùng chung; dựng layout/login frontend. |
| Sơn | Hoàn thiện Use Case/Sequence M2; code document metadata/upload adapter, preferences, submit validation; dựng public admission UI. |
| Tài | Hoàn thiện Use Case/Sequence M3; code classes/subjects/rooms/assignments; viết conflict detector unit tests. |
| Thái | Hoàn thiện Use Case/Sequence M4; code grade component/grade API; class session CRUD và QR token service prototype. |
| Phát | Hoàn thiện Use Case/Sequence M5; code parent linkage, notification repository/service, invoice schema; prototype VietQR payload. |

Sản phẩm/điều kiện nghiệm thu tuần: Use Case + Sequence đầy đủ; UI Mockup; Swagger/OpenAPI v1; schema module ổn định.

## Tuần 06 - 16/10/2026 - 22/10/2026: Chốt thiết kế mức 0

Mục tiêu tuần: Đạt mốc giảng viên: ERD, Swagger API Specs, UI Mockup; sẵn sàng bước sang phát triển.

| Thành viên | Nhiệm vụ chính trong tuần |
| --- | --- |
| Phước | Tổng hợp ERD toàn hệ thống; kiểm tra FK/unique/index; chốt API gateway path/security; dựng integration test DB; báo cáo Giai đoạn 2. |
| Sơn | Hoàn tất backend workflow Draft/Submit/Review/NeedSupplement; UI Applicant form + upload + status; test integration. |
| Tài | Hoàn tất thuật toán timetable v1 + unscheduled reason; UI timetable draft; test hard conflict 0 trên dataset mẫu. |
| Thái | Hoàn tất gradebook API/UI v1; QR open/scan endpoint v1; test chống scan lặp và sai lớp. |
| Phát | Hoàn tất family dashboard shell, WebSocket/SSE connection, invoice/VietQR API v1; test ownership parent-child. |

Sản phẩm/điều kiện nghiệm thu tuần: Bộ hồ sơ thiết kế mức 0 hoàn chỉnh + mỗi module có một vertical slice chạy được.

## Tuần 07 - 23/10/2026 - 29/10/2026: Phát triển ứng dụng - Sprint 1

Mục tiêu tuần: Đẩy mạnh chức năng cốt lõi, mỗi owner hoàn thành luồng chính của module.

| Thành viên | Nhiệm vụ chính trong tuần |
| --- | --- |
| Phước | Hoàn thiện user/role admin UI, permission guards, audit viewer cơ bản; CI test + Dockerfile backend; hỗ trợ contract integration. |
| Sơn | Hoàn thiện Officer review queue, request supplement, decision, Admission Number; applicant result page; event ADMISSION_ACCEPTED. |
| Tài | Hoàn thiện auto-generate timetable, manual edit + conflict validation, version draft; publish API và read-only student/teacher view. |
| Thái | Hoàn thiện gradebook bulk edit, comments, publish; attendance teacher dashboard, manual override và sĩ số realtime. |
| Phát | Hoàn thiện event listener Absent/Late -> notification, notification center, unread/read realtime; family read-model cho lịch/điểm/chuyên cần. |

Sản phẩm/điều kiện nghiệm thu tuần: Khoảng 70% chức năng MVP; các luồng chính chạy độc lập từng module.

## Tuần 08 - 30/10/2026 - 05/11/2026: Phát triển ứng dụng - Sprint 2 & Tích hợp

Mục tiêu tuần: Kết nối API, hoàn thiện module và chuẩn bị demo MVP.

| Thành viên | Nhiệm vụ chính trong tuần |
| --- | --- |
| Phước | Tích hợp auth/RBAC với toàn bộ module; seed account theo role; CORS/env production; staging deploy lần 1; xử lý lỗi integration. |
| Sơn | Kết nối ADMISSION_ACCEPTED với tạo student/enrollment request; hoàn thiện SEO metadata, validation, upload permission; E2E tuyển sinh. |
| Tài | Kết nối timetable với class session/lịch hiển thị Family; thêm exam schedule cơ bản; UI polish và integration test. |
| Thái | Kết nối M3 để tạo session từ timetable; phát ATTENDANCE_CHANGED/GRADE_PUBLISHED; student result view; E2E attendance. |
| Phát | Hoàn thiện tuition/invoice screen, VietQR image/payload, manual reconciliation; kết nối M3/M4 read APIs; E2E family flow. |

Sản phẩm/điều kiện nghiệm thu tuần: MVP staging end-to-end: tuyển sinh -> nhập học -> lịch -> điểm danh/điểm -> phụ huynh.

## Tuần 09 - 06/11/2026 - 12/11/2026: Demo MVP & Kiểm thử

Mục tiêu tuần: Feature Freeze; demo luồng nghiệp vụ chính; mở defect list.

| Thành viên | Nhiệm vụ chính trong tuần |
| --- | --- |
| Phước | Chuẩn bị script demo tổng; tag MVP; chạy security/API smoke; quản lý defect board và release rules; không nhận feature lớn mới. |
| Sơn | Demo ứng viên nộp -> officer duyệt -> admission number; sửa lỗi workflow/upload; bổ sung test case biên. |
| Tài | Demo sinh lịch từ dataset -> 0 conflict -> publish; benchmark nhỏ và log Unscheduled; sửa lỗi UI/algorithm. |
| Thái | Demo teacher grade + QR attendance -> late/absent; sửa lỗi concurrency/token/permission; test audit. |
| Phát | Demo parent nhận realtime alert + xem lịch/điểm + VietQR; sửa lỗi ownership/realtime/payment state. |

Sản phẩm/điều kiện nghiệm thu tuần: Demo MVP ngày 06/11; Feature Freeze; danh sách lỗi có severity/owner/deadline.

## Tuần 10 - 13/11/2026 - 19/11/2026: Hoàn thiện & Báo cáo

Mục tiêu tuần: Ổn định hệ thống, dữ liệu demo, deploy Cloud và viết báo cáo.

| Thành viên | Nhiệm vụ chính trong tuần |
| --- | --- |
| Phước | Hardening auth/security, secrets, healthcheck; deploy production backend; tổng hợp Chương 4-5 kiến trúc/triển khai; release checklist. |
| Sơn | Sửa bug M2; tối ưu responsive/SEO; viết phần phân tích/thiết kế/triển khai tuyển sinh + ảnh minh họa. |
| Tài | Sửa bug M3; kiểm tra dataset lớn hơn; viết phần thuật toán timetable, test conflict, giới hạn heuristic + ảnh. |
| Thái | Sửa bug M4; test grade/attendance edge cases; viết phần học vụ, QR, test/audit + ảnh. |
| Phát | Sửa bug M5; test realtime fallback/payment; viết phần family, notification, VietQR + ảnh và kịch bản demo. |

Sản phẩm/điều kiện nghiệm thu tuần: Bản deploy Cloud ổn định + dự thảo quyển báo cáo đầy đủ nội dung kỹ thuật.

## Tuần 11 - 20/11/2026 - 26/11/2026: Hoàn tất hồ sơ & Nộp bài

Mục tiêu tuần: Chốt code/document; in ấn và nộp trước 11h30 23/11.

| Thành viên | Nhiệm vụ chính trong tuần |
| --- | --- |
| Phước | Đóng release v1.0, merge PR cuối, export Swagger/DB script, rà soát đóng góp Git; tổng hợp báo cáo và checklist nộp. |
| Sơn | Final test tuyển sinh trên production; kiểm tra link/file upload; rà soát phần báo cáo M2 và minh chứng commit. |
| Tài | Final test timetable/exam; lưu dataset/demo result; rà soát sơ đồ/thuật toán và minh chứng commit. |
| Thái | Final test grade/attendance; kiểm tra QR trước demo; rà soát phần test và minh chứng commit. |
| Phát | Final test Family/realtime/VietQR; kiểm tra demo payment; rà soát phần report và minh chứng commit. |

Sản phẩm/điều kiện nghiệm thu tuần: Nộp trước 11h30 23/11: quyển in, PDF, GitHub, link Cloud; giữ bản backup offline.

## Tuần 12 - 27/11/2026 - 03/12/2026: Nghiệm thu & Bảo vệ

Mục tiêu tuần: Trình bày, demo trực tiếp, vấn đáp và lưu trữ bản cuối.

| Thành viên | Nhiệm vụ chính trong tuần |
| --- | --- |
| Phước | Trình bày vấn đề, kiến trúc, phân công, tích hợp và kết luận; điều phối demo; chuẩn bị phương án demo offline. |
| Sơn | Trình bày/demo module tuyển sinh; trả lời state machine, bảo mật file và admission number. |
| Tài | Trình bày/demo timetable; giải thích hard/soft constraints, thuật toán và giới hạn. |
| Thái | Trình bày/demo grade/attendance; giải thích QR security, audit và phân quyền giáo viên. |
| Phát | Trình bày/demo Family Portal, realtime, học phí/VietQR; giải thích ownership và phương án tích hợp cổng thanh toán. |

Sản phẩm/điều kiện nghiệm thu tuần: Bảo vệ ngày 27/11; slide, demo script, account demo, backup DB/video; sau bảo vệ cập nhật bản lưu trữ nếu được yêu cầu.

# 3. NHỊP LÀM VIỆC HẰNG TUẦN

| Thời điểm | Hoạt động | Đầu ra |
| --- | --- | --- |
| Đầu tuần | Phước mở/confirm issue; mỗi thành viên chọn task thuộc module; nêu blocker và API dependency. | Sprint board có owner, deadline, acceptance criteria. |
| Giữa tuần | Mỗi người đẩy PR nhỏ, chạy test; reviewer đọc diff và thử chức năng. | PR không quá lớn, phát hiện lỗi sớm. |
| Cuối tuần | Demo nội bộ 5-10 phút/người; cập nhật README, screenshot, test evidence. | Weekly evidence và danh sách việc chuyển tuần sau. |
| Khi có thay đổi contract | Owner mở issue/RFC ngắn trước khi sửa; thông báo module phụ thuộc. | Không phá API ngầm, có version/migration rõ. |

# 4. QUY TẮC CÂN BẰNG CÔNG VIỆC

- Mỗi tuần mỗi người có ít nhất một deliverable kiểm chứng được thuộc module của mình; không có người chỉ ghi tài liệu hoặc chỉ hỗ trợ.

- Nếu một module xong sớm, owner ưu tiên test/hardening/documentation/review module khác, không lấy luôn ownership chức năng của người khác.

- Nếu một module bị phụ thuộc API, owner dùng mock theo contract để tiếp tục làm; blocker quá 1 ngày phải báo Phước để chốt quyết định.

- Task phát sinh ngoài kế hoạch phải ghi trên issue board và bù khối lượng tuần sau; không giao miệng rồi mất dấu.

- Phước là nhóm trưởng nhưng không có quyền tự merge code mình; vẫn phải qua review như các thành viên khác.

# 5. CHECKLIST TRƯỚC CÁC MỐC LỚN

## 5.1. Trước chấm đề cương - Tuần 3

- Tên đề tài đúng Đề tài 5, không lẫn EduTwin.

- Đủ 10 tiêu chí trong biên bản đánh giá.

- Scope MVP và mở rộng rõ.

- WBS 12 tuần + phân công 5 người cân bằng.

- Có phương pháp nghiên cứu, điểm mới, cấu trúc chương và tài liệu tham khảo.

## 5.2. Trước Demo MVP - Tuần 9

- Có seed account cho Applicant/Officer/Admin/Teacher/Student/Parent.

- Luồng tuyển sinh end-to-end chạy.

- Timetable sinh được và không hard conflict.

- Teacher nhập điểm + điểm danh; parent nhận alert.

- VietQR hiển thị cho invoice demo.

- Staging URL hoạt động; có backup local.

## 5.3. Trước nộp - Tuần 11

- GitHub public/private theo yêu cầu, link mở được; release v1.0.

- Cloud FE/BE/DB hoạt động và có health check.

- PDF báo cáo, quyển in, ERD, API, source, hướng dẫn chạy đủ.

- Mỗi thành viên có commit/PR minh chứng module.

- Không còn secret/.env/password trong repo.

## 5.4. Trước bảo vệ - Tuần 12

- Slide 12-15 phút, phân chia phần nói cân bằng.

- Demo script có dữ liệu sẵn; mỗi người demo đúng module.

- Có video/ảnh backup và bản chạy local nếu Internet lỗi.

- Chuẩn bị câu hỏi về kiến trúc, DB, thuật toán timetable, QR, RBAC, realtime, VietQR, kiểm thử và giới hạn hệ thống.
