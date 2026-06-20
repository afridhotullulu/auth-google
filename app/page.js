"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: 20 }}>
      <h1>Welcome App</h1>
      <p>Silakan login untuk masuk dashboard</p>

      <Link href="/api/auth/signin">
        <button style={{ padding: 10 }}>
          Login dengan Google
        </button>
      </Link>
    </main>
  );
}