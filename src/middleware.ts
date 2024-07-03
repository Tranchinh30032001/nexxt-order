import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// const protectedPath = ['/home', '/']
const publicPath = ['/login', '/register']

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isAuth = Boolean(request.cookies.get('accessToken')?.value)
  // Chưa đăng nhập thì không cho vào private paths
  if (!isAuth && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  // Đăng nhập rồi thì không cho vào login/register nữa
  else if (isAuth && publicPath.includes(pathname)) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/login', '/register', '/home']
}
