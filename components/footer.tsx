"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/data";
import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Heart,
} from "lucide-react";
import ResponsiveContainer from "./responsive-container";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    GitHub: <Github className="w-4 h-4" />,
    LinkedIn: <Linkedin className="w-4 h-4" />,
    Instagram: <Instagram className="w-4 h-4" />,
    X: <Twitter className="w-4 h-4" />,
    Facebook: <Facebook className="w-4 h-4" />,
    YouTube: <Youtube className="w-4 h-4" />,
  };

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <footer className="bg-black border-t border-gray-900 py-12 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,38,44,0.2)_0,rgba(0,0,0,1)_70%)]" />

      <ResponsiveContainer>
        <motion.div
          className="flex flex-col items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-8 relative group">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 relative">
              {personalInfo.nickname}
              <span className="text-gray-400">.</span>
            </h2>
            <div className="absolute -inset-3 bg-gradient-to-r from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/10 group-hover:to-blue-600/10 rounded-full blur-md transition-all duration-500 opacity-0 group-hover:opacity-100" />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            {personalInfo.socialMedia.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors relative group"
                whileHover={{ y: -3 }}
                aria-label={social.name}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">
                  {socialIcons[social.name as keyof typeof socialIcons]}
                </span>
              </motion.a>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <p className="text-gray-400 mb-2">
              © {currentYear} {personalInfo.name}. All rights reserved.
            </p>
            <p className="text-gray-500 text-sm flex items-center justify-center">
              Made with{" "}
              <Heart className="w-3 h-3 mx-1 text-red-500 animate-pulse" /> by{" "}
              {personalInfo.nickname}
            </p>
          </motion.div>
        </motion.div>
      </ResponsiveContainer>
    </footer>
  );
}
