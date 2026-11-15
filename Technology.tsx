import { motion } from "motion/react";
import { Cloud, Cpu, Server, ShieldCheck, Terminal } from "lucide-react";
import { aiLayers, art, databases, infrastructure, photos, security, toolGroups } from "@/data/content";
import { href } from "@/lib/router";
import { Container, LimeList, LiveDot, Photo, Reveal, RollButton, SectionHeading } from "@/components/ui";
import { CTASection, Marquee, PageHero } from "@/components/sections";
import { cn } from "@/utils/cn";

const icons = { hpc: Server, gpu: Cpu, cloud: Cloud, linux: Terminal } as const;

function Infrastructure() {
  return (
    <section className="bg-cream py-24 lg:py-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading align="left" label="Infrastructure" title="Compute Built for Genome-Scale Science" className="lg:col-span-7" titleClassName="max-w-[14ch]" />
          <Reveal className="lg:col-span-5">
            <p className="max-w-md text-[15px] leading-[1.7] text-ink/75">
              A planned hybrid architecture: on-premise HPC and GPU nodes in Nagpur for steady workloads, with secure public-cloud burst
              capacity for peaks. Nothing below is operational yet — this is the blueprint we're building toward.
            </p>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {infrastructure.map((it, i) => {
            const Icon = icons[it.key as keyof typeof icons];
            return (
              <Reveal key={it.key} delay={i * 0.06}>
                <article className="group relative h-full overflow-hidden rounded-[14px] border border-ink/10 bg-white/60 p-7 transition-colors duration-500 hover:bg-navy hover:text-white sm:p-8">
                  <div className="flex items-start justify-between">
                    <span className="flex size-12 items-center justify-center rounded-full bg-navy text-lime transition-colors duration-500 group-hover:bg-lime group-hover:text-navy">
                      <Icon className="size-5" strokeWidth={1.6} />
                    </span>
                    <span className="rounded-full border border-current/15 px-3 py-1 text-[11px] uppercase tracking-[0.06em] opacity-70">Planned</span>
                  </div>
                  <h3 className="mt-10 text-[28px] leading-tight tracking-[-0.02em]">{it.title}</h3>
                  <p className="mt-3 max-w-md text-[14px] leading-[1.7] opacity-75">{it.text}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {it.specs.map((s) => (
                      <span key={s} className="rounded-full bg-ink/5 px-3 py-1.5 text-[12px] transition-colors duration-500 group-hover:bg-white/10">
                        {s}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mt-4" y={40}>
          <Photo src={photos.servers} alt="Server racks in a data centre" className="aspect-[16/8] sm:aspect-[21/8]" />
        </Reveal>
      </Container>
    </section>
  );
}

function Pipelines() {
  return (
    <section className="section-navy overflow-hidden py-24 lg:py-32">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading
            align="left"
            tone="dark"
            label="Pipelines"
            title="Reproducible by Design"
            text="Every analysis will run as a versioned, containerised workflow — so results can be audited, re-run and extended by anyone, years later."
          />
          <Reveal delay={0.1} className="mt-10">
            <div className="glass overflow-hidden rounded-[14px] font-mono text-[12px] leading-[1.8]">
              <div className="flex items-center gap-1.5 border-b border-white/15 px-4 py-3">
                <span className="size-2.5 rounded-full bg-white/30" />
                <span className="size-2.5 rounded-full bg-white/30" />
                <span className="size-2.5 rounded-full bg-lime" />
                <span className="ml-3 text-white/60">genx@hpc-node-01 — preview</span>
              </div>
              <pre className="overflow-x-auto px-4 py-4 text-white/85">
                <span className="text-white/45"># planned germline workflow</span>
                {"\n"}$ nextflow run nf-core/sarek \{"\n"}
                {"    "}--input samplesheet.csv \{"\n"}
                {"    "}--genome GATK.GRCh38 \{"\n"}
                {"    "}--tools haplotypecaller,vep \{"\n"}
                {"    "}-profile apptainer,slurm{"\n"}
                <span className="text-lime">✔ QC · align · call · annotate</span>
                {"\n"}
                <span className="text-white/45">→ results/ · multiqc_report.html</span>
              </pre>
            </div>
          </Reveal>
        </div>
        <div className="space-y-4 lg:col-span-6 lg:col-start-7">
          {toolGroups.map((g, i) => (
            <Reveal key={g.name} delay={i * 0.05}>
              <div className="rounded-[14px] border border-white/15 bg-white/[0.06] p-5 sm:p-6">
                <p className="flex items-center gap-2 text-[13px] text-lime">
                  <span className="size-[6px] rounded-full bg-lime" /> {g.name}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {g.tools.map((t) => (
                    <span key={t} className="rounded-full bg-white/10 px-3 py-1.5 text-[13px] text-white/90 transition-colors hover:bg-lime hover:text-ink">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
          <p className="text-[12px] text-white/50">Open-source tools listed are those we plan to use; names belong to their respective projects.</p>
        </div>
      </Container>
    </section>
  );
}

function Databases() {
  return (
    <section className="overflow-hidden bg-cream pt-24 lg:pt-32">
      <Container>
        <SectionHeading
          label="Databases"
          title="Built on the World's Reference Data"
          text="Our pipelines are designed to draw on trusted public resources for genomes, variants, expression, proteins, compounds and pathways."
        />
        <Reveal className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-2" y={20}>
          {databases.map((d) => (
            <span key={d} className="rounded-full border border-ink/12 bg-white/50 px-4 py-2 text-[14px] text-ink/85 transition-colors hover:border-navy hover:bg-navy hover:text-white">
              {d}
            </span>
          ))}
        </Reveal>
      </Container>
      <Marquee items={["Genomes", "Variants", "Transcripts", "Proteins", "Structures", "Compounds", "Pathways"]} />
    </section>
  );
}

function AIArchitecture() {
  return (
    <section className="bg-cream py-24 lg:py-32">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading
            align="left"
            label="AI architecture"
            title="A Layered AI Stack for Biology"
            text="Data flows upward through five layers — from raw files to validated, explainable predictions delivered as reports, dashboards and APIs."
          />
          <Reveal delay={0.1} className="mt-10 overflow-hidden rounded-[14px]">
            <img src={art.brain} alt="Porcelain sculpture of a brain becoming a neural network" className="mx-auto w-[78%] max-w-[380px]" />
          </Reveal>
        </div>
        <div className="relative lg:col-span-6 lg:col-start-7">
          <div className="absolute bottom-6 left-[27px] top-6 w-px overflow-hidden bg-ink/12">
            <motion.span
              className="absolute left-0 h-24 w-px bg-gradient-to-t from-transparent via-navy to-transparent"
              animate={{ top: ["100%", "-20%"] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
            />
          </div>
          <ol className="space-y-3">
            {aiLayers.map((l, i) => (
              <Reveal key={l.name} delay={i * 0.07}>
                <li
                  className={cn(
                    "relative flex items-center gap-5 rounded-[14px] p-5 sm:p-6",
                    i === 2 ? "bg-navy text-white" : i === 0 ? "bg-lime text-ink" : "border border-ink/10 bg-white/60",
                  )}
                >
                  <span
                    className={cn(
                      "relative z-10 flex size-[14px] shrink-0 items-center justify-center rounded-full ring-4",
                      i === 2 ? "bg-lime ring-navy" : i === 0 ? "bg-ink ring-lime" : "bg-navy ring-cream",
                    )}
                  />
                  <span className="min-w-0">
                    <span className="flex items-center gap-3">
                      <span className="text-[12px] opacity-60">L{aiLayers.length - i}</span>
                      <span className="text-[19px] leading-tight tracking-[-0.01em]">{l.name}</span>
                    </span>
                    <span className="mt-1 block text-[13px] leading-relaxed opacity-70">{l.meta}</span>
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function Security() {
  return (
    <section className="section-navy py-24 lg:py-32">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading
            align="left"
            tone="dark"
            label="Security & compliance"
            title="Honest About Where We Stand"
            text="Biological data is deeply personal. Here is exactly what we plan, what we design toward and what we have not yet achieved."
          />
          <Reveal delay={0.1} className="mt-8 flex items-center gap-2 text-[13px] text-white/70">
            <LiveDot /> No certifications are claimed on this website.
          </Reveal>
        </div>
        <Reveal className="lg:col-span-6 lg:col-start-7">
          <ul className="border-t border-white/15">
            {security.map((s) => (
              <li key={s.item} className="flex items-center justify-between gap-6 border-b border-white/15 py-5">
                <span className="flex items-center gap-4 text-[15px] text-white">
                  <ShieldCheck className="size-[18px] shrink-0 text-lime" strokeWidth={1.5} />
                  {s.item}
                </span>
                <span
                  className={cn(
                    "shrink-0 rounded-full px-3 py-1 text-[11px]",
                    s.status.startsWith("Roadmap") ? "bg-white/10 text-white/70" : s.status === "Planned" ? "bg-lime text-ink" : "bg-white text-navy",
                  )}
                >
                  {s.status}
                </span>
              </li>
            ))}
          </ul>
          <LimeList
            className="mt-8"
            itemClassName="text-[13px] text-white/75"
            items={["Research-use data only — no clinical diagnostics", "Consent and data-sharing agreements before any human data is processed"]}
          />
          <div className="mt-10">
            <RollButton href={href("/contact")} icon>
              Talk to Us About Data
            </RollButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default function Technology() {
  return (
    <>
      <PageHero
        word="TECHNOLOGY"
        crumb="Technology"
        tagline="HPC · GPU · Cloud · Linux · Pipelines · Databases · AI"
        intro={
          <>
            A planned computing stack engineered for <span className="text-lime">genome-scale data</span>, reproducible science and modern AI.
          </>
        }
        art={art.brain}
        artAlt="Porcelain sculpture of a brain becoming a neural network"
      >
        <RollButton href={href("/services")}>Explore Services</RollButton>
        <RollButton href={href("/contact")} variant="glass">
          Partner With Us
        </RollButton>
      </PageHero>
      <Infrastructure />
      <Pipelines />
      <Databases />
      <AIArchitecture />
      <Security />
      <CTASection word="COMPUTATION" image={photos.datacenter} />
    </>
  );
}
