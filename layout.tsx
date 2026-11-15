import { useEffect, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { routes, href, type RoutePath } from "@/lib/router";
import { brand, services } from "@/data/content";
import { cn } from "@/utils/cn";
import { Container, FitText, LinkedInIcon, Logo, LiveDot, RollButton, XIcon } from "./ui";

/* ------------------------------------------------------------------ */
/* Navbar                                                               */
/* ------------------------------------------------------------------ */
export function Navbar({ path }: { path: RoutePath }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > 260 && y > lastY.current + 4) setHidden(true);
      else if (y < lastY.current - 4 || y < 260) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-out-soft",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
          scrolled && !open ? "border-b border-white/10 bg-navy/80 backdrop-blur-xl" : "border-b border-transparent bg-transparent",
        )}
      >
        <Container className="flex h-[76px] items-center justify-between gap-6">
          <Logo />
          <nav aria-label="Main" className="glass hidden items-center gap-1 rounded-full p-1.5 lg:flex">
            {routes.map((r) => {
              const active = r.path === path;
              return (
                <a
                  key={r.path}
                  href={href(r.path)}
                  onClick={() => {
                    if (active) window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-[14px] transition-colors duration-300",
                    active ? "bg-white/18 text-white" : "text-white/75 hover:text-white",
                  )}
                >
                  {active ? <span className="absolute left-1.5 top-1/2 size-1 -translate-y-1/2 rounded-full bg-lime" /> : null}
                  {r.label}
                </a>
              );
            })}
          </nav>
          <div className="hidden lg:block">
            <RollButton href={href("/contact")} size="md">
              Start a Project
            </RollButton>
          </div>
          <button
            type="button"
            className="relative z-[60] flex size-11 items-center justify-center lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3.5 w-7">
              <span className={cn("absolute left-0 h-[1.5px] w-full bg-white transition-all duration-500 ease-out-soft", open ? "top-1/2 rotate-45" : "top-0")} />
              <span className={cn("absolute left-0 top-1/2 h-[1.5px] w-full bg-white transition-opacity duration-300", open ? "opacity-0" : "opacity-100")} />
              <span className={cn("absolute left-0 h-[1.5px] w-full bg-white transition-all duration-500 ease-out-soft", open ? "top-1/2 -rotate-45" : "top-full")} />
            </span>
          </button>
        </Container>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="menu"
            className="fixed inset-0 z-40 flex flex-col bg-navy lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
          >
            <div className="hero-surface -z-10">
              <div className="grid-lines" />
            </div>
            <Container className="flex flex-1 flex-col justify-between pb-10 pt-28">
              <nav aria-label="Mobile" className="flex flex-col">
                {routes.map((r, i) => (
                  <motion.a
                    key={r.path}
                    href={href(r.path)}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 + i * 0.06, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                    className="flex items-baseline justify-between border-b border-white/15 py-4 text-[40px] leading-none tracking-[-0.03em] text-white"
                  >
                    {r.label}
                    <span className="text-[12px] tracking-normal text-lime">0{i + 1}</span>
                  </motion.a>
                ))}
              </nav>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="space-y-6">
                <RollButton href={href("/contact")} size="lg" className="w-full">
                  Start a Project
                </RollButton>
                <p className="flex items-center gap-2 text-[13px] text-white/70">
                  <LiveDot /> Proposed startup · {brand.regions.join(" · ")}
                </p>
              </motion.div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                               */
/* ------------------------------------------------------------------ */
export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return;
    setDone(true);
  };

  return (
    <footer className="section-navy overflow-hidden">
      <Container className="pt-20">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-[13px] text-white/50">Join our mailing list</p>
            {done ? (
              <p className="mt-4 max-w-sm text-[15px] text-white">Thank you — you'll hear from us when GENX launches.</p>
            ) : (
              <form onSubmit={submit} className="mt-3 flex max-w-md items-end gap-5">
                <label className="flex-1">
                  <span className="sr-only">Your email</span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email*"
                    className="w-full border-b border-white/30 bg-transparent py-2 text-[14px] text-white placeholder:text-white/70 focus:border-lime focus:outline-none"
                  />
                </label>
                <button type="submit" className="group inline-flex items-center gap-2 pb-2 text-[14px] text-white">
                  Submit <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} />
                </button>
              </form>
            )}
            <p className="mt-10 max-w-md text-[13px] leading-relaxed text-white/55">
              {brand.domain} is a proposed startup. The services, infrastructure, certifications and projects described on this website are
              planned and not yet operational.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <p className="text-[13px] text-white/50">Pages</p>
              <ul className="mt-4 space-y-2.5 text-[14px]">
                {routes.map((r) => (
                  <li key={r.path}>
                    <a href={href(r.path)} className="text-white/90 transition-colors hover:text-lime">
                      {r.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[13px] text-white/50">Services</p>
              <ul className="mt-4 space-y-2.5 text-[14px]">
                {services.map((s) => (
                  <li key={s.id}>
                    <a href={href("/services", s.id)} className="text-white/90 transition-colors hover:text-lime">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-[13px] text-white/50">Contacts</p>
              <p className="mt-4 text-[18px] leading-snug text-white">{brand.location}</p>
              <a href={`mailto:${brand.email}`} className="mt-4 block text-[18px] text-white transition-colors hover:text-lime">
                {brand.email}
              </a>
              <div className="mt-6 flex gap-2">
                {[
                  { label: "LinkedIn (coming soon)", Icon: LinkedInIcon },
                  { label: "X (coming soon)", Icon: XIcon },
                ].map(({ label, Icon }) => (
                  <span key={label} title={label} className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white/80">
                    <Icon className="size-3.5" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col justify-between gap-3 text-[12px] text-white/50 sm:flex-row">
          <span>© {new Date().getFullYear()} GENX · Bio Science · AI · Computation</span>
          <span>{brand.regions.join(" · ")}</span>
        </div>
        <FitText text="GENX.COM" className="mt-4 select-none pb-6 text-cream tracking-[-0.02em]" />
      </Container>
    </footer>
  );
}
