// app/sw-register.tsx
"use client";

import { useEffect } from "react";

export default function SWRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(
        (reg) => console.log("SW registrado:", reg),
        (err) => console.error("Error SW:", err)
      );
    }
  }, []);

  return null;
}
