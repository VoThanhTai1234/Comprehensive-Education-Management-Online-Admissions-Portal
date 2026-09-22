"use client"

import { PageHeader } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, CheckCircle, AlertTriangle } from "lucide-react"

export default function AdmissionsOfficerDashboard() {
  const stats = [
    { label: "Tổng hồ sơ năm nay", value: 450, icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Hồ sơ chờ duyệt", value: 125, icon: FileText, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Cần bổ sung", value: 24, icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10" },
    { label: "Đã trúng tuyển", value: 180, icon: CheckCircle, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Tổng quan Tuyển sinh" 
        description="Theo dõi tiến độ và trạng thái các đợt tuyển sinh đang diễn ra." 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <Card key={idx} className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted">{stat.label}</p>
                  <p className="text-2xl font-bold text-heading mt-1">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Tiến độ Chiến dịch Tuyển sinh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "Tuyển sinh Lớp 10 Chuyên", progress: 85, total: 200, current: 170 },
                { name: "Tuyển sinh Lớp 10 Đại trà", progress: 45, total: 500, current: 225 },
                { name: "Tuyển sinh Bổ sung", progress: 10, total: 50, current: 5 },
              ].map((campaign, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-heading">{campaign.name}</span>
                    <span className="text-muted">{campaign.current} / {campaign.total} hồ sơ</span>
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-1000" 
                      style={{ width: `${campaign.progress}%` }} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Cần xử lý ngay</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-error/10 border border-error/20 rounded-lg flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-error shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-error text-sm">15 hồ sơ quá hạn duyệt</h4>
                  <p className="text-xs text-error/80 mt-1">Vui lòng ưu tiên xử lý các hồ sơ đã nộp quá 3 ngày.</p>
                </div>
              </div>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
                <FileText className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-800 text-sm">8 hồ sơ vừa bổ sung minh chứng</h4>
                  <p className="text-xs text-amber-700/80 mt-1">Cần xem xét lại các minh chứng vừa được tải lên.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
