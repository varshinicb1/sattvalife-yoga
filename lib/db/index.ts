import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import type { DrizzleD1Database } from 'drizzle-orm/d1';
import { schema } from './schema';

export type DB = DrizzleD1Database<typeof schema> | BetterSQLite3Database<typeof schema>;

let _db: DB | null = null;

export async function getDb(): Promise<DB> {
  if (_db) return _db;

  if (typeof process !== 'undefined' && process.env && 'DB' in process.env) {
    const { drizzle } = await import('drizzle-orm/d1');
    _db = drizzle(process.env.DB as unknown as D1Database, {
      schema,
      logger: process.env.NODE_ENV === 'development',
    }) as unknown as DB;
    return _db;
  }

  const Database = (await import('better-sqlite3')).default;
  const { drizzle } = await import('drizzle-orm/better-sqlite3');
  const dbPath = process.env.DATABASE_URL?.replace(/^file:/, '') || 'local.db';
  const sqlite = new Database(dbPath, { timeout: 10000 });
  sqlite.pragma('journal_mode = WAL');
  _db = drizzle(sqlite, { schema, logger: process.env.NODE_ENV === 'development' }) as unknown as DB;
  return _db;
}