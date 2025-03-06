"use client";

import { type ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down" | "left" | "right";
  overflow?: boolean;
}

export default function ParallaxSection({
  children,
  className = "",
  speed = 0.2,
  direction = "up",
  overflow = false,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate transform based on direction
  const upTransform = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${-speed * 100}%`]
  );
  const downTransform = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${speed * 100}%`]
  );
  const leftTransform = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${-speed * 100}%`]
  );
  const rightTransform = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${speed * 100}%`]
  );

  let transform;
  switch (direction) {
    case "up":
      transform = upTransform;
      break;
    case "down":
      transform = downTransform;
      break;
    case "left":
      transform = leftTransform;
      break;
    case "right":
      transform = rightTransform;
      break;
    default:
      transform = upTransform;
  }

  const isHorizontal = direction === "left" || direction === "right";
  const transformProp = isHorizontal ? { x: transform } : { y: transform };

  return (
    <div
      ref={ref}
      className={`${
        overflow ? "overflow-visible" : "overflow-hidden"
      } ${className}`}
    >
      <motion.div style={transformProp}>{children}</motion.div>
    </div>
  );
}
