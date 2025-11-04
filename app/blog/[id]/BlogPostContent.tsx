"use client";

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLanguage } from '../../contexts/LanguageContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
  internalLinks?: Array<{
    text: string;
    url: string;
    postId?: string;
  }>;
  slug?: string;
};

export default function BlogPostContent({ post }: { post: BlogPost }) {
  const { language, t } = useLanguage();
  const router = useRouter();
  const isRTL = language === 'ar';
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [nextPost, setNextPost] = useState<BlogPost | null>(null);
  const [prevPost, setPrevPost] = useState<BlogPost | null>(null);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const backButtonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // Load all posts for related posts and navigation from MongoDB
    async function loadAllPosts() {
      try {
        const res = await fetch('/api/blogs', { cache: 'no-store' });
        if (res.ok) {
          const posts = await res.json();
          const publishedPosts = posts.filter((p: any) => p.published);
          const sortedPosts = [...publishedPosts].sort((a: any, b: any) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          // Apply language to all posts
          const languageAwarePosts = sortedPosts.map((p: any) => ({
            ...p,
            id: p._id?.toString() || p.id,
            title: language === 'ar' ? (p.titleAr || p.title) : p.title,
            excerpt: language === 'ar' ? (p.excerptAr || p.excerpt) : p.excerpt,
          }));
          setAllPosts(languageAwarePosts);
          
          // Find current post index
          const currentPostId = post.id || (post as any)._id?.toString();
          const currentIndex = sortedPosts.findIndex((p: any) => (p._id?.toString() || p.id) === currentPostId);
          if (currentIndex > 0) {
            const prev = sortedPosts[currentIndex - 1];
            setNextPost({
              ...prev,
              id: prev._id?.toString() || prev.id,
              title: language === 'ar' ? (prev.titleAr || prev.title) : prev.title,
              excerpt: language === 'ar' ? (prev.excerptAr || prev.excerpt) : prev.excerpt,
            });
          }
          if (currentIndex < sortedPosts.length - 1) {
            const next = sortedPosts[currentIndex + 1];
            setPrevPost({
              ...next,
              id: next._id?.toString() || next.id,
              title: language === 'ar' ? (next.titleAr || next.title) : next.title,
              excerpt: language === 'ar' ? (next.excerptAr || next.excerpt) : next.excerpt,
            });
          }
        }
      } catch (e) {
        console.error('Error loading posts:', e);
      }
    }
    loadAllPosts();
  }, [post.id, language]);

  useEffect(() => {
    // Page transition animation
    gsap.fromTo('.blog-post-page',
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' }
    );

    // Hero image parallax
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        y: -50,
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }

    // Split text animation for title
    if (titleRef.current) {
      const text = titleRef.current.textContent || '';
      const words = text.split(' ');
      titleRef.current.innerHTML = words
        .map((word) => `<span class="blog-detail-word" style="display: inline-block; overflow: hidden;"><span style="display: inline-block;">${word}</span></span>`)
        .join(' ');

      const wordSpans = titleRef.current.querySelectorAll('.blog-detail-word span');
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

    // Animate hero content
    const heroContent = heroRef.current?.querySelector('.blog-post-hero-content');
    if (heroContent) {
      gsap.fromTo(heroContent.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          delay: 1,
          ease: 'expo.out',
        }
      );
    }

    // Animate paragraphs with scroll trigger
    if (contentRef.current) {
      const paragraphs = contentRef.current.querySelectorAll('p');
      paragraphs.forEach((para, index) => {
        gsap.set(para, { opacity: 0, y: 30 });
        ScrollTrigger.create({
          trigger: para,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(para, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              delay: index * 0.1,
              ease: 'power2.out',
            });
          },
          once: true,
        });
      });
    }

    // Animate back button
    if (backButtonRef.current) {
      gsap.fromTo(backButtonRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, delay: 0.5, ease: 'power2.out' }
      );
    }

    // Animate section dividers
    const dividers = document.querySelectorAll('.blog-post-divider');
    dividers.forEach((divider) => {
      gsap.set(divider, { scaleX: 0, opacity: 0 });
      ScrollTrigger.create({
        trigger: divider,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(divider, {
            scaleX: 1,
            opacity: 1,
            duration: 1,
            ease: 'expo.inOut',
          });
        },
        once: true,
      });
    });

    // Animate related posts
    const relatedCards = document.querySelectorAll('.blog-post-related-card');
    relatedCards.forEach((card, index) => {
      gsap.set(card, { opacity: 0, y: 40, scale: 0.95 });
      ScrollTrigger.create({
        trigger: card,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'power3.out',
          });
        },
        once: true,
      });
    });

    // Animate next/prev navigation
    const navCards = document.querySelectorAll('.blog-post-nav-card');
    navCards.forEach((card) => {
      gsap.set(card, { opacity: 0, x: card.classList.contains('next') ? 50 : -50 });
      ScrollTrigger.create({
        trigger: card,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'expo.out',
          });
        },
        once: true,
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, [post.id]);

  // Process content and replace internal links
  const processContent = (content: string) => {
    let processedContent = content;
    
    // Replace internal links if they exist (only first occurrence of each link text)
    if (post.internalLinks && post.internalLinks.length > 0) {
      post.internalLinks.forEach(link => {
        if (link.text && link.url) {
          const escapedText = link.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(`\\b${escapedText}\\b`, 'gi');
          let replaced = false;
          processedContent = processedContent.replace(regex, (match) => {
            if (!replaced) {
              replaced = true;
              return `<a href="${link.url}" class="blog-internal-link">${match}</a>`;
            }
            return match;
          });
        }
      });
    }

    // Convert newlines to paragraphs
    const paragraphs = processedContent.split('\n\n').filter(p => p.trim());
    return paragraphs.map((para, index) => (
      <p key={index} dangerouslySetInnerHTML={{ __html: para.replace(/\n/g, '<br />') }} />
    ));
  };

  // Get related posts (same category or tags)
  const relatedPosts = allPosts
    .filter(p => 
      p.id !== post.id && (
        p.category === post.category || 
        p.tags.some(tag => post.tags.includes(tag))
      )
    )
    .slice(0, 3);

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    gsap.to('.blog-post-page', {
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        router.push('/blog');
      },
    });
  };

  return (
    <main className="blog-post-page">
      {/* Back Button - Fixed */}
      <div className="blog-post-back-container">
        <Link 
          ref={backButtonRef}
          href="/blog" 
          className="blog-post-back-button"
          onClick={handleBackClick}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Back to Blog</span>
        </Link>
      </div>

      {/* Hero Section */}
      <div ref={heroRef} className="blog-post-hero" style={post.featuredImage ? {} : { background: 'linear-gradient(135deg, var(--color-primary) 0%, rgba(139, 92, 246, 0.8) 100%)' }}>
        {post.featuredImage && (
          <>
            <div 
              ref={imageRef}
              className="blog-post-featured-image"
              style={{ backgroundImage: `url(${post.featuredImage})` }}
            />
            <div className="blog-post-hero-overlay" />
          </>
        )}
        <div className="container">
          <div className="blog-post-hero-content">
            {/* Breadcrumb */}
            <nav className="blog-post-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/blog">Blog</Link>
              <span>/</span>
              <span>{post.title}</span>
            </nav>

            {/* Meta */}
            <div className="blog-post-meta-top">
              <span className="blog-post-category">{post.category}</span>
              <span className="blog-post-date">
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="blog-post-author">By Safe Lines Team</span>
            </div>

            {/* Title */}
            <h1 ref={titleRef} className="blog-post-title" dir={isRTL ? 'rtl' : 'ltr'}>
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="blog-post-excerpt" dir={isRTL ? 'rtl' : 'ltr'}>
              {post.excerpt}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container blog-post-content-wrapper">
        <div className="blog-post-content-grid">
          <article className="blog-post-main">
            {/* Content */}
            <div ref={contentRef} className="blog-post-body">
              {processContent(post.content)}
            </div>

            {/* Divider */}
            <div className="blog-post-divider" />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="blog-post-tags">
                <h3 className="blog-post-tags-title">Tags</h3>
                <div className="blog-post-tags-list">
                  {post.tags.map(tag => (
                    <span key={tag} className="blog-post-tag">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Share Section */}
            <div className="blog-post-share">
              <h3 className="blog-post-share-title">Share this post</h3>
              <div className="blog-post-share-buttons">
                <button className="blog-post-share-btn" aria-label="Share on Facebook">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                <button className="blog-post-share-btn" aria-label="Share on Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <button className="blog-post-share-btn" aria-label="Share on LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
                <button className="blog-post-share-btn" aria-label="Copy link">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                </button>
              </div>
            </div>

          </article>

          {/* Sidebar */}
          <aside className="blog-post-sidebar">
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="blog-post-related">
                <h3 className="blog-post-related-title">Related Posts</h3>
                <div className="blog-post-related-list">
                  {relatedPosts.map(relatedPost => (
                    <Link 
                      key={relatedPost.id} 
                      href={`/blog/${relatedPost.slug || relatedPost.id}`}
                      className="blog-post-related-card"
                    >
                      {relatedPost.featuredImage && (
                        <div 
                          className="blog-post-related-image"
                          style={{ backgroundImage: `url(${relatedPost.featuredImage})` }}
                        />
                      )}
                      <div className="blog-post-related-content">
                        <h4>{relatedPost.title}</h4>
                        <p>{relatedPost.excerpt.substring(0, 80)}...</p>
                        <span className="blog-post-related-date">
                          {new Date(relatedPost.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        {/* Next/Previous Navigation */}
        {(nextPost || prevPost) && (
          <div className="blog-post-navigation">
            {prevPost && (
              <Link 
                href={`/blog/${prevPost.slug || prevPost.id}`}
                className="blog-post-nav-card prev"
              >
                <div className="blog-post-nav-label">Previous Post</div>
                <h4 className="blog-post-nav-title">{prevPost.title}</h4>
              </Link>
            )}
            {nextPost && (
              <Link 
                href={`/blog/${nextPost.slug || nextPost.id}`}
                className="blog-post-nav-card next"
              >
                <div className="blog-post-nav-label">Next Post</div>
                <h4 className="blog-post-nav-title">{nextPost.title}</h4>
              </Link>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
