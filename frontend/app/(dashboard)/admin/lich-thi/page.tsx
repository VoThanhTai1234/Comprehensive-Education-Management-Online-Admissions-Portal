"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Modal } from "@/components/ui/modal"
import { useToast } from "@/components/ui/toaster"
import { Plus, Edit, Trash2, GraduationCap, Calendar, Clock, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const MOCK_EXAMS = [
  { id: "EX-001", name: "Thi Giữa kỳ 1 (Khối 10)", date: "20/10/2026", time: "07:30 - 09:00", subject: "Toán học", room: "Phòng 101", status: "Sắp diễn ra" },
  { id: "EX-002", name: "Thi Giữa kỳ 1 (Khối 10)", date: "21/10/2026", time: "07:30 - 08:15", subject: "Ngữ văn", room: "Phòng 102", status: "Sắp diễn ra" },
  { id: "EX-003", name: "Thi Khảo sát Chất lượng", date: "05/09/2026", time: "08:00 - 10:00", subject: "Tiếng Anh", room: "Phòng 201", status: "Đã hoàn thành" },
]

export default function ExamScheduleManagementPage() {
  const { toast } = useToast()
  const [exams, setExams] = useState(MOCK_EXAMS)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingExam, setEditingExam] = useState<typeof MOCK_EXAMS[0] | null>(null)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsModalOpen(false)
    toast({
      title: editingExam ? "Cập nhật thành công" : "Thêm mới thành công",
      description: "Dữ liệu lịch thi đã được lưu hệ thống.",
      variant: "success"
    })
  }

  const handleDelete = (id: string) => {
    setExams(exams.filter(e => e.id !== id))
    toast({ title: "Đã xóa lịch thi", description: "Bản ghi đã bị xóa." })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Quản lý Lịch thi" 
        description="Lên kế hoạch các kỳ thi tập trung, phân bổ môn thi và phòng thi." 
        action={
          <Button className="bg-primary hover:bg-primary-dark" onClick={() => { setEditingExam(null); setIsModalOpen(true) }}>
            <Plus className="w-4 h-4 mr-2" /> Thêm Lịch thi
          </Button>
        }
      />

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Kỳ thi</TableHead>
                  <TableHead>Môn thi</TableHead>
                  <TableHead>Thời gian</TableHead>
                  <TableHead>Phòng thi</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exams.map((exam) => (
                  <TableRow key={exam.id} className="hover:bg-surface-hover/50">
                    <TableCell className="font-semibold text-heading flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-primary" /> {exam.name}
                    </TableCell>
                    <TableCell className="font-medium text-text-secondary">{exam.subject}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 text-sm text-muted">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {exam.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {exam.time}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1 text-sm text-text-secondary">
                        <MapPin className="w-3 h-3 text-muted" /> {exam.room}
                      </span>
                    </TableCell>
                    <TableCell>
                      {exam.status === "Sắp diễn ra" ? (
                        <Badge variant="outline" className="border-blue-500 text-blue-600 bg-blue-50">Sắp diễn ra</Badge>
                      ) : (
                        <Badge variant="outline" className="border-emerald-500 text-emerald-600 bg-emerald-50">Đã hoàn thành</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => { setEditingExam(exam); setIsModalOpen(true) }}>
                          <Edit className="w-4 h-4 text-blue-500" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(exam.id)}>
                          <Trash2 className="w-4 h-4 text-error" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {exams.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted">
                      Chưa có lịch thi nào được xếp.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingExam ? "Cập nhật lịch thi" : "Thêm lịch thi mới"}
        description="Điền thông tin kỳ thi, ngày giờ và phòng thi để thông báo cho học sinh."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-heading">Tên Kỳ thi</label>
            <Input required defaultValue={editingExam?.name} placeholder="VD: Thi Giữa kỳ 1 (Khối 10)" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">Môn thi</label>
              <Input required defaultValue={editingExam?.subject} placeholder="VD: Toán học" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">Phòng thi</label>
              <Input required defaultValue={editingExam?.room} placeholder="VD: Phòng 101" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">Ngày thi</label>
              <Input required defaultValue={editingExam?.date} placeholder="DD/MM/YYYY" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">Giờ thi</label>
              <Input required defaultValue={editingExam?.time} placeholder="VD: 07:30 - 09:00" />
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Hủy</Button>
            <Button type="submit" className="bg-primary hover:bg-primary-dark">Lưu</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
