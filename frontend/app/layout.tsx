import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/contexts/auth-context";
import { ToastProvider } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin", "vietnamese"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    template: "%s | EduMS",
    default: "EduMS — Nền tảng Quản trị Giáo dục Toàn diện",
  },
  description:
    "Nền tảng Quản trị Giáo dục Toàn diện & Cổng Tuyển sinh Trực tuyến — quản lý tuyển sinh, đào tạo, điểm, điểm danh và học phí trong một hệ thống.",
  metadataBase: new URL("http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
