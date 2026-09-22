"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { Sidebar } from "./sidebar";
import { Header } from "./header";

/**
 * DashboardLayout — wraps all authenticated role-based pages.
 * Usage: in app/(dashboard)/layout.tsx
 */
export function DashboardLayout({ children, pageTitle }: { children: React.ReactNode; pageTitle?: string }) {
  const [collapsed, setCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-bg-page flex">
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
          role="button"
          aria-label="Đóng menu"
          tabIndex={0}
          onKeyDown={(e) => { if(e.key === 'Enter' || e.key === ' ') setMobileOpen(false) }}
        />
      )}
      
      <Sidebar 
        collapsed={collapsed} 
        mobileOpen={mobileOpen}
        onToggle={() => setCollapsed((c) => !c)} 
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex flex-col flex-1 min-w-0 transition-all duration-300 ease-in-out">
        <Header 
          sidebarCollapsed={collapsed} 
          title={pageTitle} 
          onMobileToggle={() => setMobileOpen(true)}
        />
        <main
          className={cn(
            "flex-1 p-4 md:p-6 transition-[padding] duration-200 ease-in-out mt-[64px]",
            !collapsed && "lg:ml-64",
            collapsed && "lg:ml-16"
          )}
        >
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
