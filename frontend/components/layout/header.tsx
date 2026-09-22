"use client";

import * as React from "react";
import { cn } from "@/lib/cn";
import { Bell, Menu } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/auth-context";
import { ROLES, ROLE_LABELS, ROLE_HOME, type Role } from "@/lib/constants/roles";

/* ------------------------------------------------------------------ */
/*  Header                                                                */
/* ------------------------------------------------------------------ */
interface HeaderProps {
  sidebarCollapsed: boolean;
  title?: string;
  onMobileToggle?: () => void;
}

export function Header({ sidebarCollapsed, title, onMobileToggle }: HeaderProps) {
  const { login, user } = useAuth();
  const router = useRouter();

  return (
    <header
      className={cn(
        "fixed top-0 right-0 h-16 bg-surface border-b border-border-subtle z-30",
        "flex items-center justify-between px-4 sm:px-6",
        "transition-all duration-300 ease-in-out left-0",
        !sidebarCollapsed ? "lg:left-64" : "lg:left-16"
      )}
    >
      <div className="flex items-center gap-3">
        <button 
          onClick={onMobileToggle}
          className="lg:hidden p-2 -ml-2 text-muted hover:text-body rounded-md hover:bg-bg-page"
          aria-label="Mở menu di động"
        >
          <Menu className="w-5 h-5" />
        </button>
        {title && <h1 className="text-sm font-semibold text-heading hidden sm:block">{title}</h1>}
      </div>
      <div className="flex items-center gap-4">
        {/* MOCK ROLE SWITCHER */}
        <div className="flex items-center gap-2 border-r border-border-subtle pr-4">
          <span className="text-xs text-muted font-medium">Mock Role:</span>
          <select 
            aria-label="Chọn Mock Role"
            className="text-xs border-border-subtle rounded-md bg-surface text-body py-1 px-2 focus:ring-primary focus:border-primary"
            value={user?.roles?.[0] || ""}
            onChange={async (e) => {
              const role = e.target.value as Role;
              const roleToEmail: Record<string, string> = {
                "SYSTEM_ADMIN": "sysadmin@edums.edu.vn",
                "ACADEMIC_ADMIN": "admin@edums.edu.vn",
                "ADMISSIONS_OFFICER": "tuyen-sinh@edums.edu.vn",
                "TEACHER": "teacher01@edums.edu.vn",
                "STUDENT": "student01@edums.edu.vn",
                "PARENT": "parent01@edums.edu.vn",
                "APPLICANT": "applicant01@edums.edu.vn",
              }
              const email = roleToEmail[role]
              if (email) {
                const res = await login(email, "password");
                if (res.success) {
                   router.push(ROLE_HOME[role]);
                }
              }
            }}
          >
            <option value="">Chọn Role...</option>
            {Object.keys(ROLES).map((role) => (
              <option key={role} value={role}>{ROLE_LABELS[role as Role]}</option>
            ))}
          </select>
        </div>

        <Link
          href="/thong-bao"
          className="relative p-2 rounded-lg text-muted hover:text-body hover:bg-bg-page transition-colors"
          aria-label="Thông báo"
        >
          <Bell className="w-4 h-4" />
          {/* Unread dot */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
        </Link>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  PageHeader                                                            */
/* ------------------------------------------------------------------ */
interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  className?: string;
}

export function PageHeader({ title, description, action, breadcrumbs, className }: PageHeaderProps) {
  return (
    <div className={cn("mb-8", className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 text-xs text-muted mb-3">
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span>/</span>}
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-body transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-body font-medium">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-heading">{title}</h1>
          {description && <p className="text-sm text-muted mt-1.5">{description}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  );
}
