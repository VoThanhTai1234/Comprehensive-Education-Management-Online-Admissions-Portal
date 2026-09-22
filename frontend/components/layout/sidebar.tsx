"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { useAuth } from "@/lib/contexts/auth-context";
import { SIDEBAR_MENUS, ROLE_LABELS, type Role } from "@/lib/constants/roles";
import {
  LayoutDashboard, FileText, Paperclip, ListOrdered, Award,
  CalendarDays, Inbox, Megaphone, Users, UserCheck, BookOpen,
  School, DoorOpen, ClipboardList, CalendarClock, GraduationCap,
  CalendarRange, Receipt, UserCog, ScrollText, ShieldCheck,
  Heart, Bell, BarChart3, ClipboardCheck, QrCode,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Icon map                                                              */
/* ------------------------------------------------------------------ */
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, FileText, Paperclip, ListOrdered, Award,
  CalendarDays, Inbox, Megaphone, Users, UserCheck, BookOpen,
  School, DoorOpen, ClipboardList, CalendarClock, GraduationCap,
  CalendarRange, Receipt, UserCog, ScrollText, ShieldCheck,
  Heart, Bell, BarChart3, ClipboardCheck, QrCode,
};

/* ------------------------------------------------------------------ */
/*  Sidebar                                                               */
/* ------------------------------------------------------------------ */
interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

export function Sidebar({ collapsed = false, onToggle, mobileOpen, onMobileClose }: SidebarProps) {
  const { user, primaryRole, logout } = useAuth();
  const pathname = usePathname();

  const menuItems = primaryRole ? (SIDEBAR_MENUS[primaryRole] ?? []) : [];

  return (
    <>
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen bg-surface border-r border-border-subtle flex flex-col z-50",
          "transition-all duration-300 ease-in-out",
          // Desktop behavior
          "lg:translate-x-0",
          collapsed ? "lg:w-16" : "lg:w-64",
          // Mobile behavior
          mobileOpen ? "translate-x-0 w-64" : "-translate-x-full w-64"
        )}
      >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-border-subtle shrink-0">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0 shadow-sm">
          <span className="text-white font-bold text-sm">E</span>
        </div>
        {(!collapsed || mobileOpen) && (
          <div className="min-w-0">
            <p className="text-sm font-bold text-heading truncate">EduMS</p>
            <p className="text-xs text-muted truncate">
              {user ? ROLE_LABELS[primaryRole as Role] : ""}
            </p>
          </div>
        )}
        <button
          onClick={onToggle}
          className="ml-auto hidden lg:block text-muted hover:text-body p-1.5 rounded-md hover:bg-bg-page shrink-0 transition-colors"
          aria-label="Toggle sidebar"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <button
          onClick={onMobileClose}
          className="ml-auto lg:hidden text-muted hover:text-body p-1.5 rounded-md hover:bg-bg-page shrink-0 transition-colors"
          aria-label="Close sidebar"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = ICON_MAP[item.icon];
          // isActive logic:
          // 1. Exact match
          // 2. Or pathname starts with item.href + "/" (for sub-pages), EXCEPT if item.href is just a base section like /ung-vien that shares prefix with /ung-vien/ho-so
          // To be safe, let's say it's active if exact match, or if it's a prefix AND the next character is '/' AND there's no longer, more specific matching menu item.
          // Better simple logic:
          // But wait, /ung-vien/ho-so is a sub-page of /ung-vien, and /ung-vien/ho-so/minh-chung is a sub-page of /ung-vien/ho-so.
          // We only want the *longest* matching href to be active.
          const longestMatch = menuItems.reduce((longest, current) => {
            if (pathname === current.href || pathname.startsWith(current.href + "/")) {
              return current.href.length > longest.length ? current.href : longest;
            }
            return longest;
          }, "");
          const isActive = item.href === longestMatch;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary-soft text-primary"
                  : "text-muted hover:bg-bg-page hover:text-body"
              )}
            >
              {Icon && (
                <Icon
                  className={cn("w-4 h-4 shrink-0 transition-colors", isActive ? "text-primary" : "text-muted group-hover:text-body")}
                />
              )}
              {!collapsed && (
                <span className={cn(
                  "truncate transition-opacity duration-200", 
                  // On mobile, the sidebar is always expanded, so we ignore collapsed state for text visibility.
                  "lg:block", 
                  mobileOpen ? "block" : ""
                )}>
                  {item.label}
                </span>
              )}
              {!collapsed && item.badge && (
                <span className={cn(
                  "ml-auto text-xs bg-error text-white px-2 py-0.5 rounded-full font-semibold",
                  "lg:block", 
                  mobileOpen ? "block" : ""
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      {user && (
        <div className="px-3 py-4 border-t border-border-subtle shrink-0">
          <div className={cn("flex items-center gap-3 px-2 py-2 rounded-lg")}>
            <div className="w-8 h-8 bg-primary-soft rounded-full flex items-center justify-center shrink-0">
              <span className="text-xs font-semibold text-primary">
                {user.firstName?.[0]?.toUpperCase() ?? "U"}
              </span>
            </div>
            {(!collapsed || mobileOpen) && (
              <>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-heading truncate">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-muted truncate">{user.email}</p>
                </div>
                <button
                  onClick={logout}
                  title="Đăng xuất"
                  aria-label="Đăng xuất"
                  className="text-muted hover:text-error p-1.5 rounded-md hover:bg-error-soft transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </aside>
    </>
  );
}
