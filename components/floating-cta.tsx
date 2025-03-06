"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  useEffect(() => {
    // // Check if user has dismissed the CTA before
    // const dismissed = localStorage.getItem("cta-dismissed");
    // if (dismissed) {
    //   setIsDismissed(true);
    //   return;
    // }

    // Show CTA after scrolling a bit
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight && !isVisible) {
        setIsVisible(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Fallback timer
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10000);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem("cta-dismissed", "true");
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div
          className={`fixed ${
            isMobile ? "bottom-20" : "bottom-6"
          } right-6 z-40 flex flex-col items-end`}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="mb-4 bg-gray-900 p-5 rounded-lg shadow-lg border border-gray-800 max-w-xs relative"
              >
                <button
                  onClick={handleDismiss}
                  className="absolute top-2 right-2 text-gray-400 hover:text-white"
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
                <p className="text-white mb-3">
                  Interested in working together? Let&apos;s discuss your
                  project!
                </p>
                <a
                  href="#contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-center rounded-md hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                >
                  Get in Touch
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            initial={{ scale: 0, rotate: prefersReducedMotion ? 0 : -180 }}
            animate={{ scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white flex items-center justify-center shadow-lg relative"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 blur-md opacity-70" />
            <MessageSquare className="w-6 h-6 relative z-10" />
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
