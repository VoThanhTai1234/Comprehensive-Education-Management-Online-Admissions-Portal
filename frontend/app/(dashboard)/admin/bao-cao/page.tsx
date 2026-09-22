"use client"

import { PageHeader } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, School, GraduationCap, TrendingUp, CalendarDays } from "lucide-react"

export default function AcademicReportPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Báo cáo cơ bản" 
        description="Tổng quan số liệu thống kê về Đào tạo và Học vụ." 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="shadow-sm border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-500" /> Tổng Học sinh
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-heading">1,250</div>
            <p className="text-xs text-muted mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-500" /> +5% so với năm ngoái
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-l-4 border-l-emerald-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-emerald-500" /> Tổng Giáo viên
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-heading">85</div>
            <p className="text-xs text-muted mt-1">Đang công tác</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted flex items-center gap-2">
              <School className="w-4 h-4 text-purple-500" /> Tổng Lớp học
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-heading">32</div>
            <p className="text-xs text-muted mt-1">Sĩ số trung bình: 39</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-l-4 border-l-amber-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-amber-500" /> Tiết học/Tuần
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-heading">1,024</div>
            <p className="text-xs text-muted mt-1">100% đã xếp thời khóa biểu</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-heading">
              <BarChart3 className="w-5 h-5 text-primary" /> Phân bổ học sinh theo khối
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-heading">Khối 10</span>
                  <span className="text-muted">450 học sinh (36%)</span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '36%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-heading">Khối 11</span>
                  <span className="text-muted">420 học sinh (33.6%)</span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '33.6%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-heading">Khối 12</span>
                  <span className="text-muted">380 học sinh (30.4%)</span>
                </div>
                <div className="w-full bg-muted/20 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '30.4%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-heading">
              <BarChart3 className="w-5 h-5 text-primary" /> Tỷ lệ Chuyên cần tuần qua
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-40">
              <div className="relative w-32 h-32 rounded-full border-8 border-emerald-500 border-l-warning flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-heading">98%</div>
                  <div className="text-xs text-muted">Có mặt</div>
                </div>
              </div>
            </div>
            <div className="flex justify-center gap-4 mt-4 text-sm">
              <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Có mặt</div>
              <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-warning"></span> Đi trễ/Vắng phép</div>
              <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-error"></span> Vắng không phép</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
