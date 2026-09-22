import { M2_MockCampaigns } from "@/mocks/admissions"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

export async function generateMetadata(props: { params: Promise<{ campaignSlug: string }> }) {
  const params = await props.params;
  const campaign = M2_MockCampaigns.find(c => c.slug === params.campaignSlug)
  if (!campaign) return { title: "Không tìm thấy đợt tuyển sinh" }
  return {
    title: campaign.name,
    description: campaign.description,
  }
}

export default async function CampaignDetailPage(props: { params: Promise<{ campaignSlug: string }> }) {
  const params = await props.params;
  const campaign = M2_MockCampaigns.find(c => c.slug === params.campaignSlug)
  
  if (!campaign) {
    notFound()
  }

  return (
    <div className="container mx-auto max-w-7xl px-6 py-12 space-y-12">
      {/* Breadcrumb equivalent */}
      <div className="flex items-center text-sm text-text-secondary gap-2 mb-4">
        <Link href="/" className="hover:text-primary transition-colors">Trang chủ</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/tuyen-sinh" className="hover:text-primary transition-colors">Tuyển sinh</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-text-primary font-medium truncate max-wxs">{campaign.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge 
                variant={
                  campaign.status === "OPEN" ? "success" : 
                  campaign.status === "UPCOMING" ? "warning" : "secondary"
                }
                className="px-3 py-1"
              >
                {campaign.status === "OPEN" ? "Đang mở đăng ký" : 
                 campaign.status === "UPCOMING" ? "Sắp mở đăng ký" : "Đã đóng đăng ký"}
              </Badge>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">{campaign.name}</h1>
            <p className="text-lg text-text-secondary leading-relaxed">
              {campaign.description}
            </p>
          </div>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold tracking-tight">Chương trình đào tạo</h2>
            <div className="grid gap-4">
              {campaign.programs.map((program) => (
                <Card key={program.id} className="overflow-hidden hover:shadow-soft transition-shadow">
                  <div className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold">{program.name}</h3>
                        <Badge variant="outline" className="font-mono">{program.code}</Badge>
                      </div>
                      <p className="text-sm text-text-secondary">{program.description}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {program.requirements.map((req, i) => (
                          <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="shrink-0 flex flex-col items-end gap-3 w-full md:w-auto">
                      <div className="text-sm font-medium">
                        Chỉ tiêu: <span className="text-lg text-primary">{program.quota}</span>
                      </div>
                      <Link href={`/tuyen-sinh/${campaign.slug}/chuong-trinh?code=${program.code}`} className={buttonVariants({ variant: campaign.status === "OPEN" ? "default" : "outline", className: "w-full md:w-auto" })}>
                        Đăng ký ngay
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <Card className="sticky top-24">
            <CardHeader className="bg-muted/30 border-b">
              <CardTitle className="text-lg">Thông tin thời gian</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                {campaign.timeline.map((item, index) => (
                  <div key={index} className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-primary bg-surface z-10 shrink-0 mt-1 shadow-sm" />
                    <div className="w-[calc(100%-2rem)] ml-4">
                      <div className="flex flex-col mb-1">
                        <time className="text-xs font-semibold text-primary">{item.date}</time>
                        <h4 className="font-medium text-sm text-heading">{item.title}</h4>
                      </div>
                      <p className="text-xs text-text-secondary">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
