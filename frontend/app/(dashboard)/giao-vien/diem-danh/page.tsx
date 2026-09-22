"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/layout/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode, RefreshCw, Users, CheckCircle2, Clock } from "lucide-react"

export default function TeacherAttendanceQRPage() {
  const [timeLeft, setTimeLeft] = useState(15)
  const [qrKey, setQrKey] = useState(0)
  const [scannedCount, setScannedCount] = useState(0)

  // Countdown timer for QR refresh
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Refresh QR code
          setQrKey((k) => k + 1)
          return 15 // Reset to 15 seconds
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Simulate students scanning over time
  useEffect(() => {
    const scanTimer = setInterval(() => {
      setScannedCount((prev) => {
        if (prev < 40) return prev + 1
        return prev
      })
    }, 3000)
    return () => clearInterval(scanTimer)
  }, [])

  const handleManualRefresh = () => {
    setQrKey(k => k + 1)
    setTimeLeft(15)
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <PageHeader 
        title="Mã QR Điểm danh" 
        description="Lớp 10A1 - Môn Toán Đại Số. Yêu cầu học sinh sử dụng ứng dụng EduMS để quét mã này." 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: QR Code Area */}
        <Card className="col-span-1 lg:col-span-2 shadow-lg border-2 border-primary/20">
          <CardContent className="p-8 flex flex-col items-center justify-center min-h-[500px]">
            <h2 className="text-2xl font-bold text-heading mb-6">Mã điểm danh động</h2>
            
            <div className="relative bg-white p-8 rounded-2xl shadow-xl border border-slate-100 animate-in zoom-in-95 duration-300" key={qrKey}>
              {/* Fake QR pattern for display purposes */}
              <div className="w-64 h-64 border-4 border-black p-4 flex flex-col justify-between">
                <div className="flex justify-between">
                   <div className="w-12 h-12 border-[8px] border-black"></div>
                   <div className="w-12 h-12 bg-black"></div>
                   <div className="w-12 h-12 border-[8px] border-black"></div>
                </div>
                <div className="flex justify-center my-4">
                  <QrCode className="w-24 h-24 text-black opacity-30" />
                </div>
                <div className="flex justify-between">
                   <div className="w-12 h-12 border-[8px] border-black"></div>
                   <div className="w-12 h-12 bg-black"></div>
                   <div className="w-8 h-8 bg-black"></div>
                </div>
              </div>
              
              {/* Scanning line animation */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                 <div className="w-full h-1 bg-emerald-400 opacity-50 animate-scan"></div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4 bg-surface-hover px-6 py-3 rounded-full">
              <Clock className="w-5 h-5 text-primary" />
              <div className="flex flex-col items-start min-w-[200px]">
                <span className="text-sm text-muted font-medium">Mã sẽ tự làm mới sau:</span>
                <div className="w-full bg-slate-200 h-2 rounded-full mt-2 overflow-hidden">
                   <div 
                     className="bg-primary h-full transition-all duration-1000 ease-linear" 
                     style={{ width: `${(timeLeft / 15) * 100}%` }}
                   ></div>
                </div>
              </div>
              <span className="text-2xl font-bold text-primary w-8 text-right">{timeLeft}s</span>
            </div>
            
            <Button variant="outline" className="mt-6 gap-2" onClick={handleManualRefresh}>
              <RefreshCw className="w-4 h-4" /> Làm mới ngay
            </Button>
          </CardContent>
        </Card>

        {/* Right Side: Status Area */}
        <div className="col-span-1 space-y-6">
          <Card className="shadow-sm">
            <CardHeader className="pb-3 border-b border-border-subtle">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Trạng thái</span>
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold">
                  {scannedCount} / 40
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4 mb-6 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center shrink-0">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-emerald-700 font-medium">Đã điểm danh</p>
                  <p className="text-2xl font-bold text-emerald-900">{scannedCount} <span className="text-base font-normal">học sinh</span></p>
                </div>
              </div>

              <h4 className="text-sm font-semibold text-muted mb-4 uppercase">Lịch sử quét mã gần đây</h4>
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {Array.from({ length: scannedCount }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-heading">Học sinh {i + 1}</p>
                        <p className="text-xs text-muted">Mã HS: HS{1000 + i}</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Có mặt</span>
                  </div>
                )).reverse()}
                
                {scannedCount === 0 && (
                  <div className="text-center py-8 text-muted text-sm">
                    Chưa có học sinh nào quét mã.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
