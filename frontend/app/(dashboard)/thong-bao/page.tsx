"use client"

import { useState } from "react"
import { PageHeader } from "@/components/layout/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, Info, AlertTriangle, Calendar, CheckCircle2, X } from "lucide-react"
import { useAuth } from "@/lib/contexts/auth-context"
import { MOCK_NOTIFICATIONS } from "@/mocks/notifications"

export default function NotificationPage() {
  const { user } = useAuth()
  const role = user?.roles?.[0] as keyof typeof MOCK_NOTIFICATIONS || "STUDENT"
  const notifications = MOCK_NOTIFICATIONS[role] || MOCK_NOTIFICATIONS.STUDENT

  const [currentRole, setCurrentRole] = useState(role)
  const [localNotifications, setLocalNotifications] = useState(notifications)
  const [selectedNotification, setSelectedNotification] = useState<typeof notifications[0] | null>(null)

  if (role !== currentRole) {
    setCurrentRole(role)
    setLocalNotifications(notifications)
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "alert": return <AlertTriangle className="w-5 h-5 text-error" />
      case "info": return <Info className="w-5 h-5 text-blue-500" />
      case "calendar": return <Calendar className="w-5 h-5 text-purple-500" />
      case "success": return <CheckCircle2 className="w-5 h-5 text-emerald-500" />
      default: return <Bell className="w-5 h-5 text-muted" />
    }
  }

  const handleOpen = (notification: typeof notifications[0]) => {
    // Đánh dấu là đã đọc
    setLocalNotifications(prev => prev.map(n => n.id === notification.id ? { ...n, isRead: true } : n))
    setSelectedNotification(notification)
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <PageHeader 
        title="Trung tâm Thông báo" 
        description="Quản lý và theo dõi các thông báo mới nhất từ hệ thống." 
      />

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="flex flex-col divide-y">
            {localNotifications.map(notification => (
              <div 
                key={notification.id} 
                onClick={() => handleOpen(notification)}
                className={`p-4 flex gap-4 transition-colors hover:bg-surface-hover cursor-pointer ${notification.isRead ? 'opacity-70' : 'bg-blue-50/30'}`}
              >
                <div className="mt-1 shrink-0">
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <h4 className={`font-semibold ${notification.isRead ? 'text-heading' : 'text-blue-900'}`}>
                      {notification.title}
                    </h4>
                    <span className="text-xs text-muted whitespace-nowrap ml-4">{notification.time}</span>
                  </div>
                  <p className="text-sm text-text-secondary line-clamp-2">{notification.desc}</p>
                </div>
                {!notification.isRead && (
                  <div className="shrink-0 flex items-center justify-center w-8">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal Chi tiết thông báo */}
      {selectedNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-[500px] overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b flex justify-between items-start">
              <div className="flex gap-3">
                <div className="mt-1 shrink-0">{getIcon(selectedNotification.type)}</div>
                <div>
                   <h2 className="text-lg font-semibold text-heading">{selectedNotification.title}</h2>
                   <p className="text-xs text-muted">{selectedNotification.time}</p>
                </div>
              </div>
              <button onClick={() => setSelectedNotification(null)} className="text-muted hover:text-heading shrink-0 ml-4">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
               <p className="text-sm text-text-secondary whitespace-pre-wrap leading-relaxed">{selectedNotification.desc}</p>
            </div>
            
            <div className="px-6 py-4 bg-surface flex justify-end border-t border-border-subtle">
               <Button onClick={() => setSelectedNotification(null)} className="bg-primary hover:bg-primary-dark">Đóng</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
