"use client";

import { useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import LoadingScreen from "@/components/loading-screen";
import ScrollProgress from "@/components/scroll-progress";
import { AnimatePresence } from "framer-motion";
import ErrorBoundary from "@/components/error-boundary";

// Dynamically import heavy components
const CustomCursor = dynamic(() => import("@/components/cursor"), {
  ssr: false,
});

// Dynamically import SmoothScroll
const SmoothScroll = dynamic(() => import("@/components/smooth-scroll"), {
  ssr: false,
});

// Lazy load sections for better performance
const AboutSection = dynamic(() => import("@/components/about-section"), {
  ssr: false,
  loading: () => <SectionSkeleton />,
});

const SkillsSection = dynamic(() => import("@/components/skills-section"), {
  ssr: false,
  loading: () => <SectionSkeleton />,
});

const ExperienceSection = dynamic(
  () => import("@/components/experience-section"),
  {
    ssr: false,
    loading: () => <SectionSkeleton />,
  }
);

const ProjectsSection = dynamic(() => import("@/components/projects-section"), {
  ssr: false,
  loading: () => <SectionSkeleton />,
});

const EducationSection = dynamic(
  () => import("@/components/education-section"),
  {
    ssr: false,
    loading: () => <SectionSkeleton />,
  }
);

const ContactSection = dynamic(() => import("@/components/contact-section"), {
  ssr: false,
  loading: () => <SectionSkeleton />,
});

const Footer = dynamic(() => import("@/components/footer"), {
  ssr: false,
});

const FloatingCTA = dynamic(() => import("@/components/floating-cta"), {
  ssr: false,
});

// Simple skeleton loader for sections
function SectionSkeleton() {
  return (
    <div className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="h-8 bg-gray-800/50 rounded-md w-48 mx-auto mb-12 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-64 bg-gray-900/30 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Preload essential assets and initialize
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, []);

  // Handle smooth appearance after loading
  const mainContent = (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loading" />
      ) : (
        <main
          key="main"
          className="bg-background dark:bg-black text-foreground dark:text-white"
        >
          <ScrollProgress />
          <Navbar />

          <ErrorBoundary>
            <HeroSection />
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SectionSkeleton />}>
              <AboutSection />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SectionSkeleton />}>
              <SkillsSection />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SectionSkeleton />}>
              <ExperienceSection />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SectionSkeleton />}>
              <ProjectsSection />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SectionSkeleton />}>
              <EducationSection />
            </Suspense>
          </ErrorBoundary>

          <ErrorBoundary>
            <Suspense fallback={<SectionSkeleton />}>
              <ContactSection />
            </Suspense>
          </ErrorBoundary>

          <Footer />
          <FloatingCTA />
        </main>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {mounted && <CustomCursor />}
      {mounted ? <SmoothScroll>{mainContent}</SmoothScroll> : mainContent}
    </>
  );
}
