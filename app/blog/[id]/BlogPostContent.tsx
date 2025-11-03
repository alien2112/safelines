"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '../../contexts/LanguageContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
  internalLinks?: Array<{
    text: string;
    url: string;
    postId?: string;
  }>;
  slug?: string;
};

export default function BlogPostContent({ post }: { post: BlogPost }) {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar';
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Load all posts for related posts section
    try {
      const saved = localStorage.getItem('admin_blog_posts');
      if (saved) {
        const posts = JSON.parse(saved);
        setAllPosts(posts.filter((p: BlogPost) => p.published && p.id !== post.id));
      }
    } catch (e) {
      console.error('Error loading posts:', e);
    }

    // Animate content on load
    gsap.fromTo('.blog-post-content',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.2 }
    );
  }, [post.id]);

  // Process content and replace internal links
  const processContent = (content: string) => {
    let processedContent = content;
    
    // Replace internal links if they exist (only first occurrence of each link text)
    if (post.internalLinks && post.internalLinks.length > 0) {
      post.internalLinks.forEach(link => {
        if (link.text && link.url) {
          // Escape special regex characters in link text
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
      p.category === post.category || 
      p.tags.some(tag => post.tags.includes(tag))
    )
    .slice(0, 3);

  return (
    <main className="blog-post-page">
      <article className="blog-post-article">
        {/* Hero Section */}
        <div className="blog-post-hero">
          {post.featuredImage && (
            <div 
              className="blog-post-featured-image"
              style={{ backgroundImage: `url(${post.featuredImage})` }}
            />
          )}
          <div className="blog-post-hero-overlay" />
          <div className="container">
            <div className="blog-post-hero-content">
              <nav className="blog-post-breadcrumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span>/</span>
                <Link href="/blog">Blog</Link>
                <span>/</span>
                <span>{post.title}</span>
              </nav>
              <div className="blog-post-meta-top">
                <span className="blog-post-category">{post.category}</span>
                <span className="blog-post-date">
                  {new Date(post.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <h1 className="blog-post-title" dir={isRTL ? 'rtl' : 'ltr'}>
                {post.title}
              </h1>
              <p className="blog-post-excerpt" dir={isRTL ? 'rtl' : 'ltr'}>
                {post.excerpt}
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container blog-post-content">
          <div className="blog-post-main">
            <div className="blog-post-body">
              {processContent(post.content)}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="blog-post-tags">
                <h3>Tags:</h3>
                <div className="blog-post-tags-list">
                  {post.tags.map(tag => (
                    <span key={tag} className="blog-post-tag">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Internal Links Section */}
            {post.internalLinks && post.internalLinks.length > 0 && (
              <div className="blog-post-internal-links">
                <h3>Related Resources:</h3>
                <ul>
                  {post.internalLinks.map((link, index) => (
                    <li key={index}>
                      <Link href={link.url} className="blog-internal-link-item">
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="blog-post-sidebar">
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="blog-post-related">
                <h3>Related Posts</h3>
                <div className="blog-post-related-list">
                  {relatedPosts.map(relatedPost => (
                    <Link 
                      key={relatedPost.id} 
                      href={`/blog/${relatedPost.slug || relatedPost.id}`}
                      className="blog-post-related-item"
                    >
                      {relatedPost.featuredImage && (
                        <img 
                          src={relatedPost.featuredImage} 
                          alt={relatedPost.title}
                          className="blog-post-related-image"
                        />
                      )}
                      <div className="blog-post-related-content">
                        <h4>{relatedPost.title}</h4>
                        <p>{relatedPost.excerpt.substring(0, 100)}...</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Back to Blog */}
            <div className="blog-post-navigation">
              <Link href="/blog" className="blog-post-back-link">
                ← Back to Blog
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}

