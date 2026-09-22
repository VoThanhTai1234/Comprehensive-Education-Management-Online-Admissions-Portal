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
import { Plus, Search, Edit, Trash2, Users, School } from "lucide-react"
import { MOCK_CLASSES, MOCK_TEACHERS, MOCK_ROOMS } from "@/mocks/academic"

export default function ClassManagementPage() {
  const { toast } = useToast()
  const [classes, setClasses] = useState(MOCK_CLASSES)
  const [search, setSearch] = useState("")
  const [gradeFilter, setGradeFilter] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingClass, setEditingClass] = useState<typeof MOCK_CLASSES[0] | null>(null)

  const filteredClasses = classes.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase())
    const matchGrade = gradeFilter === "" || c.grade.toString() === gradeFilter
    return matchSearch && matchGrade
  })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsModalOpen(false)
    toast({
      title: editingClass ? "Cập nhật thành công" : "Thêm mới thành công",
      description: "Dữ liệu lớp học đã được lưu.",
      variant: "success"
    })
  }

  const handleDelete = (id: string) => {
    setClasses(classes.filter(c => c.id !== id))
    toast({ title: "Đã xóa", description: "Bản ghi lớp học đã bị xóa khỏi hệ thống." })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Quản lý Lớp học" 
        description="Quản lý danh sách các lớp, phân công giáo viên chủ nhiệm và phòng học." 
        action={
          <Button className="bg-primary hover:bg-primary-dark" onClick={() => { setEditingClass(null); setIsModalOpen(true) }}>
            <Plus className="w-4 h-4 mr-2" /> Thêm Lớp học
          </Button>
        }
      />

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="p-4 border-b bg-surface-hover/50 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <Input 
                placeholder="Tìm tên lớp..." 
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex w-full sm:w-auto items-center gap-3">
              <Select 
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
                options={[
                  { label: "Tất cả khối", value: "" },
                  { label: "Khối 10", value: "10" },
                  { label: "Khối 11", value: "11" },
                  { label: "Khối 12", value: "12" },
                ]}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Tên Lớp</TableHead>
                  <TableHead>Khối</TableHead>
                  <TableHead>Năm học</TableHead>
                  <TableHead>Giáo viên chủ nhiệm</TableHead>
                  <TableHead>Phòng học</TableHead>
                  <TableHead className="text-center">Sĩ số</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClasses.map((cls) => (
                  <TableRow key={cls.id} className="hover:bg-surface-hover/50">
                    <TableCell className="font-semibold text-heading flex items-center gap-2">
                      <School className="w-4 h-4 text-primary" /> {cls.name}
                    </TableCell>
                    <TableCell>Khối {cls.grade}</TableCell>
                    <TableCell className="text-text-secondary">{cls.academicYear}</TableCell>
                    <TableCell className="font-medium">{cls.homeroomTeacher}</TableCell>
                    <TableCell>{cls.room}</TableCell>
                    <TableCell className="text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-surface rounded-full text-xs font-medium border border-border">
                        <Users className="w-3 h-3 text-muted" /> {cls.studentCount}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => { setEditingClass(cls); setIsModalOpen(true) }}>
                          <Edit className="w-4 h-4 text-blue-500" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(cls.id)}>
                          <Trash2 className="w-4 h-4 text-error" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredClasses.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted">
                      Không tìm thấy lớp học nào.
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
        title={editingClass ? "Cập nhật lớp học" : "Thêm lớp học mới"}
        description="Điền thông tin lớp học, chọn giáo viên chủ nhiệm và phòng học."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">Tên Lớp</label>
              <Input required defaultValue={editingClass?.name} placeholder="VD: 10A1" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">Khối</label>
              <Select 
                options={[
                  { label: "Khối 10", value: "10" },
                  { label: "Khối 11", value: "11" },
                  { label: "Khối 12", value: "12" },
                ]}
                defaultValue={editingClass?.grade?.toString()}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">Giáo viên chủ nhiệm</label>
              <Select 
                options={MOCK_TEACHERS.map(t => ({ label: t.name, value: t.id }))}
                defaultValue={MOCK_TEACHERS.find(t => t.name === editingClass?.homeroomTeacher)?.id}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">Phòng học (mặc định)</label>
              <Select 
                options={MOCK_ROOMS.map(r => ({ label: r.name, value: r.id }))}
                defaultValue={MOCK_ROOMS.find(r => r.name === editingClass?.room)?.id}
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
