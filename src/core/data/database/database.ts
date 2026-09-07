import * as SQLite from 'expo-sqlite';

let dbInstance: SQLite.SQLiteDatabase | null = null;

export async function getDatabaseInstance(): Promise<SQLite.SQLiteDatabase> {
  if (dbInstance) {
    return dbInstance;
  }

  dbInstance =  await SQLite.openDatabaseAsync('taskmanager.db');
    await dbInstance.execAsync(`
        PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      isCompleted INTEGER NOT NULL DEFAULT 0,
      createdAt INTEGER NOT NULL
    );
   `);

  return dbInstance;
} 