"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { useToast } from "@/components/ui/toaster"
import { ChevronUp, ChevronDown, Trash2, Plus, Send, ChevronLeft } from "lucide-react"
import Link from "next/link"

interface Preference {
  id: string;
  major: string;
  order: number;
}

export default function PreferenceOrderingPage() {
  const { toast } = useToast()
  const [selectedMajor, setSelectedMajor] = useState("phys")
  const [preferences, setPreferences] = useState<Preference[]>([
    { id: "nv1", major: "Lớp Chuyên Toán", order: 1 },
    { id: "nv2", major: "Lớp Chuyên Tin", order: 2 },
    { id: "nv3", major: "Lớp Căn bản khối A", order: 3 },
  ])

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newPrefs = [...preferences];
    [newPrefs[index - 1], newPrefs[index]] = [newPrefs[index], newPrefs[index - 1]];
    // Update order property
    newPrefs.forEach((p, i) => p.order = i + 1);
    setPreferences(newPrefs);
  }

  const moveDown = (index: number) => {
    if (index === preferences.length - 1) return;
    const newPrefs = [...preferences];
    [newPrefs[index + 1], newPrefs[index]] = [newPrefs[index], newPrefs[index + 1]];
    // Update order property
    newPrefs.forEach((p, i) => p.order = i + 1);
    setPreferences(newPrefs);
  }

  const removePref = (index: number) => {
    const newPrefs = preferences.filter((_, i) => i !== index);
    newPrefs.forEach((p, i) => p.order = i + 1);
    setPreferences(newPrefs);
  }

  const addPref = () => {
    const majorMap: Record<string, string> = {
      "phys": "Lớp Chuyên Vật Lý",
      "chem": "Lớp Chuyên Hóa Học",
      "bio": "Lớp Chuyên Sinh Học",
      "basic-d": "Lớp Căn bản khối D"
    }
    const majorName = majorMap[selectedMajor]
    if (preferences.find(p => p.major === majorName)) {
      toast({
        title: "Trùng lặp nguyện vọng",
        description: "Nguyện vọng này đã tồn tại trong danh sách.",
        variant: "warning"
      })
      return
    }

    setPreferences(prev => [
      ...prev,
      {
        id: `nv_${Date.now()}`,
        major: majorName,
        order: prev.length + 1
      }
    ])
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      <PageHeader 
        title="Nguyện vọng Xét tuyển" 
        description="Đăng ký và sắp xếp thứ tự ưu tiên các nguyện vọng lớp/chương trình học." 
      />

      <div className="flex items-center justify-between p-4 bg-primary-soft text-primary-hover rounded-xl border border-primary/20">
        <div>
          <h3 className="font-semibold">Bước 3: Đăng ký nguyện vọng</h3>
          <p className="text-sm opacity-90 mt-1">Hệ thống sẽ xét tuyển theo thứ tự ưu tiên từ trên xuống dưới (Nguyện vọng 1 là cao nhất).</p>
        </div>
        <div className="hidden sm:flex gap-2 items-center text-sm font-medium">
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-surface text-primary border border-primary/30">1</span>
          <div className="w-8 h-px bg-primary/30" />
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-surface text-primary border border-primary/30">2</span>
          <div className="w-8 h-px bg-primary/30" />
          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white">3</span>
        </div>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-end bg-surface-hover/50 p-4 rounded-lg border border-border">
            <div className="flex-1 space-y-2 w-full">
              <label className="text-sm font-medium text-heading">Chọn chương trình học</label>
              <Select 
                value={selectedMajor}
                onChange={(e) => setSelectedMajor(e.target.value)}
                options={[
                  { label: "Lớp Chuyên Vật Lý", value: "phys" },
                  { label: "Lớp Chuyên Hóa Học", value: "chem" },
                  { label: "Lớp Chuyên Sinh Học", value: "bio" },
                  { label: "Lớp Căn bản khối D", value: "basic-d" },
                ]}
              />
            </div>
            <Button type="button" className="w-full sm:w-auto" onClick={addPref}>
              <Plus className="w-4 h-4 mr-2" /> Thêm nguyện vọng
            </Button>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-heading">Danh sách nguyện vọng đã chọn</h4>
            {preferences.map((pref, index) => (
              <div 
                key={pref.id} 
                className="flex items-center justify-between p-3 bg-surface rounded-lg border border-border shadow-sm group hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    {pref.order}
                  </div>
                  <div>
                    <p className="text-sm text-muted mb-0.5">Nguyện vọng {pref.order}</p>
                    <p className="font-semibold text-heading">{pref.major}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1">
                  <div className="flex flex-col sm:flex-row gap-1 border-r border-border pr-2 mr-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted hover:text-primary disabled:opacity-30"
                      onClick={() => moveUp(index)}
                      disabled={index === 0}
                    >
                      <ChevronUp className="w-5 h-5" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted hover:text-primary disabled:opacity-30"
                      onClick={() => moveDown(index)}
                      disabled={index === preferences.length - 1}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </Button>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-muted hover:text-error hover:bg-error/10"
                    onClick={() => removePref(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}

            {preferences.length === 0 && (
              <div className="p-8 text-center border border-dashed rounded-lg bg-surface-hover/30">
                <p className="text-muted">Chưa có nguyện vọng nào được chọn.</p>
              </div>
            )}
          </div>
          
          <div className="p-4 bg-amber-50 text-amber-800 rounded-lg border border-amber-200 text-sm">
            <strong>Lưu ý:</strong> Bạn cần chắc chắn thứ tự ưu tiên đã chính xác trước khi nộp hồ sơ. Hồ sơ sau khi nộp sẽ không thể thay đổi nguyện vọng.
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between gap-4 pt-4 border-t">
        <Link href="/ung-vien/ho-so/minh-chung">
          <Button variant="outline" type="button">
            <ChevronLeft className="w-4 h-4 mr-2" /> Quay lại Bước 2
          </Button>
        </Link>
        <Link href="/ung-vien/ket-qua">
          <Button type="button" className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => toast({
            title: "Nộp hồ sơ thành công!",
            description: "Hồ sơ của bạn đã được gửi đến ban tuyển sinh.",
            variant: "success"
          })}>
            Hoàn tất & Nộp hồ sơ <Send className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
