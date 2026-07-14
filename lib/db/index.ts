import type { schema as schemaType } from './schema';
import type { drizzle as DrizzleType } from 'drizzle-orm/better-sqlite3';
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

let _db: BetterSQLite3Database<typeof schemaType> | null = null;

export function getDb() {
  if (_db) return _db;
  try {
    const { drizzle } = require('drizzle-orm/better-sqlite3') as { drizzle: typeof DrizzleType };
    const Database = require('better-sqlite3') as typeof import('better-sqlite3').default;
    const sqlite = new Database(process.env.DATABASE_URL || 'local.db');
    sqlite.pragma('journal_mode = WAL');
    _db = drizzle(sqlite, { schema: require('./schema').schema, logger: process.env.NODE_ENV === 'development' }) as BetterSQLite3Database<typeof schemaType>;
    return _db;
  } catch (e) {
    console.warn('Database not available:', (e as Error).message);
    return null;
  }
}

export const db = getDb();

export type DB = NonNullable<ReturnType<typeof getDb>>;
