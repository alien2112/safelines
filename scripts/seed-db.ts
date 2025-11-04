import { getDb } from '../app/lib/mongodb';

async function seedServices() {
	const db = await getDb();
	const services = db.collection('services');
	
	// Check if services already exist
	const existingCount = await services.countDocuments();
	if (existingCount > 0) {
		console.log('Services already exist in database, skipping seed...');
		return;
	}
	
	const initialServices = [
		// Transportation Services
		{
			title: 'Transportation to customer warehouses throughout the Kingdom',
			titleAr: 'النقل إلى مستودعات العميل في جميع أنحاء المملكة',
			description: 'We provide integrated transportation services covering all sea ports, air and land entry points, and all types of containers and parcels, including refrigerated and regular transport, ensuring fast and safe delivery to customer warehouses throughout the Kingdom.',
			descriptionAr: 'نقدم خدمات نقل متكاملة تشمل جميع الموانئ البحرية والمنافذ الجوية والبرية ونغطي جميع أنواع الحاويات والطرود، بما في ذلك النقل المبرد والنقل العادي مع ضمان توصيل سريع وآمن إلى مستودعات العملاء في مختلف أنحاء المملكة.',
			visible: true,
			order: 0,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		},
		{
			title: 'Flexible distribution service',
			titleAr: 'نوفر خدمة توزيع مرنة تتوافق مع احتياجات العملاء',
			description: 'We provide a flexible distribution service that meets customer needs, ensuring the delivery of shipments to multiple locations according to the customer\'s desire, which facilitates the delivery of goods at specified times and locations.',
			descriptionAr: 'حيث نضمن توصيل الشحنات إلى مواقع متعددة وفقا لرغبة العميل. مما يسهل توصيل البضائع في الوقت والمكان المحددين.',
			visible: true,
			order: 1,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		},
		{
			title: 'Transportation and Storage to and from the Yard',
			titleAr: 'نقل وتخزين من وإلى الساحة',
			description: 'Providing comprehensive yard services including saving money and time, vast spaces and a safe environment for storage, increasing work efficiency and reducing the risks of floor accumulation, and accuracy and flexibility in the process of receiving shipments after storage.',
			descriptionAr: 'توفير المال والوقت . مساحات شاسعة وبيئة آمنة للتخزين . رفع كفاءة العمل وتقليل مخاطر تراكم الأرضيات. الدقة والمرونة في عملية استلام الشحنات ما بعد التخزين .',
			visible: true,
			order: 2,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		},
		// Customs Services
		{
			title: 'Customs Clearance for Exports and Imports',
			titleAr: 'تخليص جمركي للصادرات والواردات',
			description: 'We work to facilitate all customs procedures for your commercial and personal exports and imports, ensuring fast clearance of shipments and reducing unnecessary delays.',
			descriptionAr: 'نعمل على تسهيل جميع الإجراءات الجمركية لصادراتكم ووارداتكم التجارية والشخصية، بما يضمن سرعة الفسح عن الشحنات وتقليل التأخير الغير الضروري.',
			visible: true,
			order: 3,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		},
		{
			title: 'SABER Certificate Issuance',
			titleAr: 'استخراج شهادة هيئة المواصفات والمقاييس السعودية ( سابر )',
			description: 'We provide a specialized service for issuing product conformity certificates from the Saudi Standards, Metrology and Quality Organization (SABER) to ensure their compliance with the quality standards approved in the Saudi market.',
			descriptionAr: 'نقدم خدمة متخصصة في استخراج شهادة المطابقة للمنتجات للتأكد من توافقها مع معايير الجودة المعتمدة في السوق السعودي.',
			visible: true,
			order: 4,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		},
		{
			title: 'SFDA Product Registration',
			titleAr: 'تسجيل المنتجات في الهيئة العامة للغذاء والدواء (SFDA)',
			description: 'We provide a service for registering food and pharmaceutical products with the Saudi Food and Drug Authority (SFDA) and issuing import approvals to ensure compliance with regulatory requirements and their entry into the Saudi market.',
			descriptionAr: 'نوفر خدمة تسجيل المنتجات الغذائية والدوائية في الهيئة العامة للغذاء والدواء وإصدار الموافقة بالاستيراد لضمان الامتثال للمتطلبات التنظيمية ودخولها للسوق السعودي.',
			visible: true,
			order: 5,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		},
		{
			title: 'Follow-up and Tracking',
			titleAr: 'المتابعة والتعقيب',
			description: 'We provide a continuous follow-up service for all shipments and track the progress of procedures from the country of origin to the destination to ensure timely arrival of shipments.',
			descriptionAr: 'نوفر خدمة متابعة مستمرة لجميع الشحنات والتعقيب على سير الإجراءات من البلد المصدر إلى جهة الوصول لضمان وصول الشحنات في الوقت المناسب.',
			visible: true,
			order: 6,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		},
		{
			title: 'Avoiding Unnecessary Expenses',
			titleAr: 'تجنب النفقات غير الضرورية - الآمنة للتخليص الجمركي',
			description: 'We guide you in reducing unnecessary costs according to the requirements for each type of product to avoid errors and prevent demurrage by improving customs and logistics operations and increasing operational efficiency.',
			descriptionAr: 'نرشدك في تقليل التكاليف الغير الضرورية حسب المتطلبات لكل نوع من المنتجات لتجنب الأخطاء وتفادياً للأرضيات من خلال تحسين العمليات الجمركية واللوجستية وزيادة الكفاءة التشغيلية.',
			visible: true,
			order: 7,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		},
		{
			title: '24/7 Customer Service',
			titleAr: 'تقديم خدمات العملاء على مدار الساعة',
			description: 'Our team is available to serve customers according to official working hours to ensure continuous support and respond to inquiries.',
			descriptionAr: 'فريقنا متاح لخدمة العملاء وفقاً لأوقات العمل الرسمية لضمان تقديم الدعم المستمر والرد على الاستفسارات.',
			visible: true,
			order: 8,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		},
		{
			title: 'Customs and Logistics Consultations',
			titleAr: 'الاستشارات الجمركية واللوجستية',
			description: 'We provide our clients with the best solutions and information regarding customs laws and logistics procedures to achieve safe shipping and smooth operations.',
			descriptionAr: 'نزود عملاءنا بأفضل الحلول والمعلومات حول القوانين الجمركية والإجراءات اللوجستية لتحقيق شحن آمن وسلاسة في العمليات.',
			visible: true,
			order: 9,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		},
	];
	
	await services.insertMany(initialServices);
	console.log(`✅ Seeded ${initialServices.length} services to MongoDB`);
}

async function seedBlogs() {
	const db = await getDb();
	const blogs = db.collection('blogs');
	
	// Check if blogs already exist
	const existingCount = await blogs.countDocuments();
	if (existingCount > 0) {
		console.log('Blogs already exist in database, skipping seed...');
		return;
	}
	
	const initialPosts = [
		{
			title: 'The Future of Customs Clearance: Digital Transformation',
			titleAr: 'مستقبل التخليص الجمركي: التحول الرقمي',
			content: 'Discover how digital technologies are revolutionizing the customs clearance process, making it faster, more efficient, and more transparent than ever before. This comprehensive article explores the latest innovations in customs technology and how they benefit businesses.',
			contentAr: 'اكتشف كيف تقوم التقنيات الرقمية بثورة في عملية التخليص الجمركي، مما يجعلها أسرع وأكثر كفاءة وشفافية من أي وقت مضى. تستكشف هذه المقالة الشاملة أحدث الابتكارات في تقنية الجمارك وكيفية استفادة الشركات منها.',
			excerpt: 'Discover how digital technologies are revolutionizing the customs clearance process, making it faster, more efficient, and more transparent than ever before.',
			excerptAr: 'اكتشف كيف تقوم التقنيات الرقمية بثورة في عملية التخليص الجمركي، مما يجعلها أسرع وأكثر كفاءة وشفافية.',
			category: 'Technology',
			tags: ['Technology', 'Digital', 'Innovation'],
			featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop',
			published: true,
			createdAt: new Date('2025-03-15').toISOString(),
			updatedAt: new Date('2025-03-15').toISOString(),
		},
		{
			title: 'Streamlining Import-Export Documentation',
			titleAr: 'تبسيط وثائق الاستيراد والتصدير',
			content: 'Learn about the essential documents needed for smooth international trade and how to avoid common documentation pitfalls. This guide covers all the necessary paperwork for successful customs clearance.',
			contentAr: 'تعرف على الوثائق الأساسية المطلوبة للتجارة الدولية السلسة وكيفية تجنب أخطاء التوثيق الشائعة. يغطي هذا الدليل جميع الأوراق اللازمة للتخليص الجمركي الناجح.',
			excerpt: 'Learn about the essential documents needed for smooth international trade and how to avoid common documentation pitfalls.',
			excerptAr: 'تعرف على الوثائق الأساسية المطلوبة للتجارة الدولية السلسة وكيفية تجنب أخطاء التوثيق الشائعة.',
			category: 'Guidance',
			tags: ['Documentation', 'Import', 'Export'],
			featuredImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1920&auto=format&fit=crop',
			published: true,
			createdAt: new Date('2025-03-10').toISOString(),
			updatedAt: new Date('2025-03-10').toISOString(),
			slug: 'streamlining-import-export-documentation',
			seoTitle: 'Streamlining Import-Export Documentation | Safe Lines',
			seoDescription: 'Essential guide to import-export documentation for smooth international trade. Learn how to avoid common documentation pitfalls in customs clearance.',
			seoKeywords: ['import documentation', 'export documentation', 'customs paperwork', 'international trade'],
			internalLinks: [
				{ text: 'The Future of Customs Clearance', url: '/blog/1', postId: '1' },
				{ text: 'Understanding Tariff Classification', url: '/blog/3', postId: '3' },
			],
		},
		{
			title: 'Understanding Tariff Classification Systems',
			titleAr: 'فهم أنظمة تصنيف التعريفة الجمركية',
			content: 'A comprehensive guide to understanding how goods are classified for customs purposes and why accurate classification matters. Learn about the harmonized system and how it affects your imports and exports.',
			contentAr: 'دليل شامل لفهم كيفية تصنيف البضائع لأغراض جمركية ولماذا يهم التصنيف الدقيق. تعرف على النظام المتناسق وكيف يؤثر على وارداتك وصادراتك.',
			excerpt: 'A comprehensive guide to understanding how goods are classified for customs purposes and why accurate classification matters.',
			excerptAr: 'دليل شامل لفهم كيفية تصنيف البضائع لأغراض جمركية ولماذا يهم التصنيف الدقيق.',
			category: 'Education',
			tags: ['Tariff', 'Classification', 'Education'],
			featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1920&auto=format&fit=crop',
			published: true,
			createdAt: new Date('2025-03-05').toISOString(),
			updatedAt: new Date('2025-03-05').toISOString(),
			slug: 'understanding-tariff-classification-systems',
		},
		{
			title: 'Best Practices for Freight Forwarding',
			titleAr: 'أفضل الممارسات للشحن والنقل',
			content: 'Expert tips on selecting the right freight forwarder and ensuring your cargo arrives safely and on time. This article covers everything you need to know about working with freight forwarders.',
			contentAr: 'نصائح الخبراء حول اختيار شركة الشحن المناسبة وضمان وصول البضائع بأمان وفي الوقت المحدد. تغطي هذه المقالة كل ما تحتاج لمعرفته حول العمل مع شركات الشحن.',
			excerpt: 'Expert tips on selecting the right freight forwarder and ensuring your cargo arrives safely and on time.',
			excerptAr: 'نصائح الخبراء حول اختيار شركة الشحن المناسبة وضمان وصول البضائع بأمان وفي الوقت المحدد.',
			category: 'Best Practices',
			tags: ['Freight', 'Best Practices', 'Logistics'],
			featuredImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1920&auto=format&fit=crop',
			published: true,
			createdAt: new Date('2025-02-28').toISOString(),
			updatedAt: new Date('2025-02-28').toISOString(),
			slug: 'best-practices-for-freight-forwarding',
		},
		{
			title: 'Navigating Customs Regulations in the GCC',
			titleAr: 'التنقل في اللوائح الجمركية في دول مجلس التعاون الخليجي',
			content: 'An overview of customs regulations across Gulf Cooperation Council countries and how to navigate them effectively. Learn about the specific requirements for each GCC member state.',
			contentAr: 'نظرة عامة على اللوائح الجمركية في دول مجلس التعاون الخليجي وكيفية التنقل فيها بشكل فعال. تعرف على المتطلبات المحددة لكل دولة عضو في مجلس التعاون.',
			excerpt: 'An overview of customs regulations across Gulf Cooperation Council countries and how to navigate them effectively.',
			excerptAr: 'نظرة عامة على اللوائح الجمركية في دول مجلس التعاون الخليجي وكيفية التنقل فيها بشكل فعال.',
			category: 'Regulations',
			tags: ['GCC', 'Regulations', 'Compliance'],
			featuredImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop',
			published: true,
			createdAt: new Date('2025-02-22').toISOString(),
			updatedAt: new Date('2025-02-22').toISOString(),
			slug: 'navigating-customs-regulations-in-the-gcc',
		},
		{
			title: 'Cost-Effective Shipping Solutions for SMEs',
			titleAr: 'حلول الشحن الموفرة للتكلفة للشركات الصغيرة والمتوسطة',
			content: 'Strategies for small and medium enterprises to reduce shipping costs while maintaining quality service. Discover cost-saving tips and best practices for SME shipping.',
			contentAr: 'استراتيجيات للشركات الصغيرة والمتوسطة لتقليل تكاليف الشحن مع الحفاظ على جودة الخدمة. اكتشف نصائح لتوفير التكاليف وأفضل الممارسات لشحن الشركات الصغيرة والمتوسطة.',
			excerpt: 'Strategies for small and medium enterprises to reduce shipping costs while maintaining quality service.',
			excerptAr: 'استراتيجيات للشركات الصغيرة والمتوسطة لتقليل تكاليف الشحن مع الحفاظ على جودة الخدمة.',
			category: 'Business',
			tags: ['SME', 'Cost Savings', 'Shipping'],
			featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1920&auto=format&fit=crop',
			published: true,
			createdAt: new Date('2025-02-18').toISOString(),
			updatedAt: new Date('2025-02-18').toISOString(),
			slug: 'cost-effective-shipping-solutions-for-smes',
		},
	];
	
	await blogs.insertMany(initialPosts);
	console.log(`✅ Seeded ${initialPosts.length} blog posts to MongoDB`);
}

async function main() {
	try {
		console.log('🌱 Starting database seed...');
		await seedServices();
		await seedBlogs();
		console.log('✅ Database seeding completed successfully!');
		process.exit(0);
	} catch (error) {
		console.error('❌ Error seeding database:', error);
		process.exit(1);
	}
}

main();

