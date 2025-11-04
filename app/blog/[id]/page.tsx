"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BlogPostContent from './BlogPostContent';
import { generateStructuredData, generateBreadcrumbSchema } from '../../lib/seo';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://safelines.com';

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

export default function BlogPostPage() {
  const params = useParams();
  const id = params.id as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get blog post from localStorage
    try {
      const saved = localStorage.getItem('admin_blog_posts');
      if (saved) {
        const posts = JSON.parse(saved);
        const found = posts.find((p: BlogPost) => p.id === id || p.slug === id);
        if (found && found.published) {
          // Get current language
          const language = localStorage.getItem('language') || 'en';
          const isArabic = language === 'ar';
          // Use language-appropriate content
          setPost({
            ...found,
            title: isArabic ? (found.titleAr || found.title) : found.title,
            content: isArabic ? (found.contentAr || found.content) : found.content,
            excerpt: isArabic ? (found.excerptAr || found.excerpt) : found.excerpt,
          });
        }
      }
    } catch (e) {
      console.error('Error loading post:', e);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (post) {
      const seoData = {
        title: post.seoTitle || post.title,
        description: post.seoDescription || post.excerpt,
        keywords: post.seoKeywords || post.tags,
        image: post.featuredImage,
        author: 'Safe Lines Team',
        publishedTime: post.createdAt,
        modifiedTime: post.updatedAt,
        type: 'article' as const,
        canonicalUrl: `${siteUrl}/blog/${post.slug || post.id}`,
      };

      const structuredData = generateStructuredData(seoData);
      const breadcrumbData = generateBreadcrumbSchema([
        { name: 'Home', url: siteUrl },
        { name: 'Blog', url: `${siteUrl}/blog` },
        { name: post.title, url: `${siteUrl}/blog/${post.slug || post.id}` },
      ]);

      // Update page title and meta
      document.title = `${post.seoTitle || post.title} | Safe Lines Customs Clearance`;
      
      // Update or create meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', post.seoDescription || post.excerpt);

      // Update or create meta keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      const keywords = (post.seoKeywords || post.tags || []).join(', ');
      if (keywords) {
        if (!metaKeywords) {
          metaKeywords = document.createElement('meta');
          metaKeywords.setAttribute('name', 'keywords');
          document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute('content', keywords);
      }

      // Add structured data
      const existingScripts = document.querySelectorAll('script[data-seo-script]');
      existingScripts.forEach(s => s.remove());

      const script1 = document.createElement('script');
      script1.type = 'application/ld+json';
      script1.setAttribute('data-seo-script', 'structured-data');
      script1.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.type = 'application/ld+json';
      script2.setAttribute('data-seo-script', 'breadcrumb');
      script2.textContent = JSON.stringify(breadcrumbData);
      document.head.appendChild(script2);

      // Add Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]') || document.createElement('meta');
      if (!ogTitle.hasAttribute('property')) ogTitle.setAttribute('property', 'og:title');
      ogTitle.setAttribute('content', post.seoTitle || post.title);
      if (!document.querySelector('meta[property="og:title"]')) document.head.appendChild(ogTitle);

      const ogDesc = document.querySelector('meta[property="og:description"]') || document.createElement('meta');
      if (!ogDesc.hasAttribute('property')) ogDesc.setAttribute('property', 'og:description');
      ogDesc.setAttribute('content', post.seoDescription || post.excerpt);
      if (!document.querySelector('meta[property="og:description"]')) document.head.appendChild(ogDesc);

      if (post.featuredImage) {
        const ogImage = document.querySelector('meta[property="og:image"]') || document.createElement('meta');
        if (!ogImage.hasAttribute('property')) ogImage.setAttribute('property', 'og:image');
        ogImage.setAttribute('content', post.featuredImage);
        if (!document.querySelector('meta[property="og:image"]')) document.head.appendChild(ogImage);
      }

      return () => {
        const scripts = document.querySelectorAll('script[data-seo-script]');
        scripts.forEach(s => s.remove());
      };
    }
  }, [post]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
        <h1>Post Not Found</h1>
        <p>The blog post you're looking for doesn't exist or hasn't been published yet.</p>
        <a href="/blog" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 700 }}>
          ← Back to Blog
        </a>
      </div>
    );
  }

  return <BlogPostContent post={post} />;
}

