"use client";

import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Dashboard() {
  const [file, setFile] = useState(null);

  const { data: session, status } = useSession();

if (status === "loading") {
  return <p>Loading...</p>;
}

if (!session) {
  return <p>Not logged in</p>;
}

  const uploadFile = async () => {
  if (!file) return alert("Pilih file dulu");

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  console.log(data);

  if (res.ok) {
  alert(`Upload sukses: ${data.name}`);
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

    {/* 👇 INI LOGOUT DI PALING BAWAH */}
    <div style={{ marginTop: 40, padding: 15, border: "1px solid #ddd", borderRadius: 10 }}>
      <p style={{ marginBottom: 10 }}>Sudah selesai? Logout dulu ya</p>

      <button
        onClick={() => signOut()}
        style={{
          padding: "10px 15px",
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: 8,
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </div>
  </main>
);
}