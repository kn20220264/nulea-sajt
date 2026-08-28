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

export async function getFeaturedNews() {
  return sanityClient.fetch(
    `*[_type == "news"] | order(publishedAt desc) [0...5]{
      "slug": slug.current, category, publishedAt, title, excerpt,
      coverImage{hotspot, altMe, altEn, alt, asset->{_id, url, metadata{lqip, dimensions}}}
    }`
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
      gallery[]{alt, altMe, altEn, asset->{_id, url, metadata{lqip, dimensions}}},
      relatedProject->{"slug": slug.current, title}
    }`,
    { slug }
  );
}

export async function getAllNewsSlugs() {
  return sanityClient.fetch(`*[_type == "news" && defined(slug.current)].slug.current`);
}

const projectFragment = `
  "slug": slug.current, title, status, startDate, endDate, donor, summary,
  coverImage{hotspot, altMe, altEn, alt, asset->{_id, url, metadata{lqip, dimensions}}}
`;

export async function getAllProjects() {
  return sanityClient.fetch(
    `*[_type == "project"] | order(coalesce(startDate, _createdAt) desc){${projectFragment}}`
  );
}

export async function getLatestProjects(limit = 3) {
  return sanityClient.fetch(
    `*[_type == "project"] | order(coalesce(startDate, _createdAt) desc) [0...$limit]{${projectFragment}}`,
    { limit }
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

export async function getAllPublications() {
  // Imena polja prate STVARNU šemu u Studiju: fileMe/fileEn (PDF),
  // coverImage (prost alt), publishedAt — ne mijenjati bez provjere dataseta.
  return sanityClient.fetch(
    `*[_type == "publication"] | order(publishedAt desc){
      title, description, "date": publishedAt,
      coverImage{alt, asset->{_id, url, metadata{lqip, dimensions}}},
      "pdfUrlMe": fileMe.asset->url,
      "pdfFileNameMe": fileMe.asset->originalFilename,
      "pdfUrlEn": fileEn.asset->url,
      "pdfFileNameEn": fileEn.asset->originalFilename
    }`
  );
}

export async function getAllReports() {
  // Imena polja prate STVARNU šemu u Studiju: file (PDF), type, year,
  // title (localeString) — provjereno u datasetu, ne mijenjati napamet.
  return sanityClient.fetch(
    `*[_type == "report"] | order(year desc, title.me asc){
      title, type, year,
      "pdfUrl": file.asset->url,
      "pdfSize": file.asset->size,
      "pdfFileName": file.asset->originalFilename
    }`
  );
}

export async function getAllProjectSlugs() {
  return sanityClient.fetch(`*[_type == "project" && defined(slug.current)].slug.current`);
}

const aboutImageFragment = `{altMe, altEn, asset->{_id, url, metadata{lqip, dimensions}}}`;

/** Singleton "O nama" — može biti null dok urednica ne popuni dokument. */
export async function getAboutPage() {
  return sanityClient.fetch(
    `*[_type == "aboutPage"][0]{
      heroEyebrow, heroTitle, heroIntro, heroCta,
      heroImage${aboutImageFragment},
      missionLabel, missionText, visionLabel, visionText, valuesLabel,
      values[]{title, description, icon{asset->{_id, url}}},
      bigWord,
      panelImage${aboutImageFragment},
      whatWeDoTitle, whatWeDoIntro, whatWeDoLead,
      cards[]{title, description},
      cutoutImageOne${aboutImageFragment},
      cutoutImageTwo${aboutImageFragment},
      ctaHeading
    }`
  );
}