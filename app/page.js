"use client";

import { signIn, signOut } from "next-auth/react";

export default function Home() {
  return (
    <main style={{ padding: 20 }}>
      <h1></h1>

      <button onClick={() => signIn("google")}>
        Login dengan Google
      </button>

      <button onClick={() => signOut()}>
        Logout
      </button>
    </main>
  );
}