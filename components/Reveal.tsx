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

  /*
    once = true
    → stays visible after first reveal
    (A24 behaviour: revealed items never re-hide)
  */
  once?: boolean;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  once = false,
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
          → reset animation (unless `once`)
        */

        if (entry.isIntersecting) {
          setVisible(true);

          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
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
  }, [once]);

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