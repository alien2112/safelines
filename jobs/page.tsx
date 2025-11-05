"use client";

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';
// import { LoadingScreen } from '../components/LoadingScreen';
import { GSAPAnimations } from '../components/GSAPAnimations';
import VideoBackground from '../components/VideoBackground';
import { useLanguage } from '../contexts/LanguageContext';

const Footer = dynamic(() => import('../components/Footer'), {
  loading: () => <div style={{ minHeight: '200px' }} />
});

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type Job = {
  _id: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  image?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function JobsPage() {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const jobsGridRef = useRef<HTMLDivElement>(null);
  const noJobsRef = useRef<HTMLDivElement>(null);

  // Fetch jobs
  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch('/api/jobs', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setJobs(data.filter((job: Job) => job.published));
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, []);

  // Page loader
  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoadingPage(false);
      }, 800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      setTimeout(handleLoad, 3000);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    if (typeof window === 'undefined' || isLoadingPage) return;

    const triggers: ScrollTrigger[] = [];

    // Hero section animations with text splitting
    if (heroRef.current) {
      const heroTitle = heroRef.current.querySelector('.jobs-hero-title');
      const heroSubtitle = heroRef.current.querySelector('.jobs-hero-subtitle');

      if (heroTitle && heroSubtitle && !heroTitle.querySelector('.hero-word')) {
        // Split title into words for animation (only once)
        const titleText = heroTitle.textContent || '';
        const words = titleText.split(' ');
        heroTitle.innerHTML = words.map(word => `<span class="hero-word">${word}</span>`).join(' ');
        
        const titleWords = heroTitle.querySelectorAll('.hero-word');
        gsap.set(titleWords, { opacity: 0, y: 30, rotationX: -90 });
        gsap.set(heroSubtitle, { opacity: 0, y: 30 });

        const tl = gsap.timeline({ delay: 0.3 });
        
        // Animate title words with stagger
        tl.to(titleWords, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.2)',
        })
        .to(heroSubtitle, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        }, '-=0.4');
      } else if (heroTitle && heroSubtitle) {
        // If already split, just animate
        const titleWords = heroTitle.querySelectorAll('.hero-word');
        gsap.set(titleWords, { opacity: 0, y: 30, rotationX: -90 });
        gsap.set(heroSubtitle, { opacity: 0, y: 30 });

        const tl = gsap.timeline({ delay: 0.3 });
        tl.to(titleWords, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'back.out(1.2)',
        })
        .to(heroSubtitle, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        }, '-=0.4');
      }
    }

    // Jobs grid staggered animation
    if (jobsGridRef.current && jobs.length > 0) {
      const jobCards = jobsGridRef.current.querySelectorAll('.job-card');
      gsap.set(jobCards, { opacity: 0, y: 60, scale: 0.95 });

      const batchTriggers = ScrollTrigger.batch(jobCards, {
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
          });
        },
        once: true,
        start: 'top 80%',
      });

      if (Array.isArray(batchTriggers)) {
        triggers.push(...batchTriggers);
      }

      // Hover effects for job cards
      jobCards.forEach((card) => {
        const cardEl = card as HTMLElement;
        cardEl.addEventListener('mouseenter', () => {
          gsap.to(cardEl, {
            scale: 1.02,
            y: -5,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
        cardEl.addEventListener('mouseleave', () => {
          gsap.to(cardEl, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      });
    }

    // No jobs animation
    if (noJobsRef.current && jobs.length === 0 && !loading) {
      const noJobsTitle = noJobsRef.current.querySelector('.no-jobs-title');
      const noJobsSubtitle = noJobsRef.current.querySelector('.no-jobs-subtitle');
      const noJobsDesc = noJobsRef.current.querySelector('.no-jobs-description');
      const noJobsIcon = noJobsRef.current.querySelector('.no-jobs-icon');

      if (noJobsTitle && noJobsSubtitle && noJobsDesc && noJobsIcon) {
        gsap.set([noJobsTitle, noJobsSubtitle, noJobsDesc, noJobsIcon], {
          opacity: 0,
        });
        gsap.set(noJobsIcon, { scale: 0.8, y: 20 });
        gsap.set(noJobsTitle, { y: 30 });
        gsap.set(noJobsSubtitle, { y: 20 });
        gsap.set(noJobsDesc, { y: 20 });

        const trigger = ScrollTrigger.create({
          trigger: noJobsRef.current,
          start: 'top 80%',
          onEnter: () => {
            const tl = gsap.timeline();
            tl.to(noJobsIcon, {
              opacity: 1,
              scale: 1,
              y: 0,
              duration: 0.8,
              ease: 'back.out(1.7)',
            })
            .to(noJobsTitle, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
            }, '-=0.4')
            .to(noJobsSubtitle, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
            }, '-=0.3')
            .to(noJobsDesc, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
            }, '-=0.3');
          },
          once: true,
        });
        triggers.push(trigger);

        // Floating animation for icon
        gsap.to(noJobsIcon, {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
        });
      }
    }

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [jobs, loading, isLoadingPage, language]);

  // if (isLoadingPage) {
  //   return <LoadingScreen />;
  // }

  return (
    <main className="jobs-page" dir={isRTL ? 'rtl' : 'ltr'}>
      <GSAPAnimations />

      {/* Hero Section */}
      <section ref={heroRef} className="jobs-hero">
        <VideoBackground src="/2025-11-03 18-02-55.mp4" fixed zIndex={0} scale={1.2} />
        <div className="container">
          <div className="jobs-hero-content">
            <h1 className="jobs-hero-title" dir={isRTL ? 'rtl' : 'ltr'} data-title={t.jobs.hero.title}>
              {t.jobs.hero.title}
            </h1>
            <p className="jobs-hero-subtitle" dir={isRTL ? 'rtl' : 'ltr'}>
              {t.jobs.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Jobs Grid */}
      {loading ? (
        <section className="jobs-section">
          <div className="container">
            <div className="jobs-loading">
              <div className="loading-spinner" />
              <p dir={isRTL ? 'rtl' : 'ltr'}>Loading jobs...</p>
            </div>
          </div>
        </section>
      ) : jobs.length > 0 ? (
        <section className="jobs-section">
          <div className="container">
            <div ref={jobsGridRef} className="jobs-grid">
              {jobs.map((job) => (
                <div key={job._id} className="job-card">
                  {job.image && (
                    <div className="job-card-image">
                      <Image
                        src={job.image}
                        alt={isRTL ? job.titleAr : job.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="job-card-content">
                    <h3 className="job-card-title" dir={isRTL ? 'rtl' : 'ltr'}>
                      {isRTL ? job.titleAr : job.title}
                    </h3>
                    <p className="job-card-description" dir={isRTL ? 'rtl' : 'ltr'}>
                      {isRTL ? job.descriptionAr : job.description}
                    </p>
                    <div className="job-card-actions">
                      <Link
                        href="/contact"
                        className="job-card-button primary"
                        dir={isRTL ? 'rtl' : 'ltr'}
                      >
                        {t.jobs.card.apply}
                      </Link>
                      <button 
                        className="job-card-button secondary" 
                        dir={isRTL ? 'rtl' : 'ltr'}
                        onClick={() => {
                          setSelectedJob(job);
                          setShowDetailsModal(true);
                        }}
                      >
                        {t.jobs.card.viewDetails}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="jobs-section">
          <div className="container">
            <div ref={noJobsRef} className="no-jobs">
              <div className="no-jobs-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="3" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h2 className="no-jobs-title" dir={isRTL ? 'rtl' : 'ltr'}>
                {t.jobs.noJobs.title}
              </h2>
              <p className="no-jobs-subtitle" dir={isRTL ? 'rtl' : 'ltr'}>
                {t.jobs.noJobs.subtitle}
              </p>
              <p className="no-jobs-description" dir={isRTL ? 'rtl' : 'ltr'}>
                {t.jobs.noJobs.description}
              </p>
              <Link href="/contact" className="no-jobs-cta" dir={isRTL ? 'rtl' : 'ltr'}>
                {t.contact.form.submit}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Job Details Modal */}
      {showDetailsModal && selectedJob && (
        <JobDetailsModal
          job={selectedJob}
          onClose={() => {
            setShowDetailsModal(false);
            setSelectedJob(null);
          }}
        />
      )}
      <Footer />
    </main>
  );
}

// Job Details Modal Component
function JobDetailsModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
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
        ease: 'power2.out',
      })
      .to(modal, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        ease: 'expo.out',
      }, '-=0.2');

      // Animate content
      const content = modal.querySelector('.job-details-content');
      if (content) {
        const elements = content.querySelectorAll('h2, p, img, .job-details-actions');
        gsap.fromTo(elements,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out',
            delay: 0.3,
          }
        );
      }
    }
  }, []);

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
        ease: 'power3.in'
      });
      
      tl.to(overlay, {
        opacity: 0,
        backdropFilter: 'blur(0px)',
        duration: 0.3,
        ease: 'power2.in'
      }, '-=0.2');
    } else {
      onClose();
    }
  };

  return (
    <div className="admin-modal-overlay" ref={overlayRef} onClick={handleClose}>
      <div className="admin-modal job-details-modal" ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <h3 dir={isRTL ? 'rtl' : 'ltr'}>{isRTL ? job.titleAr : job.title}</h3>
          <button className="admin-modal-close" onClick={handleClose}>×</button>
        </div>
        <div className="job-details-content">
          {job.image && (
            <div className="job-details-image">
              <Image
                src={job.image}
                alt={isRTL ? job.titleAr : job.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="100vw"
              />
            </div>
          )}
          <div className="job-details-text" dir={isRTL ? 'rtl' : 'ltr'}>
            <h2 className="job-details-title" dir={isRTL ? 'rtl' : 'ltr'}>
              {isRTL ? job.titleAr : job.title}
            </h2>
            <div 
              className="job-details-description" 
              dir={isRTL ? 'rtl' : 'ltr'}
              dangerouslySetInnerHTML={{ 
                __html: (isRTL ? job.descriptionAr : job.description).replace(/\n/g, '<br />') 
              }}
            />
          </div>
          <div className="job-details-actions">
            <Link
              href="/contact"
              className="job-card-button primary"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {t.jobs.card.apply}
            </Link>
            <button 
              className="job-card-button secondary" 
              onClick={handleClose}
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              {t.home.services.page.modal.actions.close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

