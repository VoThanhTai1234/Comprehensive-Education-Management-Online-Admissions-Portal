import Link from "next/link"
import { Layers } from "lucide-react"

export function PublicFooter() {
  return (
    <footer className="bg-surface border-t">
      <div className="container mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Layers className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-lg text-heading tracking-tight">EduMS</span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed">
              Nền tảng Quản trị Giáo dục Toàn diện & Cổng Tuyển sinh Trực tuyến.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-heading mb-4">Tuyển sinh</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link href="/tuyen-sinh" className="hover:text-primary transition-colors">Đợt tuyển sinh mới</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Hướng dẫn nộp hồ sơ</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Tra cứu kết quả</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-heading mb-4">Hỗ trợ</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li><Link href="#" className="hover:text-primary transition-colors">Trung tâm trợ giúp</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Câu hỏi thường gặp</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Liên hệ</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-heading mb-4">Liên hệ</h4>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li>Email: contact@edums.edu.vn</li>
              <li>Điện thoại: (028) 38 123 456</li>
              <li>Địa chỉ: 273 An Dương Vương, P3, Q5, TP.HCM</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-secondary">© 2026 EduMS. Bản quyền thuộc về Nhóm 5.</p>
          <div className="flex gap-4 text-sm text-text-secondary">
            <Link href="#" className="hover:text-primary transition-colors">Điều khoản</Link>
            <Link href="#" className="hover:text-primary transition-colors">Bảo mật</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
