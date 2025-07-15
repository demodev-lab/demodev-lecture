"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // 인증 상태 확인
    const isAuthenticated = localStorage.getItem("admin_authenticated");
    
    if (isAuthenticated) {
      // 인증된 경우 대시보드로 이동
      router.push("/admin/dashboard");
    } else {
      // 인증되지 않은 경우 로그인 페이지로 이동
      router.push("/admin/login");
    }
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">리다이렉트 중...</p>
      </div>
    </div>
  );
}