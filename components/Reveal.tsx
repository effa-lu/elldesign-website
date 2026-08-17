"use client";

import {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        /*
          ENTER viewport
          → play animation

          LEAVE viewport
          → reset animation

          So it plays again every time
          you scroll back.
        */

        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.18,

        /*
          Don't trigger immediately
          at the very bottom edge.
        */
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={[
        "reveal",
        visible ? "revealVisible" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        transitionDelay: visible
          ? `${delay}ms`
          : "0ms",
      }}
    >
      {children}
    </div>
  );
}