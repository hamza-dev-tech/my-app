"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { BsArrowUpRight, BsGithub } from "react-icons/bs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/tooltip";

import Link from "next/link";

import Image from "next/image";
import WorkSliderBtns from "@/components/WorkSliderBtns";

const projects = [
  {
    num: "01",
    category: "web",
    title: "project 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel iste distinctio asperiores libero corrupti quis ab voluptatum consequuntur illo cupiditate!",
    stack: [{ name: "Next JS" }, { name: "Css 3" }],
    image: "/assets/work/thumb1.png",
    live: "",
    github: "",
  },
  {
    num: "02",
    category: "Mobile App",
    title: "project 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel iste distinctio asperiores libero corrupti quis ab voluptatum consequuntur illo cupiditate!",
    stack: [{ name: "Next JS" }, { name: "Css 3" }],
    image: "/assets/work/thumb1.png",
    live: "",
    github: "",
  },
  {
    num: "03",
    category: "AI",
    title: "project 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel iste distinctio asperiores libero corrupti quis ab voluptatum consequuntur illo cupiditate!",
    stack: [{ name: "Next JS" }, { name: "Css 3" }],
    image: "/assets/work/thumb1.png",
    live: "",
    github: "",
  },
];

function Work() {
  const [project, setProject] = useState(projects[0]);

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;
    setProject(projects[currentIndex]);
  };

  return (
    <motion.section
  initial={{ opacity: 0 }}
  animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: "easeIn" }}}
  className="flex flex-col justify-center py-5 xl:py-20 xl:px-0"
>
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          {/* Project Details */}
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col gap-8"
            >
              <div className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-accent/20 to-primary-accent">
                {project.num}
              </div>

              <motion.div className="space-y-6">
                <h2 className="text-4xl font-bold text-white group-hover:text-primary-accent transition-colors duration-500">
                  {project.category} <span className="text-primary-accent">Project</span>
                </h2>
                
                <p className="text-lg text-white/80 leading-relaxed">
                  {project.description}
                </p>

                <ul className="flex flex-wrap gap-3">
                  {project.stack.map((item, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 rounded-full bg-white/5 text-primary-accent border border-white/10 hover:bg-primary-accent/10 transition-colors"
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <div className="border-t border-white/20" />

              <motion.div className="flex items-center gap-6">
                <Link href={project.live} target="_blank" className="hover:-translate-y-1 transition-transform">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="w-16 h-16 rounded-full bg-white/5 flex justify-center items-center group hover:bg-primary-accent/20">
                        <BsArrowUpRight className="text-2xl text-white group-hover:text-primary-accent" />
                      </TooltipTrigger>
                      <TooltipContent>Live Preview</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>

                <Link href={project.github} target="_blank" className="hover:-translate-y-1 transition-transform">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="w-16 h-16 rounded-full bg-white/5 flex justify-center items-center group hover:bg-primary-accent/20">
                        <BsGithub className="text-2xl text-white group-hover:text-primary-accent" />
                      </TooltipTrigger>
                      <TooltipContent>View Code</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Image Slider */}
          <div className="w-full xl:w-[50%] relative group">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="xl:h-[520px]"
              onSlideChange={handleSlideChange}
            >
              {projects.map((project, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative h-[460px] overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/2"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    <Image
                      src={project.image}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={project.title}
                    />
                  </motion.div>
                </SwiperSlide>
              ))}

              <WorkSliderBtns
                containerStyles="absolute bottom-4 right-4 z-20 flex gap-4"
                btnStyles="w-12 h-12 flex items-center justify-center rounded-full bg-primary-accent/80 hover:bg-primary-accent backdrop-blur-sm transition-colors"
                iconStyles="text-2xl text-white"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default Work;