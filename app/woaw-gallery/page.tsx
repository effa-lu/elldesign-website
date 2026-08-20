"use client";

import Link from "next/link";
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
} from "react";


/* =========================================================
   WOAW GALLERY WAN CHAI — Template B · DOSSIER
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


export default function WoawGalleryPage() {
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
              Project 07 · Adaptive Reuse · Gallery Interior
            </span>

            <Lines
              as="h1"
              lines={["WOAW", "Gallery"]}
            />

            {/* G4 — meta table */}

            <div className="mtable">

              <div className="row">
                <span className="mono">Client</span>
                <em>WOAW Gallery</em>
              </div>

              <div className="row">
                <span className="mono">Location</span>
                <em>Wan Chai · Hong Kong</em>
              </div>

              <div className="row">
                <span className="mono">Year</span>
                <em>2024</em>
              </div>

              <div className="row">
                <span className="mono">Materials</span>
                <em>Raw concrete · Exposed steel</em>
              </div>

              <div className="row">
                <span className="mono">Programme</span>
                <em>Rotating art exhibitions</em>
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
            src="/images/woaw-gallery/01-facade-night.jpg"
            alt="WOAW Gallery at night — the folding steel awning lifted above the glazed storefront, upper window glowing, exhibition titles printed on the glass"
            sizes="(max-width: 900px) 100vw, 840px"
            priority
          />

          {/* G2 — word-fill intro */}

          <section className="intro">
            <WordFill text="This adaptive-reuse project transforms an existing urban building into a contemporary art gallery for WOAW Gallery." />

            <WordFill text="Rooted in minimalist and industrial aesthetics, the space balances preserved building fabric with flexible insertions to accommodate rotating art exhibitions." />
          </section>


          {/* =================================================
              01 — GALLERY FLOOR
          ================================================== */}

          <section className="doc" id="s1" data-s="s1">

            <span className="mono">01 — Gallery Floor</span>

            <div className="block">
              <Frame
                className="wide"
                src="/images/woaw-gallery/02-exhibition-paintings.jpg"
                alt="Ground floor in use — large paintings hung on the perforated steel wall beside the exposed stair rail"
                sizes="(max-width: 900px) 100vw, 62vw"
              />

              <Cap
                text="Raw concrete serves as the primary material backdrop."
                more="Existing concrete surfaces retain their natural texture and traces of age, establishing a neutral, subdued base that keeps focus on artworks rather than decorative finishes."
              />
            </div>

            <div className="block">
              <Frame
                className="wide"
                src="/images/woaw-gallery/03-exhibition-text-wall.jpg"
                alt="Exhibition text wall by the entrance, a single small canvas beside the polycarbonate under-stair enclosure"
                sizes="(max-width: 900px) 100vw, 62vw"
              />

              <Cap
                text="Instead of rigid permanent walls, movable and multi-functional furniture shapes the floor."
                more="Freestanding seats, modular display units and sliding steel partitions can be rearranged or fully removed — the gallery shifts between open large-scale installation space and smaller enclosed viewing zones."
              />
            </div>

          </section>


          {/* in-flow statement */}

          <div className="bodyState">
            <Lines
              as="h3"
              lines={["The structure stays unchanged.", "Everything else reconfigures."]}
            />
          </div>


          {/* =================================================
              02 — SECTION & FRAME
          ================================================== */}

          <section className="doc" id="s2" data-s="s2">

            <span className="mono">02 — Section &amp; Frame</span>

            <div className="block">
              <Frame
                className="xwide"
                src="/images/woaw-gallery/04-long-section.jpg"
                alt="Long section — the two-storey gallery cut open: reading loft above, exhibition floor and under-stair alcove below, the steel stair rail running through"
                sizes="(max-width: 900px) 100vw, 62vw"
              />

              <Cap
                text="Metal elements are applied as modular, reversible components against the concrete shell."
                more="Exposed steel is used for stair railings, sliding partition frames and hardware systems — sharp industrial contrast that never overwhelms the restrained tone."
              />
            </div>

            <div className="block">
              <Frame
                className="sq"
                src="/images/woaw-gallery/05-interior-perspective.jpg"
                alt="Interior perspective — mezzanine with silver curtain and steel rail above the storefront glazing"
                sizes="(max-width: 900px) 100vw, 45vw"
              />

              <Cap
                text="Sliding steel partitions redraw the plan as curatorial demands change."
                more="The design follows a clear static-and-variable logic: the original concrete structure stays untouched while functions, boundaries and atmospheres are adjusted through detachable metal hardware."
              />
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
                src="/images/woaw-gallery/06-opening-crowd.jpg"
                alt="Opening night — the crowd filling the lane outside the lifted awning and glowing storefront"
                sizes="(max-width: 900px) 100vw, 45vw"
              />

              <Cap
                text="Open large-scale installation space, or smaller enclosed viewing zones — the room answers each show."
                more="Movable furniture and sliding partitions respond flexibly to varying curatorial demands, exhibition by exhibition."
              />
            </div>

            <div className="block">
              <Frame
                className="wide"
                src="/images/woaw-gallery/07-opening-participation.jpg"
                alt="Visitors colouring the letterform poster on the gallery wall during an opening"
                sizes="(max-width: 900px) 100vw, 62vw"
              />

              <Cap
                text="Atmospheres are adjusted, not rebuilt."
                more="Detachable hardware and reconfigurable furniture let each exhibition reshape the gallery while the building fabric stays exactly as found."
              />
            </div>

          </section>

        </div>

      </div>


      {/* ===================================================
          CREDITS
      ==================================================== */}

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
