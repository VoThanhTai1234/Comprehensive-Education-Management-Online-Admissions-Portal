"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/header"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { useToast } from "@/components/ui/toaster"
import { Users, Shield, MoreHorizontal } from "lucide-react"

const MOCK_ROLES = [
  { id: "SYSTEM_ADMIN", name: "Quản trị hệ thống", desc: "Toàn quyền quản trị, cấu hình và bảo mật.", users: 2, color: "bg-error/10 text-error border-error/20" },
  { id: "ACADEMIC_ADMIN", name: "Quản trị đào tạo", desc: "Quản lý môn học, lớp học, thời khóa biểu, kỳ thi.", users: 5, color: "bg-blue-500/10 text-blue-700 border-blue-500/20" },
  { id: "ADMISSIONS_OFFICER", name: "Cán bộ tuyển sinh", desc: "Quản lý chiến dịch, duyệt hồ sơ.", users: 12, color: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20" },
  { id: "TEACHER", name: "Giáo viên", desc: "Xem lịch dạy, nhập điểm, điểm danh.", users: 85, color: "bg-surface-hover text-heading border-border" },
  { id: "STUDENT", name: "Học sinh", desc: "Xem TKB, điểm, nộp bài, điểm danh.", users: 1240, color: "bg-surface-hover text-heading border-border" },
  { id: "PARENT", name: "Phụ huynh", desc: "Theo dõi học tập của con, thanh toán học phí.", users: 1100, color: "bg-surface-hover text-heading border-border" },
  { id: "APPLICANT", name: "Ứng viên", desc: "Nộp hồ sơ xét tuyển.", users: 450, color: "bg-surface-hover text-heading border-border" },
]

export default function RoleManagementPage() {
  const { toast } = useToast()
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedRole, setSelectedRole] = useState<typeof MOCK_ROLES[0] | null>(null)

  const handleView = (role: typeof MOCK_ROLES[0]) => {
    setSelectedRole(role)
    setIsViewModalOpen(true)
  }

  const handleEdit = (role: typeof MOCK_ROLES[0]) => {
    setSelectedRole(role)
    setIsEditModalOpen(true)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Quản lý Vai trò" 
        description="Định nghĩa các nhóm quyền hạn và vai trò người dùng trong hệ thống." 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_ROLES.map((role) => (
          <Card key={role.id} className="shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className={`p-2 rounded-lg border ${role.color}`}>
                  <Shield className="w-5 h-5" />
                </div>
                <Button variant="ghost" size="icon" className="-mt-2 -mr-2">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
              <CardTitle className="mt-4 text-lg">{role.name}</CardTitle>
              <CardDescription className="line-clamp-2">{role.desc}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto pb-4">
              <div className="flex items-center gap-2 text-sm text-muted">
                <Users className="w-4 h-4" />
                <span className="font-medium text-heading">{role.users}</span> tài khoản
              </div>
            </CardContent>
            <CardFooter className="pt-4 border-t bg-muted/10 flex justify-between">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary" onClick={() => handleView(role)}>Xem chi tiết</Button>
              <Button variant="outline" size="sm" onClick={() => handleEdit(role)}>Sửa quyền</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Chi tiết Vai trò"
        description="Thông tin chi tiết về vai trò và số lượng tài khoản."
      >
        {selectedRole && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 border-b pb-4">
              <div className="col-span-1 text-sm text-muted">Mã vai trò</div>
              <div className="col-span-2 font-medium text-heading">{selectedRole.id}</div>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b pb-4">
              <div className="col-span-1 text-sm text-muted">Tên hiển thị</div>
              <div className="col-span-2 text-heading">{selectedRole.name}</div>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b pb-4">
              <div className="col-span-1 text-sm text-muted">Mô tả</div>
              <div className="col-span-2 text-heading">{selectedRole.desc}</div>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b pb-4">
              <div className="col-span-1 text-sm text-muted">Số tài khoản</div>
              <div className="col-span-2 text-heading">{selectedRole.users} tài khoản đang sử dụng</div>
            </div>
            <div className="pt-4 flex justify-end">
              <Button onClick={() => setIsViewModalOpen(false)}>Đóng</Button>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Chỉnh sửa quyền: ${selectedRole?.name}`}
        description="Thay đổi phân quyền cho vai trò này."
      >
        {selectedRole && (
          <div className="space-y-4">
            <p className="text-sm text-muted">Bảng phân quyền sẽ được chuyển sang giao diện Ma trận Phân quyền để quản lý tập trung.</p>
            <div className="pt-4 flex justify-end gap-3 border-t">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Đóng</Button>
              <Button onClick={() => {
                toast({ title: "Thông báo", description: "Vui lòng sử dụng trang Quản lý Quyền để chỉnh sửa." })
                setIsEditModalOpen(false)
              }}>Chuyển đến Quản lý Quyền</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
