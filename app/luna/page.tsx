"use client";

import Link from "next/link";
import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
} from "react";


/* =========================================================
   LUNAR FRONTIER — Template A · CINEMA
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


export default function LunarFrontierPage() {
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
      style={{ ["--accent" as string]: "#8b7fd4" }}
    >

      {/* =====================================================
          HERO — the Lunar Frontier poster
      ====================================================== */}

      <section className="hero">

        <div className="heroArt">
          <Image
            src="/images/luna/01-hero-lunar.jpg"
            alt="The Lunar Frontier — figures tumbling over a gridded excavation in the lunar surface, Earth rising over the black horizon"
            fill
            sizes="100vw"
            priority
          />
        </div>

        <div className="heroTitle">

          <span className="mono">
            Folding Earth, Unfolding Systems / 50 Layers × 7 Scenarios
          </span>

          <Lines
            as="h1"
            lines={["Lunar", "Frontier"]}
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
          <b>Speculative Environment · World-Building</b>
        </div>

        <div>
          <span className="mono">Year</span>
          <b>2024</b>
        </div>

        <div>
          <span className="mono">Framework</span>
          <b>Folding Earth, Unfolding Systems</b>
        </div>

        <div>
          <span className="mono">Method</span>
          <b>Dymaxion Projection · Systems Mapping</b>
        </div>

      </div>


      {/* =====================================================
          G2 — WORD-FILL INTRO
      ====================================================== */}

      <section className="intro">

        <WordFill text="Lunar Frontier asks how architecture emerges when human life is displaced from Earth — beginning not with the image of a colony, but with the systems that make life possible." />

        <WordFill text="The Earth is first deconstructed into fifty interconnected layers — climate, ecology, resources, infrastructure, urbanization — read not as separate conditions but as a network of dependencies." />

        <WordFill text="Folded onto Fuller's Dymaxion projection, distant geographies meet, systems overlap, and patterns invisible in conventional maps begin to emerge." />

      </section>


      {/* =====================================================
          CHAPTER 01 — FOLDING EARTH
      ====================================================== */}

      <section className="chapter">

        <div className="pin">
          <span className="mono">01 — Folding Earth</span>
        </div>

        <div className="media">

          <div>
            <Frame
              className="full"
              src="/images/luna/02-dymaxion-composite.jpg"
              alt="Dymaxion composite — the world unfolded into triangles, environmental data layers overlaid on half the map, blank projection on the other"
              sizes="100vw"
            />

            <Cap
              text="The Earth unfolded — data projected onto a modular twenty-triangle planetary framework."
              more="Using Buckminster Fuller's Dymaxion Projection, the research develops a methodology of overlapping, folding, and reconfiguration: different conditions and territories are physically and conceptually brought into new relationships."
            />
          </div>

          <div className="single">
            <Frame
              className="ph phSquare"
              src="/images/luna/03-fold-diagram.jpg"
              alt="Folding diagram — the icosahedral map expanded, folded to center, and refolded through different configurations around one center"
              sizes="(max-width: 760px) 100vw, 560px"
            />

            <Cap text="Folding as an analytical operation — expand the Earth, fold to center; different folds, one center." />
          </div>

          <div className="singleWide">
            <Frame
              className="ph"
              src="/images/luna/04-samples-board.jpg"
              alt="Sample board — rows of black-and-white data maps with red annotations, colored overlay maps, and seven extracted sample strips"
              sizes="(max-width: 760px) 100vw, 940px"
            />

            <Cap
              text="Fifty layers, seven samples — glacier change, migration barriers, desertification, subsidence, extreme environments."
              more="Each sample stacks raw data, overlaid conditions, and a site extraction: environmental relationships translated into spatial questions that move between planetary, regional, and site scales."
            />
          </div>

        </div>

      </section>


      {/* =====================================================
          CHAPTER 02 — SEVEN SCENARIOS
      ====================================================== */}

      <section className="chapter">

        <div className="pin">
          <span className="mono">02 — Seven Scenarios</span>
        </div>

        <div className="media">

          <div>
            <Frame
              className="full"
              src="/images/luna/05-icy-exodus.jpg"
              alt="The Icy Exodus — gridded piers thread between towering icebergs while a small fishing boat waits below"
              sizes="100vw"
            />

            <Cap
              text="The Icy Exodus — glacial movement and global warming leave a fragile cryosphere in crisis."
              more="From the framework, seven environmental scenarios investigate conditions ranging from glacial retreat and eutrophication to habitat fragmentation, desertification, groundwater depletion — and finally, human settlement on the Moon."
            />
          </div>

          <div className="pair">

            <Frame
              className="ph"
              src="/images/luna/06-deserts-edge.jpg"
              alt="The Desert's Edge — two researchers flag a wet patch of grassland while mirrored walls hold back the dunes behind"
              sizes="(max-width: 760px) 100vw, 50vw"
            />

            <Frame
              className="ph"
              src="/images/luna/07-sinking-metropolis.jpg"
              alt="The Sinking Metropolis — a city skyline settles into a gridded excavation, groundwater rendered as green marble"
              sizes="(max-width: 760px) 100vw, 50vw"
            />

          </div>

          <div>
            <div className="pair">

              <Frame
                className="ph"
                src="/images/luna/08-desertified-knowledge.jpg"
                alt="The Library of Desertified Knowledge — geodesic greenhouse domes scattered across a burning red-rock desert"
                sizes="(max-width: 760px) 100vw, 50vw"
              />

              <Frame
                className="ph"
                src="/images/luna/09-fragmented-wild.jpg"
                alt="The Fragmented Wild — a gridded plane hovers over a canyon as cranes and giraffes migrate through fractured terrain"
                sizes="(max-width: 760px) 100vw, 50vw"
              />

            </div>

            <Cap text="Each scenario moves between planetary, regional, and site scales — spatial questions, not predetermined forms." />
          </div>

        </div>

      </section>


      {/* =====================================================
          PULL QUOTE
      ====================================================== */}

      <section className="quote">
        <Lines
          lines={[
            "A world is not designed from its surface.",
            "It is built from the systems",
            "that allow it to exist.",
          ]}
        />
      </section>


      {/* =====================================================
          CHAPTER 03 — THE LUNAR FRONTIER
      ====================================================== */}

      <section className="chapter">

        <div className="pin">
          <span className="mono">03 — The Lunar Frontier</span>
        </div>

        <div className="media">

          <div>
            <Frame
              className="full"
              src="/images/luna/10-hands-maps.jpg"
              alt="Weathered hands reach across the triangulated map — the folded Earth handed on"
              sizes="100vw"
            />

            <Cap
              text="The framework's most extreme test — removed from every system that makes terrestrial life possible."
              more="On the Moon, habitation can no longer be an isolated architectural object. Space must operate as infrastructure, environmental mediator, resource system, shelter, and life-support simultaneously — architecture emerges from necessity."
            />
          </div>

          <div>
            <div className="pair">

              <Frame
                className="ph phWide"
                src="/images/luna/11-dome-agriculture.jpg"
                alt="Collage — a geodesic dome shelters cornfields and ploughed ground on a grey lunar plain"
                sizes="(max-width: 760px) 100vw, 50vw"
              />

              <Frame
                className="ph phWide"
                src="/images/luna/12-dome-glacier.jpg"
                alt="Collage — a dome frame holds an iceberg and meltwater among grey craters as two figures walk the shore"
                sizes="(max-width: 760px) 100vw, 50vw"
              />

            </div>

            <Cap
              text="Not buildings placed on a surface — an interdependent spatial world."
              more="Drawing on superstructure, modularity, abstraction, and minimized form, architecture becomes a flexible framework for changing environmental and human demands: circulation follows survival, enclosure responds to exposure, and inhabitation is inseparable from the systems that sustain it."
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
          G7 — PREV / NEXT
      ====================================================== */}

      <div className="pn">

        <Link
          href="/para-site-room-model"
          data-transition
          data-cursor="view"
          data-cursor-label="VIEW →"
        >
          <span className="mono">← Prev Project</span>
          <h3>Para-site Room</h3>
        </Link>

        <Link
          href="/spatial-complexity"
          data-transition
          data-cursor="view"
          data-cursor-label="VIEW →"
          style={{ textAlign: "right" }}
        >
          <span className="mono">Next Project →</span>
          <h3>Memento</h3>
        </Link>

      </div>

    </main>
  );
}
