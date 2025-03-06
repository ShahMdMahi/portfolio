"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { education } from "@/data";
import { GraduationCap } from "lucide-react";
import SectionHeading from "./section-heading";
import ResponsiveContainer from "./responsive-container";

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="education"
      className="py-24 bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,38,44,0.3)_0,rgba(0,0,0,1)_70%)]" />

      <ResponsiveContainer>
        <SectionHeading title="My" highlight="Education" />

        <motion.div
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:transform md:-translate-x-px">
              <div className="h-full bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500" />
              <div className="h-full w-full bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 animate-pulse opacity-70" />
            </div>

            <div className="space-y-16 md:space-y-24">
              {education.map((edu, index) => (
                <div key={edu.institution} className="relative">
                  <motion.div
                    variants={itemVariants}
                    className={`flex flex-col md:flex-row ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    } items-start group`}
                  >
                    {/* Timeline dot with pulse effect */}
                    <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-gray-900 border-2 border-blue-500 flex items-center justify-center relative">
                        <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping opacity-70" />
                        <GraduationCap className="w-5 h-5 text-blue-400 relative z-10" />
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      className={`pl-20 md:pl-0 ${
                        index % 2 === 0
                          ? "md:pr-[calc(50%+2rem)] md:text-right"
                          : "md:pl-[calc(50%+2rem)]"
                      } relative w-full`}
                    >
                      <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-blue-500/30 transition-all duration-300 relative"
                      >
                        {/* Card glow effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/20 group-hover:to-purple-600/20 rounded-xl blur-md transition-all duration-500 opacity-0 group-hover:opacity-100" />

                        {/* Content */}
                        <div className="relative z-10">
                          <span className="inline-block px-3 py-1 bg-blue-900/50 text-blue-200 text-xs rounded-full mb-3 border border-blue-500/20">
                            {edu.years}
                          </span>

                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                            {edu.institution}
                          </h3>

                          <h4 className="text-blue-400 mb-3 group-hover:text-blue-300 transition-colors">
                            {edu.degree}
                          </h4>

                          <p
                            className={`text-gray-300 text-sm group-hover:text-gray-200 transition-colors ${
                              index % 2 === 0 ? "md:text-right" : ""
                            }`}
                          >
                            {edu.description}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </ResponsiveContainer>
    </section>
  );
}
