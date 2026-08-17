"use client";

import { useEffect, useRef } from "react";

export default function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const trail = trailRef.current;
    const chip = chipRef.current;

    if (!dot || !trail || !chip) return;

    /*
      Custom cursor only for fine pointers;
      fully disabled on touch devices and
      under prefers-reduced-motion.
    */
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (!finePointer.matches || reducedMotion.matches) return;

    let mouseX = -100;
    let mouseY = -100;

    let trailX = -100;
    let trailY = -100;

    let chipX = -100;
    let chipY = -100;

    let chipActive = false;

    let animationFrame: number;

    const moveCursor = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // 主点：直接跟随鼠标
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      dot.style.opacity = chipActive ? "0" : "1";
      trail.style.opacity = chipActive ? "0" : "1";
    };

    const animateTrail = () => {
      // 数字越小，尾巴延迟越明显
      trailX += (mouseX - trailX) * 0.13;
      trailY += (mouseY - trailY) * 0.13;

      trail.style.transform = `translate3d(${trailX}px, ${trailY}px, 0)`;

      // chip 拖尾 (spec: lerp ~0.18)
      chipX += (mouseX - chipX) * 0.18;
      chipY += (mouseY - chipY) * 0.18;

      chip.style.transform = `translate3d(${chipX}px, ${chipY}px, 0)`;

      animationFrame = requestAnimationFrame(animateTrail);
    };

    const hideCursor = () => {
      dot.style.opacity = "0";
      trail.style.opacity = "0";
      chip.classList.remove("cursorChipActive");
    };

    /*
      Labeled cursor chip ("VIEW →") over any
      element marked data-cursor.
    */
    const onOver = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest?.(
        "[data-cursor]"
      );

      const next = !!target;

      const label = chip.querySelector(".cursorChipLabel");

      if (next && target && label) {
        label.textContent =
          target.getAttribute("data-cursor-label") || "VIEW →";
      }

      if (next !== chipActive) {
        chipActive = next;

        chip.classList.toggle("cursorChipActive", chipActive);

        dot.style.opacity = chipActive ? "0" : "1";
        trail.style.opacity = chipActive ? "0" : "1";
      }
    };

    window.addEventListener("pointermove", moveCursor);
    window.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("mouseleave", hideCursor);

    animateTrail();

    return () => {
      window.removeEventListener("pointermove", moveCursor);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("mouseleave", hideCursor);

      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      {/* 延迟尾巴 */}
      <div
        ref={trailRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,

          width: "22px",
          height: "22px",

          marginLeft: "-11px",
          marginTop: "-11px",

          borderRadius: "50%",

          background: "rgba(81, 71, 255, 0.16)",

          filter: "blur(5px)",

          pointerEvents: "none",
          zIndex: 99999998,

          opacity: 0,

          transform: "translate3d(-100px, -100px, 0)",

          transition: "opacity 0.25s ease",

          willChange: "transform",
        }}
      />

      {/* 主蓝点 */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,

          width: "8px",
          height: "8px",

          marginLeft: "-4px",
          marginTop: "-4px",

          borderRadius: "50%",

          background: "#5147ff",

          boxShadow:
            "0 0 7px rgba(81,71,255,0.9), 0 0 15px rgba(81,71,255,0.35)",

          pointerEvents: "none",
          zIndex: 99999999,

          opacity: 0,

          transform: "translate3d(-100px, -100px, 0)",

          transition: "opacity 0.15s ease",

          willChange: "transform",
        }}
      />

      {/* VIEW → chip (A24 E7) */}
      <div ref={chipRef} className="cursorChip">
        <span className="cursorChipLabel" />
      </div>
    </>
  );
}
