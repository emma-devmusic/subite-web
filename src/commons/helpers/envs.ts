
// Environment variables configuration for Client (Next.js)
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://acstapi.ding.com.ar/api/v1'
export const APP_BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL || 'http://localhost:3000'
export const DASHBOARD_BASE_URL = process.env.NEXT_PUBLIC_DASHBOARD_BASE_URL || 'https://admin-auctions-three.vercel.app/'
export const tenant_id = process.env.NEXT_PUBLIC_API_TENANT || '1'
export const public_bucket = process.env.NEXT_PUBLIC_S3_PUBLIC_BUCKET || 'localpublic'
export const access_key_id = process.env.NEXT_PUBLIC_S3_ACCESS_KEY || ''
export const secret_access_key = process.env.NEXT_PUBLIC_S3_SECRET_ACCESS || ''
export const s3_region = process.env.NEXT_PUBLIC_S3_REGION || 'us-east-1'
export const access = process.env.NEXT_PUBLIC_SESSION || ''
export const server_secret = process.env.NEXT_PUBLIC_SERVER_SECRET || ''
export const server_algorithm = process.env.NEXT_PUBLIC_SERVER_ALGORITHM || 'aes-256-cbc'
export const verify = process.env.NEXT_PUBLIC_VERIFY || 'xx-em-xx'
export const cookie_domain = process.env.NEXT_PUBLIC_COOKIE_DOMAIN || 'localhost'

// Export for easier usage
export const ENV = {
  API_BASE_URL,
  APP_BASE_URL,
  DASHBOARD_BASE_URL,
  tenant_id,
  public_bucket,
  access_key_id,
  secret_access_key,
  s3_region,
  access,
  server_secret,
  server_algorithm,
  verify,
  cookie_domain,
} as const