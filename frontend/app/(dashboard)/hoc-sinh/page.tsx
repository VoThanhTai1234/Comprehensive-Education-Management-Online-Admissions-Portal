import { PageHeader } from "@/components/layout/header"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, GraduationCap, ClipboardCheck, Clock } from "lucide-react"

export default function StudentDashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Tổng quan Học tập" 
        description="Xin chào Nguyễn Văn An. Chúc bạn một ngày học tập hiệu quả!" 
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="Lớp hiện tại"
          value="10A1"
          icon={<GraduationCap className="w-4 h-4 text-primary" />}
        />
        <StatCard
          title="Điểm trung bình"
          value="8.5"
          icon={<Calendar className="w-4 h-4 text-emerald-500" />}
          trend={{ value: 0.2, isPositive: true }}
        />
        <StatCard
          title="Chuyên cần"
          value="100%"
          icon={<ClipboardCheck className="w-4 h-4 text-blue-500" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lịch học hôm nay */}
        <Card className="shadow-sm border-t-4 border-t-primary">
          <CardHeader>
            <CardTitle>Lịch học hôm nay</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { time: "07:30", subject: "Toán Đại Số", teacher: "Cô Hương", room: "P.201", type: "Chính khóa" },
                { time: "08:20", subject: "Vật Lý", teacher: "Thầy Hùng", room: "P.201", type: "Chính khóa" },
                { time: "09:10", subject: "Ngoại Ngữ", teacher: "Cô Lan", room: "P.201", type: "Chính khóa" },
                { time: "14:00", subject: "Thể Dục", teacher: "Thầy Tuấn", room: "Sân vận động", type: "Ngoại khóa" },
              ].map((lesson, idx) => (
                <div key={idx} className="flex items-center gap-4 p-3 rounded-lg border border-border bg-surface-hover/50">
                  <div className="w-16 text-center font-semibold text-primary">{lesson.time}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-heading">{lesson.subject}</p>
                    <p className="text-xs text-muted">{lesson.teacher} • {lesson.room}</p>
                  </div>
                  <Badge variant="secondary">{lesson.type}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bài tập & Sự kiện */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Sắp đến hạn</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-heading text-sm">Nộp tiểu luận Lịch Sử</p>
                  <p className="text-xs text-muted mt-1">Hạn chót: 23:59 Hôm nay</p>
                  <div className="mt-2 text-xs font-medium text-amber-600 bg-amber-50 inline-block px-2 py-1 rounded-md">
                    Còn 14 tiếng
                  </div>
                </div>
              </div>
              <div className="w-full h-px bg-border" />
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-heading text-sm">Kiểm tra 15p Hóa Học</p>
                  <p className="text-xs text-muted mt-1">Thời gian: Tiết 2 - Ngày mai</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
