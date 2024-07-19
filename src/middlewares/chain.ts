import { NextMiddleware, NextResponse } from "next/server"

type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware

export const chainMiddleware = (
  functions: MiddlewareFactory[],
  index = 0
): NextMiddleware => {
  const currentMiddlware = functions[index]
  if (currentMiddlware) {
    const nextMiddleware = chainMiddleware(functions, index + 1)
    return currentMiddlware(nextMiddleware)
  }

  return () => NextResponse.next()
}
