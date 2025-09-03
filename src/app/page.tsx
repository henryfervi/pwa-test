"use client";

import { useEffect, useState } from "react";
import { saveData, getAllData } from "./lib/indexedDb";
import Link from "next/link";

export default function Home() {
  const [items, setItems] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then(() => {
        console.log("✅ Service Worker listo (Next-PWA)");
      });
    }
    (async () => {
      const saved = await getAllData<string>();
      setItems(saved);
    })();
  }, []);

  const addItem = async () => {
    if (!newItem) return;
    await saveData(Date.now().toString(), newItem);
    const saved = await getAllData<string>();
    setItems(saved);
    setNewItem("");
  };

  return (
    <main className="p-6">
      <button>
        <Link href="/other-page">Go to OTHER PAGE</Link>
      </button>
      <h1 className="text-2xl font-bold">Offline Notes</h1>

      <div className="mt-4 flex gap-2">
        <input
          className="border px-2 py-1 rounded"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Write something..."
        />
        <button
          onClick={addItem}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Save
        </button>
      </div>

      <ul className="mt-6 space-y-2">
        {items.map((item, i) => (
          <li key={i} className="border p-2 rounded bg-gray-50">
            {item}
          </li>
        ))}
      </ul>
    </main>
  );
}
