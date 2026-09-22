"use client"

import { PageHeader } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Save, Settings2, Mail, CreditCard } from "lucide-react"

export default function GlobalConfigPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Cấu hình Dùng chung" 
        description="Thiết lập các thông số hệ thống, kết nối API và cổng thanh toán." 
        action={
          <Button>
            <Save className="w-4 h-4 mr-2" /> Lưu cấu hình
          </Button>
        }
      />

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full sm:w-[400px] grid-cols-3 p-1 bg-surface-hover rounded-lg border border-border">
          <TabsTrigger value="general" className="rounded-md data-[state=active]:bg-surface data-[state=active]:shadow-sm">
            <Settings2 className="w-4 h-4 mr-2" /> Chung
          </TabsTrigger>
          <TabsTrigger value="email" className="rounded-md data-[state=active]:bg-surface data-[state=active]:shadow-sm">
            <Mail className="w-4 h-4 mr-2" /> Email
          </TabsTrigger>
          <TabsTrigger value="payment" className="rounded-md data-[state=active]:bg-surface data-[state=active]:shadow-sm">
            <CreditCard className="w-4 h-4 mr-2" /> Thanh toán
          </TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="general" className="m-0 focus-visible:outline-none">
            <Card className="shadow-sm">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-heading">Thông tin Trường học</h3>
                  <p className="text-sm text-muted mb-4">Các thông tin cơ bản hiển thị trên hệ thống và email gửi đi.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-heading">Tên trường <span className="text-error">*</span></label>
                      <Input defaultValue="Trường THPT Đa Tầng EduMS" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-heading">Mã trường</label>
                      <Input defaultValue="EDUMS-THPT" disabled className="bg-surface-hover" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-heading">Địa chỉ</label>
                      <Input defaultValue="123 Đường Học Thuật, Quận Kiến Thức, TP. Trí Tuệ" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-heading">Số điện thoại liên hệ</label>
                      <Input defaultValue="028.3123.4567" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-heading">Website</label>
                      <Input defaultValue="https://edums.edu.vn" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="email" className="m-0 focus-visible:outline-none">
            <Card className="shadow-sm">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-heading">Cấu hình SMTP (Gửi Email)</h3>
                  <p className="text-sm text-muted mb-4">Kết nối máy chủ gửi email tự động (Cấp tài khoản, thông báo trúng tuyển).</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-heading">SMTP Host</label>
                      <Input defaultValue="smtp.gmail.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-heading">SMTP Port</label>
                      <Input defaultValue="587" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-heading">Email gửi (From Address)</label>
                      <Input defaultValue="noreply@edums.edu.vn" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-heading">Username</label>
                      <Input defaultValue="apikey" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-heading">Password / API Key</label>
                      <Input type="password" defaultValue="************************" />
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-border">
                    <Button variant="outline">Kiểm tra kết nối gửi Email</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment" className="m-0 focus-visible:outline-none">
            <Card className="shadow-sm">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-heading">Cổng thanh toán VietQR</h3>
                  <p className="text-sm text-muted mb-4">Cấu hình tài khoản ngân hàng để sinh mã VietQR tự động cho phụ huynh/ứng viên đóng phí.</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-heading">Ngân hàng (Bank Code)</label>
                      <Input defaultValue="VCB (Vietcombank)" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-heading">Số tài khoản</label>
                      <Input defaultValue="1023456789" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-heading">Tên chủ tài khoản</label>
                      <Input defaultValue="TRUONG THPT DA TANG EDUMS" disabled className="bg-surface-hover" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-heading">Cấu trúc nội dung thanh toán (Template)</label>
                      <Input defaultValue="EDUMS {MSSV} {LOAI_PHI}" />
                      <p className="text-xs text-muted mt-1">Hệ thống sẽ tự động thay thế `{"{MSSV}"}` và `{"{LOAI_PHI}"}` khi sinh mã QR.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
