"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Modal } from "@/components/ui/modal"
import { SearchIcon, Download, Filter, Calendar, Eye } from "lucide-react"

const MOCK_LOGS = [
  { id: "LOG-001", time: "28/09/2026 10:30:15", user: "sysadmin@edums.edu.vn", action: "UPDATE_ROLE", entity: "User: admin@edums.edu.vn", ip: "192.168.1.42", status: "SUCCESS" },
  { id: "LOG-002", time: "28/09/2026 09:15:00", user: "sysadmin@edums.edu.vn", action: "UPDATE_CONFIG", entity: "Config: SMTP_HOST", ip: "192.168.1.42", status: "SUCCESS" },
  { id: "LOG-003", time: "27/09/2026 23:59:59", user: "system_cron", action: "DB_BACKUP", entity: "Database: edums_prod", ip: "localhost", status: "SUCCESS" },
  { id: "LOG-004", time: "27/09/2026 15:20:10", user: "unknown", action: "LOGIN_FAILED", entity: "User: sysadmin@edums.edu.vn", ip: "103.11.22.33", status: "FAILED" },
  { id: "LOG-005", time: "27/09/2026 15:20:12", user: "unknown", action: "LOGIN_FAILED", entity: "User: sysadmin@edums.edu.vn", ip: "103.11.22.33", status: "FAILED" },
  { id: "LOG-006", time: "27/09/2026 15:20:15", user: "sysadmin@edums.edu.vn", action: "BLOCK_IP", entity: "IP: 103.11.22.33", ip: "192.168.1.42", status: "SUCCESS" },
  { id: "LOG-007", time: "26/09/2026 08:00:00", user: "admin@edums.edu.vn", action: "CREATE_USER", entity: "User: teacher02@edums.edu.vn", ip: "192.168.1.50", status: "SUCCESS" },
]

export default function AuditLogPage() {
  const [selectedLog, setSelectedLog] = useState<typeof MOCK_LOGS[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleView = (log: typeof MOCK_LOGS[0]) => {
    setSelectedLog(log)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Nhật ký Kiểm toán (Audit Log)" 
        description="Lưu vết toàn bộ hoạt động của người dùng trong hệ thống để phục vụ truy vết và bảo mật." 
        action={
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" /> Xuất Excel
          </Button>
        }
      />

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="p-4 border-b bg-background/50 rounded-t-xl grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            <div className="md:col-span-4 space-y-1.5">
              <label className="text-xs font-medium text-heading">Tìm kiếm</label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9" placeholder="Tìm User, Entity, IP..." />
              </div>
            </div>
            <div className="md:col-span-3 space-y-1.5">
              <label className="text-xs font-medium text-heading">Hành động (Action)</label>
              <Select 
                options={[
                  { label: "Tất cả", value: "" },
                  { label: "LOGIN / AUTH", value: "LOGIN" },
                  { label: "UPDATE_ROLE", value: "ROLE" },
                  { label: "UPDATE_CONFIG", value: "CONFIG" },
                ]}
              />
            </div>
            <div className="md:col-span-3 space-y-1.5">
              <label className="text-xs font-medium text-heading">Thời gian</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9" placeholder="Hôm nay" />
              </div>
            </div>
            <div className="md:col-span-2">
              <Button className="w-full"><Filter className="w-4 h-4 mr-2" /> Lọc</Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/30">
                  <TableHead className="w-[180px]">Thời gian</TableHead>
                  <TableHead>Tài khoản / IP</TableHead>
                  <TableHead>Hành động</TableHead>
                  <TableHead>Đối tượng tác động</TableHead>
                  <TableHead className="text-right">Trạng thái</TableHead>
                  <TableHead className="text-right w-[80px]">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_LOGS.map((log) => (
                  <TableRow key={log.id} className="hover:bg-surface-hover/50 font-mono text-sm">
                    <TableCell className="text-muted">{log.time}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-heading">{log.user}</span>
                        <span className="text-xs text-muted">IP: {log.ip}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-surface-hover rounded-md text-xs font-bold text-primary">
                        {log.action}
                      </span>
                    </TableCell>
                    <TableCell className="text-text-secondary">
                      {log.entity}
                    </TableCell>
                    <TableCell className="text-right">
                      {log.status === "SUCCESS" ? (
                        <Badge variant="outline" className="border-emerald-500 text-emerald-600 bg-emerald-50">Thành công</Badge>
                      ) : (
                        <Badge variant="outline" className="border-error text-error bg-error/10">Thất bại</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleView(log)}>
                        <Eye className="w-4 h-4 text-muted" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="p-4 border-t flex items-center justify-between text-sm text-muted">
            <div>Hiển thị 1-7 của 2,450 bản ghi</div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Trước</Button>
              <Button variant="outline" size="sm">Tiếp</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Chi tiết sự kiện Kiểm toán"
        description="Thông tin đầy đủ của một sự kiện hệ thống."
      >
        {selectedLog && (
          <div className="space-y-4 font-mono text-sm">
            <div className="grid grid-cols-3 gap-4 border-b pb-4 border-border">
              <div className="col-span-1 text-muted">ID</div>
              <div className="col-span-2 text-heading">{selectedLog.id}</div>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b pb-4 border-border">
              <div className="col-span-1 text-muted">Thời gian</div>
              <div className="col-span-2 text-heading">{selectedLog.time}</div>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b pb-4 border-border">
              <div className="col-span-1 text-muted">Tài khoản</div>
              <div className="col-span-2 text-heading">{selectedLog.user}</div>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b pb-4 border-border">
              <div className="col-span-1 text-muted">IP Address</div>
              <div className="col-span-2 text-heading">{selectedLog.ip}</div>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b pb-4 border-border">
              <div className="col-span-1 text-muted">Hành động</div>
              <div className="col-span-2 text-primary font-bold">{selectedLog.action}</div>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b pb-4 border-border">
              <div className="col-span-1 text-muted">Đối tượng</div>
              <div className="col-span-2 text-heading">{selectedLog.entity}</div>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b pb-4 border-border">
              <div className="col-span-1 text-muted">Kết quả</div>
              <div className="col-span-2">
                {selectedLog.status === "SUCCESS" ? (
                  <span className="text-emerald-600 font-bold">SUCCESS</span>
                ) : (
                  <span className="text-error font-bold">FAILED</span>
                )}
              </div>
            </div>
            <div className="pt-4 flex justify-end">
              <Button onClick={() => setIsModalOpen(false)}>Đóng</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
