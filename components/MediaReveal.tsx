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
};

export default function MediaReveal({
  children,
  className = "",
  delay = 0,
}: MediaRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
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
  }, []);

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