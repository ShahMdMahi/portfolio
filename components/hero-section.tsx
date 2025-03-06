"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { personalInfo } from "@/data";
import dynamic from "next/dynamic";
import ResponsiveContainer from "./responsive-container";
import { ArrowDown } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

// Dynamically import heavy components
const ParticlesBackground = dynamic(() => import("./particles-background"), {
  ssr: false,
});

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Parallax effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  };

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      if (typeof window.__lenis !== "undefined") {
        window.__lenis.scrollTo(aboutSection, { offset: -80 });
      } else {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.section
      ref={sectionRef}
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,38,44,0.8)_0,rgba(0,0,0,1)_100%)]" />
        {isMounted && <ParticlesBackground className="absolute inset-0" />}
      </div>

      <ResponsiveContainer>
        <motion.div
          ref={textRef}
          className="relative z-10 text-center py-20 max-w-4xl mx-auto"
          style={{ y, opacity }}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="mb-4 inline-block">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white text-sm backdrop-blur-sm border border-white/10">
              {personalInfo.title}
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <h2 className="text-2xl md:text-3xl text-white/80 font-light mb-3">
              Hello, I&apos;m
            </h2>

            <div className="relative">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-blue-400 leading-tight">
                {personalInfo.nickname}
              </h1>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 blur-xl opacity-30 -z-10 rounded-full" />
            </div>

            <div className="text-xl sm:text-2xl md:text-3xl mt-2 text-gray-400">
              <span className="opacity-80">aka</span> {personalInfo.name}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="text-gray-300 text-base sm:text-lg md:text-xl mb-10 max-w-2xl mx-auto"
          >
            <p className="leading-relaxed">
              Building modern web experiences with{" "}
              {personalInfo.experience || "4"} years of professional expertise.
              Specializing in creating beautiful, responsive, and
              high-performance applications.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 sm:mb-20"
          >
            <motion.a
              href="#contact"
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium 
              hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="hover"
            >
              Get in Touch
            </motion.a>
            <motion.a
              href="#projects"
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-transparent border border-white/30 text-white font-medium 
              hover:bg-white/10 transition-colors duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="hover"
            >
              View Projects
            </motion.a>
          </motion.div>

          <motion.button
            variants={itemVariants}
            onClick={scrollToNextSection}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2 text-white/50 hover:text-white/80 transition-colors"
            whileHover={{ y: 3 }}
            data-cursor="hover"
          >
            <span className="text-xs sm:text-sm">Scroll Down</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </motion.button>
        </motion.div>
      </ResponsiveContainer>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>

      {/* Mobile-optimized decorative elements */}
      {isMobile && (
        <div className="absolute bottom-24 left-0 w-full flex justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 0.5, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="w-1 h-16 bg-gradient-to-b from-purple-500/0 via-purple-500/50 to-purple-500/0"
          ></motion.div>
        </div>
      )}
    </motion.section>
  );
}
