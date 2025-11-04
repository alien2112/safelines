import { NextRequest } from "next/server";
import { getDb } from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import crypto from "crypto";

export const runtime = "nodejs";

// Get all services
export async function GET(req: NextRequest) {
	try {
		const db = await getDb();
		const services = db.collection("services");
		
		// Check if this is an admin request (for unpublished services)
		const { searchParams } = new URL(req.url);
		const includeUnpublished = searchParams.get('includeUnpublished') === 'true';
		
		// Use aggregation pipeline for optimized query
		const pipeline = [
			// Filter visible services in database (unless admin request)
			...(includeUnpublished ? [] : [{ $match: { visible: true } }]),
			// Sort by order
			{ $sort: { order: 1 } },
			// Project only needed fields
			{
				$project: {
					_id: 1,
					title: 1,
					titleAr: 1,
					description: 1,
					descriptionAr: 1,
					image: 1,
					icon: 1,
					visible: 1,
					featured: 1,
					order: 1,
					slug: 1,
					detailedDescription: 1,
					detailedDescriptionAr: 1,
					processSteps: 1,
					benefits: 1,
					testimonials: 1,
					updatedAt: 1,
				},
			},
			// Add latest update timestamp for cache busting
			{
				$facet: {
					services: [{ $match: {} }],
					metadata: [
						{ $group: { _id: null, maxUpdatedAt: { $max: "$updatedAt" } } },
					],
				},
			},
		];
		
		const [result] = await services.aggregate(pipeline).toArray();
		const results = result?.services || [];
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

// Create or update a service
export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const db = await getDb();
		const services = db.collection("services");

		if (body.id) {
			// Update existing service
			const { id, ...updateData } = body;
			// Check if id is a valid ObjectId
			let query: any;
			try {
				query = { _id: new ObjectId(id) };
			} catch {
				// If not valid ObjectId, try to find by id field
				query = { id: id };
			}
			const result = await services.updateOne(
				query,
				{ $set: { ...updateData, updatedAt: new Date().toISOString() } }
			);
			// If no document found by _id, try creating new one
			if (result.matchedCount === 0 && query._id) {
				const newService = {
					...body,
					_id: new ObjectId(id),
					createdAt: body.createdAt || new Date().toISOString(),
					updatedAt: new Date().toISOString(),
				};
				await services.insertOne(newService);
			}
			return new Response(JSON.stringify({ success: true, id }), {
				status: 200,
				headers: { "content-type": "application/json" },
			});
		} else {
			// Create new service
			const newService = {
				...body,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};
			// Remove id field if it exists (let MongoDB generate _id)
			delete newService.id;
			const result = await services.insertOne(newService);
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

// Delete a service
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
		const services = db.collection("services");
		// Try to delete by ObjectId, if that fails try by id field
		let query: any;
		try {
			query = { _id: new ObjectId(id) };
		} catch {
			query = { id: id };
		}
		await services.deleteOne(query);
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

