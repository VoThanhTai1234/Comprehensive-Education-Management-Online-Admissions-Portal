"use client"

import { PageHeader } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Receipt, Search, Download, Filter, TrendingUp, CheckCircle2, AlertTriangle } from "lucide-react"
import { MOCK_INVOICES, MOCK_RECONCILIATION_STATS } from "@/mocks/finance"

export default function PaymentReconciliationPage() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Đối soát Thanh toán" 
        description="Quản lý thu học phí, tra cứu hóa đơn và thống kê tỷ lệ hoàn thành." 
        action={
          <div className="flex gap-2">
            <Button variant="outline"><Download className="w-4 h-4 mr-2" /> Xuất báo cáo</Button>
            <Button className="bg-primary hover:bg-primary-dark">Tạo đợt thu mới</Button>
          </div>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-blue-500" /> Tổng dự thu
            </div>
            <div className="text-2xl font-bold text-heading">
              {formatCurrency(MOCK_RECONCILIATION_STATS.totalExpected)}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Thực thu
            </div>
            <div className="text-2xl font-bold text-emerald-600">
              {formatCurrency(MOCK_RECONCILIATION_STATS.totalCollected)}
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted flex items-center gap-2 mb-2">
              <Receipt className="w-4 h-4 text-primary" /> Tỷ lệ hoàn thành
            </div>
            <div className="text-2xl font-bold text-primary">
              {MOCK_RECONCILIATION_STATS.collectionRate}%
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-sm border-l-4 border-l-error">
          <CardContent className="p-4">
            <div className="text-sm font-medium text-muted flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-error" /> Chưa thanh toán
            </div>
            <div className="text-2xl font-bold text-error">
              {MOCK_RECONCILIATION_STATS.unpaidCount} học sinh
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <CardTitle className="text-base text-heading">Danh sách Hóa đơn</CardTitle>
            <div className="flex gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted" />
                <Input placeholder="Tìm mã HĐ, mã HS, tên HS..." className="pl-9" />
              </div>
              <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Mã HĐ</TableHead>
                  <TableHead>Học sinh</TableHead>
                  <TableHead>Nội dung</TableHead>
                  <TableHead className="text-right">Tổng tiền</TableHead>
                  <TableHead className="text-center">Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_INVOICES.map((invoice) => (
                  <TableRow key={invoice.id} className="hover:bg-surface-hover/50">
                    <TableCell className="font-mono text-sm text-muted">{invoice.id}</TableCell>
                    <TableCell>
                      <div className="font-semibold text-heading">{invoice.studentName}</div>
                      <div className="text-xs text-text-secondary">{invoice.studentCode} - {invoice.class}</div>
                    </TableCell>
                    <TableCell className="font-medium text-heading">{invoice.title}</TableCell>
                    <TableCell className="text-right font-bold text-heading">{formatCurrency(invoice.totalAmount)}</TableCell>
                    <TableCell className="text-center">
                      {invoice.status === "PAID" ? (
                        <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none">Đã thu</Badge>
                      ) : (
                        <Badge variant="outline" className="text-error border-error bg-error/10">Nợ</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {invoice.status === "UNPAID" ? (
                        <Button size="sm" variant="outline" className="text-primary border-primary hover:bg-primary/10">
                          Nhắc nợ
                        </Button>
                      ) : (
                        <Button size="sm" variant="ghost" className="text-muted">
                          Chi tiết
                        </Button>
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
