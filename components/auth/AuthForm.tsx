"use client";

import { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

interface AuthFormProps {
  mode: "login" | "signup";
  onModeChange: (mode: "login" | "signup") => void;
  onSuccess: () => void;
}

export default function AuthForm({ mode, onModeChange, onSuccess }: AuthFormProps) {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "login") {
        // TODO: 실제 로그인 API 연동 필요
        // 현재는 test@demodev.com / test123 을 임시 인증 정보로 사용
        if (email === "test@demodev.com" && password === "test123") {
          login(email, undefined, stayLoggedIn);
          onSuccess();
        } else {
          setError("이메일 또는 비밀번호가 올바르지 않습니다.");
        }
      } else {
        // 회원가입 처리
        if (password !== passwordConfirm) {
          setError("비밀번호가 일치하지 않습니다.");
          return;
        }
        if (!agreeTerms) {
          setError("약관에 동의해주세요.");
          return;
        }
        // 임시 회원가입 처리
        login(email, name);
        onSuccess();
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setError("오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = (provider: string) => {
    // OAuth 로그인 처리 (추후 구현)
    console.log(`${provider} 로그인`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* OAuth 로그인 버튼들 */}
      <div className="space-y-3">
        {/* 카카오 로그인 메인 버튼 */}
        <button
          type="button"
          onClick={() => handleOAuthLogin("kakao")}
          className="w-full bg-[#FEE500] hover:bg-[#FDD835] text-black font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
            <path
              d="M10 3C5.03 3 1 6.09 1 9.87c0 2.45 1.68 4.6 4.21 5.8-.14.49-.89 3.18-.92 3.39 0 0-.02.16.08.22.1.06.22.01.22.01.29-.04 3.36-2.19 3.89-2.56.47.06.97.1 1.52.1 4.97 0 9-3.09 9-6.87S14.97 3 10 3z"
              fill="currentColor"
            />
          </svg>
          카카오로 3초만에 시작하기
        </button>

        {/* 기타 OAuth 로그인 아이콘 */}
        <div className="flex justify-center gap-4">
          {/* 네이버 */}
          <button
            type="button"
            onClick={() => handleOAuthLogin("naver")}
            className="w-12 h-12 bg-[#03C75A] hover:bg-[#02B550] rounded-full flex items-center justify-center transition-colors"
            aria-label="네이버 로그인"
          >
            <span className="text-white font-bold text-lg">N</span>
          </button>

          {/* 구글 */}
          <button
            type="button"
            onClick={() => handleOAuthLogin("google")}
            className="w-12 h-12 bg-white hover:bg-gray-50 border border-gray-300 rounded-full flex items-center justify-center transition-colors"
            aria-label="구글 로그인"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </button>

          {/* 애플 */}
          <button
            type="button"
            onClick={() => handleOAuthLogin("apple")}
            className="w-12 h-12 bg-black hover:bg-gray-900 rounded-full flex items-center justify-center transition-colors"
            aria-label="애플 로그인"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* 구분선 */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">또는</span>
        </div>
      </div>

      {/* 이메일/비밀번호 폼 */}
      <div className="space-y-4">
        {mode === "signup" && (
          <div>
            <label htmlFor="name" className="sr-only">
              이름
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required={mode === "signup"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 py-3 pr-3 pl-10 text-gray-900 placeholder-gray-500 focus:border-brand-500 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                placeholder="이름"
              />
            </div>
          </div>
        )}

        <div>
          <label htmlFor="email" className="sr-only">
            이메일
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 py-3 pr-3 pl-10 text-gray-900 placeholder-gray-500 focus:border-brand-500 focus:ring-2 focus:ring-brand-500 focus:outline-none"
              placeholder="이메일 또는 아이디"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            비밀번호
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 py-3 pr-10 pl-10 text-gray-900 placeholder-gray-500 focus:border-brand-500 focus:ring-2 focus:ring-brand-500 focus:outline-none"
              placeholder="비밀번호"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>

        {mode === "signup" && (
          <div>
            <label htmlFor="passwordConfirm" className="sr-only">
              비밀번호 확인
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type={showPasswordConfirm ? "text" : "password"}
                autoComplete="new-password"
                required={mode === "signup"}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 py-3 pr-10 pl-10 text-gray-900 placeholder-gray-500 focus:border-brand-500 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                placeholder="비밀번호 확인"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                aria-label={showPasswordConfirm ? "비밀번호 확인 숨기기" : "비밀번호 확인 보기"}
              >
                {showPasswordConfirm ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 체크박스 */}
      {mode === "login" ? (
        <div className="flex items-center">
          <input
            id="stay-logged-in"
            name="stay-logged-in"
            type="checkbox"
            checked={stayLoggedIn}
            onChange={(e) => setStayLoggedIn(e.target.checked)}
            className="h-4 w-4 text-brand-500 focus:ring-brand-500 border-gray-300 rounded"
          />
          <label htmlFor="stay-logged-in" className="ml-2 block text-sm text-gray-900">
            로그인 상태 유지
          </label>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="h-4 w-4 text-brand-500 focus:ring-brand-500 border-gray-300 rounded"
            />
            <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900">
              이용약관 및 개인정보처리방침에 동의합니다
            </label>
          </div>
        </div>
      )}

      {/* 에러 메시지 */}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* 제출 버튼 */}
      <button
        type="submit"
        disabled={loading || !email || !password || (mode === "signup" && (!name || !passwordConfirm || !agreeTerms))}
        className="w-full bg-brand-500 hover:bg-brand-600 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:outline-none"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg
              className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            처리중...
          </span>
        ) : (
          mode === "login" ? "로그인" : "이메일 회원가입"
        )}
      </button>

      {/* 하단 링크 */}
      <div className="text-center space-y-2">
        {mode === "login" && (
          <div className="text-sm text-gray-600">
            <button
              type="button"
              className="hover:text-brand-500 transition-colors"
              onClick={() => {
                onSuccess(); // 모달 닫기
                router.push("/find");
              }}
            >
              아이디 찾기
            </button>
            <span className="mx-2">|</span>
            <button
              type="button"
              className="hover:text-brand-500 transition-colors"
              onClick={() => {
                onSuccess(); // 모달 닫기
                router.push("/find/pw");
              }}
            >
              비밀번호 찾기
            </button>
          </div>
        )}
        
        <div className="text-sm">
          <span className="text-gray-600">
            {mode === "login" ? "아직 회원이 아니신가요?" : "이미 회원가입 하셨나요?"}
          </span>{" "}
          <button
            type="button"
            className="text-brand-500 hover:text-brand-600 font-medium transition-colors"
            onClick={() => {
              if (mode === "login") {
                onSuccess(); // 모달 닫기
                router.push("/signup");
              } else {
                onModeChange("login");
              }
            }}
          >
            {mode === "login" ? "이메일 회원가입" : "로그인하기"}
          </button>
        </div>
      </div>
    </form>
  );
}