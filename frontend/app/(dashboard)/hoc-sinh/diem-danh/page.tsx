"use client"

import { useState, useEffect, useRef } from "react"
import { PageHeader } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/toaster"
import { QrCode, ScanLine, CheckCircle2, AlertTriangle, Camera } from "lucide-react"

export default function StudentQRScanPage() {
  const { toast } = useToast()
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<"success" | "error" | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    let stream: MediaStream | null = null;
    
    // Yêu cầu quyền truy cập Camera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(s => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = s;
            // autoPlay attribute on <video> handles playing automatically without causing AbortError
          }
        })
        .catch(err => {
          console.error("Camera access denied or error:", err);
        });
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleSimulateScanSuccess = () => {
    setIsScanning(true)
    setScanResult(null)
    
    // Giả lập quét mất 1.5s
    setTimeout(() => {
      setIsScanning(false)
      setScanResult("success")
      toast({
        title: "Điểm danh thành công",
        description: "Bạn đã được ghi nhận CÓ MẶT vào lúc 07:12 AM.",
        variant: "success"
      })
    }, 1500)
  }

  const handleSimulateScanError = () => {
    setIsScanning(true)
    setScanResult(null)
    
    // Giả lập quét mất 1s
    setTimeout(() => {
      setIsScanning(false)
      setScanResult("error")
      toast({
        title: "Lỗi quét mã",
        description: "Mã QR đã hết hạn hoặc không hợp lệ. Vui lòng quét mã mới trên bảng.",
        variant: "destructive"
      })
    }, 1000)
  }

  const resetScanner = () => {
    setScanResult(null)
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-md mx-auto">
      <PageHeader 
        title="Quét QR Điểm danh" 
        description="Hướng camera vào mã QR hiển thị trên màn hình giáo viên." 
      />

      <Card className="shadow-lg border-2 border-primary/20 overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-slate-900 h-[450px] sm:h-[500px] w-full relative flex flex-col items-center justify-center overflow-hidden">
            
            {/* Real Camera Stream */}
            <video 
              ref={videoRef}
              autoPlay 
              playsInline 
              muted 
              className="absolute inset-0 w-full h-full object-cover z-0 opacity-80"
            />
            
            {/* Camera Viewfinder Overlay */}
            {!scanResult && (
              <>
                {/* Thick borders to simulate darkened surroundings instead of giant shadow */}
                <div className="absolute inset-0 border-[60px] sm:border-[80px] border-black/60 z-10 pointer-events-none"></div>
                
                <div className="relative w-64 h-64 border-2 border-white/50 rounded-xl z-20 flex items-center justify-center pointer-events-none">
                  {/* Scanner line animation */}
                  {isScanning ? (
                    <div className="w-full h-1 bg-emerald-400 absolute top-0 animate-scan shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                  ) : (
                    <ScanLine className="w-12 h-12 text-white/50" />
                  )}
                  {/* Viewfinder corners */}
                  <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
                  <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
                  <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
                </div>
                
                <div className="absolute bottom-6 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                  <Camera className="w-4 h-4" /> Đang tìm mã QR...
                </div>
              </>
            )}

            {/* Success Result */}
            {scanResult === "success" && (
              <div className="absolute inset-0 bg-emerald-600/90 z-30 flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-xl">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Điểm danh thành công!</h3>
                <p className="text-emerald-50 mb-8">Hệ thống đã ghi nhận sự có mặt của bạn lúc 07:12 AM.</p>
                <Button variant="secondary" size="lg" className="w-full font-bold" onClick={resetScanner}>
                  Đóng
                </Button>
              </div>
            )}

            {/* Error Result */}
            {scanResult === "error" && (
              <div className="absolute inset-0 bg-slate-900/95 z-30 flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-300 border-4 border-error">
                <div className="w-20 h-20 bg-error/20 rounded-full flex items-center justify-center mb-6">
                  <AlertTriangle className="w-10 h-10 text-error" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Mã QR không hợp lệ</h3>
                <p className="text-slate-400 mb-8">Có thể mã đã hết hạn do giáo viên đã refresh mã mới. Vui lòng quét lại mã trên bảng.</p>
                <Button className="w-full bg-error hover:bg-error/90 font-bold" onClick={resetScanner}>
                  Quét lại mã mới
                </Button>
              </div>
            )}

          </div>

          {/* Dev Mock Actions */}
          <div className="p-4 bg-surface-hover/50 border-t">
            <p className="text-xs font-semibold text-muted uppercase mb-3 flex items-center gap-1">
              <QrCode className="w-3 h-3" /> Trình giả lập quét QR
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1 border-emerald-200 hover:bg-emerald-50 text-emerald-700"
                onClick={handleSimulateScanSuccess}
                disabled={isScanning || scanResult !== null}
              >
                Giả lập Thành công
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-red-200 hover:bg-red-50 text-red-700"
                onClick={handleSimulateScanError}
                disabled={isScanning || scanResult !== null}
              >
                Giả lập Hết hạn
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
