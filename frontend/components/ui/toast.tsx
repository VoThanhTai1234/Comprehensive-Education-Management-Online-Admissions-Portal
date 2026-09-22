"use client"

import * as React from "react"
import { cn } from "@/lib/cn"
import { cva, type VariantProps } from "class-variance-authority"
import { X, CheckCircle, AlertCircle, Info, XCircle } from "lucide-react"

const toastVariants = cva(
  "pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive:
          "destructive group border-destructive bg-destructive/10 text-destructive",
        success: "border-success bg-success/10 text-emerald-800 border",
        warning: "border-warning bg-warning/10 text-amber-800 border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export type ToastProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof toastVariants> & {
  title?: React.ReactNode
  description?: React.ReactNode
  onClose?: () => void
}

export function Toast({ className, variant, title, description, onClose, ...props }: ToastProps) {
  let Icon = Info
  if (variant === "success") Icon = CheckCircle
  if (variant === "destructive") Icon = XCircle
  if (variant === "warning") Icon = AlertCircle

  return (
    <div className={cn(toastVariants({ variant }), className)} {...props}>
      <div className="flex gap-3 items-start">
        <Icon className={cn("h-5 w-5 mt-0.5", 
          variant === 'default' && 'text-primary',
          variant === 'success' && 'text-success',
          variant === 'warning' && 'text-warning',
          variant === 'destructive' && 'text-destructive-foreground'
        )} />
        <div className="grid gap-1">
          {title && <div className="text-sm font-semibold">{title}</div>}
          {description && <div className="text-sm opacity-90">{description}</div>}
        </div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
