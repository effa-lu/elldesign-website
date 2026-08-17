"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

/*
  A24 E9 — page transition.

  Any <a data-transition> click fades a black
  overlay in (~400ms) before navigating, so the
  cut between pages reads like a film cut.

  The overlay fades back out when the new
  route is on screen.
*/

export default function PageFade() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  /* fade out on arrival */
  useEffect(() => {
    const overlay = overlayRef.current;

    if (!overlay) return;

    const frame = requestAnimationFrame(() => {
      overlay.classList.remove("pageFadeActive");
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  /* intercept marked links, fade in, then navigate */
  useEffect(() => {
    const overlay = overlayRef.current;

    if (!overlay) return;

    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      const link = (e.target as Element | null)?.closest?.(
        "a[data-transition]"
      ) as HTMLAnchorElement | null;

      if (!link) return;

      const href = link.getAttribute("href");

      if (!href || href.startsWith("#") || link.target === "_blank") {
        return;
      }

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reducedMotion) return;

      e.preventDefault();

      overlay.classList.add("pageFadeActive");

      window.setTimeout(() => {
        router.push(href);
      }, 400);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
    };
  }, [router]);

  return <div ref={overlayRef} className="pageFade" />;
}
