import { MongoClient, Db } from "mongodb";

let clientPromise: Promise<MongoClient> | null = null;

export function getMongoUri(): string {
	// Prefer environment variable; fallback to provided URI for now
	return (
		process.env.MONGODB_URI ||
		"mongodb+srv://eslamabdaltif:oneone2@cluster0.idaqort.mongodb.net/?appName=Cluster0"
	);
}

export function getMongoClient(): Promise<MongoClient> {
	if (!clientPromise) {
		const uri = getMongoUri();
		const client = new MongoClient(uri);
		clientPromise = client.connect();
	}
	return clientPromise;
}

export async function getDb(dbName = "safelines"): Promise<Db> {
	const client = await getMongoClient();
	return client.db(dbName);
}


