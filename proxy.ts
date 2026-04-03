import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  // /my/* 경로는 쿠키에 Supabase 세션이 없으면 로그인 페이지로 리다이렉트
  if (request.nextUrl.pathname.startsWith('/my')) {
    const hasCookie =
      request.cookies.has('sb-access-token') ||
      request.cookies.has(`sb-${process.env.NEXT_PUBLIC_SUPABASE_URL?.split('//')[1]?.split('.')[0]}-auth-token`)

    if (!hasCookie) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
