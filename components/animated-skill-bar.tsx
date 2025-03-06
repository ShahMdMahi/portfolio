"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface AnimatedSkillBarProps {
  name: string;
  percentage: number;
  color?: string;
  delay?: number;
}

export default function AnimatedSkillBar({
  name,
  percentage,
  color = "bg-gradient-to-r from-blue-500 to-purple-600",
  delay = 0,
}: AnimatedSkillBarProps) {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return (
    <div ref={ref} className="w-full">
      <div className="flex justify-between mb-2">
        <span className="text-white font-medium">{name}</span>
        <span className="text-gray-400">{percentage}%</span>
      </div>
      <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full ${color}`}
          initial={{ width: 0 }}
          animate={controls}
          variants={{
            visible: {
              width: `${percentage}%`,
              transition: { duration: 1, ease: "easeOut", delay },
            },
          }}
        />
      </div>
    </div>
  );
}
