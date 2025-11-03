"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { useLanguage } from '../contexts/LanguageContext';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
  slug?: string;
};

// Get blog posts from admin dashboard (localStorage)
function getBlogPosts(): BlogPost[] {
  if (typeof window === 'undefined') return [];
  
  const saved = localStorage.getItem('admin_blog_posts');
  if (!saved) return [];
  
  try {
    const adminPosts = JSON.parse(saved);
    // Convert admin post format to blog page format
    return adminPosts
      .filter((post: any) => post.published) // Only show published posts
      .map((post: any) => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt,
        author: 'Safe Lines Team', // Default author
        date: new Date(post.createdAt).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        category: post.category,
        image: post.featuredImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop',
        readTime: '5 min read', // Default read time
        slug: post.slug, // Include slug from admin post
      }))
      .sort((a: BlogPost, b: BlogPost) => new Date(b.date).getTime() - new Date(a.date).getTime()); // Sort by date, newest first
  } catch {
    return [];
  }
}

export default function BlogPage() {
  const { language, t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isRTL = language === 'ar';
  const [blogPosts, setBlogPosts] = React.useState<BlogPost[]>([]);

  React.useEffect(() => {
    setBlogPosts(getBlogPosts());
    // Listen for storage changes to update blog posts in real-time
    const handleStorageChange = () => {
      setBlogPosts(getBlogPosts());
    };
    window.addEventListener('storage', handleStorageChange);
    // Also check periodically for changes (since storage event only fires in other tabs)
    const interval = setInterval(() => {
      setBlogPosts(getBlogPosts());
    }, 1000);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    // Split Text Animation for Hero
    const heroTitle = document.querySelector('.blog-hero-title');
    const heroSubtitle = document.querySelector('.blog-hero-subtitle');

    if (heroTitle) {
      const text = heroTitle.textContent || '';
      const words = text.split(' ');
      heroTitle.innerHTML = words
        .map(
          (word) =>
            `<span class="blog-word" style="display: inline-block; overflow: hidden;"><span style="display: inline-block;">${word}</span></span>`
        )
        .join(' ');

      const wordSpans = heroTitle.querySelectorAll('.blog-word span');
      gsap.set(wordSpans, { y: '100%', opacity: 0 });

      const tl = gsap.timeline({ delay: 0.3 });
      tl.to(wordSpans, {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
      });
    }

    if (heroSubtitle) {
      gsap.set(heroSubtitle, { opacity: 0, y: 20 });
      gsap.to(heroSubtitle, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.8,
        ease: 'expo.out',
      });
    }

    // Blog Cards Animation with Rotation and Stagger
    const blogCards = document.querySelectorAll('.blog-card');
    const handlers: Array<{ card: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];
    
    // Magnetic Cursor Effect for Blog Cards
    blogCards.forEach((card) => {
      const cardEl = card as HTMLElement;
      
      const handleMouseMove = (e: MouseEvent) => {
        const rect = cardEl.getBoundingClientRect();
        const isInside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (isInside) {
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const deltaX = (e.clientX - centerX) * 0.15;
          const deltaY = (e.clientY - centerY) * 0.15;

          gsap.to(cardEl, {
            x: deltaX,
            y: deltaY,
            duration: 0.4,
            ease: 'power2.out',
          });
        }
      };
      
      const handleMouseLeave = () => {
        gsap.to(cardEl, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
      };

      cardEl.addEventListener('mousemove', handleMouseMove);
      cardEl.addEventListener('mouseleave', handleMouseLeave);
      
      handlers.push({ card: cardEl, move: handleMouseMove, leave: handleMouseLeave });
    });
    blogCards.forEach((card, index) => {
      gsap.set(card, {
        opacity: 0,
        rotationY: -15,
        y: 60,
        scale: 0.9,
      });

      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            rotationY: 0,
            y: 0,
            scale: 1,
            duration: 1,
            delay: index * 0.1,
            ease: 'power3.out',
          });
        },
        once: true,
      });

      // Parallax for blog card images
      const cardImage = card.querySelector('.blog-card-image');
      if (cardImage) {
        ScrollTrigger.create({
          trigger: card,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            gsap.set(cardImage, {
              y: progress * -30,
              scale: 1 + progress * 0.1,
            });
          },
        });
      }
    });

    // Parallax for background elements
    const parallaxElements = document.querySelectorAll('.blog-parallax-bg');
    parallaxElements.forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.set(el, {
            y: progress * 50,
            opacity: 0.3 + progress * 0.2,
          });
        },
      });
    });

    // Card hover effects (lift and shadow/image zoom)
    blogCards.forEach((card) => {
      const cardEl = card as HTMLElement;
      const cardImage = card.querySelector('.blog-card-image') as HTMLElement;
      const cardShadow = card.querySelector('.blog-card-shadow') as HTMLElement;

      const handleMouseEnter = () => {
        gsap.to(cardEl, {
          y: -8,
          duration: 0.4,
          ease: 'power2.out',
        });
        if (cardShadow) {
          gsap.to(cardShadow, {
            scale: 1.1,
            opacity: 0.3,
            duration: 0.4,
            ease: 'power2.out',
          });
        }
        if (cardImage) {
          gsap.to(cardImage, {
            scale: 1.1,
            duration: 0.4,
            ease: 'power2.out',
          });
        }
      };

      const handleMouseLeaveHover = () => {
        gsap.to(cardEl, {
          y: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
        if (cardShadow) {
          gsap.to(cardShadow, {
            scale: 1,
            opacity: 0.15,
            duration: 0.4,
            ease: 'power2.out',
          });
        }
        if (cardImage) {
          gsap.to(cardImage, {
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
          });
        }
      };

      cardEl.addEventListener('mouseenter', handleMouseEnter);
      cardEl.addEventListener('mouseleave', handleMouseLeaveHover);
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      handlers.forEach(({ card, move, leave }) => {
        card.removeEventListener('mousemove', move);
        card.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  return (
    <main className="blog-page">
      {/* Hero Section */}
      <section className="blog-hero">
        <div className="blog-parallax-bg" />
        <div className="container">
          <div className="blog-hero-content">
            <h1 className="blog-hero-title" dir={isRTL ? 'rtl' : 'ltr'}>{t.blog.hero.title}</h1>
            <p className="blog-hero-subtitle" dir={isRTL ? 'rtl' : 'ltr'}>
              {t.blog.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="blog-posts-section">
        <div className="container">
          <div ref={cardsRef} className="blog-grid">
            {blogPosts.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px' }}>
                <p style={{ color: 'var(--gray-500)', fontSize: '18px' }}>No blog posts available yet.</p>
              </div>
            ) : (
              blogPosts.map((post) => (
              <article key={post.id} className="blog-card">
                <div className="blog-card-shadow" />
                <div className="blog-card-image-wrapper">
                  <div
                    className="blog-card-image"
                    style={{ backgroundImage: `url(${post.image})` }}
                  />
                  <div className="blog-card-category">{post.category}</div>
                </div>
                <div className="blog-card-content">
                  <div className="blog-card-meta">
                    <span className="blog-card-date">{post.date}</span>
                    <span className="blog-card-read">{post.readTime}</span>
                  </div>
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-footer">
                    <span className="blog-card-author">By {post.author}</span>
                    <Link href={`/blog/${post.slug || post.id}`} className="blog-card-link">
                      {t.common.readMore}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="blog-newsletter">
        <div className="container">
          <div className="blog-newsletter-content">
            <h2 className="blog-newsletter-title" dir={isRTL ? 'rtl' : 'ltr'}>{t.blog.newsletter.title}</h2>
            <p className="blog-newsletter-text" dir={isRTL ? 'rtl' : 'ltr'}>
              {t.blog.newsletter.text}
            </p>
            <form className="blog-newsletter-form">
              <input
                type="email"
                placeholder={t.blog.newsletter.emailPlaceholder}
                className="blog-newsletter-input"
                dir={isRTL ? 'rtl' : 'ltr'}
              />
              <button type="submit" className="blog-newsletter-button" dir={isRTL ? 'rtl' : 'ltr'}>
                {t.blog.newsletter.subscribe}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
