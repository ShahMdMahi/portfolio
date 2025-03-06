"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { personalInfo } from "@/data";
import ResponsiveContainer from "./responsive-container";
// import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  // const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Check if user has a theme preference
    // const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    // if (savedTheme) {
    //   setTheme(savedTheme);
    //   document.documentElement.classList.toggle("dark", savedTheme === "dark");
    // }

    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      // Update active section based on scroll position with intersection observer
      const sections = document.querySelectorAll("section[id]");

      // Find which section is most visible in the viewport
      const visibleSections = Array.from(sections).map((section) => {
        const rect = section.getBoundingClientRect();
        const sectionId = section.getAttribute("id") || "";

        // Calculate visibility percentage
        const windowHeight = window.innerHeight;
        const visibleHeight =
          Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const visiblePercentage =
          visibleHeight > 0 ? visibleHeight / rect.height : 0;

        return { id: sectionId, visiblePercentage };
      });

      // Get the section with the highest visibility
      const mostVisibleSection = visibleSections.reduce(
        (prev, current) =>
          current.visiblePercentage > prev.visiblePercentage ? current : prev,
        { id: "", visiblePercentage: 0 }
      );

      if (mostVisibleSection.id && mostVisibleSection.visiblePercentage > 0.3) {
        setActiveSection(mostVisibleSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  // const toggleTheme = () => {
  //   const newTheme = theme === "dark" ? "light" : "dark";
  //   setTheme(newTheme);
  //   document.documentElement.classList.toggle("dark", newTheme === "dark");
  //   localStorage.setItem("theme", newTheme);
  // };

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-black/80 dark:bg-black/80 backdrop-blur-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <ResponsiveContainer className="flex items-center justify-between">
        <Link
          href="#home"
          className="text-white dark:text-white text-2xl font-bold group"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 relative">
            {personalInfo.nickname}.
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300" />
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white transition-colors duration-300 text-sm uppercase tracking-wider relative py-1 group",
                activeSection === item.href.substring(1) &&
                  "text-white dark:text-white"
              )}
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300 opacity-70" />
              {activeSection === item.href.substring(1) && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 to-blue-500"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          ))}

          {/* Theme toggle button */}
          {/* <button
            onClick={toggleTheme}
            className="ml-2 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700 transition-colors"
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-yellow-300" />
            ) : (
              <Moon className="w-4 h-4 text-blue-300" />
            )}
          </button> */}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          {/* <button
            onClick={toggleTheme}
            className="mr-4 p-2 rounded-full bg-gray-800/50 hover:bg-gray-700 transition-colors"
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-yellow-300" />
            ) : (
              <Moon className="w-4 h-4 text-blue-300" />
            )}
          </button> */}

          <button
            className="text-white dark:text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-white dark:bg-white block transition-all duration-300"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-0.5 bg-white dark:bg-white block transition-all duration-300"
              />
              <motion.span
                animate={
                  menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
                }
                className="w-full h-0.5 bg-white dark:bg-white block transition-all duration-300"
              />
            </div>
          </button>
        </div>
      </ResponsiveContainer>

      {/* Mobile Menu - with AnimatePresence for smooth exit animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <motion.div
              className="bg-black/95 dark:bg-black/95 backdrop-blur-md"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <ResponsiveContainer className="py-6 space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "text-gray-300 dark:text-gray-300 hover:text-white dark:hover:text-white block py-3 text-lg relative group",
                        activeSection === item.href.substring(1) &&
                          "text-white dark:text-white font-medium"
                      )}
                      onClick={() => setMenuOpen(false)}
                    >
                      <div className="flex items-center">
                        <span>{item.name}</span>
                        {activeSection === item.href.substring(1) && (
                          <motion.span
                            className="ml-2 w-1 h-5 rounded-full bg-gradient-to-b from-purple-500 to-blue-500"
                            layoutId="mobileActiveIndicator"
                          />
                        )}
                      </div>
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-purple-500/50 to-blue-500/50 group-hover:w-1/4 transition-all duration-300" />
                    </Link>
                  </motion.div>
                ))}
              </ResponsiveContainer>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
