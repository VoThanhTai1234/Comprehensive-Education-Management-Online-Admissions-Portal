/** 7 vai trò hệ thống EduMS theo đặc tả §2 */
export const ROLES = {
  SYSTEM_ADMIN:       "SYSTEM_ADMIN",
  ACADEMIC_ADMIN:     "ACADEMIC_ADMIN",
  ADMISSIONS_OFFICER: "ADMISSIONS_OFFICER",
  TEACHER:            "TEACHER",
  STUDENT:            "STUDENT",
  PARENT:             "PARENT",
  APPLICANT:          "APPLICANT",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

/** Tên hiển thị theo role */
export const ROLE_LABELS: Record<Role, string> = {
  SYSTEM_ADMIN:       "Quản trị hệ thống",
  ACADEMIC_ADMIN:     "Quản trị đào tạo",
  ADMISSIONS_OFFICER: "Cán bộ tuyển sinh",
  TEACHER:            "Giáo viên",
  STUDENT:            "Học sinh",
  PARENT:             "Phụ huynh",
  APPLICANT:          "Ứng viên",
};

/** Redirect đích sau khi đăng nhập thành công */
export const ROLE_HOME: Record<Role, string> = {
  SYSTEM_ADMIN:       "/admin",
  ACADEMIC_ADMIN:     "/admin",
  ADMISSIONS_OFFICER: "/tuyen-sinh-admin",
  TEACHER:            "/giao-vien",
  STUDENT:            "/hoc-sinh",
  PARENT:             "/phu-huynh",
  APPLICANT:          "/ung-vien",
};

/** Cấu hình sidebar menu theo role */
export type MenuItem = {
  label: string;
  href: string;
  icon: string; // tên icon lucide
  badge?: string;
};

export const SIDEBAR_MENUS: Record<Role, MenuItem[]> = {
  APPLICANT: [
    { label: "Tổng quan",      href: "/ung-vien",                  icon: "LayoutDashboard" },
    { label: "Hồ sơ của tôi",  href: "/ung-vien/ho-so",            icon: "FileText" },
    { label: "Minh chứng",     href: "/ung-vien/ho-so/minh-chung", icon: "Paperclip" },
    { label: "Nguyện vọng",    href: "/ung-vien/ho-so/nguyen-vong",icon: "ListOrdered" },
    { label: "Kết quả",        href: "/ung-vien/ket-qua",          icon: "Award" },
  ],
  ADMISSIONS_OFFICER: [
    { label: "Tổng quan",      href: "/tuyen-sinh-admin",              icon: "LayoutDashboard" },
    { label: "Đợt tuyển sinh", href: "/tuyen-sinh-admin/dot-tuyen",   icon: "CalendarDays" },
    { label: "Hàng đợi hồ sơ", href: "/tuyen-sinh-admin/ho-so",      icon: "Inbox" },
    { label: "Công bố kết quả",href: "/tuyen-sinh-admin/ket-qua",     icon: "Megaphone" },
  ],
  ACADEMIC_ADMIN: [
    { label: "Tổng quan Đào tạo",  href: "/admin",                  icon: "LayoutDashboard" },
    { label: "Học sinh",           href: "/admin/hoc-sinh",         icon: "Users" },
    { label: "Giáo viên",          href: "/admin/giao-vien",        icon: "UserCheck" },
    { label: "Môn học",            href: "/admin/mon-hoc",          icon: "BookOpen" },
    { label: "Lớp học",            href: "/admin/lop-hoc",          icon: "School" },
    { label: "Phòng học",          href: "/admin/phong-hoc",        icon: "DoorOpen" },
    { label: "Phân công giảng dạy",href: "/admin/phan-cong",        icon: "ClipboardList" },
    { label: "Thời khóa biểu",     href: "/admin/thoi-khoa-bieu",   icon: "CalendarClock" },
    { label: "Lịch thi",           href: "/admin/lich-thi",         icon: "GraduationCap" },
    { label: "Năm học / Học kỳ",   href: "/admin/nam-hoc",          icon: "CalendarRange" },
    { label: "Quản lý Học phí",    href: "/admin/hoc-phi",          icon: "Receipt" },
    { label: "Báo cáo cơ bản",     href: "/admin/bao-cao",          icon: "BarChart3" },
    { label: "Hồ sơ cá nhân",      href: "/admin/ho-so",            icon: "UserCog" },
  ],
  SYSTEM_ADMIN: [
    { label: "Tổng quan Hệ thống", href: "/admin",            icon: "LayoutDashboard" },
    { label: "Tài khoản",          href: "/admin/tai-khoan",  icon: "UserCog" },
    { label: "Vai trò",            href: "/admin/vai-tro",    icon: "ShieldCheck" },
    { label: "Quyền",              href: "/admin/quyen",      icon: "ShieldCheck" },
    { label: "Cấu hình dùng chung",href: "/admin/cau-hinh",   icon: "Settings" },
    { label: "Nhật ký kiểm toán",  href: "/admin/audit-log",  icon: "ScrollText" },
    { label: "Năm học / Học kỳ",   href: "/admin/nam-hoc",    icon: "CalendarRange" },
    { label: "Hồ sơ cá nhân",      href: "/admin/ho-so",      icon: "UserCog" },
  ],
  TEACHER: [
    { label: "Tổng quan",       href: "/giao-vien",                    icon: "LayoutDashboard" },
    { label: "Thời khóa biểu",  href: "/giao-vien/thoi-khoa-bieu",    icon: "CalendarClock" },
    { label: "Lớp phụ trách",   href: "/giao-vien/lop",               icon: "School" },
    { label: "Thông báo",       href: "/thong-bao",                    icon: "Bell" },
  ],
  STUDENT: [
    { label: "Tổng quan",     href: "/hoc-sinh",                  icon: "LayoutDashboard" },
    { label: "Thời khóa biểu",href: "/hoc-sinh/thoi-khoa-bieu",  icon: "CalendarClock" },
    { label: "Kết quả học",   href: "/hoc-sinh/ket-qua",         icon: "BarChart3" },
    { label: "Chuyên cần",    href: "/hoc-sinh/chuyen-can",      icon: "ClipboardCheck" },
    { label: "Lịch thi",      href: "/hoc-sinh/lich-thi",        icon: "GraduationCap" },
    { label: "Điểm danh QR",  href: "/hoc-sinh/diem-danh",       icon: "QrCode" },
    { label: "Học phí",       href: "/hoc-sinh/hoc-phi",         icon: "Receipt" },
    { label: "Thông báo",     href: "/thong-bao",                icon: "Bell" },
  ],
  PARENT: [
    { label: "Tổng quan",    href: "/phu-huynh",          icon: "LayoutDashboard" },
    { label: "Con của tôi",  href: "/phu-huynh/con-cai",  icon: "Heart" },
    { label: "Học phí",      href: "/phu-huynh/hoc-phi",  icon: "Receipt" },
    { label: "Thông báo",    href: "/phu-huynh/thong-bao",icon: "Bell" },
  ],
};
