"use client";

import React, { useState, useEffect } from 'react';
import Blob from './Blob';
import { FaTruck, FaWarehouse, FaShippingFast, FaFileInvoice, FaCertificate, FaClipboardCheck, FaHeadset, FaChartLine, FaRoute, FaBoxes } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';

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

// Get services from MongoDB via API
async function getServices(): Promise<AdminService[]> {
  if (typeof window === 'undefined') return [];
  
  try {
    const res = await fetch('/api/services', { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      return data
        .map((s: any) => ({
          ...s,
          id: s._id?.toString() || s.id,
          _id: undefined,
        }))
        .filter((service: AdminService) => service.visible)
        .sort((a: AdminService, b: AdminService) => a.order - b.order);
    }
    return [];
  } catch {
    return [];
  }
}

export function ServicesSection() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const [adminServices, setAdminServices] = useState<AdminService[]>([]);
  
  useEffect(() => {
    async function loadServices() {
      const services = await getServices();
      setAdminServices(services);
    }
    loadServices();
    // Check periodically for changes
    const interval = setInterval(() => {
      loadServices();
    }, 5000); // Check every 5 seconds instead of 1
    return () => {
      clearInterval(interval);
    };
  }, []);
  
  // Icon mapping for services
  const iconMap = [
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
  ];
  
  // Use admin services if available, otherwise fallback to translations
  const allServices = React.useMemo(() => {
    if (adminServices.length > 0) {
      return adminServices.map((service, idx) => ({
        title: language === 'ar' ? (service.titleAr || service.title) : (service.title || service.titleAr),
        description: language === 'ar' ? (service.descriptionAr || service.description) : (service.description || service.descriptionAr),
        category: idx < 3 ? 'transportation' : 'customs',
        icon: iconMap[idx % iconMap.length],
      }));
    }
    // Fallback to translations
    return [
        ...t.home.services.transportation.services.map((service, idx) => ({
          ...service,
          category: 'transportation',
          icon: idx === 0 ? <FaTruck key="truck" /> : idx === 1 ? <FaRoute key="route" /> : <FaWarehouse key="warehouse" />,
        })),
        ...t.home.services.customs.services.map((service, idx) => ({
          ...service,
          category: 'customs',
          icon: idx === 0 ? <FaFileInvoice key="invoice" /> : 
                idx === 1 ? <FaCertificate key="cert" /> :
                idx === 2 ? <FaClipboardCheck key="clipboard" /> :
                idx === 3 ? <FaShippingFast key="tracking" /> :
                idx === 4 ? <FaChartLine key="chart" /> :
                idx === 5 ? <FaHeadset key="headset" /> :
                <FaBoxes key="consult" />,
        })),
    ];
  }, [adminServices, language, t.home.services.transportation.services, t.home.services.customs.services]);

  return (
    <section id="services" className="section-services">
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
          <div className="services-grid">
          {allServices.map((service, index) => (
              <article key={`${service.category}-${index}`} className="svc-card">
                <div className="svc-icon" aria-hidden>{service.icon}</div>
                <h3 className="svc-title" dir={isRTL ? 'rtl' : 'ltr'}>{service.title}</h3>
                <p className="svc-desc" dir={isRTL ? 'rtl' : 'ltr'}>{service.description}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="services-chips">
          {t.home.services.chips.map((chip, index) => {
            const chipIcons = [
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
            ];
            return (
              <div key={chip.label} className="svc-chip">
                <span className="chip-icon" aria-hidden>{chipIcons[index]}</span>
                <span className="chip-label" dir={isRTL ? 'rtl' : 'ltr'}>{chip.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}



