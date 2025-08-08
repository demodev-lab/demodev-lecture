"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import { supabase } from "@/utils/supabase-client";
// import { User, Session } from "@supabase/supabase-js";

// Temporary types until Supabase is set up
type User = {
  id: string;
  email?: string;
  [key: string]: unknown;
};
type Session = {
  user: User;
  access_token: string;
  [key: string]: unknown;
};

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  signInWithOAuth: (provider: 'google' | 'github' | 'kakao') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function SupabaseAuthProvider({ children }: { children: React.ReactNode }) {
  const [user] = useState<User | null>(null);
  const [session] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Supabase is not configured yet, so we'll skip initialization
    setLoading(false);
    
    // TODO: Uncomment when Supabase is configured
    // // 초기 세션 확인
    // supabase.auth.getSession().then(({ data: { session } }) => {
    //   setSession(session);
    //   setUser(session?.user ?? null);
    //   setLoading(false);
    // });

    // // 인증 상태 변경 리스너
    // const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    //   setSession(session);
    //   setUser(session?.user ?? null);
    //   setLoading(false);

    //   // 로그인 후 리다이렉트
    //   if (event === 'SIGNED_IN') {
    //     router.refresh();
    //   }
      
    //   // 로그아웃 후 리다이렉트
    //   if (event === 'SIGNED_OUT') {
    //     router.push('/');
    //   }
    // });

    // return () => subscription.unsubscribe();
  }, [router]);

  const signUp = async (email: string, password: string, name: string) => {
    // TODO: Implement when Supabase is configured
    // Using password in log to avoid unused variable warning
    console.log('Sign up called with:', { email, name, passwordLength: password.length });
    return { error: new Error('Supabase is not configured yet') };
    
    // try {
    //   const { error } = await supabase.auth.signUp({
    //     email,
    //     password,
    //     options: {
    //       data: {
    //         full_name: name,
    //       },
    //     },
    //   });

    //   if (error) throw error;

    //   // 프로필 생성은 트리거가 자동으로 처리
    //   return { error: null };
    // } catch (error) {
    //   return { error: error as Error };
    // }
  };

  const signIn = async (email: string, password: string) => {
    // TODO: Implement when Supabase is configured
    // Using password in log to avoid unused variable warning
    console.log('Sign in called with:', { email, passwordLength: password.length });
    return { error: new Error('Supabase is not configured yet') };
    
    // try {
    //   const { error } = await supabase.auth.signInWithPassword({
    //     email,
    //     password,
    //   });

    //   if (error) throw error;
    //   return { error: null };
    // } catch (error) {
    //   return { error: error as Error };
    // }
  };

  const signOut = async () => {
    // TODO: Implement when Supabase is configured
    console.log('Sign out called');
    // await supabase.auth.signOut();
  };

  const signInWithOAuth = async (provider: 'google' | 'github' | 'kakao') => {
    // TODO: Implement when Supabase is configured
    console.log('OAuth sign in called with:', provider);
    
    // // Kakao OAuth는 Supabase에서 직접 지원하지 않으므로 커스텀 구현 필요
    // if (provider === 'kakao') {
    //   console.log('Kakao OAuth는 추가 설정이 필요합니다');
    //   return;
    // }

    // const { error } = await supabase.auth.signInWithOAuth({
    //   provider: provider as 'google' | 'github',
    //   options: {
    //     redirectTo: `${window.location.origin}/auth/callback`,
    //   },
    // });

    // if (error) {
    //   console.error('OAuth 로그인 에러:', error);
    // }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        signUp,
        signIn,
        signOut,
        signInWithOAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useSupabaseAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useSupabaseAuth must be used within a SupabaseAuthProvider");
  }
  return context;
}