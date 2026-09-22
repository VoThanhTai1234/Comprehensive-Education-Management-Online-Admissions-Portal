import Link from "next/link"
import { M2_MockCampaigns } from "@/mocks/admissions"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"

export const metadata = {
  title: "Đợt Tuyển Sinh",
  description: "Danh sách các đợt tuyển sinh đang mở và sắp diễn ra của hệ thống EduMS.",
}

export default function CampaignListPage() {
  const campaigns = M2_MockCampaigns

  return (
    <div className="container mx-auto max-w-7xl px-6 py-12 space-y-12">
      <div className="max-w-3xl space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-heading sm:text-4xl">Đợt tuyển sinh</h1>
        <p className="text-lg text-text-secondary leading-relaxed">
          Xem thông tin chi tiết và nộp hồ sơ ứng tuyển vào các đợt tuyển sinh của nhà trường. 
          Vui lòng theo dõi kỹ thời hạn và yêu cầu của từng đợt.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge 
                  variant={
                    campaign.status === "OPEN" ? "success" : 
                    campaign.status === "UPCOMING" ? "warning" : "secondary"
                  }
                >
                  {campaign.status === "OPEN" ? "Đang mở" : 
                   campaign.status === "UPCOMING" ? "Sắp mở" : "Đã đóng"}
                </Badge>
              </div>
              <CardTitle className="text-xl line-clamp-2">{campaign.name}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-2">
                <Calendar className="h-4 w-4" />
                <span>
                  {new Date(campaign.startDate).toLocaleDateString("vi-VN")} - {new Date(campaign.endDate).toLocaleDateString("vi-VN")}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-text-secondary line-clamp-3">
                {campaign.description}
              </p>
            </CardContent>
            <CardFooter className="pt-4 border-t">
              <Link href={`/tuyen-sinh/${campaign.slug}`} className={buttonVariants({ variant: campaign.status === "OPEN" ? "default" : "outline", className: "w-full" })}>
                Xem chi tiết
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
