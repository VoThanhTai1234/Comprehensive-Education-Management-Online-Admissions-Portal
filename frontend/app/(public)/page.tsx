import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { BookOpen, Calendar, CheckCircle, Shield, Users } from "lucide-react"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "EduMS — Nền tảng Quản trị Giáo dục Toàn diện",
  description: "Giải pháp chuyển đổi số toàn diện cho trường học, từ tuyển sinh trực tuyến đến quản lý đào tạo, thời khóa biểu và giao tiếp phụ huynh.",
}

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background py-20 sm:py-32">
        <div className="absolute inset-0 bg-primary/5 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="container relative mx-auto max-w-7xl px-6 text-center">
          <div className="mx-auto max-w-3xl space-y-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-heading sm:text-5xl lg:text-6xl">
              Nền tảng Quản trị Giáo dục <span className="text-primary">Toàn diện</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed sm:text-xl">
              Giải pháp chuyển đổi số đột phá dành cho trường học. Hợp nhất quy trình tuyển sinh, quản lý đào tạo, sắp xếp thời khóa biểu và tương tác phụ huynh trên một hệ thống duy nhất.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/tuyen-sinh" className={buttonVariants({ size: "lg", className: "w-full sm:w-auto" })}>
                Xem đợt tuyển sinh
              </Link>
              <Link href="/dang-nhap" className={buttonVariants({ size: "lg", variant: "outline", className: "w-full sm:w-auto" })}>
                Đăng nhập hệ thống
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">Giải pháp hoàn chỉnh</h2>
            <p className="mt-4 text-lg text-text-secondary">Tất cả những gì nhà trường cần để vận hành hiệu quả</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 rounded-2xl border bg-background hover:shadow-soft transition-shadow">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-heading">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Sẵn sàng trải nghiệm EduMS?</h2>
          <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Hàng ngàn học sinh và phụ huynh đã sử dụng hệ thống của chúng tôi để theo dõi kết quả học tập và nhận thông báo theo thời gian thực.
          </p>
          <Link href="/tuyen-sinh" className={buttonVariants({ size: "lg", variant: "secondary" })}>
            Bắt đầu nộp hồ sơ trực tuyến
          </Link>
        </div>
      </section>
    </div>
  )
}

const features = [
  {
    icon: Users,
    title: "Tuyển sinh trực tuyến",
    description: "Cổng thông tin thân thiện, cho phép ứng viên nộp hồ sơ, đăng ký nguyện vọng và theo dõi trạng thái xét duyệt dễ dàng."
  },
  {
    icon: Calendar,
    title: "Xếp lịch tự động",
    description: "Thuật toán thông minh giúp xếp thời khóa biểu tự động, giải quyết triệt để vấn đề trùng lặp giáo viên và phòng học."
  },
  {
    icon: BookOpen,
    title: "Quản lý điểm số",
    description: "Sổ điểm điện tử tiện lợi cho giáo viên, tính toán điểm tự động theo trọng số và phân quyền công bố linh hoạt."
  },
  {
    icon: Shield,
    title: "Bảo mật và phân quyền",
    description: "Hệ thống RBAC mạnh mẽ đảm bảo dữ liệu an toàn. Mỗi vai trò chỉ truy cập đúng phạm vi thông tin được cho phép."
  },
  {
    icon: CheckCircle,
    title: "Điểm danh QR",
    description: "Giải pháp điểm danh bằng mã QR theo từng buổi học, nhanh chóng, chính xác và giảm tải công việc cho giáo viên."
  },
  {
    icon: Users,
    title: "Family Portal",
    description: "Kênh kết nối trực tiếp với phụ huynh. Nhận thông báo vắng/trễ theo thời gian thực và xem học phí qua VietQR."
  }
]
