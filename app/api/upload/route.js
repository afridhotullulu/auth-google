export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return Response.json({ error: "No file" }, { status: 400 });
    }

    // hanya ambil nama file (tanpa simpan)
    return Response.json({
      success: true,
      name: file.name,
      size: file.size,
      message: "Upload berhasil (demo)"
    });

  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}