import { z } from 'zod'


// next-order

/* const configSchema = z.object({
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
  NEXT_PUBLIC_URL: z.string()
})

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL
}) */

// andes_cloud

const configSchema = z.object({
  NEXT_PUBLIC_VERSION: z.string(),
  NEXT_PUBLIC_ANDESCLOUD_UUID: z.string(),
  NEXT_PUBLIC_API_ENDPOINT: z.string(),
  NEXT_PUBLIC_PORTAL_UUID: z.string(),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string()
})

const configProject = configSchema.safeParse({
  NEXT_PUBLIC_VERSION: process.env.NEXT_PUBLIC_VERSION,
  NEXT_PUBLIC_ANDESCLOUD_UUID: process.env.NEXT_PUBLIC_ANDESCLOUD_UUID,
  NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  NEXT_PUBLIC_PORTAL_UUID: process.env.NEXT_PUBLIC_PORTAL_UUID,
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
})

if (!configProject.success) {
  throw new Error('Các giá trị khai báo trong file .env không hợp lệ')
}

const envConfig = configProject.data
export default envConfig
