import { NextRequest, NextResponse } from 'next/server'
import { auth } from './auth'
import { decodeToken } from './utils/decode-token'

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/admin/login') || req.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  const session = await auth()
  const token = session?.user.accessToken
  const baseUrl = req.nextUrl.origin
  const callbackUrl = req.nextUrl.pathname

  if (token) {
    const decodedToken = decodeToken(token)
    if (decodedToken && decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
      return NextResponse.redirect(`${baseUrl}/admin/login?callbackUrl=${encodeURIComponent(callbackUrl)}`)
    }
  } else {
    return NextResponse.redirect(`${baseUrl}/admin/login?callbackUrl=${encodeURIComponent(callbackUrl)}`)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
