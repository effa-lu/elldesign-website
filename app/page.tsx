import Reveal from "../components/Reveal";
import MediaReveal from "../components/MediaReveal";

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
              Exl Studio
            </h1>
          </Reveal>


          <Reveal delay={110}>
            <h2 className="heroTitle">
              We build narratives
              <br />
              through space.
            </h2>
          </Reveal>


          <Reveal delay={240}>
            <p className="heroAudience">
              <span className="heroAudienceRoles">
                FOR FILMMAKERS&nbsp;&nbsp;·&nbsp;&nbsp;MUSICIANS&nbsp;&nbsp;·&nbsp;&nbsp;THEATRE-MAKERS&nbsp;&nbsp;·&nbsp;&nbsp;CURATORS&nbsp;&nbsp;·&nbsp;&nbsp;BRANDS
              </span>
              <span className="heroAudienceLead">
                — ANYONE WITH A STORY THAT NEEDS A SPACE.
              </span>
            </p>
          </Reveal>

        </div>


        <Reveal
          className="heroMetaReveal"
          delay={220}
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

        <Reveal
          className="sectionLabelReveal"
          delay={120}
        >
          <p className="sectionLabel">
            01 / SPACE AS MEDIUM
          </p>
        </Reveal>


        <div className="spaceMediumImage">

          <MediaReveal>
            <img
              src="/images/home/space-medium.png"
              alt="Space as medium"
            />
          </MediaReveal>

        </div>


        <Reveal
          className="mediumLeftWrap"
          delay={180}
        >
          <h2 className="mediumTitle">
            Not a backdrop.
          </h2>
        </Reveal>


        <Reveal
          className="mediumRightWrap"
          delay={300}
        >
          <h2 className="mediumTitle">
            A place to enter.
          </h2>
        </Reveal>


        <Reveal
          className="mediumCaptionWrap"
          delay={420}
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

        <Reveal
          className="sectionLabelReveal"
          delay={100}
        >
          <p className="sectionLabel">
            02 / SPATIAL NARRATIVE
          </p>
        </Reveal>


        <div className="narrativeImage">

          <MediaReveal
            className="narrativeMediaReveal"
          >
            <img
              src="/images/home/narrative-collage.png"
              alt="Spatial narrative collage"
              className="narrativeCollage"
            />
          </MediaReveal>

        </div>


        <Reveal
          className="narrativeTitleWrap"
          delay={220}
        >
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
          delay={380}
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

          <Reveal
            className="studioLabelWrap"
          >
            <div className="studioLabel">
              <span>THE STUDIO</span>
              <span>Exl Studio</span>
            </div>
          </Reveal>


          <div className="studioMain">

            <Reveal delay={120}>
              <h2 className="studioTitle">
                We use space to make
                <br />
                narratives physical.
              </h2>
            </Reveal>


            <Reveal delay={260}>
              <p className="studioDescription">
                Exl Studio is an interdisciplinary
                spatial design practice working
                across stage, set, architecture,
                and experimental environments.
                We bring together design,
                narrative, and engineering to
                create spaces that are not only
                seen, but experienced.
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

            <Reveal delay={100}>
              <div className="capabilityItem">
                Stage Design
                <br />
                Spatial Storytelling
              </div>
            </Reveal>


            <Reveal delay={220}>
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

          <MediaReveal
            className="closingMediaReveal"
          >
            <img
              src="/images/home/closing-earth.jpg"
              alt="Exl Studio closing"
            />
          </MediaReveal>

        </div>


        <Reveal
          className="closingMetaWrap"
          delay={150}
        >
          <p className="closingMeta">
            NEW PROJECTS / COLLABORATIONS / CONVERSATIONS
          </p>
        </Reveal>


        <Reveal
          className="closingTitleWrap"
          delay={300}
        >
          <h2 className="closingTitle">
            Let&apos;s give the story space.
          </h2>
        </Reveal>

      </section>

    </main>
  );
}