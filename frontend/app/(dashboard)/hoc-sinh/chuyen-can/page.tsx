"use client"

import { PageHeader } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarDays, CheckCircle2, AlertTriangle, Clock, Activity } from "lucide-react"
import { MOCK_STUDENT_ATTENDANCE_HISTORY } from "@/mocks/attendance"
import { Badge } from "@/components/ui/badge"

export default function StudentAttendancePage() {
  const getAttendanceBadge = (status: string) => {
    if (status === "PRESENT") return <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none">Có mặt</Badge>
    if (status === "ABSENT_EXCUSED") return <Badge variant="outline" className="text-warning border-warning bg-warning/10">Vắng có phép</Badge>
    if (status === "ABSENT_UNEXCUSED") return <Badge variant="outline" className="text-error border-error bg-error/10">Vắng không phép</Badge>
    if (status === "LATE") return <Badge variant="outline" className="text-amber-500 border-amber-500 bg-amber-500/10">Đi trễ</Badge>
    return <Badge variant="outline">Chưa điểm danh</Badge>
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Lịch sử Chuyên cần" 
        description="Theo dõi tình trạng đi học và điểm danh của bản thân trong học kỳ." 
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-sm border-l-4 border-l-emerald-500 bg-emerald-50/30">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-emerald-800 flex items-center gap-1 mb-2">
              <CheckCircle2 className="w-4 h-4" /> Tổng Có mặt
            </div>
            <div className="text-3xl font-bold text-emerald-600">85<span className="text-sm font-normal text-emerald-600/70 ml-1">tiết</span></div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-l-4 border-l-amber-500 bg-amber-50/30">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-amber-800 flex items-center gap-1 mb-2">
              <Clock className="w-4 h-4" /> Tổng Đi trễ
            </div>
            <div className="text-3xl font-bold text-amber-600">3<span className="text-sm font-normal text-amber-600/70 ml-1">tiết</span></div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-l-4 border-l-warning bg-warning/10">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-warning flex items-center gap-1 mb-2">
              <AlertTriangle className="w-4 h-4" /> Vắng có phép
            </div>
            <div className="text-3xl font-bold text-warning">2<span className="text-sm font-normal text-warning/70 ml-1">tiết</span></div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-l-4 border-l-error bg-error/10">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-error flex items-center gap-1 mb-2">
              <AlertTriangle className="w-4 h-4" /> Vắng không phép
            </div>
            <div className="text-3xl font-bold text-error">0<span className="text-sm font-normal text-error/70 ml-1">tiết</span></div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle className="text-heading flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-primary" /> Chi tiết Điểm danh 7 ngày qua
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead>Ngày học</TableHead>
                    <TableHead>Thời gian</TableHead>
                    <TableHead>Môn học</TableHead>
                    <TableHead className="text-right">Trạng thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {MOCK_STUDENT_ATTENDANCE_HISTORY.map((record, index) => (
                    <TableRow key={index} className="hover:bg-surface-hover/50">
                      <TableCell className="font-medium text-heading">{record.date}</TableCell>
                      <TableCell className="text-text-secondary">{record.time}</TableCell>
                      <TableCell>{record.subject}</TableCell>
                      <TableCell className="text-right">
                        {getAttendanceBadge(record.status)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-heading flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" /> Cảnh báo Học vụ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-100 flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-emerald-800 text-sm">Tình trạng rất tốt</h4>
                  <p className="text-xs text-emerald-600 mt-1">Tỷ lệ đi học của bạn đạt 95%. Hãy tiếp tục phát huy!</p>
                </div>
              </div>
              
              <div className="text-xs text-muted">
                <p className="font-semibold text-heading mb-1">Quy chế nhà trường:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Nghỉ học không phép quá 10% số tiết sẽ bị cấm thi.</li>
                  <li>Đi trễ 3 lần tính thành 1 lần vắng không phép.</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
