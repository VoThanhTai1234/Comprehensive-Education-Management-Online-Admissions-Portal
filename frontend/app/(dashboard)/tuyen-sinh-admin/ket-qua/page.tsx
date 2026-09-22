"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { useToast } from "@/components/ui/toaster"
import { CheckSquare, Megaphone, Users, Award, AlertTriangle } from "lucide-react"

export default function ResultPublicationPage() {
  const { toast } = useToast()
  const [isAllSelected, setIsAllSelected] = useState(true)
  
  const handleSelectAll = () => {
    setIsAllSelected(!isAllSelected)
    toast({
      title: !isAllSelected ? "Đã chọn tất cả" : "Đã bỏ chọn",
      description: !isAllSelected ? "Đã chọn toàn bộ hồ sơ đạt yêu cầu." : "Đã bỏ chọn danh sách.",
    })
  }
  const handlePublish = () => {
    toast({
      title: "Đã công bố",
      description: "Danh sách trúng tuyển đã được công bố. Email thông báo đang được gửi tới các ứng viên.",
      variant: "success"
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Công bố Kết quả" 
        description="Chốt danh sách trúng tuyển và gửi thông báo hàng loạt cho ứng viên." 
        action={
          <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handlePublish}>
            <Megaphone className="w-4 h-4 mr-2" /> Công bố ngay
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" /> Tổng hồ sơ Đã duyệt
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-heading">620</div>
            <p className="text-xs text-muted mt-1">Sẵn sàng để xét trúng tuyển</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-emerald-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-500" /> Trúng tuyển dự kiến
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-heading">500</div>
            <p className="text-xs text-muted mt-1">Đạt điểm chuẩn và ưu tiên NV1</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-warning/50 bg-warning/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-warning" /> Cần chú ý
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">14</div>
            <p className="text-xs text-warning mt-1">Hồ sơ có điểm bằng điểm chuẩn, cần tiêu chí phụ</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="p-4 border-b bg-background/50 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex w-full md:w-auto items-center gap-3">
              <Select 
                options={[
                  { label: "Chiến dịch: TS10-26", value: "TS10-26" },
                ]}
              />
              <Select 
                options={[
                  { label: "Lớp: Tất cả", value: "" },
                  { label: "Lớp Chuyên Toán", value: "MATH" },
                  { label: "Lớp Chuyên Tin", value: "IT" },
                ]}
              />
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={handleSelectAll}>
                <CheckSquare className="w-4 h-4 mr-2" /> 
                {isAllSelected ? "Bỏ chọn tất cả" : "Chọn tất cả Đạt"}
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="w-[50px] text-center">
                    <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" checked={isAllSelected} readOnly />
                  </TableHead>
                  <TableHead>Mã Hồ sơ</TableHead>
                  <TableHead>Ứng viên</TableHead>
                  <TableHead>Điểm</TableHead>
                  <TableHead>Nguyện vọng Đạt</TableHead>
                  <TableHead>Kết quả</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { id: "APP-001", name: "Trần Bình", score: 24.50, nv: "NV1: Lớp Chuyên Tin", result: "ADMITTED" },
                  { id: "APP-004", name: "Phạm Văn Duy", score: 28.00, nv: "NV1: Lớp Chuyên Toán", result: "ADMITTED" },
                  { id: "APP-012", name: "Hoàng Minh Tâm", score: 22.00, nv: "NV2: Lớp Căn bản", result: "ADMITTED" },
                  { id: "APP-045", name: "Lê Cát Tiên", score: 18.00, nv: "Không đạt NV nào", result: "REJECTED" },
                ].map((app) => (
                  <TableRow key={app.id} className="hover:bg-surface-hover/50">
                    <TableCell className="text-center">
                      <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" checked={app.result === "ADMITTED" && isAllSelected} readOnly />
                    </TableCell>
                    <TableCell className="font-mono text-sm text-muted">{app.id}</TableCell>
                    <TableCell className="font-semibold text-heading">{app.name}</TableCell>
                    <TableCell className="font-bold">{app.score}</TableCell>
                    <TableCell className="text-text-secondary">{app.nv}</TableCell>
                    <TableCell>
                      {app.result === "ADMITTED" ? (
                        <Badge variant="outline" className="border-emerald-500 text-emerald-600 bg-emerald-50">
                          Đỗ
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="border-error text-error bg-error/10">
                          Trượt
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
