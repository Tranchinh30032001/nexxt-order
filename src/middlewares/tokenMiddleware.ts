import { NextFetchEvent, NextMiddleware, NextResponse } from "next/server";
import { NextRequest } from "next/server";

const protectedPath = ["/orders", "/dish", "/dashboard", "/accounts", "/"];
export const publicPath = ["/register", "/refresh-token"];

// This function can be marked `async` if using `await` inside
export function tokenMiddleware(middleware: NextMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname + request.nextUrl.search;
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    // check pathName is protectedPath
    const isProtectedRoute = protectedPath.some((item) =>
      item.startsWith(request.nextUrl.pathname)
    );

    // accessToken và refreshToken đều hết hạn
    if (isProtectedRoute && !accessToken && !refreshToken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // accessToken hết hạn còn refreshToken vẫn còn expiredd
    if (isProtectedRoute && !accessToken && refreshToken) {
      const url = new URL("/refresh-token", request.url);
      url.searchParams.set("redirect", pathname);
      url.searchParams.set("refreshToken", refreshToken);
      return NextResponse.redirect(url);
    }
    /*
   - Đăng nhập rồi và phiên còn có hiệu lực thì không cho vào login/register nữa
   - khi call api bị lỗi 401 khi mà accessToken vẫn hợp lệ => cho ra login luôn
   */
    if (accessToken && (pathname === "/login" || pathname === "/register")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return middleware(request, event);
  };
}
