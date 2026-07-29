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
| `title` | localeString | naslov |
| `slug` | slug | generiše se iz crnogorskog naslova |
| `category` | string (lista) | jedna od: `radionica`, `obuka`, `predavanje`, `saopstenje`, `izvjestaj` |
| `publishedAt` | datetime | može se unijeti unazad |
| `excerpt` | localeText | sažetak za listu, max 200 znakova |
| `coverImage` | image | sa `alt` tekstom, obavezno |
| `body` | localeBlock | puni tekst, rich editor |
| `relatedProject` | reference → `project` | opciono, povezuje vijest sa projektom |

Frontend prevodi vrijednost `category` u čitljiv naziv (CG/EN) preko svog rječnika
(`src/lib/i18n.js` → `CATEGORY_LABELS`) — u Studiju ostaje prost string, ne treba
poseban `category` dokument.

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
| `coverImage` | image | sa `alt` tekstom |
| `gallery` | array of image | opciono, svaka slika sa `alt` |
| `documents` | array of file | PDF izvještaji |

**Za stare projekte:** unesu se isto kao novi — samo `status: done` i pravi
`startDate` / `endDate`. Sajt ih automatski razvrsta u arhivu, ne treba
nikakva izmjena koda.

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
