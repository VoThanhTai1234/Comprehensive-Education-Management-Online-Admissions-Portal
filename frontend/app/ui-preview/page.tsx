"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatCard } from "@/components/ui/stat-card"
import { Modal } from "@/components/ui/modal"
import { EmptyState } from "@/components/ui/empty-state"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/toaster"
import { Users, AlertTriangle, ChevronRight, Download, SearchIcon, Filter, Layers, CreditCard, BookOpen } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/cn"

const Section = ({ title, description, children, className }: { title: string, description: string, children: React.ReactNode, className?: string }) => (
  <section className={cn("space-y-8 py-10 border-b border-border/60 last:border-0", className)}>
    <div className="space-y-2 max-w-3xl">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
    <div className="grid gap-8">
      {children}
    </div>
  </section>
)

const ShowcasePanel = ({ title, children, className }: { title?: string, children: React.ReactNode, className?: string }) => (
  <div className="space-y-4">
    {title && <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">{title}</h3>}
    <div className={cn("p-8 rounded-2xl border bg-surface shadow-sm", className)}>
      {children}
    </div>
  </div>
)

const ColorCard = ({ name, hex, usage, className }: { name: string, hex: string, usage: string, className?: string }) => (
  <div className="group flex flex-col overflow-hidden rounded-2xl border bg-surface shadow-card hover:shadow-soft transition-all">
    <div className={cn("h-32 w-full", className)} />
    <div className="p-4 space-y-1">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-sm">{name}</h4>
        <span className="text-xs font-mono text-muted-foreground">{hex}</span>
      </div>
      <p className="text-xs text-text-secondary leading-relaxed">{usage}</p>
    </div>
  </div>
)

const TypographyRow = ({ name, size, weight, lh, text, className }: { name: string, size: string, weight: string, lh: string, text: string, className?: string }) => (
  <div className="flex flex-col md:flex-row md:items-baseline gap-4 py-4 border-b border-border/40 last:border-0">
    <div className="w-48 shrink-0 space-y-1">
      <div className="text-sm font-semibold text-text-primary">{name}</div>
      <div className="text-xs font-mono text-text-secondary">{size} / {weight} / {lh}</div>
    </div>
    <div className={cn("flex-1 truncate", className)}>
      {text}
    </div>
  </div>
)

export default function DesignSystemShowcase() {
  const { toast } = useToast()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shadow-inner">
              <Layers className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-heading">EduMS Design System</h1>
              <p className="text-xs text-text-secondary">Comprehensive Education Management</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-xs px-3 py-1 bg-surface">Phiên bản 1.0.0</Badge>
            <Badge variant="success" className="text-xs px-3 py-1 shadow-sm">Phase 1 Hoàn thành</Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        <div className="max-w-3xl space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-heading">Hệ thống Thiết kế</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            Nền tảng giao diện chuẩn mực, tinh tế và đồng nhất dành cho toàn bộ các module thuộc dự án EduMS. Ưu tiên sự rõ ràng, hiện đại và tập trung vào trải nghiệm người dùng.
          </p>
        </div>

        <Section 
          title="A. Nền tảng (Foundation)" 
          description="Các nguyên tắc cơ bản về màu sắc, kiểu chữ và khoảng cách tạo nên ngôn ngữ thiết kế chung."
        >
          <ShowcasePanel title="Màu sắc chính (Brand & UI)">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <ColorCard name="Primary" hex="#5B5BD6" usage="Nút bấm chính, trạng thái active, nhấn mạnh" className="bg-[#5B5BD6]" />
              <ColorCard name="Primary Hover" hex="#4646C7" usage="Trạng thái hover của nút bấm chính" className="bg-[#4646C7]" />
              <ColorCard name="Primary Soft" hex="#EEF0FF" usage="Nền phụ, trạng thái selected nhẹ" className="bg-[#EEF0FF]" />
              <ColorCard name="Accent" hex="#22C7D6" usage="Màu nhấn phụ, biểu đồ, icon nổi bật" className="bg-[#22C7D6]" />
              
              <ColorCard name="Background" hex="#F7F8FC" usage="Nền trang web chính (Off-white)" className="bg-[#F7F8FC] border" />
              <ColorCard name="Surface" hex="#FFFFFF" usage="Nền thẻ (Card), modal, dropdown" className="bg-[#FFFFFF] border" />
              <ColorCard name="Text Primary" hex="#1F2937" usage="Tiêu đề, văn bản nội dung chính" className="bg-[#1F2937]" />
              <ColorCard name="Border" hex="#E8EAF2" usage="Đường viền chung, divider" className="bg-[#E8EAF2]" />
            </div>
          </ShowcasePanel>

          <ShowcasePanel title="Màu sắc phản hồi (Feedback)">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <ColorCard name="Success" hex="#22C55E" usage="Hoàn thành, trúng tuyển, thông báo tốt" className="bg-[#22C55E]" />
              <ColorCard name="Warning" hex="#F59E0B" usage="Chờ duyệt, cảnh báo, cần chú ý" className="bg-[#F59E0B]" />
              <ColorCard name="Error" hex="#EF4444" usage="Lỗi, thất bại, từ chối, hành động nguy hiểm" className="bg-[#EF4444]" />
            </div>
          </ShowcasePanel>

          <ShowcasePanel title="Kiểu chữ (Typography)">
            <div className="flex flex-col">
              <TypographyRow name="Display" size="36px" weight="Bold" lh="1.2" text="Cổng Tuyển Sinh Trực Tuyến" className="text-4xl font-bold" />
              <TypographyRow name="Heading 1" size="30px" weight="Bold" lh="1.3" text="Thông tin học sinh" className="text-3xl font-bold" />
              <TypographyRow name="Heading 2" size="24px" weight="SemiBold" lh="1.4" text="Danh sách đợt tuyển sinh" className="text-2xl font-semibold" />
              <TypographyRow name="Card Title" size="18px" weight="SemiBold" lh="1.5" text="Tổng quan học tập" className="text-lg font-semibold" />
              <TypographyRow name="Body Large" size="16px" weight="Regular" lh="1.5" text="Hệ thống quản trị giáo dục toàn diện giúp kết nối nhà trường và phụ huynh." className="text-base" />
              <TypographyRow name="Body" size="14px" weight="Regular" lh="1.5" text="Vui lòng nhập đầy đủ thông tin vào các trường bắt buộc bên dưới." className="text-sm" />
              <TypographyRow name="Caption" size="12px" weight="Medium" lh="1.5" text="Bản quyền thuộc về EduMS © 2026" className="text-xs text-text-secondary" />
            </div>
          </ShowcasePanel>
        </Section>

        <Section 
          title="B. Thao tác (Actions)" 
          description="Nút bấm và các thành phần tương tác chính để người dùng thực hiện hành động."
        >
          <ShowcasePanel title="Nút bấm (Buttons)">
            <div className="flex flex-wrap items-center gap-6">
              <div className="space-y-3">
                <div className="text-xs text-text-secondary">Primary</div>
                <Button>Đăng nhập</Button>
              </div>
              <div className="space-y-3">
                <div className="text-xs text-text-secondary">Secondary</div>
                <Button variant="secondary">Hủy bỏ</Button>
              </div>
              <div className="space-y-3">
                <div className="text-xs text-text-secondary">Outline</div>
                <Button variant="outline">Xem chi tiết</Button>
              </div>
              <div className="space-y-3">
                <div className="text-xs text-text-secondary">Ghost</div>
                <Button variant="ghost">Chỉnh sửa</Button>
              </div>
              <div className="space-y-3">
                <div className="text-xs text-text-secondary">Destructive</div>
                <Button variant="destructive">Xóa hồ sơ</Button>
              </div>
              <div className="space-y-3">
                <div className="text-xs text-text-secondary">Disabled</div>
                <Button disabled>Đang xử lý</Button>
              </div>
            </div>
          </ShowcasePanel>

          <ShowcasePanel title="Trạng thái nút bấm (Button States & Sizes)">
            <div className="flex flex-wrap items-end gap-6">
              <div className="space-y-3">
                <div className="text-xs text-text-secondary">Small</div>
                <Button size="sm">Nút nhỏ</Button>
              </div>
              <div className="space-y-3">
                <div className="text-xs text-text-secondary">Large</div>
                <Button size="lg">Đăng ký ngay</Button>
              </div>
              <div className="space-y-3">
                <div className="text-xs text-text-secondary">With Icon</div>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Tải xuống
                </Button>
              </div>
              <div className="space-y-3">
                <div className="text-xs text-text-secondary">Icon Only</div>
                <Button size="icon" variant="outline">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <div className="text-xs text-text-secondary">Loading (Simulated)</div>
                <Button disabled>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang lưu...
                </Button>
              </div>
            </div>
          </ShowcasePanel>
        </Section>

        <Section 
          title="C. Nhập liệu (Forms)" 
          description="Các trường nhập liệu dùng trong form tạo hồ sơ, tìm kiếm và thiết lập."
        >
          <ShowcasePanel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email <span className="text-error">*</span></label>
                <Input placeholder="nhap.email@ví_dụ.com" />
                <p className="text-xs text-text-secondary">Dùng email cá nhân của bạn.</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Số điện thoại</label>
                <Input value="0901234567" readOnly />
                <p className="text-xs text-success">Đã xác thực hợp lệ</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-error">Họ và tên</label>
                <Input className="border-error focus-visible:ring-error/20" defaultValue="Nguyen" />
                <p className="text-xs text-error">Vui lòng nhập đầy đủ họ tên.</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Mã hồ sơ (Vô hiệu hóa)</label>
                <Input disabled value="APP-2026-001" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tìm kiếm</label>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-9" placeholder="Tìm tên học sinh..." />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Chương trình đào tạo</label>
                <Select 
                  options={[
                    { label: "Chọn chương trình", value: "" },
                    { label: "Tiêu chuẩn - Lớp 10", value: "tc" },
                    { label: "Chuyên Toán", value: "ct" },
                    { label: "Chuyên Anh", value: "ca" },
                  ]}
                />
              </div>
            </div>
          </ShowcasePanel>
        </Section>

        <Section 
          title="D. Phản hồi (Feedback)" 
          description="Truyền đạt trạng thái hệ thống, kết quả hành động hoặc cảnh báo tới người dùng."
        >
          <ShowcasePanel title="Nhãn trạng thái (Badges)">
            <div className="flex flex-wrap gap-4">
              <Badge variant="outline">Bản nháp</Badge>
              <Badge variant="default">Đã nộp</Badge>
              <Badge variant="warning">Chờ duyệt</Badge>
              <Badge variant="success">Trúng tuyển</Badge>
              <Badge variant="destructive">Từ chối</Badge>
              <Badge variant="secondary">Cần bổ sung</Badge>
            </div>
          </ShowcasePanel>

          <ShowcasePanel title="Thông báo đẩy (Toasts)">
             <div className="flex flex-wrap gap-4">
                <Button variant="outline" onClick={() => toast({ title: "Thành công!", description: "Hồ sơ của bạn đã được lưu thành công.", variant: "success" })}>
                  Success Toast
                </Button>
                <Button variant="outline" onClick={() => toast({ title: "Cảnh báo", description: "Vui lòng kiểm tra lại thông tin học phí.", variant: "warning" })}>
                  Warning Toast
                </Button>
                <Button variant="outline" onClick={() => toast({ title: "Lỗi hệ thống", description: "Không thể kết nối đến máy chủ. Thử lại sau.", variant: "destructive" })}>
                  Error Toast
                </Button>
                <Button variant="outline" onClick={() => toast({ title: "Thông tin", description: "Đợt tuyển sinh mới đã bắt đầu." })}>
                  Info Toast
                </Button>
             </div>
          </ShowcasePanel>

          <ShowcasePanel title="Trạng thái rỗng (Empty States)">
             <EmptyState 
              icon={AlertTriangle}
              title="Chưa có dữ liệu"
              description="Hiện tại bạn chưa có hồ sơ ứng tuyển nào. Vui lòng tạo hồ sơ mới để bắt đầu."
              action={<Button>Tạo hồ sơ mới</Button>}
              className="bg-background border-none"
             />
          </ShowcasePanel>
        </Section>

        <Section 
          title="E. Hiển thị dữ liệu (Data Display)" 
          description="Các thành phần giúp tổ chức và trình bày thông tin nghiệp vụ rõ ràng."
        >
          <ShowcasePanel title="Thẻ chỉ số (Stat Cards)">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard
                title="Tổng sinh viên"
                value="12,345"
                description="+20% so với tháng trước"
                icon={<Users className="w-4 h-4 text-primary" />}
              />
              <StatCard
                title="Khóa học đang mở"
                value="45"
                description="3 khóa sắp bắt đầu"
                icon={<BookOpen className="w-4 h-4 text-emerald-500" />}
                className="border-warning/50 bg-warning/5"
              />
              <StatCard 
                title="Doanh thu học phí"
                value="1.2B đ"
                description="Kỳ 1 năm học 2026-2027"
                icon={<CreditCard className="w-4 h-4 text-primary" />}
              />
            </div>
          </ShowcasePanel>

          <ShowcasePanel title="Bảng dữ liệu (Data Table)">
             <div className="rounded-xl border bg-surface overflow-hidden shadow-card">
              <div className="p-4 border-b flex items-center justify-between bg-background/50">
                 <h3 className="font-medium">Danh sách ứng viên</h3>
                 <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-2" /> Lọc</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead className="w-[100px]">Mã HS</TableHead>
                    <TableHead>Họ và tên</TableHead>
                    <TableHead>Chương trình</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead className="text-right">Thao tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-primary">APP-001</TableCell>
                    <TableCell>Nguyễn Văn An</TableCell>
                    <TableCell>Tiêu chuẩn</TableCell>
                    <TableCell><Badge variant="success">Trúng tuyển</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-primary">Xem</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-primary">APP-002</TableCell>
                    <TableCell>Trần Thị Bình</TableCell>
                    <TableCell>Chuyên Toán</TableCell>
                    <TableCell><Badge variant="warning">Chờ duyệt</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-primary">Xem</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-primary">APP-003</TableCell>
                    <TableCell>Lê Văn Cường</TableCell>
                    <TableCell>Tiêu chuẩn</TableCell>
                    <TableCell><Badge variant="secondary">Cần bổ sung</Badge></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-primary">Xem</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
             </div>
          </ShowcasePanel>

          <ShowcasePanel title="Điều hướng phụ (Tabs & Cards)">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Thông tin cá nhân</CardTitle>
                  <CardDescription>Cập nhật thông tin liên hệ và mật khẩu bảo mật.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-text-secondary">nguyenvanan@edums.edu.vn</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Số điện thoại</p>
                    <p className="text-sm text-text-secondary">090 123 4567</p>
                  </div>
                </CardContent>
                <CardFooter className="bg-muted/30 border-t pt-4">
                  <Button variant="outline" size="sm">Chỉnh sửa</Button>
                </CardFooter>
              </Card>

              <div className="flex flex-col">
                <Tabs defaultValue="tab1" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 p-1 bg-muted/50 rounded-lg">
                    <TabsTrigger value="tab1" className="rounded-md data-[state=active]:shadow-sm">Tổng quan</TabsTrigger>
                    <TabsTrigger value="tab2" className="rounded-md data-[state=active]:shadow-sm">Học lực</TabsTrigger>
                    <TabsTrigger value="tab3" className="rounded-md data-[state=active]:shadow-sm">Chuyên cần</TabsTrigger>
                  </TabsList>
                  <TabsContent value="tab1" className="p-6 bg-surface border rounded-xl shadow-card mt-4 min-h-[180px]">
                    <h4 className="font-medium mb-2">Tổng quan học tập</h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      Thông tin chung về quá trình học tập, xếp loại và các nhận xét nổi bật từ giáo viên chủ nhiệm.
                    </p>
                  </TabsContent>
                  <TabsContent value="tab2" className="p-6 bg-surface border rounded-xl shadow-card mt-4 min-h-[180px]">
                    <h4 className="font-medium mb-2">Kết quả điểm số</h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      Bảng điểm chi tiết các môn học trong kỳ.
                    </p>
                  </TabsContent>
                  <TabsContent value="tab3" className="p-6 bg-surface border rounded-xl shadow-card mt-4 min-h-[180px]">
                    <h4 className="font-medium mb-2">Lịch sử điểm danh</h4>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      Thống kê số buổi vắng, trễ và lý do cụ thể.
                    </p>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </ShowcasePanel>
        </Section>

        <Section 
          title="F. Lớp phủ (Overlays)" 
          description="Cửa sổ nổi dùng để yêu cầu xác nhận hoặc nhập liệu nhanh mà không rời trang."
        >
          <ShowcasePanel>
             <div className="flex flex-col sm:flex-row gap-4 items-center p-8 bg-background rounded-xl border border-dashed justify-center">
                <Button onClick={() => setIsModalOpen(true)}>Mở Hộp thoại Xác nhận</Button>
             </div>

             <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                title="Xác nhận nộp hồ sơ"
                description="Sau khi nộp, bạn sẽ không thể chỉnh sửa thông tin. Bạn có chắc chắn muốn nộp hồ sơ này?"
              >
                <div className="p-4 bg-warning/10 rounded-lg text-warning-foreground text-sm flex gap-3 mb-6">
                  <AlertTriangle className="h-5 w-5 shrink-0" />
                  <p>Hành động này không thể hoàn tác. Cán bộ tuyển sinh sẽ bắt đầu xét duyệt hồ sơ của bạn ngay lập tức.</p>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsModalOpen(false)}>Hủy bỏ</Button>
                  <Button onClick={() => {
                    setIsModalOpen(false)
                    toast({ title: "Thành công", description: "Hồ sơ đã được nộp.", variant: "success" })
                  }}>Xác nhận Nộp</Button>
                </div>
              </Modal>
          </ShowcasePanel>
        </Section>
        
        {/* Footer spacing */}
        <div className="h-24"></div>
      </main>
    </div>
  )
}
