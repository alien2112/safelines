import { NextRequest, NextResponse } from "next/server";
import { readFileSync, statSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";

const VIDEO_MAP: Record<string, string> = {
	"hero-animations.mp4": "hero-animations.mp4",
	"2025-11-03 18-45-55.mp4": "2025-11-03 18-45-55.mp4",
	"2025-11-03 18-02-55.mp4": "2025-11-03 18-02-55.mp4",
};

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ video: string }> }
) {
	const { video } = await params;
	const videoName = decodeURIComponent(video);
	const fileName = VIDEO_MAP[videoName];

	if (!fileName) {
		return new NextResponse("Video not found", { status: 404 });
	}

	try {
		const filePath = join(process.cwd(), "public", fileName);
		const stats = statSync(filePath);
		const fileBuffer = readFileSync(filePath);

		// Support range requests for better video playback
		const range = req.headers.get("range");
		const headers = {
			"Content-Type": "video/mp4",
			"Cache-Control": "public, max-age=31536000, immutable", // 1 year
			"Content-Length": fileBuffer.length.toString(),
			"Accept-Ranges": "bytes",
			"ETag": `"${stats.mtime.getTime()}-${stats.size}"`,
			"Last-Modified": stats.mtime.toUTCString(),
		};

		if (range) {
			const parts = range.replace(/bytes=/, "").split("-");
			const start = parseInt(parts[0], 10);
			const end = parts[1] ? parseInt(parts[1], 10) : fileBuffer.length - 1;
			const chunk = fileBuffer.slice(start, end + 1);
			const contentLength = end - start + 1;

			return new NextResponse(chunk, {
				status: 206,
				headers: {
					...headers,
					"Content-Range": `bytes ${start}-${end}/${fileBuffer.length}`,
					"Content-Length": contentLength.toString(),
				},
			});
		}

		return new NextResponse(fileBuffer, {
			headers,
		});
	} catch (error) {
		return new NextResponse("Video not found", { status: 404 });
	}
}

