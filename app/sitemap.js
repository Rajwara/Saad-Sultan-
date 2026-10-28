import { SITE } from '@/lib/content';

export default function sitemap() {
  return [{ url: `${SITE.url}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 }];
}
