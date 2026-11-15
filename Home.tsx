import { motion } from "motion/react";
import { Cloud, Cpu, Dna, FlaskConical, Layers, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import { art, brand, photos } from "@/data/content";
import { href } from "@/lib/router";
import { Container, FitText, LiveDot, Photo, Reveal, RollButton, SectionHeading } from "@/components/ui";
import {
  AudienceSection,
  CTASection,
  ComparisonSection,
  ContactSplit,
  FAQSection,
  HeroBackdrop,
  ProjectsSection,
  RegionalSection,
  ServicesAccordionSection,
  WorkflowSection,
} from "@/components/sections";

const ease = [0.2, 0.8, 0.2, 1] as const;

function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden text-white lg:min-h-[max(100svh,800px)]">
      <HeroBackdrop />
      <Container className="relative flex flex-1 flex-col pb-14 pt-[104px] lg:pb-16 lg:pt-[112px]">
        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease }} className="relative z-0 font-normal">
          <span className="sr-only">GENX — Bio Science, AI and Computation. Biological data. Intelligent discovery.</span>
          <span aria-hidden="true">
            <FitText text="BIO SCIENCE" className="tracking-[-0.035em]" />
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="relative z-0 mt-5 flex items-center gap-4 text-[12px] text-white/90 sm:text-[13px]"
        >
          <span className="shrink-0">{brand.tagline}</span>
          <span className="hairline-fade min-w-6 flex-1" />
          <span className="flex shrink-0 items-center gap-2">
            AI <Sparkles className="size-3.5 text-lime" strokeWidth={1.5} /> Computation
          </span>
        </motion.div>

        {/* Sculpture — the X-shaped chromosome, the "X" in GENX */}
        <div className="pointer-events-none relative z-10 mx-auto mt-4 w-[min(92vw,520px)] lg:absolute lg:left-[69%] lg:top-[3.2vw] lg:mt-0 lg:w-[min(36vw,560px)] lg:-translate-x-1/2">
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9, rotate: -6 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            transition={{ delay: 0.25, duration: 1.6, ease }}
          >
            <img
              src={art.chromosome}
              alt="Porcelain sculpture of an X-shaped chromosome"
              className="block w-full animate-float drop-shadow-[0_50px_60px_rgba(8,26,48,0.5)]"
            />
          </motion.div>
        </div>

        <div className="relative z-20 mt-6 grid items-end gap-12 lg:mt-auto lg:grid-cols-12 lg:gap-6 lg:pt-24">
          {/* left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.9, ease }}
            className="order-2 flex flex-col items-start lg:order-1 lg:col-span-3"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[Dna, Cpu, Cloud, Layers].map((Icon, i) => (
                  <span key={i} className="flex size-9 items-center justify-center rounded-full border-2 border-[#2d5a85] bg-cream text-navy">
                    <Icon className="size-4" strokeWidth={1.6} />
                  </span>
                ))}
              </div>
              <span className="text-[13px] text-white/90">7 planned services</span>
            </div>
            <span className="relative ml-[70px] mt-3 h-12 w-px bg-white/45">
              <span className="absolute -left-[3px] top-0 size-[7px] rounded-full bg-white" />
            </span>
            <span className="glass mt-3 rounded-full px-5 py-3 text-[14px] text-white">AI-driven bioinformatics.</span>
          </motion.div>

          {/* centre card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 1, ease }}
            className="relative order-1 pt-5 lg:order-2 lg:col-span-4 lg:col-start-4 lg:pt-0"
          >
            <div className="absolute left-8 top-0 z-10 -translate-y-1/2 lg:left-[18%] lg:top-0">
              <RollButton href={href("/", "services")} size="sm" className="h-10 px-5 text-[14px]">
                Explore Services
              </RollButton>
            </div>
            <div className="glass flex gap-4 rounded-[14px] p-2.5 pr-4">
              <img src={photos.pipette} alt="Scientist pipetting DNA samples" className="aspect-[4/4.4] w-[38%] shrink-0 rounded-[10px] object-cover" />
              <div className="flex min-w-0 flex-col justify-center py-2">
                <span className="text-[10px] uppercase tracking-[0.08em] text-lime">Pipeline preview · Proposed</span>
                <span className="mt-2 text-[34px] leading-none tracking-[-0.02em]">30×</span>
                <span className="mt-1 text-[11px] text-white/80">Target human WGS coverage</span>
                <span className="mt-4 text-[13px] text-white">FASTQ → annotated VCF</span>
                <span className="my-2 h-px w-10 bg-white/40" />
                <span className="text-[10px] uppercase tracking-[0.07em] text-white/75">GRCh38 · GATK best practices</span>
              </div>
            </div>
          </motion.div>

          {/* right */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.9, ease }}
            className="order-3 flex flex-col items-start lg:col-span-3 lg:col-start-10 lg:items-center lg:text-center"
          >
            <p className="max-w-[16ch] text-[19px] leading-[1.35] text-white">Built for researchers across Central India</p>
            <span className="relative my-4 h-10 w-px bg-white/45 lg:mx-auto">
              <span className="absolute -left-[3px] bottom-0 size-[7px] rounded-full bg-white" />
            </span>
            <p className="flex items-center gap-2 text-[12px] text-white/75">
              <MapPin className="size-3.5 text-lime" strokeWidth={1.5} />
              {brand.regions.join(" · ")}
            </p>
            <a href={href("/about")} className="mt-6 text-[13px] text-lime underline-offset-4 hover:underline">
              Learn More
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

function AboutIntro() {
  const stats = [
    { n: "07", l: "Planned service lines" },
    { n: "03", l: "Focus regions" },
    { n: "01", l: "Integrated AI platform" },
  ];
  return (
    <section className="relative overflow-hidden bg-cream py-24 lg:py-32">
      <Container className="relative">
        <SectionHeading
          label="About GENX"
          title="Bioinformatics Designed Around Discovery"
          text="GENX is a proposed bioinformatics and computational biology startup from Nagpur. We plan to combine AI, high-performance computing and deep biological expertise to turn raw biological data into decisions — for labs, clinics, farms and industry."
        />
        <Reveal delay={0.15} className="mx-auto mt-10 flex max-w-xl justify-center gap-8 sm:gap-14">
          {stats.map((s) => (
            <div key={s.l} className="text-center">
              <div className="text-[40px] leading-none tracking-[-0.03em] text-navy">{s.n}</div>
              <div className="mt-2 text-[12px] text-ink/60">{s.l}</div>
            </div>
          ))}
        </Reveal>

        {/* collage */}
        <div className="mt-14 grid grid-cols-2 gap-4 lg:relative lg:mt-0 lg:block lg:h-[440px]">
          <Reveal className="lg:absolute lg:left-0 lg:top-6 lg:w-[20.5%]">
            <Photo src={photos.teamBook} alt="Scientists collaborating in a laboratory" className="aspect-[3/3.7]" />
          </Reveal>
          <Reveal delay={0.1} className="lg:absolute lg:left-[51%] lg:top-[170px] lg:w-[20.5%]">
            <Photo src={photos.multichannel} alt="Multichannel pipette preparing sequencing libraries" className="aspect-[4/3]" />
          </Reveal>
          <Reveal delay={0.2} className="col-span-2 lg:absolute lg:right-0 lg:top-[-330px] lg:w-[20.5%]">
            <Photo src={photos.computer} alt="Researcher analysing genomic data on a computer" className="aspect-[4/3] lg:aspect-[3/3.7]" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function WhyGenx() {
  const points = [
    { Icon: FlaskConical, t: "Reproducible pipelines", d: "Containerised, version-controlled workflows you can re-run and audit." },
    { Icon: Cpu, t: "AI where it matters", d: "Machine learning applied when it adds insight — never as decoration." },
    { Icon: MapPin, t: "Regional & responsive", d: "A team in Central India that speaks your language and your science." },
    { Icon: ShieldCheck, t: "Ethics & security first", d: "Privacy-by-design practices aligned with India's DPDP Act, 2023." },
  ];
  return (
    <section className="bg-cream pb-24 lg:pb-32">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading align="left" label="Why GENX" title="Science Built Around Rigour, Reproducibility, and AI" titleClassName="max-w-[13ch]" />
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-1">
            {points.map(({ Icon, t, d }, i) => (
              <Reveal key={t} delay={i * 0.06} className="flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-navy text-lime">
                  <Icon className="size-[18px]" strokeWidth={1.6} />
                </span>
                <span>
                  <span className="block text-[17px] text-ink">{t}</span>
                  <span className="mt-1 block max-w-sm text-[14px] leading-relaxed text-ink/65">{d}</span>
                </span>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="max-w-md text-[15px] leading-[1.7] text-ink/80">
              We'll combine experienced computational biologists with modern AI and computing to deliver analysis that is rigorous,
              accessible and explained in plain language. Every engagement will be designed around your research goals.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
            <Photo src={photos.screen} alt="Scientist reviewing data on a laboratory screen" className="aspect-[4/3.3]" />
          </Reveal>
          <Reveal delay={0.15} className="mt-8">
            <h3 className="text-[17px] text-ink">Supporting Better Research Outcomes</h3>
            <p className="mt-3 max-w-xl text-[14px] leading-[1.7] text-ink/70">
              From study design to publication-ready figures, we plan to stay with you at every step — using validated tools and
              evidence-based methods so you can make confident decisions about your science.
            </p>
            <div className="mt-6 flex items-center gap-2 text-[13px] text-ink/60">
              <LiveDot className="bg-navy" /> Currently in planning — building partnerships for launch
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <AboutIntro />
      <WhyGenx />
      <ServicesAccordionSection />
      <WorkflowSection />
      <ProjectsSection />
      <RegionalSection className="pt-4 lg:pt-8" />
      <AudienceSection />
      <ComparisonSection />
      <FAQSection className="pt-0 lg:pt-0" />
      <CTASection />
      <ContactSplit />
    </>
  );
}
