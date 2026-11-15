import { Building2, FlaskConical, Handshake } from "lucide-react";
import { art, enquiryTypes } from "@/data/content";
import { Container, Reveal, SectionHeading } from "@/components/ui";
import { ContactSplit, FAQSection, PageHero } from "@/components/sections";
import { scrollToSection } from "@/lib/router";

const icons = { project: FlaskConical, partnership: Building2, business: Handshake } as const;

export default function Contact() {
  return (
    <>
      <PageHero
        word="CONTACT"
        crumb="Contact"
        tagline="Project enquiries · Partnerships · Collaborations"
        intro={
          <>
            Tell us about your data, your question or your idea — from the <span className="text-lime">Orange City</span> and beyond.
          </>
        }
        art={art.orange}
        artAlt="Porcelain sculpture of a Nagpur mandarin orange"
      />
      <section className="bg-cream py-24 lg:py-32">
        <Container>
          <SectionHeading label="How can we help" title="Three Ways to Start a Conversation" titleClassName="max-w-[15ch]" />
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {enquiryTypes.map((t, i) => {
              const Icon = icons[t.key as keyof typeof icons];
              return (
                <Reveal key={t.key} delay={i * 0.07}>
                  <button
                    type="button"
                    onClick={() => scrollToSection("contact")}
                    className="group flex h-full w-full flex-col rounded-[14px] bg-steel p-7 text-left text-white transition-colors duration-500 hover:bg-navy"
                  >
                    <span className="flex size-12 items-center justify-center rounded-full bg-white/10 text-lime transition-colors duration-500 group-hover:bg-lime group-hover:text-navy">
                      <Icon className="size-5" strokeWidth={1.6} />
                    </span>
                    <span className="mt-10 text-[26px] leading-tight tracking-[-0.02em]">{t.title}</span>
                    <span className="mt-3 text-[14px] leading-relaxed text-white/80">{t.text}</span>
                    <span className="mt-auto pt-8 text-[13px] text-lime">Write to us ↓</span>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>
      <ContactSplit />
      <FAQSection />
    </>
  );
}
