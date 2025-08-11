import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

const formatErrors = z.treeifyError

if (!_env.success) {
  console.error('❌ Invalid environment variables', formatErrors(_env.error))
  throw new Error('Invalid environment variables.')
}

export const env = _env.data
