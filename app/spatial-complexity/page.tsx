"use client";

import Link from "next/link";
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
} from "react";


/* =========================================================
   MEMENTO — Template A · CINEMA
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


export default function MementoPage() {
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
    <main
      className="projectCinema"
      ref={root}
      style={{ ["--accent" as string]: "#7d8aa0" }}
    >

      {/* =====================================================
          HERO — suspended fragment model
      ====================================================== */}

      <section className="hero">

        <div className="heroArt">
          <Image
            src="/images/memento/01-suspended-model.jpg"
            alt="Memento concept model — white wall fragments suspended between planes, an inhabitable boundary in section"
            fill
            sizes="100vw"
            priority
          />
        </div>

        <div className="heroTitle">

          <span className="mono">
            Spatial Complexity / Border × Wall × Encounter
          </span>

          <Lines
            as="h1"
            lines={["Memento"]}
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
          <b>Experimental Space · Spatial Experience</b>
        </div>

        <div>
          <span className="mono">Year</span>
          <b>2024</b>
        </div>

        <div>
          <span className="mono">Site</span>
          <b>Hong Kong — Shenzhen border · Lin Ma Hang ↔ Chang Ling</b>
        </div>

        <div>
          <span className="mono">Method</span>
          <b>Fragmentation · Layering · Spatial Transition</b>
        </div>

      </div>


      {/* =====================================================
          G2 — WORD-FILL INTRO
      ====================================================== */}

      <section className="intro">

        <WordFill text="Memento explores the spatial complexity of boundaries — memory, time, and human encounter — within a neglected hundred-meter strip between Shenzhen and Hong Kong." />

        <WordFill text="It began as a personal experience of the pandemic: with every crossing closed, people from both cities came to meet across four layers of barbed wire." />

        <WordFill text="Rather than erasing the boundary, the project reconstructs it as both boundary and link — a space where separation, shared memory, nature, and dual identities coexist." />

      </section>


      {/* =====================================================
          CHAPTER 01 — BORDER
      ====================================================== */}

      <section className="chapter">

        <div className="pin">
          <span className="mono">01 — Border</span>
        </div>

        <div className="media">

          <div>
            <Frame
              className="full"
              src="/images/memento/03-wire-field.jpg"
              alt="Field of tensioned wires and structures — the layered barbed-wire territory of the border strip"
              sizes="100vw"
            />

            <Cap
              text="A neglected strip, a hundred meters wide — roads, wasteland, and four layers of fencing between two cities."
              more="The border is read not as a line but as a territory with thickness. The four layers of wire that once held people apart are reinterpreted as a spatial memento of a particular historical moment — the project's name, and its brief."
            />
          </div>

          <div className="pair">

            <Frame
              className="ph phWide"
              src="/images/memento/02-eroded-city.jpg"
              alt="Dark study — city fabric eroding into suspended fragments over the void"
              sizes="(max-width: 760px) 100vw, 50vw"
            />

            <Frame
              className="ph phWide"
              src="/images/memento/05-border-plan.jpg"
              alt="Cut-plan model of the border strip — settlement fabric on one side, shadow territory on the other"
              sizes="(max-width: 760px) 100vw, 50vw"
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          CHAPTER 02 — WALL
      ====================================================== */}

      <section className="chapter">

        <div className="pin">
          <span className="mono">02 — Wall</span>
        </div>

        <div className="media">

          <div>
            <Frame
              className="full"
              src="/images/memento/04-layered-model.jpg"
              alt="Layered cut-paper model — plans and elevations stacked as strata of the wall"
              sizes="100vw"
            />

            <Cap
              text="Existing plans are deconstructed — overlapped, shifted, rotated — and translated from drawing into three-dimensional space."
              more="The same operations are then applied to the wall itself. No longer a simple element of separation, it becomes a device that carries movement, events, perception, and memory."
            />
          </div>

          <div className="single">
            <Frame
              className="ph phSquare"
              src="/images/memento/06-wall-axonometric.png"
              alt="Wireframe axonometric — the wall opened as an inhabitable section"
              sizes="(max-width: 760px) 100vw, 560px"
            />

            <Cap text="The wall opened as an inhabitable section — thresholds, stairs, and chambers inside the boundary." />
          </div>

        </div>

      </section>


      {/* =====================================================
          PULL QUOTE
      ====================================================== */}

      <section className="quote">
        <Lines
          lines={["Must a wall", "remain a barrier?"]}
        />
      </section>


      {/* =====================================================
          CHAPTER 03 — ENCOUNTER
      ====================================================== */}

      <section className="chapter">

        <div className="pin">
          <span className="mono">03 — Encounter</span>
        </div>

        <div className="media">

          <div>
            <Frame
              className="full"
              src="/images/memento/07-memory-reel.png"
              alt="Storyboard reel — sequences of approach, glimpse, and meeting along the wall, watched by pairs of eyes"
              sizes="100vw"
            />

            <Cap
              text="The linear barrier unfolds into a fragmented, diachronic sequence — encounters recorded frame by frame."
              more="Layers of walls, paths, openings, and interstitial spaces expand the narrow territory into a landscape of encounters, where different moments and memories overlap as visitors move through it."
            />
          </div>

          <div>

            <div className="pair">

              <Frame
                className="ph"
                src="/images/memento/08-encounter-walls.jpg"
                alt="A visitor walks among fractured concrete plates, a green glimpse opening between them"
                sizes="(max-width: 760px) 100vw, 50vw"
              />

              <Frame
                className="ph"
                src="/images/memento/09-stair-passage.jpg"
                alt="A figure climbs the winding stair inside the wall toward a lit opening"
                sizes="(max-width: 760px) 100vw, 50vw"
              />

            </div>

            <Cap text="Between the two cities, the landscape keeps growing and the Lin Ma Hang Stream keeps flowing — human boundaries set against continuities that ignore them." />
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
          <em>Exl Studio — LA · HK</em>
        </div>

      </section>


      {/* =====================================================
          G7 — PREV / NEXT
      ====================================================== */}

      <div className="pn">

        <Link
          href="/luna"
          data-transition
          data-cursor="view"
          data-cursor-label="VIEW →"
        >
          <span className="mono">← Prev Project</span>
          <h3>Lunar Frontier</h3>
        </Link>

        <Link
          href="/woaw-gallery"
          data-transition
          data-cursor="view"
          data-cursor-label="VIEW →"
          style={{ textAlign: "right" }}
        >
          <span className="mono">Next Project →</span>
          <h3>WOAW Gallery</h3>
        </Link>

      </div>

    </main>
  );
}
