import { HealthCheck } from "@/components/system/health-check";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Health",
  robots: { index: false },
};

export default function SystemPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-16">
      <section className="w-full space-y-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            EduMS technical baseline
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Kiểm tra kết nối hệ thống
          </h1>
          <p className="max-w-2xl text-base leading-7 text-slate-600">
            Trang kỹ thuật — xác nhận kết nối Frontend → Backend → Database.
          </p>
        </div>
        <HealthCheck />
      </section>
    </main>
  );
}
