import { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Quên mật khẩu | EduMS",
  description: "Khôi phục mật khẩu tài khoản EduMS",
}

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="flex flex-col space-y-3 mb-6">
        <Link 
          href="/dang-nhap"
          className="flex items-center text-[13px] font-medium text-text-secondary hover:text-heading transition-colors mb-2 w-max"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Quay lại Đăng nhập
        </Link>
        <h1 className="text-[28px] sm:text-[32px] font-bold tracking-tight text-heading">
          Khôi phục mật khẩu
        </h1>
        <p className="text-[15px] text-text-secondary leading-relaxed">
          Đừng lo lắng, chuyện này thường xảy ra. Vui lòng nhập địa chỉ email liên kết với tài khoản của bạn để nhận hướng dẫn khôi phục.
        </p>
      </div>
      
      <form className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="text-[14px] font-semibold text-heading">
            Địa chỉ Email
          </label>
          <Input
            id="email"
            type="email"
            placeholder="nhap.email@example.com"
            required
          />
        </div>

        <Button type="button" className="w-full font-semibold shadow-sm">
          Gửi liên kết khôi phục
        </Button>
      </form>
    </>
  )
}
