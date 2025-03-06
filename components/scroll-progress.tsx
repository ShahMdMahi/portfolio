"use client";

// import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
// import { ArrowUp } from "lucide-react";
// import { useMediaQuery } from "@/hooks/use-media-query";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  // const [isVisible, setIsVisible] = useState(false);
  // const isMobile = useMediaQuery("(max-width: 768px)");

  // useEffect(() => {
  //   const handleScroll = () => {
  //     // Show after scrolling down a bit
  //     if (window.scrollY > 300) {
  //       setIsVisible(true);
  //     } else {
  //       setIsVisible(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll, { passive: true });
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  // const handleScrollToTop = () => {
  //   // Use the smooth scroll behavior from Lenis
  //   const scrollToTop = () => {
  //     // Check if lenis is available in window
  //     if (typeof window !== "undefined" && (window as any).__lenis) {
  //       (window as any).__lenis.scrollTo(0, { duration: 1.5 });
  //     } else {
  //       // Fallback to native smooth scroll
  //       window.scrollTo({
  //         top: 0,
  //         behavior: "smooth",
  //       });
  //     }
  //   };

  //   scrollToTop();
  // };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-50"
        style={{
          scaleX,
          background:
            "linear-gradient(to right, rgba(147, 51, 234, 0.7), rgba(59, 130, 246, 0.7))",
          transformOrigin: "left",
        }}
      />

      {/* <motion.button
        onClick={handleScrollToTop}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
          y: isVisible ? 0 : 20,
        }}
        transition={{
          duration: 0.3,
          type: "spring",
          stiffness: 300,
          damping: 25,
        }}
        className={`fixed ${
          isMobile ? "bottom-20" : "bottom-6"
        } left-6 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white flex items-center justify-center shadow-lg z-50 group`}
        aria-label="Scroll to top"
        data-cursor="hover"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
        <ArrowUp className="w-5 h-5 relative z-10" />
      </motion.button> */}
    </>
  );
}
