"use client"

import { PageHeader } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, GraduationCap, CalendarDays, Receipt, ChevronRight, Activity, Bell } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/contexts/auth-context"
import { MOCK_NOTIFICATIONS } from "@/mocks/notifications"

export default function ParentDashboardPage() {
  const { user } = useAuth()
  const router = useRouter()
  
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title={`Xin chào, Phụ huynh Nguyễn Văn A`} 
        description="Chào mừng bạn đến với Cổng thông tin Phụ huynh EduMS."
        action={
          <Button onClick={() => router.push("/phu-huynh/lien-ket")}>
            <Users className="w-4 h-4 mr-2" /> Thêm hồ sơ con
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-sm border-l-4 border-l-blue-500 hover:shadow-md transition-all group">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" /> Tài khoản liên kết
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-heading">1</div>
            <p className="text-xs text-muted mt-1">Trần Bình (10A1)</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-l-4 border-l-emerald-500 hover:shadow-md transition-all group cursor-pointer" onClick={() => router.push('/phu-huynh/con')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-500" /> Điểm trung bình
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-heading">8.4</div>
            <p className="text-xs text-emerald-600 mt-1 font-medium group-hover:translate-x-1 transition-transform flex items-center">
              Xem chi tiết <ChevronRight className="w-3 h-3 ml-1" />
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-l-4 border-l-amber-500 hover:shadow-md transition-all">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-500" /> Chuyên cần
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-heading">98%</div>
            <p className="text-xs text-amber-600 mt-1 font-medium">1 vắng (có phép), 1 trễ</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-l-4 border-l-error hover:shadow-md transition-all group cursor-pointer" onClick={() => router.push('/phu-huynh/hoc-phi')}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted flex items-center gap-2">
              <Receipt className="w-4 h-4 text-error" /> Học phí chưa thanh toán
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-heading">4,500,000đ</div>
            <p className="text-xs text-error mt-1 font-medium flex items-center group-hover:translate-x-1 transition-transform">
              Thanh toán ngay <ChevronRight className="w-3 h-3 ml-1" />
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-heading text-base">
              <CalendarDays className="w-5 h-5 text-primary" /> Lịch học tuần này (Trần Bình - 10A1)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4 p-3 rounded-lg bg-surface-hover border border-border">
                <div className="flex flex-col items-center justify-center bg-primary/10 text-primary rounded-md p-2 w-16 shrink-0">
                  <span className="text-xs font-semibold uppercase">Hôm nay</span>
                  <span className="text-lg font-bold">22/09</span>
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-semibold text-heading text-sm">Sáng: 4 tiết</h4>
                  <p className="text-xs text-muted mt-0.5">Toán (2 tiết), Ngữ văn (2 tiết)</p>
                </div>
              </div>
              <div className="flex gap-4 p-3 rounded-lg border border-border">
                <div className="flex flex-col items-center justify-center bg-muted/10 text-muted-foreground rounded-md p-2 w-16 shrink-0">
                  <span className="text-xs font-semibold uppercase">Ngày mai</span>
                  <span className="text-lg font-bold">23/09</span>
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-semibold text-heading text-sm">Sáng: 5 tiết</h4>
                  <p className="text-xs text-muted mt-0.5">Tiếng Anh, Vật lý, Hóa học...</p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4" onClick={() => router.push("/phu-huynh/con")}>
               Xem Thời khóa biểu đầy đủ
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-heading text-base">
              <Bell className="w-5 h-5 text-primary" /> Thông báo mới nhất
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {MOCK_NOTIFICATIONS.PARENT.slice(0, 3).map((notification) => (
                <div key={notification.id} className="flex gap-3 items-start">
                  <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    notification.type === 'alert' ? 'bg-error' :
                    notification.type === 'success' ? 'bg-emerald-500' :
                    notification.type === 'calendar' ? 'bg-amber-500' : 'bg-blue-500'
                  }`}></div>
                  <div>
                    <h4 className="font-semibold text-sm text-heading">{notification.title}</h4>
                    <p className="text-xs text-text-secondary mt-1 line-clamp-2">{notification.desc}</p>
                    <p className="text-[10px] text-muted mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-primary hover:text-primary-dark" onClick={() => router.push("/phu-huynh/thong-bao")}>
               Xem tất cả thông báo
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
