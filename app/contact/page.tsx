"use client";

import { useState } from "react";
import Reveal from "../../components/Reveal";


export default function ContactPage() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");


  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setStatus("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");


    try {
      const response = await fetch("/api/contact", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });


      if (!response.ok) {
        throw new Error("Failed to send message.");
      }


      setStatus("success");

      form.reset();

    } catch (error) {
      console.error(error);

      setStatus("error");
    }
  }


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

              <form
                className="contactForm"
                onSubmit={handleSubmit}
              >

                <label>
                  Name

                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                    disabled={status === "sending"}
                  />
                </label>


                <label>
                  Email

                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    required
                    disabled={status === "sending"}
                  />
                </label>


                <label>
                  Message

                  <textarea
                    name="message"
                    placeholder="Tell us what you have in mind..."
                    required
                    disabled={status === "sending"}
                  />
                </label>


                <button
                  type="submit"
                  disabled={status === "sending"}
                >
                  {status === "sending"
                    ? "Sending..."
                    : "Submit"}
                </button>


                <div
                  className="contactFormStatus"
                  aria-live="polite"
                >

                  {status === "success" && (
                    <p>
                      Message received. We&apos;ll be in touch shortly.
                    </p>
                  )}


                  {status === "error" && (
                    <p>
                      Something went wrong. Please try again.
                    </p>
                  )}

                </div>

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
                ELLdesign@studio
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
