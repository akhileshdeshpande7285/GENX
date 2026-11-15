/*
 * ApertureAccordion — a React + motion port of the Framer "Aperture / Alloy
 * Accordion" interaction: expanding covers with vertical spines, a travelling
 * artwork, spring geometry, hover-intent, autoplay ring and stacked mobile mode.
 */
import * as React from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

export type ApertureItem = {
  title: string;
  description: string;
  tone: string;
  coverColor?: string;
  image?: string;
  imageAlt?: string;
  imageScale?: number;
  linkLabel?: string;
  href?: string;
  eyebrow?: string;
  tags?: string[];
};

type Colors = { text: string; secondary: string; coverText: string; focus: string };

const DEFAULT_COLORS: Colors = {
  text: "#0B1B2B",
  secondary: "#2B3D50",
  coverText: "#F9F7F1",
  focus: "#C1E55B",
};

const SPRING = { type: "spring" as const, stiffness: 260, damping: 34, mass: 1, restDelta: 0.05, restSpeed: 0.5 };

const useSafeLayoutEffect = typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
function smoothRange(value: number, start: number, end: number) {
  const p = clamp01((value - start) / (end - start));
  return p * p * (3 - 2 * p);
}
const finePointer = (e: { pointerType: string }) =>
  e.pointerType !== "touch" &&
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ------------------------------------------------------------------ */
/* Mark: plus → minus, or progress ring with play / pause when autoplay */
/* ------------------------------------------------------------------ */
function PanelMark({
  openness,
  progress,
  timerEnabled,
  paused,
  reduced,
}: {
  openness: MotionValue<number>;
  progress: MotionValue<number>;
  timerEnabled: boolean;
  paused: boolean;
  reduced: boolean;
}) {
  const ringRef = React.useRef<SVGCircleElement>(null);
  const timerOpacity = useTransform(openness, (v) => smoothRange(v, 0.18, 0.92));
  const plusOpacity = useTransform(timerOpacity, (v) => (timerEnabled ? 1 - v : 1));
  const verticalOpacity = useTransform(openness, (v) => (timerEnabled ? 1 : 1 - smoothRange(v, 0, 1)));
  const glyph = { duration: reduced ? 0 : 0.16, ease: [0.4, 0, 0.2, 1] as const };

  React.useEffect(() => {
    const set = (v: number) => ringRef.current?.setAttribute("stroke-dashoffset", String(1 - v));
    set(progress.get());
    return progress.on("change", set);
  }, [progress]);

  return (
    <svg className="folio-mark" width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <circle className="folio-mark-track" cx="18" cy="18" r="15" stroke="currentColor" strokeWidth="1.5" opacity=".22" />
      <motion.g style={{ opacity: plusOpacity }}>
        <path d="M11 18h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <motion.path d="M18 11v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" style={{ opacity: verticalOpacity }} />
      </motion.g>
      {timerEnabled ? (
        <motion.g style={{ opacity: timerOpacity }}>
          <circle
            ref={ringRef}
            cx="18"
            cy="18"
            r="15"
            pathLength={1}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="1"
            strokeDashoffset="1"
            transform="rotate(-90 18 18)"
          />
          <motion.path initial={false} animate={{ opacity: paused ? 1 : 0 }} transition={glyph} d="M15 12.5 23 18l-8 5.5z" fill="currentColor" />
          <motion.path
            initial={false}
            animate={{ opacity: paused ? 0 : 1 }}
            transition={glyph}
            d="M15.5 14v8M20.5 14v8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </motion.g>
      ) : null}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Panel                                                                */
/* ------------------------------------------------------------------ */
type PanelProps = {
  item: ApertureItem;
  index: number;
  open: boolean;
  horizontal: boolean;
  compact: boolean;
  width: number;
  activeWidth: number;
  spineWidth: number;
  panelHeight: number;
  mobileHeaderHeight: number;
  colors: Colors;
  titleSize: number;
  padding: number;
  radius: number;
  reduced: boolean;
  artTravel: number;
  motionActive: boolean;
  id: string;
  selectionKey: string;
  timerEnabled: boolean;
  progress: MotionValue<number>;
  paused: boolean;
  setButton: (node: HTMLButtonElement | null) => void;
  onToggle: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  onHoverIntent: (e: React.PointerEvent<HTMLButtonElement>) => void;
  onHoverLeave: () => void;
  onMinimum: (index: number, minimum: number) => void;
  onTimerToggle: () => void;
};

function FolioPanel(props: PanelProps) {
  const {
    item,
    index,
    open,
    horizontal,
    compact,
    width,
    activeWidth,
    spineWidth,
    panelHeight,
    mobileHeaderHeight,
    colors,
    titleSize,
    padding: pad,
    radius,
    reduced,
    artTravel,
    motionActive,
    id,
    selectionKey,
    timerEnabled,
    progress,
    paused,
  } = props;

  const headerContentRef = React.useRef<HTMLSpanElement>(null);
  const probeRef = React.useRef<HTMLSpanElement>(null);
  const copyRef = React.useRef<HTMLDivElement>(null);
  const ticketRef = React.useRef<HTMLSpanElement>(null);

  const [triggerHover, setTriggerHover] = React.useState(false);
  const [triggerFocus, setTriggerFocus] = React.useState(false);
  const [linkHover, setLinkHover] = React.useState(false);
  const [linkFocus, setLinkFocus] = React.useState(false);
  const linkEngaged = open && (linkHover || linkFocus);
  const hasLink = Boolean(item.href);
  const cover = item.coverColor || "#275077";

  /* footer trace */
  const footerProgress = useMotionValue(0);
  const footerInk = useTransform(footerProgress, [0, 1], [colors.secondary, colors.text]);
  const arrowX = useTransform(footerProgress, [0, 1], [-6, 0]);
  const arrowOpacity = useTransform(footerProgress, [0, 1], [0.45, 1]);
  useSafeLayoutEffect(() => {
    if (reduced) {
      footerProgress.jump(linkEngaged ? 1 : 0);
      return;
    }
    const a = animate(footerProgress, linkEngaged ? 1 : 0, { type: "spring", stiffness: 230, damping: 32, mass: 1, restDelta: 0.001, restSpeed: 0.005 });
    return () => a.stop();
  }, [linkEngaged, reduced, footerProgress]);

  /* artwork hover motion */
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const driftX = useSpring(pointerX, { stiffness: 180, damping: 27, mass: 1 });
  const driftY = useSpring(pointerY, { stiffness: 180, damping: 27, mass: 1 });
  const openness = useMotionValue(open ? 1 : 0);
  const artEngaged = open && (triggerHover || linkHover || triggerFocus || linkFocus);
  const hoverPose = useSpring(0, { stiffness: 90, damping: 21, mass: 1, restDelta: 1e-4, restSpeed: 0.001 });
  const floatPhase = useMotionValue(0);

  useSafeLayoutEffect(() => {
    if (reduced) {
      hoverPose.jump(0);
      return;
    }
    hoverPose.set(artEngaged && motionActive ? 1 : 0);
  }, [artEngaged, motionActive, reduced, hoverPose]);

  React.useEffect(() => {
    if (reduced || !motionActive || (!artEngaged && hoverPose.get() < 0.001)) return;
    const cycle = animate(floatPhase, floatPhase.get() + Math.PI * 2, { duration: 6.8, ease: "linear", repeat: Infinity });
    const unsubscribe = hoverPose.on("change", (v) => {
      if (!artEngaged && v < 0.001) cycle.stop();
    });
    return () => {
      unsubscribe();
      cycle.stop();
    };
  }, [artEngaged, motionActive, reduced, hoverPose, floatPhase]);

  const artAperture = () => (reduced ? 0 : smoothRange(openness.get(), 0.2, 0.95));
  const artPresence = () => hoverPose.get() * artAperture();
  const renderDriftX = useTransform(() => driftX.get() * artAperture() + Math.sin(floatPhase.get()) * 0.65 * artPresence());
  const renderDriftY = useTransform(() => driftY.get() * artAperture() + (-5 + Math.sin(floatPhase.get()) * 1.4) * artPresence());
  const renderArtScale = useTransform(() => 1 + 0.022 * artPresence());
  const renderArtRotate = useTransform(
    () =>
      ([-0.8, 0.7, -0.65, 0.9][index % 4] + Math.sin(floatPhase.get()) * 0.24) * artPresence() +
      Math.max(-0.6, Math.min(0.6, driftX.get() * 0.16)) * artAperture(),
  );

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };
  const trackPointer = (e: React.PointerEvent<HTMLElement>) => {
    if (reduced || !open || !finePointer(e)) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointerX.set(Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1)) * artTravel);
    pointerY.set(Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1)) * artTravel * 0.65);
  };
  const enterArtwork = (e: React.PointerEvent<HTMLElement>) => {
    if (!finePointer(e)) return;
    setLinkHover(true);
    trackPointer(e);
  };
  const leaveArtwork = () => {
    setLinkHover(false);
    resetPointer();
  };
  React.useEffect(() => {
    resetPointer();
    if (!open) {
      setLinkHover(false);
      setLinkFocus(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, horizontal]);

  /* measurements */
  const [metrics, setMetrics] = React.useState({
    header: horizontal ? 0 : mobileHeaderHeight,
    copy: 96,
    ticket: hasLink ? 72 : 0,
  });

  const headerHeight = horizontal ? 0 : Math.max(mobileHeaderHeight, metrics.header);
  const headerCenter = horizontal ? 40 : headerHeight / 2;
  const contentWidth = Math.max(1, horizontal ? activeWidth - spineWidth : width);
  const galleryWidth = Math.max(1, contentWidth - pad * 2);
  const imageHeight = horizontal
    ? Math.max(220, panelHeight - pad * 2 - metrics.copy - metrics.ticket)
    : Math.max(180, Math.min(390, galleryWidth * 0.98));
  const bodyHeight = pad + imageHeight + metrics.copy + metrics.ticket + pad;
  const totalHeight = horizontal ? panelHeight : headerHeight + (open ? bodyHeight : 0);
  const artworkSize = Math.max(1, Math.min(imageHeight, galleryWidth));
  const hideThumbnail = !horizontal && width < 340;

  const visualWidth = useMotionValue(width);
  const visualHeight = useMotionValue(totalHeight);

  const artX = useTransform(() => {
    const phase = clamp01(openness.get());
    const closedCenter = horizontal ? Math.min(spineWidth - 14, spineWidth * 0.92) : width - pad - 22 - 12 - 24;
    const openCenter = (horizontal ? spineWidth : 0) + pad + galleryWidth / 2;
    return mix(closedCenter, openCenter, phase) - artworkSize / 2;
  });
  const artY = useTransform(() => {
    const phase = clamp01(openness.get());
    const closedCenter = horizontal ? Math.max(visualHeight.get(), panelHeight) - 65 : headerCenter;
    const openCenter = headerHeight + pad + imageHeight / 2;
    return mix(closedCenter, openCenter, phase) - artworkSize / 2;
  });
  const openArtScale = Math.max(0.5, Math.min(1, (item.imageScale ?? 92) / 100));
  const artScale = useTransform(openness, (v) =>
    mix((horizontal ? Math.min(230, artworkSize * 0.74) : 48) / artworkSize, openArtScale, clamp01(v)),
  );
  const artOpacity = useTransform(openness, (v) => (hideThumbnail ? smoothRange(v, 0.1, 0.8) : 1));
  const bodyOpacity = useTransform(openness, (v) => (linkFocus ? 1 : smoothRange(v, 0.3, 0.92)));
  const paneOpacity = useTransform(openness, (v) => smoothRange(v, 0, 1));

  /* geometry springs — retarget together and keep velocity on interruption */
  const previousHorizontal = React.useRef(horizontal);
  useSafeLayoutEffect(() => {
    const layoutChanged = previousHorizontal.current !== horizontal;
    previousHorizontal.current = horizontal;
    if (reduced || layoutChanged) {
      visualWidth.jump(width);
      visualHeight.jump(totalHeight);
      openness.jump(open ? 1 : 0);
      return;
    }
    const a = animate(visualWidth, width, SPRING);
    const b = animate(visualHeight, totalHeight, SPRING);
    const c = animate(openness, open ? 1 : 0, { ...SPRING, restDelta: 1e-4, restSpeed: 0.001 });
    return () => {
      a.stop();
      b.stop();
      c.stop();
    };
  }, [selectionKey, open, width, totalHeight, horizontal, reduced, openness, visualWidth, visualHeight]);

  const { onMinimum } = props;
  useSafeLayoutEffect(() => {
    const measure = () => {
      const header = horizontal ? 0 : headerContentRef.current?.offsetHeight ?? 0;
      const copy = copyRef.current?.offsetHeight ?? 0;
      const ticket = ticketRef.current ? ticketRef.current.offsetHeight + 20 : 0;
      const probe = probeRef.current?.offsetHeight ?? 0;
      setMetrics((prev) =>
        Math.abs(prev.header - header) > 0.5 || Math.abs(prev.copy - copy) > 0.5 || Math.abs(prev.ticket - ticket) > 0.5
          ? { header, copy, ticket }
          : prev,
      );
      onMinimum(index, Math.max(pad * 2 + copy + ticket + 220, 94 + probe + 200));
    };
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    [headerContentRef, copyRef, ticketRef, probeRef].forEach((r) => r.current && ro.observe(r.current));
    return () => ro.disconnect();
  }, [horizontal, compact, contentWidth, pad, hasLink, index, onMinimum]);

  const sideTitleStyle: React.CSSProperties = {
    position: "absolute",
    writingMode: "vertical-rl",
    whiteSpace: "nowrap",
    fontSize: titleSize,
    lineHeight: "1.2em",
    letterSpacing: "-0.035em",
    fontWeight: 400,
    paddingInline: "0.075em",
  };

  const bodyContents = (
    <>
      <motion.span
        className="folio-art-position"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: artworkSize,
          height: artworkSize,
          x: artX,
          y: artY,
          scale: artScale,
          opacity: artOpacity,
          transformOrigin: "50% 50%",
          pointerEvents: "none",
        }}
      >
        <motion.span
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            x: renderDriftX,
            y: renderDriftY,
            scale: renderArtScale,
            rotate: renderArtRotate,
            transformOrigin: "50% 50%",
          }}
        >
          {item.image ? (
            <img
              src={item.image}
              alt={item.imageAlt || ""}
              draggable={false}
              loading="lazy"
              style={{ display: "block", width: "100%", height: "100%", objectFit: "contain", userSelect: "none" }}
            />
          ) : null}
        </motion.span>
      </motion.span>
      <div
        style={{
          position: "absolute",
          left: horizontal ? spineWidth : 0,
          top: headerHeight,
          width: contentWidth,
          height: bodyHeight,
          padding: pad,
          boxSizing: "border-box",
        }}
      >
        <div aria-hidden="true" style={{ height: imageHeight, flexShrink: 0 }} />
        <motion.div style={{ opacity: bodyOpacity }}>
          <div ref={copyRef}>
            {item.eyebrow || item.tags?.length ? (
              <div className="mb-3 flex flex-wrap items-center gap-1.5">
                {item.eyebrow ? (
                  <span className="rounded-full bg-[#0B1B2B] px-2.5 py-1 text-[11px] uppercase tracking-[0.04em] text-lime">
                    {item.eyebrow}
                  </span>
                ) : null}
                {item.tags?.map((t) => (
                  <span key={t} className="rounded-full border border-[#0B1B2B]/15 px-2.5 py-1 text-[11px] text-[#0B1B2B]/75">
                    {t}
                  </span>
                ))}
              </div>
            ) : null}
            <p
              style={{
                margin: 0,
                color: colors.secondary,
                fontSize: 16,
                lineHeight: "1.55em",
                letterSpacing: "-0.01em",
                maxWidth: 520,
              }}
            >
              {item.description}
            </p>
          </div>
          {hasLink ? (
            <span
              ref={ticketRef}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                minHeight: 52,
                marginTop: 20,
                padding: "15px 0 15px 0",
                color: colors.text,
                fontSize: 14,
                lineHeight: "1.45em",
                fontWeight: 500,
                isolation: "isolate",
              }}
            >
              <span aria-hidden="true" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: colors.text, opacity: 0.18 }} />
              <motion.span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 1,
                  background: colors.text,
                  opacity: 0.55,
                  scaleX: footerProgress,
                  transformOrigin: "0 50%",
                  pointerEvents: "none",
                }}
              />
              <motion.span style={{ color: footerInk }}>{item.linkLabel || "Explore"}</motion.span>
              <motion.svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ x: arrowX, opacity: arrowOpacity }} aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </span>
          ) : null}
        </motion.div>
      </div>
    </>
  );

  return (
    <motion.article
      className="folio-card"
      data-open={open ? "true" : "false"}
      data-trigger-engaged={triggerHover || triggerFocus ? "true" : undefined}
      data-link-engaged={linkEngaged ? "true" : undefined}
      style={{
        width: visualWidth,
        height: visualHeight,
        minHeight: horizontal ? panelHeight : headerHeight,
        position: "relative",
        flexShrink: 0,
        minWidth: 0,
        borderRadius: radius,
        overflow: "hidden",
        background: cover,
        color: colors.coverText,
      }}
    >
      <span ref={probeRef} aria-hidden="true" style={{ ...sideTitleStyle, top: 0, left: 0, visibility: "hidden", pointerEvents: "none" }}>
        {item.title}
      </span>
      <motion.span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: horizontal ? spineWidth : 0,
          top: headerHeight,
          right: 0,
          bottom: 0,
          background: item.tone,
          opacity: paneOpacity,
          pointerEvents: "none",
        }}
      />
      <span
        className="folio-keyline"
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, borderRadius: "inherit", boxShadow: "inset 0 0 0 1px currentColor", pointerEvents: "none", zIndex: 4 }}
      />
      <h3 style={{ position: "absolute", inset: 0, margin: 0, padding: 0, pointerEvents: "none", zIndex: 2 }}>
        <button
          ref={props.setButton}
          className="folio-trigger"
          type="button"
          id={`${id}-trigger-${index}`}
          aria-label={item.title}
          aria-expanded={open}
          aria-controls={`${id}-panel-${index}`}
          onClick={props.onToggle}
          onKeyDown={props.onKeyDown}
          onPointerEnter={(e) => {
            if (finePointer(e)) {
              setTriggerHover(true);
              if (!open) props.onHoverIntent(e);
            }
          }}
          onPointerMove={(e) => {
            if (!open && finePointer(e)) props.onHoverIntent(e);
          }}
          onPointerLeave={() => {
            setTriggerHover(false);
            resetPointer();
            props.onHoverLeave();
          }}
          onPointerCancel={() => {
            setTriggerHover(false);
            resetPointer();
            props.onHoverLeave();
          }}
          onFocus={(e) => setTriggerFocus(e.currentTarget.matches(":focus-visible"))}
          onBlur={() => setTriggerFocus(false)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            appearance: "none",
            border: 0,
            margin: 0,
            padding: 0,
            width: horizontal && open ? spineWidth : "100%",
            height: horizontal ? "100%" : headerHeight,
            background: "transparent",
            color: "inherit",
            font: "inherit",
            textAlign: "left",
            cursor: "pointer",
            pointerEvents: "auto",
            borderRadius: radius,
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <span
            ref={headerContentRef}
            aria-hidden="true"
            style={
              horizontal
                ? { position: "absolute", top: 0, left: 0, width: spineWidth, height: panelHeight }
                : {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    width,
                    minHeight: mobileHeaderHeight,
                    padding: pad,
                    boxSizing: "border-box",
                  }
            }
          >
            <span
              className="folio-index"
              style={
                horizontal
                  ? { position: "absolute", top: 34, left: 21, fontSize: 11, lineHeight: "1em", fontWeight: 500, letterSpacing: "0.06em", opacity: 0.7 }
                  : { width: 20, flexShrink: 0, fontSize: 11, lineHeight: "1em", fontWeight: 500, letterSpacing: "0.06em", opacity: 0.7 }
              }
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span
              style={
                horizontal
                  ? { ...sideTitleStyle, left: "50%", top: 94, transform: "translateX(-50%) rotate(180deg)" }
                  : {
                      fontSize: titleSize * (compact ? 0.7 : 0.8),
                      lineHeight: "1.08em",
                      letterSpacing: "-0.035em",
                      minWidth: 0,
                      flex: 1,
                      overflowWrap: "anywhere",
                    }
              }
            >
              {item.title}
            </span>
            {!horizontal && !hideThumbnail && item.image ? <span aria-hidden="true" style={{ width: 48, height: 48, flexShrink: 0 }} /> : null}
            {!horizontal ? <span aria-hidden="true" style={{ width: 22, height: 22, flexShrink: 0 }} /> : null}
          </span>
        </button>
      </h3>
      <div
        id={`${id}-panel-${index}`}
        role="region"
        aria-labelledby={`${id}-trigger-${index}`}
        aria-hidden={!open}
        style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}
      >
        {hasLink ? (
          <a
            className="folio-body-link"
            href={item.href}
            aria-label={`${item.linkLabel || "Explore"} — ${item.title}`}
            tabIndex={open ? 0 : -1}
            onPointerEnter={enterArtwork}
            onPointerMove={trackPointer}
            onPointerLeave={leaveArtwork}
            onPointerCancel={leaveArtwork}
            onFocus={(e) => setLinkFocus(e.currentTarget.matches(":focus-visible"))}
            onBlur={() => setLinkFocus(false)}
            style={{
              position: "absolute",
              inset: 0,
              display: "block",
              borderRadius: radius,
              color: colors.text,
              textDecoration: "none",
              cursor: "pointer",
              pointerEvents: open ? "auto" : "none",
            }}
          >
            {bodyContents}
          </a>
        ) : (
          <div
            onPointerEnter={enterArtwork}
            onPointerMove={trackPointer}
            onPointerLeave={leaveArtwork}
            onPointerCancel={leaveArtwork}
            style={{ position: "absolute", inset: 0, pointerEvents: open ? "auto" : "none" }}
          >
            {bodyContents}
          </div>
        )}
      </div>
      <span
        className="folio-mark-slot"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: horizontal ? spineWidth - 56 : width - pad - 33,
          top: headerCenter - 22,
          width: 44,
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 3,
        }}
      >
        <PanelMark openness={openness} progress={progress} timerEnabled={timerEnabled} paused={paused} reduced={reduced} />
      </span>
      {timerEnabled && open ? (
        <button
          type="button"
          className="folio-timer"
          aria-label={paused ? "Resume autoplay" : "Pause autoplay"}
          title={paused ? "Resume autoplay" : "Pause autoplay"}
          onClick={props.onTimerToggle}
          style={{
            position: "absolute",
            left: horizontal ? spineWidth - 56 : width - pad - 33,
            top: headerCenter - 22,
            width: 44,
            height: 44,
            padding: 0,
            border: 0,
            borderRadius: "50%",
            background: "transparent",
            cursor: "pointer",
            zIndex: 5,
          }}
        />
      ) : null}
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* Root                                                                 */
/* ------------------------------------------------------------------ */
type Props = {
  items: ApertureItem[];
  initialOpen?: number;
  collapsible?: boolean;
  hoverToOpen?: boolean;
  autoplay?: boolean;
  interval?: number;
  colors?: Partial<Colors>;
  titleSize?: number;
  padding?: number;
  compactPadding?: number;
  radius?: number;
  gap?: number;
  cardHeight?: number;
  closedWidth?: number;
  mobileHeaderHeight?: number;
  breakpoint?: number;
  minOpenWidth?: number;
  artTravel?: number;
  className?: string;
};

export default function ApertureAccordion({
  items,
  initialOpen = 1,
  collapsible = false,
  hoverToOpen = true,
  autoplay = false,
  interval = 6,
  colors: customColors,
  titleSize = 38,
  padding = 28,
  compactPadding = 20,
  radius = 14,
  gap = 8,
  cardHeight = 560,
  closedWidth = 112,
  mobileHeaderHeight = 96,
  breakpoint = 820,
  minOpenWidth = 460,
  artTravel = 4,
  className,
}: Props) {
  const colors = { ...DEFAULT_COLORS, ...customColors };
  const reduced = Boolean(useReducedMotion());
  const rootRef = React.useRef<HTMLDivElement>(null);
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const buttons = React.useRef<(HTMLButtonElement | null)[]>([]);
  const id = "folio-" + React.useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const n = items.length;

  const [layoutWidth, setLayoutWidth] = React.useState(0);
  const [minimumHeights, setMinimumHeights] = React.useState<Record<number, number>>({});
  const [active, setActive] = React.useState(() => Math.min(n - 1, Math.max(collapsible ? -1 : 0, initialOpen - 1)));
  const [cycle, setCycle] = React.useState(0);
  const [userPaused, setUserPaused] = React.useState(false);
  const [pointerInside, setPointerInside] = React.useState(false);
  const [inView, setInView] = React.useState(false);
  const [pageVisible, setPageVisible] = React.useState(true);

  const progress = useMotionValue(0);
  const elapsed = React.useRef(0);
  const hoverTimeout = React.useRef<number | null>(null);
  const pendingHover = React.useRef(-1);
  const hoverPosition = React.useRef({ x: 0, y: 0 });
  const lastHoverSwitch = React.useRef({ x: -9999, y: -9999, index: -1, time: 0 });

  const timerEnabled = autoplay && n > 1 && !reduced;
  const running = timerEnabled && !userPaused && !pointerInside && inView && pageVisible && active >= 0;

  const cancelHover = React.useCallback(() => {
    if (hoverTimeout.current !== null) window.clearTimeout(hoverTimeout.current);
    hoverTimeout.current = null;
    pendingHover.current = -1;
  }, []);

  const selectPanel = React.useCallback(
    (next: number) => {
      cancelHover();
      lastHoverSwitch.current = { ...hoverPosition.current, index: -1, time: 0 };
      setActive(next);
      setCycle((c) => c + 1);
      elapsed.current = 0;
    },
    [cancelHover],
  );

  /* layout measurement (before first paint) */
  useSafeLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const measure = () => setLayoutWidth((prev) => (Math.abs(prev - root.clientWidth) > 0.5 ? root.clientWidth : prev));
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  React.useEffect(() => {
    const update = () => setPageVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= 0.25), {
      threshold: [0, 0.25],
    });
    io.observe(root);
    return () => io.disconnect();
  }, []);

  /* autoplay clock */
  useSafeLayoutEffect(() => {
    elapsed.current = 0;
    progress.set(0);
  }, [active, cycle, progress]);

  React.useEffect(() => {
    if (!running) return;
    const duration = Math.max(2, interval) * 1000;
    let frame = 0;
    let previous = performance.now();
    const tick = (now: number) => {
      elapsed.current = Math.min(duration, elapsed.current + Math.max(0, now - previous));
      previous = now;
      progress.set(elapsed.current / duration);
      if (elapsed.current >= duration) {
        selectPanel((active + 1) % n);
        return;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, active, cycle, interval, n, progress, selectPanel]);

  React.useEffect(() => cancelHover, [cancelHover]);

  const onMinimum = React.useCallback((index: number, minimum: number) => {
    setMinimumHeights((prev) => (Math.abs((prev[index] || 0) - minimum) > 0.5 ? { ...prev, [index]: minimum } : prev));
  }, []);

  /* geometry */
  const horizontal = n > 0 && layoutWidth >= breakpoint;
  const gaps = Math.max(0, n - 1) * gap;
  const closedSpace = Math.max(0, n - 1) * closedWidth;
  const effectiveMinOpen = Math.max(minOpenWidth, closedWidth + titleSize * 7);
  const trackWidth = horizontal ? Math.max(layoutWidth, closedSpace + gaps + effectiveMinOpen) : layoutWidth;
  const activeWidth = Math.max(0, trackWidth - gaps - closedSpace);
  const scrollable = horizontal && trackWidth > layoutWidth + 0.5;
  const compact = layoutWidth < 600;
  const desktopHeight = Math.max(cardHeight, ...Object.values(minimumHeights));
  const equalClosedWidth = n ? Math.max(0, (trackWidth - gaps) / n) : 0;

  /* keep the open card in view when the row scrolls */
  React.useEffect(() => {
    if (!scrollable || active < 0) {
      if (viewportRef.current) viewportRef.current.scrollLeft = 0;
      return;
    }
    const t = window.setTimeout(() => {
      const viewport = viewportRef.current;
      const card = buttons.current[active]?.closest(".folio-card") as HTMLElement | null;
      if (!viewport || !card) return;
      const left = card.offsetLeft;
      const right = left + card.offsetWidth;
      let next = viewport.scrollLeft;
      if (card.offsetWidth > viewport.clientWidth || left < next) next = left;
      else if (right > next + viewport.clientWidth) next = right - viewport.clientWidth;
      viewport.scrollTo({ left: next, behavior: reduced ? "auto" : "smooth" });
    }, 420);
    return () => window.clearTimeout(t);
  }, [scrollable, active, reduced, trackWidth]);

  const hoverIntent = (index: number, e: React.PointerEvent<HTMLButtonElement>) => {
    if (!hoverToOpen || index === active || e.pointerType === "touch" || e.buttons || !finePointer(e)) return;
    const { clientX: x, clientY: y } = e;
    hoverPosition.current = { x, y };
    const last = lastHoverSwitch.current;
    // Expansion can move another cover under a stationary pointer — require fresh movement.
    if (Math.abs(x - last.x) + Math.abs(y - last.y) < 4 || pendingHover.current === index) return;
    cancelHover();
    pendingHover.current = index;
    const target = e.currentTarget;
    hoverTimeout.current = window.setTimeout(() => {
      hoverTimeout.current = null;
      pendingHover.current = -1;
      if (!target.isConnected || !target.matches(":hover")) return;
      selectPanel(index);
      lastHoverSwitch.current = { ...hoverPosition.current, index, time: performance.now() };
    }, 120);
  };

  const focusHeader = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let target = index;
    if (e.key === "ArrowDown" || (horizontal && e.key === "ArrowRight")) target = (index + 1) % n;
    else if (e.key === "ArrowUp" || (horizontal && e.key === "ArrowLeft")) target = (index - 1 + n) % n;
    else if (e.key === "Home") target = 0;
    else if (e.key === "End") target = n - 1;
    else return;
    e.preventDefault();
    buttons.current[target]?.focus({ preventScroll: scrollable });
  };

  if (!n) return null;

  return (
    <div
      ref={rootRef}
      className={["folio", className].filter(Boolean).join(" ")}
      data-layout={horizontal ? "horizontal" : "vertical"}
      style={{ position: "relative", minWidth: 0, ["--folio-focus" as string]: colors.focus }}
      onPointerMoveCapture={(e) => {
        hoverPosition.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerEnter={(e) => {
        if (e.pointerType !== "touch") setPointerInside(true);
      }}
      onPointerLeave={() => {
        setPointerInside(false);
        cancelHover();
      }}
      onPointerDownCapture={(e) => {
        if (e.pointerType === "touch" && !(e.target instanceof Element && e.target.closest(".folio-timer"))) setUserPaused(true);
      }}
    >
      <div
        ref={viewportRef}
        className="folio-viewport"
        onScroll={cancelHover}
        style={{
          width: "100%",
          minWidth: 0,
          overflowX: scrollable ? "auto" : "visible",
          overflowY: scrollable ? "hidden" : "visible",
          overscrollBehaviorX: "contain",
        }}
      >
        {layoutWidth > 0 ? (
          <div
            className="folio-track"
            style={{
              position: "relative",
              width: trackWidth,
              display: "flex",
              flexDirection: horizontal ? "row" : "column",
              alignItems: "flex-start",
              gap,
            }}
          >
            {items.map((item, index) => (
              <FolioPanel
                key={index}
                item={item}
                index={index}
                open={active === index}
                horizontal={horizontal}
                compact={compact}
                width={horizontal ? (active < 0 ? equalClosedWidth : active === index ? activeWidth : closedWidth) : layoutWidth}
                activeWidth={horizontal ? activeWidth : layoutWidth}
                spineWidth={closedWidth}
                panelHeight={desktopHeight}
                mobileHeaderHeight={mobileHeaderHeight}
                colors={colors}
                titleSize={titleSize}
                padding={compact ? compactPadding : padding}
                radius={radius}
                reduced={reduced}
                artTravel={artTravel}
                motionActive={inView && pageVisible}
                id={id}
                selectionKey={`${active}-${cycle}`}
                timerEnabled={timerEnabled}
                progress={progress}
                paused={userPaused}
                setButton={(node) => {
                  buttons.current[index] = node;
                }}
                onToggle={(e) => {
                  cancelHover();
                  if (
                    e.detail > 0 &&
                    active === index &&
                    lastHoverSwitch.current.index === index &&
                    performance.now() - lastHoverSwitch.current.time < 650
                  )
                    return;
                  if (active === index && !collapsible) return;
                  if (active === index && collapsible) setUserPaused(true);
                  selectPanel(active === index && collapsible ? -1 : index);
                }}
                onKeyDown={(e) => focusHeader(e, index)}
                onHoverIntent={(e) => hoverIntent(index, e)}
                onHoverLeave={cancelHover}
                onMinimum={onMinimum}
                onTimerToggle={() => {
                  cancelHover();
                  setUserPaused((p) => !p);
                }}
              />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
