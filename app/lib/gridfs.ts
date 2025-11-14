import { GridFSBucket, ObjectId } from "mongodb";
import { getDb } from "./mongodb";

export async function getBucket() {
	const db = await getDb();
	return new GridFSBucket(db, { bucketName: "images" });
}

export type ImageSection = "making-easy" | "strategy-right" | "blog" | "hero-home" | "hero-about" | 
	"about-milestone-1" | "about-milestone-2" | "about-milestone-3" | "about-milestone-4" |
	"about-feature-1" | "about-feature-2" | "about-feature-3" | "about-feature-4" | "services" | "jobs" |
	"core-service-customs" | "core-service-transportation";

export async function uploadImageToGridFS(
	buffer: Buffer,
	filename: string,
	section: ImageSection,
	mimeType?: string
): Promise<ObjectId> {
	const bucket = await getBucket();
	return await new Promise((resolve, reject) => {
		const uploadStream = bucket.openUploadStream(filename, {
			contentType: mimeType,
			metadata: { section },
		});
		uploadStream.end(buffer, (err?: Error | null) => {
			if (err) return reject(err);
			resolve(uploadStream.id as ObjectId);
		});
	});
}

export async function deleteImage(fileId: string) {
	const bucket = await getBucket();
	await bucket.delete(new ObjectId(fileId));
}


