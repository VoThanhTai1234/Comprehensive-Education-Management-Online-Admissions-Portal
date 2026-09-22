"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { Modal } from "@/components/ui/modal"
import { useToast } from "@/components/ui/toaster"
import { Play, CheckCircle2, Calendar, Edit3, Save, Share, AlertTriangle } from "lucide-react"

// Mock Timetable Matrix
const DAYS = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"]
const PERIODS = [
  { id: 1, time: "07:15 - 08:00" },
  { id: 2, time: "08:05 - 08:50" },
  { id: 3, time: "09:00 - 09:45" },
  { id: 4, time: "09:50 - 10:35" },
  { id: 5, time: "10:40 - 11:25" },
]

export default function TimetableManagementPage() {
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [hasData, setHasData] = useState(false)
  const [classFilter, setClassFilter] = useState("CLS-001") // Default to 10A1
  const [isEditMode, setIsEditMode] = useState(false)
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setHasData(true)
      toast({
        title: "Tạo lịch thành công",
        description: "Thuật toán đã xếp 100% số tiết yêu cầu không có xung đột cứng.",
        variant: "success"
      })
    }, 2000)
  }

  const handlePublish = () => {
    setIsPublishModalOpen(false)
    toast({
      title: "Công bố Thời khóa biểu",
      description: "Đã publish TKB cho Học sinh và Giáo viên tra cứu.",
      variant: "success"
    })
  }

  // Mock slot data
  const getSlot = (day: string, period: number) => {
    if (!hasData) return null;
    if (day === "Thứ 2" && period === 1) return { subject: "Toán học", teacher: "Nguyễn Văn Toàn", room: "Phòng 101" }
    if (day === "Thứ 2" && period === 2) return { subject: "Ngữ văn", teacher: "Trần Thị Mai", room: "Phòng 101" }
    if (day === "Thứ 3" && period === 3) return { subject: "Tiếng Anh", teacher: "Phạm Thị Lan", room: "Phòng 101" }
    if (day === "Thứ 4" && period === 5) return { subject: "Thể dục", teacher: "Vũ Văn Thanh", room: "Sân tập" }
    return null;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Quản lý Thời khóa biểu" 
        description="Sinh lịch tự động, điều chỉnh thủ công và công bố thời khóa biểu." 
        action={
          <div className="flex items-center gap-2">
            {!hasData ? (
              <Button 
                className="bg-primary hover:bg-primary-dark" 
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <span className="flex items-center"><span className="animate-spin w-4 h-4 mr-2 border-2 border-white/30 border-t-white rounded-full"></span> Đang xử lý...</span>
                ) : (
                  <span className="flex items-center"><Play className="w-4 h-4 mr-2" /> Sinh lịch tự động</span>
                )}
              </Button>
            ) : (
              <>
                <Button 
                  variant={isEditMode ? "default" : "outline"}
                  onClick={() => setIsEditMode(!isEditMode)}
                >
                  {isEditMode ? (
                    <span className="flex items-center"><Save className="w-4 h-4 mr-2" /> Lưu thay đổi</span>
                  ) : (
                    <span className="flex items-center"><Edit3 className="w-4 h-4 mr-2" /> Chỉnh sửa thủ công</span>
                  )}
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={() => setIsPublishModalOpen(true)}>
                  <Share className="w-4 h-4 mr-2" /> Công bố TKB
                </Button>
              </>
            )}
          </div>
        }
      />

      {hasData && (
        <Card className="shadow-sm">
          <CardContent className="p-0">
            <div className="p-4 border-b bg-surface-hover/50 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-muted">Xem TKB của Lớp:</span>
                <Select 
                  value={classFilter}
                  onChange={(e) => setClassFilter(e.target.value)}
                  options={[
                    { label: "10A1", value: "CLS-001" },
                    { label: "10A2", value: "CLS-002" },
                    { label: "11A1", value: "CLS-003" },
                    { label: "12A1", value: "CLS-004" },
                  ]}
                />
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center text-emerald-600 font-medium">
                  <CheckCircle2 className="w-4 h-4 mr-1" /> 100% tiết đã xếp
                </span>
                <span className="flex items-center text-error font-medium">
                  <AlertTriangle className="w-4 h-4 mr-1" /> 0 Xung đột cứng
                </span>
              </div>
            </div>

            <div className="overflow-x-auto p-4">
              <table className="w-full border-collapse min-w-[800px]">
                <thead>
                  <tr>
                    <th className="border p-2 bg-muted/30 text-center w-24 text-muted font-medium text-sm">Tiết \ Ngày</th>
                    {DAYS.map(day => (
                      <th key={day} className="border p-2 bg-primary/10 text-primary font-semibold">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PERIODS.map(period => (
                    <tr key={period.id}>
                      <td className="border p-2 bg-muted/10 text-center">
                        <div className="font-bold text-heading">Tiết {period.id}</div>
                        <div className="text-xs text-muted mt-1">{period.time}</div>
                      </td>
                      {DAYS.map(day => {
                        const slot = getSlot(day, period.id)
                        return (
                          <td key={`${day}-${period.id}`} className={`border p-2 min-h-[80px] align-top transition-colors ${isEditMode ? 'hover:bg-blue-50 cursor-pointer border-dashed border-blue-200' : ''}`}>
                            {slot ? (
                              <div className="bg-surface p-2 rounded border shadow-sm h-full group relative">
                                <p className="font-bold text-sm text-heading mb-1">{slot.subject}</p>
                                <p className="text-xs text-muted">{slot.teacher}</p>
                                <p className="text-xs text-text-secondary mt-1">{slot.room}</p>
                                {isEditMode && (
                                  <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100">
                                    <Button variant="ghost" size="icon" className="h-6 w-6"><Edit3 className="w-3 h-3 text-blue-500" /></Button>
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div className="h-full flex items-center justify-center text-xs text-muted/50 p-4">
                                {isEditMode ? "Nhấp để xếp môn" : "Trống"}
                              </div>
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {!hasData && !isGenerating && (
        <Card className="border-dashed border-2 shadow-none bg-surface/50">
          <CardContent className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-heading">Chưa có Thời khóa biểu</h3>
            <p className="text-muted mt-2 max-w-md">
              Bạn chưa sinh thời khóa biểu cho học kỳ này. Hãy sử dụng công cụ sinh lịch tự động dựa trên dữ liệu phân công giảng dạy.
            </p>
            <Button className="mt-6 bg-primary hover:bg-primary-dark" onClick={handleGenerate}>
              <Play className="w-4 h-4 mr-2" /> Bắt đầu Sinh lịch
            </Button>
          </CardContent>
        </Card>
      )}

      <Modal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        title="Công bố Thời khóa biểu"
        description="Học sinh và Giáo viên sẽ bắt đầu nhận được thông báo thay đổi thời khóa biểu sau khi bạn công bố."
      >
        <div className="space-y-4">
          <div className="p-4 bg-warning/10 border border-warning/20 rounded-md">
            <p className="text-sm font-medium text-warning flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Xác nhận công bố
            </p>
            <p className="text-xs text-warning/80 mt-1">
              Bạn có chắc chắn muốn công bố bản Thời khóa biểu này? Sẽ không thể hoàn tác nếu không tạo phiên bản mới.
            </p>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsPublishModalOpen(false)}>Hủy</Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handlePublish}>Xác nhận Công bố</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
