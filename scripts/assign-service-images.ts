import { getDb } from '../app/lib/mongodb';

async function assignServiceImages() {
	const db = await getDb();
	const services = db.collection('services');

	// Map service titles (in English) to appropriate images
	const serviceImageMap: Record<string, string> = {
		'Transportation to customer warehouses throughout the Kingdom': '/services/Transportation Logistics Guide 700x450.webp',
		'Flexible distribution service': '/services/SP Freight Cargo Services 700x450.webp',
		'Transportation and Storage to and from the Yard': '/services/Temperature Control Logistics 700x450.webp',
		'Customs Clearance for Exports and Imports': '/services/Logistics Image 4 700x450.webp',
		'SABER Certificate Issuance': '/services/Logistics Image 5 700x450.webp',
		'SFDA Product Registration': '/services/Logistics Image 6 700x450.webp',
		'Follow-up and Tracking': '/services/RFID Logistics 700x450.webp',
		'Avoiding Unnecessary Expenses': '/services/Logistics Image 2 700x450.webp',
		'24/7 Customer Service': '/services/Logistics Image 3 700x450.webp',
		'Customs and Logistics Consultations': '/services/Logistics Image 2 700x450.webp',
	};

	const allServices = await services.find({}).toArray();
	let updatedCount = 0;

	for (const service of allServices) {
		const imagePath = serviceImageMap[service.title];
		if (imagePath && (!service.image || service.image !== imagePath)) {
			await services.updateOne(
				{ _id: service._id },
				{ $set: { image: imagePath, updatedAt: new Date().toISOString() } }
			);
			console.log(`✅ Updated "${service.title}" with image: ${imagePath}`);
			updatedCount++;
		} else if (imagePath && service.image === imagePath) {
			console.log(`⏭️  "${service.title}" already has the correct image`);
		} else if (!imagePath) {
			console.log(`⚠️  No image mapping found for "${service.title}"`);
		}
	}

	console.log(`\n✅ Completed! Updated ${updatedCount} service(s) with images.`);
}

async function main() {
	try {
		console.log('🖼️  Starting service image assignment...\n');
		await assignServiceImages();
		process.exit(0);
	} catch (error) {
		console.error('❌ Error assigning service images:', error);
		process.exit(1);
	}
}

main();

