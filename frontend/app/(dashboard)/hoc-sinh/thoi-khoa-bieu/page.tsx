"use client"

import { useState } from "react"

import { PageHeader } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Select } from "@/components/ui/select"
import { Calendar } from "lucide-react"

const DAYS = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"]
const PERIODS = [
  { id: 1, time: "07:15 - 08:00" },
  { id: 2, time: "08:05 - 08:50" },
  { id: 3, time: "09:00 - 09:45" },
  { id: 4, time: "09:50 - 10:35" },
  { id: 5, time: "10:40 - 11:25" },
]

export default function StudentTimetablePage() {
  const [selectedWeek, setSelectedWeek] = useState("week3")
  
  const getSlot = (day: string, period: number) => {
    if (day === "Thứ 2" && period === 1) return { subject: "Toán học", teacher: "Nguyễn Văn Toàn", room: "Phòng 101" }
    if (day === "Thứ 2" && period === 2) return { subject: "Ngữ văn", teacher: "Trần Thị Mai", room: "Phòng 101" }
    if (day === "Thứ 3" && period === 3) return { subject: "Tiếng Anh", teacher: "Phạm Thị Lan", room: "Phòng 101" }
    if (day === "Thứ 4" && period === 5) return { subject: "Thể dục", teacher: "Vũ Văn Thanh", room: "Sân tập" }
    return null;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Thời khóa biểu của tôi" 
        description="Xem thời khóa biểu lớp học theo tuần." 
      />

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="p-4 border-b bg-surface-hover/50 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-3 text-primary font-medium">
              <Calendar className="w-5 h-5" /> 
              <Select 
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
                options={[
                  { label: "Tuần 1 (01/09 - 07/09/2026)", value: "week1" },
                  { label: "Tuần 2 (08/09 - 14/09/2026)", value: "week2" },
                  { label: "Tuần 3 (15/09 - 21/09/2026)", value: "week3" },
                  { label: "Tuần 4 (22/09 - 28/09/2026)", value: "week4" },
                ]}
              />
            </div>
            <div className="text-sm text-muted">
              Lớp: <span className="font-bold text-heading">10A1</span>
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
                        <td key={`${day}-${period.id}`} className="border p-2 min-h-[80px] align-top transition-colors hover:bg-surface-hover">
                          {slot ? (
                            <div className="bg-blue-50 p-2 rounded border border-blue-200 shadow-sm h-full relative border-l-4 border-l-blue-500">
                              <p className="font-bold text-sm text-blue-800 mb-1">{slot.subject}</p>
                              <p className="text-xs text-heading font-medium">{slot.teacher}</p>
                              <p className="text-xs text-text-secondary mt-1">{slot.room}</p>
                            </div>
                          ) : (
                            <div className="h-full flex items-center justify-center text-xs text-muted/30 p-4">
                              Trống
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
    </div>
  )
}
