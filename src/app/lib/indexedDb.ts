import { openDB, IDBPDatabase } from "idb";

interface MyDB {
  data: {
    key: string;
    value: any;
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

export async function saveData(key: string, value: any) {
  const db = await getDB();
  await db.put("data", value, key);
}

export async function getData<T = any>(key: string): Promise<T | null> {
  const db = await getDB();
  return (await db.get("data", key)) ?? null;
}

export async function getAllData<T = any>(): Promise<T[]> {
  const db = await getDB();
  return (await db.getAll("data")) as T[];
}

export async function deleteData(key: string) {
  const db = await getDB();
  await db.delete("data", key);
}
