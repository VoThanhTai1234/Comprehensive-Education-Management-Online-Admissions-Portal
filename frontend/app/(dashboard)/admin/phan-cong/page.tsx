"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { Modal } from "@/components/ui/modal"
import { useToast } from "@/components/ui/toaster"
import { Plus, Trash2, ClipboardList, BookOpen, UserCheck, School } from "lucide-react"
import { MOCK_ASSIGNMENTS, MOCK_CLASSES, MOCK_SUBJECTS, MOCK_TEACHERS } from "@/mocks/academic"
import { Badge } from "@/components/ui/badge"

export default function TeachingAssignmentPage() {
  const { toast } = useToast()
  const [assignments, setAssignments] = useState(MOCK_ASSIGNMENTS)
  const [classFilter, setClassFilter] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Form State
  const [selectedClass, setSelectedClass] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedTeacher, setSelectedTeacher] = useState("")

  const filteredAssignments = classFilter ? assignments.filter(a => a.classId === classFilter) : assignments

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedClass || !selectedSubject || !selectedTeacher) {
      toast({ title: "Lỗi", description: "Vui lòng chọn đầy đủ thông tin", variant: "destructive" })
      return
    }

    const cls = MOCK_CLASSES.find(c => c.id === selectedClass)
    const sub = MOCK_SUBJECTS.find(s => s.id === selectedSubject)
    const tchr = MOCK_TEACHERS.find(t => t.id === selectedTeacher)

    if (cls && sub && tchr) {
      const newAssignment = {
        id: `ASG-${Date.now()}`,
        classId: cls.id,
        className: cls.name,
        subjectId: sub.id,
        subjectName: sub.name,
        teacherId: tchr.id,
        teacherName: tchr.name,
        periods: sub.periodsPerWeek
      }
      setAssignments([...assignments, newAssignment])
      setIsModalOpen(false)
      setSelectedClass("")
      setSelectedSubject("")
      setSelectedTeacher("")
      toast({
        title: "Phân công thành công",
        description: `Đã phân công ${tchr.name} dạy ${sub.name} lớp ${cls.name}.`,
        variant: "success"
      })
    }
  }

  const handleDelete = (id: string) => {
    setAssignments(assignments.filter(a => a.id !== id))
    toast({ title: "Đã xóa phân công", description: "Bản ghi đã bị xóa khỏi hệ thống." })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Phân công Giảng dạy" 
        description="Quản lý việc phân công giáo viên phụ trách các bộ môn cho từng lớp học." 
        action={
          <Button className="bg-primary hover:bg-primary-dark" onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> Thêm Phân công
          </Button>
        }
      />

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="p-4 border-b bg-surface-hover/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-muted">Lọc theo Lớp:</span>
              <Select 
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                options={[
                  { label: "Tất cả lớp", value: "" },
                  ...MOCK_CLASSES.map(c => ({ label: c.name, value: c.id }))
                ]}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Lớp</TableHead>
                  <TableHead>Môn học</TableHead>
                  <TableHead>Giáo viên phụ trách</TableHead>
                  <TableHead className="text-center">Số tiết/tuần</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssignments.map((asg) => (
                  <TableRow key={asg.id} className="hover:bg-surface-hover/50">
                    <TableCell className="font-semibold text-heading flex items-center gap-2">
                      <School className="w-4 h-4 text-primary" /> {asg.className}
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-2 text-text-secondary">
                        <BookOpen className="w-4 h-4 text-muted" /> {asg.subjectName}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-2 font-medium">
                        <UserCheck className="w-4 h-4 text-emerald-500" /> {asg.teacherName}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline" className="bg-surface">{asg.periods} tiết</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(asg.id)}>
                        <Trash2 className="w-4 h-4 text-error" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredAssignments.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted">
                      Chưa có dữ liệu phân công giảng dạy cho lớp này.
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
        title="Thêm Phân công mới"
        description="Chọn Lớp, Môn học và Giáo viên để tạo bản ghi phân công giảng dạy."
      >
        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">1. Chọn Lớp học</label>
              <Select 
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                options={[
                  { label: "-- Chọn Lớp --", value: "" },
                  ...MOCK_CLASSES.map(c => ({ label: c.name, value: c.id }))
                ]}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">2. Chọn Môn học</label>
              <Select 
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                options={[
                  { label: "-- Chọn Môn --", value: "" },
                  ...MOCK_SUBJECTS.map(s => ({ label: `${s.name} (${s.periodsPerWeek} tiết/tuần)`, value: s.id }))
                ]}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">3. Chọn Giáo viên</label>
              <Select 
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                options={[
                  { label: "-- Chọn Giáo viên --", value: "" },
                  ...MOCK_TEACHERS.map(t => ({ label: `${t.name} - ${t.department}`, value: t.id }))
                ]}
              />
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-md flex gap-3">
            <ClipboardList className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Lưu ý</p>
              <p>Phân công này sẽ tự động cung cấp dữ liệu đầu vào cho bộ thuật toán xếp Thời khóa biểu. Hãy đảm bảo môn học thuộc đúng chuyên môn của giáo viên.</p>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Hủy</Button>
            <Button type="submit" className="bg-primary hover:bg-primary-dark">Lưu Phân công</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
