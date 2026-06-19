import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file) {
    return Response.json({ error: "No file" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const filePath = path.join(process.cwd(), "uploads", file.name);

  await writeFile(filePath, buffer);

  return Response.json({ success: true });
}