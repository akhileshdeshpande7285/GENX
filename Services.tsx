import { art, photos, services } from "@/data/content";
import { href } from "@/lib/router";
import { Container, LimeList, Reveal, RollButton, SectionHeading } from "@/components/ui";
import { CTASection, PageHero, ServicesAccordionSection, WorkflowSection } from "@/components/sections";

const models = [
  {
    title: "Project-based analysis",
    type: "Fixed scope · Per dataset",
    text: "A defined dataset, a clear question and agreed deliverables.",
    points: ["Transparent scope & quote", "Defined deliverables", "Ideal for single studies"],
  },
  {
    title: "Research collaboration",
    type: "Academic · Co-developed",
    text: "Co-designed science with institutions and research groups.",
    points: ["Joint study design", "Grant co-development", "Shared publications"],
  },
  {
    title: "Analysis retainer",
    type: "Monthly · Ongoing",
    text: "On-demand bioinformatics capacity for busy labs and companies.",
    points: ["Reserved analyst hours", "Priority turnaround", "Dedicated scientist"],
  },
  {
    title: "Training & workshops",
    type: "Hands-on · Cohort based",
    text: "Capacity building for students, researchers and clinicians.",
    points: ["NGS & RNA-seq analysis", "R / Python for biology", "Reproducible pipelines"],
  },
];

function Catalogue() {
  return (
    <section id="catalogue" className="bg-cream pb-24 lg:pb-32">
      <Container>
        <SectionHeading align="left" label="Service catalogue" title="What Each Service Will Include" titleClassName="max-w-[14ch]" />
        <div className="mt-14 border-t border-ink/12">
          {services.map((s, i) => (
            <Reveal key={s.id}>
              <article id={s.id} className="grid scroll-mt-28 gap-8 border-b border-ink/12 py-10 lg:grid-cols-12 lg:gap-8 lg:py-12">
                <div className="flex gap-5 lg:col-span-5">
                  <div className="flex size-24 shrink-0 items-center justify-center rounded-[14px] sm:size-28" style={{ background: s.tone }}>
                    <img src={s.art} alt="" className="size-[86%] object-contain" loading="lazy" />
                  </div>
                  <div>
                    <p className="text-[12px] tracking-[0.06em] text-steel">
                      {String(i + 1).padStart(2, "0")} · {s.code}
                    </p>
                    <h3 className="mt-2 text-[clamp(1.6rem,2.4vw,2.2rem)] leading-[1.08] tracking-[-0.025em]">{s.name}</h3>
                    <p className="mt-3 max-w-md text-[14px] leading-[1.7] text-ink/70">{s.short}</p>
                  </div>
                </div>
                <div className="lg:col-span-4 lg:col-start-7">
                  <p className="text-[14px] text-ink">What's included</p>
                  <ul className="mt-4 space-y-2.5">
                    {s.includes.map((x) => (
                      <li key={x} className="flex items-start gap-3 text-[14px] leading-snug text-ink/80">
                        <span className="mt-[6px] size-[6px] shrink-0 rounded-full bg-navy" />
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4 lg:col-span-2 lg:col-start-11">
                  <div>
                    <p className="text-[12px] text-ink/50">Typical inputs</p>
                    <p className="mt-1 text-[14px] text-ink">{s.inputs}</p>
                  </div>
                  <div>
                    <p className="text-[12px] text-ink/50">Deliverables</p>
                    <p className="mt-1 text-[14px] text-ink">{s.outputs}</p>
                  </div>
                  <a href={href("/contact")} className="inline-block text-[13px] text-steel underline-offset-4 hover:underline">
                    Enquire →
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-[12px] leading-relaxed text-ink/55">
          All services are planned and intended for research use only. GENX does not provide clinical diagnostic services and does not
          currently hold laboratory accreditation.
        </p>
      </Container>
    </section>
  );
}

function EngagementModels() {
  return (
    <section className="bg-cream pb-24 lg:pb-32">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading align="left" label="Engagement models" title="Flexible Ways to Work Together" className="lg:col-span-7" titleClassName="max-w-[13ch]" />
          <Reveal className="lg:col-span-5">
            <p className="max-w-md text-[15px] leading-[1.7] text-ink/75">
              Whether you have one dataset or a multi-year programme, we plan to offer engagement models that fit academic, clinical and
              commercial teams.
            </p>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {models.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.06}>
              <article className="flex h-full flex-col rounded-[14px] bg-steel p-6 text-white transition-colors duration-500 hover:bg-navy">
                <h3 className="text-[19px] leading-tight">{m.title}</h3>
                <p className="mt-1 text-[12px] text-white/70">{m.type}</p>
                <p className="mt-5 text-[14px] leading-relaxed text-white/85">{m.text}</p>
                <LimeList items={m.points} className="mt-5" itemClassName="text-[13px] text-white/90" />
                <p className="mt-auto pt-8 text-[13px] text-lime">Planned · custom quote</p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default function Services() {
  return (
    <>
      <PageHero
        word="SERVICES"
        crumb="Services"
        tagline="NGS · WGS · WES · RNA-seq · AI/ML · Drug discovery · Multi-omics"
        intro={
          <>
            Seven planned service lines that take you from <span className="text-lime">raw reads</span> to{" "}
            <span className="text-lime">real insight</span>.
          </>
        }
        art={art.cell}
        artAlt="Porcelain sculpture of a biological cell"
      >
        <RollButton href={href("/contact")}>Discuss a Project</RollButton>
        <RollButton href={href("/services", "catalogue")} variant="glass">
          View Catalogue
        </RollButton>
      </PageHero>
      <ServicesAccordionSection id="overview" compactHeading />
      <Catalogue />
      <EngagementModels />
      <WorkflowSection steps={false} />
      <CTASection word="ANALYSIS" image={photos.researchers} />
    </>
  );
}
