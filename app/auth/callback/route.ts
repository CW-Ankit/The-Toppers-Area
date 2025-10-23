import { NextResponse } from 'next/server'

export async function GET() {
  // Supabase handles the session via cookies in middleware
  return NextResponse.redirect(new URL('/protected', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'))
}
