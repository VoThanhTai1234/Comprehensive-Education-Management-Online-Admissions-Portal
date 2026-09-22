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
import { Plus, Edit, Megaphone, CalendarRange } from "lucide-react"

const MOCK_CAMPAIGNS = [
  { id: "TS10-26", name: "Tuyển sinh Lớp 10 Khóa 2026-2029", startDate: "01/06/2026", endDate: "30/07/2026", target: 500, applicants: 850, status: "ACTIVE" },
  { id: "TS-BS-26", name: "Tuyển sinh Bổ sung Lớp 11", startDate: "15/08/2026", endDate: "25/08/2026", target: 20, applicants: 5, status: "UPCOMING" },
  { id: "TS10-25", name: "Tuyển sinh Lớp 10 Khóa 2025-2028", startDate: "01/06/2025", endDate: "30/07/2025", target: 450, applicants: 720, status: "CLOSED" },
]

export default function CampaignManagementPage() {
  const { toast } = useToast()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState<typeof MOCK_CAMPAIGNS[0] | null>(null)

  const handleCreate = () => {
    setSelectedCampaign(null)
    setIsModalOpen(true)
  }

  const handleEdit = (camp: typeof MOCK_CAMPAIGNS[0]) => {
    setSelectedCampaign(camp)
    setIsModalOpen(true)
  }

  const handleSave = () => {
    toast({
      title: "Thành công",
      description: selectedCampaign ? "Cập nhật chiến dịch thành công." : "Đã tạo đợt tuyển sinh mới.",
      variant: "success"
    })
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Quản lý Đợt Tuyển sinh" 
        description="Tạo và cấu hình các chiến dịch tuyển sinh của trường." 
        action={
          <Button onClick={handleCreate}>
            <Plus className="w-4 h-4 mr-2" /> Tạo đợt mới
          </Button>
        }
      />

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-surface-hover hover:bg-surface-hover border-b border-border">
                  <TableHead className="w-[120px]">Mã chiến dịch</TableHead>
                  <TableHead>Tên đợt tuyển sinh</TableHead>
                  <TableHead>Thời gian</TableHead>
                  <TableHead className="text-right">Chỉ tiêu / Hồ sơ</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_CAMPAIGNS.map((camp) => (
                  <TableRow key={camp.id} className="hover:bg-surface-hover/50 border-b border-border last:border-0">
                    <TableCell className="font-mono text-sm text-muted">{camp.id}</TableCell>
                    <TableCell className="font-semibold text-heading flex items-center gap-2">
                      <Megaphone className="w-4 h-4 text-primary" /> {camp.name}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm text-muted">
                        <CalendarRange className="w-4 h-4" />
                        {camp.startDate} - {camp.endDate}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col items-end">
                        <span className="font-bold text-heading">{camp.applicants} <span className="font-normal text-muted">/ {camp.target}</span></span>
                        <div className="w-full max-w-[100px] bg-surface-hover rounded-full h-1.5 mt-1">
                          <div 
                            className="bg-primary h-1.5 rounded-full" 
                            style={{ width: `${Math.min(100, (camp.applicants / camp.target) * 100)}%` }} 
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {camp.status === "ACTIVE" && (
                        <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-200">Đang diễn ra</Badge>
                      )}
                      {camp.status === "UPCOMING" && (
                        <Badge className="bg-blue-500/10 text-blue-600 border-blue-200">Sắp diễn ra</Badge>
                      )}
                      {camp.status === "CLOSED" && (
                        <Badge variant="outline" className="text-muted border-border bg-surface-hover">Đã đóng</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="hover:bg-surface-hover hover:text-primary" onClick={() => handleEdit(camp)}>
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
        title={selectedCampaign ? "Chỉnh sửa đợt tuyển sinh" : "Tạo đợt tuyển sinh mới"}
        description="Cấu hình thông tin đợt tuyển sinh và chỉ tiêu đầu vào."
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Tên đợt tuyển sinh <span className="text-error">*</span></label>
            <Input defaultValue={selectedCampaign?.name || ""} placeholder="Ví dụ: Tuyển sinh Lớp 10 Khóa 2026-2029" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Mã chiến dịch <span className="text-error">*</span></label>
              <Input defaultValue={selectedCampaign?.id || ""} placeholder="TS10-26" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Chỉ tiêu <span className="text-error">*</span></label>
              <Input type="number" defaultValue={selectedCampaign?.target || 500} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Ngày bắt đầu <span className="text-error">*</span></label>
              <Input type="date" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Ngày kết thúc <span className="text-error">*</span></label>
              <Input type="date" />
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t mt-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Hủy</Button>
            <Button onClick={handleSave}>Lưu thông tin</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
