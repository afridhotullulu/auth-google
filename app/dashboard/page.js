"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Dashboard() {
  const { data: session } = useSession();
  const [file, setFile] = useState(null);

  if (!session) {
    return <p>Loading...</p>;
  }

  const uploadFile = async () => {
    if (!file) return alert("Pilih file dulu");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Upload sukses!");
    } else {
      alert("Upload gagal");
    }
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Dashboard</h1>

      <p>Welcome: {session.user.email}</p>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
  <img
    src={session.user.image}
    alt="profile"
    width={50}
    height={50}
    style={{ borderRadius: "50%" }}
  />

  <div>
    <p><b>{session.user.name}</b></p>
    <p>{session.user.email}</p>
  </div>
</div>

      <button onClick={() => signOut()}>
        Logout
      </button>

      <hr />

      <h2>Upload File</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={uploadFile}>
        Upload File
      </button>
    </main>
  );
}