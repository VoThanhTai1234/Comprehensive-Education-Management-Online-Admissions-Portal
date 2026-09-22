import { PageHeader } from "@/components/layout/header"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function ApplicantDashboardPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Trạng thái Hồ sơ" 
        description="Theo dõi quá trình xét tuyển của bạn tại EduMS." 
      />

      <Card className="shadow-sm border-t-4 border-t-blue-500">
        <CardHeader className="pb-4 border-b border-border">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">Hồ sơ: Lớp 10 - Năm học 2026</CardTitle>
              <p className="text-sm text-muted mt-1">Mã HS: HS26001 • Cập nhật: Hôm nay</p>
            </div>
            <Badge variant="outline" className="border-blue-500 text-blue-600 bg-blue-50 text-sm py-1">Đang chờ duyệt</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          
          {/* Progress Tracker CSS-only */}
          <div className="relative mb-8">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-border -translate-y-1/2 rounded-full" />
            <div className="absolute top-1/2 left-0 w-[0%] h-1 bg-blue-500 -translate-y-1/2 rounded-full transition-all" />
            
            <div className="relative flex justify-between z-10">
              {/* Step 1 */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-surface border-2 border-blue-500 text-blue-500 flex items-center justify-center shrink-0 shadow-[0_0_0_4px_white]">
                  <span className="text-sm font-bold">1</span>
                </div>
                <span className="text-xs font-semibold text-blue-600">Tạo hồ sơ</span>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-surface border-2 border-border text-muted flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold">2</span>
                </div>
                <span className="text-xs font-semibold text-muted">Đã nộp</span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-surface border-2 border-border text-muted flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold">3</span>
                </div>
                <span className="text-xs font-semibold text-muted">Đang xét duyệt</span>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-surface border-2 border-border text-muted flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold">4</span>
                </div>
                <span className="text-xs font-semibold text-muted">Kết quả</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-hover rounded-xl p-4 border border-border">
            <h4 className="font-semibold text-heading text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-500" /> Cần thực hiện
            </h4>
            <p className="text-sm text-muted mt-2">Hồ sơ của bạn đang ở trạng thái soạn thảo. Vui lòng hoàn thành các thông tin bắt buộc và tải lên các minh chứng cần thiết, sau đó bấm nộp hồ sơ để gửi cho nhà trường.</p>
            <Link href="/ung-vien/ho-so" className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center group mt-4">
              Xem hoặc tiếp tục điền hồ sơ <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
