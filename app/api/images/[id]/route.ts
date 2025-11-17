import { NextRequest } from "next/server";
import { getBucket } from "../../../lib/gridfs";
import { getDb } from "../../../lib/mongodb";
import { ObjectId } from "mongodb";
import crypto from "crypto";

export const runtime = "nodejs";

// Stream image by id
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const bucket = await getBucket();
    try {
        const fileId = new ObjectId(id);
        const cursor = bucket.find({ _id: fileId });
        const file = await cursor.next();
        if (!file) return new Response("Not found", { status: 404 });
        
        // Generate ETag from uploadDate for cache busting
        const uploadDate = file.uploadDate?.toISOString() || new Date().toISOString();
        const etag = `"${crypto.createHash('md5').update(`${id}-${uploadDate}`).digest('hex')}"`;
        
        // Check If-None-Match header for cache validation
        const ifNoneMatch = req.headers.get('if-none-match');
        if (ifNoneMatch === etag) {
            return new Response(null, {
                status: 304,
                headers: {
                    'ETag': etag,
                    'Cache-Control': 'public, max-age=1800, s-maxage=1800, must-revalidate',
                    'Last-Modified': file.uploadDate?.toUTCString() || new Date().toUTCString(),
                },
            });
        }
        
        const stream = bucket.openDownloadStream(fileId);
		const readableStream = stream as unknown as NodeJS.ReadableStream;
		const body = new ReadableStream({
			start(controller) {
				readableStream.on("data", (chunk: Buffer) => controller.enqueue(chunk));
				readableStream.on("end", () => controller.close());
				readableStream.on("error", (err: Error) => controller.error(err));
			},
		});
		return new Response(body, {
			headers: {
				"content-type": file.contentType || "application/octet-stream",
				"cache-control": "public, max-age=1800, s-maxage=1800, must-revalidate",
				"ETag": etag,
				"Last-Modified": file.uploadDate?.toUTCString() || new Date().toUTCString(),
			},
		});
	} catch {
		return new Response("Bad id", { status: 400 });
	}
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	let payload: { order?: number } = {};
	try {
		payload = await req.json();
	} catch {
		return new Response(JSON.stringify({ message: "Invalid JSON body" }), {
			status: 400,
			headers: { "content-type": "application/json" },
		});
	}

	if (typeof payload.order !== "number" || Number.isNaN(payload.order)) {
		return new Response(JSON.stringify({ message: "order must be a number" }), {
			status: 400,
			headers: { "content-type": "application/json" },
		});
	}

	const db = await getDb();
	try {
		const result = await db.collection("images.files").updateOne(
			{ _id: new ObjectId(id) },
			{ $set: { "metadata.order": payload.order } }
		);

		if (result.matchedCount === 0) {
			return new Response(JSON.stringify({ message: "Image not found" }), {
				status: 404,
				headers: { "content-type": "application/json" },
			});
		}

		return new Response(JSON.stringify({ order: payload.order }), {
			status: 200,
			headers: { "content-type": "application/json" },
		});
	} catch {
		return new Response(JSON.stringify({ message: "Bad id" }), {
			status: 400,
			headers: { "content-type": "application/json" },
		});
	}
}

// Delete image by id
export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const { id } = await params;
	const bucket = await getBucket();
	try {
		await bucket.delete(new ObjectId(id));
		return new Response(null, { status: 204 });
	} catch {
		return new Response("Bad id", { status: 400 });
	}
}


