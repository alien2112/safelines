export interface SitemapEntry {
  url: string;
  lastModified?: Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://safelines.com';

export function generateSitemap(entries: SitemapEntry[]): string {
  const urls = entries.map(entry => {
    const lastMod = entry.lastModified ? entry.lastModified.toISOString() : new Date().toISOString();
    const changeFreq = entry.changeFrequency || 'weekly';
    const priority = entry.priority?.toFixed(1) || '0.8';
    
    return `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${changeFreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export async function getSitemapEntries(): Promise<SitemapEntry[]> {
  const entries: SitemapEntry[] = [
    {
      url: `${siteUrl}/`,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/about`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/contact`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Add blog posts from localStorage
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem('admin_blog_posts');
      if (saved) {
        const posts = JSON.parse(saved);
        posts
          .filter((post: any) => post.published)
          .forEach((post: any) => {
            entries.push({
              url: `${siteUrl}/blog/${post.id}`,
              lastModified: new Date(post.updatedAt || post.createdAt),
              changeFrequency: 'monthly',
              priority: 0.7,
            });
          });
      }
    } catch (e) {
      console.error('Error loading blog posts for sitemap:', e);
    }
  }

  return entries;
}

