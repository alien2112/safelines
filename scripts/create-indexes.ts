import { getDb } from '../app/lib/mongodb';

/**
 * Create database indexes for performance optimization
 * Run this script once to set up all necessary indexes
 */
async function createIndexes() {
	console.log('🚀 Starting database index creation...\n');
	
	try {
		const db = await getDb();
		
		// Services collection indexes
		console.log('Creating indexes for services collection...');
		const services = db.collection('services');
		
		await services.createIndex({ order: 1, visible: 1 }, { name: 'order_visible_idx' });
		console.log('✅ Created compound index: order + visible');
		
		await services.createIndex({ updatedAt: -1 }, { name: 'updatedAt_idx' });
		console.log('✅ Created index: updatedAt');
		
		await services.createIndex({ visible: 1 }, { name: 'visible_idx' });
		console.log('✅ Created index: visible');
		
		// Blogs collection indexes
		console.log('\nCreating indexes for blogs collection...');
		const blogs = db.collection('blogs');
		
		await blogs.createIndex({ published: 1, createdAt: -1 }, { name: 'published_createdAt_idx' });
		console.log('✅ Created compound index: published + createdAt');
		
		await blogs.createIndex({ updatedAt: -1 }, { name: 'updatedAt_idx' });
		console.log('✅ Created index: updatedAt');
		
		await blogs.createIndex({ slug: 1 }, { name: 'slug_idx', unique: true, sparse: true });
		console.log('✅ Created unique index: slug');
		
		await blogs.createIndex({ published: 1 }, { name: 'published_idx' });
		console.log('✅ Created index: published');
		
		// Images (GridFS) collection indexes
		console.log('\nCreating indexes for images.files collection...');
		const files = db.collection('images.files');
		
		await files.createIndex({ 'metadata.section': 1, uploadDate: -1 }, { name: 'section_uploadDate_idx' });
		console.log('✅ Created compound index: metadata.section + uploadDate');
		
		await files.createIndex({ uploadDate: -1 }, { name: 'uploadDate_idx' });
		console.log('✅ Created index: uploadDate');
		
		console.log('\n✅ All indexes created successfully!');
		console.log('\nVerifying indexes...');
		
		// Verify indexes
		const servicesIndexes = await services.indexes();
		console.log(`\nServices collection indexes (${servicesIndexes.length}):`);
		servicesIndexes.forEach(idx => console.log(`  - ${idx.name}`));
		
		const blogsIndexes = await blogs.indexes();
		console.log(`\nBlogs collection indexes (${blogsIndexes.length}):`);
		blogsIndexes.forEach(idx => console.log(`  - ${idx.name}`));
		
		const filesIndexes = await files.indexes();
		console.log(`\nImages.files collection indexes (${filesIndexes.length}):`);
		filesIndexes.forEach(idx => console.log(`  - ${idx.name}`));
		
		console.log('\n🎉 Database optimization complete!');
		process.exit(0);
	} catch (error) {
		console.error('❌ Error creating indexes:', error);
		process.exit(1);
	}
}

// Run the script
createIndexes();



