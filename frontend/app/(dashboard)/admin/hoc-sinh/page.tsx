"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Modal } from "@/components/ui/modal"
import { useToast } from "@/components/ui/toaster"
import { Plus, Search, Filter, Edit, Trash2, GraduationCap, CalendarDays } from "lucide-react"
import { MOCK_STUDENTS, MOCK_CLASSES } from "@/mocks/academic"
import { Badge } from "@/components/ui/badge"

export default function StudentManagementPage() {
  const { toast } = useToast()
  const [students, setStudents] = useState(MOCK_STUDENTS)
  const [search, setSearch] = useState("")
  const [classFilter, setClassFilter] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingStudent, setEditingStudent] = useState<typeof MOCK_STUDENTS[0] | null>(null)

  const filteredStudents = students.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.studentCode.toLowerCase().includes(search.toLowerCase())
    const matchClass = classFilter === "" || s.classId === classFilter
    return matchSearch && matchClass
  })

  const getClassName = (classId: string) => {
    return MOCK_CLASSES.find(c => c.id === classId)?.name || "Chưa xếp lớp"
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsModalOpen(false)
    toast({
      title: editingStudent ? "Cập nhật thành công" : "Thêm mới thành công",
      description: "Dữ liệu học sinh đã được lưu.",
      variant: "success"
    })
  }

  const handleDelete = (id: string) => {
    setStudents(students.filter(s => s.id !== id))
    toast({ title: "Đã xóa học sinh", description: "Bản ghi đã bị xóa khỏi hệ thống." })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Quản lý Học sinh" 
        description="Tra cứu, cập nhật hồ sơ học sinh và xếp lớp đầu năm." 
        action={
          <div className="flex gap-2">
            <Button variant="outline">Nhập từ Excel</Button>
            <Button className="bg-primary hover:bg-primary-dark" onClick={() => { setEditingStudent(null); setIsModalOpen(true) }}>
              <Plus className="w-4 h-4 mr-2" /> Thêm Học sinh
            </Button>
          </div>
        }
      />

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="p-4 border-b bg-surface-hover/50 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <Input 
                placeholder="Tìm mã HS, họ tên..." 
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex w-full sm:w-auto items-center gap-3">
              <Select 
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                options={[
                  { label: "Tất cả lớp", value: "" },
                  ...MOCK_CLASSES.map(c => ({ label: c.name, value: c.id }))
                ]}
              />
              <Button variant="outline"><Filter className="w-4 h-4 mr-2" /> Lọc</Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="w-[100px]">Mã HS</TableHead>
                  <TableHead>Họ và tên</TableHead>
                  <TableHead>Giới tính</TableHead>
                  <TableHead>Ngày sinh</TableHead>
                  <TableHead>Lớp</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-surface-hover/50">
                    <TableCell className="font-mono text-sm text-muted">{student.studentCode}</TableCell>
                    <TableCell className="font-semibold text-heading flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-primary" /> {student.name}
                    </TableCell>
                    <TableCell>{student.gender}</TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1 text-sm text-muted">
                        <CalendarDays className="w-3 h-3" /> {student.dob}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium text-text-secondary">
                      {getClassName(student.classId)}
                    </TableCell>
                    <TableCell>
                      {student.status === "Đang học" ? (
                        <Badge variant="outline" className="border-emerald-500 text-emerald-600 bg-emerald-50">Đang học</Badge>
                      ) : (
                        <Badge variant="outline" className="border-warning text-warning bg-warning/10">Bảo lưu</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => { setEditingStudent(student); setIsModalOpen(true) }}>
                          <Edit className="w-4 h-4 text-blue-500" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(student.id)}>
                          <Trash2 className="w-4 h-4 text-error" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredStudents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted">
                      Không tìm thấy học sinh nào.
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
        title={editingStudent ? "Cập nhật hồ sơ học sinh" : "Thêm học sinh mới"}
        description="Điền thông tin lý lịch và xếp lớp cho học sinh."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">Mã học sinh</label>
              <Input required defaultValue={editingStudent?.studentCode} placeholder="VD: HS26001" disabled={!!editingStudent} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">Họ và tên</label>
              <Input required defaultValue={editingStudent?.name} placeholder="VD: Trần Bình" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">Ngày sinh</label>
              <Input required type="date" defaultValue={editingStudent?.dob} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">Giới tính</label>
              <Select 
                options={[
                  { label: "Nam", value: "Nam" },
                  { label: "Nữ", value: "Nữ" },
                  { label: "Khác", value: "Khác" },
                ]}
                defaultValue={editingStudent?.gender || "Nam"}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">Xếp lớp</label>
              <Select 
                options={[
                  { label: "Chưa xếp lớp", value: "" },
                  ...MOCK_CLASSES.map(c => ({ label: c.name, value: c.id }))
                ]}
                defaultValue={editingStudent?.classId || ""}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">Trạng thái</label>
              <Select 
                options={[
                  { label: "Đang học", value: "Đang học" },
                  { label: "Bảo lưu", value: "Bảo lưu" },
                  { label: "Đã thôi học", value: "Đã thôi học" },
                ]}
                defaultValue={editingStudent?.status || "Đang học"}
              />
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
