# Frontend EduMS Progress & Rules

Tài liệu này định nghĩa lộ trình 12 Phase cho Frontend UI của dự án EduMS và các quy tắc nghiêm ngặt về chất lượng giao diện phải tuân thủ trong từng giai đoạn.

## A. Nguyên tắc chất lượng giao diện (UI Rules)

### Phase 1: Nền tảng Design System
- Định nghĩa rõ ràng Design tokens (Colors, Shadows, Radius).
- Typography & Spacing scale chuẩn mực.
- Xây dựng Shared Components hoàn chỉnh.
- Mọi component phải có đầy đủ các trạng thái: Hover / Focus / Active / Disabled.
- Tích hợp Micro-interactions cơ bản (chuyển đổi màu mượt, bóng đổ khi hover).
- Đặt nền móng Responsive.

### Phase 2 đến Phase 10: Triển khai Module
- **Quy tắc vàng:** Màn hình nào làm xong thì **phải áp dụng hover/responsive ngay lập tức**.
- Không để nợ UI states (ví dụ: làm xong button nhưng quên làm hover state, hoặc màn hình bị vỡ trên mobile).
- Sử dụng triệt để các component từ Phase 1.

### Phase 11: Polish toàn hệ thống
- Rà soát và đánh bóng (polish) toàn bộ hệ thống.
- Kiểm tra tính nhất quán (consistency) giữa các màn hình và module.
- Hỗ trợ Reduced motion cho các animation.
- Đảm bảo tiêu chuẩn Accessibility (a11y).
- Tinh chỉnh các animation còn chưa đồng đều hoặc quá gắt.

## B. Lộ trình 12 Phase (Tiến độ hiện tại)

- [x] **Phase 1** - Design System
- [x] **Phase 2** - Public Admission Portal
- [x] **Phase 3** - Authentication
- [x] **Phase 4** - Role-based Shell
- [x] **Phase 5** - Role Dashboards
- [x] **Phase 6** - M1 Core
- [x] **Phase 7** - M2 Admissions
- [x] **Phase 8** - M3 Academic & Timetable
- [x] **Phase 9** - M4 Grades & Attendance
- [x] **Phase 10** - M5 Family/Notification/Finance
- [x] **Phase 11** - Responsive/UI Polish (Global)
- [ ] **Phase 12** - Final Verification
