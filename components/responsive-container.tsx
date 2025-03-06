"use client";

import type { ReactNode } from "react";

interface ResponsiveContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: string;
  as?: keyof JSX.IntrinsicElements;
  id?: string;
}

export default function ResponsiveContainer({
  children,
  className = "",
  maxWidth = "max-w-7xl",
  as: Component = "div",
  id,
}: ResponsiveContainerProps) {
  return (
    <Component
      id={id}
      className={`w-full mx-auto px-4 sm:px-6 md:px-8 ${maxWidth} ${className}`}
    >
      {children}
    </Component>
  );
}
