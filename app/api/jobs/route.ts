import { NextRequest } from "next/server";
import { getDb } from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import crypto from "crypto";

export const runtime = "nodejs";

// Get all job postings
export async function GET(req: NextRequest) {
	try {
		const db = await getDb();
		const jobs = db.collection("jobs");
		
		// Check if this is an admin request (for unpublished jobs)
		const { searchParams } = new URL(req.url);
		const includeUnpublished = searchParams.get('includeUnpublished') === 'true';
		
		// Use aggregation pipeline for optimized query
		const pipeline = [
			// Filter published jobs in database (unless admin request)
			...(includeUnpublished ? [] : [{ $match: { published: true } }]),
			// Sort by createdAt descending
			{ $sort: { createdAt: -1 } },
			// Project only needed fields
			{
				$project: {
					_id: 1,
					title: 1,
					titleAr: 1,
					description: 1,
					descriptionAr: 1,
					image: 1,
					published: 1,
					createdAt: 1,
					updatedAt: 1,
				},
			},
			// Add latest update timestamp for cache busting
			{
				$facet: {
					jobs: [{ $match: {} }],
					metadata: [
						{ $group: { _id: null, maxUpdatedAt: { $max: "$updatedAt" } } },
					],
				},
			},
		];
		
		const [result] = await jobs.aggregate(pipeline).toArray();
		const results = result?.jobs || [];
		const maxUpdatedAt = result?.metadata?.[0]?.maxUpdatedAt || new Date().toISOString();
		
		// Generate ETag from the latest updatedAt
		const etag = `"${crypto.createHash('md5').update(String(maxUpdatedAt)).digest('hex').slice(0, 16)}"`;
		
		// Check If-None-Match header for cache validation
		const ifNoneMatch = req.headers.get('if-none-match');
		if (ifNoneMatch === etag) {
			return new Response(null, {
				status: 304,
				headers: {
					'ETag': etag,
					'Cache-Control': 'public, max-age=300, s-maxage=600, stale-while-revalidate=1800',
					'Last-Modified': new Date(maxUpdatedAt).toUTCString(),
				},
			});
		}
		
		return new Response(JSON.stringify(results), {
			status: 200,
			headers: {
				"content-type": "application/json",
				'Cache-Control': 'public, max-age=300, s-maxage=600, stale-while-revalidate=1800',
				'ETag': etag,
				'Last-Modified': new Date(maxUpdatedAt).toUTCString(),
			},
		});
	} catch (error: any) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { "content-type": "application/json" },
		});
	}
}

// Create or update a job posting
export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData();
		const db = await getDb();
		const jobs = db.collection("jobs");
		const images = db.collection("images.files");

		const id = formData.get("id") as string | null;
		const title = formData.get("title") as string;
		const titleAr = formData.get("titleAr") as string;
		const description = formData.get("description") as string;
		const descriptionAr = formData.get("descriptionAr") as string;
		const published = formData.get("published") === "true";
		const file = formData.get("file") as File | null;

		if (!title || !titleAr || !description || !descriptionAr) {
			return new Response(JSON.stringify({ error: "Title and description (both languages) are required" }), {
				status: 400,
				headers: { "content-type": "application/json" },
			});
		}

		let imageUrl: string | undefined;

		// Handle image upload if provided
		if (file && file instanceof File && file.size > 0) {
			const { getBucket, uploadImageToGridFS } = await import("../../lib/gridfs");
			const arrayBuffer = await file.arrayBuffer();
			const buffer = Buffer.from(arrayBuffer);
			const imageId = await uploadImageToGridFS(buffer, file.name || "job-image", "jobs", file.type);
			imageUrl = `/api/images/${imageId}`;
		} else if (id) {
			// If updating and no new image, keep existing image
			const existing = await jobs.findOne({ _id: new ObjectId(id) });
			if (existing) {
				imageUrl = existing.image;
			}
		}

		const jobData: any = {
			title,
			titleAr,
			description,
			descriptionAr,
			published,
			updatedAt: new Date().toISOString(),
		};

		if (imageUrl) {
			jobData.image = imageUrl;
		}

		if (id) {
			// Update existing job
			let query: any;
			try {
				query = { _id: new ObjectId(id) };
			} catch {
				query = { id: id };
			}
			const result = await jobs.updateOne(
				query,
				{ $set: jobData }
			);
			// If no document found by _id, try creating new one
			if (result.matchedCount === 0 && query._id) {
				jobData._id = new ObjectId(id);
				jobData.createdAt = new Date().toISOString();
				await jobs.insertOne(jobData);
			}
			return new Response(JSON.stringify({ success: true, id }), {
				status: 200,
				headers: { "content-type": "application/json" },
			});
		} else {
			// Create new job
			jobData.createdAt = new Date().toISOString();
			const result = await jobs.insertOne(jobData);
			return new Response(JSON.stringify({ success: true, id: result.insertedId.toString() }), {
				status: 201,
				headers: { "content-type": "application/json" },
			});
		}
	} catch (error: any) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { "content-type": "application/json" },
		});
	}
}

// Delete a job posting
export async function DELETE(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get("id");
		if (!id) {
			return new Response(JSON.stringify({ error: "id is required" }), {
				status: 400,
				headers: { "content-type": "application/json" },
			});
		}
		const db = await getDb();
		const jobs = db.collection("jobs");
		// Try to delete by ObjectId, if that fails try by id field
		let query: any;
		try {
			query = { _id: new ObjectId(id) };
		} catch {
			query = { id: id };
		}
		await jobs.deleteOne(query);
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { "content-type": "application/json" },
		});
	} catch (error: any) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { "content-type": "application/json" },
		});
	}
}

