"use client";

import { ReactNode, useRef, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export default function FadeInWhenVisible({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = "up",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const directionTransform = {
    up: "translateY(40px)",
    down: "translateY(-40px)",
    left: "translateX(40px)",
    right: "translateX(-40px)",
    none: "translate(0, 0)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translate(0, 0)" : directionTransform[direction],
        transition: `opacity ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s, transform ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s`,
        willChange: isVisible ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
