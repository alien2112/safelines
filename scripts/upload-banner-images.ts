import fs from 'fs';
import path from 'path';
import { uploadImageToGridFS } from '../app/lib/gridfs';
import { getDb } from '../app/lib/mongodb';

type BannerSection = 'hero-home' | 'hero-about';

interface BannerFile {
	filename: string;
	mimeType?: string;
}

interface SectionPlan {
	section: BannerSection;
	files: BannerFile[];
}

const BANNER_SECTIONS: SectionPlan[] = [
	{
		section: 'hero-home',
		files: [
			{ filename: 'b1.webp' },
			{ filename: 'b2.webp' },
			{ filename: 'aerial-view-cargo-ship-cargo-container-harbor (1).webp' },
			{ filename: '—Pngtree—a large container ship docked_16142341.webp' },
			{ filename: 'طريقة-الشحن-الجوي-افضل-شركة-شحن-جوي-في-تركيا-1.webp' },
		],
	},
	{
		section: 'hero-about',
		files: [
			{ filename: 'Port-of-felixstowe-About-3000x3000.webp' },
			{ filename: 'PLA_Clipper_Parade_300722_290-trading-banner-1920x1014.png.webp' },
			{ filename: 'container-operation-port-series (1).webp' },
			{ filename: 'aerial-view-container-cargo-ship-sea (1) (1).webp' },
			{ filename: 'تصميم بدون عنوان.webp' },
		],
	},
];

async function ensureUploads() {
	const db = await getDb();
	const filesCol = db.collection('images.files');
	const publicDir = path.join(process.cwd(), 'public', 'banners');

	for (const plan of BANNER_SECTIONS) {
		console.log(`\n📸 Processing ${plan.section} (${plan.files.length} files)`);

		for (let index = 0; index < plan.files.length; index++) {
			const { filename, mimeType = 'image/webp' } = plan.files[index];
			const filePath = path.join(publicDir, filename);
			const targetOrder = (index + 1) * 100;

			if (!fs.existsSync(filePath)) {
				console.warn(`  ⚠️  Missing file: ${filePath}`);
				continue;
			}

			const existing = await filesCol.findOne({
				filename,
				'metadata.section': plan.section,
			});

			if (existing) {
				await filesCol.updateOne(
					{ _id: existing._id },
					{ $set: { 'metadata.order': targetOrder } }
				);
				console.log(`  ↺ Updated order for existing ${filename} -> ${targetOrder}`);
				continue;
			}

			const buffer = fs.readFileSync(filePath);
			await uploadImageToGridFS(buffer, filename, plan.section, mimeType, {
				order: targetOrder,
			});
			console.log(`  ✅ Uploaded ${filename} -> ${plan.section} (order ${targetOrder})`);
		}
	}
}

async function main() {
	try {
		console.log('🚢 Uploading banner images from /public/banners ...');
		await ensureUploads();
		console.log('\n✅ Completed banner upload');
		process.exit(0);
	} catch (error) {
		console.error('❌ Failed to upload banner images', error);
		process.exit(1);
	}
}

main();


