import { z } from 'zod';

const envSchema = z
  .object({
    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),
    PORT: z.coerce.number().int().positive().default(3000),
    DATABASE_URL: z.url(),
    // Comma-separated list of allowed origins. Empty disables CORS.
    CORS_ORIGIN: z.string().default(''),
  })
  .refine((env) => env.NODE_ENV !== 'production' || env.CORS_ORIGIN !== '', {
    message: 'CORS_ORIGIN is required in production',
    path: ['CORS_ORIGIN'],
  });

export type Env = z.infer<typeof envSchema>;

export function validate(config: Record<string, unknown>): Env {
  const result = envSchema.safeParse(config);
  if (!result.success) {
    throw new Error(
      `Invalid environment variables:\n${z.prettifyError(result.error)}`,
    );
  }
  return result.data;
}
