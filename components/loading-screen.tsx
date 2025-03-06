"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/data";

export default function LoadingScreen() {
  useEffect(() => {
    // Prevent scrolling during loading
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 bg-black flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.8,
          ease: "easeInOut",
        },
      }}
    >
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
            {personalInfo.nickname}
            <span className="text-white">.</span>
          </h1>
        </motion.div>

        <div className="relative h-1 w-[200px] mx-auto bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500"
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-4 text-gray-400 text-sm"
        >
          {personalInfo.title}
        </motion.p>
      </div>
    </motion.div>
  );
}
