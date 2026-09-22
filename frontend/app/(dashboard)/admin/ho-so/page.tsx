"use client"

import { PageHeader } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Save, User, Lock } from "lucide-react"
import { useAuth } from "@/lib/contexts/auth-context"

export default function ProfilePage() {
  const { user, primaryRole } = useAuth()

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Hồ sơ cá nhân" 
        description="Quản lý thông tin cá nhân và bảo mật tài khoản." 
      />

      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full sm:w-[300px] grid-cols-2 p-1 bg-surface-hover rounded-lg border border-border">
          <TabsTrigger value="info" className="rounded-md data-[state=active]:bg-surface data-[state=active]:shadow-sm">
            <User className="w-4 h-4 mr-2" /> Thông tin
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-md data-[state=active]:bg-surface data-[state=active]:shadow-sm">
            <Lock className="w-4 h-4 mr-2" /> Bảo mật
          </TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="info" className="m-0 focus-visible:outline-none">
            <Card className="shadow-sm border border-border">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-heading">Thông tin cá nhân</h3>
                  <p className="text-sm text-muted mb-4">Cập nhật thông tin hiển thị trên hệ thống.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-heading">Họ và tên</label>
                      <Input defaultValue={user ? `${user.lastName} ${user.firstName}` : "Nguyễn Văn A"} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-heading">Vai trò chính</label>
                      <Input defaultValue={primaryRole || "SYSTEM_ADMIN"} disabled className="bg-surface-hover" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-heading">Email liên hệ</label>
                      <Input defaultValue={user?.email || "admin@edums.edu.vn"} disabled className="bg-surface-hover" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-heading">Số điện thoại</label>
                      <Input defaultValue="0912345678" />
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-border">
                    <Button>
                      <Save className="w-4 h-4 mr-2" /> Lưu thông tin
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="m-0 focus-visible:outline-none">
            <Card className="shadow-sm border border-border">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-heading">Đổi mật khẩu</h3>
                  <p className="text-sm text-muted mb-4">Đảm bảo tài khoản của bạn đang sử dụng mật khẩu mạnh.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2 max-w-md">
                      <label className="text-sm font-medium text-heading">Mật khẩu hiện tại</label>
                      <Input type="password" placeholder="Nhập mật khẩu cũ" />
                    </div>
                    <div className="space-y-2 md:col-span-2 max-w-md">
                      <label className="text-sm font-medium text-heading">Mật khẩu mới</label>
                      <Input type="password" placeholder="Nhập mật khẩu mới" />
                    </div>
                    <div className="space-y-2 md:col-span-2 max-w-md">
                      <label className="text-sm font-medium text-heading">Xác nhận mật khẩu mới</label>
                      <Input type="password" placeholder="Nhập lại mật khẩu mới" />
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-border">
                    <Button>
                      <Lock className="w-4 h-4 mr-2" /> Cập nhật mật khẩu
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
