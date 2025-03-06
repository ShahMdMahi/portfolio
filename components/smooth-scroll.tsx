"use client";

import type React from "react";
import { useEffect, useState, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { useMediaQuery } from "@/hooks/use-media-query";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const requestRef = useRef<number | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  useEffect(() => {
    // Skip smooth scrolling if user prefers reduced motion
    if (prefersReducedMotion) {
      return;
    }

    const lenisInstance = new Lenis({
      duration: isMobile ? 1.0 : 1.2, // Slightly faster on mobile
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Remove direction and gestureDirection properties
      smooth: !isMobile, // Disable smooth scrolling on mobile
      smoothTouch: false, // Disable on touch devices for better performance
      touchMultiplier: 1.5,
      wheelMultiplier: 1.2,
      normalizeWheel: true,
    });

    // Make lenis available globally for other components
    if (typeof window !== "undefined") {
      (window as any).__lenis = lenisInstance;
    }

    setLenis(lenisInstance);

    // Handle anchor links for smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (
        anchor &&
        anchor.hash &&
        anchor.hash.startsWith("#") &&
        document.querySelector(anchor.hash)
      ) {
        e.preventDefault();

        const targetElement = document.querySelector(anchor.hash);
        if (targetElement) {
          lenisInstance.scrollTo(targetElement as HTMLElement, {
            offset: -80, // Offset for fixed header
            duration: 1.5,
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    // Optimize the animation frame loop
    const raf = (time: number) => {
      lenisInstance.raf(time);
      requestRef.current = requestAnimationFrame(raf);
    };

    requestRef.current = requestAnimationFrame(raf);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
      lenisInstance.destroy();
    };
  }, [isMobile, prefersReducedMotion]);

  return <>{children}</>;
}
