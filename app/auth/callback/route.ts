import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  // Redirect to home page with query parameters preserved
  // The actual auth handling will be done client-side
  const url = new URL('/', request.url)
  url.search = request.nextUrl.search
  
  return NextResponse.redirect(url)
}