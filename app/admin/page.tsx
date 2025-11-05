"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../contexts/LanguageContext";

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
	titleAr: string;
	content: string;
	contentAr: string;
	excerpt: string;
	excerptAr: string;
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

type ProcessStep = {
	number: number;
	title: string;
	titleAr: string;
	description: string;
	descriptionAr: string;
};

type Benefit = {
	icon?: string; // Icon image URL
	title: string;
	titleAr: string;
	description: string;
	descriptionAr: string;
};

type Testimonial = {
	name: string;
	nameAr: string;
	role: string;
	roleAr: string;
	rating: number;
	text: string;
	textAr: string;
};

type Service = {
	id: string;
	title: string;
	titleAr: string;
	description: string;
	descriptionAr: string;
	image?: string;
	icon?: string; // Icon image URL for service card
	visible: boolean;
	featured?: boolean; // Feature on homepage
	order: number;
	slug?: string; // URL slug for detail page
	detailedDescription?: string;
	detailedDescriptionAr?: string;
	processSteps?: ProcessStep[];
	benefits?: Benefit[];
	testimonials?: Testimonial[];
};

type ActivePanel = "images" | "blog" | "services" | "seo-config" | "link-mappings" | "jobs";

type Job = {
	id: string;
	title: string;
	titleAr: string;
	description: string;
	descriptionAr: string;
	image?: string;
	published: boolean;
	createdAt: string;
	updatedAt: string;
};

export default function AdminPage() {
	const { t, language, setLanguage } = useLanguage();
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
				setAuthError(t.admin.login.incorrectPassword);
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
			<div className="admin-login-page" dir={language === 'ar' ? 'rtl' : 'ltr'}>
				<div className="admin-login-background">
					<div className="admin-login-blob admin-login-blob-1"></div>
					<div className="admin-login-blob admin-login-blob-2"></div>
				</div>
				<div className="admin-login-container" ref={loginContainerRef}>
					<div className="admin-login-header">
						<button
							className="admin-language-toggle"
							onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
							aria-label="Toggle language"
						>
							{language === 'ar' ? 'EN' : 'AR'}
						</button>
					</div>
					<div className="admin-login-logo" ref={loginLogoRef}>
						<img src="/safelines_logo-removebg-preview.png" alt="Safe Lines Logo" />
						<h1>{t.admin.login.title}</h1>
					</div>
					<form onSubmit={handleAuthSubmit} className="admin-login-form" ref={loginFormRef} aria-label="Admin password form">
						<div className="admin-login-field-wrapper">
							<div className="admin-login-field">
								<label htmlFor="admin-password">{t.admin.login.password}</label>
								<input
									id="admin-password"
									ref={loginInputRef}
									type="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder={t.admin.login.passwordPlaceholder}
									aria-invalid={authError ? true : false}
									disabled={isLoggingIn}
									dir={language === 'ar' ? 'rtl' : 'ltr'}
								/>
								{authError && (
									<div className="admin-login-error" role="alert">
										{authError}
									</div>
								)}
							</div>
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
									{t.admin.login.signingIn}
								</>
							) : (
								t.admin.login.signIn
							)}
						</button>
					</form>
				</div>
			</div>
		);
	}

	// Dashboard
	return (
		<div className="admin admin-dashboard" dir={language === 'ar' ? 'rtl' : 'ltr'}>
			{sidebarOpen && (
				<div 
					className="admin-sidebar-overlay" 
					onClick={() => setSidebarOpen(false)}
					aria-label="Close sidebar"
				/>
			)}
			<AdminSidebar 
				ref={sidebarRef}
				activePanel={activePanel}
				setActivePanel={setActivePanel}
				onLogout={handleLogout}
				open={sidebarOpen}
				setOpen={setSidebarOpen}
			/>
			<div className="admin-dashboard-content" ref={dashboardRef}>
				<button
					className="admin-mobile-menu-toggle"
					onClick={() => setSidebarOpen(!sidebarOpen)}
					aria-label={t.admin.sidebar.toggleSidebar}
				>
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
						<line x1="3" y1="6" x2="21" y2="6"/>
						<line x1="3" y1="12" x2="21" y2="12"/>
						<line x1="3" y1="18" x2="21" y2="18"/>
					</svg>
				</button>
				{activePanel === "images" && <ImagesPanel />}
				{activePanel === "blog" && <BlogPanel />}
				{activePanel === "services" && <ServicesPanel />}
				{activePanel === "jobs" && <JobsPanel />}
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
	const { t, language } = useLanguage();
	const menuItems = [
		{ id: "images" as ActivePanel, label: t.admin.sidebar.images, icon: "image" },
		{ id: "blog" as ActivePanel, label: t.admin.sidebar.blog, icon: "article" },
		{ id: "services" as ActivePanel, label: t.admin.sidebar.services, icon: "settings" },
		{ id: "jobs" as ActivePanel, label: t.admin.sidebar.jobs, icon: "work" },
		{ id: "seo-config" as ActivePanel, label: t.admin.sidebar.seoConfig, icon: "seo" },
		{ id: "link-mappings" as ActivePanel, label: t.admin.sidebar.linkMappings, icon: "links" },
	];

	const sidebarRef = useRef<HTMLDivElement>(null);
	const logoTextRef = useRef<HTMLSpanElement>(null);
	const toggleButtonRef = useRef<HTMLButtonElement>(null);
	const navRef = useRef<HTMLElement>(null);
	const footerRef = useRef<HTMLDivElement>(null);
	const labelRefs = useRef<Map<string, HTMLSpanElement>>(new Map());
	const previousOpenState = useRef(open);

	// Initial animation on mount
	useEffect(() => {
		if (sidebarRef.current) {
			const items = sidebarRef.current.querySelectorAll('.admin-sidebar-item');
			gsap.fromTo(items,
				{ opacity: 0, x: -20 },
				{ opacity: 1, x: 0, duration: 0.4, stagger: 0.1, delay: 0.3, ease: "power2.out" }
			);
		}
	}, []);

	// Set initial state for labels after refs are ready
	useEffect(() => {
		// Use a small delay to ensure refs are populated
		const timer = setTimeout(() => {
			if (logoTextRef.current) {
				gsap.set(logoTextRef.current, { opacity: open ? 1 : 0, x: open ? 0 : -15, scale: open ? 1 : 0.9 });
			}
			const labels = Array.from(labelRefs.current.values());
			labels.forEach(label => {
				if (label) {
					gsap.set(label, { opacity: open ? 1 : 0, x: open ? 0 : -15, scale: open ? 1 : 0.9 });
				}
			});
			// Set initial sidebar width
			if (sidebarRef.current) {
				gsap.set(sidebarRef.current, { width: open ? 260 : 80 });
			}
		}, 50);
		
		return () => clearTimeout(timer);
	}, [open]);

	// Enhanced sidebar collapse/expand animation
	useEffect(() => {
		// Skip if this is the initial render
		if (previousOpenState.current === open) {
			previousOpenState.current = open;
			return;
		}
		
		if (!sidebarRef.current || !logoTextRef.current || !navRef.current || !footerRef.current) {
			previousOpenState.current = open;
			return;
		}

		const sidebar = sidebarRef.current;
		const logoText = logoTextRef.current;
		const nav = navRef.current;
		const footer = footerRef.current;
		const labels = Array.from(labelRefs.current.values()).filter(Boolean);
		const dashboardContent = document.querySelector('.admin-dashboard-content');
		const icons = sidebar.querySelectorAll('.admin-sidebar-icon');

		if (open) {
			// EXPANDING SIDEBAR - Premium animation sequence
			const tl = gsap.timeline();

			// 1. Animate sidebar width from 80px to 260px with bounce easing
			tl.to(sidebar, {
				width: 260,
				duration: 0.6,
				ease: "back.out(1.7)"
			});

			// 2. Fade in and slide logo text with scale
			tl.to(logoText, {
				opacity: 1,
				x: 0,
				scale: 1,
				duration: 0.4,
				ease: "power3.out"
			}, "-=0.4");

			// 3. Staggered label animation - fade and slide in sequentially
			tl.to(labels, {
				opacity: 1,
				x: 0,
				scale: 1,
				duration: 0.35,
				stagger: 0.06,
				ease: "power2.out"
			}, "-=0.3");

			// 4. Icon micro-animations (slight scale up)
			tl.to(icons, {
				scale: 1.05,
				duration: 0.3,
				stagger: 0.04,
				ease: "power2.out",
				yoyo: true,
				repeat: 1
			}, "-=0.2");

			// 5. Animate dashboard content margin
			if (dashboardContent) {
				tl.to(dashboardContent, {
					marginLeft: 260,
					duration: 0.6,
					ease: "back.out(1.7)"
				}, "-=0.6");
			}

			// 6. Toggle button rotation and morph
			if (toggleButtonRef.current) {
				tl.to(toggleButtonRef.current, {
					rotation: 0,
					scale: 1,
					duration: 0.4,
					ease: "back.out(1.5)"
				}, "-=0.4");
			}
		} else {
			// COLLAPSING SIDEBAR - Reverse animation
			const tl = gsap.timeline();

			// 1. Fade out labels first with stagger
			tl.to(labels, {
				opacity: 0,
				x: -15,
				scale: 0.9,
				duration: 0.25,
				stagger: 0.03,
				ease: "power2.in"
			});

			// 2. Fade out logo text
			tl.to(logoText, {
				opacity: 0,
				x: -15,
				scale: 0.9,
				duration: 0.25,
				ease: "power2.in"
			}, "-=0.15");

			// 3. Shrink sidebar width from 260px to 80px
			tl.to(sidebar, {
				width: 80,
				duration: 0.5,
				ease: "back.out(1.7)"
			}, "-=0.2");

			// 4. Animate dashboard content
			if (dashboardContent) {
				tl.to(dashboardContent, {
					marginLeft: 80,
					duration: 0.5,
					ease: "back.out(1.7)"
				}, "-=0.5");
			}

			// 5. Toggle button rotation
			if (toggleButtonRef.current) {
				tl.to(toggleButtonRef.current, {
					rotation: 180,
					scale: 1.1,
					duration: 0.35,
					ease: "back.out(1.5)"
				}, "-=0.3");
			}
		}
		
		previousOpenState.current = open;
	}, [open]);

	// Handle toggle with animation
	const handleToggle = () => {
		setOpen(!open);
	};

	return (
		<div className={`admin-sidebar ${open ? 'open' : 'collapsed'}`} ref={(el) => {
			if (el) {
				sidebarRef.current = el;
				if (typeof ref === 'function') {
					ref(el);
				} else if (ref) {
					ref.current = el;
				}
			}
		}}>
			<div className="admin-sidebar-header">
				<div className="admin-sidebar-logo">
					<img src="/safelines_logo-removebg-preview.png" alt="Safe Lines" />
					<span ref={logoTextRef} className="admin-sidebar-logo-text">Admin Panel</span>
				</div>
				<button 
					ref={toggleButtonRef}
					className="admin-sidebar-toggle" 
					onClick={handleToggle}
					aria-label="Toggle sidebar"
					onMouseEnter={(e) => {
						gsap.to(e.currentTarget, { 
							scale: 1.1, 
							rotation: open ? -10 : 10,
							duration: 0.2, 
							ease: "power2.out" 
						});
					}}
					onMouseLeave={(e) => {
						gsap.to(e.currentTarget, { 
							scale: 1, 
							rotation: open ? 0 : 180,
							duration: 0.2, 
							ease: "power2.out" 
						});
					}}
				>
					{open ? '←' : '→'}
				</button>
			</div>
			<nav className="admin-sidebar-nav" ref={navRef}>
				{menuItems.map((item) => (
					<button
						key={item.id}
						className={`admin-sidebar-item ${activePanel === item.id ? 'active' : ''}`}
						onClick={() => {
							// Add micro-interaction
							const button = document.querySelector(`[data-sidebar-item="${item.id}"]`) as HTMLElement;
							if (button) {
								gsap.to(button, {
									scale: 0.95,
									duration: 0.1,
									ease: "power2.out",
									yoyo: true,
									repeat: 1
								});
							}
							setActivePanel(item.id);
						}}
						data-sidebar-item={item.id}
						onMouseEnter={(e) => {
							if (activePanel !== item.id) {
								gsap.to(e.currentTarget, { 
									scale: 1.02, 
									x: 4,
									duration: 0.2, 
									ease: "power2.out" 
								});
							}
						}}
						onMouseLeave={(e) => {
							if (activePanel !== item.id) {
								gsap.to(e.currentTarget, { 
									scale: 1, 
									x: 0,
									duration: 0.2, 
									ease: "power2.out" 
								});
							}
						}}
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
						<span 
							className="admin-sidebar-label" 
							ref={(el) => {
								if (el) {
									labelRefs.current.set(item.id, el);
								}
							}}
						>
							{item.label}
						</span>
					</button>
				))}
			</nav>
			<div className="admin-sidebar-footer" ref={footerRef}>
				<button 
					className="admin-sidebar-item admin-logout-button" 
					onClick={onLogout}
					onMouseEnter={(e) => {
						gsap.to(e.currentTarget, { 
							scale: 1.02, 
							x: 4,
							duration: 0.2, 
							ease: "power2.out" 
						});
					}}
					onMouseLeave={(e) => {
						gsap.to(e.currentTarget, { 
							scale: 1, 
							x: 0,
							duration: 0.2, 
							ease: "power2.out" 
						});
					}}
				>
					<span className="admin-sidebar-icon">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
							<polyline points="16 17 21 12 16 7"/>
							<line x1="21" y1="12" x2="9" y2="12"/>
						</svg>
					</span>
					<span 
						className="admin-sidebar-label"
						ref={(el) => {
							if (el) {
								labelRefs.current.set('logout', el);
							}
						}}
					>
						{t.admin.sidebar.logout}
					</span>
				</button>
			</div>
		</div>
	);
});

AdminSidebar.displayName = "AdminSidebar";

// Images Panel (existing functionality)
type ImageSectionType = 
	"making-easy" | "strategy-right" | "hero-home" | "hero-about" |
	"about-milestone-1" | "about-milestone-2" | "about-milestone-3" | "about-milestone-4" |
	"about-feature-1" | "about-feature-2" | "about-feature-3" | "about-feature-4";

function ImagesPanel() {
	const [activeSection, setActiveSection] = useState<ImageSectionType>("making-easy");
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
				<p>Manage homepage images, hero banners, and about page images per section. Latest upload is displayed.</p>
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
								onChange={(e) => setActiveSection(e.target.value as ImageSectionType)} 
							>
								<optgroup label="Home Page">
									<option value="making-easy">Making future easy (left)</option>
									<option value="strategy-right">Strategy & Content (right)</option>
									<option value="hero-home">Hero Banner - Home Page</option>
								</optgroup>
								<optgroup label="About Page">
									<option value="hero-about">Hero Banner - About Page</option>
									<option value="about-milestone-1">Vision Timeline - Milestone 1</option>
									<option value="about-milestone-2">Vision Timeline - Milestone 2</option>
									<option value="about-milestone-3">Vision Timeline - Milestone 3</option>
									<option value="about-milestone-4">Vision Timeline - Milestone 4</option>
									<option value="about-feature-1">Why Choose Us - Feature 1</option>
									<option value="about-feature-2">Why Choose Us - Feature 2</option>
									<option value="about-feature-3">Why Choose Us - Feature 3</option>
									<option value="about-feature-4">Why Choose Us - Feature 4</option>
								</optgroup>
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
								<button 
									className="btn ghost danger" 
									data-action="delete"
									aria-label={`Delete ${f.filename}`} 
									onClick={() => onDelete(f._id)}
									onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.02, y: -2, duration: 0.3, ease: "power2.out" })}
									onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" })}
								>
									Delete
								</button>
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

	// Load blog posts from MongoDB
	useEffect(() => {
		async function loadPosts() {
			try {
				const res = await fetch('/api/blogs?includeUnpublished=true', { cache: 'no-store' });
				if (res.ok) {
					const data = await res.json();
					if (data.length > 0) {
						// Convert MongoDB _id to id for frontend
						const postsWithId = data.map((p: any) => ({
							...p,
							id: p._id?.toString() || p.id,
							_id: undefined, // Remove _id from frontend
						}));
						setPosts(postsWithId);
					} else {
						// Initialize with existing blog posts from blog/page.tsx if DB is empty
						const initialPosts: BlogPost[] = [
				{
					id: '1',
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
					id: '2',
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
					id: '3',
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
					id: '4',
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
					id: '5',
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
					id: '6',
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
						// Save initial posts to MongoDB
						for (const post of initialPosts) {
							await fetch('/api/blogs', {
								method: 'POST',
								headers: { 'Content-Type': 'application/json' },
								body: JSON.stringify(post),
							});
						}
						setPosts(initialPosts);
					}
				}
			} catch (error) {
				console.error('Error loading blog posts:', error);
			}
		}
		loadPosts();
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

		// Toast notification state
	const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

	function showToast(type: 'success' | 'error' | 'info', message: string) {
		setToast({ type, message });
		const toastEl = document.querySelector('.admin-toast');
		if (toastEl) {
			gsap.fromTo(toastEl,
				{ opacity: 0, x: 400 },
				{ opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
			);
			setTimeout(() => {
				gsap.to(toastEl, {
					opacity: 0,
					x: 400,
					duration: 0.3,
					ease: "power2.in",
					onComplete: () => setToast(null)
				});
			}, 3000);
		}
	}

	async function savePost(post: BlogPost) {
		// Auto-generate slug if not provided
		if (!post.slug && post.title) {
			post.slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
		}
		
		try {
			const postData = editingPost
				? { ...post, id: editingPost.id, updatedAt: new Date().toISOString() }
				: { ...post, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
			
			const response = await fetch('/api/blogs', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(postData),
			});
			
			if (response.ok) {
				// Reload posts from MongoDB
				const res = await fetch('/api/blogs?includeUnpublished=true', { cache: 'no-store' });
				if (res.ok) {
					const data = await res.json();
					const postsWithId = data.map((p: any) => ({
						...p,
						id: p._id?.toString() || p.id,
						_id: undefined,
					}));
					setPosts(postsWithId);
				}
				setEditingPost(null);
				setShowModal(false);
				showToast('success', editingPost ? 'Post updated successfully!' : 'Post created successfully!');
			} else {
				showToast('error', 'Failed to save post');
			}
		} catch (error) {
			console.error('Error saving post:', error);
			showToast('error', 'Error saving post');
		}
	}

	async function deletePost(id: string) {
		try {
			const response = await fetch(`/api/blogs?id=${id}`, {
				method: 'DELETE',
			});
			
			if (response.ok) {
				// Reload posts from MongoDB
				const res = await fetch('/api/blogs?includeUnpublished=true', { cache: 'no-store' });
				if (res.ok) {
					const data = await res.json();
					const postsWithId = data.map((p: any) => ({
						...p,
						id: p._id?.toString() || p.id,
						_id: undefined,
					}));
					setPosts(postsWithId);
				}
				showToast('success', 'Post deleted successfully!');
			} else {
				showToast('error', 'Failed to delete post');
			}
		} catch (error) {
			console.error('Error deleting post:', error);
			showToast('error', 'Error deleting post');
		}
	}

	// Add GSAP button hover animations
	useEffect(() => {
		const buttons = panelRef.current?.querySelectorAll('.btn');
		if (buttons) {
			buttons.forEach((btn) => {
				const handleMouseEnter = (e: Event) => {
					const target = e.currentTarget as HTMLElement;
					gsap.to(target, {
						scale: 1.02,
						y: -2,
						duration: 0.3,
						ease: "power2.out"
					});
				};
				const handleMouseLeave = (e: Event) => {
					const target = e.currentTarget as HTMLElement;
					gsap.to(target, {
						scale: 1,
						y: 0,
						duration: 0.3,
						ease: "power2.out"
					});
				};
				const handleMouseDown = (e: Event) => {
					const target = e.currentTarget as HTMLElement;
					gsap.to(target, {
						scale: 0.98,
						duration: 0.1,
						ease: "power2.out"
					});
				};
				const handleMouseUp = (e: Event) => {
					const target = e.currentTarget as HTMLElement;
					gsap.to(target, {
						scale: 1.02,
						duration: 0.1,
						ease: "power2.out"
					});
				};
				btn.addEventListener('mouseenter', handleMouseEnter);
				btn.addEventListener('mouseleave', handleMouseLeave);
				btn.addEventListener('mousedown', handleMouseDown);
				btn.addEventListener('mouseup', handleMouseUp);
				return () => {
					btn.removeEventListener('mouseenter', handleMouseEnter);
					btn.removeEventListener('mouseleave', handleMouseLeave);
					btn.removeEventListener('mousedown', handleMouseDown);
					btn.removeEventListener('mouseup', handleMouseUp);
				};
			});
		}
	}, [posts]);

	return (
		<div className="admin-panel" ref={panelRef}>
			<div className="admin-panel-header">
				<h2>Blog Management</h2>
				<p>Create, edit, and manage blog posts</p>
				<button 
					className="btn primary" 
					onClick={() => { setEditingPost(null); setShowModal(true); }}
					onMouseEnter={(e) => {
						gsap.to(e.currentTarget, { scale: 1.02, y: -2, duration: 0.3, ease: "power2.out" });
					}}
					onMouseLeave={(e) => {
						gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
					}}
				>
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
								{post.tags && Array.isArray(post.tags) && post.tags.map(tag => (
									<span key={tag} className="admin-blog-tag">{tag}</span>
								))}
							</div>
							<div className="admin-blog-actions">
								<button 
									className="btn ghost" 
									onClick={() => { setEditingPost(post); setShowModal(true); }}
									onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.02, y: -2, duration: 0.3, ease: "power2.out" })}
									onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" })}
								>
									Edit
								</button>
								<button 
									className="btn ghost danger" 
									data-action="delete"
									onClick={() => deletePost(post.id)}
									onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.02, y: -2, duration: 0.3, ease: "power2.out" })}
									onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" })}
								>
									Delete
								</button>
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
			{toast && (
				<div className={`admin-toast ${toast.type} show`}>
					<span className="admin-toast-icon">
						{toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ'}
					</span>
					<span>{toast.message}</span>
				</div>
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
		titleAr: post?.titleAr || '',
		content: post?.content || '',
		contentAr: post?.contentAr || '',
		excerpt: post?.excerpt || '',
		excerptAr: post?.excerptAr || '',
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
	const overlayRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLFormElement>(null);
	const previewRef = useRef<HTMLDivElement>(null);
	const previousPreviewMode = useRef(previewMode);

	// Helper function to normalize image URLs
	const normalizeImageUrl = (id: string): string => {
		const cleanId = String(id || '').trim().replace(/\/+$/, ''); // Remove trailing slashes and whitespace
		return `/api/images/${cleanId}`;
	};

	// Enhanced modal opening animation
	useEffect(() => {
		if (modalRef.current && overlayRef.current) {
			const modal = modalRef.current;
			const overlay = overlayRef.current;
			const content = contentRef.current;
			
			// Set initial states
			gsap.set(overlay, { opacity: 0, backdropFilter: 'blur(0px)' });
			gsap.set(modal, { opacity: 0, scale: 0.85, y: 30, filter: 'blur(10px)' });
			
			// Create timeline for coordinated animation
			const tl = gsap.timeline();
			
			// Animate overlay with blur
			tl.to(overlay, {
				opacity: 0.6,
				backdropFilter: 'blur(8px)',
				duration: 0.4,
				ease: "power3.out"
			});
			
			// Animate modal entrance
			tl.to(modal, {
				opacity: 1,
				scale: 1,
				y: 0,
				filter: 'blur(0px)',
				duration: 0.5,
				ease: "expo.out"
			}, "-=0.2");
			
			// Stagger content appearance
			if (content) {
				const fields = content.querySelectorAll('.admin-field, .admin-modal-header, .admin-modal-footer');
				gsap.fromTo(fields,
					{ opacity: 0, y: 20 },
					{
						opacity: 1,
						y: 0,
						duration: 0.4,
						stagger: 0.05,
						ease: "power2.out",
						delay: 0.2
					}
				);
			}
		}
	}, []);

	// Enhanced closing animation
	useEffect(() => {
		return () => {
			if (modalRef.current && overlayRef.current) {
				const modal = modalRef.current;
				const overlay = overlayRef.current;
				
				const tl = gsap.timeline();
				
				// Animate modal exit
				tl.to(modal, {
					opacity: 0,
					scale: 0.9,
					y: -20,
					filter: 'blur(5px)',
					duration: 0.3,
					ease: "power3.in"
				});
				
				// Fade out overlay
				tl.to(overlay, {
					opacity: 0,
					backdropFilter: 'blur(0px)',
					duration: 0.3,
					ease: "power2.in"
				}, "-=0.2");
			}
		};
	}, []);

	// Tab transition animations
	useEffect(() => {
		if (!contentRef.current) return;
		
		const content = contentRef.current;
		const seoSection = content.querySelector('.admin-seo-section');
		const linksSection = content.querySelector('.admin-links-section');
		
		if (showSEOSection && seoSection) {
			gsap.fromTo(seoSection,
				{ opacity: 0, x: -30, scale: 0.95 },
				{ opacity: 1, x: 0, scale: 1, duration: 0.4, ease: "power2.out" }
			);
		} else if (seoSection) {
			gsap.to(seoSection, {
				opacity: 0,
				x: 30,
				scale: 0.95,
				duration: 0.3,
				ease: "power2.in"
			});
		}
		
		if (showLinksSection && linksSection) {
			gsap.fromTo(linksSection,
				{ opacity: 0, x: -30, scale: 0.95 },
				{ opacity: 1, x: 0, scale: 1, duration: 0.4, ease: "power2.out" }
			);
		} else if (linksSection) {
			gsap.to(linksSection, {
				opacity: 0,
				x: 30,
				scale: 0.95,
				duration: 0.3,
				ease: "power2.in"
			});
		}
	}, [showSEOSection, showLinksSection]);

	// Preview mode cinematic animation
	useEffect(() => {
		if (previousPreviewMode.current !== previewMode && previewRef.current && modalRef.current) {
			const preview = previewRef.current;
			const modal = modalRef.current;
			const content = contentRef.current;
			
			if (previewMode) {
				// Entering preview mode - cinematic reveal
				const tl = gsap.timeline();
				
				// Darken background slightly
				tl.to(modal, {
					backgroundColor: 'rgba(248, 250, 252, 0.98)',
					duration: 0.3,
					ease: "power2.out"
				});
				
				// Fade out form content
				if (content) {
					tl.to(content.querySelectorAll('.admin-field'), {
						opacity: 0,
						y: -20,
						duration: 0.3,
						ease: "power2.in",
						stagger: 0.02
					}, "-=0.1");
				}
				
				// Slide up preview content from bottom
				gsap.set(preview, { opacity: 0, y: 100, scale: 0.9 });
				tl.to(preview, {
					opacity: 1,
					y: 0,
					scale: 1,
					duration: 0.6,
					ease: "expo.out"
				}, "-=0.2");
				
				// Stagger preview content appearance
				const previewElements = preview.querySelectorAll('h2, .admin-preview-excerpt, .admin-preview-content, img');
				gsap.fromTo(previewElements,
					{ opacity: 0, y: 30 },
					{
						opacity: 1,
						y: 0,
						duration: 0.5,
						stagger: 0.1,
						ease: "power2.out",
						delay: 0.3
					}
				);
				
				// Title typing effect (mask slide)
				const title = preview.querySelector('h2');
				if (title) {
					gsap.fromTo(title,
						{ clipPath: 'inset(0 100% 0 0)' },
						{
							clipPath: 'inset(0 0% 0 0)',
							duration: 0.8,
							ease: "power2.out",
							delay: 0.4
						}
					);
				}
				
				// Add parallax scroll effect to preview
				const previewContent = preview.querySelector('.admin-preview-content');
				if (previewContent) {
					preview.addEventListener('scroll', () => {
						const scrollTop = preview.scrollTop;
						const elements = preview.querySelectorAll('img, h2, .admin-preview-excerpt');
						elements.forEach((el, index) => {
							gsap.to(el, {
								y: scrollTop * 0.1 * (index + 1),
								duration: 0.1,
								ease: "none"
							});
						});
					});
				}
			} else {
				// Exiting preview mode - reverse animation
				const tl = gsap.timeline();
				
				// Slide down and fade out preview
				tl.to(preview, {
					opacity: 0,
					y: 100,
					scale: 0.9,
					duration: 0.4,
					ease: "power2.in"
				});
				
				// Restore modal background
				tl.to(modal, {
					backgroundColor: 'rgba(255, 255, 255, 0.98)',
					duration: 0.3,
					ease: "power2.out"
				}, "-=0.2");
				
				// Fade in form content
				if (content) {
					tl.fromTo(content.querySelectorAll('.admin-field'),
						{ opacity: 0, y: 20 },
						{
							opacity: 1,
							y: 0,
							duration: 0.4,
							ease: "power2.out",
							stagger: 0.03
						},
						"-=0.1"
					);
				}
			}
			
			previousPreviewMode.current = previewMode;
		}
	}, [previewMode]);

	// Add input focus animations
	useEffect(() => {
		const inputs = modalRef.current?.querySelectorAll('.admin-input');
		if (inputs) {
			inputs.forEach((input) => {
				const handleFocus = (e: Event) => {
					const target = e.currentTarget as HTMLElement;
					gsap.to(target, {
						scale: 1.01,
						y: -1,
						duration: 0.2,
						ease: "power2.out"
					});
				};
				const handleBlur = (e: Event) => {
					const target = e.currentTarget as HTMLElement;
					gsap.to(target, {
						scale: 1,
						y: 0,
						duration: 0.2,
						ease: "power2.out"
					});
				};
				input.addEventListener('focus', handleFocus);
				input.addEventListener('blur', handleBlur);
				return () => {
					input.removeEventListener('focus', handleFocus);
					input.removeEventListener('blur', handleBlur);
				};
			});
		}
	}, []);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		
		// Success animation before save
		if (modalRef.current) {
			const modal = modalRef.current;
			const tl = gsap.timeline({
				onComplete: () => {
					onSave(formData as BlogPost);
				}
			});
			
			// Pulse animation
			tl.to(modal, {
				scale: 1.02,
				duration: 0.15,
				ease: "power2.out"
			})
			.to(modal, {
				scale: 1,
				duration: 0.15,
				ease: "power2.in"
			});
			
			// Success glow effect
			const saveButton = modal.querySelector('button[type="submit"]');
			if (saveButton) {
				gsap.to(saveButton, {
					boxShadow: '0 0 30px rgba(16, 185, 129, 0.6)',
					duration: 0.3,
					ease: "power2.out",
					yoyo: true,
					repeat: 1
				});
			}
		} else {
			onSave(formData as BlogPost);
		}
	}

	const handleClose = () => {
		if (modalRef.current && overlayRef.current) {
			const modal = modalRef.current;
			const overlay = overlayRef.current;
			
			const tl = gsap.timeline({
				onComplete: () => onClose()
			});
			
			// Animate modal exit
			tl.to(modal, {
				opacity: 0,
				scale: 0.9,
				y: -20,
				filter: 'blur(5px)',
				duration: 0.3,
				ease: "power3.in"
			});
			
			// Fade out overlay
			tl.to(overlay, {
				opacity: 0,
				backdropFilter: 'blur(0px)',
				duration: 0.3,
				ease: "power2.in"
			}, "-=0.2");
		} else {
			onClose();
		}
	};

	return (
		<div className="admin-modal-overlay" ref={overlayRef} onClick={handleClose}>
			<div className="admin-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
				<div className="admin-modal-header">
					<h3>{post ? 'Edit Post' : 'New Post'}</h3>
					<div className="admin-modal-actions">
						<button 
							type="button"
							className={`admin-modal-tab ${showSEOSection ? 'active' : ''}`}
							onClick={() => {
								setShowSEOSection(!showSEOSection);
								setShowLinksSection(false);
								setPreviewMode(false);
							}}
							title="SEO Settings"
							onMouseEnter={(e) => {
								if (!showSEOSection) {
									gsap.to(e.currentTarget, { scale: 1.05, y: -2, duration: 0.2, ease: "power2.out" });
								}
							}}
							onMouseLeave={(e) => {
								if (!showSEOSection) {
									gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.2, ease: "power2.out" });
								}
							}}
						>
							<span>SEO</span>
							{showSEOSection && <span className="admin-modal-tab-indicator"></span>}
						</button>
						<button 
							type="button"
							className={`admin-modal-tab ${showLinksSection ? 'active' : ''}`}
							onClick={() => {
								setShowLinksSection(!showLinksSection);
								setShowSEOSection(false);
								setPreviewMode(false);
							}}
							title="Internal Links"
							onMouseEnter={(e) => {
								if (!showLinksSection) {
									gsap.to(e.currentTarget, { scale: 1.05, y: -2, duration: 0.2, ease: "power2.out" });
								}
							}}
							onMouseLeave={(e) => {
								if (!showLinksSection) {
									gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.2, ease: "power2.out" });
								}
							}}
						>
							<span>Links</span>
							{showLinksSection && <span className="admin-modal-tab-indicator"></span>}
						</button>
						<button 
							type="button"
							className={`admin-modal-tab ${previewMode ? 'active' : ''}`}
							onClick={() => {
								setPreviewMode(!previewMode);
								setShowSEOSection(false);
								setShowLinksSection(false);
							}}
							onMouseEnter={(e) => {
								if (!previewMode) {
									gsap.to(e.currentTarget, { scale: 1.05, y: -2, duration: 0.2, ease: "power2.out" });
								}
							}}
							onMouseLeave={(e) => {
								if (!previewMode) {
									gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.2, ease: "power2.out" });
								}
							}}
						>
							<span>{previewMode ? 'Edit' : 'Preview'}</span>
							{previewMode && <span className="admin-modal-tab-indicator"></span>}
						</button>
						<button 
							type="button"
							className="admin-modal-close" 
							onClick={handleClose}
							onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.1, rotation: 90, duration: 0.2, ease: "power2.out" })}
							onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, rotation: 0, duration: 0.2, ease: "power2.out" })}
						>
							×
						</button>
					</div>
				</div>
				<form onSubmit={handleSubmit} className="admin-modal-content" ref={contentRef}>
					{!previewMode ? (
						<div className="admin-modal-form-content">
							<label className="admin-field">
								<span className="admin-label">Title (English)</span>
								<input 
									className="admin-input"
									value={formData.title}
									onChange={(e) => setFormData({ ...formData, title: e.target.value })}
									required
								/>
							</label>
							<label className="admin-field">
								<span className="admin-label">Title (Arabic)</span>
								<input 
									className="admin-input"
									value={formData.titleAr}
									onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
									required
								/>
							</label>
							<label className="admin-field">
								<span className="admin-label">Excerpt (English)</span>
								<textarea 
									className="admin-input"
									value={formData.excerpt}
									onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
									rows={3}
									required
								/>
							</label>
							<label className="admin-field">
								<span className="admin-label">Excerpt (Arabic)</span>
								<textarea 
									className="admin-input"
									value={formData.excerptAr}
									onChange={(e) => setFormData({ ...formData, excerptAr: e.target.value })}
									rows={3}
									required
								/>
							</label>
							<label className="admin-field">
								<span className="admin-label">Content (English)</span>
								<textarea 
									className="admin-input"
									value={formData.content}
									onChange={(e) => setFormData({ ...formData, content: e.target.value })}
									rows={10}
									required
								/>
							</label>
							<label className="admin-field">
								<span className="admin-label">Content (Arabic)</span>
								<textarea 
									className="admin-input"
									value={formData.contentAr}
									onChange={(e) => setFormData({ ...formData, contentAr: e.target.value })}
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
								<span className="admin-label">Featured Image</span>
								<div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
									<input 
										className="admin-input"
										type="text"
										value={formData.featuredImage}
										onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
										placeholder="Enter image URL or upload from device"
										style={{ flex: 1 }}
									/>
									<label 
										className="btn primary"
										style={{ 
											display: 'inline-flex', 
											alignItems: 'center', 
											justifyContent: 'center',
											cursor: 'pointer',
											margin: 0
										}}
										onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.02, y: -2, duration: 0.3, ease: "power2.out" })}
										onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" })}
									>
										<input 
											type="file" 
											accept="image/*" 
											style={{ display: 'none' }}
											onChange={async (e) => {
												const file = e.target.files?.[0];
												if (!file) return;
												
												const formData = new FormData();
												formData.append('file', file);
												formData.append('section', 'blog');
												
												try {
													const res = await fetch('/api/images', {
														method: 'POST',
														body: formData
													});
													
													if (res.ok) {
														const data = await res.json();
														// Normalize and set the featured image URL
														const imageUrl = normalizeImageUrl(data.id);
														setFormData(prev => ({ ...prev, featuredImage: imageUrl }));
													} else {
														alert('Failed to upload image');
													}
												} catch (error) {
													console.error('Upload error:', error);
													alert('Error uploading image');
												}
												
												e.target.value = '';
											}}
										/>
										Upload
									</label>
								</div>
								{formData.featuredImage && (
									<div style={{ marginTop: '12px' }}>
										<img 
											src={formData.featuredImage} 
											alt="Preview" 
											style={{ 
												maxWidth: '100%', 
												maxHeight: '200px', 
												borderRadius: '8px',
												boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
											}} 
										/>
									</div>
								)}
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
						</div>
					) : (
						<div className="admin-preview" ref={previewRef}>
							{formData.featuredImage && (
								<img src={formData.featuredImage} alt={formData.title || formData.titleAr} />
							)}
							<h2>{formData.title || formData.titleAr}</h2>
							<p className="admin-preview-excerpt">{formData.excerpt || formData.excerptAr}</p>
							<div className="admin-preview-content">{formData.content || formData.contentAr}</div>
						</div>
					)}
					<div className="admin-modal-footer">
						<button 
							type="button" 
							className="btn ghost" 
							onClick={onClose}
							onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.02, y: -2, duration: 0.3, ease: "power2.out" })}
							onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" })}
						>
							Cancel
						</button>
						<button 
							type="submit" 
							className="btn primary"
							onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.02, y: -2, duration: 0.3, ease: "power2.out" })}
							onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" })}
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

// Jobs Panel
function JobsPanel() {
	const [jobs, setJobs] = useState<Job[]>([]);
	const [editingJob, setEditingJob] = useState<Job | null>(null);
	const [showModal, setShowModal] = useState(false);
	const panelRef = useRef<HTMLDivElement>(null);

	// Load jobs from MongoDB
	useEffect(() => {
		async function loadJobs() {
			try {
				const res = await fetch('/api/jobs?includeUnpublished=true', { cache: 'no-store' });
				if (res.ok) {
					const data = await res.json();
					const jobsWithId = data.map((j: any) => ({
						...j,
						id: j._id?.toString() || j.id,
						_id: undefined,
					}));
					setJobs(jobsWithId);
				}
			} catch (error) {
				console.error('Error loading jobs:', error);
			}
		}
		loadJobs();
	}, []);

	useEffect(() => {
		if (panelRef.current) {
			const cards = panelRef.current.querySelectorAll('.admin-job-card');
			gsap.fromTo(cards,
				{ opacity: 0, y: 20 },
				{ opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
			);
		}
	}, [jobs]);

	const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

	function showToast(type: 'success' | 'error' | 'info', message: string) {
		setToast({ type, message });
		const toastEl = document.querySelector('.admin-toast');
		if (toastEl) {
			gsap.fromTo(toastEl,
				{ opacity: 0, x: 400 },
				{ opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
			);
			setTimeout(() => {
				gsap.to(toastEl, {
					opacity: 0,
					x: 400,
					duration: 0.3,
					ease: "power2.in",
					onComplete: () => setToast(null)
				});
			}, 3000);
		}
	}

	async function saveJob(job: Job) {
		// This function is called from the modal, but the modal handles the actual save
		// So we just refresh the list and close the modal
		try {
			const res = await fetch('/api/jobs?includeUnpublished=true', { cache: 'no-store' });
			if (res.ok) {
				const data = await res.json();
				const jobsWithId = data.map((j: any) => ({
					...j,
					id: j._id?.toString() || j.id,
					_id: undefined,
				}));
				setJobs(jobsWithId);
			}
			setEditingJob(null);
			setShowModal(false);
			showToast('success', editingJob ? 'Job updated successfully!' : 'Job created successfully!');
		} catch (error) {
			console.error('Error refreshing jobs:', error);
		}
	}

	async function deleteJob(id: string) {
		try {
			const response = await fetch(`/api/jobs?id=${id}`, {
				method: 'DELETE',
			});
			
			if (response.ok) {
				const res = await fetch('/api/jobs?includeUnpublished=true', { cache: 'no-store' });
				if (res.ok) {
					const data = await res.json();
					const jobsWithId = data.map((j: any) => ({
						...j,
						id: j._id?.toString() || j.id,
						_id: undefined,
					}));
					setJobs(jobsWithId);
				}
				showToast('success', 'Job deleted successfully!');
			} else {
				showToast('error', 'Failed to delete job');
			}
		} catch (error) {
			console.error('Error deleting job:', error);
			showToast('error', 'Error deleting job');
		}
	}

	useEffect(() => {
		const buttons = panelRef.current?.querySelectorAll('.btn');
		if (buttons) {
			buttons.forEach((btn) => {
				const handleMouseEnter = (e: Event) => {
					const target = e.currentTarget as HTMLElement;
					gsap.to(target, {
						scale: 1.02,
						y: -2,
						duration: 0.3,
						ease: "power2.out"
					});
				};
				const handleMouseLeave = (e: Event) => {
					const target = e.currentTarget as HTMLElement;
					gsap.to(target, {
						scale: 1,
						y: 0,
						duration: 0.3,
						ease: "power2.out"
					});
				};
				btn.addEventListener('mouseenter', handleMouseEnter);
				btn.addEventListener('mouseleave', handleMouseLeave);
				return () => {
					btn.removeEventListener('mouseenter', handleMouseEnter);
					btn.removeEventListener('mouseleave', handleMouseLeave);
				};
			});
		}
	}, [jobs]);

	return (
		<div className="admin-panel" ref={panelRef}>
			<div className="admin-panel-header">
				<h2>Jobs Management</h2>
				<p>Create, edit, and manage job postings</p>
				<button 
					className="btn primary" 
					onClick={() => { setEditingJob(null); setShowModal(true); }}
					onMouseEnter={(e) => {
						gsap.to(e.currentTarget, { scale: 1.02, y: -2, duration: 0.3, ease: "power2.out" });
					}}
					onMouseLeave={(e) => {
						gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" });
					}}
				>
					+ New Job
				</button>
			</div>
			<div className="admin-blog-grid">
				{jobs.map((job) => (
					<div key={job.id} className="admin-blog-card">
						{job.image && (
							<img src={job.image} alt={job.title} className="admin-blog-image" />
						)}
						<div className="admin-blog-content">
							<div className="admin-blog-header">
								<h3>{job.title}</h3>
								<span className={`admin-blog-status ${job.published ? 'published' : 'draft'}`}>
									{job.published ? 'Published' : 'Draft'}
								</span>
							</div>
							<p className="admin-blog-excerpt">{job.description.substring(0, 150)}...</p>
							<div className="admin-blog-actions">
								<button 
									className="btn ghost" 
									onClick={() => { setEditingJob(job); setShowModal(true); }}
									onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.02, y: -2, duration: 0.3, ease: "power2.out" })}
									onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" })}
								>
									Edit
								</button>
								<button 
									className="btn ghost danger" 
									onClick={() => deleteJob(job.id)}
									onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.02, y: -2, duration: 0.3, ease: "power2.out" })}
									onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" })}
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				))}
				{jobs.length === 0 && (
					<div className="admin-empty-state">
						<p>No jobs yet. Create your first job posting!</p>
					</div>
				)}
			</div>
			{showModal && (
				<JobModal 
					job={editingJob}
					onSave={saveJob}
					onClose={() => { setShowModal(false); setEditingJob(null); }}
				/>
			)}
			{toast && (
				<div className={`admin-toast ${toast.type} show`}>
					<span className="admin-toast-icon">
						{toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ'}
					</span>
					<span>{toast.message}</span>
				</div>
			)}
		</div>
	);
}

// Job Modal Component
function JobModal({ job, onSave, onClose }: {
	job: Job | null;
	onSave: (job: Job) => void;
	onClose: () => void;
}) {
	const [formData, setFormData] = useState<Partial<Job>>({
		title: job?.title || '',
		titleAr: job?.titleAr || '',
		description: job?.description || '',
		descriptionAr: job?.descriptionAr || '',
		published: job?.published ?? true,
		image: job?.image,
	});
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(job?.image || null);
	const modalRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (modalRef.current && overlayRef.current) {
			const modal = modalRef.current;
			const overlay = overlayRef.current;
			
			gsap.set([modal, overlay], { opacity: 0 });
			gsap.set(modal, { scale: 0.9, y: 20 });
			gsap.set(overlay, { backdropFilter: 'blur(0px)' });
			
			const tl = gsap.timeline();
			tl.to(overlay, {
				opacity: 1,
				backdropFilter: 'blur(8px)',
				duration: 0.3,
				ease: "power2.out"
			})
			.to(modal, {
				opacity: 1,
				scale: 1,
				y: 0,
				duration: 0.4,
				ease: "expo.out"
			}, "-=0.2");
		}
	}, []);

	const [isSubmitting, setIsSubmitting] = useState(false);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		
		if (isSubmitting) return; // Prevent double submission
		setIsSubmitting(true);
		
		const formDataToSubmit = new FormData();
		if (job) {
			formDataToSubmit.append('id', job.id);
		}
		formDataToSubmit.append('title', formData.title || '');
		formDataToSubmit.append('titleAr', formData.titleAr || '');
		formDataToSubmit.append('description', formData.description || '');
		formDataToSubmit.append('descriptionAr', formData.descriptionAr || '');
		formDataToSubmit.append('published', (formData.published || false).toString());
		
		if (imageFile) {
			formDataToSubmit.append('file', imageFile);
		}

		fetch('/api/jobs', {
			method: 'POST',
			body: formDataToSubmit,
		})
		.then(res => res.json())
		.then(data => {
			if (data.success) {
				onSave({
					id: data.id || job?.id || '',
					title: formData.title || '',
					titleAr: formData.titleAr || '',
					description: formData.description || '',
					descriptionAr: formData.descriptionAr || '',
					published: formData.published || false,
					image: imagePreview || formData.image,
					createdAt: job?.createdAt || new Date().toISOString(),
					updatedAt: new Date().toISOString(),
				});
			}
		})
		.catch(err => {
			console.error('Error saving job:', err);
		})
		.finally(() => {
			setIsSubmitting(false);
		});
	}

	function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
		const file = e.target.files?.[0];
		if (file) {
			setImageFile(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	}

	const handleClose = () => {
		if (modalRef.current && overlayRef.current) {
			const modal = modalRef.current;
			const overlay = overlayRef.current;
			
			const tl = gsap.timeline({
				onComplete: () => onClose()
			});
			
			tl.to(modal, {
				opacity: 0,
				scale: 0.9,
				y: -20,
				duration: 0.3,
				ease: "power3.in"
			});
			
			tl.to(overlay, {
				opacity: 0,
				backdropFilter: 'blur(0px)',
				duration: 0.3,
				ease: "power2.in"
			}, "-=0.2");
		} else {
			onClose();
		}
	};

	return (
		<div className="admin-modal-overlay" ref={overlayRef} onClick={handleClose}>
			<div className="admin-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
				<div className="admin-modal-header">
					<h3>{job ? 'Edit Job' : 'New Job'}</h3>
					<button className="admin-modal-close" onClick={handleClose}>×</button>
				</div>
				<form onSubmit={handleSubmit} className="admin-modal-form">
					<div className="admin-modal-form-scrollable">
						<div className="admin-field">
							<label className="admin-label">Job Title (English)</label>
							<input
								className="admin-input"
								type="text"
								value={formData.title}
								onChange={(e) => setFormData({ ...formData, title: e.target.value })}
								required
							/>
						</div>
						<div className="admin-field">
							<label className="admin-label">Job Title (Arabic)</label>
							<input
								className="admin-input"
								type="text"
								value={formData.titleAr}
								onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
								required
							/>
						</div>
						<div className="admin-field">
							<label className="admin-label">Job Description (English)</label>
							<textarea
								className="admin-input"
								rows={6}
								value={formData.description}
								onChange={(e) => setFormData({ ...formData, description: e.target.value })}
								required
							/>
						</div>
						<div className="admin-field">
							<label className="admin-label">Job Description (Arabic)</label>
							<textarea
								className="admin-input"
								rows={6}
								value={formData.descriptionAr}
								onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
								required
							/>
						</div>
						<div className="admin-field">
							<label className="admin-label">Job Image</label>
							<input
								className="admin-input"
								type="file"
								accept="image/*"
								onChange={handleImageChange}
							/>
							{imagePreview && (
								<div style={{ marginTop: '12px' }}>
									<img src={imagePreview} alt="Preview" style={{ maxWidth: '200px', borderRadius: '8px' }} />
								</div>
							)}
						</div>
						<div className="admin-field">
							<label className="admin-label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
								<input
									type="checkbox"
									checked={formData.published}
									onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
								/>
								Published
							</label>
						</div>
					</div>
					<div className="admin-modal-footer">
						<button type="button" className="btn ghost" onClick={handleClose} disabled={isSubmitting}>Cancel</button>
						<button type="submit" className="btn primary" disabled={isSubmitting}>
							{isSubmitting ? 'Saving...' : 'Save Job'}
						</button>
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

	// Load services from MongoDB
	useEffect(() => {
		async function loadServices() {
			try {
				const res = await fetch('/api/services?includeUnpublished=true', { cache: 'no-store' });
				if (res.ok) {
					const data = await res.json();
					if (data.length > 0) {
						// Convert MongoDB _id to id for frontend
						const servicesWithId = data.map((s: any) => ({
							...s,
							id: s._id?.toString() || s.id,
							_id: undefined, // Remove _id from frontend
						}));
						setServices(servicesWithId);
					} else {
						// Initialize with existing services from translations if DB is empty
						const initialServices: Service[] = [
				// Transportation Services
				{
					id: '1',
					title: 'Transportation to customer warehouses throughout the Kingdom',
					titleAr: 'النقل إلى مستودعات العميل في جميع أنحاء المملكة',
					description: 'We provide integrated transportation services covering all sea ports, air and land entry points, and all types of containers and parcels, including refrigerated and regular transport, ensuring fast and safe delivery to customer warehouses throughout the Kingdom.',
					descriptionAr: 'نقدم خدمات نقل متكاملة تشمل جميع الموانئ البحرية والمنافذ الجوية والبرية ونغطي جميع أنواع الحاويات والطرود، بما في ذلك النقل المبرد والنقل العادي مع ضمان توصيل سريع وآمن إلى مستودعات العملاء في مختلف أنحاء المملكة.',
					visible: true,
					order: 0,
				},
				{
					id: '2',
					title: 'Flexible distribution service',
					titleAr: 'نوفر خدمة توزيع مرنة تتوافق مع احتياجات العملاء',
					description: 'We provide a flexible distribution service that meets customer needs, ensuring the delivery of shipments to multiple locations according to the customer\'s desire, which facilitates the delivery of goods at specified times and locations.',
					descriptionAr: 'حيث نضمن توصيل الشحنات إلى مواقع متعددة وفقا لرغبة العميل. مما يسهل توصيل البضائع في الوقت والمكان المحددين.',
					visible: true,
					order: 1,
				},
				{
					id: '3',
					title: 'Transportation and Storage to and from the Yard',
					titleAr: 'نقل وتخزين من وإلى الساحة',
					description: 'Providing comprehensive yard services including saving money and time, vast spaces and a safe environment for storage, increasing work efficiency and reducing the risks of floor accumulation, and accuracy and flexibility in the process of receiving shipments after storage.',
					descriptionAr: 'توفير المال والوقت . مساحات شاسعة وبيئة آمنة للتخزين . رفع كفاءة العمل وتقليل مخاطر تراكم الأرضيات. الدقة والمرونة في عملية استلام الشحنات ما بعد التخزين .',
					visible: true,
					order: 2,
				},
				// Customs Services
				{
					id: '4',
					title: 'Customs Clearance for Exports and Imports',
					titleAr: 'تخليص جمركي للصادرات والواردات',
					description: 'We work to facilitate all customs procedures for your commercial and personal exports and imports, ensuring fast clearance of shipments and reducing unnecessary delays.',
					descriptionAr: 'نعمل على تسهيل جميع الإجراءات الجمركية لصادراتكم ووارداتكم التجارية والشخصية، بما يضمن سرعة الفسح عن الشحنات وتقليل التأخير الغير الضروري.',
					visible: true,
					order: 3,
				},
				{
					id: '5',
					title: 'SABER Certificate Issuance',
					titleAr: 'استخراج شهادة هيئة المواصفات والمقاييس السعودية ( سابر )',
					description: 'We provide a specialized service for issuing product conformity certificates from the Saudi Standards, Metrology and Quality Organization (SABER) to ensure their compliance with the quality standards approved in the Saudi market.',
					descriptionAr: 'نقدم خدمة متخصصة في استخراج شهادة المطابقة للمنتجات للتأكد من توافقها مع معايير الجودة المعتمدة في السوق السعودي.',
					visible: true,
					order: 4,
				},
				{
					id: '6',
					title: 'SFDA Product Registration',
					titleAr: 'تسجيل المنتجات في الهيئة العامة للغذاء والدواء (SFDA)',
					description: 'We provide a service for registering food and pharmaceutical products with the Saudi Food and Drug Authority (SFDA) and issuing import approvals to ensure compliance with regulatory requirements and their entry into the Saudi market.',
					descriptionAr: 'نوفر خدمة تسجيل المنتجات الغذائية والدوائية في الهيئة العامة للغذاء والدواء وإصدار الموافقة بالاستيراد لضمان الامتثال للمتطلبات التنظيمية ودخولها للسوق السعودي.',
					visible: true,
					order: 5,
				},
				{
					id: '7',
					title: 'Follow-up and Tracking',
					titleAr: 'المتابعة والتعقيب',
					description: 'We provide a continuous follow-up service for all shipments and track the progress of procedures from the country of origin to the destination to ensure timely arrival of shipments.',
					descriptionAr: 'نوفر خدمة متابعة مستمرة لجميع الشحنات والتعقيب على سير الإجراءات من البلد المصدر إلى جهة الوصول لضمان وصول الشحنات في الوقت المناسب.',
					visible: true,
					order: 6,
				},
				{
					id: '8',
					title: 'Avoiding Unnecessary Expenses',
					titleAr: 'تجنب النفقات غير الضرورية - الآمنة للتخليص الجمركي',
					description: 'We guide you in reducing unnecessary costs according to the requirements for each type of product to avoid errors and prevent demurrage by improving customs and logistics operations and increasing operational efficiency.',
					descriptionAr: 'نرشدك في تقليل التكاليف الغير الضرورية حسب المتطلبات لكل نوع من المنتجات لتجنب الأخطاء وتفادياً للأرضيات من خلال تحسين العمليات الجمركية واللوجستية وزيادة الكفاءة التشغيلية.',
					visible: true,
					order: 7,
				},
				{
					id: '9',
					title: '24/7 Customer Service',
					titleAr: 'تقديم خدمات العملاء على مدار الساعة',
					description: 'Our team is available to serve customers according to official working hours to ensure continuous support and respond to inquiries.',
					descriptionAr: 'فريقنا متاح لخدمة العملاء وفقاً لأوقات العمل الرسمية لضمان تقديم الدعم المستمر والرد على الاستفسارات.',
					visible: true,
					order: 8,
				},
				{
					id: '10',
					title: 'Customs and Logistics Consultations',
					titleAr: 'الاستشارات الجمركية واللوجستية',
					description: 'We provide our clients with the best solutions and information regarding customs laws and logistics procedures to achieve safe shipping and smooth operations.',
					descriptionAr: 'نزود عملاءنا بأفضل الحلول والمعلومات حول القوانين الجمركية والإجراءات اللوجستية لتحقيق شحن آمن وسلاسة في العمليات.',
					visible: true,
					order: 9,
				},
						];
						// Save initial services to MongoDB
						for (const service of initialServices) {
							await fetch('/api/services', {
								method: 'POST',
								headers: { 'Content-Type': 'application/json' },
								body: JSON.stringify(service),
							});
						}
						setServices(initialServices);
					}
				}
			} catch (error) {
				console.error('Error loading services:', error);
			}
		}
		loadServices();
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

	// Toast notification state
	const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

	function showToast(type: 'success' | 'error' | 'info', message: string) {
		setToast({ type, message });
		const toastEl = document.querySelector('.admin-toast');
		if (toastEl) {
			gsap.fromTo(toastEl,
				{ opacity: 0, x: 400 },
				{ opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }
			);
			setTimeout(() => {
				gsap.to(toastEl, {
					opacity: 0,
					x: 400,
					duration: 0.3,
					ease: "power2.in",
					onComplete: () => setToast(null)
				});
			}, 3000);
		}
	}

	async function saveService(service: Service) {
		try {
			const response = await fetch('/api/services', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					...service,
					id: editingService?.id || service.id,
				}),
			});
			
			if (response.ok) {
				const result = await response.json();
				// Reload services from MongoDB (include all services for admin, not just visible)
				const res = await fetch('/api/services?includeUnpublished=true', { cache: 'no-store' });
				if (res.ok) {
					const data = await res.json();
					const servicesWithId = data.map((s: any) => ({
						...s,
						id: s._id?.toString() || s.id,
						_id: undefined,
					}));
					setServices(servicesWithId);
				}
				setEditingService(null);
				setShowModal(false);
				showToast('success', editingService ? 'Service updated successfully!' : 'Service created successfully!');
			} else {
				showToast('error', 'Failed to save service');
			}
		} catch (error) {
			console.error('Error saving service:', error);
			showToast('error', 'Error saving service');
		}
	}

	async function deleteService(id: string) {
		try {
			const response = await fetch(`/api/services?id=${id}`, {
				method: 'DELETE',
			});
			
			if (response.ok) {
				// Reload services from MongoDB
				const res = await fetch('/api/services', { cache: 'no-store' });
				if (res.ok) {
					const data = await res.json();
					const servicesWithId = data.map((s: any) => ({
						...s,
						id: s._id?.toString() || s.id,
						_id: undefined,
					}));
					setServices(servicesWithId);
				}
				showToast('success', 'Service deleted successfully!');
			} else {
				showToast('error', 'Failed to delete service');
			}
		} catch (error) {
			console.error('Error deleting service:', error);
			showToast('error', 'Error deleting service');
		}
	}

	async function toggleVisibility(id: string) {
		const service = services.find(s => s.id === id);
		if (!service) return;
		
		try {
			const updatedService = { ...service, visible: !service.visible };
			await fetch('/api/services', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(updatedService),
			});
			
			// Reload services from MongoDB
			const res = await fetch('/api/services', { cache: 'no-store' });
			if (res.ok) {
				const data = await res.json();
				const servicesWithId = data.map((s: any) => ({
					...s,
					id: s._id?.toString() || s.id,
					_id: undefined,
				}));
				setServices(servicesWithId);
			}
		} catch (error) {
			console.error('Error toggling visibility:', error);
		}
	}

	async function reorderService(id: string, direction: 'up' | 'down') {
		const index = services.findIndex(s => s.id === id);
		if (index === -1) return;
		const newIndex = direction === 'up' ? index - 1 : index + 1;
		if (newIndex < 0 || newIndex >= services.length) return;
		
		const updated = [...services];
		[updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
		updated.forEach((s, i) => s.order = i);
		
				// Update all services with new order
		try {
			for (const service of updated) {
				await fetch('/api/services', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(service),
				});
			}
			
			// Reload services from MongoDB
			const res = await fetch('/api/services?includeUnpublished=true', { cache: 'no-store' });
			if (res.ok) {
				const data = await res.json();
				const servicesWithId = data.map((s: any) => ({
					...s,
					id: s._id?.toString() || s.id,
					_id: undefined,
				}));
				setServices(servicesWithId);
			}
		} catch (error) {
			console.error('Error reordering services:', error);
		}
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
							<div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
								<h3 style={{ margin: 0 }}>{service.title}</h3>
								{service.featured && (
									<span style={{ 
										background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', 
										color: 'white', 
										padding: '2px 8px', 
										borderRadius: '4px', 
										fontSize: '11px', 
										fontWeight: 600,
										textTransform: 'uppercase'
									}}>
										Featured
									</span>
								)}
							</div>
							<p>{service.description}</p>
							<div className="admin-service-actions">
								<button 
									className="btn ghost" 
									onClick={() => { setEditingService(service); setShowModal(true); }}
									onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.02, y: -2, duration: 0.3, ease: "power2.out" })}
									onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" })}
								>
									Edit
								</button>
								<button 
									className="btn ghost danger" 
									data-action="delete"
									onClick={() => deleteService(service.id)}
									onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.02, y: -2, duration: 0.3, ease: "power2.out" })}
									onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" })}
								>
									Delete
								</button>
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
			{toast && (
				<div className={`admin-toast ${toast.type} show`}>
					<span className="admin-toast-icon">
						{toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ'}
					</span>
					<span>{toast.message}</span>
				</div>
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
		titleAr: service?.titleAr || '',
		description: service?.description || '',
		descriptionAr: service?.descriptionAr || '',
		image: service?.image || '',
		icon: service?.icon || '',
		visible: service?.visible ?? true,
		featured: service?.featured ?? false,
		order: service?.order ?? 0,
		slug: service?.slug || '',
		detailedDescription: service?.detailedDescription || '',
		detailedDescriptionAr: service?.detailedDescriptionAr || '',
		processSteps: service?.processSteps || [],
		benefits: service?.benefits || [],
		testimonials: service?.testimonials || [],
	});
	const modalRef = useRef<HTMLDivElement>(null);
	const overlayRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef<HTMLFormElement>(null);

	// Helper function to normalize image URLs
	const normalizeImageUrl = (id: string): string => {
		const cleanId = String(id || '').trim().replace(/\/+$/, ''); // Remove trailing slashes and whitespace
		return `/api/images/${cleanId}`;
	};

	// Enhanced modal opening animation
	useEffect(() => {
		if (modalRef.current && overlayRef.current) {
			const modal = modalRef.current;
			const overlay = overlayRef.current;
			const content = contentRef.current;
			
			// Set initial states
			gsap.set(overlay, { opacity: 0, backdropFilter: 'blur(0px)' });
			gsap.set(modal, { opacity: 0, scale: 0.85, y: 30, filter: 'blur(10px)' });
			
			// Create timeline for coordinated animation
			const tl = gsap.timeline();
			
			// Animate overlay with blur
			tl.to(overlay, {
				opacity: 0.6,
				backdropFilter: 'blur(8px)',
				duration: 0.4,
				ease: "power3.out"
			});
			
			// Animate modal entrance
			tl.to(modal, {
				opacity: 1,
				scale: 1,
				y: 0,
				filter: 'blur(0px)',
				duration: 0.5,
				ease: "expo.out"
			}, "-=0.2");
			
			// Stagger content appearance
			if (content) {
				const fields = content.querySelectorAll('.admin-field, .admin-modal-header, .admin-modal-footer');
				gsap.fromTo(fields,
					{ opacity: 0, y: 20 },
					{
						opacity: 1,
						y: 0,
						duration: 0.4,
						stagger: 0.05,
						ease: "power2.out",
						delay: 0.2
					}
				);
			}
		}
	}, []);

	// Add input focus animations
	useEffect(() => {
		const inputs = modalRef.current?.querySelectorAll('.admin-input');
		if (inputs) {
			inputs.forEach((input) => {
				const handleFocus = (e: Event) => {
					const target = e.currentTarget as HTMLElement;
					gsap.to(target, {
						scale: 1.01,
						y: -1,
						duration: 0.2,
						ease: "power2.out"
					});
				};
				const handleBlur = (e: Event) => {
					const target = e.currentTarget as HTMLElement;
					gsap.to(target, {
						scale: 1,
						y: 0,
						duration: 0.2,
						ease: "power2.out"
					});
				};
				input.addEventListener('focus', handleFocus);
				input.addEventListener('blur', handleBlur);
				return () => {
					input.removeEventListener('focus', handleFocus);
					input.removeEventListener('blur', handleBlur);
				};
			});
		}
	}, []);

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		
		// Auto-generate slug if not provided
		const finalData = { ...formData };
		if (!finalData.slug && finalData.title) {
			finalData.slug = finalData.title.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
		}
		
		// Ensure featured defaults to false if not set
		if (finalData.featured === undefined) {
			finalData.featured = false;
		}
		
		// Success animation before save
		if (modalRef.current) {
			const modal = modalRef.current;
			const tl = gsap.timeline({
				onComplete: () => {
					onSave(finalData as Service);
				}
			});
			
			// Pulse animation
			tl.to(modal, {
				scale: 1.02,
				duration: 0.15,
				ease: "power2.out"
			})
			.to(modal, {
				scale: 1,
				duration: 0.15,
				ease: "power2.in"
			});
			
			// Success glow effect
			const saveButton = modal.querySelector('button[type="submit"]');
			if (saveButton) {
				gsap.to(saveButton, {
					boxShadow: '0 0 30px rgba(16, 185, 129, 0.6)',
					duration: 0.3,
					ease: "power2.out",
					yoyo: true,
					repeat: 1
				});
			}
		} else {
			onSave(finalData as Service);
		}
	}

	const handleClose = () => {
		if (modalRef.current && overlayRef.current) {
			const modal = modalRef.current;
			const overlay = overlayRef.current;
			
			const tl = gsap.timeline({
				onComplete: () => onClose()
			});
			
			// Animate modal exit
			tl.to(modal, {
				opacity: 0,
				scale: 0.9,
				y: -20,
				filter: 'blur(5px)',
				duration: 0.3,
				ease: "power3.in"
			});
			
			// Fade out overlay
			tl.to(overlay, {
				opacity: 0,
				backdropFilter: 'blur(0px)',
				duration: 0.3,
				ease: "power2.in"
			}, "-=0.2");
		} else {
			onClose();
		}
	};

	return (
		<div className="admin-modal-overlay" ref={overlayRef} onClick={handleClose}>
			<div className="admin-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
				<div className="admin-modal-header">
					<h3>{service ? 'Edit Service' : 'New Service'}</h3>
					<button 
						className="admin-modal-close" 
						onClick={handleClose}
						onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.1, rotation: 90, duration: 0.2, ease: "power2.out" })}
						onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, rotation: 0, duration: 0.2, ease: "power2.out" })}
					>
						×
					</button>
				</div>
				<form onSubmit={handleSubmit} className="admin-modal-content" ref={contentRef}>
					<label className="admin-field">
						<span className="admin-label">Title (English)</span>
						<input 
							className="admin-input"
							value={formData.title}
							onChange={(e) => setFormData({ ...formData, title: e.target.value })}
							required
						/>
					</label>
					<label className="admin-field">
						<span className="admin-label">Title (Arabic)</span>
						<input 
							className="admin-input"
							value={formData.titleAr}
							onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
							required
						/>
					</label>
					<label className="admin-field">
						<span className="admin-label">Description (English)</span>
						<textarea 
							className="admin-input"
							value={formData.description}
							onChange={(e) => setFormData({ ...formData, description: e.target.value })}
							rows={5}
							required
						/>
					</label>
					<label className="admin-field">
						<span className="admin-label">Description (Arabic)</span>
						<textarea 
							className="admin-input"
							value={formData.descriptionAr}
							onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
							rows={5}
							required
						/>
					</label>
					<label className="admin-field">
						<span className="admin-label">Image</span>
						{formData.image && (
							<div style={{ marginBottom: '12px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(226,232,240,0.9)' }}>
								<img 
									src={formData.image} 
									alt="Service preview" 
									style={{ width: '100%', height: 'auto', maxHeight: '200px', objectFit: 'cover' }}
								/>
							</div>
						)}
						<div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
							<input 
								className="admin-input"
								type="file"
								accept="image/*"
								id="service-image-upload"
								onChange={async (e) => {
									const file = e.target.files?.[0];
									if (file) {
										try {
											const uploadFormData = new FormData();
											uploadFormData.append('file', file);
											uploadFormData.append('section', 'services');
											const res = await fetch('/api/images', { method: 'POST', body: uploadFormData });
											if (res.ok) {
												const data = await res.json();
												// Normalize and set the image URL
												const imageUrl = normalizeImageUrl(data.id);
												setFormData(prev => ({ ...prev, image: imageUrl }));
												// Clear file input after successful upload
												e.target.value = '';
											} else {
												alert('Failed to upload image');
											}
										} catch (error) {
											console.error('Error uploading image:', error);
											alert('Error uploading image');
										}
									}
								}}
								style={{ flex: 1 }}
							/>
							<button
								type="button"
								className="btn ghost"
								onClick={() => {
									setFormData({ ...formData, image: '' });
									// Clear file input
									const fileInput = document.getElementById('service-image-upload') as HTMLInputElement;
									if (fileInput) fileInput.value = '';
								}}
								style={{ whiteSpace: 'nowrap' }}
							>
								Clear
							</button>
						</div>
						<input 
							className="admin-input"
							type="text"
							placeholder="Image URL (auto-filled after upload)"
							value={formData.image || ''}
							onChange={(e) => setFormData({ ...formData, image: e.target.value })}
							style={{ marginTop: '8px' }}
						/>
					</label>
					{/* Icon Upload */}
					<label className="admin-field">
						<span className="admin-label">Icon (for service card)</span>
						{formData.icon && (
							<div style={{ marginBottom: '12px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(226,232,240,0.9)', width: '64px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
								<img 
									src={formData.icon} 
									alt="Icon preview" 
									style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }}
								/>
							</div>
						)}
						<div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
							<input 
								className="admin-input"
								type="file"
								accept="image/*"
								id="service-icon-upload"
								onChange={async (e) => {
									const file = e.target.files?.[0];
									if (file) {
										try {
											const uploadFormData = new FormData();
											uploadFormData.append('file', file);
											uploadFormData.append('section', 'services');
											const res = await fetch('/api/images', { method: 'POST', body: uploadFormData });
											if (res.ok) {
												const data = await res.json();
												// Normalize and set the icon URL
												const iconUrl = normalizeImageUrl(data.id);
												setFormData(prev => ({ ...prev, icon: iconUrl }));
												// Clear file input after successful upload
												e.target.value = '';
											} else {
												alert('Failed to upload icon');
											}
										} catch (error) {
											console.error('Error uploading icon:', error);
											alert('Error uploading icon');
										}
									}
								}}
								style={{ flex: 1 }}
							/>
							<button
								type="button"
								className="btn ghost"
								onClick={() => {
									setFormData({ ...formData, icon: '' });
									// Clear file input
									const fileInput = document.getElementById('service-icon-upload') as HTMLInputElement;
									if (fileInput) fileInput.value = '';
								}}
								style={{ whiteSpace: 'nowrap' }}
							>
								Clear
							</button>
						</div>
						<input 
							className="admin-input"
							type="text"
							placeholder="Icon URL (auto-filled after upload)"
							value={formData.icon || ''}
							onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
							style={{ marginTop: '8px' }}
						/>
					</label>

					{/* Slug */}
					<label className="admin-field">
						<span className="admin-label">Slug (URL-friendly identifier, e.g., "customs-clearance")</span>
						<input 
							className="admin-input"
							value={formData.slug || ''}
							onChange={(e) => {
								const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
								setFormData({ ...formData, slug });
							}}
							placeholder="Auto-generated from title if empty"
						/>
					</label>

					{/* Detailed Description */}
					<label className="admin-field">
						<span className="admin-label">Detailed Description (English) - For service detail page</span>
						<textarea 
							className="admin-input"
							value={formData.detailedDescription || ''}
							onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
							rows={6}
							placeholder="Extended description for the service detail page..."
						/>
					</label>
					<label className="admin-field">
						<span className="admin-label">Detailed Description (Arabic)</span>
						<textarea 
							className="admin-input"
							value={formData.detailedDescriptionAr || ''}
							onChange={(e) => setFormData({ ...formData, detailedDescriptionAr: e.target.value })}
							rows={6}
							placeholder="وصف مفصل للصفحة التفصيلية للخدمة..."
						/>
					</label>

					{/* Featured & Visible Checkboxes */}
					<div style={{ display: 'flex', gap: '24px' }}>
						<label className="admin-field admin-checkbox-field">
							<input 
								type="checkbox"
								checked={formData.visible ?? true}
								onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
							/>
							<span className="admin-label">Visible on Services Page</span>
						</label>
						<label className="admin-field admin-checkbox-field">
							<input 
								type="checkbox"
								checked={formData.featured ?? false}
								onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
							/>
							<span className="admin-label">Featured on Homepage</span>
						</label>
					</div>

					{/* Process Steps Section */}
					<div className="admin-field" style={{ border: '1px solid rgba(226,232,240,0.9)', borderRadius: '8px', padding: '16px', marginTop: '16px' }}>
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
							<span className="admin-label" style={{ fontWeight: 600 }}>Process Steps</span>
							<button
								type="button"
								className="btn ghost"
								onClick={() => {
									const newSteps = [...(formData.processSteps || [])];
									newSteps.push({
										number: newSteps.length + 1,
										title: '',
										titleAr: '',
										description: '',
										descriptionAr: '',
									});
									setFormData({ ...formData, processSteps: newSteps });
								}}
							>
								+ Add Step
							</button>
						</div>
						{(formData.processSteps || []).map((step, index) => (
							<div key={index} style={{ marginBottom: '16px', padding: '12px', background: '#f8fafc', borderRadius: '6px' }}>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
									<span style={{ fontWeight: 600 }}>Step {step.number}</span>
									<button
										type="button"
										className="btn ghost danger"
										onClick={() => {
											const newSteps = (formData.processSteps || []).filter((_, i) => i !== index);
											// Renumber steps
											newSteps.forEach((s, i) => s.number = i + 1);
											setFormData({ ...formData, processSteps: newSteps });
										}}
									>
										Remove
									</button>
								</div>
								<input
									className="admin-input"
									placeholder="Step title (English)"
									value={step.title}
									onChange={(e) => {
										const newSteps = [...(formData.processSteps || [])];
										newSteps[index].title = e.target.value;
										setFormData({ ...formData, processSteps: newSteps });
									}}
									style={{ marginBottom: '8px' }}
								/>
								<input
									className="admin-input"
									placeholder="Step title (Arabic)"
									value={step.titleAr}
									onChange={(e) => {
										const newSteps = [...(formData.processSteps || [])];
										newSteps[index].titleAr = e.target.value;
										setFormData({ ...formData, processSteps: newSteps });
									}}
									style={{ marginBottom: '8px' }}
								/>
								<textarea
									className="admin-input"
									placeholder="Step description (English)"
									value={step.description}
									onChange={(e) => {
										const newSteps = [...(formData.processSteps || [])];
										newSteps[index].description = e.target.value;
										setFormData({ ...formData, processSteps: newSteps });
									}}
									rows={2}
									style={{ marginBottom: '8px' }}
								/>
								<textarea
									className="admin-input"
									placeholder="Step description (Arabic)"
									value={step.descriptionAr}
									onChange={(e) => {
										const newSteps = [...(formData.processSteps || [])];
										newSteps[index].descriptionAr = e.target.value;
										setFormData({ ...formData, processSteps: newSteps });
									}}
									rows={2}
								/>
							</div>
						))}
					</div>

					{/* Benefits Section */}
					<div className="admin-field" style={{ border: '1px solid rgba(226,232,240,0.9)', borderRadius: '8px', padding: '16px', marginTop: '16px' }}>
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
							<span className="admin-label" style={{ fontWeight: 600 }}>Benefits</span>
							<button
								type="button"
								className="btn ghost"
								onClick={() => {
									const newBenefits = [...(formData.benefits || [])];
									newBenefits.push({
										title: '',
										titleAr: '',
										description: '',
										descriptionAr: '',
									});
									setFormData({ ...formData, benefits: newBenefits });
								}}
							>
								+ Add Benefit
							</button>
						</div>
						{(formData.benefits || []).map((benefit, index) => (
							<div key={index} style={{ marginBottom: '16px', padding: '12px', background: '#f8fafc', borderRadius: '6px' }}>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
									<span style={{ fontWeight: 600 }}>Benefit {index + 1}</span>
									<button
										type="button"
										className="btn ghost danger"
										onClick={() => {
											const newBenefits = (formData.benefits || []).filter((_, i) => i !== index);
											setFormData({ ...formData, benefits: newBenefits });
										}}
									>
										Remove
									</button>
								</div>
								{benefit.icon && (
									<div style={{ marginBottom: '8px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(226,232,240,0.9)', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
										<img src={benefit.icon} alt="Benefit icon" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} />
									</div>
								)}
								<input
									type="file"
									accept="image/*"
									onChange={async (e) => {
										const file = e.target.files?.[0];
										if (file) {
											try {
												const uploadFormData = new FormData();
												uploadFormData.append('file', file);
												uploadFormData.append('section', 'services');
												const res = await fetch('/api/images', { method: 'POST', body: uploadFormData });
												if (res.ok) {
													const data = await res.json();
													// Normalize and set the benefit icon URL
													const iconUrl = normalizeImageUrl(data.id);
													const newBenefits = [...(formData.benefits || [])];
													newBenefits[index].icon = iconUrl;
													setFormData({ ...formData, benefits: newBenefits });
													// Clear file input after successful upload
													e.target.value = '';
												} else {
													alert('Failed to upload benefit icon');
												}
											} catch (error) {
												console.error('Error uploading icon:', error);
												alert('Error uploading benefit icon');
											}
										}
									}}
									style={{ marginBottom: '8px', fontSize: '12px' }}
								/>
								{benefit.icon && (
									<input
										className="admin-input"
										type="text"
										placeholder="Benefit icon URL (auto-filled after upload)"
										value={benefit.icon}
										onChange={(e) => {
											const newBenefits = [...(formData.benefits || [])];
											newBenefits[index].icon = e.target.value;
											setFormData({ ...formData, benefits: newBenefits });
										}}
										style={{ marginBottom: '8px', fontSize: '12px' }}
									/>
								)}
								<input
									className="admin-input"
									placeholder="Benefit title (English)"
									value={benefit.title}
									onChange={(e) => {
										const newBenefits = [...(formData.benefits || [])];
										newBenefits[index].title = e.target.value;
										setFormData({ ...formData, benefits: newBenefits });
									}}
									style={{ marginBottom: '8px' }}
								/>
								<input
									className="admin-input"
									placeholder="Benefit title (Arabic)"
									value={benefit.titleAr}
									onChange={(e) => {
										const newBenefits = [...(formData.benefits || [])];
										newBenefits[index].titleAr = e.target.value;
										setFormData({ ...formData, benefits: newBenefits });
									}}
									style={{ marginBottom: '8px' }}
								/>
								<textarea
									className="admin-input"
									placeholder="Benefit description (English)"
									value={benefit.description}
									onChange={(e) => {
										const newBenefits = [...(formData.benefits || [])];
										newBenefits[index].description = e.target.value;
										setFormData({ ...formData, benefits: newBenefits });
									}}
									rows={2}
									style={{ marginBottom: '8px' }}
								/>
								<textarea
									className="admin-input"
									placeholder="Benefit description (Arabic)"
									value={benefit.descriptionAr}
									onChange={(e) => {
										const newBenefits = [...(formData.benefits || [])];
										newBenefits[index].descriptionAr = e.target.value;
										setFormData({ ...formData, benefits: newBenefits });
									}}
									rows={2}
								/>
							</div>
						))}
					</div>

					{/* Testimonials Section */}
					<div className="admin-field" style={{ border: '1px solid rgba(226,232,240,0.9)', borderRadius: '8px', padding: '16px', marginTop: '16px' }}>
						<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
							<span className="admin-label" style={{ fontWeight: 600 }}>Testimonials</span>
							<button
								type="button"
								className="btn ghost"
								onClick={() => {
									const newTestimonials = [...(formData.testimonials || [])];
									newTestimonials.push({
										name: '',
										nameAr: '',
										role: '',
										roleAr: '',
										rating: 5,
										text: '',
										textAr: '',
									});
									setFormData({ ...formData, testimonials: newTestimonials });
								}}
							>
								+ Add Testimonial
							</button>
						</div>
						{(formData.testimonials || []).map((testimonial, index) => (
							<div key={index} style={{ marginBottom: '16px', padding: '12px', background: '#f8fafc', borderRadius: '6px' }}>
								<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
									<span style={{ fontWeight: 600 }}>Testimonial {index + 1}</span>
									<button
										type="button"
										className="btn ghost danger"
										onClick={() => {
											const newTestimonials = (formData.testimonials || []).filter((_, i) => i !== index);
											setFormData({ ...formData, testimonials: newTestimonials });
										}}
									>
										Remove
									</button>
								</div>
								<input
									className="admin-input"
									placeholder="Name (English)"
									value={testimonial.name}
									onChange={(e) => {
										const newTestimonials = [...(formData.testimonials || [])];
										newTestimonials[index].name = e.target.value;
										setFormData({ ...formData, testimonials: newTestimonials });
									}}
									style={{ marginBottom: '8px' }}
								/>
								<input
									className="admin-input"
									placeholder="Name (Arabic)"
									value={testimonial.nameAr}
									onChange={(e) => {
										const newTestimonials = [...(formData.testimonials || [])];
										newTestimonials[index].nameAr = e.target.value;
										setFormData({ ...formData, testimonials: newTestimonials });
									}}
									style={{ marginBottom: '8px' }}
								/>
								<input
									className="admin-input"
									placeholder="Role (English)"
									value={testimonial.role}
									onChange={(e) => {
										const newTestimonials = [...(formData.testimonials || [])];
										newTestimonials[index].role = e.target.value;
										setFormData({ ...formData, testimonials: newTestimonials });
									}}
									style={{ marginBottom: '8px' }}
								/>
								<input
									className="admin-input"
									placeholder="Role (Arabic)"
									value={testimonial.roleAr}
									onChange={(e) => {
										const newTestimonials = [...(formData.testimonials || [])];
										newTestimonials[index].roleAr = e.target.value;
										setFormData({ ...formData, testimonials: newTestimonials });
									}}
									style={{ marginBottom: '8px' }}
								/>
								<input
									className="admin-input"
									type="number"
									min="1"
									max="5"
									placeholder="Rating (1-5)"
									value={testimonial.rating}
									onChange={(e) => {
										const newTestimonials = [...(formData.testimonials || [])];
										newTestimonials[index].rating = parseInt(e.target.value) || 5;
										setFormData({ ...formData, testimonials: newTestimonials });
									}}
									style={{ marginBottom: '8px' }}
								/>
								<textarea
									className="admin-input"
									placeholder="Testimonial text (English)"
									value={testimonial.text}
									onChange={(e) => {
										const newTestimonials = [...(formData.testimonials || [])];
										newTestimonials[index].text = e.target.value;
										setFormData({ ...formData, testimonials: newTestimonials });
									}}
									rows={3}
									style={{ marginBottom: '8px' }}
								/>
								<textarea
									className="admin-input"
									placeholder="Testimonial text (Arabic)"
									value={testimonial.textAr}
									onChange={(e) => {
										const newTestimonials = [...(formData.testimonials || [])];
										newTestimonials[index].textAr = e.target.value;
										setFormData({ ...formData, testimonials: newTestimonials });
									}}
									rows={3}
								/>
							</div>
						))}
					</div>

					<div className="admin-modal-footer">
						<button 
							type="button" 
							className="btn ghost" 
							onClick={onClose}
							onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.02, y: -2, duration: 0.3, ease: "power2.out" })}
							onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" })}
						>
							Cancel
						</button>
						<button 
							type="submit" 
							className="btn primary"
							onMouseEnter={(e) => gsap.to(e.currentTarget, { scale: 1.02, y: -2, duration: 0.3, ease: "power2.out" })}
							onMouseLeave={(e) => gsap.to(e.currentTarget, { scale: 1, y: 0, duration: 0.3, ease: "power2.out" })}
						>
							Save
						</button>
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
