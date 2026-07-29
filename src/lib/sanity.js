import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

/**
 * Always route images through Sanity's image CDN rather than linking to
 * the original asset file — the CDN re-encodes images, which strips
 * EXIF/GPS metadata that phone photos carry.
 */
export function urlFor(source) {
  return builder.image(source);
}