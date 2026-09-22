"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Modal } from "@/components/ui/modal"
import { useToast } from "@/components/ui/toaster"
import { SearchIcon, Plus, Filter, MoreHorizontal, Edit, Lock, Unlock, Eye } from "lucide-react"
import { ROLE_LABELS, type Role } from "@/lib/constants/roles"

const MOCK_USERS = [
  { id: "U001", name: "Nguyễn Văn Admin", email: "sysadmin@edums.edu.vn", role: "SYSTEM_ADMIN", status: "ACTIVE" },
  { id: "U002", name: "Trần Thị Đào Tạo", email: "admin@edums.edu.vn", role: "ACADEMIC_ADMIN", status: "ACTIVE" },
  { id: "U003", name: "Lê Tuyển Sinh", email: "tuyen-sinh@edums.edu.vn", role: "ADMISSIONS_OFFICER", status: "INACTIVE" },
  { id: "U004", name: "Giáo viên Cường", email: "teacher01@edums.edu.vn", role: "TEACHER", status: "ACTIVE" },
  { id: "U005", name: "Học sinh An", email: "student01@edums.edu.vn", role: "STUDENT", status: "ACTIVE" },
  { id: "U006", name: "Phụ huynh Bình", email: "parent01@edums.edu.vn", role: "PARENT", status: "ACTIVE" },
]

export default function UserManagementPage() {
  const { toast } = useToast()
  const [users, setUsers] = useState(MOCK_USERS)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("")
  const [selectedUser, setSelectedUser] = useState<typeof MOCK_USERS[0] | null>(null)

  const handleToggleStatus = (id: string) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        const newStatus = u.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
        toast({
          title: "Thành công",
          description: `Tài khoản ${u.name} đã bị ${newStatus === "INACTIVE" ? "khóa" : "mở khóa"}.`,
          variant: newStatus === "INACTIVE" ? "warning" : "success"
        })
        return { ...u, status: newStatus }
      }
      return u
    }))
  }

  const handleView = (user: typeof MOCK_USERS[0]) => {
    setSelectedUser(user)
    setIsViewModalOpen(true)
  }

  const handleEdit = (user: typeof MOCK_USERS[0]) => {
    toast({
      title: "Chỉnh sửa tài khoản",
      description: `Mở form sửa tài khoản ${user.name}`
    })
    setIsModalOpen(true)
  }

  const filteredUsers = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === "" || u.role === roleFilter
    return matchSearch && matchRole
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Quản lý Tài khoản" 
        description="Quản lý danh sách người dùng, cấp quyền và trạng thái hoạt động." 
        action={
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> Thêm tài khoản
          </Button>
        }
      />

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="p-4 border-b flex flex-col sm:flex-row items-center justify-between gap-4 bg-background/50 rounded-t-xl">
            <div className="relative w-full sm:w-80">
              <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                className="pl-9" 
                placeholder="Tìm tên, email..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex w-full sm:w-auto items-center gap-3">
              <Select 
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                options={[
                  { label: "Tất cả vai trò", value: "" },
                  { label: "Quản trị hệ thống", value: "SYSTEM_ADMIN" },
                  { label: "Giáo viên", value: "TEACHER" },
                  { label: "Học sinh", value: "STUDENT" },
                ]}
              />
              <Button variant="outline" onClick={() => toast({ title: "Đã áp dụng bộ lọc", description: "Danh sách đã được cập nhật theo tiêu chí lọc." })}>
                <Filter className="w-4 h-4 mr-2" /> Lọc
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="w-[80px]">ID</TableHead>
                  <TableHead>Người dùng</TableHead>
                  <TableHead>Vai trò</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-surface-hover/50">
                    <TableCell className="font-medium text-text-secondary">{user.id}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-heading">{user.name}</span>
                        <span className="text-xs text-muted">{user.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-medium">
                        {ROLE_LABELS[user.role as Role]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.status === "ACTIVE" ? (
                        <Badge variant="outline" className="border-emerald-500 text-emerald-600 bg-emerald-50">Hoạt động</Badge>
                      ) : (
                        <Badge variant="outline" className="border-error text-error bg-error/10">Bị khóa</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" title="Xem chi tiết" onClick={() => handleView(user)}>
                          <Eye className="w-4 h-4 text-muted" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Chỉnh sửa" onClick={() => handleEdit(user)}>
                          <Edit className="w-4 h-4 text-primary" />
                        </Button>
                        {user.status === "ACTIVE" ? (
                          <Button variant="ghost" size="icon" title="Khóa tài khoản" onClick={() => handleToggleStatus(user.id)}>
                            <Lock className="w-4 h-4 text-warning" />
                          </Button>
                        ) : (
                          <Button variant="ghost" size="icon" title="Mở khóa" onClick={() => handleToggleStatus(user.id)}>
                            <Unlock className="w-4 h-4 text-emerald-500" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" title="Tùy chọn khác" onClick={() => toast({ title: "Tùy chọn khác", description: "Hiển thị menu ngữ cảnh." })}>
                          <MoreHorizontal className="w-4 h-4 text-muted" />
                        </Button>
                      </div>
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
        title="Thêm tài khoản mới"
        description="Tạo tài khoản quản trị viên mới cho hệ thống."
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Họ và tên <span className="text-error">*</span></label>
            <Input placeholder="Ví dụ: Nguyễn Văn A" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email liên hệ <span className="text-error">*</span></label>
            <Input type="email" placeholder="email@edums.edu.vn" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Vai trò hệ thống</label>
            <Select 
              options={[
                { label: "Quản trị hệ thống", value: "SYSTEM_ADMIN" },
                { label: "Quản trị đào tạo", value: "ACADEMIC_ADMIN" },
                { label: "Cán bộ tuyển sinh", value: "ADMISSIONS_OFFICER" },
              ]}
            />
          </div>
          <div className="pt-4 flex justify-end gap-3 border-t">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Hủy</Button>
            <Button onClick={() => {
              toast({ title: "Thành công", description: "Đã lưu tài khoản mới.", variant: "success" })
              setIsModalOpen(false)
            }}>Lưu tài khoản</Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title="Chi tiết tài khoản"
        description="Thông tin chi tiết người dùng trên hệ thống."
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 border-b pb-4">
              <div className="col-span-1 text-sm text-muted">Họ và tên</div>
              <div className="col-span-2 font-medium text-heading">{selectedUser.name}</div>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b pb-4">
              <div className="col-span-1 text-sm text-muted">Email</div>
              <div className="col-span-2 text-heading">{selectedUser.email}</div>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b pb-4">
              <div className="col-span-1 text-sm text-muted">Vai trò</div>
              <div className="col-span-2 text-heading">{ROLE_LABELS[selectedUser.role as Role]}</div>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b pb-4">
              <div className="col-span-1 text-sm text-muted">Trạng thái</div>
              <div className="col-span-2 text-heading">
                {selectedUser.status === "ACTIVE" ? "Đang hoạt động" : "Bị khóa"}
              </div>
            </div>
            <div className="pt-4 flex justify-end">
              <Button onClick={() => setIsViewModalOpen(false)}>Đóng</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
