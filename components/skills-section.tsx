"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { skills } from "@/data";
import SectionHeading from "./section-heading";
import ResponsiveContainer from "./responsive-container";
import ResponsiveGrid from "./responsive-grid";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Core skills with percentage for skill bars
  const coreSkills = [
    { name: "JavaScript/TypeScript", percentage: 95 },
    { name: "React & Next.js", percentage: 90 },
    { name: "Node.js & Express", percentage: 85 },
    { name: "UI/UX Design", percentage: 80 },
    { name: "Database Management", percentage: 85 },
    { name: "DevOps & Cloud", percentage: 75 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const toggleCategory = (category: string) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-24 bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(37,38,44,0.3)_0,rgba(0,0,0,1)_70%)]" />

      <ResponsiveContainer>
        <SectionHeading title="My" highlight="Skills" />

        {/* Core Skills with bars */}
        <motion.div
          className="mb-16 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h3
            variants={itemVariants}
            className="text-2xl font-bold text-white mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-300 to-white"
          >
            Core Expertise
          </motion.h3>
          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            {coreSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="flex justify-between mb-2">
                  <span className="text-white font-medium group-hover:text-purple-300 transition-colors">
                    {skill.name}
                  </span>
                  <span className="text-purple-400">{skill.percentage}%</span>
                </div>
                <div className="h-3 bg-gray-800/50 backdrop-blur-sm rounded-full overflow-hidden relative">
                  {/* Border glow on hover */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/50 group-hover:to-blue-600/50 rounded-full blur-sm transition-all duration-700 opacity-0 group-hover:opacity-100" />

                  {/* Main progress bar */}
                  <div className="absolute inset-0 w-full h-full rounded-full overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 h-full"
                      initial={{ width: 0 }}
                      animate={
                        isInView
                          ? { width: `${skill.percentage}%` }
                          : { width: 0 }
                      }
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                    />
                  </div>

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 w-full h-full">
                    <motion.div
                      className="absolute inset-0 w-20 rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: index,
                      }}
                      style={{
                        clipPath: `polygon(0 0, ${skill.percentage}% 0, ${skill.percentage}% 100%, 0 100%)`,
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Detailed Skills */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {isMobile ? (
            // Mobile accordion view
            <div className="space-y-4">
              {skills.map((skillCategory) => (
                <motion.div
                  key={skillCategory.category}
                  variants={itemVariants}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden"
                >
                  <button
                    onClick={() => toggleCategory(skillCategory.category)}
                    className="w-full p-4 flex justify-between items-center text-left"
                  >
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                      {skillCategory.category}
                    </h3>
                    {expandedCategory === skillCategory.category ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>

                  <AnimatePresence>
                    {expandedCategory === skillCategory.category && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-0 space-y-4 border-t border-gray-800">
                          {skillCategory.items.map((item) => (
                            <div key={item.name} className="space-y-2">
                              <h4 className="text-gray-300 font-medium text-sm">
                                {item.name}
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {item.technologies.map((tech) => (
                                  <span
                                    key={tech}
                                    className="px-3 py-1 bg-gray-800/80 text-gray-300 text-xs rounded-full border border-gray-700/50 hover:border-purple-500/50 hover:bg-purple-900/20 hover:text-white transition-all duration-300"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          ) : (
            // Desktop grid view
            <ResponsiveGrid cols={{ sm: 1, md: 2, lg: 3 }}>
              {skills.map((skillCategory) => (
                <motion.div
                  key={skillCategory.category}
                  variants={itemVariants}
                  className="group bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-purple-500/30 transition-all duration-300 relative"
                  whileHover={{ y: -5 }}
                >
                  {/* Hover effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/20 group-hover:to-blue-600/20 rounded-xl blur-md transition-all duration-700 opacity-0 group-hover:opacity-100" />

                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                      {skillCategory.category}
                    </h3>

                    <div className="space-y-4">
                      {skillCategory.items.map((item) => (
                        <div key={item.name} className="space-y-2">
                          <h4 className="text-gray-300 font-medium text-sm">
                            {item.name}
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {item.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1 bg-gray-800/80 text-gray-300 text-xs rounded-full border border-gray-700/50 hover:border-purple-500/50 hover:bg-purple-900/20 hover:text-white transition-all duration-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </ResponsiveGrid>
          )}
        </motion.div>
      </ResponsiveContainer>
    </section>
  );
}
