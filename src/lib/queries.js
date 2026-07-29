import { sanityClient } from './sanity.js';

const coverImageFragment = `coverImage{alt, asset->{_id, url, metadata{lqip, dimensions}}}`;

export async function getSiteSettings() {
  const settings = await sanityClient.fetch(
    `*[_type == "siteSettings"][0]{sosNumber, sosNote, email, emergencyNote, quickExitUrl}`
  );
  return (
    settings ?? {
      sosNumber: '',
      sosNote: { me: '', en: '' },
      email: '',
      emergencyNote: { me: '', en: '' },
      quickExitUrl: 'https://www.google.com',
    }
  );
}

export async function getLatestNews(limit = 2) {
  return sanityClient.fetch(
    `*[_type == "news"] | order(publishedAt desc) [0...$limit]{
      "slug": slug.current, category, publishedAt, title, excerpt, ${coverImageFragment}
    }`,
    { limit }
  );
}

export async function getAllNews() {
  return sanityClient.fetch(
    `*[_type == "news"] | order(publishedAt desc){
      "slug": slug.current, category, publishedAt, title, excerpt, ${coverImageFragment}
    }`
  );
}

export async function getNewsBySlug(slug) {
  return sanityClient.fetch(
    `*[_type == "news" && slug.current == $slug][0]{
      "slug": slug.current, category, publishedAt, title, excerpt, body, ${coverImageFragment},
      relatedProject->{"slug": slug.current, title}
    }`,
    { slug }
  );
}

export async function getAllNewsSlugs() {
  return sanityClient.fetch(`*[_type == "news" && defined(slug.current)].slug.current`);
}

const projectFragment = `
  "slug": slug.current, title, status, startDate, endDate, donor, summary, ${coverImageFragment}
`;

export async function getActiveProjects() {
  return sanityClient.fetch(
    `*[_type == "project" && status in ["active", "planned"]] | order(startDate desc){${projectFragment}}`
  );
}

export async function getArchivedProjects() {
  return sanityClient.fetch(
    `*[_type == "project" && status == "done"] | order(endDate desc){${projectFragment}}`
  );
}

export async function getProjectBySlug(slug) {
  return sanityClient.fetch(
    `*[_type == "project" && slug.current == $slug][0]{
      "slug": slug.current, title, status, startDate, endDate, donor, summary, body,
      ${coverImageFragment},
      gallery[]{alt, asset->{_id, url, metadata{lqip, dimensions}}},
      documents[]{asset->{_id, url, originalFilename, size}}
    }`,
    { slug }
  );
}

export async function getAllProjectSlugs() {
  return sanityClient.fetch(`*[_type == "project" && defined(slug.current)].slug.current`);
}