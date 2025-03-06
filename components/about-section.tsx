"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { professionalSummary, personalInfo } from "@/data";
import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
} from "lucide-react";
import SectionHeading from "./section-heading";
import ResponsiveContainer from "./responsive-container";
import Image from "next/image";

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  const socialIcons = {
    GitHub: <Github className="w-5 h-5" />,
    LinkedIn: <Linkedin className="w-5 h-5" />,
    Instagram: <Instagram className="w-5 h-5" />,
    X: <Twitter className="w-5 h-5" />,
    Facebook: <Facebook className="w-5 h-5" />,
    YouTube: <Youtube className="w-5 h-5" />,
  };

  const stats = [
    { label: "Years Experience", value: 4, suffix: "+" },
    { label: "Projects Completed", value: 30, suffix: "+" },
    { label: "Happy Clients", value: 25, suffix: "+" },
    { label: "Technologies", value: 20, suffix: "+" },
  ];

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
      id="about"
      className="py-24 bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,38,44,0.3)_0,rgba(0,0,0,1)_70%)]" />

      <ResponsiveContainer>
        <SectionHeading title="About" highlight="Me" />

        <motion.div
          className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="relative">
            <div className="aspect-square w-full max-w-md mx-auto relative rounded-2xl overflow-hidden group">
              {/* Image background elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-800/30 to-blue-800/30 rounded-2xl group-hover:opacity-70 transition-opacity duration-700" />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-700" />

              {/* Main image */}
              <Image
                src={personalInfo.image || "/placeholder.svg"}
                alt={personalInfo.name}
                layout="fill"
                className="w-full h-full object-cover rounded-2xl relative z-10 transition-transform duration-700 group-hover:scale-105"
                placeholder="empty"
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  className="relative rounded-lg overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-3 sm:p-4 text-center border border-gray-800 relative z-10">
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                      {stat.value}
                      {stat.suffix}
                    </div>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="text-gray-300 relative"
          >
            <div className="relative">
              <h3 className="text-2xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                {personalInfo.title}
              </h3>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/10 to-blue-600/10 blur-md opacity-50 -z-10 rounded-full hidden sm:block" />
            </div>

            <div className="relative z-10 space-y-6">
              <p className="mb-6 text-base sm:text-lg leading-relaxed">
                {professionalSummary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="group">
                  <h4 className="text-white font-medium mb-2 group-hover:text-purple-300 transition-colors">
                    Name:
                  </h4>
                  <p className="group-hover:text-white transition-colors">
                    {personalInfo.name}
                  </p>
                </div>
                <div className="group">
                  <h4 className="text-white font-medium mb-2 group-hover:text-purple-300 transition-colors">
                    Date of Birth:
                  </h4>
                  <p className="group-hover:text-white transition-colors">
                    {personalInfo.dob}
                  </p>
                </div>
                <div className="group">
                  <h4 className="text-white font-medium mb-2 group-hover:text-purple-300 transition-colors">
                    Email:
                  </h4>
                  <p className="truncate group-hover:text-white transition-colors">
                    {personalInfo.contact.email}
                  </p>
                </div>
                <div className="group">
                  <h4 className="text-white font-medium mb-2 group-hover:text-purple-300 transition-colors">
                    Location:
                  </h4>
                  <p className="group-hover:text-white transition-colors">
                    {personalInfo.location.city},{" "}
                    {personalInfo.location.country}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-4">Find me on:</h4>
                <div className="flex flex-wrap gap-3">
                  {personalInfo.socialMedia.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group"
                      whileHover={{ y: -3 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                      aria-label={social.name}
                      data-cursor="hover"
                    >
                      <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/40 to-blue-600/40 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center relative z-10 transition-colors duration-300 border border-gray-700 group-hover:border-purple-500/50">
                        <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                          {socialIcons[social.name as keyof typeof socialIcons]}
                        </span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </ResponsiveContainer>
    </section>
  );
}
