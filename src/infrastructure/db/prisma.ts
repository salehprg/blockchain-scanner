import { envs } from "@/env";
import { PrismaClient } from "@/generated/client";
import { PrismaPg } from '@prisma/adapter-pg';

function buildDatabaseUrl(): string {
  const host = envs.DB_HOST;
  const port = envs.DB_PORT || "5432";
  const user = encodeURIComponent(envs.DB_USER);
  const pass = encodeURIComponent(envs.DB_PASS);
  const db = envs.DB_NAME;
  return `postgresql://${user}:${pass}@${host}:${port}/${db}`;
}

const connectionString = process.env.DATABASE_URL || buildDatabaseUrl();

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
export { prisma };

