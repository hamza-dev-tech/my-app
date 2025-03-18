"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import Link from "next/link";
import { 
  SiShopify, 
  SiWordpress,
  SiAndroid,
  SiApple,
  SiReact,
  SiFlutter
} from "react-icons/si";
import { 
  FaRobot,
  FaShoppingCart, 
  FaGlobe,
  FaMobileAlt
} from "react-icons/fa";
import { FiDatabase } from "react-icons/fi";
import { Button } from "./ui/button";
import TechFlappy from "./TechFlappy";

const SubServiceCard = ({ title, description, icon }) => (
  <motion.div
    className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary-accent/30 transition-all group"
    whileHover={{ y: -5 }}
  >
    <div className="flex flex-col md:flex-row items-start gap-4">
      <div className="p-3 rounded-lg bg-primary-accent/10 group-hover:bg-primary-accent/20 transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2 text-primary-accent">{title}</h3>
        <p className="text-white/70">{description}</p>
      </div>
    </div>
  </motion.div>
);

export default function ServicePageContent({ service }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Dynamic icon mapping
  const getIconComponent = (iconKey) => {
    const iconSize = 24;
    const iconClass = "text-primary-accent";
    
    const icons = {
      shopify: <SiShopify size={iconSize} className="text-[#7AB55C]" />,
      wordpress: <SiWordpress size={iconSize} className="text-[#21759B]" />,
      robot: <FaRobot size={iconSize} className="text-purple-400" />,
      database: <FiDatabase size={iconSize} className="text-blue-400" />,
      cart: <FaShoppingCart size={iconSize} className="text-green-400" />,
      globe: <FaGlobe size={iconSize} className="text-cyan-400" />,
      mobile: <FaMobileAlt size={iconSize} className="text-blue-300" />,
      android: <SiAndroid size={iconSize} className="text-green-500" />,
      apple: <SiApple size={iconSize} className="text-gray-300" />,
      react: <SiReact size={iconSize} className="text-blue-400" />,
      flutter: <SiFlutter size={iconSize} className="text-blue-500" />
    };

    return icons[iconKey] || <span className="text-2xl">⚙️</span>;
  };

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
            <div className="absolute inset-0 rounded-3xl bg-[radial-gradient(circle_at_var(--x)_var(--y),#00ff9910] opacity-20" />
            
            <div className="relative z-10">
              {/* Header Section */}
              <div className="flex flex-row items-start justify-between gap-6">
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

              {/* Service Title */}
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-accent to-white bg-clip-text text-transparent"
              >
                {service.title}
              </motion.h1>

              {/* Expandable Content */}
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
                      {/* Service Description */}
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-lg md:text-xl text-white/80 leading-relaxed"
                      >
                        {service.description}
                      </motion.p>

                      {/* Sub Services Grid */}
                      {service.subServices && (
                        <div className="mt-8">
                          <motion.h2 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary-accent to-white bg-clip-text text-transparent"
                          >
                            {service.subServicesTitle || 'Specialized Solutions'}
                          </motion.h2>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {service.subServices.map((sub, index) => (
                              <SubServiceCard
                                key={index}
                                title={sub.title}
                                description={sub.description}
                                icon={getIconComponent(sub.iconKey)}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Technical Details */}
                      <motion.div
                        className="mt-12 pt-8 border-t border-white/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="grid md:grid-cols-2 gap-8">
                          {/* Development Process - Can be service specific */}
                          <div className="p-8 rounded-2xl bg-primary-accent/10 backdrop-blur-lg">
                            <h3 className="text-2xl font-bold mb-4 text-primary-accent">
                              {service.processTitle || 'Development Process'}
                            </h3>
                            <ul className="space-y-3 text-white/80">
                              {service.processSteps?.map((step, index) => (
                                <li key={index}>✓ {step}</li>
                              )) || [
                                "Requirement Analysis",
                                "Prototype Design",
                                "Agile Development",
                                "Quality Assurance",
                                "Deployment & Support"
                              ].map((step, index) => (
                                <li key={index}>✓ {step}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Technologies Stack */}
                          <div className="p-8 rounded-2xl bg-primary-accent/10 backdrop-blur-lg">
                            <h3 className="text-2xl font-bold mb-4 text-primary-accent">
                              {service.techTitle || 'Technologies'}
                            </h3>
                            <div className="grid grid-cols-2 gap-4 text-white/80">
                              {service.technologies?.map((tech, index) => (
                                <div key={index}>{tech}</div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* CTA Section */}
                      <motion.div
                        className="mt-8 flex flex-col md:flex-row gap-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <Link href="/contact">
                        <Button
                                        variant="outline"
                                        size="lg"
                                        className="uppercase flex items-center gap-2"
                                        href="/contact"
                                      >
                        <span>

                          Start Your Project
                        </span>
                        
                            </Button>
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
        <TechFlappy />
      </div>
    </section>
  );
}