import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";

const VIDEO_MAP: Record<string, string> = {
	"hero-animations.mp4": "hero-animations.mp4",
	"2025-11-03 18-45-55.mp4": "2025-11-03 18-45-55.mp4",
	"2025-11-03 18-02-55.mp4": "2025-11-03 18-02-55.mp4",
};

export async function GET(
	_: NextRequest,
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
		const fileBuffer = readFileSync(filePath);

		return new NextResponse(fileBuffer, {
			headers: {
				"Content-Type": "video/mp4",
				"Cache-Control": "public, max-age=31536000, immutable", // 1 year
				"Content-Length": fileBuffer.length.toString(),
			},
		});
	} catch (error) {
		return new NextResponse("Video not found", { status: 404 });
	}
}

