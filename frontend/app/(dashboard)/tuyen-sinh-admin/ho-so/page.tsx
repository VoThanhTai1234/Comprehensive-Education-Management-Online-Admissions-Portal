"use client"

import { PageHeader } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { SearchIcon, Filter, Download, CheckCircle, Clock, AlertTriangle, FileText } from "lucide-react"
import Link from "next/link"

const MOCK_APPLICATIONS = [
  { id: "APP-001", name: "Trần Bình", dob: "15/05/2010", campaign: "TS10-26", score: "24.50", status: "APPROVED", date: "28/07/2026" },
  { id: "APP-002", name: "Nguyễn Thị Hà", dob: "22/11/2010", campaign: "TS10-26", score: "-", status: "PENDING", date: "29/07/2026" },
  { id: "APP-003", name: "Lê Hoàng Quân", dob: "05/01/2010", campaign: "TS10-26", score: "-", status: "SUPPLEMENT", date: "29/07/2026" },
  { id: "APP-004", name: "Phạm Văn Duy", dob: "18/09/2010", campaign: "TS10-26", score: "28.00", status: "APPROVED", date: "30/07/2026" },
  { id: "APP-005", name: "Vũ Thanh Trà", dob: "12/03/2010", campaign: "TS10-26", score: "19.50", status: "REJECTED", date: "30/07/2026" },
]

export default function OfficerQueuePage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Hàng đợi Hồ sơ" 
        description="Xem xét, đánh giá và duyệt hồ sơ ứng viên gửi về." 
        action={
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" /> Xuất danh sách
          </Button>
        }
      />

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="p-4 border-b bg-background/50 rounded-t-xl flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9" placeholder="Tìm theo tên, mã hồ sơ, CCCD..." />
            </div>
            
            <div className="flex w-full md:w-auto items-center gap-3">
              <Select 
                options={[
                  { label: "Tất cả chiến dịch", value: "" },
                  { label: "TS10-26", value: "TS10-26" },
                  { label: "TS-BS-26", value: "TS-BS-26" },
                ]}
              />
              <Select 
                options={[
                  { label: "Tất cả trạng thái", value: "" },
                  { label: "Chờ duyệt", value: "PENDING" },
                  { label: "Cần bổ sung", value: "SUPPLEMENT" },
                  { label: "Đã duyệt", value: "APPROVED" },
                ]}
              />
              <Button variant="outline"><Filter className="w-4 h-4 mr-2" /> Lọc</Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="w-[100px]">Mã Hồ sơ</TableHead>
                  <TableHead>Ứng viên</TableHead>
                  <TableHead>Chiến dịch</TableHead>
                  <TableHead>Ngày nộp</TableHead>
                  <TableHead className="text-center">Điểm xét duyệt</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_APPLICATIONS.map((app) => (
                  <TableRow key={app.id} className="hover:bg-surface-hover/50">
                    <TableCell className="font-mono text-sm font-semibold text-primary">{app.id}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-semibold text-heading">{app.name}</span>
                        <span className="text-xs text-muted">NS: {app.dob}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-surface text-text-secondary">{app.campaign}</Badge>
                    </TableCell>
                    <TableCell className="text-muted text-sm">{app.date}</TableCell>
                    <TableCell className="text-center font-bold text-heading">{app.score}</TableCell>
                    <TableCell>
                      {app.status === "PENDING" && (
                        <Badge variant="outline" className="border-blue-500 text-blue-600 bg-blue-50">
                          <Clock className="w-3 h-3 mr-1" /> Chờ duyệt
                        </Badge>
                      )}
                      {app.status === "APPROVED" && (
                        <Badge variant="outline" className="border-emerald-500 text-emerald-600 bg-emerald-50">
                          <CheckCircle className="w-3 h-3 mr-1" /> Đã duyệt
                        </Badge>
                      )}
                      {app.status === "SUPPLEMENT" && (
                        <Badge variant="outline" className="border-warning text-warning bg-warning/10">
                          <AlertTriangle className="w-3 h-3 mr-1" /> Cần bổ sung
                        </Badge>
                      )}
                      {app.status === "REJECTED" && (
                        <Badge variant="outline" className="border-error text-error bg-error/10">
                          Loại
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/tuyen-sinh-admin/ho-so/${app.id}`}>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover hover:bg-primary-soft">
                          <FileText className="w-4 h-4 mr-2" /> Đánh giá
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="p-4 border-t flex items-center justify-between text-sm text-muted">
            <div>Hiển thị 1-5 của 850 hồ sơ</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Trước</Button>
              <Button variant="outline" size="sm">Tiếp</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
