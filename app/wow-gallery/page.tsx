"use client";

import Link from "next/link";
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
} from "react";


/* =========================================================
   WOW GALLERY — Template B · DOSSIER
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
  as?: "h1" | "h2" | "h3";
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


/* reserved slot for copy still being written */

function Tbd({ label }: { label: string }) {
  return (
    <div className="tbd">
      <b>Text to come</b>
      <span>{label}</span>
    </div>
  );
}


/* figure with G5 clip-wipe reveal */

function Frame({
  className,
  src,
  alt,
  sizes,
  priority,
}: {
  className: string;
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <figure className={`ph ${className} imgreveal`}>
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


const SECTIONS = [
  { id: "s1", label: "Gallery Floor" },
  { id: "s2", label: "Section & Frame" },
  { id: "s3", label: "Opening Night" },
];


export default function WowGalleryPage() {
  const root = useRef<HTMLElement>(null);

  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setEntered(true));

    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const scope = root.current;

    if (!scope) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    /* one-shot reveals: G3 lines · G4 meta table */

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
      .querySelectorAll(".lines, .mtable")
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

    /* scroll-spy — rail index follows the visible section */

    const links = Array.from(
      scope.querySelectorAll<HTMLAnchorElement>(".index a")
    );

    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const id = (entry.target as HTMLElement).dataset.s;

          links.forEach((a) =>
            a.classList.toggle("active", a.dataset.s === id)
          );
        });
      },
      { rootMargin: "-30% 0px -55% 0px" }
    );

    scope
      .querySelectorAll("section.doc")
      .forEach((el) => spy.observe(el));

    /* G2 — scroll-linked word fill (scrubs both directions) */

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

    let raf = 0;

    const onFrame = () => {
      raf = 0;

      fillWords();
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(onFrame);
    };

    if (!reduced) {
      window.addEventListener("scroll", onScroll, {
        passive: true,
      });

      window.addEventListener("resize", onScroll, {
        passive: true,
      });

      fillWords();
    }

    return () => {
      io.disconnect();
      ioClip.disconnect();
      spy.disconnect();

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);

      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <main
      className={`projectDossier${entered ? " entered" : ""}`}
      ref={root}
    >

      <div className="dossier">

        {/* ===================================================
            RAIL — title · meta · index (sticky)
        ==================================================== */}

        <aside className="rail">
          <div className="stick">

            <span className="mono railKicker">
              Project 06 · Interior · Spatial Experience
            </span>

            <Lines
              as="h1"
              lines={["WOW", "Gallery"]}
            />

            {/* G4 — meta table */}

            <div className="mtable">

              <div className="row">
                <span className="mono">Type</span>
                <em>Interior · Spatial Experience</em>
              </div>

              <div className="row">
                <span className="mono">Year</span>
                <em>2024</em>
              </div>

              <div className="row">
                <span className="mono">Programme</span>
                <em>Exhibitions · Events</em>
              </div>

              <div className="row">
                <span className="mono">Studio</span>
                <em>ELLDdesign — LA · HK</em>
              </div>

            </div>

            {/* section index — scroll-spy */}

            <nav className="index">
              {SECTIONS.map((section, i) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  data-s={section.id}
                  className={i === 0 ? "active" : undefined}
                >
                  <span>{`0${i + 1}`}</span>
                  <span>{section.label}</span>
                </a>
              ))}
            </nav>

          </div>
        </aside>


        {/* ===================================================
            COLUMN — the documents
        ==================================================== */}

        <div className="col">

          {/* hero — inset, not full-bleed: a document, not a film */}

          <Frame
            className="heroPh"
            src="/images/wow-gallery/01-facade-night.jpg"
            alt="WOW Gallery at night — the folding steel awning lifted above the glazed storefront, upper window glowing, exhibition titles printed on the glass"
            sizes="(max-width: 900px) 100vw, 840px"
            priority
          />

          {/* G2 — word-fill intro · copy pending */}

          <section className="intro">
            <WordFill text="WOW Gallery — introduction copy to come." />

            <Tbd label="Intro — 2–3 short sentences. The word-fill scroll effect already runs on this slot; replace the line above." />
          </section>


          {/* =================================================
              01 — GALLERY FLOOR
          ================================================== */}

          <section className="doc" id="s1" data-s="s1">

            <span className="mono">01 — Gallery Floor</span>

            <div className="block">
              <Frame
                className="wide"
                src="/images/wow-gallery/02-exhibition-paintings.jpg"
                alt="Ground floor in use — large paintings hung on the perforated steel wall beside the brass stair rail"
                sizes="(max-width: 900px) 100vw, 62vw"
              />

              <Tbd label="Caption for the perforated wall / hanging system." />
            </div>

            <div className="block">
              <Frame
                className="wide"
                src="/images/wow-gallery/03-exhibition-text-wall.jpg"
                alt="Exhibition text wall by the entrance, a single small canvas beside the polycarbonate under-stair enclosure"
                sizes="(max-width: 900px) 100vw, 62vw"
              />

              <Tbd label="Caption for the text wall and under-stair." />
            </div>

          </section>


          {/* in-flow statement · copy pending */}

          <div className="bodyState">
            <Lines
              as="h3"
              lines={["Statement to come —", "one line about the space."]}
            />

            <Tbd label="Replace with the section statement (line-mask reveal applies)." />
          </div>


          {/* =================================================
              02 — SECTION & FRAME
          ================================================== */}

          <section className="doc" id="s2" data-s="s2">

            <span className="mono">02 — Section &amp; Frame</span>

            <div className="block">
              <Frame
                className="xwide"
                src="/images/wow-gallery/04-long-section.jpg"
                alt="Long section — the two-storey gallery cut open: reading loft above, exhibition floor and under-stair alcove below, the orange stair rail running through"
                sizes="(max-width: 900px) 100vw, 62vw"
              />

              <Tbd label="Caption for the long section." />
            </div>

            <div className="block">
              <Frame
                className="sq"
                src="/images/wow-gallery/05-interior-perspective.jpg"
                alt="Interior perspective — mezzanine with silver curtain and orange rail above the storefront glazing"
                sizes="(max-width: 900px) 100vw, 45vw"
              />

              <Tbd label="Caption for the perspective view." />
            </div>

          </section>


          {/* =================================================
              03 — OPENING NIGHT
          ================================================== */}

          <section className="doc" id="s3" data-s="s3">

            <span className="mono">03 — Opening Night</span>

            <div className="block">
              <Frame
                className="sq"
                src="/images/wow-gallery/06-opening-crowd.jpg"
                alt="Opening night — the crowd filling the lane outside the lifted awning and glowing storefront"
                sizes="(max-width: 900px) 100vw, 45vw"
              />

              <Tbd label="Caption for the opening-night crowd." />
            </div>

            <div className="block">
              <Frame
                className="wide"
                src="/images/wow-gallery/07-opening-participation.jpg"
                alt="Visitors colouring the letterform poster on the gallery wall during an opening"
                sizes="(max-width: 900px) 100vw, 62vw"
              />

              <Tbd label="Caption for the participation moment." />
            </div>

          </section>

        </div>

      </div>


      {/* ===================================================
          CREDITS · copy pending
      ==================================================== */}

      <section className="credits">

        <div className="row">
          <span className="mono">Studio</span>
          <em>ELLDdesign — LA · HK</em>
        </div>

        <div className="row">
          <span className="mono">Credits</span>
          <em>To come</em>
        </div>

      </section>


      {/* ===================================================
          G7 — PREV / NEXT
      ==================================================== */}

      <div className="pn">

        <Link
          href="/spatial-complexity"
          data-transition
          data-cursor="view"
          data-cursor-label="VIEW →"
        >
          <span className="mono">← Prev Project</span>
          <h3>Memento</h3>
        </Link>

        <Link
          href="/data-center-memory-democracy"
          data-transition
          data-cursor="view"
          data-cursor-label="VIEW →"
          style={{ textAlign: "right" }}
        >
          <span className="mono">Next Project →</span>
          <h3>Data Democracy</h3>
        </Link>

      </div>

    </main>
  );
}
