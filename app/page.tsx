import Reveal from "../components/Reveal";

export default function Home() {
  return (
    <main className="homePage">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="homeHero">

        <div className="heroImage">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source
              src="/images/home/home-hero.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div className="heroContent">

          <Reveal>
            <h1 className="heroBrand">
              ELLDdesign
            </h1>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="heroTitle">
              We build narratives
              <br />
              through space.
            </h2>
          </Reveal>

        </div>

        <Reveal
          className="heroMetaReveal"
          delay={200}
        >
          <p className="heroMeta">
            Stage · Set · World-Building
          </p>
        </Reveal>

      </section>


      {/* =====================================================
          01 / SPACE AS MEDIUM
      ====================================================== */}
      <section className="spaceMedium">

        <p className="sectionLabel">
          01 / SPACE AS MEDIUM
        </p>

        <div className="spaceMediumImage">
          <img
            src="/images/home/space-medium.png"
            alt="Space as medium"
          />
        </div>

        <Reveal className="mediumLeftWrap">
          <h2 className="mediumTitle">
            Not a backdrop.
          </h2>
        </Reveal>

        <Reveal
          className="mediumRightWrap"
          delay={120}
        >
          <h2 className="mediumTitle">
            A place to enter.
          </h2>
        </Reveal>

        <Reveal
          className="mediumCaptionWrap"
          delay={180}
        >
          <p className="mediumCaption">
            We design environments to be inhabited,
            moved through, and experienced.
          </p>
        </Reveal>

      </section>


      {/* =====================================================
          02 / SPATIAL NARRATIVE
      ====================================================== */}
      <section className="spatialNarrative">

        <p className="sectionLabel">
          02 / SPATIAL NARRATIVE
        </p>

        <div className="narrativeImage">
          <img
            src="/images/home/narrative-collage.png"
            alt="Spatial narrative collage"
            className="narrativeCollage"
          />
        </div>

        <Reveal className="narrativeTitleWrap">
          <h2 className="narrativeTitle">
            Stories
            <br />
            unfold
            <br />
            through
            <br />
            space.
          </h2>
        </Reveal>

        <Reveal
          className="narrativeCaptionWrap"
          delay={150}
        >
          <p className="narrativeCaption">
            Translating narrative into spatial experience
            <br />
            through scale, atmosphere, sequence &amp; movement
          </p>
        </Reveal>

      </section>


      {/* =====================================================
          THE STUDIO
      ====================================================== */}
      <section className="studioSection">

        <div className="studioGrid">

          <Reveal className="studioLabelWrap">
            <div className="studioLabel">
              <span>THE STUDIO</span>
              <span>ELLDdesign</span>
            </div>
          </Reveal>

          <div className="studioMain">

            <Reveal>
              <h2 className="studioTitle">
                We use space to make
                <br />
                narratives physical.
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p className="studioDescription">
                ELLDdesign is an interdisciplinary spatial design
                practice working across stage, set, architecture,
                and experimental environments. We bring together
                design, narrative, and engineering to create spaces
                that are not only seen, but experienced.
              </p>
            </Reveal>

          </div>

        </div>


        <div className="capabilities">

          <Reveal>
            <p className="capabilitiesLabel">
              CAPABILITIES
            </p>
          </Reveal>

          <div className="capabilitiesGrid">

            <Reveal>
              <div className="capabilityItem">
                Stage Design
                <br />
                Spatial Storytelling
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="capabilityItem">
                Set Design
                <br />
                Production + Engineering
              </div>
            </Reveal>

          </div>

        </div>

      </section>


      {/* =====================================================
          CLOSING
      ====================================================== */}
      <section className="homeClosing">

        <div className="closingImage">
          <img
            src="/images/home/closing-earth.jpg"
            alt="ELLDdesign closing"
          />
        </div>

        <Reveal className="closingMetaWrap">
          <p className="closingMeta">
            NEW PROJECTS / COLLABORATIONS / CONVERSATIONS
          </p>
        </Reveal>

        <Reveal className="closingTitleWrap">
          <h2 className="closingTitle">
            Let&apos;s give the story space.
          </h2>
        </Reveal>

      </section>

    </main>
  );
}