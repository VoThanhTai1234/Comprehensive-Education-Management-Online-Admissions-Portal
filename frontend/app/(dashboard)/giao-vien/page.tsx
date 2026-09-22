import { PageHeader } from "@/components/layout/header"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users, BookOpen, Clock, QrCode, FileText } from "lucide-react"
import Link from "next/link"

export default function TeacherDashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Tổng quan Giảng dạy" 
        description="Chào mừng thầy Lê Văn Cường. Đây là lịch trình hôm nay của thầy." 
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Lớp đang phụ trách"
          value="4 Lớp"
          icon={<Users className="w-4 h-4 text-primary" />}
        />
        <StatCard
          title="Số tiết hôm nay"
          value="3 Tiết"
          icon={<BookOpen className="w-4 h-4 text-emerald-500" />}
        />
        <StatCard
          title="Giờ làm việc tuần này"
          value="18 Giờ"
          icon={<Clock className="w-4 h-4 text-blue-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today Schedule */}
        <Card className="col-span-1 lg:col-span-2 shadow-sm border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle>Lịch dạy hôm nay (Thứ 2, 28/09)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
              {[
                { time: "07:30 - 08:15", subject: "Toán Đại Số", class: "10A1", room: "P.201", status: "completed" },
                { time: "08:20 - 09:05", subject: "Toán Hình Học", class: "10A1", room: "P.201", status: "current" },
                { time: "10:00 - 10:45", subject: "Toán Đại Số", class: "11B2", room: "P.305", status: "upcoming" },
              ].map((slot, idx) => (
                <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-surface shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${
                    slot.status === "completed" ? "bg-emerald-500" :
                    slot.status === "current" ? "bg-primary animate-pulse" : "bg-slate-300"
                  }`}>
                    <Clock className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-surface p-4 rounded-xl border border-border shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-heading">{slot.subject}</span>
                      <span className="text-xs font-medium px-2 py-1 bg-surface-hover rounded-md text-muted">{slot.class}</span>
                    </div>
                    <div className="text-sm text-muted">
                      <span>{slot.time}</span> • <span>{slot.room}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="col-span-1 space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Thao tác nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/giao-vien/diem-danh" className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all group">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors">
                  <QrCode className="w-5 h-5 text-primary group-hover:text-white" />
                </div>
                <div>
                  <p className="font-semibold text-heading text-sm">Mở QR Điểm danh</p>
                  <p className="text-xs text-muted">Cho lớp 10A1 hiện tại</p>
                </div>
              </Link>
              <Link href="/giao-vien/nhap-diem" className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-emerald-500 hover:bg-emerald-50 transition-all group">
                <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <FileText className="w-5 h-5 text-emerald-600 group-hover:text-white" />
                </div>
                <div>
                  <p className="font-semibold text-heading text-sm">Nhập điểm</p>
                  <p className="text-xs text-muted">Bài kiểm tra 15p - 11B2</p>
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
