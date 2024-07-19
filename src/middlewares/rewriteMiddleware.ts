import { NextFetchEvent, NextMiddleware, NextRequest, NextResponse } from "next/server";

export const rewirteMiddleware = (middleware: NextMiddleware) => {
  return async (request: NextRequest, event: NextFetchEvent) => {
    const pathName = request.nextUrl.pathname
    // if (pathName === '/dish') {
    //   return NextResponse.rewrite(new URL('/accounts', request.url))
    // }
    return middleware(request, event)
  }
}
