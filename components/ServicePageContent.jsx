"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import Link from "next/link";

export default function ServicePageContent({ service }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="min-h-screen bg-gradient-to-b from-primary/5 to-transparent py-16 px-4 md:px-8">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto"
        >
          <div className="flex items-center justify-between mb-8">
            <Link 
              href="/services" 
              className="group flex items-center gap-2 text-primary-accent hover:text-white transition-colors"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              Back to Services
            </Link>
          </div>

          <motion.div
            className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-xl border border-white/10 shadow-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-start justify-between gap-6">
                <motion.div
                  animate={{ y: isExpanded ? -10 : 0 }}
                  className="text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-accent to-white/50"
                >
                  {service.num}
                </motion.div>

                <motion.button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-primary-accent/20 flex justify-center items-center transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FiChevronDown className="text-xl md:text-2xl text-primary-accent" />
                  </motion.div>
                </motion.button>
              </div>

              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-accent to-white bg-clip-text text-transparent"
              >
                {service.title}
              </motion.h1>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-8 border-t border-white/10 pt-6">
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-lg md:text-xl text-white/80 leading-relaxed"
                      >
                        {service.description}
                      </motion.p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                          className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                          whileHover={{ y: -5 }}
                        >
                          <h3 className="text-xl md:text-2xl font-bold mb-4 text-primary-accent">Our Approach</h3>
                          <p className="text-white/70">Innovative solutions tailored to your business needs...</p>
                        </motion.div>

                        <motion.div
                          className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                          whileHover={{ y: -5 }}
                        >
                          <h3 className="text-xl md:text-2xl font-bold mb-4 text-primary-accent">Technologies</h3>
                          <p className="text-white/70">Cutting-edge tools and frameworks...</p>
                        </motion.div>
                      </div>

                      {service.subServices && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                          {service.subServices.map((sub, index) => (
                            <motion.div
                              key={index}
                              className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
                              whileHover={{ y: -5 }}
                            >
                              <h3 className="text-xl font-bold mb-3 text-primary-accent">{sub.title}</h3>
                              <p className="text-white/70">{sub.description}</p>
                            </motion.div>
                          ))}
                        </div>
                      )}

                      <motion.div
                        className="mt-8 flex flex-col md:flex-row gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <Link
                          href="/contact"
                          className="px-6 py-3 md:px-8 md:py-4 rounded-full bg-primary-accent text-black font-bold hover:bg-white transition-colors"
                        >
                          Get Started
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}