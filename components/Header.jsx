"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Nav from "./Nav";
import MobileNav from "./MobileNav";

export default function Header() {
  return (
    <header className="py-8 xl:py-12 text-white relative z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          {/* Animated Logo Wrapper */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6, ease: "easeInOut" }}
            className="relative w-[70px] h-[70px] rounded-full overflow-hidden border-2 border-primary-accent mix-blend-lighten"
          >
            {/* Logo Image */}
            <Image 
              src="/logo.png"  
              width={100} 
              height={100} 
              alt="Logo"
              className="w-full h-full object-cover"
            />

            {/* Aesthetic Dark Blinking Effect */}
            <motion.div
              className="absolute inset-0 bg-primary opacity-40 mix-blend-darken"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.4, 0.6, 0.2, 0.6, 0.4] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Neon Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-primary opacity-30 blur-lg mix-blend-lighten"
              initial={{ opacity: 0.2 }}
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          <h1 className="text-4xl font-semibold">
            <span className="text-primary-accent">.</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <Link href="/contact">
            <Button>Hire Me</Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
