import { PrismaClient } from "@/generated/client";
import { envs } from "@/env";

function buildDatabaseUrl(): string {
  const host = envs.DB_HOST;
  const port = envs.DB_PORT || "5432";
  const user = encodeURIComponent(envs.DB_USER);
  const pass = encodeURIComponent(envs.DB_PASS);
  const db = envs.DB_NAME;
  return `postgresql://${user}:${pass}@${host}:${port}/${db}`;
}

const url = process.env.DATABASE_URL || buildDatabaseUrl();

export const prisma = new PrismaClient({
  datasources: {
    db: { url },
  },
});


