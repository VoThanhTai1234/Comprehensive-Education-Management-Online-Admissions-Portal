export interface AdmissionProgram {
  id: number
  name: string
  code: string
  description: string
  requirements: string[]
  quota: number
}

export interface AdmissionCampaign {
  id: number
  name: string
  slug: string
  startDate: string
  endDate: string
  status: "OPEN" | "CLOSED" | "UPCOMING"
  description: string
  programs: AdmissionProgram[]
  timeline: {
    title: string
    date: string
    description: string
  }[]
}

export const M2_MockCampaigns: AdmissionCampaign[] = [
  {
    id: 1,
    name: "Tuyển sinh Lớp 10 Năm học 2026-2027",
    slug: "tuyen-sinh-lop-10-2026",
    startDate: "2026-05-01T00:00:00Z",
    endDate: "2026-07-31T23:59:59Z",
    status: "OPEN",
    description: "Chương trình tuyển sinh thường niên dành cho học sinh chuẩn bị bước vào lớp 10. Bao gồm các lớp Tiêu chuẩn và lớp Chuyên.",
    programs: [
      {
        id: 101,
        name: "Lớp 10 Tiêu chuẩn",
        code: "TC10",
        description: "Chương trình đào tạo chuẩn theo quy định của Bộ Giáo dục và Đào tạo.",
        requirements: ["Tốt nghiệp THCS khá trở lên", "Hạnh kiểm khá trở lên"],
        quota: 300,
      },
      {
        id: 102,
        name: "Lớp 10 Chuyên Toán",
        code: "CT10",
        description: "Chương trình đào tạo chuyên sâu môn Toán, bồi dưỡng học sinh thi học sinh giỏi các cấp.",
        requirements: ["Tốt nghiệp THCS giỏi", "Điểm trung bình môn Toán lớp 9 từ 8.5 trở lên"],
        quota: 35,
      },
      {
        id: 103,
        name: "Lớp 10 Chuyên Anh",
        code: "CA10",
        description: "Chương trình đào tạo tăng cường tiếng Anh, sử dụng giáo trình chuẩn quốc tế.",
        requirements: ["Tốt nghiệp THCS khá", "IELTS 5.5 trở lên hoặc tương đương"],
        quota: 70,
      }
    ],
    timeline: [
      {
        title: "Mở cổng đăng ký",
        date: "01/05/2026",
        description: "Bắt đầu tiếp nhận hồ sơ trực tuyến."
      },
      {
        title: "Đóng cổng đăng ký",
        date: "31/07/2026",
        description: "Ngừng tiếp nhận hồ sơ mới."
      },
      {
        title: "Công bố kết quả",
        date: "15/08/2026",
        description: "Công bố kết quả xét tuyển và gửi mã trúng tuyển."
      },
      {
        title: "Nhập học",
        date: "25/08/2026",
        description: "Học sinh trúng tuyển đến trường làm thủ tục nhập học."
      }
    ]
  },
  {
    id: 2,
    name: "Tuyển sinh Bổ sung Lớp 11 Học kỳ 2",
    slug: "tuyen-sinh-bo-sung-lop-11-hk2",
    startDate: "2026-12-01T00:00:00Z",
    endDate: "2026-12-31T23:59:59Z",
    status: "UPCOMING",
    description: "Tuyển sinh bổ sung cho các lớp 11 còn chỉ tiêu vào học kỳ 2 năm học 2026-2027.",
    programs: [
      {
        id: 201,
        name: "Lớp 11 Tiêu chuẩn",
        code: "TC11",
        description: "Chương trình đào tạo chuẩn.",
        requirements: ["Điểm trung bình học kỳ 1 lớp 11 đạt loại khá trở lên"],
        quota: 20,
      }
    ],
    timeline: [
       {
        title: "Mở cổng đăng ký",
        date: "01/12/2026",
        description: "Bắt đầu tiếp nhận hồ sơ."
      }
    ]
  }
]
