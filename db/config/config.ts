import { env } from '../../config/env';

export const development = {
  username: env.DB_USER,
  password: '',
  database: env.DB_NAME,
  BASE_URL: env.NEXT_PUBLIC_BASE_URL,
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  dialect: 'postgres',
};
