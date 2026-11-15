import { Check, Circle } from "lucide-react";
import { art, objectives, photos, roadmap, roles, values } from "@/data/content";
import { href } from "@/lib/router";
import { Container, LimeList, Photo, PillLabel, Reveal, RollButton, SectionHeading } from "@/components/ui";
import { CTASection, PageHero, RegionalSection } from "@/components/sections";
import { cn } from "@/utils/cn";

const status = [
  { item: "Concept, business plan & brand", state: "In progress", done: true },
  { item: "Core scientific team formation", state: "In progress", done: true },
  { item: "Pipeline development & validation", state: "Planned", done: false },
  { item: "HPC / GPU infrastructure", state: "Planned", done: false },
  { item: "First pilot collaborations", state: "Seeking partners", done: false },
];

function WhoWeAre() {
  return (
    <section className="bg-cream py-24 lg:py-32">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <SectionHeading align="left" label="Who we are" title="A Proposed Startup with a Clear Purpose" titleClassName="max-w-[14ch]" />
          <Reveal delay={0.1} className="mt-8 max-w-xl space-y-5 text-[15px] leading-[1.75] text-ink/75">
            <p>
              GENX is a proposed bioinformatics and computational biology company based in Nagpur. Our idea is simple: biological data is
              growing faster than the capacity to analyse it — especially outside India's metro research hubs.
            </p>
            <p>
              We plan to close that gap by bringing AI, high-performance computing and expert interpretation to researchers, clinicians,
              breeders and companies across Maharashtra and Madhya Pradesh — and to do it with scientific rigour and complete honesty about
              what we can deliver.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-10 grid grid-cols-2 gap-4">
            <Photo src={photos.practitioner} alt="Researcher in a modern laboratory" className="aspect-[3/3.6]" />
            <Photo src={photos.tube} alt="Scientist examining a sample tube" className="mt-12 aspect-[3/3.6]" />
          </Reveal>
        </div>
        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
          <div className="rounded-[18px] bg-navy p-7 text-white sm:p-9 lg:sticky lg:top-28">
            <PillLabel tone="glass">Where we are today</PillLabel>
            <p className="mt-6 text-[26px] leading-[1.2] tracking-[-0.02em]">
              GENX is in its planning stage. Nothing on this site is presented as an operational service.
            </p>
            <ul className="mt-8 border-t border-white/15">
              {status.map((s) => (
                <li key={s.item} className="flex items-center justify-between gap-4 border-b border-white/15 py-4">
                  <span className="flex items-center gap-3 text-[14px]">
                    {s.done ? (
                      <span className="flex size-5 items-center justify-center rounded-full bg-lime text-ink">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                    ) : (
                      <Circle className="size-5 text-white/40" strokeWidth={1.5} />
                    )}
                    {s.item}
                  </span>
                  <span className={cn("shrink-0 text-[12px]", s.done ? "text-lime" : "text-white/60")}>{s.state}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <RollButton href={href("/contact")} icon>
                Help Shape GENX
              </RollButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function VisionMission() {
  return (
    <section className="bg-cream pb-24 lg:pb-32">
      <Container className="grid gap-4 lg:grid-cols-2">
        <Reveal>
          <article className="relative h-full overflow-hidden rounded-[18px] bg-steel p-8 text-white sm:p-10">
            <p className="text-[13px] text-lime">[ VISION ]</p>
            <p className="relative z-10 mt-8 max-w-[22ch] text-[clamp(1.7rem,2.8vw,2.6rem)] leading-[1.12] tracking-[-0.025em]">
              To make Central India a recognised hub for AI-driven biological discovery.
            </p>
            <p className="relative z-10 mt-6 max-w-md text-[14px] leading-relaxed text-white/80">
              A future where every lab, clinic and farm in the region can turn biological data into knowledge — without sending it
              across the world.
            </p>
            <img src={art.dna} alt="" className="pointer-events-none absolute -bottom-10 -right-6 w-44 opacity-90 sm:w-56" />
          </article>
        </Reveal>
        <Reveal delay={0.08}>
          <article className="relative h-full overflow-hidden rounded-[18px] bg-lime p-8 text-ink sm:p-10">
            <p className="text-[13px] text-navy">[ MISSION ]</p>
            <p className="relative z-10 mt-8 max-w-[22ch] text-[clamp(1.7rem,2.8vw,2.6rem)] leading-[1.12] tracking-[-0.025em]">
              Rigorous, reproducible and accessible computational biology.
            </p>
            <p className="relative z-10 mt-6 max-w-md text-[14px] leading-relaxed text-ink/75">
              We'll combine AI, high-performance computing and deep domain expertise — and explain every result in language our
              partners can act on.
            </p>
            <img src={art.molecule} alt="" className="pointer-events-none absolute -bottom-6 -right-10 w-56 opacity-90 sm:w-72" />
          </article>
        </Reveal>
      </Container>
    </section>
  );
}

function Roadmap() {
  return (
    <section className="section-navy overflow-hidden py-24 lg:py-32">
      <Container>
        <SectionHeading
          tone="dark"
          label="Regional strategy"
          title="From Nagpur to the Nation, Step by Step"
          text="A phased plan that starts close to home, earns trust through pilot projects and expands only as capability grows."
        />
        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-[22px] hidden h-px bg-white/20 lg:block" />
          <ol className="grid gap-5 lg:grid-cols-4">
            {roadmap.map((r, i) => (
              <Reveal key={r.phase} delay={i * 0.08}>
                <li className="relative">
                  <span
                    className={cn(
                      "relative z-10 flex size-11 items-center justify-center rounded-full border text-[12px]",
                      i === 0 ? "border-lime bg-lime text-ink" : "border-white/30 bg-navy text-white",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-6 rounded-[14px] border border-white/15 bg-white/[0.06] p-6">
                    <p className="text-[12px] text-lime">
                      {r.phase} · {r.place}
                    </p>
                    <h3 className="mt-3 text-[26px] leading-tight tracking-[-0.02em]">{r.title}</h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-white/75">{r.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function Objectives() {
  return (
    <section className="bg-cream py-24 lg:py-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading align="left" label="Company objectives" title="What We Set Out to Achieve" className="lg:col-span-7" titleClassName="max-w-[13ch]" />
          <Reveal className="lg:col-span-5">
            <p className="max-w-md text-[15px] leading-[1.7] text-ink/75">Six objectives guide every decision we make as we move from plan to launch.</p>
          </Reveal>
        </div>
        <div className="mt-14 grid border-t border-ink/12 sm:grid-cols-2 lg:grid-cols-3">
          {objectives.map((o, i) => (
            <Reveal key={o} delay={(i % 3) * 0.06}>
              <div className="h-full border-b border-ink/12 py-8 sm:pr-8">
                <span className="text-[44px] leading-none tracking-[-0.04em] text-navy">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink/80">{o}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.06}>
              <article className="h-full rounded-[14px] bg-mist p-6">
                <span className="flex size-9 items-center justify-center rounded-full bg-navy text-[12px] text-lime">{v.title[0]}</span>
                <h3 className="mt-6 text-[22px] tracking-[-0.02em]">{v.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-ink/70">{v.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Roles() {
  return (
    <section className="overflow-hidden bg-cream pb-24 lg:pb-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading align="left" label="Career" title="Join the Team We're Building" className="lg:col-span-7" titleClassName="max-w-[13ch]" />
          <Reveal className="lg:col-span-5">
            <p className="max-w-md text-[15px] leading-[1.7] text-ink/75">
              We're building the future of biological discovery in Central India. These are roles we plan to hire for as GENX launches —
              register your interest early.
            </p>
          </Reveal>
        </div>
        <div className="mt-10 flex items-center gap-3 border-t border-ink/12 pt-5 text-[12px]">
          <span className="size-1.5 rounded-full bg-ink" /> Planned positions
        </div>
      </Container>
      <div className="no-scrollbar mt-6 overflow-x-auto">
        <div className="mx-auto flex w-max max-w-none gap-4 px-5 sm:px-8 lg:px-10 xl:pl-[max(2.5rem,calc((100vw-1440px)/2+2.5rem))]">
          {roles.map((r) => (
            <article key={r.title} className="flex w-[280px] shrink-0 flex-col rounded-[14px] bg-steel p-6 text-white transition-colors duration-500 hover:bg-navy">
              <h3 className="text-[19px]">{r.title}</h3>
              <p className="mt-1 text-[12px] text-white/70">{r.type}</p>
              <LimeList items={r.points} className="mt-6" itemClassName="text-[13px] text-white/90" />
              <a href={href("/contact")} className="mt-8 text-[13px] text-lime">
                Register interest →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <PageHero
        word="ABOUT US"
        crumb="About"
        tagline="Bio Science · AI · Computation"
        intro={
          <>
            Building a computational biology company for Central India — <span className="text-lime">honest</span> about where we are,
            ambitious about where we're going.
          </>
        }
        art={art.dnaTall}
        artAlt="Porcelain sculpture of a DNA double helix"
      >
        <RollButton href={href("/contact")}>Partner With Us</RollButton>
      </PageHero>
      <WhoWeAre />
      <VisionMission />
      <Roadmap />
      <RegionalSection />
      <Objectives />
      <Roles />
      <CTASection word="TOGETHER" image={photos.team} />
    </>
  );
}
