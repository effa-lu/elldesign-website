import Link from "next/link";
import Image from "next/image";

import Reveal from "../../components/Reveal";
import MediaReveal from "../../components/MediaReveal";


const projects = [
  {
    number: "01",
    title: "Data Democracy",
    year: "2026",
    type: "Spatial Installation · Research",
    href: "/data-center-memory-democracy",
    image: "/images/work_navigation/data-democracy.png",
    className: "workProject workProjectLarge",
  },

  {
    number: "02",
    title: "Within The Existing",
    year: "2025",
    type: "Adaptive Reuse · Architecture",
    href: "/adaptive-reuse-architecture",
    image: "/images/work_navigation/within-the-existing.png",
    className: "workProject",
  },

  {
    number: "03",
    title: "Para-site Room",
    year: "2025",
    type: "Spatial Installation",
    href: "/para-site-room-model",
    image: "/images/work_navigation/Para-site Room.png",
    className: "workProject",
  },

  {
    number: "04",
    title: "Lunar Frontier",
    year: "2024",
    type: "Speculative Environment · Spatial Design",
    href: "/luna",
    image: "/images/work_navigation/Lunar Frontier.png",
    className: "workProject workProjectWide",
  },

  {
    number: "05",
    title: "Memento",
    year: "2024",
    type: "Experimental Space · Spatial Experience",
    href: "/spatial-complexity",
    image: "/images/work_navigation/Memento.png",
    className: "workProject",
  },

  {
    number: "06",
    title: "WOW Gallery",
    year: "2024",
    type: "Interior · Spatial Experience",
    href: "/wow-gallery",
    image: "/images/work_navigation/WOW Gallery.jpg",
    className: "workProject",
  },
];


export default function WorkPage() {
  return (
    <main className="workPage">

      {/* =====================================================
          INTRO
      ====================================================== */}

      <section className="workIntro">

        <div className="workIntroInner">

          <Reveal>
            <p className="workEyebrow">
              SELECTED WORK / 2024–26
            </p>
          </Reveal>


          <Reveal delay={100}>
            <h1 className="workTitle">
              Worlds shaped
              <br />
              through space.
            </h1>
          </Reveal>


          <Reveal delay={220}>
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
              YEAR INDEX
          ========================== */}

          <aside className="workYears">

            <Reveal>
              <p>2026</p>
            </Reveal>

            <Reveal delay={100}>
              <p>2025</p>
            </Reveal>

            <Reveal delay={200}>
              <p>2024</p>
            </Reveal>

          </aside>


          {/* =========================
              PROJECT GRID
          ========================== */}

          <div className="workEditorialGrid">

            {projects.map((project, index) => (

              <Reveal
                key={project.title}
                className={project.className}
                delay={(index % 3) * 100}
              >

                <Link
                  href={project.href}
                  className="workProjectLink"
                >

                  {/* =========================
                      PROJECT IMAGE
                  ========================== */}

                  <MediaReveal className="workProjectMediaReveal">

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

                      <span className="workProjectNumber">
                        {project.number}
                      </span>

                    </div>

                  </MediaReveal>


                  {/* =========================
                      PROJECT INFO
                  ========================== */}

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

                </Link>

              </Reveal>

            ))}

          </div>

        </div>

      </section>

    </main>
  );
}
