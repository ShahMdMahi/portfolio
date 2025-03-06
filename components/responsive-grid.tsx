"use client";

import type { ReactNode } from "react";

interface ResponsiveGridProps {
  children: ReactNode;
  className?: string;
  cols?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: string;
}

export default function ResponsiveGrid({
  children,
  className = "",
  cols = { sm: 1, md: 2, lg: 3, xl: 3 },
  gap = "gap-6 md:gap-8",
}: ResponsiveGridProps) {
  // Generate grid columns classes based on props
  const gridCols = [
    cols.sm ? `grid-cols-${cols.sm}` : "grid-cols-1",
    cols.md ? `md:grid-cols-${cols.md}` : "md:grid-cols-2",
    cols.lg ? `lg:grid-cols-${cols.lg}` : "lg:grid-cols-3",
    cols.xl ? `xl:grid-cols-${cols.xl}` : "xl:grid-cols-3",
  ].join(" ");

  return (
    <div className={`grid ${gridCols} ${gap} ${className}`}>{children}</div>
  );
}
