"use client"

import { PageHeader } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { GraduationCap, Calendar, Clock, MapPin, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const MOCK_EXAMS = [
  { id: "EX-001", name: "Thi Giữa kỳ 1 (Khối 10)", date: "20/10/2026", time: "07:30 - 09:00", subject: "Toán học", room: "Phòng 101", class: "10A1", status: "Sắp diễn ra" },
  { id: "EX-002", name: "Thi Giữa kỳ 1 (Khối 10)", date: "21/10/2026", time: "07:30 - 08:15", subject: "Ngữ văn", room: "Phòng 102", class: "10A1", status: "Sắp diễn ra" },
]

export default function TeacherExamSchedulePage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Lịch gác thi" 
        description="Xem danh sách các ca gác thi được phân công." 
      />

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Kỳ thi</TableHead>
                  <TableHead>Môn thi</TableHead>
                  <TableHead>Lớp / Sĩ số</TableHead>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Phòng thi</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_EXAMS.map((exam) => (
                  <TableRow key={exam.id} className="hover:bg-surface-hover/50">
                    <TableCell className="font-semibold text-heading flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-primary" /> {exam.name}
                    </TableCell>
                    <TableCell className="font-medium text-text-secondary">{exam.subject}</TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1 text-sm">
                        <Users className="w-3 h-3 text-muted" /> {exam.class} (35 học sinh)
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 text-sm text-muted">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {exam.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {exam.time}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1 text-sm text-text-secondary font-medium">
                        <MapPin className="w-3 h-3 text-blue-500" /> {exam.room}
                      </span>
                    </TableCell>
                    <TableCell>
                      {exam.status === "Sắp diễn ra" ? (
                        <Badge variant="outline" className="border-blue-500 text-blue-600 bg-blue-50">Sắp diễn ra</Badge>
                      ) : (
                        <Badge variant="outline" className="border-emerald-500 text-emerald-600 bg-emerald-50">Đã hoàn thành</Badge>
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
