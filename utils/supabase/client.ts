import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/supabase'

export function createClient() {
  // 빌드 시 환경 변수가 없어도 빌드가 가능하도록 처리
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
  
  return createBrowserClient<Database>(
    supabaseUrl,
    supabaseAnonKey
  )
}