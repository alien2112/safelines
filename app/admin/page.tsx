"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type ImageFile = {
	_id: string;
	filename: string;
	uploadDate: string;
	contentType?: string;
	metadata?: { section?: string };
};

type BlogPost = {
	id: string;
	title: string;
	content: string;
	excerpt: string;
	category: string;
	tags: string[];
	featuredImage?: string;
	published: boolean;
	createdAt: string;
	updatedAt: string;
	// SEO fields
	seoTitle?: string;
	seoDescription?: string;
	seoKeywords?: string[];
	internalLinks?: Array<{
		text: string;
		url: string;
		postId?: string;
	}>;
	slug?: string;
};

type Service = {
	id: string;
	title: string;
	description: string;
	image?: string;
	visible: boolean;
	order: number;
};

type ActivePanel = "images" | "blog" | "services" | "seo-config" | "link-mappings";

export default function AdminPage() {
	const expectedPassword = (process.env.NEXT_PUBLIC_ADMIN_PASSWORD as string | undefined) || "admin123";
	const [authed, setAuthed] = useState(false);
	const [password, setPassword] = useState("");
	const [authError, setAuthError] = useState<string | null>(null);
	const [isLoggingIn, setIsLoggingIn] = useState(false);
	const [activePanel, setActivePanel] = useState<ActivePanel>("images");
	const [sidebarOpen, setSidebarOpen] = useState(true);

	// Login refs for animations
	const loginContainerRef = useRef<HTMLDivElement>(null);
	const loginLogoRef = useRef<HTMLDivElement>(null);
	const loginFormRef = useRef<HTMLFormElement>(null);
	const loginInputRef = useRef<HTMLInputElement>(null);
	const loginButtonRef = useRef<HTMLButtonElement>(null);

	// Dashboard refs
	const sidebarRef = useRef<HTMLDivElement>(null);
	const dashboardRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		try {
			if (typeof window !== 'undefined') {
				setAuthed(window.sessionStorage.getItem('sl_admin_authed') === 'true');
			}
		} catch {}
	}, []);

	// Login page animations
	useEffect(() => {
		if (!authed && loginContainerRef.current) {
			const tl = gsap.timeline({ delay: 0.2 });
			
			// Logo animation
			if (loginLogoRef.current) {
				gsap.set(loginLogoRef.current, { opacity: 0, scale: 0.8, y: -20 });
				tl.to(loginLogoRef.current, {
					opacity: 1,
					scale: 1,
					y: 0,
					duration: 0.8,
					ease: "expo.out",
				});
			}

			// Form animation
			if (loginFormRef.current) {
				gsap.set(loginFormRef.current, { opacity: 0, y: 30 });
				tl.to(loginFormRef.current, {
					opacity: 1,
					y: 0,
					duration: 0.6,
					ease: "power2.out",
				}, "-=0.4");

				// Input field animation
				if (loginInputRef.current) {
					gsap.set(loginInputRef.current, { opacity: 0, x: -20 });
					tl.to(loginInputRef.current, {
						opacity: 1,
						x: 0,
						duration: 0.5,
						ease: "power2.out",
					}, "-=0.3");
				}

				// Button animation
				if (loginButtonRef.current) {
					gsap.set(loginButtonRef.current, { opacity: 0, scale: 0.9 });
					tl.to(loginButtonRef.current, {
						opacity: 1,
						scale: 1,
						duration: 0.5,
						ease: "back.out(1.7)",
					}, "-=0.2");
				}
			}
		}
	}, [authed]);

	// Dashboard animations
	useEffect(() => {
		if (authed) {
			// Sidebar slide-in
			if (sidebarRef.current) {
				gsap.fromTo(sidebarRef.current,
					{ x: -280, opacity: 0 },
					{ x: 0, opacity: 1, duration: 0.6, ease: "expo.out", delay: 0.2 }
				);
			}

			// Dashboard content fade-up
			if (dashboardRef.current) {
				gsap.fromTo(dashboardRef.current,
					{ opacity: 0, y: 20 },
					{ opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.4 }
				);
			}
		}
	}, [authed]);

	function handleAuthSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setIsLoggingIn(true);
		setAuthError(null);

		// Simulate loading delay for better UX
		setTimeout(() => {
			if (password === expectedPassword) {
				setAuthed(true);
				setAuthError(null);
				try { 
					if (typeof window !== 'undefined') {
						window.sessionStorage.setItem('sl_admin_authed', 'true');
					}
				} catch {}
			} else {
				setAuthError("Incorrect password");
				setIsLoggingIn(false);
				// Shake animation on error
				if (loginFormRef.current) {
					const tl = gsap.timeline();
					tl.to(loginFormRef.current, { x: -10, duration: 0.1, ease: "power2.out" })
						.to(loginFormRef.current, { x: 10, duration: 0.1, ease: "power2.out" })
						.to(loginFormRef.current, { x: -10, duration: 0.1, ease: "power2.out" })
						.to(loginFormRef.current, { x: 10, duration: 0.1, ease: "power2.out" })
						.to(loginFormRef.current, { x: 0, duration: 0.1, ease: "power2.out" });
				}
			}
		}, 800);
	}

	function handleLogout() {
		setAuthed(false);
		setPassword("");
		try {
			if (typeof window !== 'undefined') {
				window.sessionStorage.removeItem('sl_admin_authed');
			}
		} catch {}
	}

	// Login Page
	if (!authed) {
		return (
			<div className="admin-login-page">
				<div className="admin-login-background">
					<div className="admin-login-blob admin-login-blob-1"></div>
					<div className="admin-login-blob admin-login-blob-2"></div>
				</div>
				<div className="admin-login-container" ref={loginContainerRef}>
					<div className="admin-login-logo" ref={loginLogoRef}>
						<img src="/safelines_logo-removebg-preview.png" alt="Safe Lines Logo" />
						<h1>Admin Dashboard</h1>
					</div>
					<form onSubmit={handleAuthSubmit} className="admin-login-form" ref={loginFormRef} aria-label="Admin password form">
						<div className="admin-login-field">
							<label htmlFor="admin-password">Password</label>
							<input
								id="admin-password"
								ref={loginInputRef}
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Enter admin password"
								aria-invalid={authError ? true : false}
								disabled={isLoggingIn}
							/>
							{authError && (
								<div className="admin-login-error" role="alert">
									{authError}
								</div>
							)}
						</div>
						<button 
							type="submit" 
							className="admin-login-button" 
							ref={loginButtonRef}
							disabled={isLoggingIn}
						>
							{isLoggingIn ? (
								<>
									<span className="admin-login-spinner"></span>
									Signing in...
								</>
							) : (
								"Sign In"
							)}
						</button>
					</form>
				</div>
			</div>
		);
	}

	// Dashboard
	return (
		<div className="admin-dashboard">
			<AdminSidebar 
				ref={sidebarRef}
				activePanel={activePanel}
				setActivePanel={setActivePanel}
				onLogout={handleLogout}
				open={sidebarOpen}
				setOpen={setSidebarOpen}
			/>
			<div className="admin-dashboard-content" ref={dashboardRef}>
				{activePanel === "images" && <ImagesPanel />}
				{activePanel === "blog" && <BlogPanel />}
				{activePanel === "services" && <ServicesPanel />}
				{activePanel === "seo-config" && <SEOConfigPanel />}
				{activePanel === "link-mappings" && <LinkMappingsPanel />}
			</div>
		</div>
	);
}

// Sidebar Component
const AdminSidebar = React.forwardRef<HTMLDivElement, {
	activePanel: ActivePanel;
	setActivePanel: (panel: ActivePanel) => void;
	onLogout: () => void;
	open: boolean;
	setOpen: (open: boolean) => void;
}>(({ activePanel, setActivePanel, onLogout, open, setOpen }, ref) => {
	const menuItems = [
		{ id: "images" as ActivePanel, label: "Images", icon: "image" },
		{ id: "blog" as ActivePanel, label: "Blog", icon: "article" },
		{ id: "services" as ActivePanel, label: "Services", icon: "settings" },
		{ id: "seo-config" as ActivePanel, label: "SEO Config", icon: "seo" },
		{ id: "link-mappings" as ActivePanel, label: "Link Mappings", icon: "links" },
	];

	useEffect(() => {
		const items = document.querySelectorAll('.admin-sidebar-item');
		gsap.fromTo(items,
			{ opacity: 0, x: -20 },
			{ opacity: 1, x: 0, duration: 0.4, stagger: 0.1, delay: 0.3, ease: "power2.out" }
		);
	}, []);

	return (
		<div className={`admin-sidebar ${open ? 'open' : ''}`} ref={ref}>
			<div className="admin-sidebar-header">
				<div className="admin-sidebar-logo">
					<img src="/safelines_logo-removebg-preview.png" alt="Safe Lines" />
					<span>Admin Panel</span>
				</div>
				<button 
					className="admin-sidebar-toggle" 
					onClick={() => setOpen(!open)}
					aria-label="Toggle sidebar"
				>
					{open ? '←' : '→'}
				</button>
			</div>
			<nav className="admin-sidebar-nav">
				{menuItems.map((item) => (
					<button
						key={item.id}
						className={`admin-sidebar-item ${activePanel === item.id ? 'active' : ''}`}
						onClick={() => setActivePanel(item.id)}
					>
						<span className="admin-sidebar-icon">
							{item.icon === "image" && (
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
									<circle cx="8.5" cy="8.5" r="1.5"/>
									<polyline points="21 15 16 10 5 21"/>
								</svg>
							)}
							{item.icon === "article" && (
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
									<polyline points="14 2 14 8 20 8"/>
									<line x1="16" y1="13" x2="8" y2="13"/>
									<line x1="16" y1="17" x2="8" y2="17"/>
									<polyline points="10 9 9 9 8 9"/>
								</svg>
							)}
							{item.icon === "settings" && (
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<circle cx="12" cy="12" r="3"/>
									<path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
								</svg>
							)}
							{item.icon === "seo" && (
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
								</svg>
							)}
							{item.icon === "links" && (
								<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
									<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
									<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
								</svg>
							)}
						</span>
						{open && <span className="admin-sidebar-label">{item.label}</span>}
					</button>
				))}
			</nav>
			<div className="admin-sidebar-footer">
				<button className="admin-sidebar-item admin-logout-button" onClick={onLogout}>
					<span className="admin-sidebar-icon">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
							<polyline points="16 17 21 12 16 7"/>
							<line x1="21" y1="12" x2="9" y2="12"/>
						</svg>
					</span>
					{open && <span className="admin-sidebar-label">Logout</span>}
				</button>
			</div>
		</div>
	);
});

AdminSidebar.displayName = "AdminSidebar";

// Images Panel (existing functionality)
function ImagesPanel() {
	const [activeSection, setActiveSection] = useState<"making-easy" | "strategy-right">("making-easy");
	const [files, setFiles] = useState<ImageFile[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const panelRef = useRef<HTMLDivElement>(null);

	const refresh = React.useCallback(async () => {
		setIsLoading(true);
		try {
			const res = await fetch(`/api/images?section=${activeSection}`, { cache: "no-store" });
			const data = await res.json();
			setFiles(data);
		} finally {
			setIsLoading(false);
		}
	}, [activeSection]);

	useEffect(() => {
		refresh();
	}, [refresh]);

	useEffect(() => {
		if (panelRef.current) {
			const cards = panelRef.current.querySelectorAll('.admin-panel-card');
			gsap.fromTo(cards,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
			);
		}
	}, [files]);

	async function onUpload(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const form = e.currentTarget;
		const input = form.querySelector<HTMLInputElement>("input[type=file]");
		if (!input || !input.files || input.files.length === 0) return;
		const fd = new FormData();
		fd.append("file", input.files[0]);
		fd.append("section", activeSection);
		await fetch("/api/images", { method: "POST", body: fd });
		input.value = "";
		await refresh();
	}

	async function onDelete(id: string) {
		await fetch(`/api/images/${id}`, { method: "DELETE" });
		await refresh();
	}

	return (
		<div className="admin-panel" ref={panelRef}>
			<div className="admin-panel-header">
				<h2>Images Management</h2>
				<p>Manage homepage images per section. Latest upload is displayed.</p>
			</div>
			<div className="admin-panel-grid">
				<div className="admin-panel-card">
					<h3>Upload Image</h3>
					<form onSubmit={onUpload} className="admin-form">
						<label className="admin-field">
							<span className="admin-label">Section</span>
							<select 
								className="admin-input"
								value={activeSection} 
								onChange={(e) => setActiveSection(e.target.value as "making-easy" | "strategy-right")} 
							>
								<option value="making-easy">Making future easy (left)</option>
								<option value="strategy-right">Strategy & Content (right)</option>
							</select>
						</label>
						<input className="admin-input" type="file" accept="image/*" aria-label="Choose image file" />
						<div className="admin-actions">
							<button className="btn primary" type="submit">Upload</button>
						</div>
					</form>
				</div>
				<div className="admin-panel-card">
					<h3>Images in Section</h3>
					<div className="divider" />
					<div className="admin-list">
						{files.map((f) => (
							<div key={f._id} className="admin-list-item">
								<img className="admin-list-thumb" src={`/api/images/${f._id}`} alt={f.filename} />
								<div className="admin-list-meta">
									<div className="admin-list-fn">{f.filename}</div>
									<div className="admin-list-date">{new Date(f.uploadDate).toLocaleString()}</div>
								</div>
								<button className="btn ghost" aria-label={`Delete ${f.filename}`} onClick={() => onDelete(f._id)}>Delete</button>
							</div>
						))}
						{files.length === 0 && !isLoading && <div className="muted">No images yet</div>}
					</div>
				</div>
			</div>
		</div>
	);
}

// Blog Panel
function BlogPanel() {
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
	const [showModal, setShowModal] = useState(false);
	const [previewMode, setPreviewMode] = useState(false);
	const panelRef = useRef<HTMLDivElement>(null);

	// Initialize with existing blog posts if localStorage is empty
	useEffect(() => {
		const saved = localStorage.getItem('admin_blog_posts');
		if (saved) {
			setPosts(JSON.parse(saved));
		} else {
			// Initialize with existing blog posts from blog/page.tsx
			const initialPosts: BlogPost[] = [
				{
					id: '1',
					title: 'The Future of Customs Clearance: Digital Transformation',
					content: 'Discover how digital technologies are revolutionizing the customs clearance process, making it faster, more efficient, and more transparent than ever before. This comprehensive article explores the latest innovations in customs technology and how they benefit businesses.',
					excerpt: 'Discover how digital technologies are revolutionizing the customs clearance process, making it faster, more efficient, and more transparent than ever before.',
					category: 'Technology',
					tags: ['Technology', 'Digital', 'Innovation'],
					featuredImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop',
					published: true,
					createdAt: new Date('2025-03-15').toISOString(),
					updatedAt: new Date('2025-03-15').toISOString(),
				},
				{
					id: '2',
					title: 'Streamlining Import-Export Documentation',
					content: 'Learn about the essential documents needed for smooth international trade and how to avoid common documentation pitfalls. This guide covers all the necessary paperwork for successful customs clearance.',
					excerpt: 'Learn about the essential documents needed for smooth international trade and how to avoid common documentation pitfalls.',
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
					id: '3',
					title: 'Understanding Tariff Classification Systems',
					content: 'A comprehensive guide to understanding how goods are classified for customs purposes and why accurate classification matters. Learn about the harmonized system and how it affects your imports and exports.',
					excerpt: 'A comprehensive guide to understanding how goods are classified for customs purposes and why accurate classification matters.',
					category: 'Education',
					tags: ['Tariff', 'Classification', 'Education'],
					featuredImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1920&auto=format&fit=crop',
					published: true,
					createdAt: new Date('2025-03-05').toISOString(),
					updatedAt: new Date('2025-03-05').toISOString(),
					slug: 'understanding-tariff-classification-systems',
				},
				{
					id: '4',
					title: 'Best Practices for Freight Forwarding',
					content: 'Expert tips on selecting the right freight forwarder and ensuring your cargo arrives safely and on time. This article covers everything you need to know about working with freight forwarders.',
					excerpt: 'Expert tips on selecting the right freight forwarder and ensuring your cargo arrives safely and on time.',
					category: 'Best Practices',
					tags: ['Freight', 'Best Practices', 'Logistics'],
					featuredImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1920&auto=format&fit=crop',
					published: true,
					createdAt: new Date('2025-02-28').toISOString(),
					updatedAt: new Date('2025-02-28').toISOString(),
					slug: 'best-practices-for-freight-forwarding',
				},
				{
					id: '5',
					title: 'Navigating Customs Regulations in the GCC',
					content: 'An overview of customs regulations across Gulf Cooperation Council countries and how to navigate them effectively. Learn about the specific requirements for each GCC member state.',
					excerpt: 'An overview of customs regulations across Gulf Cooperation Council countries and how to navigate them effectively.',
					category: 'Regulations',
					tags: ['GCC', 'Regulations', 'Compliance'],
					featuredImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop',
					published: true,
					createdAt: new Date('2025-02-22').toISOString(),
					updatedAt: new Date('2025-02-22').toISOString(),
					slug: 'navigating-customs-regulations-in-the-gcc',
				},
				{
					id: '6',
					title: 'Cost-Effective Shipping Solutions for SMEs',
					content: 'Strategies for small and medium enterprises to reduce shipping costs while maintaining quality service. Discover cost-saving tips and best practices for SME shipping.',
					excerpt: 'Strategies for small and medium enterprises to reduce shipping costs while maintaining quality service.',
					category: 'Business',
					tags: ['SME', 'Cost Savings', 'Shipping'],
					featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1920&auto=format&fit=crop',
					published: true,
					createdAt: new Date('2025-02-18').toISOString(),
					updatedAt: new Date('2025-02-18').toISOString(),
					slug: 'cost-effective-shipping-solutions-for-smes',
				},
			];
			setPosts(initialPosts);
			localStorage.setItem('admin_blog_posts', JSON.stringify(initialPosts));
		}
	}, []);

	useEffect(() => {
		if (panelRef.current) {
			const cards = panelRef.current.querySelectorAll('.admin-blog-card');
			gsap.fromTo(cards,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
			);
		}
	}, [posts]);

	function savePost(post: BlogPost) {
		// Auto-generate slug if not provided
		if (!post.slug && post.title) {
			post.slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
		}
		
		const updated = editingPost 
			? posts.map(p => p.id === editingPost.id ? { ...post, updatedAt: new Date().toISOString() } : p)
			: [...posts, { ...post, id: Date.now().toString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }];
		setPosts(updated);
		localStorage.setItem('admin_blog_posts', JSON.stringify(updated));
		setEditingPost(null);
		setShowModal(false);
	}

	function deletePost(id: string) {
		const updated = posts.filter(p => p.id !== id);
		setPosts(updated);
		localStorage.setItem('admin_blog_posts', JSON.stringify(updated));
	}

	return (
		<div className="admin-panel" ref={panelRef}>
			<div className="admin-panel-header">
				<h2>Blog Management</h2>
				<p>Create, edit, and manage blog posts</p>
				<button className="btn primary" onClick={() => { setEditingPost(null); setShowModal(true); }}>
					+ New Post
				</button>
			</div>
			<div className="admin-blog-grid">
				{posts.map((post) => (
					<div key={post.id} className="admin-blog-card">
						{post.featuredImage && (
							<img src={post.featuredImage} alt={post.title} className="admin-blog-image" />
						)}
						<div className="admin-blog-content">
							<div className="admin-blog-header">
								<h3>{post.title}</h3>
								<span className={`admin-blog-status ${post.published ? 'published' : 'draft'}`}>
									{post.published ? 'Published' : 'Draft'}
								</span>
							</div>
							<p className="admin-blog-excerpt">{post.excerpt}</p>
							<div className="admin-blog-meta">
								<span className="admin-blog-category">{post.category}</span>
								{post.tags.map(tag => (
									<span key={tag} className="admin-blog-tag">{tag}</span>
								))}
							</div>
							<div className="admin-blog-actions">
								<button className="btn ghost" onClick={() => { setEditingPost(post); setShowModal(true); }}>Edit</button>
								<button className="btn ghost" onClick={() => deletePost(post.id)}>Delete</button>
							</div>
						</div>
					</div>
				))}
				{posts.length === 0 && (
					<div className="admin-empty-state">
						<p>No blog posts yet. Create your first post!</p>
					</div>
				)}
			</div>
			{showModal && (
				<BlogModal 
					post={editingPost}
					onSave={savePost}
					onClose={() => { setShowModal(false); setEditingPost(null); }}
					previewMode={previewMode}
					setPreviewMode={setPreviewMode}
				/>
			)}
		</div>
	);
}

// Blog Modal Component
function BlogModal({ post, onSave, onClose, previewMode, setPreviewMode }: {
	post: BlogPost | null;
	onSave: (post: BlogPost) => void;
	onClose: () => void;
	previewMode: boolean;
	setPreviewMode: (mode: boolean) => void;
}) {
	const [formData, setFormData] = useState<Partial<BlogPost>>({
		title: post?.title || '',
		content: post?.content || '',
		excerpt: post?.excerpt || '',
		category: post?.category || '',
		tags: post?.tags || [],
		published: post?.published || false,
		featuredImage: post?.featuredImage || '',
		seoTitle: post?.seoTitle || '',
		seoDescription: post?.seoDescription || '',
		seoKeywords: post?.seoKeywords || [],
		internalLinks: post?.internalLinks || [],
		slug: post?.slug || '',
	});
	const [showSEOSection, setShowSEOSection] = useState(false);
	const [showLinksSection, setShowLinksSection] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (modalRef.current) {
			gsap.fromTo(modalRef.current,
				{ opacity: 0, scale: 0.9, y: 20 },
				{ opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "expo.out" }
			);
		}
	}, []);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		onSave(formData as BlogPost);
	}

	return (
		<div className="admin-modal-overlay" onClick={onClose}>
			<div className="admin-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
				<div className="admin-modal-header">
					<h3>{post ? 'Edit Post' : 'New Post'}</h3>
					<div className="admin-modal-actions">
						<button 
							type="button"
							className={`btn ghost ${showSEOSection ? 'active' : ''}`}
							onClick={() => setShowSEOSection(!showSEOSection)}
							title="SEO Settings"
						>
							SEO
						</button>
						<button 
							type="button"
							className={`btn ghost ${showLinksSection ? 'active' : ''}`}
							onClick={() => setShowLinksSection(!showLinksSection)}
							title="Internal Links"
						>
							Links
						</button>
						<button 
							type="button"
							className="btn ghost" 
							onClick={() => setPreviewMode(!previewMode)}
						>
							{previewMode ? 'Edit' : 'Preview'}
						</button>
						<button 
							type="button"
							className="admin-modal-close" 
							onClick={onClose}
						>
							×
						</button>
					</div>
				</div>
				<form onSubmit={handleSubmit} className="admin-modal-content">
					{!previewMode ? (
						<>
							<label className="admin-field">
								<span className="admin-label">Title</span>
								<input 
									className="admin-input"
									value={formData.title}
									onChange={(e) => setFormData({ ...formData, title: e.target.value })}
									required
								/>
							</label>
							<label className="admin-field">
								<span className="admin-label">Excerpt</span>
								<textarea 
									className="admin-input"
									value={formData.excerpt}
									onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
									rows={3}
									required
								/>
							</label>
							<label className="admin-field">
								<span className="admin-label">Content</span>
								<textarea 
									className="admin-input"
									value={formData.content}
									onChange={(e) => setFormData({ ...formData, content: e.target.value })}
									rows={10}
									required
								/>
							</label>
							<label className="admin-field">
								<span className="admin-label">Category</span>
								<input 
									className="admin-input"
									value={formData.category}
									onChange={(e) => setFormData({ ...formData, category: e.target.value })}
									required
								/>
							</label>
							<label className="admin-field">
								<span className="admin-label">Tags (comma-separated)</span>
								<input 
									className="admin-input"
									value={formData.tags?.join(', ')}
									onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()) })}
								/>
							</label>
							<label className="admin-field">
								<span className="admin-label">Featured Image URL</span>
								<input 
									className="admin-input"
									type="url"
									value={formData.featuredImage}
									onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
								/>
							</label>
							<label className="admin-field">
								<span className="admin-label">Slug (URL-friendly)</span>
								<input 
									className="admin-input"
									value={formData.slug || ''}
									onChange={(e) => {
										const slug = e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
										setFormData({ ...formData, slug });
									}}
									placeholder="auto-generated-from-title"
								/>
								<small style={{ fontSize: '12px', color: 'var(--gray-500)', marginTop: '4px', display: 'block' }}>
									URL: /blog/{formData.slug || 'auto-generated'}
								</small>
							</label>
							<label className="admin-field admin-checkbox-field">
								<input 
									type="checkbox"
									checked={formData.published}
									onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
								/>
								<span className="admin-label">Published</span>
							</label>
							
							{/* SEO Section */}
							{showSEOSection && (
								<div className="admin-seo-section">
									<h4 style={{ margin: '20px 0 12px', fontSize: '18px', fontWeight: 700 }}>SEO Settings</h4>
									<label className="admin-field">
										<span className="admin-label">SEO Title (optional, defaults to title)</span>
										<input 
											className="admin-input"
											value={formData.seoTitle || ''}
											onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
											placeholder="Custom SEO title"
										/>
									</label>
									<label className="admin-field">
										<span className="admin-label">SEO Description (optional, defaults to excerpt)</span>
										<textarea 
											className="admin-input"
											value={formData.seoDescription || ''}
											onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
											rows={3}
											placeholder="Custom SEO description (150-160 characters recommended)"
										/>
									</label>
									<label className="admin-field">
										<span className="admin-label">SEO Keywords (comma-separated)</span>
										<input 
											className="admin-input"
											value={formData.seoKeywords?.join(', ') || ''}
											onChange={(e) => setFormData({ 
												...formData, 
												seoKeywords: e.target.value.split(',').map(k => k.trim()).filter(k => k) 
											})}
											placeholder="keyword1, keyword2, keyword3"
										/>
									</label>
								</div>
							)}
							
							{/* Internal Links Section */}
							{showLinksSection && (
								<div className="admin-links-section">
									<h4 style={{ margin: '20px 0 12px', fontSize: '18px', fontWeight: 700 }}>Internal Links</h4>
									<p style={{ fontSize: '14px', color: 'var(--gray-600)', marginBottom: '16px' }}>
										Add internal links to other blog posts or pages to improve SEO and user navigation.
									</p>
									{(formData.internalLinks || []).map((link, index) => (
										<div key={index} className="admin-link-item" style={{ 
											display: 'flex', 
											gap: '8px', 
											marginBottom: '12px',
											alignItems: 'flex-start'
										}}>
											<div style={{ flex: 1 }}>
												<input 
													className="admin-input"
													value={link.text}
													onChange={(e) => {
														const newLinks = [...(formData.internalLinks || [])];
														newLinks[index].text = e.target.value;
														setFormData({ ...formData, internalLinks: newLinks });
													}}
													placeholder="Link text"
													style={{ marginBottom: '8px' }}
												/>
												<input 
													className="admin-input"
													value={link.url}
													onChange={(e) => {
														const newLinks = [...(formData.internalLinks || [])];
														newLinks[index].url = e.target.value;
														setFormData({ ...formData, internalLinks: newLinks });
													}}
													placeholder="/blog/post-id or /about"
												/>
											</div>
											<button
												type="button"
												className="btn ghost"
												onClick={() => {
													const newLinks = (formData.internalLinks || []).filter((_, i) => i !== index);
													setFormData({ ...formData, internalLinks: newLinks });
												}}
												style={{ padding: '8px 12px', fontSize: '14px' }}
											>
												Remove
											</button>
										</div>
									))}
									<button
										type="button"
										className="btn ghost"
										onClick={() => {
											setFormData({ 
												...formData, 
												internalLinks: [...(formData.internalLinks || []), { text: '', url: '', postId: '' }] 
											});
										}}
										style={{ width: '100%', marginTop: '8px' }}
									>
										+ Add Link
									</button>
								</div>
							)}
						</>
					) : (
						<div className="admin-preview">
							{formData.featuredImage && (
								<img src={formData.featuredImage} alt={formData.title} />
							)}
							<h2>{formData.title}</h2>
							<p className="admin-preview-excerpt">{formData.excerpt}</p>
							<div className="admin-preview-content">{formData.content}</div>
						</div>
					)}
					<div className="admin-modal-footer">
						<button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
						<button type="submit" className="btn primary">Save</button>
					</div>
				</form>
			</div>
		</div>
	);
}

// Services Panel
function ServicesPanel() {
	const [services, setServices] = useState<Service[]>([]);
	const [editingService, setEditingService] = useState<Service | null>(null);
	const [showModal, setShowModal] = useState(false);
	const panelRef = useRef<HTMLDivElement>(null);

	// Initialize with existing services if localStorage is empty
	useEffect(() => {
		const saved = localStorage.getItem('admin_services');
		if (saved) {
			setServices(JSON.parse(saved));
		} else {
			// Initialize with existing services from translations
			const initialServices: Service[] = [
				// Transportation Services
				{
					id: '1',
					title: 'Transportation to customer warehouses throughout the Kingdom',
					description: 'We provide integrated transportation services covering all sea ports, air and land entry points, and all types of containers and parcels, including refrigerated and regular transport, ensuring fast and safe delivery to customer warehouses throughout the Kingdom.',
					visible: true,
					order: 0,
				},
				{
					id: '2',
					title: 'Flexible distribution service',
					description: 'We provide a flexible distribution service that meets customer needs, ensuring the delivery of shipments to multiple locations according to the customer\'s desire, which facilitates the delivery of goods at specified times and locations.',
					visible: true,
					order: 1,
				},
				{
					id: '3',
					title: 'Transportation and Storage to and from the Yard',
					description: 'Providing comprehensive yard services including saving money and time, vast spaces and a safe environment for storage, increasing work efficiency and reducing the risks of floor accumulation, and accuracy and flexibility in the process of receiving shipments after storage.',
					visible: true,
					order: 2,
				},
				// Customs Services
				{
					id: '4',
					title: 'Customs Clearance for Exports and Imports',
					description: 'We work to facilitate all customs procedures for your commercial and personal exports and imports, ensuring fast clearance of shipments and reducing unnecessary delays.',
					visible: true,
					order: 3,
				},
				{
					id: '5',
					title: 'SABER Certificate Issuance',
					description: 'We provide a specialized service for issuing product conformity certificates from the Saudi Standards, Metrology and Quality Organization (SABER) to ensure their compliance with the quality standards approved in the Saudi market.',
					visible: true,
					order: 4,
				},
				{
					id: '6',
					title: 'SFDA Product Registration',
					description: 'We provide a service for registering food and pharmaceutical products with the Saudi Food and Drug Authority (SFDA) and issuing import approvals to ensure compliance with regulatory requirements and their entry into the Saudi market.',
					visible: true,
					order: 5,
				},
				{
					id: '7',
					title: 'Follow-up and Tracking',
					description: 'We provide a continuous follow-up service for all shipments and track the progress of procedures from the country of origin to the destination to ensure timely arrival of shipments.',
					visible: true,
					order: 6,
				},
				{
					id: '8',
					title: 'Avoiding Unnecessary Expenses',
					description: 'We guide you in reducing unnecessary costs according to the requirements for each type of product to avoid errors and prevent demurrage by improving customs and logistics operations and increasing operational efficiency.',
					visible: true,
					order: 7,
				},
				{
					id: '9',
					title: '24/7 Customer Service',
					description: 'Our team is available to serve customers according to official working hours to ensure continuous support and respond to inquiries.',
					visible: true,
					order: 8,
				},
				{
					id: '10',
					title: 'Customs and Logistics Consultations',
					description: 'We provide our clients with the best solutions and information regarding customs laws and logistics procedures to achieve safe shipping and smooth operations.',
					visible: true,
					order: 9,
				},
			];
			setServices(initialServices);
			localStorage.setItem('admin_services', JSON.stringify(initialServices));
		}
	}, []);

	useEffect(() => {
		if (panelRef.current) {
			const cards = panelRef.current.querySelectorAll('.admin-service-card');
			gsap.fromTo(cards,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
			);
		}
	}, [services]);

	function saveService(service: Service) {
		const updated = editingService
			? services.map(s => s.id === editingService.id ? service : s)
			: [...services, { ...service, id: Date.now().toString(), order: services.length }];
		setServices(updated);
		localStorage.setItem('admin_services', JSON.stringify(updated));
		setEditingService(null);
		setShowModal(false);
	}

	function deleteService(id: string) {
		const updated = services.filter(s => s.id !== id);
		setServices(updated);
		localStorage.setItem('admin_services', JSON.stringify(updated));
	}

	function toggleVisibility(id: string) {
		const updated = services.map(s => s.id === id ? { ...s, visible: !s.visible } : s);
		setServices(updated);
		localStorage.setItem('admin_services', JSON.stringify(updated));
	}

	function reorderService(id: string, direction: 'up' | 'down') {
		const index = services.findIndex(s => s.id === id);
		if (index === -1) return;
		const newIndex = direction === 'up' ? index - 1 : index + 1;
		if (newIndex < 0 || newIndex >= services.length) return;
		const updated = [...services];
		[updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
		updated.forEach((s, i) => s.order = i);
		setServices(updated);
		localStorage.setItem('admin_services', JSON.stringify(updated));
	}

	return (
		<div className="admin-panel" ref={panelRef}>
			<div className="admin-panel-header">
				<h2>Services Management</h2>
				<p>Manage services displayed on the main site</p>
				<button className="btn primary" onClick={() => { setEditingService(null); setShowModal(true); }}>
					+ New Service
				</button>
			</div>
			<div className="admin-services-grid">
				{services.map((service) => (
					<div key={service.id} className={`admin-service-card ${!service.visible ? 'hidden' : ''}`}>
						<div className="admin-service-header">
							<div className="admin-service-order">
								<button onClick={() => reorderService(service.id, 'up')}>↑</button>
								<span>{service.order + 1}</span>
								<button onClick={() => reorderService(service.id, 'down')}>↓</button>
							</div>
							<label className="admin-toggle">
								<input
									type="checkbox"
									checked={service.visible}
									onChange={() => toggleVisibility(service.id)}
								/>
								<span className="admin-toggle-slider"></span>
							</label>
						</div>
						{service.image && (
							<img src={service.image} alt={service.title} className="admin-service-image" />
						)}
						<div className="admin-service-content">
							<h3>{service.title}</h3>
							<p>{service.description}</p>
							<div className="admin-service-actions">
								<button className="btn ghost" onClick={() => { setEditingService(service); setShowModal(true); }}>Edit</button>
								<button className="btn ghost" onClick={() => deleteService(service.id)}>Delete</button>
							</div>
						</div>
					</div>
				))}
				{services.length === 0 && (
					<div className="admin-empty-state">
						<p>No services yet. Create your first service!</p>
					</div>
				)}
			</div>
			{showModal && (
				<ServiceModal 
					service={editingService}
					onSave={saveService}
					onClose={() => { setShowModal(false); setEditingService(null); }}
				/>
			)}
		</div>
	);
}

// Service Modal Component
function ServiceModal({ service, onSave, onClose }: {
	service: Service | null;
	onSave: (service: Service) => void;
	onClose: () => void;
}) {
	const [formData, setFormData] = useState<Partial<Service>>({
		title: service?.title || '',
		description: service?.description || '',
		image: service?.image || '',
		visible: service?.visible ?? true,
		order: service?.order ?? 0,
	});
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (modalRef.current) {
			gsap.fromTo(modalRef.current,
				{ opacity: 0, scale: 0.9, y: 20 },
				{ opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "expo.out" }
			);
		}
	}, []);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		onSave(formData as Service);
	}

	return (
		<div className="admin-modal-overlay" onClick={onClose}>
			<div className="admin-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
				<div className="admin-modal-header">
					<h3>{service ? 'Edit Service' : 'New Service'}</h3>
					<button className="admin-modal-close" onClick={onClose}>×</button>
				</div>
				<form onSubmit={handleSubmit} className="admin-modal-content">
					<label className="admin-field">
						<span className="admin-label">Title</span>
						<input 
							className="admin-input"
							value={formData.title}
							onChange={(e) => setFormData({ ...formData, title: e.target.value })}
							required
						/>
					</label>
					<label className="admin-field">
						<span className="admin-label">Description</span>
						<textarea 
							className="admin-input"
							value={formData.description}
							onChange={(e) => setFormData({ ...formData, description: e.target.value })}
							rows={5}
							required
						/>
					</label>
					<label className="admin-field">
						<span className="admin-label">Image URL</span>
						<input 
							className="admin-input"
							type="url"
							value={formData.image}
							onChange={(e) => setFormData({ ...formData, image: e.target.value })}
						/>
					</label>
					<label className="admin-field admin-checkbox-field">
						<input 
							type="checkbox"
							checked={formData.visible}
							onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
						/>
						<span className="admin-label">Visible</span>
					</label>
					<div className="admin-modal-footer">
						<button type="button" className="btn ghost" onClick={onClose}>Cancel</button>
						<button type="submit" className="btn primary">Save</button>
					</div>
				</form>
			</div>
		</div>
	);
}

// SEO Config Panel
function SEOConfigPanel() {
	const [config, setConfig] = useState({
		globalAutoSEO: true,
		globalAutoInternalLinks: true,
		maxInternalLinksPerPost: 5,
		defaultMetaKeywordsCount: 10,
		siteName: 'Safe Lines Customs Clearance',
		defaultOGImage: '',
		twitterHandle: '',
	});
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
	const panelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const saved = localStorage.getItem('admin_seo_config');
		if (saved) {
			try {
				setConfig(JSON.parse(saved));
			} catch (e) {
				console.error('Error loading SEO config:', e);
			}
		}
		setLoading(false);
	}, []);

	useEffect(() => {
		if (panelRef.current) {
			const cards = panelRef.current.querySelectorAll('.admin-panel-card');
			gsap.fromTo(cards,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
			);
		}
	}, []);

	function handleSave() {
		setSaving(true);
		setMessage(null);
		try {
			localStorage.setItem('admin_seo_config', JSON.stringify(config));
			setMessage({ type: 'success', text: 'Configuration saved successfully!' });
			setTimeout(() => setMessage(null), 3000);
		} catch (error: any) {
			setMessage({ type: 'error', text: error.message || 'Failed to save configuration' });
		} finally {
			setSaving(false);
		}
	}

	if (loading) {
		return (
			<div className="admin-panel">
				<div className="admin-panel-header">
					<h2>SEO Configuration</h2>
					<p>Loading...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="admin-panel" ref={panelRef}>
			<div className="admin-panel-header">
				<h2>Global SEO Configuration</h2>
				<p>Control site-wide SEO automation and default settings</p>
			</div>

			{message && (
				<div className={`admin-panel-card ${message.type === 'success' ? 'success' : 'error'}`} style={{
					marginBottom: '20px',
					padding: '16px',
					backgroundColor: message.type === 'success' ? '#f0fdf4' : '#fef2f2',
					border: `1px solid ${message.type === 'success' ? '#bbf7d0' : '#fecaca'}`,
					borderRadius: '8px',
					color: message.type === 'success' ? '#166534' : '#991b1b',
				}}>
					{message.text}
				</div>
			)}

			<div className="admin-panel-card">
				<h3>Global Automation Controls</h3>
				<p style={{ fontSize: '14px', color: 'var(--gray-600)', marginBottom: '16px' }}>
					When disabled, no blog posts will use automatic features (even if enabled per-post)
				</p>
				<div className="admin-actions" style={{ flexDirection: 'column', gap: '12px', alignItems: 'stretch' }}>
					<label className="admin-field admin-checkbox-field" style={{ padding: '12px', backgroundColor: 'var(--gray-50)', borderRadius: '8px' }}>
						<input
							type="checkbox"
							checked={config.globalAutoSEO}
							onChange={(e) => setConfig({ ...config, globalAutoSEO: e.target.checked })}
						/>
						<div style={{ flex: 1 }}>
							<div className="admin-label" style={{ fontWeight: 600, marginBottom: '4px' }}>Enable Auto-SEO Globally</div>
							<div style={{ fontSize: '14px', color: 'var(--gray-600)' }}>
								Automatically generate meta tags from blog content site-wide
							</div>
						</div>
					</label>
					<label className="admin-field admin-checkbox-field" style={{ padding: '12px', backgroundColor: 'var(--gray-50)', borderRadius: '8px' }}>
						<input
							type="checkbox"
							checked={config.globalAutoInternalLinks}
							onChange={(e) => setConfig({ ...config, globalAutoInternalLinks: e.target.checked })}
						/>
						<div style={{ flex: 1 }}>
							<div className="admin-label" style={{ fontWeight: 600, marginBottom: '4px' }}>Enable Auto Internal Links Globally</div>
							<div style={{ fontSize: '14px', color: 'var(--gray-600)' }}>
								Automatically apply internal link mappings site-wide
							</div>
						</div>
					</label>
				</div>
			</div>

			<div className="admin-panel-card">
				<h3>Default Settings</h3>
				<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
					<label className="admin-field">
						<span className="admin-label">Max Internal Links Per Post</span>
						<input
							className="admin-input"
							type="number"
							min="1"
							max="20"
							value={config.maxInternalLinksPerPost}
							onChange={(e) => setConfig({ ...config, maxInternalLinksPerPost: parseInt(e.target.value) || 5 })}
						/>
						<small style={{ fontSize: '12px', color: 'var(--gray-500)', marginTop: '4px', display: 'block' }}>
							Recommended: 3-5 links
						</small>
					</label>
					<label className="admin-field">
						<span className="admin-label">Default Meta Keywords Count</span>
						<input
							className="admin-input"
							type="number"
							min="1"
							max="20"
							value={config.defaultMetaKeywordsCount}
							onChange={(e) => setConfig({ ...config, defaultMetaKeywordsCount: parseInt(e.target.value) || 10 })}
						/>
						<small style={{ fontSize: '12px', color: 'var(--gray-500)', marginTop: '4px', display: 'block' }}>
							Number of keywords to extract
						</small>
					</label>
				</div>
			</div>

			<div className="admin-panel-card">
				<h3>Site-wide SEO Defaults</h3>
				<label className="admin-field">
					<span className="admin-label">Site Name</span>
					<input
						className="admin-input"
						type="text"
						value={config.siteName}
						onChange={(e) => setConfig({ ...config, siteName: e.target.value })}
						placeholder="Your Site Name"
					/>
					<small style={{ fontSize: '12px', color: 'var(--gray-500)', marginTop: '4px', display: 'block' }}>
						Used in Open Graph tags
					</small>
				</label>
				<label className="admin-field">
					<span className="admin-label">Default OG Image URL</span>
					<input
						className="admin-input"
						type="url"
						value={config.defaultOGImage}
						onChange={(e) => setConfig({ ...config, defaultOGImage: e.target.value })}
						placeholder="/images/default-og-image.jpg"
					/>
					<small style={{ fontSize: '12px', color: 'var(--gray-500)', marginTop: '4px', display: 'block' }}>
						Fallback image for social sharing
					</small>
				</label>
				<label className="admin-field">
					<span className="admin-label">Twitter Handle</span>
					<input
						className="admin-input"
						type="text"
						value={config.twitterHandle}
						onChange={(e) => setConfig({ ...config, twitterHandle: e.target.value })}
						placeholder="@yourhandle"
					/>
					<small style={{ fontSize: '12px', color: 'var(--gray-500)', marginTop: '4px', display: 'block' }}>
						Your Twitter username (with @)
					</small>
				</label>
			</div>

			<div className="admin-panel-card">
				<div className="admin-actions">
					<button className="btn primary" onClick={handleSave} disabled={saving}>
						{saving ? 'Saving...' : 'Save Configuration'}
					</button>
				</div>
			</div>

			<div className="admin-panel-card" style={{ backgroundColor: 'var(--blue-50)', border: '1px solid var(--blue-200)' }}>
				<h4 style={{ color: 'var(--blue-900)', marginBottom: '12px' }}>How This Works</h4>
				<ul style={{ fontSize: '14px', color: 'var(--blue-800)', paddingLeft: '20px', lineHeight: '1.8' }}>
					<li>Global toggles override per-post settings when disabled</li>
					<li>When global auto-SEO is OFF, only manual SEO data is used</li>
					<li>When global auto-links is OFF, only manual links are applied</li>
					<li>Per-post settings can disable automation even when global is enabled</li>
				</ul>
			</div>
		</div>
	);
}

// Link Mappings Panel
function LinkMappingsPanel() {
	type LinkMapping = {
		id: string;
		keyword: string;
		url: string;
		priority: number;
		caseSensitive: boolean;
		maxOccurrences: number;
		isActive: boolean;
		description?: string;
	};

	const [mappings, setMappings] = useState<LinkMapping[]>([]);
	const [loading, setLoading] = useState(false);
	const [showForm, setShowForm] = useState(false);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [formData, setFormData] = useState({
		keyword: '',
		url: '',
		priority: 0,
		caseSensitive: false,
		maxOccurrences: 1,
		isActive: true,
		description: '',
	});
	const [error, setError] = useState<string | null>(null);
	const panelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const saved = localStorage.getItem('admin_link_mappings');
		if (saved) {
			try {
				setMappings(JSON.parse(saved));
			} catch (e) {
				console.error('Error loading link mappings:', e);
			}
		}
	}, []);

	useEffect(() => {
		if (panelRef.current) {
			const cards = panelRef.current.querySelectorAll('.admin-panel-card');
			gsap.fromTo(cards,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
			);
		}
	}, [mappings]);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);

		if (!formData.keyword || !formData.url) {
			setError('Keyword and URL are required');
			return;
		}

		let updated: LinkMapping[];
		if (editingId) {
			updated = mappings.map(m => m.id === editingId ? { ...formData, id: editingId } : m);
		} else {
			updated = [...mappings, { ...formData, id: Date.now().toString() }];
		}

		setMappings(updated);
		localStorage.setItem('admin_link_mappings', JSON.stringify(updated));
		resetForm();
	}

	function handleEdit(mapping: LinkMapping) {
		setFormData({
			keyword: mapping.keyword,
			url: mapping.url,
			priority: mapping.priority,
			caseSensitive: mapping.caseSensitive,
			maxOccurrences: mapping.maxOccurrences,
			isActive: mapping.isActive,
			description: mapping.description || '',
		});
		setEditingId(mapping.id);
		setShowForm(true);
	}

	function handleDelete(id: string) {
		if (!confirm('Are you sure you want to delete this mapping?')) return;
		const updated = mappings.filter(m => m.id !== id);
		setMappings(updated);
		localStorage.setItem('admin_link_mappings', JSON.stringify(updated));
	}

	function handleToggleActive(mapping: LinkMapping) {
		const updated = mappings.map(m => 
			m.id === mapping.id ? { ...m, isActive: !m.isActive } : m
		);
		setMappings(updated);
		localStorage.setItem('admin_link_mappings', JSON.stringify(updated));
	}

	function resetForm() {
		setFormData({
			keyword: '',
			url: '',
			priority: 0,
			caseSensitive: false,
			maxOccurrences: 1,
			isActive: true,
			description: '',
		});
		setEditingId(null);
		setShowForm(false);
		setError(null);
	}

	return (
		<div className="admin-panel" ref={panelRef}>
			<div className="admin-panel-header">
				<h2>Internal Link Mappings</h2>
				<p>Configure keywords to automatically link in blog posts</p>
				<button className="btn primary" onClick={() => setShowForm(!showForm)}>
					{showForm ? 'Cancel' : '+ Add New Mapping'}
				</button>
			</div>

			{error && (
				<div className="admin-panel-card" style={{
					backgroundColor: '#fef2f2',
					border: '1px solid #fecaca',
					color: '#991b1b',
					marginBottom: '20px',
				}}>
					{error}
				</div>
			)}

			{showForm && (
				<div className="admin-panel-card">
					<h3>{editingId ? 'Edit Mapping' : 'Add New Mapping'}</h3>
					<form onSubmit={handleSubmit} className="admin-form">
						<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
							<label className="admin-field">
								<span className="admin-label">Keyword *</span>
								<input
									className="admin-input"
									type="text"
									required
									value={formData.keyword}
									onChange={(e) => setFormData({ ...formData, keyword: e.target.value })}
									placeholder="e.g., customs clearance"
								/>
							</label>
							<label className="admin-field">
								<span className="admin-label">URL *</span>
								<input
									className="admin-input"
									type="text"
									required
									value={formData.url}
									onChange={(e) => setFormData({ ...formData, url: e.target.value })}
									placeholder="/blog/post-id or /about"
								/>
							</label>
							<label className="admin-field">
								<span className="admin-label">Priority</span>
								<input
									className="admin-input"
									type="number"
									value={formData.priority}
									onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
								/>
								<small style={{ fontSize: '12px', color: 'var(--gray-500)', marginTop: '4px', display: 'block' }}>
									Higher priority links are applied first
								</small>
							</label>
							<label className="admin-field">
								<span className="admin-label">Max Occurrences</span>
								<input
									className="admin-input"
									type="number"
									min="1"
									value={formData.maxOccurrences}
									onChange={(e) => setFormData({ ...formData, maxOccurrences: parseInt(e.target.value) || 1 })}
								/>
								<small style={{ fontSize: '12px', color: 'var(--gray-500)', marginTop: '4px', display: 'block' }}>
									Max times this keyword can be linked per post
								</small>
							</label>
						</div>
						<label className="admin-field">
							<span className="admin-label">Description (Optional)</span>
							<input
								className="admin-input"
								type="text"
								value={formData.description}
								onChange={(e) => setFormData({ ...formData, description: e.target.value })}
								placeholder="Admin note about this mapping"
							/>
						</label>
						<div className="admin-actions" style={{ gap: '16px' }}>
							<label className="admin-field admin-checkbox-field">
								<input
									type="checkbox"
									checked={formData.caseSensitive}
									onChange={(e) => setFormData({ ...formData, caseSensitive: e.target.checked })}
								/>
								<span className="admin-label">Case Sensitive</span>
							</label>
							<label className="admin-field admin-checkbox-field">
								<input
									type="checkbox"
									checked={formData.isActive}
									onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
								/>
								<span className="admin-label">Active</span>
							</label>
						</div>
						<div className="admin-actions">
							<button type="submit" className="btn primary">
								{editingId ? 'Update Mapping' : 'Create Mapping'}
							</button>
							<button type="button" className="btn ghost" onClick={resetForm}>
								Cancel
							</button>
						</div>
					</form>
				</div>
			)}

			{mappings.length === 0 && !showForm ? (
				<div className="admin-panel-card">
					<div className="admin-empty-state">
						<p>No link mappings yet. Create your first one!</p>
					</div>
				</div>
			) : (
				<div className="admin-panel-grid">
					{mappings.map((mapping) => (
						<div key={mapping.id} className="admin-panel-card" style={{
							opacity: mapping.isActive ? 1 : 0.6,
							backgroundColor: mapping.isActive ? 'white' : 'var(--gray-50)',
						}}>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
								<div style={{ flex: 1 }}>
									<div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
										<strong>{mapping.keyword}</strong>
										<span style={{ color: 'var(--gray-400)' }}>→</span>
										<a href={mapping.url} target="_blank" rel="noopener noreferrer" className="blog-internal-link-item">
											{mapping.url}
										</a>
										{!mapping.isActive && (
											<span style={{
												padding: '2px 8px',
												backgroundColor: 'var(--gray-200)',
												color: 'var(--gray-600)',
												fontSize: '12px',
												borderRadius: '4px',
											}}>
												Inactive
											</span>
										)}
									</div>
									<div style={{ fontSize: '14px', color: 'var(--gray-600)', marginBottom: '8px' }}>
										<span>Priority: {mapping.priority}</span>
										<span style={{ margin: '0 8px' }}>•</span>
										<span>Max: {mapping.maxOccurrences}x</span>
										{mapping.caseSensitive && (
											<>
												<span style={{ margin: '0 8px' }}>•</span>
												<span>Case Sensitive</span>
											</>
										)}
									</div>
									{mapping.description && (
										<p style={{ fontSize: '14px', color: 'var(--gray-500)', marginTop: '8px' }}>
											{mapping.description}
										</p>
									)}
								</div>
							</div>
							<div className="admin-actions" style={{ marginTop: '12px' }}>
								<button
									className="btn ghost"
									onClick={() => handleToggleActive(mapping)}
									style={{
										backgroundColor: mapping.isActive ? '#dcfce7' : 'var(--gray-200)',
										color: mapping.isActive ? '#166534' : 'var(--gray-700)',
									}}
								>
									{mapping.isActive ? 'Active' : 'Inactive'}
								</button>
								<button className="btn ghost" onClick={() => handleEdit(mapping)}>
									Edit
								</button>
								<button
									className="btn ghost"
									onClick={() => handleDelete(mapping.id)}
									style={{ color: '#dc2626' }}
								>
									Delete
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
