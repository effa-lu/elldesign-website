"use client";

import Link from "next/link";
import Image from "next/image";
import {
  type CSSProperties,
  useEffect,
  useRef,
  useState,
} from "react";


/* =========================================================
   WITHIN THE EXISTING — Template B · DOSSIER
   project-page-template-spec.md · accent #7fae8f green
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
  { id: "s1", label: "Existing Fabric" },
  { id: "s2", label: "Insertion" },
  { id: "s3", label: "Light & Frame" },
];

const ACCENT = { "--accent": "#7fae8f" } as CSSProperties;


export default function WithinTheExistingPage() {
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
      style={ACCENT}
    >

      <div className="dossier">

        {/* ===================================================
            RAIL — title · meta · index (sticky)
        ==================================================== */}

        <aside className="rail">
          <div className="stick">

            <span className="mono railKicker">
              Project 02 · Adaptive Reuse · Spatial Narrative
            </span>

            <Lines
              as="h1"
              lines={["Within", "The Existing"]}
            />

            {/* G4 — meta table */}

            <div className="mtable">

              <div className="row">
                <span className="mono">Type</span>
                <em>Adaptive Reuse · Architecture</em>
              </div>

              <div className="row">
                <span className="mono">Year</span>
                <em>2025</em>
              </div>

              <div className="row">
                <span className="mono">Site</span>
                <em>Tron Kirk — Edinburgh</em>
              </div>

              <div className="row">
                <span className="mono">Approach</span>
                <em>Structure · Memory · Light · Material</em>
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

          {/* opening pair — the model as specimen, whole then cut */}

          <div className="pairTall">

            <Frame
              className=""
              src="/images/within-existing/02-model-spire.jpg"
              alt="Model of the Tron Kirk — white spire and Gothic shell with a translucent drawing screen rising behind, the sectional interior glowing pale green"
              sizes="(max-width: 900px) 100vw, 31vw"
              priority
            />

            <Frame
              className=""
              src="/images/within-existing/01-model-roof-lift.jpg"
              alt="Sectional model with the timber roof canopy lifted away by hand, exposing three inserted floors of frames, figures, and glass stairs inside the kirk"
              sizes="(max-width: 900px) 100vw, 31vw"
              priority
            />

          </div>


          {/* G2 — word-fill intro */}

          <section className="intro">

            <WordFill text="Within the Existing reimagines Edinburgh's historic Tron Kirk through adaptive reuse, treating the existing architecture as an active layer of spatial narrative." />

            <WordFill text="New interventions are inserted within the old structure rather than replacing it, creating a dialogue between past and present through material, circulation, light, and spatial sequence." />

          </section>


          {/* =================================================
              01 — EXISTING FABRIC
          ================================================== */}

          <section className="doc" id="s1" data-s="s1">

            <span className="mono">01 — Existing Fabric</span>

            <div className="block">
              <Frame
                className="nearSq"
                src="/images/within-existing/06-long-section.jpg"
                alt="Long section through the kirk — Gothic arcade and rose windows kept intact while new floors, spiral stair, and roof-hung rigging thread through the nave"
                sizes="(max-width: 900px) 100vw, 54vw"
              />

              <Cap
                text="The kirk is read first — arcade, window heads, and roof structure surveyed as the datum every new move answers to."
                more="The project transforms the historic Gothic church into a contemporary art library, preserving its original character while adaptive-reuse strategies let the building hold cultural memory and contemporary artistic expression at once."
              />
            </div>

          </section>


          {/* in-flow statement */}

          <div className="bodyState">
            <Lines
              as="h3"
              lines={["New interventions stay legible —", "the existing stays present."]}
            />
          </div>


          {/* =================================================
              02 — INSERTION
          ================================================== */}

          <section className="doc" id="s2" data-s="s2">

            <span className="mono">02 — Insertion</span>

            <div className="block">
              <Frame
                className="detailW"
                src="/images/within-existing/07-shelving-detail.jpg"
                alt="Detail section — aluminium bookshelf units hung from roof beams on steel cables, human silhouettes between the suspended stacks"
                sizes="(max-width: 900px) 100vw, 62vw"
              />

              <Cap
                text="Exposed steel crisscrosses overhead; custom shelving hangs from it on cables rather than standing on the stone floor."
                more="The metal structures add strength and industrial character while staying reversible — dark minimalist frames contrast with the warm stone walls and carry the library's collection of art books and periodicals."
              />
            </div>

            <div className="block">
              <Frame
                className="sqSm"
                src="/images/within-existing/05-shelf-prototype.jpg"
                alt="Working model of a cable-stayed shelf unit — grey metal frame, tensioned rods, and a folded plate wall"
                sizes="(max-width: 900px) 100vw, 28vw"
              />

              <Cap text="Unit prototype — one cable-stayed shelf, modular and height-adjustable, zoning reading from gathering." />
            </div>

          </section>


          {/* =================================================
              03 — LIGHT & FRAME
          ================================================== */}

          <section className="doc" id="s3" data-s="s3">

            <span className="mono">03 — Light &amp; Frame</span>

            <div className="block">
              <Frame
                className="w32"
                src="/images/within-existing/04-stacks-upview.jpg"
                alt="Looking straight up through tiers of green glass and steel book stacks toward the skylight"
                sizes="(max-width: 900px) 100vw, 62vw"
              />

              <Cap
                text="Spatial reference — suspended stacks in green steel and glass, light falling through every tier."
                more="The vertical-library register the insertion pursues: shelving as inhabitable structure, floors reading as shelves, daylight reaching the ground through layered translucency."
              />
            </div>

            <div className="block">
              <Frame
                className="w32Sm"
                src="/images/within-existing/03-stacks-interior.jpg"
                alt="Reference interior — figures crossing glass-floored walkways between hanging book stacks"
                sizes="(max-width: 900px) 100vw, 44vw"
              />

              <Cap text="Circulation threads between the stacks — movement, not walls, dividing the room." />
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
          <em>ELLDdesign — LA · HK</em>
        </div>

      </section>


      {/* ===================================================
          G7 — PREV / NEXT
      ==================================================== */}

      <div className="pn">

        <Link
          href="/culture-transit"
          data-transition
          data-cursor="view"
          data-cursor-label="VIEW →"
        >
          <span className="mono">← Prev Project</span>
          <h3>Cultures In Transit</h3>
        </Link>

        <Link
          href="/para-site-room-model"
          data-transition
          data-cursor="view"
          data-cursor-label="VIEW →"
          style={{ textAlign: "right" }}
        >
          <span className="mono">Next Project →</span>
          <h3>Para-site Room</h3>
        </Link>

      </div>

    </main>
  );
}
