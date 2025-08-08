// import { createClient } from '@supabase/supabase-js'
// import { Database } from '@/types/supabase'

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// // 런타임 환경변수 검증 함수
// function getSupabaseCredentials() {
//   const url = process.env.NEXT_PUBLIC_SUPABASE_URL
//   const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
//   // 빌드 타임이 아닌 실제 사용 시에만 검증
//   if (typeof window !== 'undefined') {
//     if (!url || url === 'https://placeholder.supabase.co') {
//       console.error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
//     }
//     if (!key || key === 'placeholder-key') {
//       console.error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
//     }
//   }
  
//   return { url: url || supabaseUrl, key: key || supabaseAnonKey }
// }

// const credentials = getSupabaseCredentials()

// export const supabase = createClient<Database>(
//   credentials.url,
//   credentials.key,
//   {
//     auth: {
//       persistSession: typeof window !== 'undefined',
//       autoRefreshToken: typeof window !== 'undefined',
//       detectSessionInUrl: typeof window !== 'undefined'
//     }
//   }
// )