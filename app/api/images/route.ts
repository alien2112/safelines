import { NextRequest } from "next/server";
import { getDb } from "../../lib/mongodb";
import { getBucket, uploadImageToGridFS, ImageSection } from "../../lib/gridfs";

export const runtime = "nodejs";

// List images by section (returns basic metadata and ids)
export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const section = searchParams.get("section") as ImageSection | null;
	const db = await getDb();
	const files = db.collection("images.files");
	const query = section ? { "metadata.section": section } : {};
	const results = await files
		.find(query, { projection: { filename: 1, length: 1, uploadDate: 1, contentType: 1, metadata: 1 } })
		.sort({ uploadDate: -1 })
		.limit(50)
		.toArray();
	return new Response(JSON.stringify(results), { status: 200, headers: { "content-type": "application/json" } });
}

// Upload image (multipart/form-data: file, section)
export async function POST(req: NextRequest) {
	const form = await req.formData();
	const file = form.get("file");
	const section = form.get("section") as ImageSection | null;
	if (!(file instanceof File)) {
		return new Response("file is required", { status: 400 });
	}
	if (!section || (section !== "making-easy" && section !== "strategy-right")) {
		return new Response("invalid section", { status: 400 });
	}
	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	const id = await uploadImageToGridFS(buffer, file.name || "upload", section, (file as any).type);
	return new Response(JSON.stringify({ id: String(id) }), { status: 201, headers: { "content-type": "application/json" } });
}


