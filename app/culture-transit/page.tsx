"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";


/* =========================================================
   CULTURES IN TRANSIT — Template D · PANORAMA
   cultures-in-transit-spec.md
========================================================= */


/* G2 — word-fill paragraph */

function WordFill({ text }: { text: string }) {
  return (
    <p className="wordfill">
      {text.split(/\s+/).map((word, i) => (
        <span key={i} className="w">
          {word}{" "}
        </span>
      ))}
    </p>
  );
}


/* G3 — line-mask heading */

function Lines({
  as: Tag = "h2",
  lines,
  className = "",
}: {
  as?: "h1" | "h2";
  lines: string[];
  className?: string;
}) {
  return (
    <Tag className={`lines ${className}`.trim()}>
      {lines.map((line) => (
        <span key={line} className="l">
          <i>{line}</i>
        </span>
      ))}
    </Tag>
  );
}


/* P1 — panorama window markup (engine binds in useEffect) */

function Pano({
  src,
  alt,
  drift = 12,
  className = "",
}: {
  src: string;
  alt: string;
  drift?: number;
  className?: string;
}) {
  return (
    <figure
      className={`pano ${className}`.trim()}
      data-drift={drift}
      tabIndex={0}
    >
      <div className="track">
        {/* strips exceed the frame by design; the engine pans them */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} draggable={false} loading="lazy" decoding="async" />
      </div>

      <div className="pill">
        <span>Drag to explore</span>
        <i>→</i>
      </div>

      <div className="edge left" />
      <div className="edge right" />

      <div className="prog">
        <i />
      </div>
    </figure>
  );
}


const SECTIONS = [
  {
    num: "01",
    title: "World-Building",
    flip: false,
    src: "/images/culture-transit/pano-01-worldbuilding.png",
    alt: "World-building panorama — landscapes, interiors, musicians, and cultural fragments sharing one visual language along the journey",
    body: [
      "The journey becomes a continuous world in which landscapes, interiors, objects, characters, and cultural fragments coexist within a single visual language.",
      "Rather than designing isolated scenes, the project constructs a spatial universe with its own logic of movement, transformation, and encounter.",
    ],
  },
  {
    num: "02",
    title: "Scenic System",
    flip: true,
    src: "/images/culture-transit/pano-02-scenic.png",
    alt: "Scenic system panorama — modular objects, creatures, and balloons entering and recombining across the mountain landscape",
    body: [
      "Cultural elements are translated into modular objects, programs, and spatial components that can enter, disappear, recombine, and transform throughout the journey.",
      "Space is treated not as a static composition, but as a system capable of continuous scenic transformation.",
    ],
  },
  {
    num: "03",
    title: "Sequence & Transformation",
    flip: false,
    src: "/images/culture-transit/pano-03-timetable.png",
    alt: "Journey timetable panorama — the train elevation with coded cabins mapping how objects and programs transfer between locations",
    body: [
      "A detailed journey timetable maps how objects, programs, and cultural references move between locations and transform through exchange.",
      "Each element is coded by time, place, and transfer path, turning the journey into a legible sequence of spatial and cultural transformations.",
    ],
  },
  {
    num: "04",
    title: "A World at Human Scale",
    flip: true,
    src: "/images/culture-transit/pano-04-humanscale.png",
    alt: "Human-scale panorama — passengers, corridors, and the Harmless Dojo seen from inside the moving train",
    body: [
      "Rather than presenting the world from a single fixed viewpoint, the panorama unfolds through movement.",
      "Windows, frames, foregrounds, and distant scenes control what is revealed, concealed, and discovered along the journey.",
    ],
  },
];


export default function CultureTransitPage() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const scope = root.current;

    if (!scope) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const finePointer = window.matchMedia("(pointer: fine)").matches;

    /* ---------- one-shot reveals (kit) ---------- */

    const reveal = (io: IntersectionObserver) => (
      entries: IntersectionObserverEntry[]
    ) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-in");

        io.unobserve(entry.target);
      });
    };

    const io = new IntersectionObserver(
      (entries) => reveal(io)(entries),
      { threshold: 0.2 }
    );

    scope
      .querySelectorAll(".lines, .panoBody, .closeArrow")
      .forEach((el) => io.observe(el));

    /* clip-wiped panos need threshold 0 (clip-path intersection) */

    const ioClip = new IntersectionObserver(
      (entries) => reveal(ioClip)(entries),
      { threshold: 0, rootMargin: "0px 0px -12% 0px" }
    );

    scope
      .querySelectorAll(".imgreveal")
      .forEach((el) => ioClip.observe(el));

    /* ---------- G2 word fill ---------- */

    const paragraphs = Array.from(
      scope.querySelectorAll<HTMLElement>(".wordfill")
    );

    const fillWords = () => {
      const vh = window.innerHeight;

      const start = vh * 0.8;
      const end = vh * 0.35;

      paragraphs.forEach((p) => {
        const r = p.getBoundingClientRect();

        const t = Math.min(
          1,
          Math.max(0, (start - r.top) / (start - end + r.height))
        );

        const words = p.querySelectorAll(".w");
        const lit = Math.floor(t * words.length);

        words.forEach((w, i) =>
          w.classList.toggle("on", i < lit)
        );
      });
    };

    /* ---------- P1 — pano physics engine ---------- */

    type PanoCtl = {
      el: HTMLElement;
      track: HTMLElement;
      pill: HTMLElement | null;
      prog: HTMLElement | null;
      x: number;
      tx: number;
      v: number;
      drift: number;
      driftDir: number;
      dragging: boolean;
      visible: boolean;
      revealed: boolean;
      revealedAt: number;
      lastTouch: number;
      px: number;
      pillX: number;
      pillY: number;
      pillTX: number;
      pillTY: number;
      pillIn: boolean;
      hoverAt: number;
      pulsed: boolean;
    };

    const ctls: PanoCtl[] = [];

    const makeCtl = (el: HTMLElement): PanoCtl => {
      const ctl: PanoCtl = {
        el,
        track: el.querySelector(".track") as HTMLElement,
        pill: el.querySelector(".pill"),
        prog: el.querySelector(".prog i"),
        x: 0,
        tx: 0,
        v: 0,
        drift: Number(el.dataset.drift) || 0,
        driftDir: 1,
        dragging: false,
        visible: false,
        revealed: false,
        revealedAt: 0,
        lastTouch: 0,
        px: 0,
        pillX: -100,
        pillY: -100,
        pillTX: -100,
        pillTY: -100,
        pillIn: false,
        hoverAt: 0,
        pulsed: false,
      };

      const max = () =>
        Math.max(0, ctl.track.scrollWidth - el.clientWidth);

      el.addEventListener("pointerdown", (e) => {
        ctl.dragging = true;
        ctl.v = 0;
        ctl.px = e.clientX;
        ctl.lastTouch = performance.now();

        el.setPointerCapture(e.pointerId);
        el.classList.add("grabbing");

        ctl.pill?.classList.add("drag");
      });

      el.addEventListener("pointermove", (e) => {
        if (finePointer && ctl.pill && !ctl.pill.classList.contains("static")) {
          const r = el.getBoundingClientRect();

          ctl.pillTX = e.clientX - r.left;
          ctl.pillTY = e.clientY - r.top;

          if (!ctl.pillIn) {
            ctl.pillIn = true;
            ctl.pillX = ctl.pillTX;
            ctl.pillY = ctl.pillTY;
            ctl.pill.classList.add("in");
            ctl.hoverAt = performance.now();
          }
        }

        if (!ctl.dragging) return;

        const dx = e.clientX - ctl.px;
        ctl.px = e.clientX;

        ctl.tx = Math.min(max(), Math.max(0, ctl.tx - dx));
        ctl.v = -dx;
        ctl.lastTouch = performance.now();
      });

      const up = () => {
        ctl.dragging = false;
        ctl.lastTouch = performance.now();

        el.classList.remove("grabbing");
        ctl.pill?.classList.remove("drag");
      };

      el.addEventListener("pointerup", up);
      el.addEventListener("pointercancel", up);

      el.addEventListener("pointerleave", () => {
        if (ctl.pill && !ctl.pill.classList.contains("static")) {
          ctl.pillIn = false;
          ctl.pill.classList.remove("in");
        }
      });

      /* horizontal wheel / trackpad swipe pans */
      el.addEventListener(
        "wheel",
        (e) => {
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.preventDefault();

            ctl.tx = Math.min(max(), Math.max(0, ctl.tx + e.deltaX));
            ctl.lastTouch = performance.now();
          }
        },
        { passive: false }
      );

      /* keyboard — ←/→ nudge 80px through the same lerp */
      el.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault();

          const step = e.key === "ArrowRight" ? 80 : -80;

          ctl.tx = Math.min(max(), Math.max(0, ctl.tx + step));
          ctl.lastTouch = performance.now();
        }
      });

      return ctl;
    };

    const panos = Array.from(
      scope.querySelectorAll<HTMLElement>(".pano")
    );

    if (!reduced) {
      panos.forEach((el) => ctls.push(makeCtl(el)));

      /* touch: one-time static swipe hint instead of cursor pill */
      if (!finePointer) {
        ctls.forEach((ctl) => {
          ctl.pill?.classList.add("static", "in");
        });
      }
    }

    /* visibility gating — off-screen windows do zero work */

    const ioPano = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const ctl = ctls.find((c) => c.el === entry.target);

          if (ctl) ctl.visible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );

    if (!reduced) panos.forEach((el) => ioPano.observe(el));

    /* drift waits for the clip wipe to land (spec: +600ms) */

    const markRevealed = () => {
      ctls.forEach((ctl) => {
        if (!ctl.revealed && ctl.el.classList.contains("is-in")) {
          ctl.revealed = true;
          ctl.revealedAt = performance.now();
        }
      });
    };

    /* ---------- P4 — finale zoom-out + parallax ---------- */

    const finale = scope.querySelector<HTMLElement>(".finale");
    const finaleScale = scope.querySelector<HTMLElement>(".finaleScale");
    const skyTrack = scope.querySelector<HTMLElement>(
      ".finaleRow.sky .track"
    );
    const finalePanoEl = scope.querySelector<HTMLElement>(
      ".finale .pano"
    );

    let finaleVisible = false;

    const ioFinale = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          finaleVisible = e.isIntersecting;
        });
      },
      { threshold: 0 }
    );

    if (finale) ioFinale.observe(finale);

    /* ---------- the one rAF loop ---------- */

    let raf = 0;
    let last = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      markRevealed();

      ctls.forEach((ctl) => {
        const max = Math.max(
          0,
          ctl.track.scrollWidth - ctl.el.clientWidth
        );

        if (!ctl.dragging) {
          if (Math.abs(ctl.v) > 0.1) {
            /* momentum after release */
            ctl.tx = Math.min(max, Math.max(0, ctl.tx + ctl.v));
            ctl.v *= 0.94;
          } else if (
            ctl.visible &&
            ctl.drift &&
            ctl.revealed &&
            now - ctl.revealedAt > 600 &&
            now - ctl.lastTouch > 2000
          ) {
            /* auto-drift — the train never stops */
            ctl.tx += ctl.drift * ctl.driftDir * dt;

            if (ctl.tx >= max) ctl.driftDir = -1;
            if (ctl.tx <= 0) ctl.driftDir = 1;

            ctl.tx = Math.min(max, Math.max(0, ctl.tx));
          }
        }

        /* the lerp is the fluency */
        ctl.x += (ctl.tx - ctl.x) * 0.12;

        ctl.track.style.transform = `translate3d(${(-ctl.x).toFixed(
          2
        )}px, 0, 0)`;

        if (ctl.prog) {
          ctl.prog.style.width =
            (max ? (ctl.x / max) * 100 : 0) + "%";
        }

        /* pill follow + idle pulse */
        if (ctl.pill && ctl.pillIn) {
          ctl.pillX += (ctl.pillTX - ctl.pillX) * 0.15;
          ctl.pillY += (ctl.pillTY - ctl.pillY) * 0.15;

          ctl.pill.style.transform = `translate3d(${(
            ctl.pillX + 14
          ).toFixed(1)}px, ${(ctl.pillY + 14).toFixed(1)}px, 0)`;

          if (
            !ctl.pulsed &&
            !ctl.dragging &&
            now - ctl.hoverAt > 1500 &&
            now - ctl.lastTouch > 1500
          ) {
            ctl.pulsed = true;
            ctl.pill.classList.add("pulse");
          }
        }
      });

      /* finale scrub — scale 1.6 → 1, blur 6px → 0, both directions */

      if (finale && finaleScale && finaleVisible && !reduced) {
        const r = finale.getBoundingClientRect();

        const total = r.height - window.innerHeight;

        const p = Math.min(1, Math.max(0, -r.top / total));

        const scale = 1.6 - 0.6 * p;
        const blur = 6 * (1 - p);

        finaleScale.style.transform = `scale(${scale.toFixed(4)})`;
        finaleScale.style.filter =
          blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : "none";

        /* two-layer parallax: sky rides at 0.6× the train's pan */
        if (skyTrack && finalePanoEl) {
          const trainCtl = ctls.find((c) => c.el === finalePanoEl);

          if (trainCtl) {
            skyTrack.style.transform = `translate3d(${(
              -trainCtl.x * 0.6
            ).toFixed(2)}px, 0, 0)`;
          }
        }
      }

      if (!reduced) fillWords();

      raf = requestAnimationFrame(loop);
    };

    if (!reduced) {
      raf = requestAnimationFrame(loop);
    } else {
      /* reduced motion: everything settled and lit */
      paragraphs.forEach((p) =>
        p.querySelectorAll(".w").forEach((w) => w.classList.add("on"))
      );
    }

    return () => {
      io.disconnect();
      ioClip.disconnect();
      ioPano.disconnect();
      ioFinale.disconnect();

      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <main className="projectCinema projectPano" ref={root}>

      {/* =====================================================
          P3 — HERO
      ====================================================== */}

      <section className="pjHero">

        <span className="mono">
          Stage / Spatial Design — The Orient Express
        </span>

        <Lines
          as="h1"
          lines={["Cultures", "In Transit"]}
        />

      </section>


      {/* =====================================================
          G2 — WORD-FILL INTRO
      ====================================================== */}

      <section className="intro">

        <WordFill text="A continuous narrative world where space, movement, and cultural fragments unfold as a choreographed journey." />

        <WordFill text="Set along the route of the Orient Express, the project transforms cultural encounters between cities into an evolving spatial narrative." />

      </section>


      {/* =====================================================
          P2 — SECTIONS 01–04 (train windows)
      ====================================================== */}

      {SECTIONS.map((s) => (

        <section
          key={s.num}
          className={s.flip ? "panoSection flip" : "panoSection"}
        >

          <div className="panoText">

            <span className="panoNum">{s.num}</span>

            <Lines lines={[s.title]} />

            <div className="panoBody">
              {s.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

          </div>

          <Pano
            className="imgreveal"
            src={s.src}
            alt={s.alt}
            drift={12}
          />

        </section>

      ))}


      {/* =====================================================
          P4 — CLOSING STATEMENT
      ====================================================== */}

      <section className="panoClose">

        <Lines
          lines={[
            "The audience does not simply look at the world.",
            "They move through it.",
          ]}
        />

        <svg
          className="closeArrow"
          viewBox="0 0 26 64"
          aria-hidden="true"
        >
          <path d="M13 2 V58 M3 48 L13 60 L23 48" />
        </svg>

      </section>


      {/* =====================================================
          P4 — FINALE: arrival, the whole world at once
      ====================================================== */}

      <section className="finale">

        <div className="finaleStick">

          <div className="finaleScale">

            <div className="finaleRow sky">
              <div className="track">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/culture-transit/pano-02-scenic.png"
                  alt="Sky layer of the full panorama — the landscape world above the line"
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <Pano
              src="/images/culture-transit/pano-03-timetable.png"
              alt="The full train elevation — ride the whole journey before the credits"
              drift={8}
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          CREDITS
      ====================================================== */}

      <section className="credits">

        <div className="row">
          <span className="mono">Spatial Design</span>
          <em>Leo</em>
        </div>

        <div className="row">
          <span className="mono">Production Design</span>
          <em>Effa</em>
        </div>

        <div className="row">
          <span className="mono">Design Engineering</span>
          <em>Lila</em>
        </div>

        <div className="row">
          <span className="mono">Studio</span>
          <em>ELLDdesign — LA · HK</em>
        </div>

      </section>


      {/* =====================================================
          G7 — PREV / NEXT (/work order: 01 ← 02 → 03)
      ====================================================== */}

      <div className="pn">

        <Link
          href="/data-center-memory-democracy"
          data-transition
          data-cursor="view"
          data-cursor-label="VIEW →"
        >
          <span className="mono">← Prev Project</span>
          <h3>Data Democracy</h3>
        </Link>

        <Link
          href="/adaptive-reuse-architecture"
          data-transition
          data-cursor="view"
          data-cursor-label="VIEW →"
          style={{ textAlign: "right" }}
        >
          <span className="mono">Next Project →</span>
          <h3>Within The Existing</h3>
        </Link>

      </div>

    </main>
  );
}
