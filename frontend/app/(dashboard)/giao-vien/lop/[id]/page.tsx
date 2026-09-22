"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/toaster"
import { Save, QrCode, Play, Users, CheckCircle2, AlertTriangle, FileSpreadsheet } from "lucide-react"
import { MOCK_STUDENT_GRADES, MOCK_GRADE_COMPONENTS } from "@/mocks/grades"
import { MOCK_ATTENDANCE_SESSIONS, MOCK_ATTENDANCE_RECORDS } from "@/mocks/attendance"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export default function ClassDetailPage() {
  const { toast } = useToast()
  
  // Grade state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [grades, setGrades] = useState<any[]>(MOCK_STUDENT_GRADES)
  
  // Attendance state
  const [activeSession, setActiveSession] = useState(MOCK_ATTENDANCE_SESSIONS[0])
  const [isQrVisible, setIsQrVisible] = useState(false)
  const [attendanceRecords] = useState(MOCK_ATTENDANCE_RECORDS)

  const handleSaveGrades = () => {
    toast({
      title: "Lưu sổ điểm thành công",
      description: "Tất cả thay đổi điểm số và nhận xét đã được cập nhật.",
      variant: "success"
    })
  }

  const handleToggleSession = () => {
    if (activeSession.status === "Đang mở") {
      setActiveSession({ ...activeSession, status: "Đã chốt" })
      setIsQrVisible(false)
      toast({ title: "Chốt phiên điểm danh", description: "Đã chốt danh sách và ghi nhận học sinh vắng." })
    } else {
      setActiveSession({ ...activeSession, status: "Đang mở" })
      toast({ title: "Mở phiên điểm danh", description: "Học sinh có thể bắt đầu quét mã QR." })
    }
  }

  const handleGradeChange = (studentId: string, compId: string, value: string) => {
    setGrades(prev => prev.map(s => {
      if (s.studentId === studentId) {
        const parsedValue = value === "" ? null : parseFloat(value);
        return { ...s, grades: { ...s.grades, [compId]: parsedValue } }
      }
      return s
    }))
  }

  const handleCommentChange = (studentId: string, value: string) => {
    setGrades(prev => prev.map(s => {
      if (s.studentId === studentId) {
        return { ...s, comment: value }
      }
      return s
    }))
  }

  const getAttendanceBadge = (status: string) => {
    if (status === "PRESENT") return <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none">Có mặt</Badge>
    if (status === "ABSENT_EXCUSED") return <Badge variant="outline" className="text-warning border-warning bg-warning/10">Vắng (P)</Badge>
    if (status === "ABSENT_UNEXCUSED") return <Badge variant="outline" className="text-error border-error bg-error/10">Vắng (KP)</Badge>
    if (status === "LATE") return <Badge variant="outline" className="text-amber-500 border-amber-500 bg-amber-500/10">Đi trễ</Badge>
    return <Badge variant="outline">Chưa điểm danh</Badge>
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title={`Lớp 10A1 - Toán học`} 
        description="Quản lý điểm số, nhận xét và điểm danh chuyên cần."
      />

      <Tabs defaultValue="grades" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="grades" className="flex items-center gap-2"><FileSpreadsheet className="w-4 h-4" /> Sổ điểm</TabsTrigger>
          <TabsTrigger value="comments" className="flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> Nhận xét</TabsTrigger>
          <TabsTrigger value="attendance" className="flex items-center gap-2"><QrCode className="w-4 h-4" /> Điểm danh QR</TabsTrigger>
        </TabsList>

        {/* TAB SỔ ĐIỂM */}
        <TabsContent value="grades" className="space-y-4">
          <Card className="shadow-sm border-t-4 border-t-primary">
            <CardContent className="p-0">
              <div className="p-4 border-b bg-surface-hover/50 flex justify-between items-center">
                <div className="text-sm text-muted">Môn học: <span className="font-bold text-heading">Toán học (Học kỳ 1)</span></div>
                <Button className="bg-primary hover:bg-primary-dark" onClick={handleSaveGrades}>
                  <Save className="w-4 h-4 mr-2" /> Lưu Sổ điểm
                </Button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead className="w-[100px]">Mã HS</TableHead>
                      <TableHead className="min-w-[150px]">Họ và tên</TableHead>
                      {MOCK_GRADE_COMPONENTS.map(gc => (
                        <TableHead key={gc.id} className="text-center w-[120px]">
                          <div className="flex flex-col items-center">
                            <span>{gc.name}</span>
                            <span className="text-xs text-muted font-normal">HS: {gc.weight}</span>
                          </div>
                        </TableHead>
                      ))}
                      <TableHead className="text-center bg-blue-50/50">TBM</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {grades.map((student) => {
                      let totalWeight = 0;
                      let totalScore = 0;
                      MOCK_GRADE_COMPONENTS.forEach(gc => {
                        const score = student.grades[gc.id as keyof typeof student.grades];
                        if (score !== null && score !== undefined) {
                          totalScore += score * gc.weight;
                          totalWeight += gc.weight;
                        }
                      });
                      const average = totalWeight > 0 ? (totalScore / totalWeight).toFixed(1) : "-";

                      return (
                        <TableRow key={student.studentId} className="hover:bg-surface-hover/50">
                          <TableCell className="font-mono text-sm text-muted">{student.studentCode}</TableCell>
                          <TableCell className="font-semibold text-heading">{student.name}</TableCell>
                          {MOCK_GRADE_COMPONENTS.map(gc => (
                            <TableCell key={gc.id} className="text-center">
                              <Input 
                                type="number" 
                                min={0} max={10} step={0.1}
                                className="w-20 text-center mx-auto"
                                value={student.grades[gc.id as keyof typeof student.grades] || ""}
                                onChange={(e) => handleGradeChange(student.studentId, gc.id, e.target.value)}
                              />
                            </TableCell>
                          ))}
                          <TableCell className="text-center font-bold text-blue-700 bg-blue-50/30">
                            {average}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB NHẬN XÉT */}
        <TabsContent value="comments" className="space-y-4">
          <Card className="shadow-sm border-t-4 border-t-amber-500">
            <CardContent className="p-0">
              <div className="p-4 border-b bg-amber-50/50 flex justify-between items-center">
                <div className="text-sm text-amber-800 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> Nhận xét quá trình học tập định kỳ
                </div>
                <Button className="bg-amber-600 hover:bg-amber-700" onClick={handleSaveGrades}>
                  <Save className="w-4 h-4 mr-2" /> Lưu Nhận xét
                </Button>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead className="w-[200px]">Học sinh</TableHead>
                      <TableHead>Nội dung nhận xét</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {grades.map((student) => (
                      <TableRow key={student.studentId} className="hover:bg-surface-hover/50">
                        <TableCell>
                          <div className="font-semibold text-heading">{student.name}</div>
                          <div className="text-xs text-muted font-mono">{student.studentCode}</div>
                        </TableCell>
                        <TableCell>
                          <Input 
                            value={student.comment}
                            onChange={(e) => handleCommentChange(student.studentId, e.target.value)}
                            placeholder="Nhập nhận xét cho học sinh..."
                            className="w-full"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB ĐIỂM DANH */}
        <TabsContent value="attendance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-1 shadow-sm border-t-4 border-t-emerald-500">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <QrCode className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg text-heading">Trình chiếu QR Điểm danh</h3>
                <p className="text-sm text-muted">Mở phiên điểm danh để hiển thị mã QR lên máy chiếu. Học sinh quét mã bằng điện thoại để ghi nhận Có mặt.</p>
                
                {activeSession.status === "Đang mở" && isQrVisible && (
                  <div className="bg-white p-4 inline-block border-2 border-emerald-500 rounded-lg mx-auto">
                    {/* Giả lập ảnh QR tĩnh */}
                    <Image src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=EDUMS_ATTEND_${activeSession.id}`} alt="QR Code" width={192} height={192} unoptimized className="w-48 h-48" />
                  </div>
                )}

                <div className="pt-4 flex flex-col gap-2">
                  {activeSession.status === "Đang mở" ? (
                    <>
                      <Button variant="outline" className="w-full" onClick={() => setIsQrVisible(!isQrVisible)}>
                        {isQrVisible ? "Ẩn mã QR" : "Hiện mã QR lên máy chiếu"}
                      </Button>
                      <Button variant="destructive" className="w-full" onClick={handleToggleSession}>
                        Chốt phiên điểm danh
                      </Button>
                    </>
                  ) : (
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={handleToggleSession}>
                      <Play className="w-4 h-4 mr-2" /> Mở phiên điểm danh mới
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2 shadow-sm">
              <CardContent className="p-0">
                <div className="p-4 border-b bg-surface-hover/50 flex justify-between items-center">
                  <div>
                    <div className="font-bold text-heading">Danh sách Lớp</div>
                    <div className="text-xs text-muted flex items-center gap-1 mt-1">
                      Trạng thái phiên: {activeSession.status === "Đang mở" ? (
                        <span className="text-emerald-500 font-medium flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Đang điểm danh</span>
                      ) : (
                        <span className="text-error font-medium">Đã chốt</span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm font-medium">
                    <div className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> {activeSession.presentCount} Có mặt</div>
                    <div className="text-error flex items-center gap-1"><Users className="w-4 h-4" /> {activeSession.absentCount} Vắng</div>
                  </div>
                </div>
                
                <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                  <Table>
                    <TableHeader className="sticky top-0 bg-surface z-10">
                      <TableRow>
                        <TableHead>Học sinh</TableHead>
                        <TableHead>Giờ quét QR</TableHead>
                        <TableHead className="text-right">Trạng thái</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {attendanceRecords.map((record) => (
                        <TableRow key={record.studentId}>
                          <TableCell>
                            <div className="font-semibold text-heading">{record.name}</div>
                            <div className="text-xs text-muted font-mono">{record.studentCode}</div>
                          </TableCell>
                          <TableCell className="text-text-secondary">{record.time || "-"}</TableCell>
                          <TableCell className="text-right">
                            {getAttendanceBadge(record.status)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
