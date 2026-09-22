# Role Matrix — Ma trận phân quyền hệ thống

Hệ thống sử dụng Role-Based Access Control (RBAC). Các quyền được định nghĩa trên 7 vai trò cốt lõi.

## Các vai trò (Roles)

1. `SYSTEM_ADMIN` - Quản trị hệ thống (IT)
2. `ACADEMIC_ADMIN` - Quản trị đào tạo / Kế toán
3. `ADMISSIONS_OFFICER` - Cán bộ tuyển sinh
4. `TEACHER` - Giáo viên
5. `STUDENT` - Học sinh
6. `PARENT` - Phụ huynh / Người giám hộ
7. `APPLICANT` - Ứng viên (chưa nhập học)

---

## Ma trận quyền hạn chi tiết

### M1 — Core Identity & Organization

| Chức năng / Dữ liệu | SYSTEM_ADMIN | ACADEMIC_ADMIN | Khác | Ghi chú |
|---------------------|--------------|----------------|------|---------|
| Đăng nhập / Đổi pass| Có | Có | Có | Ai cũng có quyền |
| Quản lý Users | Có | Xem | Không | Admin quản trị account |
| Quản lý Roles | Có | Không | Không | Chỉ System Admin |
| Xem Audit Logs | Có | Không | Không | |
| Quản lý Năm học/Kỳ | Xem | Có | Không | |

### M2 — Online Admissions Portal

| Chức năng / Dữ liệu | ADMISSIONS_OFFICER | APPLICANT | SYSTEM/ACADEMIC | Ghi chú |
|---------------------|--------------------|-----------|-----------------|---------|
| Xem đợt tuyển sinh | Có | Có | Có | Public |
| Tạo/Sửa hồ sơ | Không | Có (Của mình)| Không | Applicant tự làm |
| Upload minh chứng | Không | Có (Của mình)| Không | |
| Nộp hồ sơ | Không | Có (Của mình)| Không | Trạng thái DRAFT -> SUBMITTED |
| Xem hồ sơ ứng viên | Có (Hàng đợi) | Xem (Của mình)| Có (Read-only) | Cán bộ kiểm duyệt |
| Chấm/Yêu cầu bổ sung| Có | Không | Không | Trạng thái NEED_SUPPLEMENT |
| Công bố kết quả | Có | Xem (Của mình)| Không | Trạng thái ADMITTED/REJECTED |
| Sinh mã trúng tuyển | Hệ thống tự động | Không | Không | Sinh khi ADMITTED |

### M3 — Academic & Timetable

| Chức năng / Dữ liệu | ACADEMIC_ADMIN | TEACHER | STUDENT / PARENT | Ghi chú |
|---------------------|----------------|---------|------------------|---------|
| Quản lý Môn/Lớp/Phòng| Có | Không | Không | |
| Quản lý GV/HS | Có | Không | Không | |
| Phân công giảng dạy | Có | Không | Không | |
| Sinh/Chỉnh TKB | Có | Không | Không | |
| Công bố TKB | Có | Không | Không | |
| Xem TKB | Có | Có (Của mình) | Có (Của mình) | Chỉ xem lịch liên quan |
| Quản lý kỳ/lịch thi | Có | Không | Không | |
| Xem lịch thi | Có | Có (Của mình) | Có (Của mình) | |

### M4 — Grades & Attendance

| Chức năng / Dữ liệu | ACADEMIC_ADMIN | TEACHER | STUDENT / PARENT | Ghi chú |
|---------------------|----------------|---------|------------------|---------|
| Cấu hình cột điểm | Có | Xem (Của lớp)| Không | |
| Nhập điểm/nhận xét | Xem | Có (Của lớp) | Không | GV chỉ nhập lớp mình dạy |
| Chốt điểm (Publish) | Xem | Có (Của lớp) | Không | |
| Xem điểm | Có | Có (Của lớp) | Có (Của mình) | |
| Mở/đóng điểm danh (QR)| Không | Có (Của lớp) | Không | |
| Quét QR điểm danh | Không | Không | Có (HS của lớp) | |
| Sửa ngoại lệ chuyên cần| Xem | Có (Của lớp) | Không | |
| Xem chuyên cần | Có | Có (Của lớp) | Có (Của mình) | |

### M5 — Family, Notification & Finance

| Chức năng / Dữ liệu | ACADEMIC_ADMIN | PARENT | STUDENT | Ghi chú |
|---------------------|----------------|--------|---------|---------|
| Liên kết Phụ huynh-HS | Có (Duyệt) | Có (Yêu cầu) | Không | |
| Xem thông tin con | Có (Tất cả) | Có (Con mình)| Không (Chỉ xem bản thân)| |
| Xem/Nhận thông báo | Xem | Có (Của mình)| Có (Của mình) | |
| Tạo hóa đơn học phí | Có | Không | Không | |
| Xem hóa đơn/VietQR | Có (Tất cả) | Có (Con mình)| Có (Của mình) | |
| Đối soát thanh toán | Có | Không | Không | Cập nhật PAID |

---

## Nguyên tắc áp dụng (Dành cho Developer)

1. **Backend Endpoint**: Mọi API route phải được bảo vệ bằng Spring Security `@PreAuthorize("hasRole('ROLE_...')")`.
2. **Ownership (Quyền sở hữu)**: Các role như TEACHER, STUDENT, PARENT, APPLICANT có quyền rất hạn chế và phụ thuộc vào Data Ownership (Ví dụ: APPLICANT A không thể `GET /api/applications/{id_cua_applicant_B}`).
3. **Frontend UI**: Route map và các UI component như Menu, Button sẽ ẩn/hiện dựa vào Role lấy từ token (Decoded JWT). Không để lộ màn hình mà role không được phép truy cập.
