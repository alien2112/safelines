"use client";

import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';
import Blob from './Blob';
import { FaTruck, FaWarehouse, FaShippingFast, FaFileInvoice, FaCertificate, FaClipboardCheck, FaHeadset, FaChartLine, FaRoute, FaBoxes, FaTimes } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import { useServices } from '../lib/swr-config';

type AdminService = {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  image?: string;
  icon?: string; // Icon image URL
  visible: boolean;
  featured?: boolean;
  order: number;
  slug?: string;
};

export function ServicesSection() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const [selectedService, setSelectedService] = useState<AdminService | null>(null);
  const [clickedServiceIndex, setClickedServiceIndex] = useState<number | null>(null);
  const [clickedCardRect, setClickedCardRect] = useState<DOMRect | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const servicesSectionRef = useRef<HTMLElement>(null);
  const servicesGridRef = useRef<HTMLDivElement>(null);
  
  // Use SWR for data fetching - automatic caching and revalidation
  const { data: servicesData } = useServices();
  
  // Transform and memoize data from API
  const adminServices = useMemo(() => {
    if (!servicesData) return [];
    return servicesData.map((s: any) => ({
      ...s,
      id: s._id?.toString() || s.id,
      _id: undefined,
    }));
  }, [servicesData]);

  // Enhanced modal opening animation
  useEffect(() => {
    if (selectedService && modalRef.current && overlayRef.current) {
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      
      const modal = modalRef.current;
      const overlay = overlayRef.current;
      const content = contentRef.current;
      
      // Position modal over the clicked card
      if (clickedCardRect) {
        const cardTop = clickedCardRect.top + window.scrollY;
        const cardLeft = clickedCardRect.left;
        
        // Different offsets for mobile, tablet, and desktop
        const viewportWidth = window.innerWidth;
        const isMobileView = viewportWidth <= 768;
        const isTabletView = viewportWidth > 768 && viewportWidth <= 1024;
        
        // Left offsets: mobile (-20), tablet (-350), desktop (-50)
        const leftOffset = isMobileView ? -20 : isTabletView ? -350 : -50;
        let adjustedLeft = cardLeft + leftOffset;
        
        // On mobile, ensure modal doesn't go off-screen and adjust width
        if (isMobileView) {
          // Ensure modal stays within viewport with padding
          const minLeft = 16;
          const maxRight = viewportWidth - 16;
          adjustedLeft = Math.max(minLeft, Math.min(adjustedLeft, maxRight - 300)); // Assume modal is at least 300px wide
          
          // Calculate max width to prevent overflow
          const availableWidth = viewportWidth - adjustedLeft - 16;
          modal.style.maxWidth = `${Math.min(600, availableWidth)}px`;
          modal.style.width = 'auto';
        } else if (isTabletView) {
          // On tablet, allow larger offset but ensure modal doesn't go completely off-screen
          const minLeft = 8; // Allow more negative positioning on tablet
          adjustedLeft = Math.max(minLeft, adjustedLeft);
          modal.style.maxWidth = '600px';
          modal.style.width = '100%';
        } else {
          // Desktop
          adjustedLeft = Math.max(16, adjustedLeft); // Ensure it doesn't go off-screen on desktop
          modal.style.maxWidth = '600px';
          modal.style.width = '100%';
        }
        
        // Apply positioning to modal
        modal.style.position = 'absolute';
        modal.style.left = `${adjustedLeft}px`;
        modal.style.top = `${cardTop}px`;
        modal.style.transform = 'none';
        modal.style.margin = '0';
      }
      
      // Set initial states for animation
      gsap.set(overlay, { opacity: 0, backdropFilter: 'blur(0px)' });
      gsap.set(modal, { 
        opacity: 0, 
        scale: 0.85, 
        filter: 'blur(10px)',
        clearProps: 'x,y'
      });
      
      // Create timeline for coordinated animation
      const tl = gsap.timeline();
      
      // Animate overlay with blur (higher opacity)
      tl.to(overlay, {
        opacity: 0.95,
        backdropFilter: 'blur(8px)',
        duration: 0.4,
        ease: "power3.out"
      });
      
      // Animate modal entrance
      tl.to(modal, {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.5,
        ease: "expo.out"
      }, "-=0.2");
      
      // Stagger content appearance
      if (content) {
        const fields = content.querySelectorAll('h2, p, img, div[style*="display"]');
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
    } else if (!selectedService) {
      // Unlock body scroll
      document.body.style.overflow = '';
    }
  }, [selectedService, clickedCardRect]);

  // Enhanced closing animation - useCallback to prevent recreation
  const handleClose = useCallback(() => {
    if (modalRef.current && overlayRef.current) {
      const modal = modalRef.current;
      const overlay = overlayRef.current;
      
      const tl = gsap.timeline({
        onComplete: () => {
          setSelectedService(null);
          setClickedServiceIndex(null);
          setClickedCardRect(null);
          document.body.style.overflow = '';
        }
      });
      
      // Animate modal exit - scale down at current position
      tl.to(modal, {
        opacity: 0,
        scale: 0.9,
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
      setSelectedService(null);
      setClickedCardRect(null);
      document.body.style.overflow = '';
    }
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedService) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedService, handleClose]);
  
  // Memoize icon mapping for services
  const iconMap = useMemo(() => [
    <FaTruck key="truck" />,
    <FaRoute key="route" />,
    <FaWarehouse key="warehouse" />,
    <FaFileInvoice key="invoice" />,
    <FaCertificate key="cert" />,
    <FaClipboardCheck key="clipboard" />,
    <FaShippingFast key="tracking" />,
    <FaChartLine key="chart" />,
    <FaHeadset key="headset" />,
    <FaBoxes key="consult" />,
  ], []);
  
  // Memoize chip icons
  const chipIcons = useMemo(() => [
    <svg key="0" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    <svg key="1" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>,
    <svg key="2" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    <svg key="3" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="12" y1="22.08" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    <svg key="4" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    </svg>,
  ], []);
  
  // Use admin services if available, otherwise fallback to translations
  const allServices = useMemo(() => {
    return adminServices.map((service, idx) => ({
      ...service,
      title: language === 'ar' ? (service.titleAr || service.title) : (service.title || service.titleAr),
      description: language === 'ar' ? (service.descriptionAr || service.description) : (service.description || service.descriptionAr),
      // Use uploaded icon if available, otherwise fallback to iconMap
      icon: service.icon ? (
        <img src={service.icon} alt="" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
      ) : iconMap[idx % iconMap.length],
    }));
  }, [adminServices, language, iconMap]);

  return (
    <section ref={servicesSectionRef} id="services" className="section-services">
      <div className="container services-container">
        {/* Outer faint pinkish layer */}
        <Blob
          width={1200}
          height={560}
          top={20}
          left={35}
          translateXPercent={10}
          intensity={0.50}
          blur={50}
          zIndex={0}
          colors={{
            primary: 'rgba(255, 99, 132, 0.06)',
            mid: 'rgba(255, 153, 204, 0.06)',
            outer: 'rgba(255, 192, 203, 0.10)'
          }}
        />
        {/* Inner blue layer */}
        <Blob
          width={1000}
          height={520}
          top={40}
          left={50}
          translateXPercent={10}
          intensity={0.32}
          blur={80}
          zIndex={1}
          colors={{
            primary: 'rgba(59, 130, 246, 0.22)',
            mid: 'rgba(96, 165, 250, 0.20)',
            outer: 'rgba(191, 219, 254, 0.16)'
          }}
        />
        <div className="services-header">
          <h2 className="services-title" dir={isRTL ? 'rtl' : 'ltr'}>{t.home.services.title}</h2>
          <ul className="services-bullets" dir={isRTL ? 'rtl' : 'ltr'}>
            {t.home.services.bullets.map((bullet, index) => (
              <li key={index}>{bullet}</li>
            ))}
          </ul>
        </div>

        <div className="services-cards-frame">
          <div ref={servicesGridRef} className="services-grid">
          {allServices.map((service, index) => (
              <button
                key={service.id}
                onClick={(e) => {
                  const cardElement = e.currentTarget;
                  const rect = cardElement.getBoundingClientRect();
                  setClickedCardRect(rect);
                  setClickedServiceIndex(index);
                  setSelectedService(service);
                }}
                className="svc-card svc-card--title-only"
                aria-label={service.title}
                style={{ cursor: 'pointer', border: 'none', textAlign: 'left', width: '100%' }}
              >
                {service.image && (
                  <div style={{ width: '100%', height: '180px', marginBottom: '16px', overflow: 'hidden', borderRadius: '12px' }}>
                    <Image 
                      src={service.image} 
                      alt="" 
                      width={400}
                      height={180}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="svc-icon" aria-hidden>{service.icon}</div>
                <h3 className="svc-title" dir={isRTL ? 'rtl' : 'ltr'}>{service.title}</h3>
              </button>
            ))}
          </div>
        </div>

        <div className="services-chips">
          {t.home.services.chips.map((chip, index) => (
            <div key={chip.label} className="svc-chip">
              <span className="chip-icon" aria-hidden>{chipIcons[index]}</span>
              <span className="chip-label" dir={isRTL ? 'rtl' : 'ltr'}>{chip.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modal positioned over clicked card */}
      {selectedService && (
        <div
          ref={overlayRef}
          className="svc-modal-overlay"
          onClick={handleClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            overflow: 'auto',
            willChange: 'opacity, backdrop-filter',
            pointerEvents: 'auto',
          }}
        >
          <div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="svc-modal-content"
            style={{
              position: 'absolute',
              background: '#fff',
              borderRadius: '16px',
              maxWidth: '600px',
              maxHeight: '90vh',
              overflow: 'auto',
              boxShadow: '0 24px 64px rgba(0, 0, 0, 0.3)',
              willChange: 'transform, opacity, filter',
              transformStyle: 'preserve-3d',
              pointerEvents: 'auto',
            }}
          >
            <button
              className="svc-modal-close-btn"
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                color: '#475569',
                transition: 'background 0.2s',
                zIndex: 10,
              }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.background = 'rgba(0, 0, 0, 0.05)';
                gsap.to(e.currentTarget, { scale: 1.1, rotation: 90, duration: 0.2, ease: "power2.out" });
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.background = 'transparent';
                gsap.to(e.currentTarget, { scale: 1, rotation: 0, duration: 0.2, ease: "power2.out" });
              }}
              aria-label="Close modal"
            >
              <FaTimes size={20} />
            </button>
            
            <div ref={contentRef} style={{ padding: '40px' }}>
              {selectedService.image && (
                <div style={{ 
                  width: '100%', 
                  height: '240px', 
                  marginBottom: '24px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  position: 'relative',
                  background: 'linear-gradient(180deg, rgba(248,250,252,0.9) 0%, rgba(241,245,249,0.95) 100%)',
                  border: '1px solid rgba(226,232,240,0.9)',
                }}>
                  <Image
                    src={selectedService.image}
                    alt={selectedService.title}
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                    }}
                    sizes="(max-width: 768px) 100vw, 600px"
                  />
                </div>
              )}
              
              <div className="svc-icon" style={{ marginBottom: '16px' }} aria-hidden>
                {allServices.find(s => s.id === selectedService.id)?.icon}
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#0f172a', margin: '0 0 16px 0' }} dir={isRTL ? 'rtl' : 'ltr'}>
                {selectedService.title}
              </h2>
              <p style={{ fontSize: '16px', color: '#475569', lineHeight: '1.6', margin: '0 0 24px 0' }} dir={isRTL ? 'rtl' : 'ltr'}>
                {selectedService.description}
              </p>

              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link
                  href="/contact"
                  className="srv-modal-cta"
                  style={{ textDecoration: 'none' }}
                >
                  Request this Service
                </Link>
                <Link
                  href={`/services/${selectedService.slug || selectedService.id}`}
                  className="srv-modal-close"
                  style={{ textDecoration: 'none', display: 'inline-block' }}
                >
                  View Full Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}



