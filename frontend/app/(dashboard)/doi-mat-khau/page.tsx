"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/toaster"
import { KeyRound, Eye, EyeOff, Save, ShieldAlert } from "lucide-react"

export default function ChangePasswordPage() {
  const { toast } = useToast()
  
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const validate = () => {
    let isValid = true
    const newErrors = { currentPassword: "", newPassword: "", confirmPassword: "" }

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Vui lòng nhập mật khẩu hiện tại"
      isValid = false
    }
    
    if (!formData.newPassword) {
      newErrors.newPassword = "Vui lòng nhập mật khẩu mới"
      isValid = false
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Mật khẩu mới phải có ít nhất 8 ký tự"
      isValid = false
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu mới"
      isValid = false
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSave = () => {
    if (!validate()) return

    // Mock API call
    toast({
      title: "Đổi mật khẩu thành công",
      description: "Mật khẩu của bạn đã được thay đổi an toàn.",
      variant: "success"
    })
    
    // Reset form
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    })
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
      <PageHeader 
        title="Đổi mật khẩu" 
        description="Cập nhật mật khẩu để bảo vệ tài khoản của bạn." 
      />

      <Card className="shadow-sm">
        <CardContent className="p-6 space-y-6">
          <div className="p-4 bg-primary/10 rounded-lg flex items-start gap-3 border border-primary/20">
            <ShieldAlert className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div className="text-sm text-primary">
              <p className="font-semibold mb-1">Quy định mật khẩu an toàn:</p>
              <ul className="list-disc pl-4 space-y-1 opacity-90">
                <li>Ít nhất 8 ký tự</li>
                <li>Bao gồm chữ hoa, chữ thường và số</li>
                <li>Không sử dụng mật khẩu cũ đã dùng trong 6 tháng qua</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">Mật khẩu hiện tại <span className="text-error">*</span></label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type={showCurrent ? "text" : "password"} 
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className={`pl-9 pr-10 ${errors.currentPassword ? "border-error" : ""}`} 
                  placeholder="Nhập mật khẩu hiện tại" 
                />
                <button 
                  type="button" 
                  className="absolute right-3 top-2.5 text-muted hover:text-heading"
                  onClick={() => setShowCurrent(!showCurrent)}
                >
                  {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.currentPassword && <p className="text-xs text-error">{errors.currentPassword}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">Mật khẩu mới <span className="text-error">*</span></label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type={showNew ? "text" : "password"} 
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className={`pl-9 pr-10 ${errors.newPassword ? "border-error" : ""}`} 
                  placeholder="Nhập mật khẩu mới" 
                />
                <button 
                  type="button" 
                  className="absolute right-3 top-2.5 text-muted hover:text-heading"
                  onClick={() => setShowNew(!showNew)}
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.newPassword && <p className="text-xs text-error">{errors.newPassword}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-heading">Xác nhận mật khẩu mới <span className="text-error">*</span></label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type={showConfirm ? "text" : "password"} 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`pl-9 pr-10 ${errors.confirmPassword ? "border-error" : ""}`} 
                  placeholder="Nhập lại mật khẩu mới" 
                />
                <button 
                  type="button" 
                  className="absolute right-3 top-2.5 text-muted hover:text-heading"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-xs text-error">{errors.confirmPassword}</p>}
            </div>
          </div>

          <div className="pt-6 border-t border-border flex justify-end gap-3">
            <Button variant="outline">Hủy bỏ</Button>
            <Button onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" /> Đổi mật khẩu
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
