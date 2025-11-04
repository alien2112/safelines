"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../../contexts/LanguageContext";
import { FaCheckCircle, FaArrowRight, FaStar, FaUser, FaClock, FaShieldAlt, FaRocket, FaHandshake, FaHeadset, FaChartLine } from "react-icons/fa";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type ProcessStep = {
  number: number;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
};

type Benefit = {
  icon?: string;
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

type AdminService = {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  image?: string;
  visible: boolean;
  order: number;
  slug?: string;
  detailedDescription?: string;
  detailedDescriptionAr?: string;
  processSteps?: ProcessStep[];
  benefits?: Benefit[];
  testimonials?: Testimonial[];
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

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = String(params?.id || "");
  const [services, setServices] = useState<AdminService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  
  // Refs for animations
  const heroRef = useRef<HTMLDivElement>(null);
  const overviewRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true);
    getServices().then((s) => {
      setServices(s.filter((x) => x.visible).sort((a, b) => a.order - b.order));
      setIsLoading(false);
    });
  }, []);

  const svc = useMemo(() => 
    services.find((s) => s.id === serviceId || s.slug === serviceId),
    [services, serviceId]
  );
  
  const serviceTitle = svc ? (language === 'ar' ? (svc.titleAr || svc.title) : (svc.title || svc.titleAr)) : '';
  const serviceDescription = svc ? (language === 'ar' ? (svc.descriptionAr || svc.description) : (svc.description || svc.descriptionAr)) : '';
  const detailedDescription = svc ? (language === 'ar' ? (svc.detailedDescriptionAr || svc.detailedDescription) : (svc.detailedDescription || svc.detailedDescriptionAr)) : '';

  // Use dynamic process steps from service or fallback to defaults
  const processSteps = useMemo(() => {
    if (svc?.processSteps && svc.processSteps.length > 0) {
      return svc.processSteps.map(step => ({
        number: step.number,
        title: language === 'ar' ? (step.titleAr || step.title) : (step.title || step.titleAr),
        description: language === 'ar' ? (step.descriptionAr || step.description) : (step.description || step.descriptionAr),
      }));
    }
    // Fallback defaults
    return [
      { number: 1, title: language === 'ar' ? 'التشاور الأولي' : 'Initial Consultation', description: language === 'ar' ? 'نناقش متطلباتك ونفهم احتياجاتك بشكل كامل' : 'We discuss your requirements and fully understand your needs' },
      { number: 2, title: language === 'ar' ? 'التخطيط والتحضير' : 'Planning & Preparation', description: language === 'ar' ? 'نضع خطة مفصلة ونعد جميع المستندات اللازمة' : 'We create a detailed plan and prepare all necessary documents' },
      { number: 3, title: language === 'ar' ? 'التنفيذ' : 'Execution', description: language === 'ar' ? 'ننفذ العملية بكفاءة عالية ومتابعة مستمرة' : 'We execute the process with high efficiency and continuous follow-up' },
      { number: 4, title: language === 'ar' ? 'التسليم والمراقبة' : 'Delivery & Monitoring', description: language === 'ar' ? 'نسلم النتائج ونراقب الأداء للتأكد من الرضا الكامل' : 'We deliver results and monitor performance to ensure complete satisfaction' },
    ];
  }, [svc, language]);

  // Use dynamic benefits from service or fallback to defaults
  const benefits = useMemo(() => {
    if (svc?.benefits && svc.benefits.length > 0) {
      return svc.benefits.map(benefit => ({
        icon: benefit.icon ? (
          <img src={benefit.icon} alt="" style={{ width: '24px', height: '24px', objectFit: 'contain' }} />
        ) : <FaShieldAlt />,
        title: language === 'ar' ? (benefit.titleAr || benefit.title) : (benefit.title || benefit.titleAr),
        description: language === 'ar' ? (benefit.descriptionAr || benefit.description) : (benefit.description || benefit.descriptionAr),
      }));
    }
    // Fallback defaults
    return [
      { icon: <FaShieldAlt />, title: language === 'ar' ? 'موثوقية عالية' : 'High Reliability', description: language === 'ar' ? 'خدمات موثوقة ومثبتة مع سنوات من الخبرة' : 'Reliable and proven services with years of experience' },
      { icon: <FaRocket />, title: language === 'ar' ? 'سرعة التنفيذ' : 'Fast Execution', description: language === 'ar' ? 'معالجة سريعة وفعالة لجميع طلباتك' : 'Fast and efficient processing of all your requests' },
      { icon: <FaHandshake />, title: language === 'ar' ? 'شراكة طويلة الأمد' : 'Long-term Partnership', description: language === 'ar' ? 'نبني علاقات طويلة الأمد مع عملائنا' : 'We build long-term relationships with our clients' },
      { icon: <FaHeadset />, title: language === 'ar' ? 'دعم على مدار الساعة' : '24/7 Support', description: language === 'ar' ? 'فريق دعم متاح دائماً لمساعدتك' : 'Support team always available to assist you' },
      { icon: <FaChartLine />, title: language === 'ar' ? 'نتائج مضمونة' : 'Guaranteed Results', description: language === 'ar' ? 'نضمن لك النتائج المطلوبة بأعلى معايير الجودة' : 'We guarantee the desired results with the highest quality standards' },
      { icon: <FaClock />, title: language === 'ar' ? 'توفير الوقت' : 'Time Saving', description: language === 'ar' ? 'وفر وقتك وتركيز على عملك الأساسي' : 'Save your time and focus on your core business' },
    ];
  }, [svc, language]);

  // Use dynamic testimonials from service or fallback to defaults
  const testimonials = useMemo(() => {
    if (svc?.testimonials && svc.testimonials.length > 0) {
      return svc.testimonials.map(testimonial => ({
        name: language === 'ar' ? (testimonial.nameAr || testimonial.name) : (testimonial.name || testimonial.nameAr),
        role: language === 'ar' ? (testimonial.roleAr || testimonial.role) : (testimonial.role || testimonial.roleAr),
        rating: testimonial.rating,
        text: language === 'ar' ? (testimonial.textAr || testimonial.text) : (testimonial.text || testimonial.textAr),
      }));
    }
    // Fallback defaults
    return [
      { name: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed', role: language === 'ar' ? 'مدير شركة' : 'Company Director', rating: 5, text: language === 'ar' ? 'خدمة ممتازة وفريق محترف. أنصح بها بشدة!' : 'Excellent service and professional team. Highly recommended!' },
      { name: language === 'ar' ? 'سارة علي' : 'Sara Ali', role: language === 'ar' ? 'رائدة أعمال' : 'Entrepreneur', rating: 5, text: language === 'ar' ? 'ساعدوني في توفير الكثير من الوقت والجهد. شكراً جزيلاً!' : 'They helped me save a lot of time and effort. Thank you very much!' },
      { name: language === 'ar' ? 'خالد حسن' : 'Khalid Hassan', role: language === 'ar' ? 'مدير عمليات' : 'Operations Manager', rating: 5, text: language === 'ar' ? 'جودة عالية وسرعة في التنفيذ. سنواصل التعاون معهم.' : 'High quality and fast execution. We will continue to work with them.' },
    ];
  }, [svc, language]);

  // GSAP Animations
  useEffect(() => {
    if (!svc) return;

    // Hero Section Animation
    if (heroRef.current) {
      const heroTitle = heroRef.current.querySelector('.service-hero-title');
      const heroDesc = heroRef.current.querySelector('.service-hero-desc');
      const heroCta = heroRef.current.querySelector('.service-hero-cta');
      const heroImage = heroRef.current.querySelector('.service-hero-image');

      gsap.set([heroTitle, heroDesc, heroCta], { opacity: 0, y: 40 });
      gsap.set(heroImage, { opacity: 0, scale: 1.1 });

      const tl = gsap.timeline({ delay: 0.3 });
      tl.to(heroTitle, { opacity: 1, y: 0, duration: 1, ease: 'expo.out' })
        .to(heroDesc, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, '-=0.5')
        .to(heroCta, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.4')
        .to(heroImage, { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }, '-=1');
    }

    // Overview Section
    if (overviewRef.current) {
      const overviewTitle = overviewRef.current.querySelector('.section-title');
      const overviewContent = overviewRef.current.querySelectorAll('.overview-content > *');
      
      gsap.set(overviewTitle, { opacity: 0, y: 50 });
      gsap.set(overviewContent, { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: overviewRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(overviewTitle, { opacity: 1, y: 0, duration: 1, ease: 'expo.out' });
          gsap.to(overviewContent, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            delay: 0.2
          });
        },
        once: true
      });
    }

    // Process Section
    if (processRef.current) {
      const processTitle = processRef.current.querySelector('.section-title');
      const processSteps = processRef.current.querySelectorAll('.process-step');
      
      gsap.set(processTitle, { opacity: 0, y: 50 });
      gsap.set(processSteps, { opacity: 0, x: isRTL ? 100 : -100, scale: 0.9 });

      ScrollTrigger.create({
        trigger: processRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(processTitle, { opacity: 1, y: 0, duration: 1, ease: 'expo.out' });
          gsap.to(processSteps, {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.2
          });
        },
        once: true
      });
    }

    // Benefits Section
    if (benefitsRef.current) {
      const benefitsTitle = benefitsRef.current.querySelector('.section-title');
      const benefitCards = benefitsRef.current.querySelectorAll('.benefit-card');
      
      gsap.set(benefitsTitle, { opacity: 0, y: 50 });
      gsap.set(benefitCards, { opacity: 0, y: 60, scale: 0.95 });

      ScrollTrigger.create({
        trigger: benefitsRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(benefitsTitle, { opacity: 1, y: 0, duration: 1, ease: 'expo.out' });
          gsap.to(benefitCards, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
            delay: 0.2
          });
        },
        once: true
      });

      // Add hover effects
      benefitCards.forEach((card) => {
        const cardEl = card as HTMLElement;
        cardEl.addEventListener('mouseenter', () => {
          gsap.to(cardEl, { y: -8, scale: 1.02, duration: 0.3, ease: 'power2.out' });
        });
        cardEl.addEventListener('mouseleave', () => {
          gsap.to(cardEl, { y: 0, scale: 1, duration: 0.3, ease: 'power2.out' });
        });
      });
    }

    // Testimonials Section
    if (testimonialsRef.current) {
      const testimonialsTitle = testimonialsRef.current.querySelector('.section-title');
      const testimonialCards = testimonialsRef.current.querySelectorAll('.testimonial-card');
      
      gsap.set(testimonialsTitle, { opacity: 0, y: 50 });
      gsap.set(testimonialCards, { opacity: 0, y: 40, rotationY: 15 });

      ScrollTrigger.create({
        trigger: testimonialsRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(testimonialsTitle, { opacity: 1, y: 0, duration: 1, ease: 'expo.out' });
          gsap.to(testimonialCards, {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            delay: 0.2
          });
        },
        once: true
      });
    }

    // CTA Section
    if (ctaRef.current) {
      const ctaContent = ctaRef.current.querySelectorAll('.cta-content > *');
      
      gsap.set(ctaContent, { opacity: 0, y: 30 });

      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(ctaContent, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out'
          });
        },
        once: true
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [svc, language, isRTL]);

  // Skeleton Loader Component
  const SkeletonLoader = () => (
    <main className="service-detail-page" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Skeleton */}
      <section className="service-hero">
        <div className="service-hero-background" />
        <div className="service-hero-container">
          <div className="service-hero-content">
            <div style={{ width: '120px', height: '32px', background: 'rgba(255,255,255,0.2)', borderRadius: '9999px', marginBottom: '16px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            <div style={{ width: '80%', height: '56px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px', marginBottom: '16px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            <div style={{ width: '100%', height: '24px', background: 'rgba(255,255,255,0.15)', borderRadius: '8px', marginBottom: '8px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            <div style={{ width: '90%', height: '24px', background: 'rgba(255,255,255,0.15)', borderRadius: '8px', marginBottom: '24px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '140px', height: '48px', background: 'rgba(255,255,255,0.2)', borderRadius: '9999px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
              <div style={{ width: '140px', height: '48px', background: 'rgba(255,255,255,0.15)', borderRadius: '9999px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            </div>
          </div>
          <div className="service-hero-image">
            <div style={{ width: '100%', height: '400px', background: 'rgba(255,255,255,0.1)', borderRadius: '24px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
          </div>
        </div>
      </section>

      {/* Overview Skeleton */}
      <section className="service-overview">
        <div className="service-container">
          <div style={{ width: '200px', height: '48px', background: 'rgba(15,23,42,0.1)', borderRadius: '8px', marginBottom: '32px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
          <div className="overview-content">
            <div style={{ flex: 1 }}>
              <div style={{ width: '100%', height: '20px', background: 'rgba(15,23,42,0.08)', borderRadius: '4px', marginBottom: '12px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
              <div style={{ width: '100%', height: '20px', background: 'rgba(15,23,42,0.08)', borderRadius: '4px', marginBottom: '12px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
              <div style={{ width: '80%', height: '20px', background: 'rgba(15,23,42,0.08)', borderRadius: '4px', marginBottom: '20px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
              <div style={{ width: '100%', height: '20px', background: 'rgba(15,23,42,0.08)', borderRadius: '4px', marginBottom: '12px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
              <div style={{ width: '90%', height: '20px', background: 'rgba(15,23,42,0.08)', borderRadius: '4px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            </div>
            <div className="overview-features">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'rgba(15,23,42,0.04)', borderRadius: '8px', marginBottom: '8px' }}>
                  <div style={{ width: '20px', height: '20px', background: 'rgba(15,23,42,0.1)', borderRadius: '50%', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                  <div style={{ width: '120px', height: '16px', background: 'rgba(15,23,42,0.08)', borderRadius: '4px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Skeleton */}
      <section className="service-process">
        <div className="service-container">
          <div style={{ width: '200px', height: '48px', background: 'rgba(15,23,42,0.1)', borderRadius: '8px', marginBottom: '48px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
          <div className="process-steps">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="process-step" style={{ opacity: 1 }}>
                <div className="process-step-number" style={{ background: 'rgba(15,23,42,0.1)', color: 'transparent', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>{i}</div>
                <div className="process-step-content">
                  <div style={{ width: '180px', height: '24px', background: 'rgba(15,23,42,0.1)', borderRadius: '4px', marginBottom: '12px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                  <div style={{ width: '100%', height: '16px', background: 'rgba(15,23,42,0.08)', borderRadius: '4px', marginBottom: '8px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                  <div style={{ width: '80%', height: '16px', background: 'rgba(15,23,42,0.08)', borderRadius: '4px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Skeleton */}
      <section className="service-benefits">
        <div className="service-container">
          <div style={{ width: '200px', height: '48px', background: 'rgba(15,23,42,0.1)', borderRadius: '8px', marginBottom: '48px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
          <div className="benefits-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="benefit-card" style={{ opacity: 1 }}>
                <div className="benefit-icon" style={{ background: 'rgba(15,23,42,0.1)', color: 'transparent', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                <div style={{ width: '140px', height: '20px', background: 'rgba(15,23,42,0.1)', borderRadius: '4px', marginBottom: '12px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                <div style={{ width: '100%', height: '16px', background: 'rgba(15,23,42,0.08)', borderRadius: '4px', marginBottom: '8px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                <div style={{ width: '90%', height: '16px', background: 'rgba(15,23,42,0.08)', borderRadius: '4px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Skeleton */}
      <section className="service-testimonials">
        <div className="service-container">
          <div style={{ width: '200px', height: '48px', background: 'rgba(15,23,42,0.1)', borderRadius: '8px', marginBottom: '48px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
          <div className="testimonials-grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="testimonial-card" style={{ opacity: 1 }}>
                <div className="testimonial-rating">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div key={j} style={{ width: '16px', height: '16px', background: 'rgba(15,23,42,0.1)', borderRadius: '2px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                  ))}
                </div>
                <div style={{ width: '100%', height: '16px', background: 'rgba(15,23,42,0.08)', borderRadius: '4px', marginBottom: '8px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                <div style={{ width: '90%', height: '16px', background: 'rgba(15,23,42,0.08)', borderRadius: '4px', marginBottom: '8px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                <div style={{ width: '80%', height: '16px', background: 'rgba(15,23,42,0.08)', borderRadius: '4px', marginBottom: '20px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                <div className="testimonial-author">
                  <div className="author-icon" style={{ background: 'rgba(15,23,42,0.1)', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                  <div>
                    <div style={{ width: '120px', height: '18px', background: 'rgba(15,23,42,0.1)', borderRadius: '4px', marginBottom: '6px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                    <div style={{ width: '100px', height: '14px', background: 'rgba(15,23,42,0.08)', borderRadius: '4px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Skeleton */}
      <section className="service-cta">
        <div className="service-cta-background" />
        <div className="service-container">
          <div className="cta-content">
            <div style={{ width: '240px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px', marginBottom: '16px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            <div style={{ width: '300px', height: '24px', background: 'rgba(255,255,255,0.15)', borderRadius: '4px', marginBottom: '24px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
            <div style={{ width: '180px', height: '48px', background: 'rgba(255,255,255,0.2)', borderRadius: '9999px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />
          </div>
        </div>
      </section>

    </main>
  );

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (!svc) {
    return (
      <main className="service-detail-page" style={{ paddingTop: 80, paddingBottom: 80, minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <p style={{ color: '#475569', fontSize: '18px', marginBottom: '16px' }}>Service not found.</p>
        <Link href="/services" style={{ color: 'var(--brand-navy)', textDecoration: 'underline', fontWeight: 600 }}>
          Back to Services
        </Link>
      </main>
    );
  }

  return (
    <main className="service-detail-page" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section ref={heroRef} className="service-hero">
        <div className="service-hero-background" />
        <div className="service-hero-container">
          <div className="service-hero-content">
            <div className="service-hero-badge">{language === 'ar' ? 'خدمة احترافية' : 'Professional Service'}</div>
            <h1 className="service-hero-title">{serviceTitle}</h1>
            <p className="service-hero-desc">{serviceDescription}</p>
            <div className="service-hero-cta">
              <Link href="/contact" className="service-cta-primary">
                {language === 'ar' ? 'ابدأ الآن' : 'Get Started'}
                <FaArrowRight style={{ marginLeft: isRTL ? 0 : '8px', marginRight: isRTL ? '8px' : 0 }} />
              </Link>
              <Link href="/services" className="service-cta-secondary">
                {language === 'ar' ? 'عودة للخدمات' : 'Back to Services'}
              </Link>
            </div>
          </div>
          {svc.image && (
            <div className="service-hero-image">
              <img src={svc.image} alt={serviceTitle} loading="eager" />
            </div>
          )}
        </div>
      </section>

      {/* Overview Section */}
      <section ref={overviewRef} className="service-overview">
        <div className="service-container">
          <h2 className="section-title">{language === 'ar' ? 'نظرة عامة' : 'Overview'}</h2>
          <div className="overview-content">
          <div className="overview-text">
            <p>{detailedDescription || serviceDescription}</p>
            {detailedDescription && (
              <p style={{ marginTop: '20px', color: '#64748b' }}>
                {serviceDescription}
              </p>
            )}
            {!detailedDescription && (
              <p style={{ marginTop: '20px', color: '#64748b' }}>
                {language === 'ar' 
                  ? 'نقدم حلاً شاملاً ومتكاملاً يلبي جميع احتياجاتك بأعلى معايير الجودة والكفاءة. فريقنا المحترف جاهز لمساعدتك في كل خطوة.'
                  : 'We provide a comprehensive and integrated solution that meets all your needs with the highest standards of quality and efficiency. Our professional team is ready to assist you at every step.'}
              </p>
            )}
          </div>
            <div className="overview-features">
              <div className="feature-item">
                <FaCheckCircle className="feature-icon" />
                <span>{language === 'ar' ? 'حلول مخصصة' : 'Customized Solutions'}</span>
              </div>
              <div className="feature-item">
                <FaCheckCircle className="feature-icon" />
                <span>{language === 'ar' ? 'دعم مستمر' : 'Continuous Support'}</span>
              </div>
              <div className="feature-item">
                <FaCheckCircle className="feature-icon" />
                <span>{language === 'ar' ? 'أسعار تنافسية' : 'Competitive Pricing'}</span>
              </div>
              <div className="feature-item">
                <FaCheckCircle className="feature-icon" />
                <span>{language === 'ar' ? 'ضمان الجودة' : 'Quality Guarantee'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="service-process">
        <div className="service-container">
          <h2 className="section-title">{language === 'ar' ? 'كيف نعمل' : 'How It Works'}</h2>
          <div className="process-steps">
            {processSteps.map((step, index) => (
              <div key={index} className="process-step">
                <div className="process-step-number">{step.number}</div>
                <div className="process-step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <div className="process-step-connector">
                    <FaArrowRight />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section ref={benefitsRef} className="service-benefits">
        <div className="service-container">
          <h2 className="section-title">{language === 'ar' ? 'لماذا تختارنا' : 'Why Choose Us'}</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="service-testimonials">
        <div className="service-container">
          <h2 className="section-title">{language === 'ar' ? 'آراء العملاء' : 'Client Testimonials'}</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="star-icon" />
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <FaUser className="author-icon" />
                  <div>
                    <div className="author-name">{testimonial.name}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="service-cta">
        <div className="service-cta-background" />
        <div className="service-container">
          <div className="cta-content">
            <h2>{language === 'ar' ? 'جاهز للبدء؟' : 'Ready to Get Started?'}</h2>
            <p>{language === 'ar' ? 'تواصل معنا اليوم واحصل على استشارة مجانية' : 'Contact us today and get a free consultation'}</p>
            <Link href="/contact" className="cta-button">
              {language === 'ar' ? 'اتصل بنا الآن' : 'Contact Us Now'}
              <FaArrowRight style={{ marginLeft: isRTL ? 0 : '8px', marginRight: isRTL ? '8px' : 0 }} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
