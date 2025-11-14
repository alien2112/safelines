import { NextRequest } from "next/server";
import { getDb } from "../../lib/mongodb";
import { getBucket, uploadImageToGridFS, ImageSection } from "../../lib/gridfs";
import crypto from "crypto";

export const runtime = "nodejs";

// List images by section (returns basic metadata and ids)
export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const section = searchParams.get("section") as ImageSection | null;
	const noCacheParam = searchParams.get("noCache");
	const noCache = noCacheParam === "1" || noCacheParam === "true";
	const db = await getDb();
	const files = db.collection("images.files");
	const query = section ? { "metadata.section": section } : {};

	if (noCache) {
		const results = await files
			.find(query, { projection: { filename: 1, length: 1, uploadDate: 1, contentType: 1, metadata: 1 } })
			.sort({ uploadDate: -1 })
			.limit(50)
			.toArray();

		return new Response(JSON.stringify(results), {
			status: 200,
			headers: {
				"content-type": "application/json",
				"cache-control": "no-store, no-cache, must-revalidate",
				"pragma": "no-cache",
				"expires": "0",
			},
		});
	}
	
	// Get the latest uploadDate for cache busting
	const latestUpload = await files
		.find(query)
		.sort({ uploadDate: -1 })
		.limit(1)
		.project({ uploadDate: 1 })
		.toArray();
	
	const maxUploadDate = latestUpload[0]?.uploadDate?.toISOString() || new Date().toISOString();
	
	// Generate ETag from the latest uploadDate
	const etag = `"${crypto.createHash('md5').update(`${section || 'all'}-${maxUploadDate}`).digest('hex').slice(0, 16)}"`;
	
	// Check If-None-Match header for cache validation
	const ifNoneMatch = req.headers.get('if-none-match');
	if (ifNoneMatch === etag) {
		return new Response(null, {
			status: 304,
			headers: {
				'ETag': etag,
				'Cache-Control': 'public, max-age=1800, s-maxage=1800, must-revalidate',
				'Last-Modified': new Date(maxUploadDate).toUTCString(),
			},
		});
	}
	
	const results = await files
		.find(query, { projection: { filename: 1, length: 1, uploadDate: 1, contentType: 1, metadata: 1 } })
		.sort({ uploadDate: -1 })
		.limit(50)
		.toArray();
	return new Response(JSON.stringify(results), { 
		status: 200, 
		headers: { 
			"content-type": "application/json",
			"cache-control": "public, max-age=1800, s-maxage=1800, must-revalidate",
			"ETag": etag,
			"Last-Modified": new Date(maxUploadDate).toUTCString(),
		} 
	});
}

// Upload image (multipart/form-data: file, section)
export async function POST(req: NextRequest) {
	const form = await req.formData();
	const file = form.get("file");
	const section = form.get("section") as ImageSection | null;
	if (!(file instanceof File)) {
		return new Response("file is required", { status: 400 });
	}
	const validSections = [
		"making-easy", "strategy-right", "blog", "hero-home", "hero-about",
		"about-milestone-1", "about-milestone-2", "about-milestone-3", "about-milestone-4",
		"about-feature-1", "about-feature-2", "about-feature-3", "about-feature-4",
		"services", "jobs", "core-service-customs", "core-service-transportation"
	];
	if (!section || !validSections.includes(section)) {
		return new Response("invalid section", { status: 400 });
	}
	const arrayBuffer = await file.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);
	const id = await uploadImageToGridFS(buffer, file.name || "upload", section, (file as any).type);
	return new Response(JSON.stringify({ id: String(id) }), { status: 201, headers: { "content-type": "application/json" } });
}


