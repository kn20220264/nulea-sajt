export const LOCALES = ['me', 'en'];
export const DEFAULT_LOCALE = 'me';

export const HTML_LANG = { me: 'sr-ME', en: 'en' };

const UI = {
  orgType: { me: 'Nevladino udruženje', en: 'Non-governmental association' },
  nav_home: { me: 'Naslovna', en: 'Home' },
  nav_news: { me: 'Vijesti', en: 'News' },
  nav_projects: { me: 'Projekti', en: 'Projects' },
  nav_about: { me: 'O nama', en: 'About us' },
  nav_contact: { me: 'Kontakt', en: 'Contact' },
  menu_label: { me: 'Meni', en: 'Menu' },
  skip_to_content: { me: 'Preskoči na sadržaj', en: 'Skip to content' },

  sos_label: { me: 'SOS telefon — 24h', en: 'SOS line — 24h' },
  quick_exit: { me: 'Brzi izlaz', en: 'Quick exit' },

  privacy_notice: {
    me: 'Posjeta ovom sajtu ostaje zabilježena u istoriji vašeg pretraživača. Ako niste sigurne da je uređaj bezbjedan, koristite privatni prozor (Ctrl+Shift+N) ili pritisnite Esc za brzi izlaz.',
    en: 'Visiting this site is recorded in your browser history. If you are not sure the device is safe, use a private window (Ctrl+Shift+N) or press Esc to leave the site quickly.',
  },

  all_news: { me: 'Sve vijesti →', en: 'All news →' },
  all_projects: { me: 'Svi projekti →', en: 'All projects →' },
  news_heading: { me: 'Novosti', en: 'News' },
  current_projects_heading: { me: 'Aktuelni projekti', en: 'Current projects' },
  what_we_do: { me: 'Čime se bavimo', en: 'What we do' },

  news_page_title: { me: 'Vijesti', en: 'News' },
  news_page_lead: {
    me: 'Radionice, obuke, predavanja i saopštenja iz našeg rada.',
    en: 'Workshops, trainings, lectures and statements from our work.',
  },
  projects_page_title: { me: 'Projekti', en: 'Projects' },
  projects_page_lead: {
    me: 'Programi koje trenutno vodimo i oni koje smo završili.',
    en: 'Programmes we currently run, and those we have completed.',
  },
  archive_heading: { me: 'Arhiva — završeni projekti', en: 'Archive — completed projects' },

  photo_placeholder: { me: 'Fotografija', en: 'Photograph' },
  no_news_yet: { me: 'Vijesti uskoro stižu.', en: 'News coming soon.' },
  no_projects_yet: { me: 'Projekti uskoro stižu.', en: 'Projects coming soon.' },
  no_archive_yet: { me: 'Arhiva je za sada prazna.', en: 'The archive is currently empty.' },

  back_to_news: { me: '← Sve vijesti', en: '← All news' },
  back_to_projects: { me: '← Svi projekti', en: '← All projects' },
  related_project: { me: 'Povezan projekat', en: 'Related project' },
  donor_label: { me: 'Podržava', en: 'Supported by' },
  period_label: { me: 'Period', en: 'Period' },
  documents_heading: { me: 'Dokumenti', en: 'Documents' },
  gallery_heading: { me: 'Galerija', en: 'Gallery' },

  about_page_title: { me: 'O nama', en: 'About us' },
  contact_page_title: { me: 'Kontakt', en: 'Contact' },
  contact_page_lead: {
    me: 'Javite nam se telefonom, e-poštom ili preko forme. Adresa naših prostorija nije javna iz sigurnosnih razloga.',
    en: 'Reach us by phone, email or through the form below. For safety reasons, the address of our premises is not public.',
  },

  address_note: {
    me: 'Iz sigurnosnih razloga adresa naših prostorija nije javna. Kontakt ostvarujete telefonom ili e-poštom.',
    en: 'For safety reasons, the address of our premises is not public. Please contact us by phone or email.',
  },
  emergency_footer_note: {
    me: 'U slučaju neposredne opasnosti pozovite 122.',
    en: 'In case of immediate danger, call 122.',
  },
  footer_org_heading: { me: 'Organizacija', en: 'Organisation' },
  footer_contact_heading: { me: 'Kontakt', en: 'Contact' },

  form_name: { me: 'Ime', en: 'Name' },
  form_email: { me: 'E-pošta', en: 'Email' },
  form_message: { me: 'Poruka', en: 'Message' },
  form_submit: { me: 'Pošalji e-poštom', en: 'Send by email' },
  form_note: {
    me: 'Dugme otvara vaš e-mail program sa već popunjenom porukom — poruka ide direktno na našu e-poštu, ne prolazi kroz naš sajt niti se čuva na serveru. Ne bilježimo vašu IP adresu ni podatke o uređaju.',
    en: 'This button opens your email app with the message pre-filled — it goes straight to our inbox and never passes through or is stored on our site. We do not record your IP address or device information.',
  },
  form_mailto_subject: { me: 'Poruka sa sajta', en: 'Message from the website' },

  not_found_title: { me: 'Stranica nije pronađena', en: 'Page not found' },
  not_found_body: {
    me: 'Stranica koju tražite ne postoji ili je premještena.',
    en: 'The page you are looking for does not exist or has moved.',
  },
  back_home: { me: '← Naslovna', en: '← Home' },
};

export function t(lang, key) {
  const entry = UI[key];
  if (!entry) return key;
  return entry[lang] ?? entry[DEFAULT_LOCALE];
}

export const CATEGORY_LABELS = {
  radionica: { me: 'Radionica', en: 'Workshop' },
  obuka: { me: 'Obuka', en: 'Training' },
  predavanje: { me: 'Predavanje', en: 'Lecture' },
  saopstenje: { me: 'Saopštenje', en: 'Statement' },
  izvjestaj: { me: 'Izvještaj', en: 'Report' },
};

export const STATUS_LABELS = {
  active: { me: 'U toku', en: 'Ongoing' },
  done: { me: 'Završen', en: 'Completed' },
  planned: { me: 'U pripremi', en: 'Planned' },
};

export function categoryLabel(lang, category) {
  return CATEGORY_LABELS[category]?.[lang] ?? category;
}

export function statusLabel(lang, status) {
  return STATUS_LABELS[status]?.[lang] ?? status;
}

export function formatDate(lang, isoDate) {
  if (!isoDate) return '';
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat(lang === 'me' ? 'sr-Latn-ME' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

/** Prefixes a root-relative path with /en for the English site, or strips it for me. */
export function localizePath(path, lang) {
  const clean = path.replace(/^\/en\//, '/').replace(/^\/en$/, '/');
  if (lang === 'en') {
    return clean === '/' ? '/en/' : `/en${clean}`;
  }
  return clean;
}