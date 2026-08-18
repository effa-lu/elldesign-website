"use client";

import Link from "next/link";
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
} from "react";


/* =========================================================
   PARA-SITE ROOM — Template C · SEQUENCE
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
}: {
  className: string;
  src: string;
  alt: string;
  sizes: string;
}) {
  return (
    <figure className={`${className} imgreveal`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
      />
    </figure>
  );
}


/* the four frames of the sequence strip */

const SEQUENCE_FRAMES = [
  {
    src: "/images/para-site/04-drawing-boards.jpg",
    alt: "Video still — drawing boards tilting on jointed arms as the parasite modifies their angle",
    tag: "Frame 01",
    text: "Modifying the angle of the drawing boards",
  },
  {
    src: "/images/para-site/03-syringes-p03.jpg",
    alt: "Video still — the twin syringes of parasite P03, charged with water, mounted on the wooden frame",
    tag: "Frame 02",
    text: "P03 · twin syringes charge the line",
  },
  {
    src: "/images/para-site/02-operating-p02.jpg",
    alt: "Video still — hands operating parasite P02, a scissor arm swinging a tray out from the host wall",
    tag: "Frame 03",
    text: "P02 · the scissor arm swings out",
  },
  {
    src: "/images/para-site/08-system-axonometric.jpg",
    alt: "System axonometric — parasites P01 to P06 annotated across three exploded drawing columns",
    tag: "Frame 04",
    text: "P01–P06 · the full score, annotated",
  },
];


export default function ParasiteRoomPage() {
  const root = useRef<HTMLElement>(null);
  const strip = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const prog = useRef<HTMLElement>(null);

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

    const narrow = window.matchMedia("(max-width: 760px)");

    /* one-shot reveals: G3 lines · G4 meta */

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

    /* horizontal strip — vertical scroll becomes travel */

    const runStrip = () => {
      const sec = strip.current;
      const row = track.current;
      const bar = prog.current;

      if (!sec || !row || !bar) return;

      if (narrow.matches) return;

      const r = sec.getBoundingClientRect();

      const t = Math.min(
        1,
        Math.max(0, -r.top / (r.height - window.innerHeight))
      );

      const travel = row.scrollWidth - window.innerWidth;

      row.style.transform =
        `translateX(${(-t * travel).toFixed(1)}px)`;

      bar.style.width = (t * 100).toFixed(1) + "%";
    };

    let raf = 0;

    const onFrame = () => {
      raf = 0;

      fillWords();
      runStrip();
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
      runStrip();
    }

    return () => {
      io.disconnect();
      ioClip.disconnect();

      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);

      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <main
      className={`projectSequence${entered ? " entered" : ""}`}
      ref={root}
    >

      {/* =====================================================
          HERO — typographic, no image
      ====================================================== */}

      <section className="hero">

        <div className="heroRule" />

        <span className="mono heroKicker">
          Model 1:10 / Host × Circuit × Sequence
        </span>

        <Lines
          as="h1"
          lines={["Para-site", "Room"]}
        />

        <p className="mono heroTag">
          Wind pushes. Fluid answers.
        </p>

        <span className="cue mono">Scroll ↓</span>

      </section>


      {/* =====================================================
          G4 — META STRIP
      ====================================================== */}

      <div className="meta">

        <div>
          <span className="mono">Type</span>
          <b>Functional model · Analog mechanisms</b>
        </div>

        <div>
          <span className="mono">Year</span>
          <b>Early 2024</b>
        </div>

        <div>
          <span className="mono">Materials</span>
          <b>Wood, metal, plastic, paper & water</b>
        </div>

        <div>
          <span className="mono">Scale</span>
          <b>500 × 700 × 1500 mm — 1:10</b>
        </div>

      </div>


      {/* =====================================================
          G2 — WORD-FILL INTRO
      ====================================================== */}

      <section className="intro">

        <WordFill text="Parasite: an analog mechanism installed onto an existing built environment, reconfiguring the room on wind and pressure alone." />

        <WordFill text="Two syringes joined by tubing form a pneumatic circuit. It carries energy captured across the space and releases it where it was never collected." />

      </section>


      {/* =====================================================
          COVER — the circuit, full bleed
      ====================================================== */}

      <section className="cover">

        <Frame
          className="art"
          src="/images/para-site/01-tubing-detail.jpg"
          alt="Close-up through the model — plastic tubing crossing the wooden linkages of the parasite mechanisms"
          sizes="100vw"
        />

        <Cap
          text="The circuit crossing the host — plastic pipe, wood, and pressure where a wall used to end."
          more="A fully functional 1:10 model demonstrating the design and operation of the parasites: analog mechanisms driven by wind and liquid pressure that transform the configuration of the room — the host — they are installed on."
        />

      </section>


      {/* =====================================================
          CHAPTER 01 — HOST
      ====================================================== */}

      <section className="statement">

        <div className="bignum">01</div>

        <div>
          <span className="mono">01 — Host</span>

          <Lines
            lines={["Occupying an existing condition,", "not empty ground."]}
          />
        </div>

      </section>

      <div className="mediarow">

        <Frame
          className="collage"
          src="/images/para-site/06-host-street.jpg"
          alt="Street study collage — parasite mechanisms sketched over photographs of a Hong Kong street lined with window air-conditioners, a hand-drawn refrigerant cycle diagram at the center"
          sizes="100vw"
        />

        <Cap
          text="The found precedent — window units already colonize these walls, moving heat with fluid, a fan, and no architecture at all."
          more="In this project, a parasite is any analog mechanism installed onto the existing built structure. The first one was found, not designed: the air-conditioner's refrigerant loop, sketched over the street corner, became the model's energy diagram."
        />

      </div>


      {/* =====================================================
          CHAPTER 02 — CIRCUIT
      ====================================================== */}

      <section className="statement">

        <div className="bignum">02</div>

        <div>
          <span className="mono">02 — Circuit</span>

          <Lines
            lines={["No motors, no controls —", "wind and water do the work."]}
          />
        </div>

      </section>

      <div className="mediarow">

        <div className="duo">

          <Frame
            className="ph"
            src="/images/para-site/07-parasite-studies.jpg"
            alt="Study board — white parasite mechanism drawings taped over dark photographs of the model"
            sizes="(max-width: 760px) 100vw, 50vw"
          />

          <Frame
            className="ph"
            src="/images/para-site/05-negative-studies.jpg"
            alt="Study board — mechanism sketches over inverted photographs of a concrete viaduct, marked with blue tape"
            sizes="(max-width: 760px) 100vw, 50vw"
          />

        </div>

        <Cap
          text="Study boards — parasites drafted in white over photographs of model and host, taped like film leader."
          more="The energy-transport system borrows from Bernoulli's principle and pneumatics: two syringes connected by plastic pipes carry pressure captured where the wind blows and release it where the room needs to move."
        />

      </div>


      {/* =====================================================
          CHAPTER 03 — SEQUENCE
      ====================================================== */}

      <section className="statement">

        <div className="bignum">03</div>

        <div>
          <span className="mono">03 — Sequence</span>

          <Lines
            lines={["Pressure in,", "and the room reconfigures."]}
          />
        </div>

      </section>

      <section className="hstrip" ref={strip}>

        <div className="viewport">

          <div className="label mono">
            Sequence — scroll to run the machine
          </div>

          <div className="track" ref={track}>

            {SEQUENCE_FRAMES.map((frame) => (
              <figure className="frame" key={frame.src}>

                <div className="art">
                  <Image
                    src={frame.src}
                    alt={frame.alt}
                    fill
                    sizes="(max-width: 760px) 100vw, 46vw"
                  />
                </div>

                <figcaption className="mono">
                  <b>{frame.tag}</b> — {frame.text}
                </figcaption>

              </figure>
            ))}

          </div>

          <div className="prog">
            <i ref={prog} />
          </div>

        </div>

      </section>


      {/* =====================================================
          OUTRO — the thesis
      ====================================================== */}

      <section className="outro">

        <Lines
          lines={[
            "The host holds still,",
            "and everything that changes, changes because",
            "something else attached itself to it.",
          ]}
        />

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
          <em>ELLDdesign — LA · HK</em>
        </div>

        <div className="row">
          <span className="mono">Photo</span>
          <em>@ann_oying_</em>
        </div>

        <div className="row">
          <span className="mono">Colour</span>
          <em>@lluili</em>
        </div>

        <div className="row">
          <span className="mono">Award</span>
          <em>Architecture MasterPrize 2024 — Student Winner · Architectural Design, Small Architecture</em>
        </div>

        <div className="row">
          <span className="mono">Award</span>
          <em>Architecture MasterPrize 2024 — Student Winner · Interior Design, Rooms &amp; Zones</em>
        </div>

        <div className="row">
          <span className="mono">Exhibition</span>
          <em>HK PolyU School of Design Annual Show — Best of Show</em>
        </div>

      </section>


      {/* =====================================================
          G7 — PREV / NEXT
      ====================================================== */}

      <div className="pn">

        <Link
          href="/adaptive-reuse-architecture"
          data-transition
          data-cursor="view"
          data-cursor-label="VIEW →"
        >
          <span className="mono">← Prev Project</span>
          <h3>Within The Existing</h3>
        </Link>

        <Link
          href="/luna"
          data-transition
          data-cursor="view"
          data-cursor-label="VIEW →"
          style={{ textAlign: "right" }}
        >
          <span className="mono">Next Project →</span>
          <h3>Lunar Frontier</h3>
        </Link>

      </div>

    </main>
  );
}
