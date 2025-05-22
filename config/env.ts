import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: '.env.local' });
}

const requiredEnvKeys = [
  'NEXT_PUBLIC_BASE_URL',
  'DB_USER',
  'DB_HOST',
  'DB_PORT',
  'DB_NAME',
  'DB_SECRET_ID',
  'AWS_REGION',
  'NODE_ENV',
] as const;

type EnvKey = (typeof requiredEnvKeys)[number];

type EnvConfig = {
  [K in EnvKey]: string;
};

function loadEnv(keys: readonly string[]): EnvConfig {
  const config = {} as EnvConfig;

  keys.forEach(key => {
    const value = process.env[key];
    if (!value) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
    config[key as EnvKey] = value;
  });

  return config;
}

export const env: Partial<EnvConfig> =
  typeof window === 'undefined'
    ? loadEnv(requiredEnvKeys)
    : {
        NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL!,
      };
