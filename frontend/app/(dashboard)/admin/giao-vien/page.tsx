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
import { Plus, Search, Edit, Trash2, UserCheck, Phone, Mail } from "lucide-react"
import { MOCK_TEACHERS } from "@/mocks/academic"
import { Badge } from "@/components/ui/badge"

export default function TeacherManagementPage() {
  const { toast } = useToast()
  const [teachers, setTeachers] = useState(MOCK_TEACHERS)
  const [search, setSearch] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTeacher, setEditingTeacher] = useState<typeof MOCK_TEACHERS[0] | null>(null)

  const filteredTeachers = teachers.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.email.toLowerCase().includes(search.toLowerCase())
    const matchDept = departmentFilter === "" || t.department === departmentFilter
    return matchSearch && matchDept
  })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsModalOpen(false)
    toast({
      title: editingTeacher ? "Cập nhật thành công" : "Thêm mới thành công",
      description: "Dữ liệu giáo viên đã được lưu.",
      variant: "success"
    })
  }

  const handleDelete = (id: string) => {
    setTeachers(teachers.filter(t => t.id !== id))
    toast({ title: "Đã xóa giáo viên", description: "Bản ghi đã bị xóa khỏi hệ thống." })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Quản lý Giáo viên" 
        description="Quản lý danh sách giáo viên, thông tin liên lạc và tổ chuyên môn." 
        action={
          <Button className="bg-primary hover:bg-primary-dark" onClick={() => { setEditingTeacher(null); setIsModalOpen(true) }}>
            <Plus className="w-4 h-4 mr-2" /> Thêm Giáo viên
          </Button>
        }
      />

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="p-4 border-b bg-surface-hover/50 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <Input 
                placeholder="Tìm tên, email..." 
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex w-full sm:w-auto items-center gap-3">
              <Select 
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                options={[
                  { label: "Tất cả tổ", value: "" },
                  { label: "Tổ Toán - Tin", value: "Tổ Toán - Tin" },
                  { label: "Tổ Ngữ văn", value: "Tổ Ngữ văn" },
                  { label: "Tổ Ngoại ngữ", value: "Tổ Ngoại ngữ" },
                  { label: "Tổ Khoa học Tự nhiên", value: "Tổ Khoa học Tự nhiên" },
                  { label: "Tổ Khoa học Xã hội", value: "Tổ Khoa học Xã hội" },
                  { label: "Tổ Thể dục - GDQP", value: "Tổ Thể dục - GDQP" },
                ]}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Họ và tên</TableHead>
                  <TableHead>Tổ chuyên môn</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Điện thoại</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeachers.map((teacher) => (
                  <TableRow key={teacher.id} className="hover:bg-surface-hover/50">
                    <TableCell className="font-semibold text-heading flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-primary" /> {teacher.name}
                    </TableCell>
                    <TableCell className="text-text-secondary">{teacher.department}</TableCell>
                    <TableCell>
                      <span className="flex items-center gap-2 text-sm text-muted">
                        <Mail className="w-3 h-3" /> {teacher.email}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-2 text-sm text-muted">
                        <Phone className="w-3 h-3" /> {teacher.phone}
                      </span>
                    </TableCell>
                    <TableCell>
                      {teacher.status === "Đang công tác" ? (
                        <Badge variant="outline" className="border-emerald-500 text-emerald-600 bg-emerald-50">Đang công tác</Badge>
                      ) : (
                        <Badge variant="outline" className="border-warning text-warning bg-warning/10">Nghỉ phép</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => { setEditingTeacher(teacher); setIsModalOpen(true) }}>
                          <Edit className="w-4 h-4 text-blue-500" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(teacher.id)}>
                          <Trash2 className="w-4 h-4 text-error" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredTeachers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted">
                      Không tìm thấy giáo viên nào.
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
        title={editingTeacher ? "Cập nhật thông tin giáo viên" : "Thêm giáo viên mới"}
        description="Điền thông tin cá nhân và tổ bộ môn để quản lý phân công giảng dạy."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-heading">Họ và tên</label>
            <Input required defaultValue={editingTeacher?.name} placeholder="VD: Nguyễn Văn Toàn" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">Email liên hệ</label>
              <Input required type="email" defaultValue={editingTeacher?.email} placeholder="VD: email@edums.vn" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">Số điện thoại</label>
              <Input required defaultValue={editingTeacher?.phone} placeholder="VD: 0901234567" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">Tổ chuyên môn</label>
              <Select 
                options={[
                  { label: "Tổ Toán - Tin", value: "Tổ Toán - Tin" },
                  { label: "Tổ Ngữ văn", value: "Tổ Ngữ văn" },
                  { label: "Tổ Ngoại ngữ", value: "Tổ Ngoại ngữ" },
                  { label: "Tổ Khoa học Tự nhiên", value: "Tổ Khoa học Tự nhiên" },
                  { label: "Tổ Khoa học Xã hội", value: "Tổ Khoa học Xã hội" },
                  { label: "Tổ Thể dục - GDQP", value: "Tổ Thể dục - GDQP" },
                ]}
                defaultValue={editingTeacher?.department}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">Trạng thái</label>
              <Select 
                options={[
                  { label: "Đang công tác", value: "Đang công tác" },
                  { label: "Nghỉ phép", value: "Nghỉ phép" },
                  { label: "Đã nghỉ việc", value: "Đã nghỉ việc" },
                ]}
                defaultValue={editingTeacher?.status || "Đang công tác"}
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
