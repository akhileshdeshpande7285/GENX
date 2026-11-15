import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/utils/cn";

/* ---------------- Logo ---------------- */
export function LogoMark({ className }: { className?: string }) {
  // An X-shaped chromosome — the "X" in GENX.
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
      <path d="M8.5 4.5c2.6 5.2 4.6 8.4 7.5 11.5 2.9 3.1 4.9 6.3 7.5 11.5" stroke="#C1E55B" strokeWidth="5.2" strokeLinecap="round" />
      <path d="M23.5 4.5c-2.6 5.2-4.6 8.4-7.5 11.5-2.9 3.1-4.9 6.3-7.5 11.5" stroke="#C1E55B" strokeWidth="5.2" strokeLinecap="round" />
      <circle cx="16" cy="16" r="2.1" fill="#275077" />
    </svg>
  );
}

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <a href="#/" className={cn("group inline-flex items-center gap-2", className)} aria-label="GENX home">
      <LogoMark className="size-7 transition-transform duration-700 ease-out-soft group-hover:rotate-90" />
      <span className={cn("text-[22px] leading-none tracking-[-0.02em]", dark ? "text-ink" : "text-white")}>GENX</span>
    </a>
  );
}

/* ---------------- Buttons ---------------- */
type BtnVariant = "lime" | "navy" | "glass" | "outline" | "white";
const variants: Record<BtnVariant, string> = {
  lime: "bg-lime text-ink hover:bg-lime-300",
  navy: "bg-navy text-white hover:bg-navy-800",
  glass: "glass text-white hover:bg-white/20",
  outline: "border border-ink/15 text-ink hover:border-ink/40",
  white: "bg-white text-ink hover:bg-cream",
};
const sizes = {
  sm: "h-9 px-4 text-[14px]",
  md: "h-11 px-5 text-[15px]",
  lg: "h-[52px] px-7 text-[16px]",
};

export function RollButton({
  children,
  href,
  onClick,
  variant = "lime",
  size = "md",
  icon = false,
  className,
  type = "button",
  disabled,
}: {
  children: string;
  href?: string;
  onClick?: () => void;
  variant?: BtnVariant;
  size?: keyof typeof sizes;
  icon?: boolean;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const cls = cn(
    "group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full transition-colors duration-300",
    sizes[size],
    variants[variant],
    disabled && "pointer-events-none opacity-60",
    className,
  );
  const inner = (
    <>
      <span className="relative block overflow-hidden leading-[1.3]">
        <span className="block transition-transform duration-500 ease-out-soft group-hover:-translate-y-full">{children}</span>
        <span aria-hidden="true" className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out-soft group-hover:translate-y-0">
          {children}
        </span>
      </span>
      {icon ? <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-soft group-hover:rotate-45" strokeWidth={1.75} /> : null}
    </>
  );
  if (href)
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  return (
    <button type={type} onClick={onClick} className={cls} disabled={disabled}>
      {inner}
    </button>
  );
}

/* ---------------- Labels & headings ---------------- */
export function PillLabel({ children, tone = "navy", className }: { children: ReactNode; tone?: "navy" | "glass"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3.5 py-[7px] text-[12px] uppercase leading-none tracking-[0.02em]",
        tone === "navy" ? "bg-navy text-lime" : "glass text-white/90",
        className,
      )}
    >
      [ {children} ]
    </span>
  );
}

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  label,
  title,
  text,
  align = "center",
  tone = "light",
  className,
  titleClassName,
}: {
  label?: string;
  title: ReactNode;
  text?: ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <Reveal className={cn("flex flex-col gap-5", align === "center" ? "items-center text-center" : "items-start text-left", className)}>
      {label ? <PillLabel tone={tone === "light" ? "navy" : "glass"}>{label}</PillLabel> : null}
      <h2
        className={cn(
          "text-balance text-[clamp(2.4rem,4.6vw,4.05rem)] font-normal leading-[1.07] tracking-[-0.028em]",
          tone === "light" ? "text-ink" : "text-white",
          align === "center" && "max-w-[16ch]",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {text ? (
        <p className={cn("max-w-[34rem] text-[15px] leading-[1.7]", tone === "light" ? "text-ink/75" : "text-white/75")}>{text}</p>
      ) : null}
    </Reveal>
  );
}

/* ---------------- Fit-to-width display text ---------------- */
export function FitText({ text, className, max = 900 }: { text: string; className?: string; max?: number }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState<number | null>(null);

  useLayoutEffect(() => {
    const box = boxRef.current;
    const probe = probeRef.current;
    if (!box || !probe) return;
    const measure = () => {
      const w = probe.getBoundingClientRect().width;
      if (w > 0) setSize(Math.min(max, (100 * box.clientWidth) / w));
    };
    measure();
    // Observe the probe too: a web-font swap changes its width without resizing the box.
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    ro.observe(probe);
    const fonts = document.fonts;
    fonts?.ready.then(measure).catch(() => undefined);
    fonts?.addEventListener?.("loadingdone", measure);
    return () => {
      ro.disconnect();
      fonts?.removeEventListener?.("loadingdone", measure);
    };
  }, [text, max]);

  return (
    <div ref={boxRef} className={cn("relative w-full", className)}>
      <span ref={probeRef} aria-hidden="true" className="pointer-events-none invisible absolute left-0 top-0 whitespace-nowrap" style={{ fontSize: 100 }}>
        {text}
      </span>
      <span className="block whitespace-nowrap" style={{ fontSize: size ? `${size}px` : "12vw", lineHeight: 0.92 }}>
        {text}
      </span>
    </div>
  );
}

/* ---------------- Lists & media ---------------- */
export function LimeList({ items, className, itemClassName }: { items: string[]; className?: string; itemClassName?: string }) {
  return (
    <ul className={cn("space-y-2.5", className)}>
      {items.map((i) => (
        <li key={i} className={cn("flex items-start gap-3 text-[14px] leading-snug", itemClassName)}>
          <span className="mt-[6px] size-[6px] shrink-0 rounded-full bg-lime" />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

export function Photo({ src, alt, className, imgClassName }: { src: string; alt: string; className?: string; imgClassName?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-[14px] bg-steel/25", className)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={cn("h-full w-full object-cover transition-transform duration-[1400ms] ease-out-soft hover:scale-[1.04]", imgClassName)}
      />
    </div>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10", className)}>{children}</div>;
}

/* ---------------- Brand icons ---------------- */
export function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.2 8.25h4.6V23H.2V8.25zM8.2 8.25h4.4v2.02h.06c.61-1.16 2.11-2.38 4.35-2.38 4.65 0 5.51 3.06 5.51 7.04V23h-4.6v-7.1c0-1.69-.03-3.87-2.36-3.87-2.36 0-2.72 1.84-2.72 3.75V23H8.2V8.25z" />
    </svg>
  );
}
export function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

export function LiveDot({ className }: { className?: string }) {
  return <span className={cn("inline-block size-1.5 rounded-full bg-lime animate-pulse-dot", className)} />;
}
