"use client"

import { PageHeader } from "@/components/layout/header"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users, GraduationCap, School, Shield, Server, Activity, UserCog, Clock, BookOpen, AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/contexts/auth-context"

function SystemAdminDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Tổng quan Hệ thống" 
        description="Theo dõi trạng thái, bảo mật và cấu hình toàn hệ thống." 
      />
      
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Tổng tài khoản"
          value="1,425"
          icon={<Users className="w-4 h-4 text-primary" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Đang hoạt động"
          value="1,380"
          icon={<Activity className="w-4 h-4 text-emerald-500" />}
        />
        <StatCard
          title="Số vai trò"
          value="7"
          icon={<UserCog className="w-4 h-4 text-blue-500" />}
        />
        <StatCard
          title="Số quyền"
          value="124"
          icon={<Shield className="w-4 h-4 text-amber-500" />}
        />
      </div>

      {/* Grid: 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1: Hoạt động hệ thống (takes 2 cols on lg) */}
        <Card className="col-span-1 lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle>Nhật ký kiểm toán gần đây</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { time: "10:30 AM", user: "sysadmin", action: "Đã phân quyền ACADEMIC_ADMIN cho user admin@edums.edu.vn", color: "bg-primary" },
                { time: "09:15 AM", user: "sysadmin", action: "Cập nhật cấu hình SMTP Email", color: "bg-blue-500" },
                { time: "Hôm qua", user: "system", action: "Backup database hằng ngày hoàn tất", color: "bg-emerald-500" },
                { time: "Hôm qua", user: "sysadmin", action: "Vô hiệu hóa 5 tài khoản spam", color: "bg-amber-500" },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${item.color} mt-1.5`} />
                    {idx !== 3 && <div className="w-px h-full bg-border mt-2" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-sm font-medium text-heading">{item.action}</p>
                    <p className="text-xs text-muted mt-1">{item.time} • bởi {item.user}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Column 2: Trạng thái hệ thống */}
        <Card className="col-span-1 shadow-sm border-t-4 border-t-emerald-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5 text-emerald-500" /> Trạng thái Server
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm font-medium text-heading mb-2">
                <span>CPU Usage</span>
                <span>24%</span>
              </div>
              <div className="w-full bg-surface-hover rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "24%" }} />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm font-medium text-heading mb-2">
                <span>Memory</span>
                <span>4.2 GB / 16 GB</span>
              </div>
              <div className="w-full bg-surface-hover rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "35%" }} />
              </div>
            </div>

            <div className="p-4 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-100 flex items-start gap-3">
              <Activity className="w-5 h-5 shrink-0" />
              <div className="text-sm">
                <p className="font-semibold">Hệ thống ổn định</p>
                <p className="text-xs opacity-90 mt-1">Uptime: 99.98% trong 30 ngày qua.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function AcademicAdminDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Tổng quan Đào tạo" 
        description="Thống kê chuyên sâu về học thuật, giáo viên và lớp học." 
      />
      
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Tổng số Học sinh"
          value="1,240"
          icon={<Users className="w-4 h-4 text-primary" />}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Tổng số Giáo viên"
          value="85"
          icon={<GraduationCap className="w-4 h-4 text-blue-500" />}
          trend={{ value: 3, isPositive: true }}
        />
        <StatCard
          title="Lớp đang hoạt động"
          value="42"
          icon={<School className="w-4 h-4 text-amber-500" />}
        />
        <StatCard
          title="Phòng học"
          value="30"
          icon={<BookOpen className="w-4 h-4 text-emerald-500" />}
        />
      </div>

      {/* Grid: 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1: Hoạt động học thuật (takes 2 cols on lg) */}
        <Card className="col-span-1 lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle>Lịch học hôm nay</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "07:30 - 08:15", subject: "Toán Đại Số", class: "10A1", teacher: "Lê Văn Cường" },
                { time: "07:30 - 08:15", subject: "Ngữ Văn", class: "10A2", teacher: "Trần Thị Lan" },
                { time: "08:20 - 09:05", subject: "Vật Lý", class: "11B1", teacher: "Nguyễn Quang Hải" },
                { time: "08:20 - 09:05", subject: "Hóa Học", class: "12C1", teacher: "Phạm Hữu Nghĩa" },
              ].map((slot, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 rounded-lg border border-border bg-surface-hover/50">
                  <div className="w-32 font-semibold text-primary">{slot.time}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-heading">{slot.subject} - Lớp {slot.class}</p>
                    <p className="text-xs text-muted">GV: {slot.teacher}</p>
                  </div>
                  <div className="text-xs font-medium px-2 py-1 bg-surface rounded-md text-muted border border-border">Đang diễn ra</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Column 2: Alerts */}
        <div className="col-span-1 space-y-6">
          <Card className="shadow-sm border-l-4 border-l-amber-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-amber-600">
                <AlertCircle className="w-5 h-5" /> Xung đột TKB
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-heading font-medium">Phát hiện 2 xung đột</p>
              <p className="text-xs text-muted mt-1 mb-3">Vui lòng điều chỉnh lại lịch giảng dạy.</p>
              <div className="space-y-2">
                <div className="p-2 bg-amber-50 text-amber-800 text-xs rounded-md border border-amber-100">
                  <span className="font-semibold">Thầy Lê Văn Cường:</span> Trùng lịch tiết 3 Thứ 2 (10A1 và 11B2).
                </div>
                <div className="p-2 bg-amber-50 text-amber-800 text-xs rounded-md border border-amber-100">
                  <span className="font-semibold">P.201:</span> Bị gán cho cả lớp 10A2 và 10A3 tiết 1 Thứ 3.
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <Clock className="w-5 h-5" /> Kỳ thi sắp tới
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                <p className="text-sm font-semibold text-blue-800">Thi Giữa Kỳ I - Khối 10, 11</p>
                <p className="text-xs text-blue-700 mt-1">Bắt đầu sau: 14 ngày</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboardPage() {
  const { primaryRole } = useAuth()

  // Default to ACADEMIC_ADMIN if not SYSTEM_ADMIN for fallback, 
  // though the menu already correctly restricts access based on role.
  if (primaryRole === "SYSTEM_ADMIN") {
    return <SystemAdminDashboard />
  }

  return <AcademicAdminDashboard />
}
