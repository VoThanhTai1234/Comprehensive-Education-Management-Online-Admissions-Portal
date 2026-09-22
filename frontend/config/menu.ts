import {
  LayoutDashboard,
  Users,
  Shield,
  Calendar,
  FileSpreadsheet,
  GraduationCap,
  CheckSquare,
  Bell,
  CreditCard,
  School,
  Inbox
} from "lucide-react"

import type * as React from "react"

export type Role = 
  | "SYSTEM_ADMIN"
  | "ACADEMIC_ADMIN"
  | "ADMISSIONS_OFFICER"
  | "TEACHER"
  | "STUDENT"
  | "PARENT"
  | "APPLICANT"

export interface MenuItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  roles: Role[]
  children?: {
    title: string
    href: string
    roles: Role[]
  }[]
}

export const menuConfig: MenuItem[] = [
  // Dashboard (Global)
  {
    title: "Tổng quan",
    href: "/dashboard",
    icon: LayoutDashboard,
    roles: ["SYSTEM_ADMIN", "ACADEMIC_ADMIN", "ADMISSIONS_OFFICER", "TEACHER", "STUDENT", "PARENT", "APPLICANT"],
  },
  
  // M1: Core Identity
  {
    title: "Người dùng & Phân quyền",
    href: "/dashboard/users",
    icon: Users,
    roles: ["SYSTEM_ADMIN"],
    children: [
      { title: "Danh sách tài khoản", href: "/dashboard/users", roles: ["SYSTEM_ADMIN"] },
      { title: "Quản lý vai trò", href: "/dashboard/roles", roles: ["SYSTEM_ADMIN"] },
      { title: "Nhật ký hệ thống", href: "/dashboard/audit", roles: ["SYSTEM_ADMIN"] },
    ]
  },
  {
    title: "Cấu hình chung",
    href: "/dashboard/settings",
    icon: Shield,
    roles: ["SYSTEM_ADMIN", "ACADEMIC_ADMIN"],
    children: [
      { title: "Năm học & Học kỳ", href: "/dashboard/academic-years", roles: ["SYSTEM_ADMIN", "ACADEMIC_ADMIN"] },
    ]
  },

  // M2: Admissions
  {
    title: "Quản lý tuyển sinh",
    href: "/dashboard/admissions",
    icon: Inbox,
    roles: ["SYSTEM_ADMIN", "ADMISSIONS_OFFICER"],
    children: [
      { title: "Hàng đợi hồ sơ", href: "/dashboard/admissions/queue", roles: ["ADMISSIONS_OFFICER", "SYSTEM_ADMIN"] },
      { title: "Chiến dịch tuyển sinh", href: "/dashboard/admissions/campaigns", roles: ["ADMISSIONS_OFFICER", "SYSTEM_ADMIN"] },
      { title: "Công bố kết quả", href: "/dashboard/admissions/results", roles: ["ADMISSIONS_OFFICER", "SYSTEM_ADMIN"] },
    ]
  },
  {
    title: "Hồ sơ của tôi",
    href: "/dashboard/my-application",
    icon: FileSpreadsheet,
    roles: ["APPLICANT"],
  },

  // M3: Academic & Timetable
  {
    title: "Quản lý đào tạo",
    href: "/dashboard/academic",
    icon: School,
    roles: ["ACADEMIC_ADMIN"],
    children: [
      { title: "Danh sách Lớp học", href: "/dashboard/academic/classes", roles: ["ACADEMIC_ADMIN"] },
      { title: "Danh sách Môn học", href: "/dashboard/academic/subjects", roles: ["ACADEMIC_ADMIN"] },
      { title: "Hồ sơ Học sinh", href: "/dashboard/academic/students", roles: ["ACADEMIC_ADMIN"] },
      { title: "Hồ sơ Giáo viên", href: "/dashboard/academic/teachers", roles: ["ACADEMIC_ADMIN"] },
      { title: "Quản lý Phòng học", href: "/dashboard/academic/rooms", roles: ["ACADEMIC_ADMIN"] },
    ]
  },
  {
    title: "Thời khóa biểu",
    href: "/dashboard/timetable",
    icon: Calendar,
    roles: ["ACADEMIC_ADMIN", "TEACHER", "STUDENT", "PARENT"],
    children: [
      { title: "Xếp thời khóa biểu", href: "/dashboard/timetable/generator", roles: ["ACADEMIC_ADMIN"] },
      { title: "Lịch học của tôi", href: "/dashboard/timetable/me", roles: ["TEACHER", "STUDENT", "PARENT"] },
      { title: "Lịch thi", href: "/dashboard/timetable/exams", roles: ["ACADEMIC_ADMIN", "TEACHER", "STUDENT", "PARENT"] },
    ]
  },

  // M4: Grades & Attendance
  {
    title: "Điểm số",
    href: "/dashboard/grades",
    icon: GraduationCap,
    roles: ["ACADEMIC_ADMIN", "TEACHER", "STUDENT", "PARENT"],
    children: [
      { title: "Sổ điểm lớp", href: "/dashboard/grades/book", roles: ["TEACHER", "ACADEMIC_ADMIN"] },
      { title: "Cấu hình cột điểm", href: "/dashboard/grades/config", roles: ["ACADEMIC_ADMIN"] },
      { title: "Điểm của tôi", href: "/dashboard/grades/me", roles: ["STUDENT", "PARENT"] },
    ]
  },
  {
    title: "Chuyên cần",
    href: "/dashboard/attendance",
    icon: CheckSquare,
    roles: ["ACADEMIC_ADMIN", "TEACHER", "STUDENT", "PARENT"],
    children: [
      { title: "Điểm danh mã QR", href: "/dashboard/attendance/session", roles: ["TEACHER"] },
      { title: "Quản lý vắng/trễ", href: "/dashboard/attendance/list", roles: ["TEACHER", "ACADEMIC_ADMIN"] },
      { title: "Lịch sử điểm danh", href: "/dashboard/attendance/me", roles: ["STUDENT", "PARENT"] },
    ]
  },

  // M5: Finance & Family
  {
    title: "Tài chính",
    href: "/dashboard/finance",
    icon: CreditCard,
    roles: ["ACADEMIC_ADMIN", "PARENT", "STUDENT"],
    children: [
      { title: "Quản lý Hóa đơn", href: "/dashboard/finance/invoices", roles: ["ACADEMIC_ADMIN"] },
      { title: "Đối soát thanh toán", href: "/dashboard/finance/reconciliation", roles: ["ACADEMIC_ADMIN"] },
      { title: "Học phí của tôi", href: "/dashboard/finance/me", roles: ["PARENT", "STUDENT"] },
    ]
  },
  {
    title: "Thông báo",
    href: "/dashboard/notifications",
    icon: Bell,
    roles: ["SYSTEM_ADMIN", "ACADEMIC_ADMIN", "ADMISSIONS_OFFICER", "TEACHER", "STUDENT", "PARENT", "APPLICANT"],
  }
]
