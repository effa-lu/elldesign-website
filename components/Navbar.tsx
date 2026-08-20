"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();

  /*
    A24-style nav:
    hides on scroll-down, returns on scroll-up.
  */
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;

        setHidden(y > last && y > 120);

        last = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* nav always returns when the route changes */
  useEffect(() => {
    setHidden(false);
  }, [pathname]);

  const getCenterContent = () => {
    if (pathname === "/work" || pathname.startsWith("/work/")) {
      return {
        title: "WORKS",
        subtitle: "stage · set · spatial",
      };
    }

    if (pathname === "/studio") {
      return {
        title: "STUDIO",
        subtitle: "space · story · system",
      };
    }

    if (pathname === "/contact") {
      return {
        title: "CONTACT",
        subtitle: "projects · collaborations · conversations",
      };
    }

    return null;
  };

  const center = getCenterContent();

  return (
    <header
      className={[
        "siteHeader",
        hidden ? "siteHeaderHidden" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >

      {/* LEFT */}
      <Link href="/" className="headerBrand">
        <span className="headerBrandMain">
          ELLdesign
        </span>

        <span className="headerBrandSub">
          spatial narrative studio
        </span>
      </Link>


      {/* CENTER */}
      {center && (
        <div className="headerCenter">
          <span className="headerCenterTitle">
            {center.title}
          </span>

          <span className="headerCenterSub">
            {center.subtitle}
          </span>
        </div>
      )}


      {/* RIGHT */}
      <nav className="headerNav">

        <Link
          href="/work"
          className={pathname === "/work" ? "active" : ""}
        >
          WORK
        </Link>

        <Link
          href="/studio"
          className={pathname === "/studio" ? "active" : ""}
        >
          STUDIO
        </Link>

        <Link
          href="/contact"
          className={pathname === "/contact" ? "active" : ""}
        >
          CONTACT
        </Link>

      </nav>

    </header>
  );
}