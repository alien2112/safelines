import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://safelines.com';
const siteName = 'Safe Lines Customs Clearance';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  type?: 'article' | 'website';
  canonicalUrl?: string;
}

export function generateMetadata(seo: SEOData): Metadata {
  const title = seo.title ? `${seo.title} | ${siteName}` : siteName;
  const description = seo.description || 'Professional customs clearance and logistics services in Saudi Arabia';
  
  return {
    title,
    description,
    keywords: seo.keywords?.join(', '),
    authors: seo.author ? [{ name: seo.author }] : undefined,
    openGraph: {
      type: seo.type || 'website',
      url: seo.canonicalUrl || siteUrl,
      title,
      description,
      siteName,
      images: seo.image ? [
        {
          url: seo.image,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ] : undefined,
      publishedTime: seo.publishedTime,
      modifiedTime: seo.modifiedTime,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: seo.image ? [seo.image] : undefined,
    },
    alternates: {
      canonical: seo.canonicalUrl || siteUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateStructuredData(seo: SEOData) {
  const baseSchema = {
    '@context': 'https://schema.org',
  };

  if (seo.type === 'article') {
    return {
      ...baseSchema,
      '@type': 'Article',
      headline: seo.title,
      description: seo.description,
      image: seo.image,
      author: {
        '@type': 'Organization',
        name: seo.author || siteName,
      },
      publisher: {
        '@type': 'Organization',
        name: siteName,
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/safelines-logo.png`,
        },
      },
      datePublished: seo.publishedTime,
      dateModified: seo.modifiedTime || seo.publishedTime,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': seo.canonicalUrl || siteUrl,
      },
    };
  }

  return {
    ...baseSchema,
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    description: seo.description,
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/safelines-logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      areaServed: 'SA',
      availableLanguage: ['en', 'ar'],
    },
    sameAs: [
      // Add social media links here
    ],
  };
}



