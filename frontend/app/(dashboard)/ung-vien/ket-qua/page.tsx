"use client"

import { PageHeader } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/toaster"
import { Download, CheckCircle2, Award, Info, FileCheck, Circle } from "lucide-react"
import { useState, useEffect } from "react"
import confetti from "canvas-confetti"

type AppStatus = "DRAFT" | "SUBMITTED" | "UNDER_REVIEW" | "NEED_SUPPLEMENT" | "ADMITTED" | "REJECTED" | "ENROLLED";

export default function ResultViewPage() {
  const { toast } = useToast()
  const [status, setStatus] = useState<AppStatus>("SUBMITTED")

  const handleDownload = () => {
    toast({
      title: "Đang tải xuống",
      description: "Tài liệu Giấy báo trúng tuyển & Hướng dẫn nhập học đang được tải xuống máy của bạn.",
      variant: "default"
    })
  }

  useEffect(() => {
    if (status === "ADMITTED" || status === "ENROLLED") {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const interval: ReturnType<typeof setInterval> = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: Math.random(), y: Math.random() - 0.2 } }));
      }, 250);
    }
  }, [status])

  // Helper cho Timeline
  const timelineSteps = [
    { key: "SUBMITTED", label: "Đã nộp" },
    { key: "UNDER_REVIEW", label: "Đang xét duyệt" },
    { key: "ADMITTED", label: "Kết quả" },
    { key: "ENROLLED", label: "Đã nhập học" }
  ];

  const getStepStatus = (stepKey: string, currentStatus: AppStatus) => {
    const order = ["DRAFT", "SUBMITTED", "UNDER_REVIEW", "NEED_SUPPLEMENT", "REJECTED", "ADMITTED", "ENROLLED"];
    
    // Normalize currentStatus for timeline comparison
    let normalizedCurrent = currentStatus;
    if (currentStatus === "NEED_SUPPLEMENT") normalizedCurrent = "UNDER_REVIEW";
    if (currentStatus === "REJECTED") normalizedCurrent = "ADMITTED";

    const currentIndex = order.indexOf(normalizedCurrent);
    const stepIndex = order.indexOf(stepKey);

    if (stepIndex < currentIndex) return "COMPLETED";
    if (stepIndex === currentIndex) {
      if (currentStatus === "REJECTED") return "ERROR";
      if (currentStatus === "NEED_SUPPLEMENT") return "WARNING";
      return "ACTIVE";
    }
    return "PENDING";
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div className="flex justify-between items-end">
        <PageHeader 
          title="Kết quả Xét tuyển" 
          description="Theo dõi trạng thái hồ sơ và kết quả tuyển sinh của bạn." 
        />
        {/* Dropdown để test mock trạng thái */}
        <select 
          className="p-2 border rounded-md text-sm bg-surface mb-2"
          value={status}
          onChange={(e) => setStatus(e.target.value as AppStatus)}
        >
          <option value="SUBMITTED">Mock: Đã nộp</option>
          <option value="UNDER_REVIEW">Mock: Đang xét duyệt</option>
          <option value="NEED_SUPPLEMENT">Mock: Cần bổ sung</option>
          <option value="REJECTED">Mock: Trượt</option>
          <option value="ADMITTED">Mock: Trúng tuyển</option>
          <option value="ENROLLED">Mock: Đã nhập học</option>
        </select>
      </div>

      {/* Progress Timeline */}
      <Card className="shadow-sm overflow-hidden">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-border -translate-y-1/2 hidden md:block z-0"></div>
            {timelineSteps.map((step, idx) => {
              const stepStatus = getStepStatus(step.key, status);
              
              let bgColor = "bg-surface-hover";
              let textColor = "text-muted";
              let iconColor = "text-muted";
              let ring = "ring-4 ring-background";

              if (stepStatus === "COMPLETED") {
                bgColor = "bg-primary"; textColor = "text-heading font-medium"; iconColor = "text-white";
              } else if (stepStatus === "ACTIVE") {
                bgColor = "bg-primary"; textColor = "text-primary font-bold"; iconColor = "text-white"; ring = "ring-4 ring-primary-soft";
              } else if (stepStatus === "ERROR") {
                bgColor = "bg-error"; textColor = "text-error font-bold"; iconColor = "text-white"; ring = "ring-4 ring-error/20";
              } else if (stepStatus === "WARNING") {
                bgColor = "bg-warning"; textColor = "text-warning font-bold"; iconColor = "text-white"; ring = "ring-4 ring-warning/20";
              }

              return (
                <div key={idx} className="relative z-10 flex flex-col items-center gap-2 mb-4 md:mb-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bgColor} ${ring} transition-colors`}>
                    {stepStatus === "COMPLETED" ? <CheckCircle2 className="w-5 h-5 text-white" /> : <Circle className={`w-3 h-3 ${iconColor} fill-current`} />}
                  </div>
                  <span className={`text-sm ${textColor}`}>
                    {step.key === "ADMITTED" && status === "REJECTED" ? "Từ chối" : step.label}
                  </span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {(status === "SUBMITTED" || status === "UNDER_REVIEW") && (
        <Card className="shadow-sm border-blue-200">
          <CardContent className="p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Info className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-heading">Hồ sơ đang được xét duyệt</h3>
            <p className="text-muted mt-2 max-w-lg">
              Hội đồng tuyển sinh đang tiến hành xem xét hồ sơ của bạn. Vui lòng kiên nhẫn chờ đợi, kết quả sẽ được thông báo qua Email và hệ thống ngay khi có.
            </p>
          </CardContent>
        </Card>
      )}

      {status === "NEED_SUPPLEMENT" && (
        <Card className="shadow-sm border-warning">
          <CardContent className="p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mb-4">
              <Info className="w-8 h-8 text-warning" />
            </div>
            <h3 className="text-xl font-bold text-warning">Yêu cầu bổ sung hồ sơ</h3>
            <p className="text-muted mt-2 max-w-lg">
              Minh chứng &quot;CCCD / Mã định danh&quot; của bạn bị mờ hoặc không hợp lệ. Vui lòng vào mục &quot;Minh chứng&quot; để tải lại file mới nhất trước ngày 05/08/2026.
            </p>
            <Button className="mt-4 bg-warning hover:bg-warning/80 text-white">Bổ sung ngay</Button>
          </CardContent>
        </Card>
      )}

      {status === "REJECTED" && (
        <Card className="shadow-sm border-error">
          <CardContent className="p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-error/20 rounded-full flex items-center justify-center mb-4">
              <Info className="w-8 h-8 text-error" />
            </div>
            <h3 className="text-xl font-bold text-error">Rất tiếc, bạn chưa đủ điều kiện trúng tuyển</h3>
            <p className="text-muted mt-2 max-w-lg">
              Cảm ơn bạn đã quan tâm và đăng ký xét tuyển. Rất tiếc, hồ sơ của bạn chưa đạt yêu cầu của đợt tuyển sinh này. Chúc bạn thành công trong các đợt tuyển sinh tiếp theo!
            </p>
          </CardContent>
        </Card>
      )}

      {(status === "ADMITTED" || status === "ENROLLED") && (
        <Card className="shadow-md border-emerald-500/30 overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
          <CardContent className="p-8 md:p-12 text-center flex flex-col items-center relative z-10">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6 ring-8 ring-emerald-50">
              <Award className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-emerald-700 mb-2">Chúc mừng bạn đã trúng tuyển!</h2>
            <p className="text-heading font-medium text-lg mb-6">
              Nguyện vọng: <span className="text-primary font-bold">Lớp Chuyên Tin</span>
            </p>
            
            <div className="bg-surface-hover p-6 rounded-xl border border-border w-full max-w-md space-y-4 mb-8">
              <div>
                <p className="text-sm text-muted mb-1">Mã số trúng tuyển (Admission Number)</p>
                <p className="text-3xl font-mono font-bold tracking-wider text-heading">EDUMS-26-4029</p>
              </div>
              <div className="h-px w-full bg-border"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left text-sm">
                <div>
                  <p className="text-muted">Họ và tên</p>
                  <p className="font-semibold text-heading">Trần Bình</p>
                </div>
                <div>
                  <p className="text-muted">Điểm xét tuyển</p>
                  <p className="font-semibold text-heading">24.50</p>
                </div>
              </div>
            </div>

            {status === "ADMITTED" ? (
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white w-full sm:w-auto" onClick={() => setStatus("ENROLLED")}>
                  <CheckCircle2 className="w-5 h-5 mr-2" /> Xác nhận nhập học
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto" onClick={handleDownload}>
                  <Download className="w-5 h-5 mr-2" /> Tải Giấy báo
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Badge className="bg-emerald-500 text-white text-lg py-2 px-6">Đã xác nhận nhập học</Badge>
                <Button size="lg" variant="outline" className="mt-4" onClick={handleDownload}>
                  <Download className="w-5 h-5 mr-2" /> Tải Giấy báo & Hướng dẫn
                </Button>
              </div>
            )}
            
            {status === "ADMITTED" && (
              <p className="text-xs text-muted mt-6 max-w-md">
                Vui lòng xác nhận nhập học trước ngày 15/08/2026. Nếu quá hạn, kết quả trúng tuyển sẽ bị hủy.
              </p>
            )}
          </CardContent>
        </Card>
      )}

      {/* Thông tin hồ sơ đính kèm chung cho mọi trạng thái */}
      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="p-4 border-b bg-surface-hover/50 flex items-center gap-3">
            <FileCheck className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-heading">Thông tin đợt tuyển sinh</h3>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-muted">Chiến dịch</p>
              <p className="font-medium text-heading">Tuyển sinh Lớp 10 Khóa 2026-2029</p>
            </div>
            <div>
              <p className="text-sm text-muted">Trường</p>
              <p className="font-medium text-heading">Trường THPT Đa Tầng EduMS</p>
            </div>
            <div>
              <p className="text-sm text-muted">Ngày nộp hồ sơ</p>
              <p className="font-medium text-heading">28/07/2026 14:30</p>
            </div>
            <div>
              <p className="text-sm text-muted">Trạng thái hồ sơ</p>
              <p className="font-medium text-heading">Đã khóa (Không thể chỉnh sửa)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
