# EduMS Frontend

Next.js App Router frontend cho EduMS. Giai đoạn 4 chỉ cung cấp nền kỹ thuật và trang kiểm tra backend; chưa chứa UI nghiệp vụ.

## Yêu cầu

- Node.js 20.9 trở lên
- npm 10 trở lên

## Cài đặt

```powershell
npm install
Copy-Item .env.example .env.local
```

Không commit `.env.local`. Chỉ biến bắt đầu bằng `NEXT_PUBLIC_` được đưa vào mã chạy trên trình duyệt; tuyệt đối không đặt secret vào các biến này.

## Chạy development

```powershell
npm run dev
```

Mở `http://localhost:3000`. Trang baseline sẽ gọi `GET http://localhost:8080/api/health` và hiển thị trạng thái backend/database.

## Kiểm tra production

```powershell
npm run lint
npm run build
npm run start
```

## Cấu trúc baseline

```text
frontend/
├── app/                 App Router, layout và trang
├── components/system/   Component kiểm tra nền tảng
├── lib/api/             API client
├── types/               Kiểu dữ liệu dùng chung
└── public/              Tài nguyên tĩnh (khi cần)
```

Antigravity chỉ bắt đầu thiết kế UI sau Giai đoạn 8 và phải giữ nguyên API contract được chốt ở Giai đoạn 7.

