import { useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Plus, Sparkles, X } from "lucide-react";
import ApertureAccordion from "./ApertureAccordion";
import { Container, FitText, LimeList, LinkedInIcon, LiveDot, Photo, Reveal, RollButton, SectionHeading, XIcon } from "./ui";
import { audiences, brand, comparison, enquiryTypes, faqs, moreFaqs, photos, pipeline, projects, regions, services, workflowSteps } from "@/data/content";
import { href } from "@/lib/router";
import { cn } from "@/utils/cn";

/* ------------------------------------------------------------------ */
/* Backdrop                                                             */
/* ------------------------------------------------------------------ */
export function HeroBackdrop() {
  return (
    <div className="hero-surface" aria-hidden="true">
      <div className="glow animate-drift left-[-12%] top-[-28%] h-[85%] w-[55%] bg-[#9bb9d6]/45" style={{ ["--r" as string]: "-18deg" }} />
      <div className="glow animate-drift-slow left-[34%] top-[-10%] h-[130%] w-[16%] bg-[#1b3f63]/55" style={{ ["--r" as string]: "22deg" }} />
      <div className="glow animate-drift right-[-14%] top-[38%] h-[70%] w-[48%] bg-[#86a8c8]/30" />
      <div className="grid-lines" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#244b70]/60" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Sub-page hero                                                        */
/* ------------------------------------------------------------------ */
export function PageHero({
  word,
  crumb,
  tagline,
  intro,
  art,
  artAlt,
  children,
}: {
  word: string;
  crumb: string;
  tagline: string;
  intro: ReactNode;
  art?: string;
  artAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden text-white">
      <HeroBackdrop />
      <Container className="relative pb-16 pt-[118px] lg:pb-24">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}>
          <FitText text={word} className="tracking-[-0.035em]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="mt-6 flex items-center gap-4 text-[12px] text-white/85 sm:text-[13px]"
        >
          <span className="shrink-0">{tagline}</span>
          <span className="hairline-fade min-w-8 flex-1" />
          <span className="flex shrink-0 items-center gap-2">
            GENX <Sparkles className="size-3.5 text-lime" strokeWidth={1.5} /> {crumb}
          </span>
        </motion.div>

        <div className="mt-14 grid items-end gap-12 lg:mt-20 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="lg:col-span-6"
          >
            <div className="max-w-xl text-[clamp(1.35rem,2.1vw,1.9rem)] leading-[1.3] tracking-[-0.015em] text-white/95">{intro}</div>
            {children ? <div className="mt-8 flex flex-wrap gap-3">{children}</div> : null}
          </motion.div>
          {art ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1.3, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative flex justify-center lg:col-span-6 lg:justify-end"
            >
              <div className="absolute bottom-0 right-[10%] h-24 w-[60%] rounded-[50%] bg-[#0f2a44]/40 blur-2xl" />
              <img
                src={art}
                alt={artAlt || ""}
                className="relative h-[min(78vw,440px)] w-[min(78vw,440px)] animate-float object-contain drop-shadow-[0_40px_60px_rgba(10,30,55,0.45)]"
              />
            </motion.div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Services accordion                                                   */
/* ------------------------------------------------------------------ */
export function ServicesAccordionSection({ id = "services", compactHeading = false }: { id?: string; compactHeading?: boolean }) {
  const items = services.map((s) => ({
    title: s.title,
    description: s.short,
    tone: s.tone,
    image: s.art,
    imageAlt: `${s.name} — porcelain sculpture`,
    tags: s.tags,
    eyebrow: s.code,
    linkLabel: "Explore service",
    href: href("/services", s.id),
  }));
  return (
    <section id={id} className="bg-cream py-24 lg:py-32">
      <Container>
        <div className={cn("mb-14 flex flex-col gap-8 lg:mb-16", !compactHeading && "items-center")}>
          {compactHeading ? (
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <SectionHeading align="left" label="Service lines" title="Seven ways we'll turn data into discovery" className="lg:col-span-7" titleClassName="max-w-[18ch]" />
              <Reveal className="lg:col-span-5">
                <p className="max-w-md text-[15px] leading-[1.7] text-ink/75">
                  Hover or tap a cover to open it. Each planned service combines validated open-source pipelines, AI where it adds value and a
                  scientist who explains the results.
                </p>
              </Reveal>
            </div>
          ) : (
            <SectionHeading
              label="Services"
              title="Genomics & AI Services"
              text="From raw sequencing reads to AI-powered insight — seven planned service lines, built on reproducible pipelines and explained by scientists."
            />
          )}
        </div>
        <Reveal y={40}>
          <ApertureAccordion items={items} initialOpen={1} closedWidth={104} titleSize={36} cardHeight={580} />
        </Reveal>
      </Container>
      <Marquee items={["NGS", "WGS", "WES", "RNA-seq", "AI / ML", "Drug Discovery", "Multi-omics", "HPC", "Cloud"]} />
    </section>
  );
}

export function Marquee({ items, dark = false }: { items: string[]; dark?: boolean }) {
  const row = (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {items.map((t) => (
        <span key={t} className="flex items-center gap-8 whitespace-nowrap">
          {t}
          <span className={cn("size-3 rounded-full", dark ? "bg-lime" : "bg-ink")} />
        </span>
      ))}
    </div>
  );
  return (
    <div className={cn("marquee-mask mt-24 overflow-hidden", dark ? "text-white" : "text-ink")} aria-hidden="true">
      <div className="flex w-max animate-marquee text-[clamp(2.2rem,4.4vw,4rem)] leading-none tracking-[-0.03em]">
        {row}
        {row}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Workflow visualisation                                               */
/* ------------------------------------------------------------------ */
const CYCLE = 8;
export function PipelineViz() {
  const n = pipeline.length;
  return (
    <div className="glass relative overflow-hidden rounded-[18px] px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
      <style>{`
        @keyframes pv-pulse { from { left: -18%; } to { left: 100%; } }
        @keyframes pv-pulse-y { from { top: -18%; } to { top: 100%; } }
        @keyframes pv-node { 0% { background: #C1E55B; color: #0b0d14; transform: scale(1.12); box-shadow: 0 0 0 8px rgba(193,229,91,.18); } 14% { background: rgba(255,255,255,.12); color: #fff; transform: scale(1); box-shadow: 0 0 0 0 rgba(193,229,91,0); } 100% { background: rgba(255,255,255,.12); color: #fff; transform: scale(1); } }
      `}</style>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 text-[12px] text-white/70">
        <span className="flex items-center gap-2">
          <LiveDot /> Planned analysis pipeline — sample to insight
        </span>
        <span className="font-mono text-white/55">nextflow run genx/pipeline -profile hpc,gpu</span>
      </div>

      {/* desktop: horizontal */}
      <div className="relative hidden md:block">
        <div className="absolute left-[7%] right-[7%] top-7 h-px overflow-hidden bg-white/20">
          <span
            className="absolute top-0 h-px w-[18%] bg-gradient-to-r from-transparent via-lime to-transparent"
            style={{ animation: `pv-pulse ${CYCLE}s linear infinite` }}
          />
        </div>
        <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {pipeline.map((p, i) => (
            <li key={p.label} className="flex flex-col items-center text-center">
              <span
                className="relative z-10 flex size-14 items-center justify-center rounded-full border border-white/25 bg-white/12 text-[12px] backdrop-blur"
                style={{ animation: `pv-node ${CYCLE}s linear infinite`, animationDelay: `${(i / (n - 1)) * CYCLE * 0.86 - CYCLE * 0.02}s` }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mt-4 text-[16px] text-white">{p.label}</span>
              <span className="mt-1 text-[12px] text-white/60">{p.meta}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* mobile: vertical */}
      <ol className="relative space-y-5 md:hidden">
        <span className="absolute bottom-7 left-7 top-7 w-px overflow-hidden bg-white/20">
          <span className="absolute left-0 h-[18%] w-px bg-gradient-to-b from-transparent via-lime to-transparent" style={{ animation: `pv-pulse-y ${CYCLE}s linear infinite` }} />
        </span>
        {pipeline.map((p, i) => (
          <li key={p.label} className="relative flex items-center gap-4">
            <span
              className="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/12 text-[12px]"
              style={{ animation: `pv-node ${CYCLE}s linear infinite`, animationDelay: `${(i / (n - 1)) * CYCLE * 0.86 - CYCLE * 0.02}s` }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span>
              <span className="block text-[16px] text-white">{p.label}</span>
              <span className="block text-[12px] text-white/60">{p.meta}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function WorkflowSection({ steps = true }: { steps?: boolean }) {
  return (
    <section className="section-navy overflow-hidden py-24 lg:py-32">
      <Container>
        <SectionHeading
          tone="dark"
          label="Workflow"
          title="Your Journey from Sample to Insight"
          text="A transparent, reproducible path from your biological question to answers you can publish and act on."
        />
        <Reveal className="mt-14 lg:mt-16" y={40}>
          <PipelineViz />
        </Reveal>

        {steps ? (
          <div className="mt-20 space-y-20 lg:mt-28 lg:space-y-28">
            {workflowSteps.map((s, i) => (
              <div key={s.title} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <Reveal className={cn("lg:col-span-6", i % 2 === 1 && "lg:order-2")}>
                  <Photo src={s.image} alt={s.title} className="aspect-[16/11]" />
                </Reveal>
                <Reveal delay={0.1} className="lg:col-span-6">
                  <span className="text-[12px] tracking-[0.06em] text-lime">STEP {String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 max-w-[14ch] text-[clamp(2rem,3.2vw,2.9rem)] leading-[1.08] tracking-[-0.025em]">{s.title}</h3>
                  <p className="mt-4 max-w-md text-[14px] leading-[1.7] text-white/80">{s.text}</p>
                  <div className="mt-6 max-w-md border-t border-white/20 pt-5">
                    <p className="text-[15px] text-white">What's included</p>
                    <LimeList items={s.includes} className="mt-4" itemClassName="text-white/85 text-[13px]" />
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        ) : null}
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Projects accordion                                                   */
/* ------------------------------------------------------------------ */
export function ProjectsSection() {
  const items = projects.map((p) => ({
    title: p.title,
    description: p.description,
    tone: p.tone,
    image: p.art,
    imageAlt: `${p.title} — porcelain sculpture`,
    eyebrow: p.eyebrow,
    tags: p.tags,
    coverColor: "#1e4265",
    linkLabel: "Discuss this project",
    href: href("/contact"),
  }));
  return (
    <section id="projects" className="bg-cream py-24 lg:py-32">
      <Container>
        <div className="mb-14 grid gap-8 lg:mb-16 lg:grid-cols-12 lg:items-end">
          <SectionHeading align="left" label="Proposed projects" title="Research Programmes Rooted in Our Region" className="lg:col-span-7" titleClassName="max-w-[15ch]" />
          <Reveal className="lg:col-span-5">
            <p className="max-w-md text-[15px] leading-[1.7] text-ink/75">
              These flagship programmes are concepts we intend to develop with regional institutions — not completed work. They reflect the
              biology that makes Central India unique: tigers, oranges, cotton, soybean and its people.
            </p>
          </Reveal>
        </div>
        <Reveal y={40}>
          <ApertureAccordion items={items} initialOpen={1} autoplay interval={6} titleSize={38} cardHeight={560} closedWidth={112} />
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Regional presence                                                    */
/* ------------------------------------------------------------------ */
const cities: { name: string; x: number; y: number; state: "MH" | "MP"; hub?: boolean }[] = [
  { name: "Nagpur", x: 417, y: 316, state: "MH", hub: true },
  { name: "Mumbai", x: 69, y: 420, state: "MH" },
  { name: "Pune", x: 124, y: 448, state: "MH" },
  { name: "Nashik", x: 120, y: 374, state: "MH" },
  { name: "Aurangabad", x: 207, y: 380, state: "MH" },
  { name: "Amravati", x: 342, y: 327, state: "MH" },
  { name: "Bhopal", x: 323, y: 209, state: "MP" },
  { name: "Indore", x: 236, y: 236, state: "MP" },
  { name: "Jabalpur", x: 467, y: 213, state: "MP" },
  { name: "Gwalior", x: 366, y: 59, state: "MP" },
];

export function RegionMap() {
  const hub = cities[0];
  return (
    <div className="relative overflow-hidden rounded-[18px] bg-navy p-4 text-white sm:p-6">
      <div className="grid-lines opacity-70" />
      <svg viewBox="0 0 600 500" className="relative w-full" role="img" aria-label="Stylised network map of Nagpur, Maharashtra and Madhya Pradesh">
        <defs>
          <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.2" fill="rgba(255,255,255,.16)" />
          </pattern>
          <radialGradient id="hubGlow">
            <stop offset="0%" stopColor="#C1E55B" stopOpacity=".55" />
            <stop offset="100%" stopColor="#C1E55B" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path d="M150 40 C 260 10, 470 20, 540 90 C 575 150, 545 250, 470 262 C 380 275, 300 260, 230 280 C 160 296, 120 260, 130 200 C 138 140, 90 90, 150 40Z" fill="url(#dots)" stroke="rgba(255,255,255,.18)" strokeDasharray="3 5" />
        <path d="M60 330 C 120 300, 250 300, 330 290 C 420 280, 520 270, 560 320 C 585 360, 520 400, 430 410 C 350 420, 260 470, 170 480 C 100 488, 40 450, 40 400 C 40 370, 45 345, 60 330Z" fill="url(#dots)" stroke="rgba(255,255,255,.18)" strokeDasharray="3 5" />
        <text x="420" y="60" fill="rgba(255,255,255,.55)" fontSize="12" letterSpacing="2">MADHYA PRADESH</text>
        <text x="220" y="470" fill="rgba(255,255,255,.55)" fontSize="12" letterSpacing="2">MAHARASHTRA</text>
        {cities.slice(1).map((c, i) => (
          <motion.line
            key={c.name}
            x1={hub.x}
            y1={hub.y}
            x2={c.x}
            y2={c.y}
            stroke={c.state === "MH" ? "rgba(255,255,255,.45)" : "rgba(193,229,91,.55)"}
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.08, duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
          />
        ))}
        <circle cx={hub.x} cy={hub.y} r="54" fill="url(#hubGlow)">
          <animate attributeName="r" values="40;62;40" dur="3.2s" repeatCount="indefinite" />
        </circle>
        {cities.map((c) => (
          <g key={c.name}>
            <circle cx={c.x} cy={c.y} r={c.hub ? 9 : 4.5} fill={c.hub ? "#C1E55B" : c.state === "MP" ? "#C1E55B" : "#fff"} opacity={c.hub ? 1 : 0.9} />
            {c.hub ? <circle cx={c.x} cy={c.y} r="15" fill="none" stroke="#C1E55B" strokeOpacity=".6" /> : null}
            <text
              x={c.x + (c.hub ? 20 : 9)}
              y={c.y + 4}
              fill={c.hub ? "#fff" : "rgba(255,255,255,.78)"}
              fontSize={c.hub ? 17 : 12}
            >
              {c.name}
            </text>
          </g>
        ))}
      </svg>
      <div className="relative mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 px-1 text-[12px] text-white/70">
        <span className="flex items-center gap-2"><span className="size-2.5 rounded-full bg-lime" /> Proposed hub · Nagpur</span>
        <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-white" /> Maharashtra market</span>
        <span className="flex items-center gap-2"><span className="size-2 rounded-full bg-lime/80" /> Madhya Pradesh market</span>
      </div>
    </div>
  );
}

export function RegionalSection({ className }: { className?: string }) {
  return (
    <section id="regions" className={cn("bg-cream py-24 lg:py-32", className)}>
      <Container>
        <SectionHeading
          label="Regional presence"
          title="Rooted in Central India"
          text="GENX is planned from Nagpur — at the geographic heart of India — to serve researchers across Maharashtra and Madhya Pradesh first."
        />
        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <RegionMap />
          </Reveal>
          <div className="grid gap-4 lg:col-span-6">
            {regions.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.08}>
                <article className="group rounded-[14px] bg-steel p-6 text-white transition-colors duration-500 hover:bg-navy sm:p-7">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-[28px] leading-none tracking-[-0.02em]">{r.name}</h3>
                    <span className="text-[12px] text-lime">{r.role}</span>
                  </div>
                  <p className="mt-3 text-[14px] leading-[1.65] text-white/80">{r.text}</p>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                    {r.points.map((p) => (
                      <span key={p} className="flex items-center gap-2 text-[13px] text-white/90">
                        <span className="size-[6px] rounded-full bg-lime" /> {p}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Audiences (floating cards on navy)                                   */
/* ------------------------------------------------------------------ */
export function AudienceSection() {
  const offsets = ["lg:mt-0", "lg:mt-24", "lg:mt-8", "lg:-mt-10", "lg:mt-14"];
  return (
    <section className="section-navy overflow-hidden py-24 lg:py-32">
      <Container>
        <SectionHeading tone="dark" label="Who we'll serve" title="Built for the People Behind the Science" />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {audiences.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.07} className={offsets[i]}>
              <motion.article
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="flex h-full min-h-[240px] flex-col rounded-[14px] bg-mist p-6 text-ink shadow-[0_30px_60px_-30px_rgba(8,25,45,0.55)]"
              >
                <span className="text-[40px] leading-[0.6] text-lime">“</span>
                <p className="mt-4 text-[14px] leading-[1.65] text-ink/80">{a.text}</p>
                <p className="mt-auto pt-6 text-[15px] text-ink">{a.title}</p>
                <p className="text-[12px] text-ink/55">Target audience</p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Comparison                                                           */
/* ------------------------------------------------------------------ */
export function ComparisonSection({ className }: { className?: string }) {
  return (
    <section className={cn("bg-cream py-24 lg:py-32", className)}>
      <Container>
        <SectionHeading label="Comparison" title="Bioinformatics Should Feel Simple, Not Stressful" titleClassName="max-w-[17ch]" />
        <Reveal className="mx-auto mt-14 max-w-[720px]" y={30}>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-3 pb-5 text-[14px] sm:gap-x-6 sm:text-[15px]">
            <span className="text-right text-ink/45">The old way</span>
            <span className="w-4" />
            <span className="text-ink">The GENX way</span>
          </div>
          <div className="border-t border-ink/10">
            {comparison.map(([oldWay, newWay]) => (
              <div key={oldWay} className="grid grid-cols-[1fr_auto_1fr] items-center gap-x-3 border-b border-ink/10 py-4 sm:gap-x-6 sm:py-5">
                <span className="flex items-center justify-end gap-3 text-right text-[12px] text-ink/50 sm:text-[13px]">
                  {oldWay}
                  <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-[#FFDBD8] text-[#e5484d]">
                    <X className="size-2.5" strokeWidth={3} />
                  </span>
                </span>
                <ArrowRight className="size-3.5 text-ink/30" strokeWidth={1.5} />
                <span className="flex items-center gap-3 text-[12px] text-ink sm:text-[13px]">
                  <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-lime text-ink">
                    <Check className="size-2.5" strokeWidth={3} />
                  </span>
                  {newWay}
                </span>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-10 max-w-md text-center text-[15px] leading-relaxed text-ink">
            Everything you need to turn biological data into discovery — rigorous, reproducible and close to home.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                  */
/* ------------------------------------------------------------------ */
function FaqItem({ who, q, a, defaultOpen = false }: { who?: string; q: string; a: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-ink/12">
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="group w-full py-5 text-left">
        {who ? <span className="block text-[13px] text-steel">{who}</span> : null}
        <span className="mt-1 flex items-center justify-between gap-6">
          <span className="text-[16px] text-ink sm:text-[17px]">{q}</span>
          <span
            className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-full border border-ink/25 text-ink transition-all duration-500 ease-out-soft group-hover:border-ink",
              open && "rotate-45 border-navy bg-navy text-lime",
            )}
          >
            <Plus className="size-3.5" strokeWidth={1.75} />
          </span>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            key="a"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-[60ch] pb-6 text-[14px] leading-[1.7] text-ink/75">{a}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection({ className }: { className?: string }) {
  return (
    <section id="faq" className={cn("bg-cream py-24 lg:py-32", className)}>
      <Container>
        <SectionHeading label="Real questions" title="What Everyone Asks First" titleClassName="max-w-[11ch]" />
        <Reveal className="mx-auto mt-14 max-w-[720px]">
          {faqs.map((f, i) => (
            <FaqItem key={f.q} {...f} defaultOpen={i === 0} />
          ))}
          <h3 className="mt-14 text-[26px] tracking-[-0.02em]">More questions</h3>
          <div className="mt-2">
            {moreFaqs.map((f) => (
              <FaqItem key={f.q} {...f} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CTA                                                                  */
/* ------------------------------------------------------------------ */
export function CTASection({ word = "DISCOVERY", image = photos.datacenter }: { word?: string; image?: string }) {
  return (
    <section className="relative isolate overflow-hidden text-white">
      <HeroBackdrop />
      <Container className="relative py-20 lg:py-28">
        <Reveal y={50}>
          <FitText text={word} className="tracking-[-0.035em]" />
        </Reveal>
        <div className="mt-6 flex items-center gap-4 text-[12px] text-white/85 sm:text-[13px]">
          <span className="shrink-0">Take the first step toward intelligent discovery</span>
          <span className="hairline-fade hidden flex-1 sm:block" />
          <span className="hairline-fade-r hidden flex-1 sm:block" />
          <a href={href("/contact")} className="flex shrink-0 items-center gap-2 transition-colors hover:text-lime">
            Start <Sparkles className="size-3.5 text-lime" strokeWidth={1.5} /> a project
          </a>
        </div>
        <Reveal className="relative mt-10 lg:mt-14" y={40}>
          <Photo src={image} alt="Scientific computing and research" className="aspect-[16/9] sm:aspect-[21/9]" />
          <div className="pointer-events-none absolute inset-0 rounded-[14px] bg-[#275077] opacity-40 mix-blend-color" />
          <div className="pointer-events-none absolute inset-0 rounded-[14px] bg-gradient-to-t from-[#12304d]/55 via-transparent to-transparent" />
          <div className="absolute inset-x-4 bottom-4 flex flex-col items-start justify-between gap-4 rounded-[14px] p-5 sm:inset-x-6 sm:bottom-6 sm:flex-row sm:items-center glass-strong">
            <p className="max-w-lg text-[15px] leading-snug text-white sm:text-[17px]">
              Have sequencing data, a research question or a partnership idea? Let's shape it together.
            </p>
            <RollButton href={href("/contact")} icon>
              Start a Project
            </RollButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Contact split                                                        */
/* ------------------------------------------------------------------ */
export function ContactSplit() {
  const [form, setForm] = useState({ name: "", email: "", org: "", type: enquiryTypes[0].title, message: "" });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next = { name: !form.name.trim(), email: !/^\S+@\S+\.\S+$/.test(form.email), message: !form.message.trim() };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;
    const body = `Name: ${form.name}\nEmail: ${form.email}\nOrganisation: ${form.org || "—"}\nEnquiry type: ${form.type}\n\n${form.message}`;
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(`[GENX] ${form.type} — ${form.name}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field = "w-full border-b bg-transparent py-3 text-[15px] text-ink placeholder:text-ink/40 focus:outline-none transition-colors";

  return (
    <section id="contact" className="border-t border-ink/10 bg-cream">
      <Container className="grid lg:grid-cols-2">
        <div className="border-ink/10 py-16 lg:border-r lg:py-24 lg:pr-12">
          <Reveal>
            <h2 className="text-[clamp(2.4rem,4vw,3.5rem)] leading-none tracking-[-0.03em]">Contact</h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-16 lg:mt-24">
            <p className="flex items-center gap-3 text-[12px] text-ink">
              <span className="size-1.5 rounded-full bg-ink" /> Information
            </p>
            <ul className="mt-4">
              <li className="border-b border-ink/12 py-4 text-[16px]">{brand.location}</li>
              <li className="border-b border-ink/12 py-4 text-[16px]">
                <a href={`mailto:${brand.email}`} className="transition-colors hover:text-steel">
                  {brand.email}
                </a>
              </li>
              <li className="flex items-center justify-between border-b border-ink/12 py-4 text-[16px]">
                <span>LinkedIn, X</span>
                <span className="flex items-center gap-2 text-ink/50">
                  <LinkedInIcon className="size-3.5" />
                  <XIcon className="size-3.5" />
                  <span className="text-[12px]">coming soon</span>
                </span>
              </li>
            </ul>
            <p className="mt-8 max-w-sm text-[13px] leading-relaxed text-ink/60">
              Serving {brand.regions.join(" · ")}. GENX is a proposed startup — we'll respond to every enquiry personally as we build.
            </p>
          </Reveal>
        </div>

        <div className="border-t border-ink/10 py-16 lg:border-t-0 lg:py-24 lg:pl-12">
          <Reveal>
            <h2 className="text-[clamp(2.4rem,4vw,3.5rem)] leading-none tracking-[-0.03em]">Get in Touch!</h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-16 lg:mt-24">
            {sent ? (
              <div className="rounded-[14px] bg-navy p-8 text-white">
                <p className="text-[24px] leading-tight tracking-[-0.02em]">Thank you, {form.name.split(" ")[0]}.</p>
                <p className="mt-3 text-[14px] leading-relaxed text-white/80">
                  Your email app should open with your message ready to send. If it didn't, write to us directly at{" "}
                  <a className="text-lime underline-offset-4 hover:underline" href={`mailto:${brand.email}`}>
                    {brand.email}
                  </a>
                  .
                </p>
                <button type="button" onClick={() => setSent(false)} className="mt-6 text-[13px] text-lime">
                  ← Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <p className="flex items-center gap-3 text-[12px] text-ink">
                  <span className="size-1.5 rounded-full bg-ink" /> Compose the future with us
                </p>
                <div className="mt-4 flex flex-wrap gap-2" role="radiogroup" aria-label="Enquiry type">
                  {enquiryTypes.map((t) => (
                    <button
                      key={t.key}
                      type="button"
                      role="radio"
                      aria-checked={form.type === t.title}
                      onClick={() => setForm((f) => ({ ...f, type: t.title }))}
                      className={cn(
                        "rounded-full border px-3.5 py-2 text-[13px] transition-colors duration-300",
                        form.type === t.title ? "border-navy bg-navy text-white" : "border-ink/15 text-ink/70 hover:border-ink/40",
                      )}
                    >
                      {t.title}
                    </button>
                  ))}
                </div>
                <div className="mt-4 space-y-1">
                  <input aria-label="Name" placeholder="Name*" value={form.name} onChange={set("name")} className={cn(field, errors.name ? "border-[#e5484d]" : "border-ink/15 focus:border-navy")} />
                  <input aria-label="Email" type="email" placeholder="Email*" value={form.email} onChange={set("email")} className={cn(field, errors.email ? "border-[#e5484d]" : "border-ink/15 focus:border-navy")} />
                  <input aria-label="Organisation" placeholder="Organisation / Institution" value={form.org} onChange={set("org")} className={cn(field, "border-ink/15 focus:border-navy")} />
                  <textarea aria-label="Message" placeholder="Tell us about your project, data or idea*" rows={3} value={form.message} onChange={set("message")} className={cn(field, "resize-none", errors.message ? "border-[#e5484d]" : "border-ink/15 focus:border-navy")} />
                </div>
                {Object.values(errors).some(Boolean) ? <p className="mt-3 text-[12px] text-[#e5484d]">Please complete the required fields.</p> : null}
                <p className="mt-6 flex items-start gap-3 text-[12px] leading-relaxed text-ink/80">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-ink" /> By submitting this form you agree to be contacted about your
                  enquiry. We never share your details.
                </p>
                <RollButton type="submit" variant="navy" size="lg" className="mt-8 w-full">
                  Send Enquiry
                </RollButton>
              </form>
            )}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

