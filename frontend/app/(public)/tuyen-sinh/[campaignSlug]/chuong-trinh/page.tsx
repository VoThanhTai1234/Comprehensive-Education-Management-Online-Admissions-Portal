import { M2_MockCampaigns } from "@/mocks/admissions"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChevronRight, FileText, Info } from "lucide-react"

export async function generateMetadata(props: { params: Promise<{ campaignSlug: string }>, searchParams: Promise<{ code?: string }> }) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const campaign = M2_MockCampaigns.find(c => c.slug === params.campaignSlug)
  if (!campaign) return { title: "Không tìm thấy chương trình" }
  
  const program = campaign.programs.find(p => p.code === searchParams.code)
  if (!program) return { title: "Chương trình đào tạo - " + campaign.name }

  return {
    title: `Đăng ký ${program.name}`,
    description: program.description,
  }
}

export default async function ProgramDetailPage(props: { params: Promise<{ campaignSlug: string }>, searchParams: Promise<{ code?: string }> }) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const campaign = M2_MockCampaigns.find(c => c.slug === params.campaignSlug)
  
  if (!campaign) {
    notFound()
  }

  const program = campaign.programs.find(p => p.code === searchParams.code)
  
  if (!program) {
    // If no specific program is selected, show all programs for this campaign
    return (
      <div className="container mx-auto max-w-7xl px-6 py-12 space-y-8">
        <h1 className="text-3xl font-bold">Vui lòng chọn một chương trình đào tạo</h1>
        <Link href={`/tuyen-sinh/${campaign.slug}`} className={buttonVariants({ variant: "outline" })}>
           Quay lại đợt tuyển sinh
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-7xl px-6 py-12 space-y-12">
      <div className="flex items-center text-sm text-text-secondary gap-2 mb-4 flex-wrap">
        <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/tuyen-sinh" className="hover:text-primary transition-colors">Tuyển sinh</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/tuyen-sinh/${campaign.slug}`} className="hover:text-primary transition-colors truncate max-w-[200px] sm:max-w-xs">{campaign.name}</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-text-primary font-medium">{program.name}</span>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        <div className="space-y-4 text-center">
          <Badge variant="outline" className="px-3 py-1 bg-surface font-mono text-sm">{program.code}</Badge>
          <h1 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">Đăng ký {program.name}</h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            {program.description}
          </p>
        </div>

        <Card>
          <CardHeader className="bg-muted/30 border-b">
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="h-5 w-5 text-primary" />
              Yêu cầu tuyển sinh
            </CardTitle>
            <CardDescription>Học sinh cần đáp ứng các tiêu chí sau để hợp lệ nộp hồ sơ.</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="space-y-3">
              {program.requirements.map((req, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                    <div className="h-2 w-2 rounded-full bg-success" />
                  </div>
                  <span className="text-text-primary mt-0.5">{req}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-muted/30 border-b">
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Hồ sơ cần chuẩn bị
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="list-disc pl-5 space-y-2 text-text-secondary">
              <li>Bản sao giấy khai sinh hợp lệ.</li>
              <li>Học bạ THCS (Bản photo công chứng hoặc bản điện tử).</li>
              <li>Giấy chứng nhận tốt nghiệp THCS tạm thời.</li>
              <li>Các chứng chỉ tiếng Anh, tin học, hoặc giấy khen (nếu có).</li>
            </ul>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 border-t">
          <Link href={`/tuyen-sinh/${campaign.slug}`} className={buttonVariants({ variant: "outline", size: "lg", className: "w-full sm:w-auto" })}>
             Quay lại
          </Link>
          <Button size="lg" className="w-full sm:w-auto">
             Bắt đầu nộp hồ sơ trực tuyến
          </Button>
        </div>
        
        <p className="text-center text-sm text-text-secondary">
           Bạn sẽ được yêu cầu đăng nhập hoặc tạo tài khoản mới để tiếp tục.
        </p>
      </div>
    </div>
  )
}
