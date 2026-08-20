"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";


/* =========================================================
   DATA DEMOCRACY — Template A · CINEMA
   project-page-template-spec.md
========================================================= */


/* G2 — word-fill paragraph (words as spans; scroll fills them) */

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


/* G6 — caption with optional read-more */

function Cap({
  text,
  more,
}: {
  text: string;
  more?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="cap">
      <p>{text}</p>

      {more && (
        <>
          <button
            type="button"
            className="more mono"
            onClick={() => setOpen(!open)}
          >
            {open ? "Read less" : "Read more"}
          </button>

          <div className={open ? "extra open" : "extra"}>
            <p>{more}</p>
          </div>
        </>
      )}
    </div>
  );
}


/* figure with G5 clip-wipe reveal */

function Frame({
  className,
  src,
  alt,
  sizes,
  priority = false,
}: {
  className: string;
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <figure className={`${className} imgreveal`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
      />
    </figure>
  );
}


export default function DataDemocracyPage() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const scope = root.current;

    if (!scope) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    /* one-shot reveals: G3 lines · G4 meta · G5 images */

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
      .querySelectorAll(".lines, .meta")
      .forEach((el) => io.observe(el));

    /*
      Clipped elements report intersectionRatio 0
      (Chrome intersects against the element's own
      clip-path), so .imgreveal needs threshold 0 —
      the rootMargin band sets the fire point instead.
    */

    const ioClip = new IntersectionObserver(
      (entries) => reveal(ioClip)(entries),
      { threshold: 0, rootMargin: "0px 0px -12% 0px" }
    );

    scope
      .querySelectorAll(".imgreveal")
      .forEach((el) => ioClip.observe(el));

    /* G2 — scroll-linked word fill (scrubs both directions) */

    const paragraphs = Array.from(
      scope.querySelectorAll<HTMLElement>(".wordfill")
    );

    let raf = 0;

    const fillWords = () => {
      raf = 0;

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

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(fillWords);
    };

    if (!reduced) {
      window.addEventListener("scroll", onScroll, {
        passive: true,
      });

      fillWords();
    }

    return () => {
      io.disconnect();
      ioClip.disconnect();

      window.removeEventListener("scroll", onScroll);

      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <main className="projectCinema" ref={root}>

      {/* =====================================================
          HERO — full-bleed model photograph
      ====================================================== */}

      <section className="hero">

        <div className="heroArt">
          <Image
            src="/images/data-democracy/01-hero-model.jpg"
            alt="Data Democracy concept model — actuator arms and platters of dismantled hard drives rebuilt as a memory machine"
            fill
            sizes="100vw"
            priority
          />
        </div>

        <div className="heroTitle">

          <span className="mono">
            Memory Center / Record × Store × Retrieve
          </span>

          <Lines
            as="h1"
            lines={["Data", "Democracy"]}
          />

        </div>

        <span className="cue mono">Scroll ↓</span>

      </section>


      {/* =====================================================
          G4 — META STRIP
      ====================================================== */}

      <div className="meta">

        <div>
          <span className="mono">Type</span>
          <b>Spatial Installation · Research</b>
        </div>

        <div>
          <span className="mono">Year</span>
          <b>Fall 2022 — Redeveloped Fall 2024</b>
        </div>

        <div>
          <span className="mono">Materials</span>
          <b>Metal, found objects, M2 screws, disassembled hard-disk parts</b>
        </div>

        <div>
          <span className="mono">Scale</span>
          <b>Approx. 500 × 500 × 400 mm</b>
        </div>

      </div>


      {/* =====================================================
          G2 — WORD-FILL INTRO
      ====================================================== */}

      <section className="intro">

        <WordFill text="The data center zone holds the archives of many museums at once — not as a vault, but as a working system for input, storage, computation, and release." />

        <WordFill text="We digitize those collections for open-source access in education and research: the act of retrieval. The workflow itself is on display, alongside the history of digital data that made it possible." />

        <WordFill text="An inquiry into the accessibility of data and knowledge in the modern era — how architecture can serve the storage and transmission of human heritage." />

      </section>


      {/* =====================================================
          CHAPTER 01 — RECORD
      ====================================================== */}

      <section className="chapter">

        <div className="pin">
          <span className="mono">01 — Record</span>
        </div>

        <div className="media">

          <div>
            <Frame
              className="full"
              src="/images/data-democracy/04-coil-detail.jpg"
              alt="Voice coils and actuator arms wired into the model — the machinery of writing memory"
              sizes="100vw"
            />

            <Cap
              text="Recording as a spatial act: information is collected, indexed, and given physical presence."
              more="The data center zone is a database of the physical archives of multiple museums — an agglomerate of infrastructures for input, storage, computation, and redistribution of useful digital data."
            />
          </div>

          <div className="pair">

            <Frame
              className="ph"
              src="/images/data-democracy/05-flatlay-index.jpg"
              alt="Disassembled hard drives laid out and indexed on a cutting mat"
              sizes="(max-width: 760px) 100vw, 50vw"
            />

            <Frame
              className="ph"
              src="/images/data-democracy/03-platter-detail.jpg"
              alt="Close-up of stacked platters and read arms in the model"
              sizes="(max-width: 760px) 100vw, 50vw"
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          CHAPTER 02 — STORE
      ====================================================== */}

      <section className="chapter">

        <div className="pin">
          <span className="mono">02 — Store</span>
        </div>

        <div className="media">

          <div>
            <Frame
              className="full"
              src="/images/data-democracy/02-inverted-white.jpg"
              alt="Inverted study of the model — platters and arms as an architecture of storage"
              sizes="100vw"
            />

            <Cap
              text="Repetition, density, and mechanical organization shape the atmosphere of the space."
              more="Metal, found objects, and M2 screws hold the dismantled drives in ordered stacks — approx. 500 × 500 × 400 mm of working archive."
            />
          </div>

          <div className="single">
            <Frame
              className="ph"
              src="/images/data-democracy/06-sectioned-drives.jpg"
              alt="Sectioned hard drives standing upright on the master plan"
              sizes="(max-width: 760px) 100vw, 560px"
            />

            <Cap text="Sectioned drives stand on the master plan as archive volumes — the model as a stack of memory." />
          </div>

        </div>

      </section>


      {/* =====================================================
          PULL QUOTE
      ====================================================== */}

      <section className="quote">
        <Lines
          lines={["Storage becomes", "architecture."]}
        />
      </section>


      {/* =====================================================
          CHAPTER 03 — RETRIEVE
      ====================================================== */}

      <section className="chapter">

        <div className="pin">
          <span className="mono">03 — Retrieve</span>
        </div>

        <div className="media">

          <div>
            <Cap
              text="Retrieval reconnects people with accumulated memory, revealing the relationship between bodies, machines, and information."
              more="The museum zone displays the workflow of digitizing collections from other institutions, alongside the history and development of digital data — open-source access for education and research."
            />
          </div>

        </div>

      </section>


      {/* =====================================================
          CREDITS + RECOGNITION
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
          <em>ELLdesign — LA · HK</em>
        </div>

        <div className="row">
          <span className="mono">Award</span>
          <em>Architizer Vision Awards — Finalist · Concept Model</em>
        </div>

        <div className="row">
          <span className="mono">Exhibition</span>
          <em>Architizer Vision Awards Gallery</em>
        </div>

      </section>


      {/* =====================================================
          G7 — PREV / NEXT
      ====================================================== */}

      <div className="pn">

        <Link
          href="/woaw-gallery"
          data-transition
          data-cursor="view"
          data-cursor-label="VIEW →"
        >
          <span className="mono">← Prev Project</span>
          <h3>WOAW Gallery</h3>
        </Link>

        <Link
          href="/culture-transit"
          data-transition
          data-cursor="view"
          data-cursor-label="VIEW →"
          style={{ textAlign: "right" }}
        >
          <span className="mono">Next Project →</span>
          <h3>Cultures In Transit</h3>
        </Link>

      </div>

    </main>
  );
}
