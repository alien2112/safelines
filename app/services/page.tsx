"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { FaArrowRight, FaBoxOpen, FaClipboardList, FaSearch, FaWarehouse } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../contexts/LanguageContext";

type AdminService = {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  image?: string;
  visible: boolean;
  order: number;
};

type Service = {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  image?: string;
};

async function getServices(): Promise<AdminService[]> {
  try {
    const res = await fetch("/api/services", { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return (data || []).map((s: any) => ({
      ...s,
      id: s._id?.toString() || s.id,
      _id: undefined,
    }));
  } catch {
    return [];
  }
}

export default function ServicesPage() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const [adminServices, setAdminServices] = useState<AdminService[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [modalService, setModalService] = useState<Service | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  const CATEGORIES = [
    { key: "all", label: t.services.page.categories.all },
    { key: "transportation", label: t.services.page.categories.transportation },
    { key: "customs", label: t.services.page.categories.customs },
    { key: "support", label: t.services.page.categories.support },
  ];

  useEffect(() => {
    getServices().then((s) => setAdminServices(s.filter((x) => x.visible).sort((a, b) => a.order - b.order)));
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;
    const tl = gsap.timeline();
    tl.fromTo(
      heroRef.current.querySelectorAll("[data-hero]") as any,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" }
    );
    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (!cardsRef.current) return;
    gsap.fromTo(
      cardsRef.current.querySelectorAll("[data-card]") as any,
      { y: 18, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, ease: "power2.out" }
    );
  }, [activeCategory, adminServices.length]);

  const allServices: Service[] = useMemo(() => {
    return adminServices.map((s, idx) => ({
      id: s.id,
      title: language === 'ar' ? (s.titleAr || s.title) : (s.title || s.titleAr),
      description: language === 'ar' ? (s.descriptionAr || s.description) : (s.description || s.descriptionAr),
      category: idx < 3 ? "transportation" : idx < 6 ? "customs" : "support",
      icon: [<FaWarehouse key="i0" />, <FaClipboardList key="i1" />, <FaBoxOpen key="i2" />][idx % 3],
      image: s.image,
    }));
  }, [adminServices, language]);

  const filtered = useMemo(() => {
    if (activeCategory === "all") return allServices;
    return allServices.filter((s) => s.category === activeCategory);
  }, [activeCategory, allServices]);

  return (
    <main>
      {/* Hero */}
      <section ref={heroRef} className="srv-hero">
        <div className="srv-hero-inner">
          <p data-hero className="srv-hero-badge" dir={isRTL ? 'rtl' : 'ltr'}>
            {t.services.page.hero.badge}
          </p>
          <h1 data-hero className="srv-hero-title" dir={isRTL ? 'rtl' : 'ltr'}>
            {t.services.page.hero.title}
          </h1>
          <p data-hero className="srv-hero-sub" dir={isRTL ? 'rtl' : 'ltr'}>
            {t.services.page.hero.subtitle}
          </p>
          <div data-hero style={{ marginTop: 24 }}>
            <a href="#catalog" className="srv-cta" dir={isRTL ? 'rtl' : 'ltr'}>
              {t.services.page.hero.cta} <FaArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section id="catalog" className="srv-wrap">
        <div className="srv-tabs">
          <div className="srv-tablist">
            {CATEGORIES.map((c) => {
              const active = c.key === activeCategory;
              return (
                <button
                  key={c.key}
                  onClick={() => setActiveCategory(c.key)}
                  className={`srv-tab${active ? ' active' : ''}`}
                  aria-pressed={active}
                >
                  {c.label}
                  {active && (
                    <span className="srv-tab-underline" aria-hidden />
                  )}
                </button>
              );
            })}
          </div>
          <a href="#track" className="srv-track-link" dir={isRTL ? 'rtl' : 'ltr'}>
            {t.services.page.track.link} <FaArrowRight />
          </a>
        </div>

        {/* Grid */}
        <div ref={cardsRef} className="srv-grid">
          {filtered.length === 0 && (
            <div style={{ color: '#475569' }} dir={isRTL ? 'rtl' : 'ltr'}>
              {t.services.page.noServices}
            </div>
          )}
          {filtered.map((svc) => (
            <article
              key={svc.id}
              data-card
              className="srv-card"
            >
              {svc.image && (
                <div style={{ width: '100%', height: '180px', marginBottom: '16px', overflow: 'hidden', borderRadius: '12px' }}>
                  <Image
                    src={svc.image}
                    alt=""
                    width={400}
                    height={180}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
                    loading="lazy"
                  />
                </div>
              )}
              <div className="srv-card-top">
                <div className="srv-card-icon">
                  {svc.icon}
                </div>
                <div style={{ minWidth: 0 }}>
                  <h3 className="srv-card-title" dir={isRTL ? 'rtl' : 'ltr'}>{svc.title}</h3>
                  <p className="srv-card-desc" dir={isRTL ? 'rtl' : 'ltr'}>{svc.description}</p>
                </div>
              </div>
              <div className="srv-card-actions">
                <button
                  onClick={() => setModalService(svc)}
                  className="srv-card-btn"
                  dir={isRTL ? 'rtl' : 'ltr'}
                >
                  {t.services.page.learnMore} <FaArrowRight />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Track / Request */}
      <section id="track" className="srv-wrap" style={{ paddingBottom: 80 }}>
        <div className="srv-track">
          <div className="srv-track-head" style={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div className="srv-track-icon">
                <FaSearch />
              </div>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 600, color: '#0f172a', margin: 0 }} dir={isRTL ? 'rtl' : 'ltr'}>
                  {t.services.page.track.title}
                </h3>
                <p style={{ fontSize: 14, color: '#475569', margin: 0 }} dir={isRTL ? 'rtl' : 'ltr'}>
                  {t.services.page.track.subtitle}
                </p>
              </div>
            </div>
            <a href="/contact" className="srv-track-cta" dir={isRTL ? 'rtl' : 'ltr'}>
              {t.services.page.track.cta} <FaArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* Modal */}
      {modalService && (<ServiceModal service={modalService} onClose={() => setModalService(null)} />)}
    </main>
  );
}

function ServiceModal({ service, onClose }: { service: Service; onClose: () => void }) {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const [tab, setTab] = useState<string>("overview");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const modalBoxRef = useRef<HTMLDivElement | null>(null);
  const processStepsRef = useRef<HTMLDivElement | null>(null);

  // Enhanced opening animation
  useEffect(() => {
    if (!containerRef.current || !overlayRef.current || !modalBoxRef.current) return;
    
    const overlay = overlayRef.current;
    const modalBox = modalBoxRef.current;
    const content = containerRef.current.querySelector('.srv-modal-inner');
    
    // Lock body scroll
    document.body.style.overflow = 'hidden';
    
    // Set initial states
    gsap.set(overlay, { opacity: 0, backdropFilter: 'blur(0px)' });
    gsap.set(modalBox, { 
      opacity: 0, 
      scale: 0.85, 
      filter: 'blur(10px)',
      rotationY: 15,
      y: 30
    });
    
    // Create timeline for coordinated animation
    const tl = gsap.timeline();
    
    // Animate overlay with blur
    tl.to(overlay, {
      opacity: 1,
      backdropFilter: 'blur(8px)',
      duration: 0.4,
      ease: "power3.out"
    });
    
    // Animate modal entrance with more fancy effects
    tl.to(modalBox, {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      rotationY: 0,
      y: 0,
      duration: 0.6,
      ease: "expo.out"
    }, "-=0.2");
    
    // Stagger content appearance
    if (content) {
      const elements = content.querySelectorAll('h3, p, .srv-modal-tabs, [data-tab], .srv-modal-actions');
      gsap.fromTo(elements,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          delay: 0.3
        }
      );
    }
    
    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const content = containerRef.current.querySelector("[data-tab]");
    if (content) {
      gsap.fromTo(content, { xPercent: 6, opacity: 0 }, { xPercent: 0, opacity: 1, duration: 0.25, ease: "power2.out" });
    }

    // Animate process steps when process tab is selected
    if (tab === "process" && processStepsRef.current) {
      const processSteps = processStepsRef.current.querySelectorAll('.process-step');
      if (processSteps.length > 0) {
        gsap.set(processSteps, { opacity: 0, x: -100, scale: 0.9 });
        gsap.to(processSteps, {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          delay: 0.2
        });
      }
    }
  }, [tab]);

  // Enhanced closing animation
  const handleCloseWithAnimation = () => {
    if (overlayRef.current && modalBoxRef.current) {
      const overlay = overlayRef.current;
      const modalBox = modalBoxRef.current;
      
      const tl = gsap.timeline({
        onComplete: () => {
          onClose();
          document.body.style.overflow = '';
        }
      });
      
      // Animate modal exit
      tl.to(modalBox, {
        opacity: 0,
        scale: 0.9,
        filter: 'blur(5px)',
        rotationY: -10,
        y: -20,
        duration: 0.35,
        ease: "power3.in"
      });
      
      // Fade out overlay
      tl.to(overlay, {
        opacity: 0,
        backdropFilter: 'blur(0px)',
        duration: 0.35,
        ease: "power2.in"
      }, "-=0.25");
    } else {
      onClose();
      document.body.style.overflow = '';
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseWithAnimation();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <div role="dialog" aria-modal="true" className="srv-modal" ref={containerRef}>
      <div ref={overlayRef} className="srv-modal-backdrop" onClick={handleCloseWithAnimation} />
      <div ref={modalBoxRef} className="srv-modal-box">
        <div className="srv-modal-inner">
          <div className="srv-modal-left">
            <h3 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', margin: 0 }} dir={isRTL ? 'rtl' : 'ltr'}>
              {service.title}
            </h3>
            <p style={{ marginTop: 8, color: '#334155' }} dir={isRTL ? 'rtl' : 'ltr'}>
              {service.description}
            </p>

            <div className="srv-modal-tabs">
              {[
                { key: "overview", label: t.services.page.modal.tabs.overview },
                { key: "process", label: t.services.page.modal.tabs.process },
                { key: "pricing", label: t.services.page.modal.tabs.pricing },
              ].map((tabItem) => {
                const active = tabItem.key === tab;
                return (
                  <button
                    key={tabItem.key}
                    onClick={() => setTab(tabItem.key)}
                    className={`srv-modal-tab${active ? ' active' : ''}`}
                    dir={isRTL ? 'rtl' : 'ltr'}
                  >
                    {tabItem.label}
                  </button>
                );
              })}
            </div>

            <div data-tab className="srv-modal-content">
              {tab === "overview" && (
                <p dir={isRTL ? 'rtl' : 'ltr'}>
                  {t.services.page.modal.overview}
                </p>
              )}
              {tab === "process" && (
                <div ref={processStepsRef} className="process-steps" style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginTop: '16px', flexWrap: 'wrap' }}>
                  {t.services.page.modal.processSteps.map((step, index) => (
                    <div key={index} className="process-step" style={{ position: 'relative', padding: '20px', background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.95) 100%)', borderRadius: '16px', border: '1px solid rgba(226, 232, 240, 0.8)', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)', flex: '1 1 0', minWidth: '140px', maxWidth: '180px' }}>
                      <div className="process-step-number" style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--brand-navy) 0%, var(--brand-accent) 100%)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 800, marginBottom: '12px' }}>
                        {index + 1}
                      </div>
                      <div className="process-step-content">
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--brand-navy)', margin: '0 0 6px', lineHeight: '1.3' }} dir={isRTL ? 'rtl' : 'ltr'}>
                          {step.title}
                        </h3>
                        <p style={{ fontSize: '13px', lineHeight: '1.5', color: '#64748b', margin: 0 }} dir={isRTL ? 'rtl' : 'ltr'}>
                          {step.description}
                        </p>
                      </div>
                      {index < t.services.page.modal.processSteps.length - 1 && (
                        <div className="process-step-connector" style={{ position: 'absolute', top: '50%', right: isRTL ? 'auto' : '-8px', left: isRTL ? '-8px' : 'auto', transform: 'translateY(-50%)', color: 'var(--brand-gold)', fontSize: '16px', zIndex: 1 }}>
                          <FaArrowRight style={{ transform: isRTL ? 'scaleX(-1)' : 'none' }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {tab === "pricing" && (
                <p dir={isRTL ? 'rtl' : 'ltr'}>
                  {t.services.page.modal.pricing}
                </p>
              )}
            </div>

            <div className="srv-modal-actions">
              <a href="/contact" className="srv-modal-cta" dir={isRTL ? 'rtl' : 'ltr'}>
                {t.services.page.modal.actions.request} <FaArrowRight />
              </a>
              <Link href={`/services/${service.id}`} className="srv-modal-close" onClick={handleCloseWithAnimation} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }} dir={isRTL ? 'rtl' : 'ltr'}>
                {t.services.page.modal.actions.viewDetails} <FaArrowRight />
              </Link>
              <button onClick={handleCloseWithAnimation} className="srv-modal-close" dir={isRTL ? 'rtl' : 'ltr'}>
                {t.services.page.modal.actions.close}
              </button>
            </div>
          </div>

          <div className="srv-modal-right">
            <div style={{ display: 'grid', placeItems: 'center', height: 128, borderRadius: 12, border: '1px solid rgba(226,232,240,0.9)', background: '#fff', color: 'var(--brand-gold)' }}>
              <FaBoxOpen style={{ fontSize: 24 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


