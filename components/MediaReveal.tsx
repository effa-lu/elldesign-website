"use client";

import {
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type MediaRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;

  /* stays visible after first reveal (A24 behaviour) */
  once?: boolean;
};

export default function MediaReveal({
  children,
  className = "",
  delay = 0,
  once = false,
}: MediaRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);

          if (once) observer.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
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
        "mediaReveal",
        visible ? "mediaRevealVisible" : "",
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