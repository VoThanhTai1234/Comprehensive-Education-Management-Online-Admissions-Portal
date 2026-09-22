"use client"

import { PageHeader } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BookOpen, Award, Medal, MessageSquare } from "lucide-react"
import { MOCK_SEMESTER_RESULTS } from "@/mocks/grades"
import { Badge } from "@/components/ui/badge"

export default function StudentGradesPage() {
  const calculateGPA = () => {
    if (MOCK_SEMESTER_RESULTS.length === 0) return 0;
    const total = MOCK_SEMESTER_RESULTS.reduce((acc, curr) => acc + curr.average, 0);
    return (total / MOCK_SEMESTER_RESULTS.length).toFixed(2);
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Kết quả Học tập" 
        description="Xem điểm số các môn học và nhận xét từ giáo viên trong học kỳ." 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-none">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 font-medium text-sm">Điểm Trung bình (GPA)</p>
                <div className="text-4xl font-bold mt-2">{calculateGPA()}</div>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm text-blue-100 bg-black/10 w-fit px-3 py-1 rounded-full">
              Xếp loại: Xuất sắc
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-heading text-base flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" /> Nhận xét chung của GVCN
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-text-secondary italic bg-surface-hover p-4 rounded-lg border border-border">
              &quot;Trần Bình có thái độ học tập rất nghiêm túc, đặc biệt có tiến bộ rõ rệt trong các môn Khoa học Tự nhiên. Tuy nhiên cần chú ý rèn luyện thêm kỹ năng giao tiếp và làm việc nhóm trong các môn Xã hội. Hãy tiếp tục phát huy trong học kỳ tới!&quot;
            </p>
            <p className="text-xs text-muted mt-2 font-medium">— GV. Nguyễn Văn Toàn</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-heading flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" /> Bảng điểm Chi tiết - Học kỳ 1
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="w-[200px]">Môn học</TableHead>
                  <TableHead className="text-center">Giữa kỳ (Hệ số 2)</TableHead>
                  <TableHead className="text-center">Cuối kỳ (Hệ số 3)</TableHead>
                  <TableHead className="text-center font-bold text-primary bg-primary/5 border-x border-border">Trung bình môn</TableHead>
                  <TableHead className="text-right">Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_SEMESTER_RESULTS.map((result, index) => (
                  <TableRow key={index} className="hover:bg-surface-hover/50">
                    <TableCell className="font-semibold text-heading">{result.subject}</TableCell>
                    <TableCell className="text-center">{result.midterm}</TableCell>
                    <TableCell className="text-center">{result.final}</TableCell>
                    <TableCell className="text-center font-bold text-primary bg-primary/5 border-x border-border">
                      {result.average.toFixed(1)}
                    </TableCell>
                    <TableCell className="text-right">
                      {result.status === "Đạt" ? (
                        <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none"><Medal className="w-3 h-3 mr-1" /> Đạt</Badge>
                      ) : (
                        <Badge variant="outline" className="text-error border-error bg-error/10">Không đạt</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
