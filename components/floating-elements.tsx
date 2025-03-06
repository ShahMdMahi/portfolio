"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  blur: number;
  color: string;
}

interface FloatingElementsProps {
  count?: number;
  className?: string;
  colors?: string[];
  minSize?: number;
  maxSize?: number;
  minOpacity?: number;
  maxOpacity?: number;
}

export default function FloatingElements({
  count = 15,
  className = "",
  colors = ["purple", "blue", "indigo"],
  minSize = 10,
  maxSize = 80,
  minOpacity = 0.03,
  maxOpacity = 0.08,
}: FloatingElementsProps) {
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Optimize by reducing element count based on device
  const actualCount =
    typeof window !== "undefined" && window.innerWidth < 768
      ? Math.floor(count / 2)
      : count;

  useEffect(() => {
    setMounted(true);

    const colorMap: Record<string, string> = {
      purple: "rgba(147, 51, 234, 1)",
      blue: "rgba(59, 130, 246, 1)",
      indigo: "rgba(79, 70, 229, 1)",
      pink: "rgba(236, 72, 153, 1)",
      cyan: "rgba(6, 182, 212, 1)",
    };

    const generateElements = () => {
      // If user prefers reduced motion, generate fewer elements with less animation
      const newElements: FloatingElement[] = [];
      const finalCount = prefersReducedMotion
        ? Math.min(5, actualCount)
        : actualCount;

      for (let i = 0; i < finalCount; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];

        newElements.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * (maxSize - minSize) + minSize,
          duration: prefersReducedMotion ? 0 : Math.random() * 20 + 15,
          delay: Math.random() * 5,
          opacity: Math.random() * (maxOpacity - minOpacity) + minOpacity,
          blur: Math.random() * 40 + 10,
          color: colorMap[color] || colorMap.purple,
        });
      }

      setElements(newElements);
    };

    generateElements();

    // Set up intersection observer to only animate when in viewport
    const observer = new IntersectionObserver(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (entries) => {
        // We're not using isIntersecting but keeping the observer
        // for future animation optimizations
      },
      { threshold: 0.1 }
    );

    // Use the ref instead of querySelector
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [
    actualCount,
    colors,
    maxOpacity,
    maxSize,
    minOpacity,
    minSize,
    prefersReducedMotion,
  ]);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full"
          initial={{
            x: `${element.x}%`,
            y: `${element.y}%`,
          }}
          animate={
            prefersReducedMotion
              ? {}
              : {
                  x: `${element.x < 50 ? element.x + 10 : element.x - 10}%`,
                  y: `${element.y < 50 ? element.y + 10 : element.y - 10}%`,
                }
          }
          transition={{
            duration: element.duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: element.delay,
          }}
          style={{
            width: element.size,
            height: element.size,
            backgroundColor: element.color,
            opacity: element.opacity,
            filter: `blur(${element.blur}px)`,
            willChange: "transform", // Optimize for animations
          }}
        />
      ))}
    </div>
  );
}
