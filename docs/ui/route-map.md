# Route Map — Frontend Routes

Danh sách routes trong Next.js App Router, phân theo nhóm truy cập.

## Layout structure

```
app/
├── (public)/              # Không cần đăng nhập
├── (auth)/                # Trang đăng nhập/đăng ký
├── (applicant)/           # Applicant portal
├── (dashboard)/           # Dashboard cho staff/admin
│   ├── admin/             # SystemAdmin + AcademicAdmin
│   ├── admissions/        # AdmissionsOfficer
│   ├── teacher/           # Teacher
│   ├── student/           # Student
│   └── parent/            # Parent
└── layout.tsx
```

## Routes chi tiết

### Public — Không cần đăng nhập

| Route | Trang | Module |
|-------|-------|--------|
| `/` | Landing page / Trang chủ | — |
| `/tuyen-sinh` | Danh sách đợt tuyển sinh công khai | M2 |
| `/tuyen-sinh/[campaignSlug]` | Chi tiết đợt tuyển sinh | M2 |
| `/tuyen-sinh/[campaignSlug]/chuong-trinh` | Danh sách chương trình tuyển | M2 |

### Auth — Đăng nhập / Đăng ký

| Route | Trang | Module |
|-------|-------|--------|
| `/dang-nhap` | Đăng nhập | M1 |
| `/dang-ky` | Đăng ký ứng viên | M1 |
| `/quen-mat-khau` | Quên mật khẩu | M1 |

### Applicant Portal — Ứng viên

| Route | Trang | Role | Module |
|-------|-------|------|--------|
| `/ung-vien` | Dashboard ứng viên | APPLICANT | M2 |
| `/ung-vien/ho-so` | Tạo/sửa hồ sơ | APPLICANT | M2 |
| `/ung-vien/ho-so/minh-chung` | Upload minh chứng | APPLICANT | M2 |
| `/ung-vien/ho-so/nguyen-vong` | Đăng ký nguyện vọng | APPLICANT | M2 |
| `/ung-vien/ket-qua` | Xem kết quả xét tuyển | APPLICANT | M2 |

### Admin Dashboard — Quản trị

| Route | Trang | Role | Module |
|-------|-------|------|--------|
| `/admin` | Dashboard tổng quan | SYSTEM_ADMIN, ACADEMIC_ADMIN | M1 |
| `/admin/tai-khoan` | Quản lý tài khoản | SYSTEM_ADMIN | M1 |
| `/admin/vai-tro` | Quản lý vai trò/quyền | SYSTEM_ADMIN | M1 |
| `/admin/nam-hoc` | Quản lý năm học/học kỳ | ACADEMIC_ADMIN | M1 |
| `/admin/audit-log` | Nhật ký kiểm toán | SYSTEM_ADMIN | M1 |
| `/admin/giao-vien` | Quản lý giáo viên | ACADEMIC_ADMIN | M3 |
| `/admin/hoc-sinh` | Quản lý học sinh | ACADEMIC_ADMIN | M3 |
| `/admin/mon-hoc` | Quản lý môn học | ACADEMIC_ADMIN | M3 |
| `/admin/lop-hoc` | Quản lý lớp học | ACADEMIC_ADMIN | M3 |
| `/admin/phong-hoc` | Quản lý phòng học | ACADEMIC_ADMIN | M3 |
| `/admin/phan-cong` | Phân công giảng dạy | ACADEMIC_ADMIN | M3 |
| `/admin/thoi-khoa-bieu` | Quản lý thời khóa biểu | ACADEMIC_ADMIN | M3 |
| `/admin/thoi-khoa-bieu/tao-moi` | Sinh TKB tự động | ACADEMIC_ADMIN | M3 |
| `/admin/lich-thi` | Quản lý lịch thi | ACADEMIC_ADMIN | M3 |
| `/admin/hoc-phi` | Quản lý học phí/đối soát | ACADEMIC_ADMIN | M5 |

### Admissions Dashboard — Cán bộ tuyển sinh

| Route | Trang | Role | Module |
|-------|-------|------|--------|
| `/tuyen-sinh-admin` | Dashboard tuyển sinh | ADMISSIONS_OFFICER | M2 |
| `/tuyen-sinh-admin/dot-tuyen` | Quản lý đợt tuyển sinh | ADMISSIONS_OFFICER | M2 |
| `/tuyen-sinh-admin/ho-so` | Hàng đợi hồ sơ xét duyệt | ADMISSIONS_OFFICER | M2 |
| `/tuyen-sinh-admin/ho-so/[id]` | Chi tiết hồ sơ + duyệt | ADMISSIONS_OFFICER | M2 |
| `/tuyen-sinh-admin/ket-qua` | Công bố kết quả | ADMISSIONS_OFFICER | M2 |

### Teacher Dashboard — Giáo viên

| Route | Trang | Role | Module |
|-------|-------|------|--------|
| `/giao-vien` | Dashboard giáo viên | TEACHER | M3/M4 |
| `/giao-vien/thoi-khoa-bieu` | Xem TKB cá nhân | TEACHER | M3 |
| `/giao-vien/lop/[classId]` | Chi tiết lớp phụ trách | TEACHER | M3 |
| `/giao-vien/lop/[classId]/diem` | Nhập điểm | TEACHER | M4 |
| `/giao-vien/lop/[classId]/nhan-xet` | Nhập nhận xét | TEACHER | M4 |
| `/giao-vien/lop/[classId]/diem-danh` | Điểm danh / mở QR | TEACHER | M4 |

### Student Dashboard — Học sinh

| Route | Trang | Role | Module |
|-------|-------|------|--------|
| `/hoc-sinh` | Dashboard học sinh | STUDENT | M3/M4 |
| `/hoc-sinh/thoi-khoa-bieu` | Xem TKB | STUDENT | M3 |
| `/hoc-sinh/ket-qua` | Xem điểm/nhận xét | STUDENT | M4 |
| `/hoc-sinh/chuyen-can` | Xem chuyên cần | STUDENT | M4 |
| `/hoc-sinh/lich-thi` | Xem lịch thi | STUDENT | M3 |
| `/hoc-sinh/hoc-phi` | Xem học phí + VietQR | STUDENT | M5 |
| `/hoc-sinh/diem-danh` | Quét QR điểm danh | STUDENT | M4 |

### Parent Dashboard — Phụ huynh

| Route | Trang | Role | Module |
|-------|-------|------|--------|
| `/phu-huynh` | Dashboard phụ huynh | PARENT | M5 |
| `/phu-huynh/con/[studentId]` | Tổng quan con | PARENT | M5 |
| `/phu-huynh/con/[studentId]/diem` | Điểm/nhận xét | PARENT | M4 |
| `/phu-huynh/con/[studentId]/chuyen-can` | Chuyên cần | PARENT | M4 |
| `/phu-huynh/con/[studentId]/thoi-khoa-bieu` | TKB | PARENT | M3 |
| `/phu-huynh/con/[studentId]/lich-thi` | Lịch thi | PARENT | M3 |
| `/phu-huynh/hoc-phi` | Học phí + VietQR | PARENT | M5 |
| `/phu-huynh/thong-bao` | Thông báo / lịch sử | PARENT | M5 |

### Shared

| Route | Trang | Role | Module |
|-------|-------|------|--------|
| `/thong-bao` | Notification center | Tất cả đã đăng nhập | M5 |
| `/ca-nhan` | Thông tin cá nhân | Tất cả đã đăng nhập | M1 |
| `/doi-mat-khau` | Đổi mật khẩu | Tất cả đã đăng nhập | M1 |
