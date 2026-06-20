"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  // ambil data file
  useEffect(() => {
    fetch("/api/upload")
      .then((res) => res.json())
      .then((data) => setFiles(data.files || []))
      .catch(() => setFiles([]));
  }, []);

  // loading state
  if (status === "loading") {
    return (
      <main style={{ padding: 20 }}>
        <p>Loading...</p>
      </main>
    );
  }

  // kalau belum login → langsung balik ke home (login page)
  if (!session) {
    return (
      <main style={{ padding: 20 }}>
        <p>Redirecting to login...</p>
        {typeof window !== "undefined" && (window.location.href = "/")}
      </main>
    );
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

    if (res.ok) {
      alert(`Upload sukses: ${data.file.name}`);
      setFiles(data.files);
    } else {
      alert("Upload gagal");
    }
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Dashboard</h1>

      <p>Welcome: {session.user.email}</p>

      {/* PROFILE */}
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

      {/* UPLOAD */}
      <h2>Upload File</h2>

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={uploadFile}>
        Upload File
      </button>

      <hr />

      {/* LIST FILE */}
      <h3>File yang sudah diupload:</h3>

      {files.length === 0 ? (
        <p>Belum ada file</p>
      ) : (
        <ul>
          {files.map((f, i) => (
            <li key={i}>
              📄 {f.name} - {f.size} bytes - {f.time}
            </li>
          ))}
        </ul>
      )}

      {/* LOGOUT */}
      <div style={{ marginTop: 40 }}>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          style={{
            padding: "10px 15px",
            backgroundColor: "red",
            color: "white",
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