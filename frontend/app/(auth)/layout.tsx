import Link from "next/link"
import { Layers, ShieldCheck, Zap } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex w-full">
      {/* Left side: Premium Branding & Product Preview */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-primary p-12 text-primary-foreground relative overflow-hidden">
        {/* Abstract shapes & gradient mesh */}
        <div className="absolute inset-0 bg-primary bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:48px_48px] opacity-10"></div>
        
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-white/5 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-accent/20 blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="relative z-10 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 w-max hover:opacity-90 transition-opacity">
            <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20 shadow-xl">
              <Layers className="h-7 w-7 text-white" />
            </div>
            <span className="font-extrabold text-2xl tracking-tight">EduMS</span>
          </Link>
        </div>

        {/* Middle Content - Product Mockup */}
        <div className="relative z-10 my-12 flex-1 flex flex-col justify-center">
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-6">
            Giải pháp số hóa <br/>
            <span className="text-accent-foreground opacity-90">toàn diện trường học</span>
          </h1>
          
          {/* Dashboard floating card mockup */}
          <div className="w-[120%] bg-surface/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl translate-x-4">
            <div className="flex gap-4 mb-6">
              <div className="h-3 w-3 rounded-full bg-white/30"></div>
              <div className="h-3 w-3 rounded-full bg-white/30"></div>
              <div className="h-3 w-3 rounded-full bg-white/30"></div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="h-24 rounded-xl bg-white/5 border border-white/10 p-4 flex flex-col justify-between">
                 <div className="h-2 w-1/2 bg-white/20 rounded-full"></div>
                 <div className="h-6 w-3/4 bg-white/40 rounded-full"></div>
              </div>
              <div className="h-24 rounded-xl bg-white/5 border border-white/10 p-4 flex flex-col justify-between">
                 <div className="h-2 w-1/2 bg-white/20 rounded-full"></div>
                 <div className="h-6 w-3/4 bg-white/40 rounded-full"></div>
              </div>
              <div className="h-24 rounded-xl bg-white/5 border border-white/10 p-4 flex flex-col justify-between">
                 <div className="h-2 w-1/2 bg-white/20 rounded-full"></div>
                 <div className="h-6 w-3/4 bg-white/40 rounded-full"></div>
              </div>
            </div>
            <div className="h-32 rounded-xl bg-white/5 border border-white/10"></div>
          </div>
        </div>

        {/* Footer / Trust points */}
        <div className="relative z-10 grid grid-cols-2 gap-6 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
               <ShieldCheck className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="font-semibold text-sm">Bảo mật cấp độ cao</p>
              <p className="text-xs text-white/60">An toàn dữ liệu tuyệt đối</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
               <Zap className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="font-semibold text-sm">Vận hành siêu tốc</p>
              <p className="text-xs text-white/60">Tối ưu hiệu suất làm việc</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side: Auth Form */}
      <div className="flex flex-col w-full lg:w-1/2 bg-background relative min-h-screen">
        {/* Mobile Header */}
        <div className="absolute top-0 left-0 w-full p-6 flex items-center justify-between lg:hidden z-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shadow-md">
              <Layers className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-xl text-heading tracking-tight">EduMS</span>
          </Link>
        </div>
        
        {/* Scrollable form area */}
        <div className="flex-1 flex flex-col justify-center px-6 py-20 sm:px-12 md:px-20 lg:px-24 overflow-y-auto">
          <div className="w-full max-w-sm mx-auto flex flex-col gap-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
