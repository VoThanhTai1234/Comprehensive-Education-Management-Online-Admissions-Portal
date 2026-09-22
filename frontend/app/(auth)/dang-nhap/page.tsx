"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { AlertCircle, Loader2 } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [errors, setErrors] = React.useState<{ email?: string; password?: string; submit?: string }>({})
  const [isLoading, setIsLoading] = React.useState(false)

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {}
    
    // Email validation
    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      newErrors.email = "Vui lòng nhập email."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = "Email không đúng định dạng."
    }

    // Password validation
    if (!password) {
      newErrors.password = "Vui lòng nhập mật khẩu."
    } else if (password.length < 8) {
      newErrors.password = "Mật khẩu phải có tối thiểu 8 ký tự."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    
    if (!validate()) return

    setIsLoading(true)
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      // Mock failure for demonstration, since we don't have real backend
      setErrors({ submit: "Email hoặc mật khẩu không đúng." })
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = email.trim().length > 0 && password.length >= 8

  return (
    <>
      <div className="flex flex-col space-y-3 mb-4">
        <h1 className="text-[28px] sm:text-[32px] font-bold tracking-tight text-heading">
          Đăng nhập
        </h1>
        <p className="text-[15px] text-text-secondary leading-relaxed">
          Chào mừng trở lại! Vui lòng nhập thông tin để truy cập hệ thống quản trị của bạn.
        </p>
      </div>
      
      <form className="space-y-5" onSubmit={handleSubmit} noValidate>
        {errors.submit && (
          <div className="p-3 text-sm text-error bg-error/10 border border-error/20 rounded-lg flex items-start gap-2" role="alert">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{errors.submit}</span>
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-[14px] font-semibold text-heading">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="nhap.email@truonghoc.edu.vn"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors({ ...errors, email: undefined })
              }}
              onBlur={() => {
                if (email) setEmail(email.trim().toLowerCase())
              }}
              disabled={isLoading}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={errors.email ? "border-error focus-visible:ring-error/20" : ""}
            />
            {errors.email && (
              <p id="email-error" className="text-[13px] text-error font-medium flex items-center gap-1.5 mt-1.5">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.email}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-[14px] font-semibold text-heading">
                Mật khẩu
              </label>
              <Link
                href="/quen-mat-khau"
                className="text-[13px] font-medium text-primary hover:text-primary-hover transition-colors"
              >
                Quên mật khẩu?
              </Link>
            </div>
            <PasswordInput
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password) setErrors({ ...errors, password: undefined })
              }}
              disabled={isLoading}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              className={errors.password ? "border-error focus-visible:ring-error/20" : ""}
            />
            {errors.password && (
              <p id="password-error" className="text-[13px] text-error font-medium flex items-center gap-1.5 mt-1.5">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.password}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            id="remember" 
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/20 accent-primary cursor-pointer transition-all"
            disabled={isLoading}
          />
          <label
            htmlFor="remember"
            className={`text-[14px] cursor-pointer select-none ${isLoading ? 'text-text-secondary/50' : 'text-text-secondary'}`}
          >
            Duy trì đăng nhập
          </label>
        </div>

        <Button 
          type="submit" 
          className="w-full mt-2 font-semibold shadow-sm"
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang xử lý...
            </>
          ) : (
            "Đăng nhập"
          )}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <span className="text-[14px] text-text-secondary">Chưa có tài khoản ứng viên? </span>
        <Link 
          href="/dang-ky" 
          className="text-[14px] font-semibold text-primary hover:text-primary-hover transition-colors"
        >
          Đăng ký ngay
        </Link>
      </div>
    </>
  )
}
