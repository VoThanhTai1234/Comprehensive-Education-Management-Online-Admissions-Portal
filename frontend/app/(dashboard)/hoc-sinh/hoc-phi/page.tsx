"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Receipt, CheckCircle2, AlertTriangle, QrCode, Download, X } from "lucide-react"
import { MOCK_INVOICES } from "@/mocks/finance"

export default function StudentTuitionPage() {
  const [selectedInvoice, setSelectedInvoice] = useState<typeof MOCK_INVOICES[0] | null>(null)
  const [isQrOpen, setIsQrOpen] = useState(false)

  const handlePay = (invoice: typeof MOCK_INVOICES[0]) => {
    setSelectedInvoice(invoice)
    setIsQrOpen(true)
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Học phí & Các khoản thu" 
        description="Tra cứu và thanh toán học phí qua mã VietQR." 
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm border-l-4 border-l-error">
          <CardContent className="p-6">
            <div className="text-sm font-medium text-muted flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-error" /> Nợ học phí
            </div>
            <div className="text-3xl font-bold text-error">
              {formatCurrency(MOCK_INVOICES.filter(i => i.status === "UNPAID").reduce((a, b) => a + b.totalAmount, 0))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border-l-4 border-l-emerald-500 md:col-span-2">
          <CardContent className="p-6">
             <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-medium text-muted flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Đã thanh toán (Năm học này)
                  </div>
                  <div className="text-3xl font-bold text-emerald-600">
                    {formatCurrency(MOCK_INVOICES.filter(i => i.status === "PAID").reduce((a, b) => a + b.totalAmount, 0))}
                  </div>
                </div>
                <div className="hidden sm:block">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
                    <Receipt className="w-6 h-6 text-emerald-600" />
                  </div>
                </div>
             </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-base text-heading">Danh sách Hóa đơn</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead>Mã HĐ</TableHead>
                  <TableHead>Nội dung</TableHead>
                  <TableHead>Hạn chót</TableHead>
                  <TableHead className="text-right">Tổng tiền</TableHead>
                  <TableHead className="text-center">Trạng thái</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_INVOICES.map((invoice) => (
                  <TableRow key={invoice.id} className="hover:bg-surface-hover/50">
                    <TableCell className="font-mono text-sm text-muted">{invoice.id}</TableCell>
                    <TableCell className="font-medium text-heading">{invoice.title}</TableCell>
                    <TableCell className="text-text-secondary">{invoice.dueDate}</TableCell>
                    <TableCell className="text-right font-bold text-heading">{formatCurrency(invoice.totalAmount)}</TableCell>
                    <TableCell className="text-center">
                      {invoice.status === "PAID" ? (
                        <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none">Đã thanh toán</Badge>
                      ) : (
                        <Badge variant="outline" className="text-error border-error bg-error/10">Chưa thanh toán</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {invoice.status === "UNPAID" ? (
                        <Button size="sm" onClick={() => handlePay(invoice)} className="bg-primary hover:bg-primary-dark">
                          Thanh toán
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" className="text-muted">
                          <Download className="w-4 h-4 mr-2" /> Biên lai
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

      {/* Modal VietQR */}
      {isQrOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-[500px] overflow-hidden animate-in zoom-in-95 duration-200 relative">
            <div className="px-6 py-4 border-b flex justify-center items-center">
              <h2 className="text-xl font-semibold text-center">Thanh toán bằng VietQR</h2>
              <button onClick={() => setIsQrOpen(false)} className="absolute right-4 top-4 p-2 text-muted hover:text-heading rounded-full hover:bg-surface-hover">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {selectedInvoice && (
              <div className="p-6 flex flex-col items-center space-y-6">
                <div className="text-center w-full bg-blue-50/50 p-4 rounded-lg">
                  <p className="text-sm text-muted mb-1">Nội dung thanh toán:</p>
                  <p className="font-semibold text-heading">{selectedInvoice.title}</p>
                  <div className="mt-4 pt-4 border-t border-blue-100 flex justify-between">
                    <span className="text-muted text-sm">Học sinh: <span className="font-medium text-heading">{selectedInvoice.studentName} ({selectedInvoice.studentCode})</span></span>
                    <span className="text-muted text-sm">Tổng tiền: <span className="font-bold text-error">{formatCurrency(selectedInvoice.totalAmount)}</span></span>
                  </div>
                </div>
                
                <div className="bg-white p-4 inline-block border-2 border-primary/20 rounded-xl shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={`https://img.vietqr.io/image/970422-0123456789-Q6wZ6p.jpg?amount=${selectedInvoice.totalAmount}&addInfo=EduMS%20${selectedInvoice.id}&accountName=TRUONG%20THPT%20EDUMS`} 
                    alt="VietQR" 
                    className="w-64 h-64 object-contain"
                  />
                </div>
                
                <div className="text-center space-y-2">
                  <p className="text-sm font-medium text-heading">Mở ứng dụng Ngân hàng trên điện thoại để quét mã.</p>
                  <p className="text-xs text-muted flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Hệ thống sẽ tự động gạch nợ sau 3-5 phút.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
