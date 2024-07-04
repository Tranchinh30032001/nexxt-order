import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// const protectedPath = ['/home', '/']
const publicPath = ['/register']

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken = request.cookies.get('accessToken')?.value
  const isAuth = request.cookies.get('isLogin')?.value

  // Đã đăng nhập nhưng accessToken hết hạn
  if (isAuth && !pathname.startsWith('/login') && !accessToken) {
    return NextResponse.redirect(new URL('/login?forceLogout=true', request.url))
  }

  // Chưa đăng nhập thì không cho vào private paths
  else if (!isAuth && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  /*
   - Đăng nhập rồi và phiên còn có hiệu lực thì không cho vào login/register nữa
   - khi call api bị lỗi 401 khi mà accessToken vẫn hợp lệ => cho ra login luôn
   */
  else if (accessToken && publicPath.includes(pathname) && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/login', '/register', '/home', '/manage/dashboard']
}
