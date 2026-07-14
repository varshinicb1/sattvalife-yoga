import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { schema } from './schema';

export function createDb() {
  const sqlite = new Database(process.env.DATABASE_URL || 'local.db');
  sqlite.pragma('journal_mode = WAL');
  return drizzle(sqlite, { schema, logger: process.env.NODE_ENV === 'development' });
}

let _db: ReturnType<typeof createDb> | null = null;
export function getDb() {
  if (!_db) _db = createDb();
  return _db;
}

export const db = getDb();

export type DB = ReturnType<typeof getDb>;
