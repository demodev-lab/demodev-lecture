"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  userName: string | null;
  login: (email: string, name?: string, stayLoggedIn?: boolean) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    // 컴포넌트 마운트 시 인증 상태 확인
    const authenticated = localStorage.getItem("user_authenticated") === "true";
    const email = localStorage.getItem("user_email");
    const name = localStorage.getItem("user_name");

    if (authenticated && email) {
      setIsAuthenticated(true);
      setUserEmail(email);
      setUserName(name);
    }

    // stay_logged_in이 없으면 로그아웃 처리
    const stayLoggedIn = localStorage.getItem("stay_logged_in") === "true";
    if (authenticated && !stayLoggedIn) {
      // 세션 기반 로그인의 경우, 브라우저 종료 시 로그아웃
      // 여기서는 간단하게 구현
    }
  }, []);

  const login = (email: string, name?: string, stayLoggedIn: boolean = false) => {
    localStorage.setItem("user_authenticated", "true");
    localStorage.setItem("user_email", email);
    localStorage.setItem("stay_logged_in", stayLoggedIn.toString());
    if (name) {
      localStorage.setItem("user_name", name);
    }
    setIsAuthenticated(true);
    setUserEmail(email);
    setUserName(name || null);
  };

  const logout = () => {
    localStorage.removeItem("user_authenticated");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_name");
    localStorage.removeItem("stay_logged_in");
    setIsAuthenticated(false);
    setUserEmail(null);
    setUserName(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userEmail,
        userName,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}