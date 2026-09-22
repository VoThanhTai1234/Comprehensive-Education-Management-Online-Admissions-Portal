"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/toaster"
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Trash2, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function DocumentUploadPage() {
  const { toast } = useToast()
  const [files, setFiles] = useState([
    { name: "ban-sao-khai-sinh.pdf", size: "1.2 MB", type: "Giấy khai sinh" },
    { name: "hoc-ba-lop-6.jpg", size: "850 KB", type: "Học bạ" },
    { name: "hoc-ba-lop-7.jpg", size: "920 KB", type: "Học bạ" },
    { name: "hoc-ba-lop-8.jpg", size: "880 KB", type: "Học bạ" },
    { name: "hoc-ba-lop-9.pdf", size: "2.1 MB", type: "Học bạ" },
  ])

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
        type: "Khác"
      }))
      setFiles(prev => [...prev, ...newFiles])
      toast({
        title: "Tải lên thành công",
        description: `Đã tải lên ${newFiles.length} file minh chứng.`,
        variant: "success"
      })
    }
  }

  const handleDelete = (index: number) => {
    setFiles(prev => prev.filter((_, idx) => idx !== index))
    toast({
      title: "Đã xóa file",
      description: "File minh chứng đã được gỡ bỏ khỏi hồ sơ.",
      variant: "warning"
    })
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <PageHeader 
        title="Tải lên Minh chứng" 
        description="Đính kèm các giấy tờ bắt buộc để hội đồng tuyển sinh xét duyệt." 
      />

      <div className="flex items-center justify-between p-4 bg-primary-soft text-primary-hover rounded-xl border border-primary/20">
        <div>
          <h3 className="font-semibold">Bước 2: Tải lên minh chứng</h3>
          <p className="text-sm opacity-90 mt-1">Đảm bảo ảnh chụp/scan rõ nét, định dạng PDF, JPG, PNG (tối đa 5MB/file).</p>
        </div>
        <div className="hidden sm:flex gap-2 items-center text-sm font-medium">
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-surface text-primary border border-primary/30">1</span>
          <div className="w-8 h-px bg-primary/30" />
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white">2</span>
          <div className="w-8 h-px bg-primary/30" />
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-surface text-muted">3</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cột trái: Checklist */}
        <div className="md:col-span-1 space-y-4">
          <Card className="shadow-sm">
            <CardContent className="p-4 space-y-4">
              <h4 className="font-semibold text-heading">Danh mục bắt buộc</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-heading">Bản sao Giấy khai sinh</p>
                    <p className="text-xs text-muted">Đã tải lên 1 file</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-heading">Học bạ THCS (Lớp 6, 7, 8, 9)</p>
                    <p className="text-xs text-muted">Đã tải lên 4 file</p>
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-warning shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-heading">CCCD / Mã định danh</p>
                    <p className="text-xs text-warning">Chưa tải lên (Bắt buộc)</p>
                  </div>
                </li>
              </ul>
              <div className="pt-4 border-t">
                <h4 className="font-semibold text-heading mb-3">Danh mục Tự chọn</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-muted shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-heading">Giấy chứng nhận giải thưởng</p>
                      <p className="text-xs text-muted">Tùy chọn</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-muted shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-heading">Giấy chứng nhận diện ưu tiên</p>
                      <p className="text-xs text-muted">Tùy chọn</p>
                    </div>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cột phải: Vùng Upload & Danh sách file */}
        <div className="md:col-span-2 space-y-6">
          <Card className="shadow-sm border-dashed border-2 bg-surface-hover/50 hover:bg-surface-hover transition-colors">
            <CardContent className="p-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <UploadCloud className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-heading text-lg">Kéo thả file vào đây</h3>
              <p className="text-sm text-muted mt-2 mb-6">hoặc click để chọn file từ thiết bị của bạn.</p>
              
              <label className="cursor-pointer">
                <Input type="file" className="hidden" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={handleUpload} />
                <div className="inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  Chọn File Tải Lên
                </div>
              </label>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <h4 className="font-semibold text-heading">File đã tải lên ({files.length})</h4>
            
            {files.map((file, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-surface rounded-lg border shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-soft rounded-md">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-heading line-clamp-1">{file.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <span>{file.size}</span>
                      <span>•</span>
                      <span className="text-primary-hover font-medium">{file.type}</span>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="text-error hover:bg-error/10 hover:text-error" onClick={() => handleDelete(idx)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {files.length === 0 && (
              <p className="text-sm text-muted text-center py-4">Chưa có file nào được tải lên.</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-4 pt-4 border-t">
        <Link href="/ung-vien/ho-so">
          <Button variant="outline" type="button">
            <ChevronLeft className="w-4 h-4 mr-2" /> Quay lại Bước 1
          </Button>
        </Link>
        <Link href="/ung-vien/ho-so/nguyen-vong">
          <Button type="button">
            Tiếp tục Bước 3 <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
