import { envs } from "@/env";
import { Client } from "pg";

export async function ensureDatabase() {
  const {
    DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME
  } = envs;

  const admin = new Client({
    host: DB_HOST,
    port: Number(DB_PORT || 5432),
    user: DB_USER,
    password: DB_PASS,
    database: "postgres",      // connect to default catalog first
  });

  await admin.connect();
  try {
    const exists = await admin.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [DB_NAME]
    );
    if (exists.rowCount === 0) {
      await admin.query(`CREATE DATABASE ${DB_NAME}`);
      console.log(`[db] created database ${DB_NAME}`);
    } else {
      console.log(`[db] database ${DB_NAME} already exists`);
    }
  } finally {
    await admin.end();
  }
}
