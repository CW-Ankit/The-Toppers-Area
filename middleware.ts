// /middleware.ts
import { NextRequest } from 'next/server'
import { updateSession } from '@/utils/supabase/supabaseMiddleware'

export async function middleware(request: NextRequest) {
  return updateSession(request)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}