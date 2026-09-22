"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/toaster"
import { Save, CheckCircle2, Search } from "lucide-react"

// Mock students for 11B2
const MOCK_STUDENTS = [
  { id: "HS1101", name: "Nguyễn Văn An", score: "" },
  { id: "HS1102", name: "Trần Thị Bình", score: "8.5" },
  { id: "HS1103", name: "Lê Hoàng Cường", score: "" },
  { id: "HS1104", name: "Phạm Thu Dung", score: "9.0" },
  { id: "HS1105", name: "Hoàng Ngọc Duy", score: "" },
  { id: "HS1106", name: "Đinh Xuân Giang", score: "" },
  { id: "HS1107", name: "Vũ Hải Hằng", score: "" },
  { id: "HS1108", name: "Bùi Tuấn Kiệt", score: "" },
]

export default function QuickGradingPage() {
  const { toast } = useToast()
  const [students, setStudents] = useState(MOCK_STUDENTS)
  const [searchTerm, setSearchTerm] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const handleScoreChange = (id: string, value: string) => {
    // Only allow numbers and one decimal point, max 10
    if (value !== "" && (isNaN(Number(value)) || Number(value) > 10 || Number(value) < 0)) return;
    
    setStudents(prev => prev.map(s => 
      s.id === id ? { ...s, score: value } : s
    ))
  }

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Lưu điểm thành công",
        description: "Đã cập nhật điểm Bài kiểm tra 15p cho lớp 11B2.",
        variant: "success",
      })
    }, 800)
  }

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const completedCount = students.filter(s => s.score !== "").length

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <PageHeader 
        title="Nhập điểm nhanh" 
        description="Bài kiểm tra 15p • Lớp 11B2 • Môn Toán Đại Số" 
        action={
          <Button onClick={handleSave} disabled={isSaving} className="bg-emerald-600 hover:bg-emerald-700">
            {isSaving ? "Đang lưu..." : <><Save className="w-4 h-4 mr-2" /> Lưu bảng điểm</>}
          </Button>
        }
      />

      <Card className="shadow-sm">
        <CardContent className="p-0">
          {/* Toolbar */}
          <div className="p-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-hover/30">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input 
                type="text" 
                placeholder="Tìm học sinh theo tên hoặc mã..." 
                className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted">Tiến độ nhập:</span>
              <span className={`font-bold ${completedCount === students.length ? 'text-emerald-600' : 'text-primary'}`}>
                {completedCount} / {students.length}
              </span>
              {completedCount === students.length && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-surface-hover border-b border-border text-muted">
                  <th className="font-semibold p-4 w-16 text-center">STT</th>
                  <th className="font-semibold p-4 w-32">Mã HS</th>
                  <th className="font-semibold p-4">Họ và Tên</th>
                  <th className="font-semibold p-4 w-48 text-right">Điểm (Hệ số 1)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student, index) => (
                    <tr key={student.id} className="hover:bg-surface-hover/50 transition-colors group">
                      <td className="p-4 text-center text-muted font-medium">{index + 1}</td>
                      <td className="p-4 font-mono text-muted">{student.id}</td>
                      <td className="p-4 font-semibold text-heading">{student.name}</td>
                      <td className="p-4 flex justify-end">
                        <input
                          type="text"
                          inputMode="decimal"
                          value={student.score}
                          onChange={(e) => handleScoreChange(student.id, e.target.value)}
                          placeholder="—"
                          className={`w-20 text-center font-bold px-3 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ${
                            student.score !== "" 
                              ? Number(student.score) < 5 ? "border-error/50 text-error bg-error/5" : "border-emerald-200 text-emerald-700 bg-emerald-50"
                              : "border-border text-heading bg-surface"
                          }`}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-muted">
                      Không tìm thấy học sinh nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
