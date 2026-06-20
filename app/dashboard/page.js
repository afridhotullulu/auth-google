"use client";

import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  const { data: session, status } = useSession();

  // loading state
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // not logged in
  if (!session) {
    return <p>Not logged in</p>;
  }

  // load file list
  useEffect(() => {
    fetch("/api/upload")
      .then((res) => res.json())
      .then((data) => setFiles(data.files || []));
  }, []);

  // upload function
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
      alert(`Upload sukses: ${data.file.name}`);
      setFiles(data.files);
    } else {
      alert("Upload gagal");
    }
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Dashboard</h1>

      {/* USER INFO */}
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

      {/* FILE LIST */}
      <hr />

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