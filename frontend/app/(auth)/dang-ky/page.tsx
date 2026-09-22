"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { CheckCircle2, ChevronLeft, AlertCircle, Loader2 } from "lucide-react"

export default function RegisterPage() {
  const [step, setStep] = React.useState(1)
  
  // Form State
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [fullname, setFullname] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [dob, setDob] = React.useState("")
  const [terms, setTerms] = React.useState(false)
  
  // UI State
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = React.useState(false)
  const [submitError, setSubmitError] = React.useState("")

  // Validation functions
  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
  const isValidPhone = (p: string) => /^(0[3|5|7|8|9])+([0-9]{8})$/.test(p.trim()) // Basic VN phone validation
  
  const getPasswordScore = (pass: string) => {
    let score = 0
    if (pass.length === 0) return 0
    if (pass.length >= 8) score += 1
    if (/[A-Z]/.test(pass)) score += 1
    if (/[a-z]/.test(pass)) score += 1
    if (/[0-9]/.test(pass)) score += 1
    if (/[^A-Za-z0-9]/.test(pass)) score += 1
    return score
  }

  const score = getPasswordScore(password)

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {}
    
    if (!email.trim()) newErrors.email = "Vui lòng nhập email."
    else if (!isValidEmail(email.trim())) newErrors.email = "Email không đúng định dạng."
    
    if (!password) newErrors.password = "Vui lòng nhập mật khẩu."
    else if (score < 5) newErrors.password = "Mật khẩu chưa đạt đủ các điều kiện bảo mật."
    
    if (!confirmPassword) newErrors.confirmPassword = "Vui lòng xác nhận mật khẩu."
    else if (password !== confirmPassword) newErrors.confirmPassword = "Mật khẩu xác nhận không khớp."

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {}
    
    if (!fullname.trim()) newErrors.fullname = "Vui lòng nhập họ và tên."
    else if (fullname.trim().length < 2) newErrors.fullname = "Họ và tên phải có tối thiểu 2 ký tự."
    
    if (!phone.trim()) newErrors.phone = "Vui lòng nhập số điện thoại."
    else if (!/^[0-9]+$/.test(phone.trim())) newErrors.phone = "Số điện thoại chỉ được chứa chữ số."
    else if (!isValidPhone(phone)) newErrors.phone = "Số điện thoại không hợp lệ (VD: 09xx...)."
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return
    if (step === 2 && !validateStep2()) return
    setStep(step + 1)
  }

  const handlePrev = () => {
    setErrors({})
    setSubmitError("")
    setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError("")

    if (!terms) {
      setErrors({ terms: "Vui lòng đồng ý với các điều khoản trước khi đăng ký." })
      return
    }

    setIsLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      // Mock failure
      setSubmitError("Đã có lỗi xảy ra khi tạo tài khoản. Vui lòng thử lại sau.")
    } finally {
      setIsLoading(false)
    }
  }

  const getStrengthLabel = (s: number) => {
    if (s === 0) return "Chưa nhập mật khẩu"
    if (s <= 2) return "Mật khẩu yếu"
    if (s === 3) return "Mật khẩu trung bình"
    if (s === 4) return "Mật khẩu mạnh"
    return "Mật khẩu rất mạnh"
  }

  const getStrengthColor = (index: number, s: number) => {
    if (s === 0) return "bg-border"
    if (s === 5) return "bg-success"
    if (s <= 2 && index === 0) return "bg-error"
    if (s === 3 && index <= 1) return "bg-warning"
    if (s === 4 && index <= 2) return "bg-primary"
    return "bg-border"
  }

  const isStep1Valid = email.trim().length > 0 && password.length > 0 && confirmPassword.length > 0
  const isStep2Valid = fullname.trim().length > 0 && phone.trim().length > 0
  const isStep3Valid = terms

  return (
    <>
      <div className="flex flex-col space-y-3 mb-6">
        {step > 1 && (
          <button 
            onClick={handlePrev}
            disabled={isLoading}
            className="flex items-center text-[13px] font-medium text-text-secondary hover:text-heading transition-colors mb-2 w-max disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Quay lại
          </button>
        )}
        <h1 className="text-[28px] sm:text-[32px] font-bold tracking-tight text-heading">
          {step === 1 && "Tạo tài khoản"}
          {step === 2 && "Thông tin cá nhân"}
          {step === 3 && "Hoàn tất đăng ký"}
        </h1>
        <p className="text-[15px] text-text-secondary leading-relaxed">
          {step === 1 && "Bắt đầu hành trình của bạn tại EduMS bằng cách tạo tài khoản ứng viên mới."}
          {step === 2 && "Vui lòng cung cấp thông tin liên hệ chính xác để nhận thông báo xét tuyển."}
          {step === 3 && "Xác nhận các điều khoản trước khi chính thức nộp hồ sơ vào hệ thống."}
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-8 relative">
        <div className="absolute left-0 top-1/2 w-full h-0.5 bg-border -z-10 -translate-y-1/2"></div>
        <div 
          className="absolute left-0 top-1/2 h-0.5 bg-primary -z-10 -translate-y-1/2 transition-all duration-300"
          style={{ width: `${(step - 1) * 50}%` }}
        ></div>
        
        {[1, 2, 3].map((s) => (
          <div 
            key={s} 
            className={`flex items-center justify-center h-8 w-8 rounded-full text-[13px] font-semibold transition-all duration-300 ${
              step > s 
                ? "bg-primary text-white ring-4 ring-background" 
                : step === s 
                  ? "bg-primary text-white ring-4 ring-primary/20" 
                  : "bg-surface border-2 border-border text-text-secondary ring-4 ring-background"
            }`}
          >
            {step > s ? <CheckCircle2 className="h-4 w-4" /> : s}
          </div>
        ))}
      </div>
      
      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        {submitError && (
          <div className="p-3 text-sm text-error bg-error/10 border border-error/20 rounded-lg flex items-start gap-2 animate-in fade-in" role="alert">
            <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        {/* Step 1: Account Info */}
        <div className={step === 1 ? "space-y-4 animate-in fade-in slide-in-from-right-4 duration-300" : "hidden"}>
          <div className="space-y-2">
            <label htmlFor="email" className="text-[14px] font-semibold text-heading">
              Địa chỉ Email <span className="text-error">*</span>
            </label>
            <Input
              id="email"
              type="email"
              placeholder="nhap.email@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors({ ...errors, email: "" })
              }}
              onBlur={() => setEmail(email.trim().toLowerCase())}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={errors.email ? "border-error focus-visible:ring-error/20" : ""}
            />
            {errors.email && (
              <p id="email-error" className="text-[13px] text-error font-medium flex items-center gap-1.5 mt-1.5">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.email}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="text-[14px] font-semibold text-heading">
              Mật khẩu <span className="text-error">*</span>
            </label>
            <PasswordInput
              id="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password) setErrors({ ...errors, password: "" })
              }}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              className={errors.password ? "border-error focus-visible:ring-error/20" : ""}
            />
            {errors.password && (
              <p id="password-error" className="text-[13px] text-error font-medium flex items-center gap-1.5 mt-1.5">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                {errors.password}
              </p>
            )}
            
            {/* Password strength indicator */}
            <div className="mt-3 space-y-2 bg-surface border rounded-lg p-3">
              <div className="flex items-center gap-1">
                <div className={`h-1.5 w-1/4 rounded-full transition-colors ${getStrengthColor(0, score)}`}></div>
                <div className={`h-1.5 w-1/4 rounded-full transition-colors ${getStrengthColor(1, score)}`}></div>
                <div className={`h-1.5 w-1/4 rounded-full transition-colors ${getStrengthColor(2, score)}`}></div>
                <div className={`h-1.5 w-1/4 rounded-full transition-colors ${getStrengthColor(3, score)}`}></div>
              </div>
              <p className={`text-xs ${score === 5 ? 'text-success font-semibold' : 'text-text-secondary font-medium'}`}>
                {getStrengthLabel(score)}
              </p>
              
              <ul className="text-xs text-text-secondary space-y-1 mt-2">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className={`h-3.5 w-3.5 ${password.length >= 8 ? "text-success" : "text-muted-foreground"}`} />
                  <span className={password.length >= 8 ? "text-text-primary" : ""}>Có ít nhất 8 ký tự</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className={`h-3.5 w-3.5 ${/[A-Z]/.test(password) ? "text-success" : "text-muted-foreground"}`} />
                  <span className={/[A-Z]/.test(password) ? "text-text-primary" : ""}>Có chữ hoa</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className={`h-3.5 w-3.5 ${/[a-z]/.test(password) ? "text-success" : "text-muted-foreground"}`} />
                  <span className={/[a-z]/.test(password) ? "text-text-primary" : ""}>Có chữ thường</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className={`h-3.5 w-3.5 ${/[0-9]/.test(password) ? "text-success" : "text-muted-foreground"}`} />
                  <span className={/[0-9]/.test(password) ? "text-text-primary" : ""}>Có số</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className={`h-3.5 w-3.5 ${/[^A-Za-z0-9]/.test(password) ? "text-success" : "text-muted-foreground"}`} />
                  <span className={/[^A-Za-z0-9]/.test(password) ? "text-text-primary" : ""}>Có ký tự đặc biệt</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-[14px] font-semibold text-heading">
              Xác nhận mật khẩu <span className="text-error">*</span>
            </label>
            <PasswordInput
              id="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" })
              }}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
              className={errors.confirmPassword ? "border-error focus-visible:ring-error/20" : ""}
            />
            {errors.confirmPassword && (
              <p id="confirm-password-error" className="text-[13px] text-error font-medium flex items-center gap-1.5 mt-1.5">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.confirmPassword}
              </p>
            )}
          </div>
          
          <Button 
            type="button" 
            onClick={handleNext} 
            disabled={!isStep1Valid}
            className="w-full mt-4 font-semibold shadow-sm"
          >
            Tiếp tục
          </Button>
        </div>

        {/* Step 2: Personal Info */}
        <div className={step === 2 ? "space-y-4 animate-in fade-in slide-in-from-right-4 duration-300" : "hidden"}>
          <div className="space-y-2">
            <label htmlFor="fullname" className="text-[14px] font-semibold text-heading">
              Họ và tên đầy đủ <span className="text-error">*</span>
            </label>
            <Input
              id="fullname"
              type="text"
              placeholder="VD: Nguyễn Văn A"
              value={fullname}
              onChange={(e) => {
                setFullname(e.target.value)
                if (errors.fullname) setErrors({ ...errors, fullname: "" })
              }}
              onBlur={() => setFullname(fullname.trim())}
              aria-invalid={!!errors.fullname}
              aria-describedby={errors.fullname ? "fullname-error" : undefined}
              className={errors.fullname ? "border-error focus-visible:ring-error/20" : ""}
            />
            {errors.fullname && (
              <p id="fullname-error" className="text-[13px] text-error font-medium flex items-center gap-1.5 mt-1.5">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.fullname}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="phone" className="text-[14px] font-semibold text-heading">
              Số điện thoại <span className="text-error">*</span>
            </label>
            <Input
              id="phone"
              type="tel"
              placeholder="09xx xxx xxx"
              value={phone}
              onChange={(e) => {
                // Allow only numbers
                if (e.target.value === '' || /^[0-9]+$/.test(e.target.value)) {
                  setPhone(e.target.value)
                  if (errors.phone) setErrors({ ...errors, phone: "" })
                }
              }}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={errors.phone ? "border-error focus-visible:ring-error/20" : ""}
            />
            {errors.phone && (
              <p id="phone-error" className="text-[13px] text-error font-medium flex items-center gap-1.5 mt-1.5">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.phone}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <label htmlFor="dob" className="text-[14px] font-semibold text-heading">
              Ngày sinh
            </label>
            <Input
              id="dob"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </div>
          
          <Button 
            type="button" 
            onClick={handleNext} 
            disabled={!isStep2Valid}
            className="w-full mt-4 font-semibold shadow-sm"
          >
            Tiếp tục
          </Button>
        </div>

        {/* Step 3: Confirmation */}
        <div className={step === 3 ? "space-y-6 animate-in fade-in slide-in-from-right-4 duration-300" : "hidden"}>
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-3 text-[14px]">
            <p className="font-semibold text-primary flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> Vui lòng kiểm tra kỹ thông tin:
            </p>
            <ul className="space-y-2 text-text-secondary pl-6 border-l-2 border-primary/10 ml-2">
              <li><span className="font-medium text-heading">Email:</span> {email}</li>
              <li><span className="font-medium text-heading">Họ tên:</span> {fullname}</li>
              <li><span className="font-medium text-heading">Số điện thoại:</span> {phone}</li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="flex items-start space-x-3">
              <input 
                type="checkbox" 
                id="terms" 
                checked={terms}
                onChange={(e) => {
                  setTerms(e.target.checked)
                  if (errors.terms) setErrors({ ...errors, terms: "" })
                }}
                disabled={isLoading}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary/20 accent-primary cursor-pointer transition-all shrink-0"
              />
              <label
                htmlFor="terms"
                className={`text-[14px] leading-relaxed cursor-pointer select-none ${errors.terms ? 'text-error font-medium' : 'text-text-secondary'}`}
              >
                Tôi cam kết các thông tin khai báo là chính xác và đồng ý với{" "}
                <Link href="#" className="font-medium text-primary hover:underline">Điều khoản sử dụng</Link>{" "}
                cũng như <Link href="#" className="font-medium text-primary hover:underline">Chính sách bảo mật</Link> của EduMS.
              </label>
            </div>
            {errors.terms && (
              <p className="text-[13px] text-error font-medium flex items-center gap-1.5 mt-1.5 ml-7">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.terms}
              </p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full font-semibold shadow-sm"
            disabled={!isStep3Valid || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              "Xác nhận & Tạo tài khoản"
            )}
          </Button>
        </div>
      </form>

      <div className="mt-8 text-center">
        <span className="text-[14px] text-text-secondary">Đã có tài khoản? </span>
        <Link 
          href="/dang-nhap" 
          className="text-[14px] font-semibold text-primary hover:text-primary-hover transition-colors"
        >
          Đăng nhập
        </Link>
      </div>
    </>
  )
}
