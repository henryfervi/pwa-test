import { openDB, IDBPDatabase } from "idb";

interface MyDB {
  data: {
    key: string;
    value: unknown;
  };
}

let db: IDBPDatabase<MyDB> | null = null;

export async function getDB() {
  if (!db) {
    db = await openDB<MyDB>("my-next-pwa-db", 1, {
      upgrade(db) {
        db.createObjectStore("data");
      },
    });
  }
  return db;
}

export async function saveData(key: string, value: unknown) {
  const db = await getDB();
  await db.put("data", value, key);
}

export async function getData<T = unknown>(key: string): Promise<T | null> {
  const db = await getDB();
  return (await db.get("data", key)) ?? null;
}

export async function getAllData<T = unknown>(): Promise<T[]> {
  const db = await getDB();
  return (await db.getAll("data")) as T[];
}

export async function deleteData(key: string) {
  const db = await getDB();
  await db.delete("data", key);
}
