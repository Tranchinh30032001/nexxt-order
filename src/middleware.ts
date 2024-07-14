import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedPath = ['/orders', '/dish', '/dashboard', '/accounts', '/']
export const publicPath = ['/register', '/refresh-token']

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname + request.nextUrl.search
  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value
  const isAuth = request.cookies.get('isLogin')?.value

  // check pathName is protectedPath
  const isProtectedRoute = protectedPath.some((item) => item.startsWith(request.nextUrl.pathname))

  // Đã đăng nhập nhưng accessToken và refreshToken đều hết hạn
  if (isAuth && isProtectedRoute && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/login?forceLogout=true', request.url))
  }

  // Đã đăng nhập nhưng accessToken hết hạn còn refreshToken vẫn còn expiredd
  if (isAuth && isProtectedRoute && !accessToken && refreshToken) {
    const url = new URL('/refresh-token', request.url)
    url.searchParams.set('redirect', pathname)
    url.searchParams.set('refreshToken', refreshToken)
    return NextResponse.redirect(url)
  }

  // Chưa đăng nhập thì không cho vào private paths
  else if (!isAuth && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  /*
   - Đăng nhập rồi và phiên còn có hiệu lực thì không cho vào login/register nữa
   - khi call api bị lỗi 401 khi mà accessToken vẫn hợp lệ => cho ra login luôn
   */
  else if (isAuth && accessToken && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/login', '/orders', '/dashboard', '/dish', '/refresh-token', '/accounts']
}
