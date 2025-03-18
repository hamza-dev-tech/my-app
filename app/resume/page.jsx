"use client"
import { FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaPython, FaJava, FaAndroid, FaDocker, FaAws, FaGitAlt, FaFigma } from "react-icons/fa";
import { SiNextdotjs, SiMongodb, SiFirebase, SiJavascript, SiDjango, SiFlask, SiTailwindcss, SiRedux, SiExpress, SiPostgresql, SiMysql, SiGraphql, SiBlockchain, SiSolidity, SiTypescript, SiPhp, SiKubernetes, SiVite, SiPrisma, SiNestjs, SiEthereum, SiWeb3Dotjs } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { DiWordpress, DiPhotoshop, DiIllustrator } from "react-icons/di";


const about = {
  title: "About Me",
  description:
  "I'm Malik Hamza Shabbir, a passionate Full-Stack Developer & Project Manager specializing in React.js, Next.js, Node.js, and Blockchain Development. With expertise in scalable web and mobile apps, cloud computing, and UI/UX design, I craft seamless, high-performance solutions. As an instructor at Preply Global, I empower aspiring developers while staying ahead with cutting-edge technologies. Lets build the future, one line of code at a time!",
  info:[
    {
    fieldName: "Name",
    FieldValue: "Malik Hamza Shabbir",
  },
  {
    fieldName: "Phone",
    FieldValue: "(+92) 316 88099 43",
  },
  {
    fieldName: "Experience",
    FieldValue: "4+ Years",
  },
  {
    fieldName: "Email",
    FieldValue: "hamzadevtech01",
  },
  {
    fieldName: "LinkedIn",
    FieldValue: "@hamza-dev-tech",
  },
  {
    fieldName: "Nationality",
    FieldValue: "Pakistani",
  },
  {
    fieldName: "Freelance",
    FieldValue: "Available",
  },
  {
    fieldName: "Language",
    FieldValue: "English, Urdu, Hindi",
  },
],
}

const experience = {
  icon:"/assets/resume/badge.svg",
  title: "My experience",
  description:
  "With a strong background in full-stack development and project management, I have successfully led and delivered high-impact web and mobile applications.",
  items: [
    {
      company: "Sarte Solution",
      position:"Full Stack Developer & Project Manager",
      duration: "Ongoing",
      icon: "/assets/resume/sarte.png",
      des:"Developed scalable web applications using React.js, Next.js, and Node.js, improving client engagement by 25% Engineered RESTful APIs and microservices architecture, reducing backend response times by 30%. Managed 10+ web and mobile development projects from concept to deployment, achieving 100% on-time delivery."
    },
    {
      company: "Preply Global",
      position:"Online Instructor",
      duration: "Sep 2023 - Present",
      icon: "/assets/resume/preply.png",
      des:"Trained 50+ students worldwide in web development, React.js, Next.js, and blockchain technologies, achieving a 4.9/5 rating. Designed custom lesson plans and real-world projects, helping students improve their coding skills by 40%."
    },
    {
      company: "AUST",
      position:"IT Intern",
      duration: "2022",
      icon: "/assets/resume/aust.png",
      des:"Developed web applications to automate tasks, saving 20 hours per week for staff.Assisted in maintaining university databases and security protocols, ensuring data integrity and compliance."
    },
    {
      company: "Google Developer Club",
      position:"Google Developer Club Participant",
      duration: "2022",
      icon: "/assets/resume/google.png",
      des:"Participated in 10+ workshops and hackathons, gaining hands-on experience in cloud computing, AI, and web technologies. Collaborated with peers on open-source projects, contributing to 5+ community-driven solutions."
    },
  ],
}

const education = {
  icon:"/assets/resume/cap.svg",
  title: "My education",
  description:
  "I hold a Bachelor of Science in Computer Science from Abbottabad University of Science & Technology, where I built a strong foundation in software development, data structures, and emerging technologies. My academic journey was fueled by hands-on projects, research, and participation in tech communities like the Google Developer Club, allowing me to stay ahead in AI, blockchain, and cloud computing.",
  items: [
    {
      institution: "Abbottabad University of Science & Technology",
      degree:"Bachelor of Science in Computer Science",
      duration: "2019 - 2023",
      icon: "/assets/resume/aust.png",
    },
   
  ],
}

const skills = {
  title: "My Skills",
  description:
    "A collection of technologies and tools I have expertise in, covering frontend, backend,AI Solutions, mobile, DevOps, and blockchain development.",
  skilllist: [
    { icon: <FaHtml5 />, name: "HTML5" },
    { icon: <FaCss3Alt />, name: "CSS3" },
    { icon: <SiJavascript />, name: "JavaScript" },
    { icon: <SiTypescript />, name: "TypeScript" },
    { icon: <FaReact />, name: "React.js" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
  
    { icon: <FaNodeJs />, name: "Node.js" },
   
    { icon: <SiMongodb />, name: "MongoDB" },
    
    { icon: <SiMysql />, name: "MySQL" },
   
    { icon: <SiPrisma />, name: "Prisma ORM" },
    { icon: <SiPhp />, name: "PHP" },
    { icon: <FaPython />, name: "Python" },
    { icon: <SiDjango />, name: "Django" },
    { icon: <SiFlask />, name: "Flask" },
    { icon: <FaDocker />, name: "Docker" },
    { icon: <FaAws />, name: "AWS" },
    { icon: <SiFirebase />, name: "Firebase" },
    { icon: <SiEthereum />, name: "Ethereum" },
    { icon: <SiWeb3Dotjs />, name: "Web3.js" },
    { icon: <SiSolidity />, name: "Solidity" },
    { icon: <FaGitAlt />, name: "Git" },
    { icon: <DiWordpress />, name: "WordPress" },
    { icon: <FaFigma />, name: "Figma" },
    { icon: <DiPhotoshop />, name: "Adobe Photoshop" },
    { icon: <DiIllustrator />, name: "Adobe Illustrator" },
    
  ],
};


import {Tabs, TabsContent, TabsList, TabsTrigger} from "../../components/ui/tabs";

import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "../../components/ui/tooltip";

import {ScrollArea} from "@/components/ui/scroll-area";

import { motion } from "framer-motion";
import React from "react";

function Resume() {
  return (
    <motion.div initial={{opacity:0}}
    animate={{
      opacity:1,
      transition:{delay: 2.4, duration:0.4, ease:"easeIn"},
    }}
    className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
<div className="container mx-auto">
<Tabs
defaultValue="experience"
className="flex flex-col xl:flex-row gap-[60px]"
>
<TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
  <TabsTrigger value="experience">Experience</TabsTrigger>
  <TabsTrigger value="education">Education</TabsTrigger>
  <TabsTrigger value="skills">Skills</TabsTrigger>
  <TabsTrigger value="about">About me</TabsTrigger>
</TabsList>

<div className="min-h-[70vh] w-full">
<TabsContent value="experience" className="w-full">
  <div className="flex flex-col gap-8">
    <div className="text-center xl:text-left">
      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-primary-accent"
      >
        {experience.title}
      </motion.h3>
      <p className="mt-4 max-w-2xl mx-auto xl:mx-0 text-white/80 leading-relaxed">
        {experience.description}
      </p>
    </div>

    <ScrollArea className="h-[600px] pr-4 scrollbar-primary">
      <ul className="grid gap-6 pb-6">
        {experience.items.map((item, index) => (
          <motion.li 
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white/5 rounded-2xl p-6"
          >
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Company Logo - Centered on Mobile */}
              <div className="w-20 h-20 rounded-xl bg-white/5 p-2 flex items-center justify-center shrink-0 mx-auto md:mx-0">
                <img 
                  src={item.icon} 
                  alt={item.company}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-4 w-full">
                {/* Header with Centered Mobile Layout */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-semibold text-white">{item.position}</h3>
                    <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
                      <span className="w-2 h-2 bg-primary-accent rounded-full"></span>
                      <p className="text-primary-accent font-medium">{item.company}</p>
                    </div>
                  </div>
                  {/* Date Centered on Mobile */}
                  <div className="w-full md:w-auto flex justify-center md:block">
                    <span className="text-sm text-white/70 bg-white/5 px-4 py-2 rounded-full">
                      {item.duration}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-white/80 leading-relaxed text-center md:text-left">
                  {item.des}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                  {index === 0 && [
                    { icon: <FaReact className="text-[#61DAFB]" />, name: "React" },
                    { icon: <SiNextdotjs className="text-white" />, name: "Next.js" },
                    { icon: <FaNodeJs className="text-[#339933]" />, name: "Node.js" },
                    { icon: <SiMongodb className="text-[#47A248]" />, name: "MongoDB" },
                  ].map((tech, techIndex) => (
                    <div 
                      key={techIndex}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5"
                    >
                      {tech.icon}
                      <span className="text-sm text-white">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </ScrollArea>
  </div>
</TabsContent>



{/* Education */}
<TabsContent value="education" className="w-full">
  <div className="flex flex-col gap-8">
    <div className="text-center xl:text-left">
      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-primary-accent"
      >
        {education.title}
      </motion.h3>
      <p className="mt-4 max-w-2xl mx-auto xl:mx-0 text-white/80 leading-relaxed">
        {education.description}
      </p>
    </div>

    <ScrollArea className="h-[600px] pr-4 scrollbar-primary">
      <ul className="grid gap-6 pb-6">
        {education.items.map((item, index) => (
          <motion.li 
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white/5 rounded-2xl p-6"
          >
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Institution Seal */}
              <div className="w-20 h-20 rounded-xl bg-white/5 p-2 flex items-center justify-center shrink-0 mx-auto md:mx-0">
                <img 
                  src={item.icon} 
                  alt={item.institution}
                  className="w-full h-full object-contain   transition-all"
                />
              </div>

              {/* Content */}
              <div className="flex-1 space-y-4 w-full">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-semibold text-white">{item.degree}</h3>
                    <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
                      <span className="w-2 h-2 bg-primary-accent rounded-full"></span>
                      <p className="text-primary-accent font-medium">{item.institution}</p>
                    </div>
                  </div>
                  {/* Graduation Date */}
                  <div className="w-full md:w-auto flex justify-center md:block">
                    <span className="text-sm text-white/70 bg-white/5 px-4 py-2 rounded-full flex items-center gap-2">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 text-primary-accent" 
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                        <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                      </svg>
                      {item.duration}
                    </span>
                  </div>
                </div>

                {/* Academic Achievements */}
                <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5">
                    <span className="text-sm text-white">GPA: 3.62/4.0</span>
                  </div>
                 
                </div>

                {/* Relevant Coursework */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-2">
                  <span className="text-xs text-center text-white/80 px-2 py-1 border border-white/10 rounded-full">
                    Algorithms
                  </span>
                  <span className="text-xs text-center text-white/80 px-2 py-1 border border-white/10 rounded-full">
                    AI Fundamentals
                  </span>
                  <span className="text-xs text-center text-white/80 px-2 py-1 border border-white/10 rounded-full">
                    Cloud Architecture
                  </span>
                  <span className="text-xs text-center text-white/80 px-2 py-1 border border-white/10 rounded-full">
                    Data Structures
                  </span>
                  <span className="text-xs text-center text-white/80 px-2 py-1 border border-white/10 rounded-full">
                    Database Systems
                  </span>
                  <span className="text-xs text-center text-white/80 px-2 py-1 border border-white/10 rounded-full">
                    Software Engineering
                  </span>
                </div>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </ScrollArea>
  </div>
</TabsContent>
{/* Skills */}

<TabsContent value="skills" className="w-full">
  <div className="flex flex-col gap-8">
    <div className="text-center xl:text-left">
      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-primary-accent"
      >
        {skills.title}
      </motion.h3>
      <p className="mt-4 max-w-2xl mx-auto xl:mx-0 text-white/80 leading-relaxed">
        {skills.description}
      </p>
    </div>

    <ScrollArea className="h-[600px] pr-4 scrollbar-primary">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-6">
        {skills.skilllist.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white/5 rounded-xl p-4 flex flex-col items-center gap-3 relative group"
          >
            {/* Skill Icon with Gradient Border */}
            <div className="p-3 rounded-lg bg-gradient-to-br from-primary-accent/20 to-primary-accent/5">
              {React.cloneElement(skill.icon, {
                className: "w-8 h-8 text-primary-accent"
              })}
            </div>

            {/* Skill Name */}
            <span className="text-sm font-medium text-center">{skill.name}</span>

            {/* Animated Proficiency Bar */}
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.random() * 40 + 60}%` }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="h-full bg-gradient-to-r from-primary-accent to-purple-400"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  </div>
</TabsContent>
{/* About */}

<TabsContent value="about" className="w-full">
  <div className="flex flex-col gap-8">
    <div className="text-center xl:text-left">
      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-primary-accent"
      >
        {about.title}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-4 max-w-2xl mx-auto xl:mx-0 text-white/80 leading-relaxed"
      >
        {about.description}
      </motion.p>
    </div>

    <ScrollArea className="h-[600px] pr-4 scrollbar-primary">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6">
        {about.info.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 rounded-xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center">
                <span className="text-primary-accent text-lg">◆</span>
              </div>
              <div>
                <p className="text-sm text-white/60">{item.fieldName}</p>
                <p className="text-lg font-medium text-white">
                  {item.FieldValue}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  </div>
</TabsContent>


</div>
</Tabs>
</div>

    </motion.div>
  )
}

export default Resume
