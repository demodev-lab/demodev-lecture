import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// 런타임에서만 검증 (빌드 타임에는 환경변수가 없을 수 있음)
function validateEnvironmentVariables() {
  if (typeof window !== 'undefined' || process.env.NODE_ENV === 'production') {
    if (!supabaseUrl) {
      throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL')
    }
    if (!supabaseAnonKey) {
      throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY')
    }
  }
}

// 개발 환경에서만 검증
if (process.env.NODE_ENV !== 'test') {
  validateEnvironmentVariables()
}

export const supabase = createClient<Database>(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key',
  {
    auth: {
      persistSession: typeof window !== 'undefined',
      autoRefreshToken: typeof window !== 'undefined',
      detectSessionInUrl: typeof window !== 'undefined'
    }
  }
)