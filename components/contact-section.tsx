"use client";

import type React from "react";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { personalInfo } from "@/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import SectionHeading from "./section-heading";
import ResponsiveContainer from "./responsive-container";
import { sendMessage } from "@/app/actions/email";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const mail = sendMessage(formState);
    mail.then(() => {
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);

        // Reset form
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        });

        // Reset submission status after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 3000);
      }, 1500);
    });
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const contactItems = [
    {
      icon: <Mail className="w-5 h-5 text-white" />,
      title: "Email",
      content: (
        <a
          href={`mailto:${personalInfo.contact.email}`}
          className="text-gray-400 hover:text-purple-400 transition-colors"
        >
          {personalInfo.contact.email}
        </a>
      ),
    },
    {
      icon: <Phone className="w-5 h-5 text-white" />,
      title: "Phone",
      content: (
        <>
          <p className="text-gray-400">
            Personal: {personalInfo.contact.phone}
          </p>
          <p className="text-gray-400">Work: {personalInfo.contact.work}</p>
        </>
      ),
    },
    {
      icon: <MapPin className="w-5 h-5 text-white" />,
      title: "Location",
      content: (
        <>
          <p className="text-gray-400">{personalInfo.location.address}</p>
          <p className="text-gray-400">
            {personalInfo.location.city}, {personalInfo.location.region}
          </p>
          <p className="text-gray-400">
            {personalInfo.location.country}, {personalInfo.location.postalCode}
          </p>
        </>
      ),
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-24 bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(37,38,44,0.3)_0,rgba(0,0,0,1)_70%)]" />

      <ResponsiveContainer>
        <SectionHeading title="Get In" highlight="Touch" />

        <motion.div
          className="grid md:grid-cols-2 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            variants={itemVariants}
            className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 h-full relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/20 group-hover:to-blue-600/20 rounded-xl blur-md transition-all duration-700 opacity-0 group-hover:opacity-100" />

            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                Contact Information
              </h3>

              <div className="space-y-6">
                {contactItems.map((item) => (
                  <motion.div
                    key={item.title}
                    variants={itemVariants}
                    className="flex items-start gap-4 group/item"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center flex-shrink-0 relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 opacity-70 blur-sm group-hover/item:opacity-100 transition-opacity duration-300" />
                      <div className="relative z-10">{item.icon}</div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1 group-hover/item:text-purple-300 transition-colors duration-300">
                        {item.title}
                      </h4>
                      {item.content}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 h-full relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/20 group-hover:to-blue-600/20 rounded-xl blur-md transition-all duration-700 opacity-0 group-hover:opacity-100" />

            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                Send Me a Message
              </h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-6 rounded-lg border border-purple-500/30 text-center h-full flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-md opacity-70" />
                    <CheckCircle className="w-8 h-8 text-white relative z-10" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-gray-300">
                    Thank you for reaching out. I&apos;ll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2 group">
                      <label
                        htmlFor="name"
                        className="text-gray-300 text-sm group-hover:text-purple-300 transition-colors"
                      >
                        Your Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="bg-gray-900/50 border-gray-800 focus:border-purple-500 text-white transition-colors"
                        required
                      />
                    </div>
                    <div className="space-y-2 group">
                      <label
                        htmlFor="email"
                        className="text-gray-300 text-sm group-hover:text-purple-300 transition-colors"
                      >
                        Your Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="bg-gray-900/50 border-gray-800 focus:border-purple-500 text-white transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2 group">
                    <label
                      htmlFor="subject"
                      className="text-gray-300 text-sm group-hover:text-purple-300 transition-colors"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      placeholder="How can I help you?"
                      className="bg-gray-900/50 border-gray-800 focus:border-purple-500 text-white transition-colors"
                      required
                    />
                  </div>

                  <div className="space-y-2 group">
                    <label
                      htmlFor="message"
                      className="text-gray-300 text-sm group-hover:text-purple-300 transition-colors"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Your message here..."
                      className="bg-gray-900/50 border-gray-800 focus:border-purple-500 text-white min-h-[120px] transition-colors"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white transition-all duration-300 relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/20 group-hover:to-blue-600/20 rounded-md blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    <div className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <div className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending...
                        </div>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </div>
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      </ResponsiveContainer>
    </section>
  );
}
