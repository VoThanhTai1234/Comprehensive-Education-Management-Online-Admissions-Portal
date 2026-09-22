"use client"

import { PageHeader } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { BookOpen, CalendarDays, CheckCircle2, AlertTriangle, Clock, Medal } from "lucide-react"

import { MOCK_SEMESTER_RESULTS } from "@/mocks/grades"
import { MOCK_STUDENT_ATTENDANCE_HISTORY } from "@/mocks/attendance"

export default function ChildDetailPage() {
  const getAttendanceBadge = (status: string) => {
    if (status === "PRESENT") return <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none">Có mặt</Badge>
    if (status === "ABSENT_EXCUSED") return <Badge variant="outline" className="text-warning border-warning bg-warning/10">Vắng có phép</Badge>
    if (status === "ABSENT_UNEXCUSED") return <Badge variant="outline" className="text-error border-error bg-error/10">Vắng không phép</Badge>
    if (status === "LATE") return <Badge variant="outline" className="text-amber-500 border-amber-500 bg-amber-500/10">Đi trễ</Badge>
    return <Badge variant="outline">Chưa điểm danh</Badge>
  }

  const calculateGPA = () => {
    if (MOCK_SEMESTER_RESULTS.length === 0) return 0;
    const total = MOCK_SEMESTER_RESULTS.reduce((acc, curr) => acc + curr.average, 0);
    return (total / MOCK_SEMESTER_RESULTS.length).toFixed(2);
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Thông tin chi tiết: Trần Bình" 
        description="Lớp: 10A1 | MSHS: HS26001 | GVCN: Nguyễn Văn Toàn" 
      />

      <Tabs defaultValue="grades" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="grades" className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> Kết quả học tập</TabsTrigger>
          <TabsTrigger value="attendance" className="flex items-center gap-2"><CalendarDays className="w-4 h-4" /> Chuyên cần</TabsTrigger>
        </TabsList>

        <TabsContent value="grades" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Card className="shadow-sm border-l-4 border-l-primary flex-1">
              <CardContent className="p-6 text-center">
                <p className="text-sm text-muted font-medium uppercase mb-2">Điểm Trung Bình (GPA)</p>
                <div className="text-5xl font-bold text-primary">{calculateGPA()}</div>
                <div className="mt-4 flex justify-center">
                  <Badge className="bg-emerald-500 hover:bg-emerald-600"><Medal className="w-3 h-3 mr-1" /> Xuất sắc</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-sm flex-[2]">
              <CardContent className="p-6">
                <h4 className="font-semibold text-heading mb-2">Nhận xét của GVCN</h4>
                <p className="text-sm text-text-secondary italic bg-surface-hover p-4 rounded-lg border border-border">
                  &quot;Trần Bình có thái độ học tập rất nghiêm túc, đặc biệt có tiến bộ rõ rệt trong các môn Khoa học Tự nhiên. Tuy nhiên cần chú ý rèn luyện thêm kỹ năng giao tiếp và làm việc nhóm trong các môn Xã hội. Hãy tiếp tục phát huy trong học kỳ tới!&quot;
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base text-heading">Bảng điểm Chi tiết - Học kỳ 1</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead>Môn học</TableHead>
                      <TableHead className="text-center">Giữa kỳ</TableHead>
                      <TableHead className="text-center">Cuối kỳ</TableHead>
                      <TableHead className="text-center font-bold text-primary">TBM</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_SEMESTER_RESULTS.map((result, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-semibold text-heading">{result.subject}</TableCell>
                        <TableCell className="text-center">{result.midterm}</TableCell>
                        <TableCell className="text-center">{result.final}</TableCell>
                        <TableCell className="text-center font-bold text-primary">{result.average.toFixed(1)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance" className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="shadow-sm border-l-4 border-l-emerald-500 bg-emerald-50/30">
              <CardContent className="p-4">
                <div className="text-sm font-medium text-emerald-800 flex items-center gap-1 mb-2">
                  <CheckCircle2 className="w-4 h-4" /> Tổng Có mặt
                </div>
                <div className="text-3xl font-bold text-emerald-600">85</div>
              </CardContent>
            </Card>
            <Card className="shadow-sm border-l-4 border-l-amber-500 bg-amber-50/30">
              <CardContent className="p-4">
                <div className="text-sm font-medium text-amber-800 flex items-center gap-1 mb-2">
                  <Clock className="w-4 h-4" /> Tổng Đi trễ
                </div>
                <div className="text-3xl font-bold text-amber-600">3</div>
              </CardContent>
            </Card>
            <Card className="shadow-sm border-l-4 border-l-warning bg-warning/10">
              <CardContent className="p-4">
                <div className="text-sm font-medium text-warning flex items-center gap-1 mb-2">
                  <AlertTriangle className="w-4 h-4" /> Vắng có phép
                </div>
                <div className="text-3xl font-bold text-warning">2</div>
              </CardContent>
            </Card>
            <Card className="shadow-sm border-l-4 border-l-error bg-error/10">
              <CardContent className="p-4">
                <div className="text-sm font-medium text-error flex items-center gap-1 mb-2">
                  <AlertTriangle className="w-4 h-4" /> Vắng không phép
                </div>
                <div className="text-3xl font-bold text-error">0</div>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base text-heading">Chi tiết Điểm danh 7 ngày qua</CardTitle>
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
                      <TableRow key={index}>
                        <TableCell className="font-medium text-heading">{record.date}</TableCell>
                        <TableCell className="text-text-secondary">{record.time}</TableCell>
                        <TableCell>{record.subject}</TableCell>
                        <TableCell className="text-right">{getAttendanceBadge(record.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
