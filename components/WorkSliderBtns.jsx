"use client";

import { useSwiper } from "swiper/react";
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi";
import { motion } from "framer-motion";

const WorkSliderBtns = ({ containerStyles, btnStyles, iconStyles }) => {
  const swiper = useSwiper();
  return (
    <div className={containerStyles}>
      <motion.button
        whileHover={{ scale: 1.1 }}
        className={btnStyles}
        onClick={() => swiper.slidePrev()}
      >
        <PiCaretLeftBold className={iconStyles} />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.1 }}
        className={btnStyles}
        onClick={() => swiper.slideNext()}
      >
        <PiCaretRightBold className={iconStyles} />
      </motion.button>
    </div>
  );
};

export default WorkSliderBtns;