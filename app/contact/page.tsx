import Reveal from "../../components/Reveal";

export default function ContactPage() {
  return (
    <main className="contactPage">

      <section className="contactHero">

        <div className="contactInner">

          {/* =====================================================
              LABEL
          ====================================================== */}

          <Reveal>
            <p className="contactEyebrow">
              CONTACT / NEW PROJECTS / COLLABORATIONS
            </p>
          </Reveal>


          {/* =====================================================
              MAIN GRID
          ====================================================== */}

          <div className="contactGrid">

            {/* =========================
                LEFT
            ========================== */}

            <div className="contactIntro">

              <Reveal delay={100}>
                <h1 className="contactTitle">
                  Let&apos;s build a world.
                </h1>
              </Reveal>


              <Reveal delay={220}>
                <p className="contactDescription">
                  Leave something behind...
                  <br />
                  A thought, a project, a possibility - or simply hello!
                </p>
              </Reveal>

            </div>


            {/* =========================
                FORM
            ========================== */}

            <Reveal
              className="contactFormReveal"
              delay={280}
            >
              <form className="contactForm">

                <label>
                  Name

                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                  />
                </label>


                <label>
                  Email

                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                  />
                </label>


                <label>
                  Message

                  <textarea
                    name="message"
                    placeholder="Tell us what you have in mind..."
                  />
                </label>


                <button type="submit">
                  Submit
                </button>

              </form>
            </Reveal>

          </div>


          {/* =====================================================
              BOTTOM
          ====================================================== */}

          <Reveal
            className="contactBottomReveal"
            delay={380}
          >
            <div className="contactBottom">

              <p>
                ELLDdesign@studio
              </p>

              <p>
                Los Angeles · Hong Kong
              </p>

            </div>
          </Reveal>

        </div>

      </section>

    </main>
  );
}