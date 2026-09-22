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
import { Plus, Search, Filter, Edit, Trash2, BookOpen } from "lucide-react"
import { MOCK_SUBJECTS } from "@/mocks/academic"

export default function SubjectManagementPage() {
  const { toast } = useToast()
  const [subjects, setSubjects] = useState(MOCK_SUBJECTS)
  const [search, setSearch] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingSubject, setEditingSubject] = useState<typeof MOCK_SUBJECTS[0] | null>(null)

  const filteredSubjects = subjects.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.code.toLowerCase().includes(search.toLowerCase())
  )

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsModalOpen(false)
    toast({
      title: editingSubject ? "Cập nhật thành công" : "Thêm mới thành công",
      description: "Dữ liệu môn học đã được lưu hệ thống.",
      variant: "success"
    })
  }

  const handleDelete = (id: string) => {
    setSubjects(subjects.filter(s => s.id !== id))
    toast({
      title: "Đã xóa môn học",
      description: "Bản ghi đã được xóa khỏi hệ thống.",
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Quản lý Môn học" 
        description="Định nghĩa danh mục môn học, số tiết và tổ bộ môn phụ trách." 
        action={
          <Button className="bg-primary hover:bg-primary-dark" onClick={() => { setEditingSubject(null); setIsModalOpen(true) }}>
            <Plus className="w-4 h-4 mr-2" /> Thêm Môn học
          </Button>
        }
      />

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="p-4 border-b bg-surface-hover/50 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <Input 
                placeholder="Tìm mã, tên môn học..." 
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex w-full sm:w-auto items-center gap-3">
              <Select 
                options={[
                  { label: "Tất cả loại", value: "" },
                  { label: "Bắt buộc", value: "Bắt buộc" },
                  { label: "Lựa chọn", value: "Lựa chọn" },
                ]}
              />
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" /> Lọc
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="w-[80px]">Mã môn</TableHead>
                  <TableHead>Tên môn học</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead>Tổ bộ môn</TableHead>
                  <TableHead className="text-center">Số tiết/tuần</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubjects.map((sub) => (
                  <TableRow key={sub.id} className="hover:bg-surface-hover/50">
                    <TableCell className="font-mono text-sm text-muted">{sub.code}</TableCell>
                    <TableCell className="font-semibold text-heading flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-primary" /> {sub.name}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${sub.type === 'Bắt buộc' ? 'bg-error/10 text-error' : 'bg-blue-100 text-blue-700'}`}>
                        {sub.type}
                      </span>
                    </TableCell>
                    <TableCell className="text-text-secondary">{sub.department}</TableCell>
                    <TableCell className="text-center font-medium">{sub.periodsPerWeek}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => { setEditingSubject(sub); setIsModalOpen(true) }}>
                          <Edit className="w-4 h-4 text-blue-500" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(sub.id)}>
                          <Trash2 className="w-4 h-4 text-error" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredSubjects.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted">
                      Không tìm thấy môn học nào.
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
        title={editingSubject ? "Cập nhật môn học" : "Thêm môn học mới"}
        description="Điền thông tin môn học để quản lý việc giảng dạy."
      >
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">Mã môn</label>
              <Input required defaultValue={editingSubject?.code} placeholder="VD: TOAN" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">Tên môn học</label>
              <Input required defaultValue={editingSubject?.name} placeholder="VD: Toán học" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-heading">Tổ bộ môn</label>
            <Select 
              options={[
                { label: "Tổ Toán - Tin", value: "Tổ Toán - Tin" },
                { label: "Tổ Ngữ văn", value: "Tổ Ngữ văn" },
                { label: "Tổ Ngoại ngữ", value: "Tổ Ngoại ngữ" },
                { label: "Tổ Khoa học Tự nhiên", value: "Tổ Khoa học Tự nhiên" },
                { label: "Tổ Khoa học Xã hội", value: "Tổ Khoa học Xã hội" },
              ]}
              defaultValue={editingSubject?.department}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">Loại môn</label>
              <Select 
                options={[
                  { label: "Bắt buộc", value: "Bắt buộc" },
                  { label: "Lựa chọn", value: "Lựa chọn" },
                ]}
                defaultValue={editingSubject?.type}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">Số tiết/tuần</label>
              <Input required type="number" min={1} max={10} defaultValue={editingSubject?.periodsPerWeek || 2} />
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
