import type { MetadataRoute } from 'next';
import { episodes } from '@/data/episodes';

export const dynamic = 'force-static';

const BASE_URL = 'https://quietfrequencies.example';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ['', '/episodes', '/about', '/faq'].map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: 'monthly' as const,
    priority: path === '' ? 1 : 0.8,
  }));

  const episodePages = episodes.map((episode) => ({
    url: `${BASE_URL}/episodes/${episode.slug}`,
    lastModified: new Date(episode.publishedAt),
    changeFrequency: 'never' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...episodePages];
}
