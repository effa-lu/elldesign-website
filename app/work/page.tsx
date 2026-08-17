"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import Reveal from "../../components/Reveal";
import MediaReveal from "../../components/MediaReveal";


/*
  A24-style motion system — see
  a24-effects-spec-elldesign-work.md

  altImage (optional): alternate still / process
  shot revealed on hover (E2). Add one asset per
  project to activate the swap.

  speed: column parallax factor (E-ELLD).
  0.97 = drifts ahead · 1 = normal · 1.04 = lags.
*/

const projects = [
  {
    number: "01",
    title: "Data Democracy",
    year: "2026",
    type: "Spatial Installation · Research",
    href: "/data-center-memory-democracy",
    image: "/images/work_navigation/data-democracy.png",
    altImage: null,
    speed: 0.97,
    className: "workProject workProjectLarge",
  },

  {
    number: "02",
    title: "Within The Existing",
    year: "2025",
    type: "Adaptive Reuse · Architecture",
    href: "/adaptive-reuse-architecture",
    image: "/images/work_navigation/within-the-existing.png",
    altImage: null,
    speed: 1,
    className: "workProject",
  },

  {
    number: "03",
    title: "Para-site Room",
    year: "2025",
    type: "Spatial Installation",
    href: "/para-site-room-model",
    image: "/images/work_navigation/Para-site Room.png",
    altImage: null,
    speed: 1.04,
    className: "workProject",
  },

  {
    number: "04",
    title: "Lunar Frontier",
    year: "2024",
    type: "Speculative Environment · Spatial Design",
    href: "/luna",
    image: "/images/work_navigation/Lunar Frontier.png",
    altImage: null,
    speed: 1,
    className: "workProject workProjectWide",
  },

  {
    number: "05",
    title: "Memento",
    year: "2024",
    type: "Experimental Space · Spatial Experience",
    href: "/spatial-complexity",
    image: "/images/work_navigation/Memento.png",
    altImage: null,
    speed: 1.04,
    className: "workProject",
  },

  {
    number: "06",
    title: "WOW Gallery",
    year: "2024",
    type: "Interior · Spatial Experience",
    href: "/wow-gallery",
    image: "/images/work_navigation/WOW Gallery.jpg",
    altImage: null,
    speed: 0.97,
    className: "workProject",
  },
];


const YEARS = ["2026", "2025", "2024"];


export default function WorkPage() {

  /* =====================================================
      YEAR RAIL — SCROLL-SPY (A24 pager, verticalized)
  ====================================================== */

  const [activeYear, setActiveYear] = useState("2026");

  useEffect(() => {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const year = entry.target.getAttribute("data-year");

          if (year) setActiveYear(year);
        });
      },
      {
        /* active = project crossing the middle band */
        rootMargin: "-40% 0px -50% 0px",
      }
    );

    document
      .querySelectorAll(".workEditorialGrid [data-year]")
      .forEach((el) => spy.observe(el));

    return () => spy.disconnect();
  }, []);


  const scrollToYear = (year: string) => {
    document
      .querySelector(`.workEditorialGrid [data-year="${year}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };


  /* =====================================================
      COLUMN PARALLAX (±4%, desktop only)
  ====================================================== */

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const desktop = window.matchMedia("(min-width: 1001px)");

    const items = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".workEditorialGrid [data-speed]"
      )
    );

    if (!items.length) return;

    let raf = 0;
    let enabled = false;

    const update = () => {
      raf = 0;

      const y = window.scrollY;

      items.forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "1");

        el.style.transform = `translate3d(0, ${(
          y * (speed - 1)
        ).toFixed(1)}px, 0)`;
      });
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const apply = () => {
      const next = desktop.matches && !reduced.matches;

      if (next === enabled) return;

      enabled = next;

      if (enabled) {
        window.addEventListener("scroll", onScroll, { passive: true });
        update();
      } else {
        window.removeEventListener("scroll", onScroll);

        if (raf) cancelAnimationFrame(raf);
        raf = 0;

        items.forEach((el) => {
          el.style.transform = "";
        });
      }
    };

    apply();

    desktop.addEventListener("change", apply);
    reduced.addEventListener("change", apply);

    return () => {
      desktop.removeEventListener("change", apply);
      reduced.removeEventListener("change", apply);

      window.removeEventListener("scroll", onScroll);

      if (raf) cancelAnimationFrame(raf);
    };
  }, []);


  return (
    <main className="workPage">

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section className="workIntro">

        <div className="workIntroInner">

          <Reveal once>
            <p className="workEyebrow">
              SELECTED WORK / 2024–26
            </p>
          </Reveal>


          {/* line-mask rise on load (A24 E1, typographic) */}

          <h1 className="workTitle workTitleMask">

            <span className="heroLine">
              <span>Worlds shaped</span>
            </span>

            <span className="heroLine">
              <span>through space.</span>
            </span>

          </h1>


          <Reveal once delay={220}>
            <p className="workDescription">
              Selected work across stage, set, architecture, and spatial
              experience – exploring how environments shape movement,
              perception, and narrative.
            </p>
          </Reveal>

        </div>

      </section>


      {/* =====================================================
          ARCHIVE
      ====================================================== */}

      <section className="workArchive">

        <div className="workArchiveInner">


          {/* =========================
              YEAR INDEX — LIVE RAIL
          ========================== */}

          <aside className="workYears">

            {YEARS.map((year) => (

              <button
                key={year}
                type="button"
                className={
                  activeYear === year ? "workYearActive" : ""
                }
                onClick={() => scrollToYear(year)}
              >
                {year}
              </button>

            ))}

          </aside>


          {/* =========================
              PROJECT GRID
          ========================== */}

          <div className="workEditorialGrid">

            {projects.map((project, index) => (

              <article
                key={project.title}
                className={project.className}
                data-year={project.year}
                data-speed={project.speed}
              >

                <Link
                  href={project.href}
                  className="workProjectLink"
                  data-transition
                  data-cursor="view"
                  data-cursor-label="VIEW →"
                >

                  {/* =========================
                      PROJECT IMAGE
                  ========================== */}

                  <MediaReveal
                    once
                    className="workProjectMediaReveal"
                    delay={(index % 3) * 80}
                  >

                    <div className="workProjectMedia">

                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="
                          (max-width: 700px) 100vw,
                          (max-width: 1200px) 50vw,
                          40vw
                        "
                        className="workProjectImage"
                      />

                      {project.altImage && (
                        <Image
                          src={project.altImage}
                          alt=""
                          fill
                          sizes="
                            (max-width: 700px) 100vw,
                            (max-width: 1200px) 50vw,
                            40vw
                          "
                          className="workProjectImageAlt"
                        />
                      )}

                      <span className="workProjectNumber">
                        {project.number}
                      </span>

                    </div>

                  </MediaReveal>


                  {/* =========================
                      PROJECT INFO
                      caption follows its image
                  ========================== */}

                  <Reveal
                    once
                    delay={(index % 3) * 80 + 100}
                  >

                    <div className="workProjectInfo">

                      <div className="workProjectHeading">

                        <h2>
                          {project.title}
                        </h2>

                        <span>
                          {project.year}
                        </span>

                      </div>


                      <p>
                        {project.type}
                      </p>

                    </div>

                  </Reveal>

                </Link>

              </article>

            ))}

          </div>

        </div>

      </section>

    </main>
  );
}
