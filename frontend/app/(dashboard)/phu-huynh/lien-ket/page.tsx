"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/toaster"
import { Link2, Info, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LinkChildPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [code, setCode] = useState("")
  const [isLinking, setIsLinking] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleLink = () => {
    if (!code) {
      toast({ title: "Lỗi", description: "Vui lòng nhập Mã mời liên kết.", variant: "destructive" })
      return
    }

    setIsLinking(true)
    // Giả lập API call
    setTimeout(() => {
      setIsLinking(false)
      if (code === "EDUMS2026") {
        setSuccess(true)
        toast({ title: "Liên kết thành công!", description: "Đã liên kết tài khoản học sinh Trần Bình (10A1).", variant: "success" })
      } else {
        toast({ title: "Mã không hợp lệ", description: "Mã liên kết không đúng hoặc đã hết hạn.", variant: "destructive" })
      }
    }, 1500)
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl mx-auto">
      <PageHeader 
        title="Liên kết Hồ sơ Con" 
        description="Nhập mã mời liên kết do nhà trường cấp để theo dõi tình hình học tập của con."
      />

      {success ? (
        <Card className="shadow-sm border-2 border-emerald-500 overflow-hidden">
          <CardContent className="p-8 text-center bg-emerald-50/50">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-bold text-heading mb-2">Liên kết thành công!</h3>
            <p className="text-emerald-800 mb-6">
              Bạn đã liên kết thành công với hồ sơ của học sinh <strong className="text-emerald-900">Trần Bình (10A1)</strong>. 
              Từ bây giờ, bạn có thể theo dõi Điểm số, Chuyên cần và Học phí của con.
            </p>
            <Button onClick={() => router.push('/phu-huynh/con-cai')} className="bg-emerald-600 hover:bg-emerald-700">
              Xem thông tin của con
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-8">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                <Link2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-heading">Nhập mã liên kết</h3>
                <p className="text-sm text-muted">Mã này được cung cấp bởi GVCN vào đầu năm học.</p>
              </div>
            </div>

            <div className="space-y-4 max-w-sm mx-auto">
              <div className="space-y-2">
                <Input 
                  placeholder="VD: EDUMS2026" 
                  value={code} 
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="text-center text-lg uppercase tracking-widest font-mono py-6"
                />
              </div>
              <Button 
                className="w-full bg-primary hover:bg-primary-dark" 
                size="lg" 
                onClick={handleLink}
                disabled={isLinking}
              >
                {isLinking ? "Đang xác thực..." : "Xác nhận Liên kết"}
              </Button>
            </div>

            <div className="mt-8 p-4 bg-blue-50/50 border border-blue-100 rounded-lg flex gap-3 text-sm text-blue-800">
              <Info className="w-5 h-5 shrink-0 text-blue-500 mt-0.5" />
              <div>
                <p className="font-semibold mb-1">Gợi ý dành cho Tester:</p>
                <p>Hãy nhập mã <strong className="font-mono bg-white px-1.5 py-0.5 rounded border border-blue-200">EDUMS2026</strong> để xem luồng liên kết thành công.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
