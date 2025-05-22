import { config as loadEnv } from 'dotenv';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';
import { env } from '@/config/env';

loadEnv({ path: '.env.local' });

const isLocal = env.NODE_ENV === 'development';

export type DatabaseConfig = {
  username: string;
  password: string;
  host: string;
  port: number;
  database: string;
};

const cache: Record<string, DatabaseConfig> = {};

const client = new SecretsManagerClient({ region: env.AWS_REGION });

export async function getAwsSecret(secretName: string): Promise<DatabaseConfig> {
  if (isLocal) {
    return {
      username: env.DB_USER!,
      password: '',
      host: env.DB_HOST!,
      port: Number(env.DB_PORT),
      database: env.DB_NAME!,
    };
  }

  if (cache[secretName]) {
    return cache[secretName];
  }

  const command = new GetSecretValueCommand({ SecretId: secretName });
  const response = await client.send(command);

  if (!response.SecretString) {
    throw new Error(`Secret "${secretName}" is empty or not found`);
  }

  const parsed = JSON.parse(response.SecretString);
  cache[secretName] = parsed;
  return parsed;
}
