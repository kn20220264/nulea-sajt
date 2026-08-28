# Sanity šeme — struktura sadržaja

Dvojezičnost je riješena **polje po polje**: svaki tekst ima `.me` i `.en` varijantu
u istoj formi. Urednica ne može objaviti dokument bez oba jezika (validacija).

Ovaj sajt (Astro frontend) čita sadržaj iz projekta `nulea`, dataset `production`,
preko javnog (bez tokena) CDN čitanja. Studio se održava odvojeno od ovog repozitorijuma.

---

## 1. Lokalizovani tipovi (pomoćni)

```js
// localeString.js
export default {
  name: 'localeString',
  title: 'Tekst',
  type: 'object',
  fields: [
    {name: 'me', title: 'Crnogorski', type: 'string', validation: R => R.required()},
    {name: 'en', title: 'Engleski',   type: 'string', validation: R => R.required()}
  ]
}

// localeText.js — isto, samo type: 'text'
// localeBlock.js — isto, samo type: 'array' of block (rich text editor)
```

---

## 2. Vijest (`news`)

| Polje | Tip | Napomena |
|---|---|---|
| `title` | localeString | naslov (`title.me` / `title.en`) |
| `slug` | slug | generiše se iz crnogorskog naslova (`title.me`) |
| `category` | string (lista) | `radionica`, `obuka`, `predavanje`, `saopstenje` (natpis: „Medijsko predstavljanje“), `izvjestaj` (natpis: „Ostalo“), `projekat`, `konferencija`, `akcija` — frontend prihvata i nove vrijednosti `medijsko-predstavljanje` / `ostalo` |
| `publishedAt` | datetime | može se unijeti unazad |
| `excerpt` | localeText | sažetak za listu, max **220** znakova |
| `coverImage` | image | `options: {hotspot: true}` + `altMe`/`altEn` (obavezni, lokalizovani alt) |
| `body` | localeBlock | puni tekst, rich editor |
| `gallery` | array of image | opciono, svaka slika sa `alt` (ili `altMe`/`altEn`); prikazuje se ispod teksta vijesti |
| `relatedProject` | reference → `project` | opciono, povezuje vijest sa projektom |

Frontend prevodi vrijednost `category` u čitljiv naziv (CG/EN) preko svog rječnika
(`src/lib/i18n.js` → `CATEGORY_LABELS`) — u Studiju ostaje prost string, ne treba
poseban `category` dokument.

**Napomena o poljima:** postojeći `title`/`excerpt` su već lokalizovani objekti
(`{me, en}`) — frontend karusel "Šta gradimo" koristi ova ista polja, ne
nova `naslovMe`/`sazetakMe` itd., da se izbjegne duplirenje sadržaja. Karusel
trenutno prikazuje **posljednjih 5 vijesti** bez posebnog filtera (nema više
`istaknuto` polja — uklonjeno na zahtjev, nije bilo potrebno).

**Opciono, za kasnije (nije urađeno u Studiju):** `coverImage.hotspot` bi bio
koristan jer trougaoni isječak (`clip-path`) siječe donje uglove slike u
karuselu — bez hotspot-a slika se centrirano kadrira i lice može biti
odsječeno kod određenih fotografija. Isto tako `altMe`/`altEn` bi zamijenili
postojeći prost `alt` sa lokalizovanim alt tekstom. Studio se održava u
posebnom repozitorijumu — ovo su samo prijedlozi za kad zatreba, frontend
radi i bez njih (koristi centriran kadar i postojeći `alt`).

---

## 3. Projekat (`project`)

| Polje | Tip | Napomena |
|---|---|---|
| `title` | localeString | naziv projekta |
| `slug` | slug | |
| `status` | string (lista) | `active` / `done` / `planned` |
| `startDate` | date | |
| `endDate` | date | prazno ako traje |
| `donor` | localeString | finansijer |
| `summary` | localeText | kratak opis za listu |
| `body` | localeBlock | puni opis |
| `coverImage` | image | `options: {hotspot: true}` + opcioni lokalizovani alt (`altMe`/`altEn`, kao kod vijesti); postojeći prost `alt` se ne uklanja |
| `gallery` | array of image | opciono, svaka slika sa `alt` |
| `documents` | array of file | PDF izvještaji |

**Za stare projekte:** unesu se isto kao novi — samo `status: done` i pravi
`startDate` / `endDate`. Stranica /projekti/ prikazuje sve projekte u jednoj
mreži (najnoviji prvi), a status se vidi na samoj kartici i preko filtera —
ne treba nikakva izmjena koda.

**Napomena (Studio u posebnom repou):** ako `coverImage` na projektu još nema
`hotspot: true` i `altMe`/`altEn`, dodati ih — frontend već čita ta polja sa
fallback-om (`altMe`/`altEn` → `alt` → naslov projekta), pa radi i bez izmjene.
Kartica bez slike dobija rezervni prikaz sa logotipom, ništa se ne lomi.

---

## 4. Globalna podešavanja (`siteSettings`)

Jedan jedini dokument koji urednica mijenja kad se nešto promijeni:

| Polje | Tip |
|---|---|
| `sosNumber` | string |
| `sosNote` | localeString |
| `email` | string |
| `emergencyNote` | localeString |
| `quickExitUrl` | url |

Ovim se SOS broj mijenja na cijelom sajtu iz jednog mjesta,
bez diranja koda. `quickExitUrl` je odredište za dugme "Brzi izlaz" i Esc taster —
treba da bude neutralan sajt (npr. vremenska prognoza), nikad prazno polje.

---

## 5. Stranica "O nama" (`aboutPage`) — singleton

Jedan jedini dokument (kao `siteSettings`). Frontend čita svako polje kroz
opcioni lanac (`?.`) sa fallback tekstom u kodu — stranica radi i dok je
dokument prazan ili ne postoji, ništa se ne lomi.

| Polje | Tip | Napomena |
|---|---|---|
| `heroEyebrow` | localeString | mala oznaka iznad naslova ("O nama") |
| `heroTitle` | localeString | veliki naslov (H1) |
| `heroIntro` | localeBlock | uvodni pasus — **bold fraze se označavaju u editoru** (zato je rich text, ne prost tekst) |
| `heroCta` | localeString | tekst dugmeta (vodi na /kontakt/) |
| `heroImage` | image | izrezana fotografija (PNG bez pozadine) + `altMe`/`altEn` |
| `missionLabel` | localeString | oznaka "Misija" |
| `missionText` | localeText | iskaz misije (prikazuje se velikim kondenzovanim slovima) |
| `visionLabel` | localeString | oznaka "Cilj" |
| `visionText` | localeText | iskaz cilja |
| `valuesLabel` | localeString | oznaka "Naše vrijednosti" |
| `values` | array (max 4) | svaka stavka: `icon` (image, opciono — bez nje frontend koristi ugrađenu ikonicu), `title` (localeString), `description` (localeText) |
| `bigWord` | localeString | **džinovska riječ u pozadini tamnog panela** — čisto dekorativna, urednica je može promijeniti (npr. "Glasan otpor") |
| `panelImage` | image | fotografija uz dno tamnog panela (dobija ljubičasti duotone kroz CSS) + `altMe`/`altEn` |
| `whatWeDoTitle` | localeString | naslov treće sekcije |
| `whatWeDoIntro` | localeText | uvodni pasus (~55 riječi) |
| `whatWeDoLead` | localeBlock | kratak pasus — prva rečenica bold |
| `cards` | array (4) | svaka: `title` (localeString), `description` (localeText) |
| `cutoutImageOne` | image | "naljepnica" gore desno + `altMe`/`altEn` |
| `cutoutImageTwo` | image | "naljepnica" dolje lijevo + `altMe`/`altEn` |
| `ctaHeading` | localeString | naslov završne CTA trake |

**Kod za Studio repo** (copy-paste, prati postojeći `localeString`/`localeText`/`localeBlock` šablon):

```js
// aboutPage.js
const localizedImage = (name, title) => ({
  name, title, type: 'image',
  fields: [
    {name: 'altMe', title: 'Alt (CG)', type: 'string', validation: R => R.required()},
    {name: 'altEn', title: 'Alt (EN)', type: 'string', validation: R => R.required()},
  ],
});

export default {
  name: 'aboutPage',
  title: 'Stranica: O nama',
  type: 'document',
  // singleton — vidi desk structure ispod
  fields: [
    {name: 'heroEyebrow', title: 'Hero — mala oznaka', type: 'localeString'},
    {name: 'heroTitle', title: 'Hero — naslov', type: 'localeString'},
    {name: 'heroIntro', title: 'Hero — uvod (bold fraze u editoru)', type: 'localeBlock'},
    {name: 'heroCta', title: 'Hero — tekst dugmeta', type: 'localeString'},
    localizedImage('heroImage', 'Hero — izrezana fotografija (PNG bez pozadine)'),
    {name: 'missionLabel', title: 'Misija — oznaka', type: 'localeString'},
    {name: 'missionText', title: 'Misija — iskaz', type: 'localeText'},
    {name: 'visionLabel', title: 'Vizija — oznaka', type: 'localeString'},
    {name: 'visionText', title: 'Vizija — iskaz', type: 'localeText'},
    {name: 'valuesLabel', title: 'Vrijednosti — oznaka', type: 'localeString'},
    {name: 'values', title: 'Vrijednosti (4)', type: 'array', validation: R => R.max(4),
     of: [{type: 'object', fields: [
       {name: 'icon', title: 'Ikonica (opciono)', type: 'image'},
       {name: 'title', title: 'Naziv', type: 'localeString'},
       {name: 'description', title: 'Opis (2 reda)', type: 'localeText'},
     ]}]},
    {name: 'bigWord', title: 'Džinovska riječ (pozadina tamnog panela)', type: 'localeString'},
    localizedImage('panelImage', 'Fotografija tamnog panela (uz dno)'),
    {name: 'whatWeDoTitle', title: 'Šta radimo — naslov', type: 'localeString'},
    {name: 'whatWeDoIntro', title: 'Šta radimo — uvod', type: 'localeText'},
    {name: 'whatWeDoLead', title: 'Šta radimo — kratak pasus (prva rečenica bold)', type: 'localeBlock'},
    {name: 'cards', title: 'Kartice (4)', type: 'array', validation: R => R.max(4),
     of: [{type: 'object', fields: [
       {name: 'title', title: 'Naslov', type: 'localeString'},
       {name: 'description', title: 'Opis', type: 'localeText'},
     ]}]},
    localizedImage('cutoutImageOne', 'Naljepnica — gore desno'),
    localizedImage('cutoutImageTwo', 'Naljepnica — dolje lijevo'),
    {name: 'ctaHeading', title: 'CTA — naslov', type: 'localeString'},
  ],
};
```

```js
// deskStructure.js — registracija singletona (isti šablon kao siteSettings)
S.listItem()
  .title('Stranica: O nama')
  .child(S.document().schemaType('aboutPage').documentId('aboutPage'))
```

**Sigurnosna napomena za urednicu:** ni u jedno polje ove stranice (uključujući
alt tekstove) ne unosi se adresa prostorija — vidi "Šta se NE unosi nigdje".

---

## 6. Publikacija (`publication`)

Stranica /publikacije/ prikazuje sve publikacije kao listu redova (datum,
sličica, naziv, opis, strelica za preuzimanje), najnovije prve. Klik na red
otvara PDF sa Sanity CDN-a (`?dl=` parametar pokreće preuzimanje sa
originalnim imenom fajla). Publikacija bez PDF-a se prikazuje, ali nije link;
bez naslovne slike dobija rezervni prikaz sa logotipom — ništa se ne lomi.

**Stvarna šema u Studiju** (provjereno direktno u datasetu 9. 8. 2026 —
imena polja se razlikuju od prvobitnog prijedloga; frontend upit u
`src/lib/queries.js` prati OVA imena):

| Polje | Tip | Napomena |
|---|---|---|
| `title` | localeString | naziv publikacije |
| `slug` | slug | postoji u šemi; frontend ga trenutno ne koristi (nema detaljne stranice) |
| `category` | string (lista) | npr. `prirucnik`; frontend ga trenutno ne prikazuje |
| `publishedAt` | date | datum objave — po njemu se sortira (najnovije prve) |
| `description` | localeText | kratak opis za listu |
| `coverImage` | image | naslovna slika sa prostim `alt` poljem; bez nje red dobija rezervni prikaz sa logotipom |
| `fileMe` | file | PDF (CG), glavni dokument |
| `fileEn` | file | opciono — ako postoji, EN stranica nudi njega, inače pada na `fileMe` |
| `relatedProject` | reference → `project` | opciono; frontend ga trenutno ne koristi |

**Važno:** svaka izmjena imena polja u Studiju mora se ispratiti u
`getAllPublications()` u `src/lib/queries.js` — GROQ za nepostojeće polje
tiho vrati `null` (nema greške), pa link/slika jednostavno nestanu.

---

## 7. Izvještaj (`report`)

Stranice /izvjestaji/ (CG) i /en/reports/ (EN) prikazuju gustu listu
grupisanu po godini, najnovije prve. Red bez PDF-a prikazuje "Uskoro"
umjesto linka — ništa se ne lomi.

**Stvarna šema u Studiju** (provjereno direktno u datasetu 9. 8. 2026;
frontend upit `getAllReports()` prati OVA imena — tip je `report`,
ne `izvjestaji`):

| Polje | Tip | Napomena |
|---|---|---|
| `title` | localeString | naziv izvještaja |
| `type` | string (lista) | npr. `godisnji-izvjestaj`; frontend prevodi preko `REPORT_TYPE_LABELS` u `src/lib/i18n.js` — nova vrijednost u Studiju traži i novu stavku u tom rječniku |
| `year` | number | godina — po njoj se sortira i grupiše |
| `publishedAt` | date | |
| `file` | file | PDF |

**OBAVEZNA BEZBJEDNOSNA DOPUNA U STUDIJU** — izvještaji (posebno
finansijski) rutinski sadrže registrovanu adresu organizacije, a Sanity u
URL-u za preuzimanje izlaže i originalno ime fajla. U `report` šemu dodati:

```js
// 1. Upozorenje urednici na samom polju fajla:
{
  name: 'file', title: 'PDF dokument', type: 'file',
  description:
    'PRIJE OTPREMANJA OBAVEZNO: provjeriti da dokument NE sadrži adresu ' +
    'prostorija ili skloništa, i očistiti PDF metapodatke (autor, lokacija, ' +
    'naziv fajla — ime fajla je javno vidljivo u linku za preuzimanje).',
},

// 2. Obavezna potvrda — dokument se ne može objaviti bez štikliranja:
{
  name: 'safetyChecked',
  title: 'Potvrđujem da je dokument provjeren: ne sadrži adresu i PDF metapodaci su očišćeni',
  type: 'boolean',
  validation: (R) =>
    R.custom((v) =>
      v === true
        ? true
        : 'Izvještaj se ne može objaviti dok se ne potvrdi bezbjednosna provjera dokumenta.'
    ),
},
```

Frontend namjerno NE filtrira po `safetyChecked` (validacija u Studiju je
brana pri objavi) — postojeći dokumenti objavljeni prije dodavanja polja
ostaju vidljivi.

---

## Šta se NE unosi nigdje

- adresa skloništa
- adresa kancelarije
- mapa
- bilo kakva geo-lokacija u meta podacima ili EXIF podacima fotografija

**Napomena:** fotografije sa telefona nose EXIF podatke o lokaciji. Frontend
sve slike učitava kroz Sanity-jev CDN image builder (`urlFor()`), koji
re-enkodira sliku i pritom skida EXIF/GPS metapodatke — ali originalni fajl
koji se otpremi u Sanity ipak ostaje sačuvan u asset store-u onakav kakav je.
Zato je i dalje obavezno skinuti EXIF/GPS sa telefonskih fotografija **prije**
otpremanja u Sanity (npr. kroz opciju "Remove location info" pri dijeljenju
fotografije, ili alat za čišćenje metapodataka).

---

## Napomena za deploy

Astro frontend u ovom repozitorijumu očekuje da `production` dataset u
projektu `nulea` bude **javan za čitanje** (bez API tokena). Ako je dataset
privatan, build na Netlify-ju neće moći da povuče sadržaj — u tom slučaju
treba ili otvoriti čitanje dataseta (Studio → API → Datasets), ili proslijediti
`SANITY_READ_TOKEN` kao Netlify env varijablu i dodati ga u
`src/lib/sanity.js`.
