// import { createClient } from '@supabase/supabase-js'
// import { Database } from '@/types/supabase'

// // 빌드 시에는 더미 값 사용, 런타임에서는 실제 값 사용
// function createSupabaseClient() {
//   // 빌드 시에는 더미 값 사용
//   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co'
//   const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-key'

//   // 클라이언트 사이드에서만 실제 검증
//   if (typeof window !== 'undefined') {
//     if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
//       console.warn('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
//     }
//     if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
//       console.warn('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
//     }
//   }

//   return createClient<Database>(supabaseUrl, supabaseKey, {
//     auth: {
//       persistSession: typeof window !== 'undefined',
//       autoRefreshToken: typeof window !== 'undefined',
//       detectSessionInUrl: typeof window !== 'undefined'
//     }
//   })
// }

// export const supabase = createSupabaseClient()