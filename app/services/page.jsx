"use client";
import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    num: "01",
    title: "Web Development",
    description:
      "We build websites that serve as powerful marketing tools and bring memorable brand experiences.",
    slug: "web-development",
  },
  {
    num: "02",
    title: "Mobile Development",
    description:
      "Having a mobile-optimized site is more important than ever. Our mobile development team makes your business relevant to customers on-the-go.",
    slug: "mobile-development",
  },
  {
    num: "03",
    title: "UI/UX Design",
    description:
      "Our design team is well-versed in creating custom, modern, and user-friendly designs for web and mobile applications.",
    slug: "ui-ux-design",
  },
  {
    num: "04",
    title: "QA & Testing",
    description:
      "Our QA team performs various tests to ensure that your product runs smoothly and meets your requirements.",
    slug: "qa-testing",
  },
  {
    num: "05",
    title: "IT Consulting",
    description:
      "Our IT consulting services provide you with the digital roadmap that you need to run your business more efficiently.",
    slug: "it-consulting",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.2,
      duration: 0.6,
      ease: "easeOut"
    }
  }),
  hover: {
    scale: 1.02,
    transition: { type: "spring", stiffness: 300 }
  }
};

const arrowVariants = {
  rest: { rotate: 0 },
  hover: { rotate: -45, scale: 1.2 },
  tap: { scale: 0.9 }
};

const numberVariants = {
  hover: {
    backgroundPosition: '100% 50%',
    transition: { duration: 1.5, ease: "linear" }
  }
};

export default function Services() {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-12 xl:gap-24"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              custom={index}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="relative p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 backdrop-blur-lg border border-white/10 hover:border-primary-accent/30 transition-all duration-300"
            >
              {/* Animated Background Effect */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(200px_circle_at_var(--x)_var(--y),#00ff9910] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>

              <div className="flex flex-col gap-6 relative">
                <div className="w-full flex justify-between items-center">
                  <motion.div
                    variants={numberVariants}
                    className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary-accent to-white/30 bg-[length:200%_100%] bg-left"
                  >
                    {service.num}
                  </motion.div>
                  
                  <motion.div
                    variants={arrowVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Link 
                      href={`/services/${service.slug}`}
                      className="w-16 h-16 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-primary-accent/20 flex justify-center items-center"
                    >
                      <BsArrowDownRight className="text-primary-accent text-2xl" />
                    </Link>
                  </motion.div>
                </div>

                <Link href={`/services/${service.slug}`}>
                  <motion.h2 
                    whileHover={{ x: 5 }}
                    className="text-4xl font-bold bg-gradient-to-r from-primary-accent to-white bg-clip-text text-transparent hover:text-primary-accent transition-colors duration-300">
                    {service.title}
                  </motion.h2>
                </Link>

                <motion.p 
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1, y: -2 }}
                  className="text-white/70 leading-relaxed text-lg transition-all duration-300">
                  {service.description}
                </motion.p>

                <motion.div 
                  initial={{ scaleX: 0.8 }}
                  whileInView={{ scaleX: 1 }}
                  className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent w-full" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}