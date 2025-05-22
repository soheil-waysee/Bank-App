import { Sequelize } from 'sequelize';
import pg from 'pg';
import { getAwsSecret } from '@/lib/awsSecrets';
import { env } from '@/config/env';

export const sequelize = await (async () => {
  const { database, username, password, host, port } = await getAwsSecret<{
    username: string;
    password: string;
    host: string;
    port: number;
    database: string;
  }>(env.DB_SECRET_ID!);

  return new Sequelize(database, username, password, {
    host,
    port,
    dialect: 'postgres',
    dialectModule: pg,
    logging: false,
  });
})();
