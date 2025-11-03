import { NextRequest } from "next/server";
import { getBucket } from "../../../lib/gridfs";
import { ObjectId } from "mongodb";

export const runtime = "nodejs";

// Stream image by id
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params;
	const bucket = await getBucket();
	try {
		const fileId = new ObjectId(id);
		const files = bucket.s.db.collection(`${bucket.s.options.bucketName}.files`);
		const file = await files.findOne({ _id: fileId });
		if (!file) return new Response("Not found", { status: 404 });
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
				"cache-control": "public, max-age=3600",
			},
		});
	} catch {
		return new Response("Bad id", { status: 400 });
	}
}

// Delete image by id
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
	const { id } = params;
	const bucket = await getBucket();
	try {
		await bucket.delete(new ObjectId(id));
		return new Response(null, { status: 204 });
	} catch {
		return new Response("Bad id", { status: 400 });
	}
}


