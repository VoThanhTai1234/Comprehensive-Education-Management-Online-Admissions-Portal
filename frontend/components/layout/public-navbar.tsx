import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { Layers } from "lucide-react"

export function PublicNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/60">
      <div className="container mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Layers className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-lg text-heading tracking-tight">EduMS</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
            Trang chủ
          </Link>
          <Link href="/tuyen-sinh" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
            Tuyển sinh
          </Link>
          <Link href="#" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
            Chương trình đào tạo
          </Link>
          <Link href="#" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors">
            Tin tức
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/dang-nhap" className="text-sm font-medium text-text-secondary hover:text-primary transition-colors hidden sm:inline-block">
            Đăng nhập
          </Link>
          <Link href="/dang-ky" className={buttonVariants()}>
            Đăng ký ứng tuyển
          </Link>
        </div>
      </div>
    </header>
  )
}
