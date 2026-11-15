# GENX.COM — Website

**Bio Science · AI · Computation**
*Biological data. Intelligent discovery.*

Marketing website for **GENX**, a *proposed* AI-driven bioinformatics and computational biology startup based in Nagpur, serving Maharashtra and Madhya Pradesh.

> **Honesty note:** the site deliberately presents GENX as a proposed startup. Services, infrastructure, certifications and projects are described as *planned*. Please keep that framing until they are genuinely operational.

---

## Pages

| Route | Page | Highlights |
| --- | --- | --- |
| `#/` | Home | DNA/chromosome hero, about, why GENX, **services accordion**, workflow visualisation, **proposed projects accordion**, regional presence map, audiences, comparison, FAQ, CTA, contact |
| `#/services` | Services | NGS, WGS, WES, RNA-seq, AI/ML, drug discovery, multi-omics: accordion, full catalogue, engagement models |
| `#/technology` | Technology | HPC, GPU, cloud, Linux, pipelines, databases, layered AI architecture, security roadmap |
| `#/about` | About Us | Who we are, current status, vision, mission, regional strategy roadmap, objectives, values, planned roles |
| `#/contact` | Contact | Project enquiries, institutional partnerships, business collaborations, form, FAQ |

Hash routing (`#/services`) means the site works on any static host **and** straight from your disk (`file://`) with no server configuration.

---

## Run it on your MacBook

1. Install **Node.js 20 LTS** (or newer) from <https://nodejs.org> (or `brew install node`).
2. Unzip `genx-website.zip` and open **Terminal** in the folder:
   ```bash
   cd ~/Downloads/genx-website
   npm install
   npm run dev
   ```
3. Open <http://localhost:5173>.

**Quick preview without installing anything:** open `dist/index.html` by double-clicking it. The build is one self-contained file. Stock photos load from the Pexels CDN, so they need an internet connection.

## Build for production

```bash
npm run build      # outputs dist/index.html (single self-contained file)
npm run preview    # serves the production build locally
```

## Publish under genx.com

Any static host works. Upload the `dist/` folder:

- **Netlify:** drag-and-drop `dist/` on <https://app.netlify.com/drop>, then *Domain settings → Add custom domain → genx.com*.
- **Vercel / Cloudflare Pages:** import the project. Build command: `npm run build`, output directory: `dist`.
- **Any cPanel / shared hosting:** upload `dist/index.html` to `public_html/`.

Then point your domain's DNS (an A record or CNAME) to the host as instructed by them.

---

## Editing content

Almost all copy lives in **`src/data/content.ts`**: services, projects, workflow, regions, FAQs, technology stack, objectives, roles and contact details (`brand.email`, currently `hello@genx.com`). Update it and the whole site follows.

| What | Where |
| --- | --- |
| Colours & fonts | `src/index.css` (`@theme` block) |
| Navigation & footer | `src/components/layout.tsx` |
| Shared sections | `src/components/sections.tsx` |
| Accordion animation | `src/components/ApertureAccordion.tsx` |
| Pages | `src/pages/*.tsx` |

### Design system (matched to the reference)

- Navy `#275077` · Steel `#4C7091` · Lime `#C1E55B` · Cream `#F9F7F1` · Olive `#39442B`
- Large regular-weight headings, `[ LABEL ]` pills, glass surfaces, text-roll buttons, oversized display words.

### Fonts

The reference design uses **Neue Montreal** (Pangram Pangram, a commercial font). The site bundles **Hanken Grotesk** (free, OFL) as a close match. To use the original, buy a licence for *PP Neue Montreal* and add its `@font-face` rules to `src/index.css`. It is already first in the font stack.

### Accordion animation

`ApertureAccordion.tsx` is a React + `motion` re-implementation of the Framer **Aperture / Alloy Accordion** interaction (original Framer component by Matthias Ölschlegel). It includes:

- Spring geometry
- Vertical spines
- Artwork that travels from the spine into the opening pane
- Hover-intent opening
- An optional autoplay progress ring
- Keyboard navigation
- A stacked mobile layout

### Images

- **Sculptures** (`src/assets/art/*.webp`): custom AI-generated porcelain artwork made for this project.
- **Photos:** free stock photography from Pexels, loaded by URL. Replace them with your own team and lab photos when available.

### Contact form

The form opens the visitor's email app with a pre-filled message (`mailto:`), so no server is needed. For a hosted inbox, connect it to Formspree, Netlify Forms or your own API.
