"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects } from "@/data";
import { ExternalLink, Github, X, Maximize2, Filter } from "lucide-react";
import SectionHeading from "./section-heading";
import ResponsiveContainer from "./responsive-container";
import ResponsiveGrid from "./responsive-grid";
import { useMediaQuery } from "@/hooks/use-media-query";
import Image from "next/image";

// Project categories derived from technologies
const getCategories = () => {
  const categoriesSet = new Set<string>();
  categoriesSet.add("All");

  // Extract all unique technologies from projects
  projects.forEach((project) => {
    project.technologies.forEach((tech) => {
      // Add each technology as a category
      categoriesSet.add(tech);
    });
  });

  // Convert to array and sort alphabetically
  return Array.from(categoriesSet).sort((a, b) => {
    // Keep "All" at the beginning
    if (a === "All") return -1;
    if (b === "All") return 1;
    return a.localeCompare(b);
  });
};

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const [categories] = useState<string[]>(getCategories);
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    // Simulate loading of projects
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredProjects(projects);
      return;
    }

    const filtered = projects.filter((project) =>
      project.technologies.some((tech) => tech === activeCategory)
    );

    setFilteredProjects(filtered);
  }, [activeCategory]);

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
      id="projects"
      className="py-24 bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,38,44,0.3)_0,rgba(0,0,0,1)_70%)]" />

      <ResponsiveContainer>
        <SectionHeading title="My" highlight="Projects" />

        {/* Mobile Filter Toggle */}
        {isMobile && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mb-6 flex justify-center"
          >
            <motion.button
              variants={itemVariants}
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/70 text-white text-sm font-medium border border-gray-700/50"
            >
              <Filter className="w-4 h-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </motion.button>
          </motion.div>
        )}

        {/* Category Filter */}
        <AnimatePresence>
          {(!isMobile || showFilters) && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mb-12 flex flex-wrap justify-center gap-3"
              layout
            >
              {categories.map((category) => (
                <motion.button
                  key={category}
                  variants={itemVariants}
                  onClick={() => {
                    setActiveCategory(category);
                    if (isMobile) setShowFilters(false);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-500/20"
                      : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 border border-gray-700/50"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="min-h-[300px]"
        >
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-xl overflow-hidden">
                  <div className="aspect-video bg-gray-800/50 animate-pulse"></div>
                  <div className="p-5 bg-gray-900/30 border border-gray-800">
                    <div className="h-6 bg-gray-800/70 rounded-md animate-pulse mb-3 w-3/4"></div>
                    <div className="h-4 bg-gray-800/50 rounded-md animate-pulse mb-2 w-full"></div>
                    <div className="h-4 bg-gray-800/50 rounded-md animate-pulse mb-4 w-2/3"></div>
                    <div className="flex gap-2 mb-4">
                      {[1, 2, 3].map((j) => (
                        <div
                          key={j}
                          className="h-6 w-16 bg-gray-800/40 rounded-full animate-pulse"
                        ></div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <div className="h-9 w-20 bg-gray-800/60 rounded-full animate-pulse"></div>
                      <div className="h-9 w-20 bg-gray-800/60 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <motion.div
              variants={itemVariants}
              className="text-center py-12 bg-gray-900/20 rounded-xl border border-gray-800/50 p-8"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800/50 flex items-center justify-center">
                <Filter className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl text-white mb-2">No projects found</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                No projects match the selected category. Try selecting a
                different filter or check back later for new projects.
              </p>
              <button
                onClick={() => setActiveCategory("All")}
                className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full inline-flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
              >
                View All Projects
              </button>
            </motion.div>
          ) : (
            <ResponsiveGrid
              cols={{ sm: 1, md: 2, lg: 3 }}
              gap="gap-8 md:gap-10"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.title}
                    variants={itemVariants}
                    className="group"
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="overflow-hidden rounded-xl relative bg-gray-900/30 border border-gray-800 h-full flex flex-col hover:border-purple-500/30 transition-colors duration-300">
                      {/* Card glow effect */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/20 group-hover:to-blue-600/20 rounded-xl blur-md transition-all duration-700 opacity-0 group-hover:opacity-100" />

                      {/* Image container */}
                      <div className="aspect-video overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          layout="fill"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          loading="lazy"
                          placeholder="empty"
                        />

                        {/* Quick action buttons */}
                        <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProject(project);
                            }}
                            className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-sm flex items-center justify-center text-white hover:bg-purple-600 transition-colors"
                            aria-label="View details"
                          >
                            <Maximize2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-grow relative z-10">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
                          {project.title}
                        </h3>

                        <p className="text-gray-400 mb-4 line-clamp-2 flex-grow">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 bg-gray-800/80 text-gray-300 text-xs rounded-full border border-gray-700/50 hover:bg-gray-700/80 hover:border-purple-500/30 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="px-2 py-1 bg-gray-800/80 text-gray-300 text-xs rounded-full border border-gray-700/50 hover:bg-gray-700/80 hover:border-purple-500/30 transition-colors">
                              +{project.technologies.length - 3} more
                            </span>
                          )}
                        </div>

                        <div className="flex gap-3 mt-auto">
                          {project.url !== "#" && (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm rounded-full flex items-center gap-1 hover:shadow-lg hover:shadow-purple-500/25 transition-all transform hover:translate-y-[-2px]"
                              data-cursor="hover"
                            >
                              <ExternalLink className="w-4 h-4" />
                              <span>Visit</span>
                            </a>
                          )}
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-gray-800 text-white text-sm rounded-full flex items-center gap-1 hover:bg-gray-700 transition-colors transform hover:translate-y-[-2px]"
                            data-cursor="hover"
                          >
                            <Github className="w-4 h-4" />
                            <span>Code</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </ResponsiveGrid>
          )}
        </motion.div>
      </ResponsiveContainer>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-gray-900 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <Image
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  layout="fill"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  placeholder="empty"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/70 flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Project title overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                    {selectedProject.title}
                  </h2>
                </div>
              </div>

              <div className="p-6">
                <p className="text-gray-300 mb-6 text-base md:text-lg">
                  {selectedProject.description}
                </p>

                <div className="mb-6">
                  <h3 className="text-lg font-medium text-white mb-3">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full border border-gray-700 hover:border-purple-500/30 hover:bg-gray-700 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  {selectedProject.url !== "#" && (
                    <a
                      href={selectedProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-full flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all transform hover:translate-y-[-2px]"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Visit Project</span>
                    </a>
                  )}
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gray-800 text-white rounded-full flex items-center gap-2 hover:bg-gray-700 transition-colors transform hover:translate-y-[-2px]"
                  >
                    <Github className="w-5 h-5" />
                    <span>View Code</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
