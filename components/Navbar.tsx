"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

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
    <header className="siteHeader">

      {/* LEFT */}
      <Link href="/" className="headerBrand">
        <span className="headerBrandMain">
          ELLDdesign
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