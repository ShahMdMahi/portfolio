"use client";

import type React from "react";

import { type ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";

interface ThreeDCardProps {
  children: ReactNode;
  className?: string;
  glareOpacity?: number;
  rotationIntensity?: number;
  borderRadius?: string;
}

export default function ThreeDCard({
  children,
  className = "",
  glareOpacity = 0.2,
  rotationIntensity = 10,
  borderRadius = "rounded-xl",
}: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Calculate rotation based on mouse position relative to card center
    const rotateYValue =
      ((mouseX - centerX) / (rect.width / 2)) * rotationIntensity;
    const rotateXValue =
      ((centerY - mouseY) / (rect.height / 2)) * rotationIntensity;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);

    // Calculate glare position
    const glareX = ((mouseX - rect.left) / rect.width) * 100;
    const glareY = ((mouseY - rect.top) / rect.height) * 100;
    setGlarePosition({ x: glareX, y: glareY });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${borderRadius} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {children}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, ${glareOpacity}) 0%, rgba(255, 255, 255, 0) 60%)`,
          opacity: Math.abs(rotateX) + Math.abs(rotateY) > 0 ? 1 : 0,
          transition: "opacity 0.3s ease-out",
        }}
      />
    </motion.div>
  );
}
