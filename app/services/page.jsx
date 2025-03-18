"use client";
import { BsArrowDownRight } from "react-icons/bs";
import Link from "next/link";
import { motion } from "framer-motion";
import TechFlappy from "../../components/TechFlappy";

const services = [
  {
    num: "01",
    title: "Web Development",
    description: "Transform your digital presence with blazing-fast, SEO-optimized websites built on modern frameworks like React and Next.js. Drive conversions with responsive designs, intuitive UX, and seamless integrations tailored for scalability and performance.",
    slug: "web-development",
  },
  {
    num: "02",
    title: "Mobile Development",
    description: "Create cross-platform iOS/Android apps with Flutter and React Native that deliver flawless performance. Boost user retention with AI-driven personalization, offline functionality, and real-time analytics.",
    slug: "mobile-development",
  },
  {
    num: "03",
    title: "AI Solutions",
    description: "Leverage cutting-edge machine learning models and generative AI to automate workflows, enhance decision-making, and deploy chatbots. Unlock predictive analytics for smarter business strategies.",
    slug: "ai-solutions",
  },
  {
    num: "04",
    title: "Marketing",
    description: "Dominate search rankings with data-driven SEO strategies, high-conversion PPC campaigns, and viral social media marketing. Amplify ROI with targeted content and conversion rate optimization (CRO).",
    slug: "digital-marketing",
  },
  {
    num: "05",
    title: "IT Consulting",
    description: "Future-proof your business with end-to-end IT infrastructure solutions, cloud migration (AWS/Azure), and cybersecurity frameworks. Streamline operations with DevOps automation and scalable architectures.",
    slug: "it-consulting",
  },
  {
    num: "06",
    title: "Blockchain Solutions",
    description: "Build secure, transparent decentralized apps (dApps) and smart contracts on Ethereum/Solana. Revolutionize transactions with Web3 integration, NFTs, and DeFi platforms.",
    slug: "blockchain-solutions",
  },
  {
    num: "07",
    title: "UI/UX Design",
    description: "Craft visually stunning interfaces with user-centric wireframing, interactive prototypes, and accessibility-first designs. Boost engagement with intuitive navigation and A/B testing.",
    slug: "ui-ux-design",
  },
  {
    num: "08",
    title: "Education",
    description: "Develop immersive EdTech platforms with AI tutors, gamified learning modules, and VR classrooms. Enhance retention with LMS integrations and microlearning strategies.",
    slug: "edtech-solutions",
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
    <section 
    initial={{ opacity: 0 }}
    animate={{
      opacity: 1,
      transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
    }}
    className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0 bg-gradient-to-b from-primary/5 to-transparent">
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
        <TechFlappy />
      </div>
    </section>
  );
}