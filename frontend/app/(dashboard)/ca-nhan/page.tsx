"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/toaster"
import { User, Mail, Phone, MapPin, Building, ShieldCheck, Save } from "lucide-react"

export default function ProfilePage() {
  const { toast } = useToast()
  
  const [profile, setProfile] = useState({
    name: "Nguyễn Văn Admin",
    email: "sysadmin@edums.edu.vn",
    phone: "0987654321",
    address: "123 Đường Nguyễn Trãi, Quận 1, TP. HCM",
    department: "Phòng Công nghệ Thông tin",
    role: "Quản trị hệ thống (SYSTEM_ADMIN)"
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    toast({
      title: "Lưu thành công",
      description: "Hồ sơ cá nhân của bạn đã được cập nhật.",
      variant: "success"
    })
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <PageHeader 
        title="Hồ sơ cá nhân" 
        description="Quản lý thông tin cá nhân và thiết lập tài khoản của bạn." 
      />

      <Card className="shadow-sm">
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-border">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
              {profile.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-heading">{profile.name}</h3>
              <p className="text-muted text-sm">{profile.role}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading flex items-center gap-2">
                <User className="w-4 h-4 text-muted" /> Họ và tên
              </label>
              <Input name="name" value={profile.name} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-heading flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted" /> Email
              </label>
              <Input name="email" value={profile.email} disabled className="bg-muted/10 cursor-not-allowed" />
              <p className="text-xs text-muted">Email dùng để đăng nhập không thể thay đổi.</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-heading flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted" /> Số điện thoại
              </label>
              <Input name="phone" value={profile.phone} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-heading flex items-center gap-2">
                <Building className="w-4 h-4 text-muted" /> Phòng ban
              </label>
              <Input name="department" value={profile.department} disabled className="bg-muted/10" />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-heading flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted" /> Địa chỉ
              </label>
              <Input name="address" value={profile.address} onChange={handleChange} />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-heading flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-muted" /> Vai trò hệ thống
              </label>
              <Input value={profile.role} disabled className="bg-muted/10" />
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" /> Lưu thay đổi
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
