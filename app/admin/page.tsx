"use client";

import React from "react";

type ImageFile = {
	_id: string;
	filename: string;
	uploadDate: string;
	contentType?: string;
	metadata?: { section?: string };
};

export default function AdminPage() {
	const expectedPassword = (process.env.NEXT_PUBLIC_ADMIN_PASSWORD as string | undefined) || "admin123";
	const [authed, setAuthed] = React.useState(false);
	const [password, setPassword] = React.useState("");
	const [authError, setAuthError] = React.useState<string | null>(null);

	React.useEffect(() => {
		try {
			if (typeof window !== 'undefined') {
				setAuthed(window.sessionStorage.getItem('sl_admin_authed') === 'true');
			}
		} catch {}
	}, []);

	function handleAuthSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (password === expectedPassword) {
			setAuthed(true);
			setAuthError(null);
			try { if (typeof window !== 'undefined') window.sessionStorage.setItem('sl_admin_authed', 'true'); } catch {}
		} else {
			setAuthError("Incorrect password");
		}
	}
	const [activeSection, setActiveSection] = React.useState<"making-easy" | "strategy-right">("making-easy");
	const [files, setFiles] = React.useState<ImageFile[]>([]);
	const [isLoading, setIsLoading] = React.useState(false);

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

	React.useEffect(() => {
		refresh();
	}, [refresh]);

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

	if (!authed) {
		return (
			<section className="section-easy admin" aria-labelledby="admin-title">
				<div className="container">
					<div className="admin-header">
						<div>
							<h2 id="admin-title" className="admin-title">Admin • Sign In</h2>
							<p className="admin-subtitle">Enter the password to manage homepage images.</p>
						</div>
					</div>
					<div className="admin-grid" style={{ gridTemplateColumns: '1fr' }}>
						<div className="admin-card" style={{ maxWidth: 520 }}>
							<form onSubmit={handleAuthSubmit} className="admin-form" aria-label="Admin password form">
								<label className="admin-field">
									<span className="admin-label">Password</span>
									<input
										className="admin-input"
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										placeholder="Enter admin password"
										aria-invalid={authError ? true : false}
									/>
								</label>
								{authError && <div className="muted" role="alert" style={{ color: '#ef4444' }}>{authError}</div>}
								<div className="admin-actions">
									<button className="btn primary" type="submit">Enter</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="section-easy admin" aria-labelledby="admin-title">
			<div className="container">
				<div className="admin-header">
					<div>
						<h2 id="admin-title" className="admin-title">Admin • Images</h2>
						<p className="admin-subtitle">Manage homepage images per section. Latest upload is displayed.</p>
					</div>
					<div aria-live="polite" aria-busy={isLoading} className="muted">{isLoading ? "Loading" : ""}</div>
				</div>

				<div className="admin-grid">
					<div className="admin-card" role="region" aria-labelledby="upload-title">
						<h3 id="upload-title" style={{ marginTop: 0 }}>Upload image</h3>
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
								<a className="btn ghost" href="#" onClick={(e) => { e.preventDefault(); (document.querySelector('input[type=file]') as HTMLInputElement | null)?.click(); }}>Browse…</a>
							</div>
						</form>
					</div>
					<div className="admin-card" role="region" aria-labelledby="list-title">
						<h3 id="list-title" style={{ marginTop: 0 }}>Images in section</h3>
						<div className="divider" />
						<div className="list">
							{files.map((f) => (
								<div key={f._id} className="list-item">
									<img className="list-thumb" src={`/api/images/${f._id}`} alt={f.filename} />
									<div className="list-meta">
										<div className="list-fn">{f.filename}</div>
										<div className="list-date">{new Date(f.uploadDate).toLocaleString()}</div>
									</div>
									<button className="btn ghost" aria-label={`Delete ${f.filename}`} onClick={() => onDelete(f._id)}>Delete</button>
								</div>
							))}
							{files.length === 0 && !isLoading && <div className="muted">No images yet</div>}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}


