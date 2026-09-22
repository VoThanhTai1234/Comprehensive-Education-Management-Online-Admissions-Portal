"use client";

import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { type User } from "@/types/auth";
import { type Role } from "@/lib/constants/roles";

/* ------------------------------------------------------------ */
/*  Mock user session for development (replaced by real auth later) */
/* ------------------------------------------------------------ */
const MOCK_USERS: Record<string, User> = {
  "admin@edums.edu.vn": {
    id: 1, email: "admin@edums.edu.vn",
    firstName: "Nguyễn", lastName: "Phước",
    roles: ["ACADEMIC_ADMIN"], status: "ACTIVE",
  },
  "sysadmin@edums.edu.vn": {
    id: 2, email: "sysadmin@edums.edu.vn",
    firstName: "Lê", lastName: "Hệ Thống",
    roles: ["SYSTEM_ADMIN"], status: "ACTIVE",
  },
  "tuyen-sinh@edums.edu.vn": {
    id: 3, email: "tuyen-sinh@edums.edu.vn",
    firstName: "Trần", lastName: "Tuyển Sinh",
    roles: ["ADMISSIONS_OFFICER"], status: "ACTIVE",
  },
  "teacher01@edums.edu.vn": {
    id: 4, email: "teacher01@edums.edu.vn",
    firstName: "Lê Văn", lastName: "Cường",
    roles: ["TEACHER"], status: "ACTIVE",
  },
  "student01@edums.edu.vn": {
    id: 5, email: "student01@edums.edu.vn",
    firstName: "Nguyễn Văn", lastName: "An",
    roles: ["STUDENT"], status: "ACTIVE",
  },
  "parent01@edums.edu.vn": {
    id: 6, email: "parent01@edums.edu.vn",
    firstName: "Nguyễn", lastName: "Phụ Huynh",
    roles: ["PARENT"], status: "ACTIVE",
  },
  "applicant01@edums.edu.vn": {
    id: 7, email: "applicant01@edums.edu.vn",
    firstName: "Trần", lastName: "Bình",
    roles: ["APPLICANT"], status: "ACTIVE",
  },
};

/* ------------------------------------------------------------ */
/*  Context types                                                 */
/* ------------------------------------------------------------ */
interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  primaryRole: Role | null;
  /** Mock login — accepts any email from MOCK_USERS, any password */
  login: (email: string, _password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/* ------------------------------------------------------------ */
/*  Provider                                                      */
/* ------------------------------------------------------------ */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(MOCK_USERS["sysadmin@edums.edu.vn"]);

  const login = useCallback(async (email: string, password: string) => {
    void password; // intentionally unused — replaced by real auth later
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 600));

    const found = MOCK_USERS[email.toLowerCase()];
    if (!found) {
      return { success: false, error: "Email hoặc mật khẩu không đúng." };
    }
    setUser(found);
    return { success: true };
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const primaryRole = user?.roles?.[0] ?? null;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, primaryRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

/* ------------------------------------------------------------ */
/*  Hook                                                          */
/* ------------------------------------------------------------ */
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
