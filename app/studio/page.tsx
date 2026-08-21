import Reveal from "../../components/Reveal";


/* =========================================================
   AWARDS DATA
========================================================= */

const awards = [
  {
    year: "2025",
    title: "Architizer Vision Awards – Finalist",
    detail: "Data Democracy: The Memory Centre",
  },
  {
    year: "2024",
    title: "International Design Awards – Bronze",
    detail: "Architecture Project Development / Mixed Use",
  },
  {
    year: "2024",
    title: "International Design Awards – Honorable Mention",
    detail: "Commercial Interior Design / Workspace Design",
  },
  {
    year: "2024",
    title: "International Design Awards – Silver",
    detail:
      "Architecture Project Development / Industrial & Infrastructure",
  },
  {
    year: "2024",
    title: "International Design Awards – Honorable Mention",
    detail: "Cultural / Community Interior Design",
  },
  {
    year: "2024",
    title: "Architecture MasterPrize – Student Architectural Design Award",
    detail: "Small Architecture",
  },
  {
    year: "2024",
    title: "Architecture MasterPrize – Student Interior Design Award",
    detail: "Rooms and Zones",
  },
  {
    year: "2024",
    title: "Architecture MasterPrize – Student Architectural Design Award",
    detail: "Other Architecture",
  },
  {
    year: "2024",
    title: "Architecture MasterPrize – Student Landscape Architecture Award",
    detail: "Conceptual Landscape",
  },
  {
    year: "2024",
    title: "AYDA – Asia Young Designer Awards",
    detail: "Hong Kong Gold Award",
  },
  {
    year: "2024",
    title: "Design for Asia – Hong Kong Young Design Talent Award",
    detail: "Final Round",
  },
  {
    year: "2024",
    title: "PolyU School of Design – Best Conceptualization Award",
    detail: "",
  },
  {
    year: "2023",
    title: "SHJD–4C International Design Competition – Second Award",
    detail: "First Place in Hong Kong",
  },
  {
    year: "2023",
    title: "Sustainable Hospitality Challenge – Semi-Finalist",
    detail: "",
  },
  {
    year: "2023",
    title:
      "PolyU School of Design – Manual Design Technique Development Award",
    detail: "",
  },
];


/* =========================================================
   EXHIBITIONS DATA
========================================================= */

const exhibitions = [
  {
    year: "2025",
    title: "PolyU School of Design Show",
    detail: "Jockey Club Innovation Tower · Hong Kong",
  },
  {
    year: "2024",
    title: "The Art of Sketching – Architectural Narratives",
    detail: "RIBA Hong Kong Chapter / DX Design Hub",
  },
  {
    year: "2024",
    title: "Urban Design International Workshop & Exhibition",
    detail: "PolyU Design × Ewha Womans University · Seoul / Hong Kong",
  },
  {
    year: "2024",
    title: "PolyU School of Design Show",
    detail: "Jockey Club Innovation Tower · Hong Kong",
  },

  {
    year: "2024",
    title: "The Global Research in Design Innovation Exhibition",
    detail: "Hong Kong, China",
  },
  {
    year: "2024",
    title: "PolyU-SD-EID Exhibition of Best Studio Work",
    detail: "Hong Kong, China",
  },
  {
    year: "2023",
    title: "SJTU-SD-4C Challenge – Award-winning Works Exhibition",
    detail: "Shanghai, China",
  },
];


export default function StudioPage() {
  return (
    <main className="studioPage">

      <section className="studioHero">

        <div className="studioHeroInner">


          {/* =================================================
              INTRO
          ================================================= */}

          <Reveal>
            <h1 className="studioHeroTitle">
              Three disciplines.
              <br />
              One spatial practice.
            </h1>
          </Reveal>


          <Reveal delay={120}>
            <p className="studioHeroDescription">
              Exl Studio is an independent spatial design studio based between{" "}
              <span className="accent nowrap">
                Los Angeles and Hong Kong
              </span>
              , bringing together architecture, production design, and engineering.
              We use space as a medium for narrative – combining spatial thinking,
              storytelling, and systems to shape environments that are experienced,
              not simply viewed.
            </p>
          </Reveal>


          {/* =================================================
              FORMULA
          ================================================= */}

          <Reveal delay={220}>
            <h2 className="studioFormula">
              SPACE × STORY × SYSTEM
            </h2>
          </Reveal>


          {/* =================================================
              DISCIPLINES
          ================================================= */}

          <div className="studioDisciplines">


            {/* SPACE */}

            <Reveal delay={100}>
              <article className="disciplineColumn">

                <h3>SPACE</h3>

                <p className="disciplineRole">
                  Architecture / MIT
                </p>

                <p className="disciplineDescription">
                  Space, scale, circulation, material, structure.
                </p>

              </article>
            </Reveal>


            {/* STORY */}

            <Reveal delay={200}>
              <article className="disciplineColumn">

                <h3>STORY</h3>

                <p className="disciplineRole">
                  Production Design / UCLA
                </p>

                <p className="disciplineDescription">
                  Narrative, image, atmosphere, character, sequence.
                </p>

              </article>
            </Reveal>


            {/* SYSTEM */}

            <Reveal delay={300}>
              <article className="disciplineColumn">

                <h3>SYSTEM</h3>

                <p className="disciplineRole">
                  Engineering / Stanford
                </p>

                <p className="disciplineDescription">
                  Systems, mechanics, movement, feasibility, fabrication.
                </p>

              </article>
            </Reveal>

          </div>


          {/* =================================================
              PRACTICE LABEL
          ================================================= */}

          <Reveal>
            <p className="practiceLabel">
              THE PRACTICE
            </p>
          </Reveal>


          {/* =================================================
              PEOPLE
          ================================================= */}

          <div className="studioPeople">


            {/* =========================
                LEO
            ========================== */}

            <Reveal delay={100}>
              <article className="personColumn">

                <h3>Leo</h3>

                <strong>
                  Spatial Designer
                </strong>

                <p>
                  Trained across Hong Kong, Europe, and Boston, with practice
                  experience spanning Hong Kong and Boston and a background
                  rooted in architecture and spatial design.
                </p>

                <p>
                  Leo explores spatial systems through architecture, with a
                  particular interest in mechanical and automated structures,
                  transformable environments, and the relationship between
                  movement, structure, and space. Hand drawing remains central
                  to his process as a tool for developing and communicating
                  spatial ideas.
                </p>

              </article>
            </Reveal>


            {/* =========================
                EFFA
            ========================== */}

            <Reveal delay={200}>
              <article className="personColumn">

                <h3>Effa</h3>

                <strong>
                  Production Designer
                </strong>

                <p>
                  Trained across Hong Kong, Edinburgh, and Los Angeles, with
                  practice experience spanning Shanghai, Hong Kong, and LA,
                  including time at Gensler Hong Kong.
                </p>

                <p>
                  Effa works through hand drawing, spatial storytelling, and
                  rapid visual world-building to translate narrative into space,
                  atmosphere, and scene. Her practice moves between architecture
                  and production design, with a particular interest in how
                  environments can shape character, movement, and the experience
                  of a story.
                </p>

              </article>
            </Reveal>


            {/* =========================
                LILA
            ========================== */}

            <Reveal delay={300}>
              <article className="personColumn">

                <h3>Lila</h3>

                <strong>
                  Design Engineer
                </strong>

                <p>
                  Trained in engineering across Hong Kong and Stanford, US, with
                  experience spanning engineering research, interior construction,
                  and technical coordination.
                </p>

                <p>
                  Lila works at the intersection of spatial design and technical
                  systems, translating creative concepts into feasible, buildable
                  solutions through systems thinking, engineering, and fabrication.
                </p>

              </article>
            </Reveal>

          </div>


          {/* =================================================
              AWARDS
          ================================================= */}

          <Reveal>
            <section className="studioArchiveSection">

              <div className="studioArchiveHeading">
                <h2>Awards</h2>
              </div>

              <div className="studioArchiveContent">

                {awards.map((item, index) => (
                  <div
                    className="archiveRow"
                    key={`${item.year}-${item.title}-${index}`}
                  >

                    <span className="archiveYear">
                      {item.year}
                    </span>

                    <span className="archiveTitle">
                      {item.title}
                    </span>

                    <span className="archiveDetail">
                      {item.detail}
                    </span>

                  </div>
                ))}

              </div>

            </section>
          </Reveal>


          {/* =================================================
              EXHIBITIONS
          ================================================= */}

          <Reveal>
            <section className="studioArchiveSection">

              <div className="studioArchiveHeading">
                <h2>Exhibitions</h2>
              </div>

              <div className="studioArchiveContent">

                {exhibitions.map((item, index) => (
                  <div
                    className="archiveRow"
                    key={`${item.year}-${item.title}-${index}`}
                  >

                    <span className="archiveYear">
                      {item.year}
                    </span>

                    <span className="archiveTitle">
                      {item.title}
                    </span>

                    <span className="archiveDetail">
                      {item.detail}
                    </span>

                  </div>
                ))}

              </div>

            </section>
          </Reveal>


        </div>

      </section>

    </main>
  );
}
