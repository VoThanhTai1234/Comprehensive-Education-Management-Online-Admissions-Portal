"use client"

import { PageHeader } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Users, School, BookOpen, ChevronRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

const MOCK_MY_CLASSES = [
  { id: "CLS-001", name: "10A1", subject: "Toán học", role: "Giáo viên bộ môn", periods: 4, students: 35, status: "Đang giảng dạy" },
  { id: "CLS-002", name: "10A2", subject: "Toán học", role: "Giáo viên chủ nhiệm", periods: 4, students: 38, status: "Đang giảng dạy" },
]

export default function MyClassesPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Lớp phụ trách" 
        description="Danh sách các lớp học được phân công giảng dạy hoặc làm chủ nhiệm." 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_MY_CLASSES.map((cls) => (
          <Link href={`/giao-vien/lop/${cls.id}`} key={cls.id}>
            <Card className="shadow-sm hover:shadow-md hover:border-primary/50 transition-all cursor-pointer h-full border-l-4 border-l-primary group">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <School className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold text-heading group-hover:text-primary transition-colors">{cls.name}</h3>
                  </div>
                  {cls.role === "Giáo viên chủ nhiệm" && (
                    <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">GVCN</Badge>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <BookOpen className="w-4 h-4 text-muted" /> Môn: <span className="font-medium text-heading">{cls.subject}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <Users className="w-4 h-4 text-muted" /> Sĩ số: <span className="font-medium text-heading">{cls.students} học sinh</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Trạng thái: <span className="text-emerald-600 font-medium">{cls.status}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t flex items-center justify-between text-sm text-primary font-medium">
                  Xem chi tiết Điểm & Chuyên cần
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
