import { useEffect, useLayoutEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { scrollToSection, useHashRoute, type RoutePath } from "@/lib/router";
import { Footer, Navbar } from "@/components/layout";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Technology from "@/pages/Technology";
import About from "@/pages/About";
import Contact from "@/pages/Contact";

const pages: Record<RoutePath, () => ReactNode> = {
  "/": Home,
  "/services": Services,
  "/technology": Technology,
  "/about": About,
  "/contact": Contact,
};

const titles: Record<RoutePath, string> = {
  "/": "GENX — Biological data. Intelligent discovery.",
  "/services": "Services — GENX | NGS, WGS, WES, RNA-seq, AI/ML, Drug Discovery",
  "/technology": "Technology — GENX | HPC, GPU, Cloud, Pipelines & AI",
  "/about": "About Us — GENX | Vision, Mission & Regional Strategy",
  "/contact": "Contact — GENX | Projects, Partnerships & Collaborations",
};

function PageShell({ children, section }: { children: ReactNode; section?: string }) {
  const mounted = useRef(false);
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (!section) {
      mounted.current = true;
      return;
    }
    const timers: number[] = [];
    if (mounted.current) {
      // same page: smooth scroll to the section
      timers.push(window.setTimeout(() => scrollToSection(section), 40));
    } else {
      // fresh page: jump once layout exists, then re-align after images/fonts settle
      timers.push(window.setTimeout(() => scrollToSection(section, "auto"), 120));
      timers.push(window.setTimeout(() => scrollToSection(section, "auto"), 700));
      timers.push(window.setTimeout(() => scrollToSection(section), 1400));
    }
    mounted.current = true;
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [section]);
  return <>{children}</>;
}

export default function App() {
  const { path, section } = useHashRoute();
  const Page = pages[path];

  useEffect(() => {
    document.title = titles[path];
  }, [path]);

  return (
    <div className="min-h-screen bg-cream">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-lime focus:px-4 focus:py-2 focus:text-ink">
        Skip to content
      </a>
      <Navbar path={path} />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="main"
          key={path}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <PageShell section={section}>
            <Page />
          </PageShell>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
