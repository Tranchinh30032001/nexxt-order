import { chainMiddleware } from './middlewares/chain'
import { rewirteMiddleware } from './middlewares/rewriteMiddleware'
import { tokenMiddleware } from './middlewares/tokenMiddleware'

/*
  - Thứ tự chạy của chuỗi middleware là từ phải qua trái.
  - thứ tự index các bé thì độ ưu tiên và sẽ ghi đè lên các middleware sau
  (ví dụ cùng 1 logic triển khai ở tokenMiddleware và rewriteMiddleware thì logic ở tokenMiddleware sẽ ghi đề lên rewriteMiddleware)
*/
const middlewares = [tokenMiddleware, rewirteMiddleware]
export default chainMiddleware(middlewares)

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/login', '/orders', '/dashboard', '/dish', '/refresh-token', '/accounts']
}

