"use client";

import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <main style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      <p>Welcome: {session.user.email}</p>

      <button onClick={() => signOut()}>
        Logout
      </button>
    </main>
  );
}