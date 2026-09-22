"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/toaster"
import { Plus, Edit, Calendar } from "lucide-react"

const MOCK_YEARS = [
  { id: "AY2627", name: "2026 - 2027", status: "ACTIVE", terms: ["Học kỳ 1", "Học kỳ 2"] },
  { id: "AY2526", name: "2025 - 2026", status: "CLOSED", terms: ["Học kỳ 1", "Học kỳ 2", "Học kỳ Hè"] },
  { id: "AY2425", name: "2024 - 2025", status: "CLOSED", terms: ["Học kỳ 1", "Học kỳ 2"] },
]

export default function AcademicYearPage() {
  const { toast } = useToast()
  const [years] = useState(MOCK_YEARS)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedYear, setSelectedYear] = useState<typeof MOCK_YEARS[0] | null>(null)

  const handleCreate = () => {
    setSelectedYear(null)
    setIsModalOpen(true)
  }

  const handleEdit = (year: typeof MOCK_YEARS[0]) => {
    setSelectedYear(year)
    setIsModalOpen(true)
  }

  const handleSave = () => {
    toast({
      title: "Thành công",
      description: selectedYear ? "Cập nhật năm học thành công." : "Tạo năm học mới thành công.",
      variant: "success"
    })
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Quản lý Năm học / Học kỳ" 
        description="Quản lý các chu kỳ đào tạo của nhà trường." 
        action={
          <Button onClick={handleCreate}>
            <Plus className="w-4 h-4 mr-2" /> Thêm Năm học
          </Button>
        }
      />

      <Card className="shadow-sm border border-border hover:shadow-md transition-shadow">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-surface-hover hover:bg-surface-hover border-b border-border">
                  <TableHead className="w-[120px]">Mã năm học</TableHead>
                  <TableHead>Tên năm học</TableHead>
                  <TableHead>Các Học kỳ</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {years.map((year) => (
                  <TableRow key={year.id} className="hover:bg-surface-hover/50 border-b border-border last:border-0">
                    <TableCell className="font-mono text-sm text-muted">{year.id}</TableCell>
                    <TableCell className="font-semibold text-heading flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" /> {year.name}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {year.terms.map(term => (
                          <Badge key={term} variant="outline" className="bg-surface text-text-secondary border-border">{term}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {year.status === "ACTIVE" ? (
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200">Đang hoạt động</Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted border-border">Đã đóng</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="hover:bg-surface-hover hover:text-primary" onClick={() => handleEdit(year)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedYear ? "Chỉnh sửa Năm học" : "Thêm Năm học mới"}
        description="Cấu hình thông tin năm học và các học kỳ tương ứng."
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Mã năm học <span className="text-error">*</span></label>
            <Input defaultValue={selectedYear?.id || ""} placeholder="Ví dụ: AY2728" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Tên hiển thị <span className="text-error">*</span></label>
            <Input defaultValue={selectedYear?.name || ""} placeholder="Ví dụ: 2027 - 2028" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Các học kỳ</label>
            <Input defaultValue={selectedYear?.terms.join(", ") || "Học kỳ 1, Học kỳ 2"} placeholder="Cách nhau bằng dấu phẩy" />
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t border-border mt-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Hủy</Button>
            <Button onClick={handleSave}>Lưu thông tin</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
