let files = [];

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return Response.json({ error: "No file" }, { status: 400 });
  }

  const newFile = {
    name: file.name,
    size: file.size,
    time: new Date().toLocaleString(),
  };

  files.push(newFile);

  return Response.json({
    success: true,
    file: newFile,
    files,
  });
}

export async function GET() {
  return Response.json({ files });
}