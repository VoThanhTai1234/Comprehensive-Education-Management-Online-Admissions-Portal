"use client"

import { PageHeader } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { useToast } from "@/components/ui/toaster"
import { Save, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function ApplicationFormPage() {
  const { toast } = useToast()
  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <PageHeader 
        title="Hồ sơ đăng ký" 
        description="Điền thông tin cá nhân và quá trình học tập của bạn." 
      />

      <div className="flex items-center justify-between p-4 bg-primary-soft text-primary-hover rounded-xl border border-primary/20">
        <div>
          <h3 className="font-semibold">Bước 1: Điền thông tin hồ sơ</h3>
          <p className="text-sm opacity-90 mt-1">Hoàn thành thông tin bên dưới để tiếp tục tải lên minh chứng.</p>
        </div>
        <div className="hidden sm:flex gap-2 items-center text-sm font-medium">
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white">1</span>
          <div className="w-8 h-px bg-primary/30" />
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-surface text-muted">2</span>
          <div className="w-8 h-px bg-primary/30" />
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-surface text-muted">3</span>
        </div>
      </div>

      <form className="space-y-6">
        {/* Section: Thông tin cá nhân */}
        <Card className="shadow-sm">
          <CardContent className="p-6 space-y-6">
            <h3 className="text-lg font-semibold text-heading border-b pb-2">Thông tin cá nhân</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-heading">Họ và tên <span className="text-error">*</span></label>
                <Input defaultValue="Trần Bình" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-heading">Giới tính <span className="text-error">*</span></label>
                <Select 
                  options={[
                    { label: "Nam", value: "M" },
                    { label: "Nữ", value: "F" },
                  ]}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-heading">Ngày sinh <span className="text-error">*</span></label>
                <Input type="date" defaultValue="2010-05-15" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-heading">Số CCCD / Mã định danh <span className="text-error">*</span></label>
                <Input defaultValue="001201012345" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-heading">Nơi sinh (Tỉnh/Thành phố)</label>
                <Input defaultValue="Hà Nội" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section: Hộ khẩu / Liên hệ */}
        <Card className="shadow-sm">
          <CardContent className="p-6 space-y-6">
            <h3 className="text-lg font-semibold text-heading border-b pb-2">Hộ khẩu & Liên hệ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-heading">Địa chỉ thường trú <span className="text-error">*</span></label>
                <Input defaultValue="Số 1, Đường Quang Trung, Phường 10, Quận Gò Vấp, TP.HCM" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-heading">Email liên hệ <span className="text-error">*</span></label>
                <Input type="email" defaultValue="applicant01@edums.edu.vn" disabled className="bg-surface-hover" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-heading">Số điện thoại liên hệ <span className="text-error">*</span></label>
                <Input defaultValue="0987654321" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Section: Thông tin trường học cũ */}
        <Card className="shadow-sm">
          <CardContent className="p-6 space-y-6">
            <h3 className="text-lg font-semibold text-heading border-b pb-2">Trường học hiện tại (THCS)</h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-heading">Tên trường THCS đang theo học <span className="text-error">*</span></label>
                <Input defaultValue="THCS Nguyễn Du" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-heading">Tỉnh / Thành phố <span className="text-error">*</span></label>
                  <Select options={[{ label: "TP. Hồ Chí Minh", value: "HCM" }]} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-heading">Quận / Huyện <span className="text-error">*</span></label>
                  <Select options={[{ label: "Quận Gò Vấp", value: "GV" }]} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-heading">Năm tốt nghiệp dự kiến</label>
                  <Input defaultValue="2026" disabled className="bg-surface-hover" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={() => toast({
            title: "Lưu bản nháp",
            description: "Thông tin hồ sơ của bạn đã được lưu nháp.",
            variant: "success"
          })}>
            <Save className="w-4 h-4 mr-2" /> Lưu nháp
          </Button>
          <Link href="/ung-vien/ho-so/minh-chung">
            <Button type="button">
              Tiếp tục <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </form>
    </div>
  )
}
