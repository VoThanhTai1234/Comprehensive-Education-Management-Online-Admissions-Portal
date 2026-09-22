"use client"

import { use, useState } from "react"
import { PageHeader } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/toaster"
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle, FileText, Download, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Use React.use() to unwrap the params object (Next.js 15+)
  const resolvedParams = use(params)
  const { id } = resolvedParams
  const { toast } = useToast()
  
  const [status, setStatus] = useState<"PENDING" | "APPROVED" | "REJECTED" | "NEED_SUPPLEMENT">("PENDING")

  const handleAction = (action: "APPROVED" | "REJECTED" | "NEED_SUPPLEMENT") => {
    setStatus(action)
    
    let title = ""
    let description = ""
    let variant: "success" | "warning" | "destructive" = "success"

    if (action === "APPROVED") {
      title = "Duyệt thành công"
      description = "Hồ sơ đã được đánh giá đạt yêu cầu."
    } else if (action === "NEED_SUPPLEMENT") {
      title = "Yêu cầu bổ sung"
      description = "Đã gửi thông báo yêu cầu ứng viên bổ sung minh chứng."
      variant = "warning"
    } else {
      title = "Từ chối hồ sơ"
      description = "Hồ sơ đã bị loại khỏi đợt xét tuyển."
      variant = "destructive"
    }

    toast({ title, description, variant })
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl">
      <div className="flex items-center gap-4">
        <Link href="/tuyen-sinh-admin/ho-so">
          <Button variant="ghost" size="icon" className="hover:bg-surface-hover">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <PageHeader 
          title={`Chi tiết Hồ sơ: ${id}`}
          description="Đánh giá minh chứng và ra quyết định xét duyệt." 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cột trái: Thông tin ứng viên */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-start justify-between border-b pb-4">
                <div>
                  <h3 className="text-xl font-bold text-heading">Trần Bình</h3>
                  <p className="text-muted mt-1">CCCD: 001201012345 • NS: 15/05/2010</p>
                </div>
                {status === "PENDING" && <Badge className="bg-blue-50 text-blue-600 border-blue-200">Chờ duyệt</Badge>}
                {status === "APPROVED" && <Badge className="bg-emerald-50 text-emerald-600 border-emerald-200">Đã duyệt</Badge>}
                {status === "NEED_SUPPLEMENT" && <Badge className="bg-warning/10 text-warning border-warning/20">Cần bổ sung</Badge>}
                {status === "REJECTED" && <Badge className="bg-error/10 text-error border-error/20">Từ chối</Badge>}
              </div>

              <div>
                <h4 className="font-semibold text-heading mb-3">Thông tin Đăng ký</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted">Chiến dịch</p>
                    <p className="font-medium text-heading">Tuyển sinh Lớp 10 Khóa 2026-2029</p>
                  </div>
                  <div>
                    <p className="text-muted">Ngày nộp</p>
                    <p className="font-medium text-heading">28/07/2026 14:30</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-muted">Trường THCS</p>
                    <p className="font-medium text-heading">THCS Nguyễn Du (Quận Gò Vấp, TP.HCM)</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-heading mb-3">Nguyện vọng Xét tuyển</h4>
                <div className="space-y-2">
                  <div className="p-3 bg-surface rounded-lg border flex items-center justify-between">
                    <span className="font-medium text-heading"><Badge className="mr-2">1</Badge> Lớp Chuyên Toán</span>
                    <Badge variant="outline">Đang xét</Badge>
                  </div>
                  <div className="p-3 bg-surface rounded-lg border flex items-center justify-between opacity-70">
                    <span className="font-medium"><Badge variant="outline" className="mr-2">2</Badge> Lớp Chuyên Tin</span>
                    <span className="text-xs text-muted">Dự phòng</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-heading mb-4">Minh chứng đính kèm (5)</h3>
              <div className="space-y-3">
                {[
                  { name: "ban-sao-khai-sinh.pdf", type: "Giấy khai sinh", status: "ok" },
                  { name: "hoc-ba-lop-6-9.pdf", type: "Học bạ", status: "ok" },
                  { name: "cccd-mat-truoc.jpg", type: "CCCD / Mã định danh", status: "warn" },
                ].map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-surface rounded-lg border shadow-sm group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary-soft rounded-md">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-heading">{file.name}</p>
                        <p className="text-xs text-primary-hover font-medium">{file.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {file.status === "warn" && <Badge variant="outline" className="border-warning text-warning bg-warning/5">Mờ/Không rõ</Badge>}
                      <Button variant="ghost" size="icon" className="hover:text-primary">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="hover:text-primary">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cột phải: Khung xét duyệt */}
        <div className="space-y-6">
          <Card className="shadow-sm border-primary/20 bg-primary-soft/30">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-heading">Bảng Điểm Xét Duyệt</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted">Môn Toán</span>
                  <Input className="w-20 text-center h-8" defaultValue="8.5" />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted">Môn Văn</span>
                  <Input className="w-20 text-center h-8" defaultValue="7.5" />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted">Môn Anh</span>
                  <Input className="w-20 text-center h-8" defaultValue="8.5" />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted">Điểm ưu tiên</span>
                  <Input className="w-20 text-center h-8" defaultValue="0" />
                </div>
                <div className="pt-3 border-t flex justify-between items-center font-bold text-heading">
                  <span>Tổng điểm</span>
                  <span className="text-xl text-primary">24.50</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-heading">Quyết định</h3>
              <p className="text-sm text-muted mb-4">Chọn hành động cho hồ sơ này để chuyển trạng thái.</p>
              
              <div className="space-y-3">
                <Button 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 justify-start h-12"
                  onClick={() => handleAction("APPROVED")}
                  disabled={status === "APPROVED"}
                >
                  <CheckCircle className="w-5 h-5 mr-3" /> Đạt yêu cầu (Duyệt)
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start h-12 text-warning hover:bg-warning/10 hover:text-warning border-warning/50"
                  onClick={() => handleAction("NEED_SUPPLEMENT")}
                  disabled={status === "NEED_SUPPLEMENT"}
                >
                  <AlertTriangle className="w-5 h-5 mr-3" /> Yêu cầu bổ sung MC
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start h-12 text-error hover:bg-error/10 hover:text-error border-error/50"
                  onClick={() => handleAction("REJECTED")}
                  disabled={status === "REJECTED"}
                >
                  <XCircle className="w-5 h-5 mr-3" /> Loại hồ sơ (Trượt)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
