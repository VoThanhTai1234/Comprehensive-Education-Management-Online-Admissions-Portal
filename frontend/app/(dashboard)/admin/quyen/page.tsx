"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/toaster"
import { Save, Check, Minus } from "lucide-react"

const ROLES = ["SYS_ADMIN", "ACAD_ADMIN", "ADMISSION", "TEACHER", "STUDENT", "PARENT"]
const PERMISSIONS = [
  { module: "Core", action: "Quản lý Tài khoản (User)" },
  { module: "Core", action: "Quản lý Vai trò (Role)" },
  { module: "Core", action: "Xem Nhật ký (Audit Log)" },
  { module: "Tuyển sinh", action: "Cấu hình Chiến dịch" },
  { module: "Tuyển sinh", action: "Duyệt Hồ sơ ứng viên" },
  { module: "Tuyển sinh", action: "Nộp Hồ sơ ứng tuyển" },
  { module: "Đào tạo", action: "Quản lý Môn/Lớp/Phòng" },
  { module: "Đào tạo", action: "Sinh Thời khóa biểu" },
  { module: "Điểm & Chuyên cần", action: "Nhập điểm môn học" },
  { module: "Điểm & Chuyên cần", action: "Điểm danh mã QR" },
  { module: "Tài chính", action: "Quản lý Học phí" },
]

export default function PermissionManagementPage() {
  const { toast } = useToast()

  // Khởi tạo state bằng Set chứa các key "ROLE|MODULE|ACTION"
  const [permissions, setPermissions] = useState<Set<string>>(() => {
    const initial = new Set<string>()
    ROLES.forEach(role => {
      PERMISSIONS.forEach(perm => {
        const hasAccess = 
          role === "SYS_ADMIN" || 
          (role === "ACAD_ADMIN" && (perm.module === "Đào tạo" || perm.module === "Tài chính")) ||
          (role === "ADMISSION" && perm.module === "Tuyển sinh" && perm.action !== "Nộp Hồ sơ ứng tuyển") ||
          (role === "TEACHER" && perm.module === "Điểm & Chuyên cần")
        
        if (hasAccess) {
          initial.add(`${role}|${perm.module}|${perm.action}`)
        }
      })
    })
    return initial
  })

  const handleToggle = (role: string, module: string, action: string) => {
    const key = `${role}|${module}|${action}`
    setPermissions(prev => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  const handleSave = () => {
    toast({
      title: "Lưu thay đổi",
      description: "Đã cập nhật ma trận phân quyền thành công.",
      variant: "success"
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Ma trận Phân quyền" 
        description="Cấu hình quyền truy cập (Permissions) cho từng Vai trò (Roles)." 
        action={
          <Button onClick={handleSave}>
            <Save className="w-4 h-4 mr-2" /> Lưu thay đổi
          </Button>
        }
      />

      <Card className="shadow-sm">
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-surface-hover hover:bg-surface-hover">
                <TableHead className="w-[200px] font-semibold text-heading sticky left-0 bg-surface-hover z-10">Chức năng / Dữ liệu</TableHead>
                {ROLES.map(role => (
                  <TableHead key={role} className="text-center font-semibold text-heading min-w-[120px]">
                    {role}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {PERMISSIONS.map((perm, idx) => (
                <TableRow key={idx} className="hover:bg-muted/10 transition-colors">
                  <TableCell className="sticky left-0 bg-surface z-10 border-r border-border font-medium text-heading">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted mb-0.5">{perm.module}</span>
                      <span>{perm.action}</span>
                    </div>
                  </TableCell>
                  {ROLES.map((role) => {
                    const key = `${role}|${perm.module}|${perm.action}`
                    const hasAccess = permissions.has(key)
                      
                    return (
                      <TableCell key={role} className="text-center">
                        <button 
                          className="p-2 rounded-md hover:bg-surface-hover transition-colors inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary/20"
                          onClick={() => handleToggle(role, perm.module, perm.action)}
                        >
                          {hasAccess ? (
                            <Check className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <Minus className="w-4 h-4 text-muted/30" />
                          )}
                        </button>
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
