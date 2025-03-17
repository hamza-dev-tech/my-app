"use client";
import { useState } from 'react';
import { FiMessageSquare, FiX, FiChevronUp, FiSend, FiMail } from 'react-icons/fi';
import { FaFacebook, FaLinkedin, FaInstagram, FaGithub, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { SiOrcid } from "react-icons/si";
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from "@emailjs/browser";
import Link from "next/link"

const Footer = () => {
  
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      try {
        const response = await emailjs.send(
          "service_h8y2s5r",
          "template_9rl9qeh",
          {
            to_email: email,
            to_name: "Subscriber",
            reply_to: email,
          },
          "RoiUqiT9EPOVdRrUN"
        );
        console.log("Email sent successfully:", response);
        setIsSubscribed(true);
        setEmail("");
        setTimeout(() => setIsSubscribed(false), 3000);
      } catch (error) {
        console.error("Email send error:", error);
      }
    }
  };

  const footerLinks = [
    {
      title: 'Solutions',
      links: [
        { name: 'Web Development', path: '/services' },
        { name: 'Mobile Apps', path: '/services' },
        { name: 'Cloud Solutions', path: '/services' },
        { name: 'AI Integration', path: '/services' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Privacy Policy', path: '/privacy-policy' },
        { name: 'Articles', path: '/articles' },
        { name: 'Terms & Conditions', path: '/terms-conditions' },
        { name: 'Contact', path: '/contact' },
      ],
    },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-primary/5 to-transparent backdrop-blur-xl border-t border-white/10 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-16 pb-8 md:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 md:mb-16">
          {/* Company Info Section */}
          <div className="space-y-4 md:space-y-6 text-center md:text-left">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-accent to-white bg-clip-text text-transparent">
              Hamza Shabbir
            </h3>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs mx-auto md:mx-0">
              Transforming ideas into digital reality through innovative solutions.
            </p>
            <div className="flex justify-center md:justify-start space-x-4 md:space-x-5">
              <a href="https://www.facebook.com/hamza.dev.tech" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-lg hover:text-primary-accent cursor-pointer transition-colors" />
              </a>
              <a href="https://www.linkedin.com/in/hamza-dev-tech" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-lg hover:text-primary-accent cursor-pointer transition-colors" />
              </a>
              <a href="https://github.com/hamza-dev-tech" target="_blank" rel="noopener noreferrer">
                <FaGithub className="text-lg hover:text-primary-accent cursor-pointer transition-colors" />
              </a>
              <a href="https://www.instagram.com/hamza_dev_tech" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-lg hover:text-primary-accent cursor-pointer transition-colors" />
              </a>
              <a href="https://www.youtube.com/@hamza-dev-tech" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="text-lg hover:text-primary-accent cursor-pointer transition-colors" />
              </a>
              <a href="https://wa.me/923168809943" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp className="text-lg hover:text-primary-accent cursor-pointer transition-colors" />
              </a>
              <a href="https://orcid.org/0009-0006-8816-0245" target="_blank" rel="noopener noreferrer">
                <SiOrcid className="text-lg hover:text-primary-accent cursor-pointer transition-colors" />
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <div key={index} className="space-y-3 md:space-y-4 text-center md:text-left">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-accent">
                {section.title}
              </h4>
              <ul className="space-y-2 md:space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    whileHover={{ x: 5 }}
                    className="text-sm text-white/80 hover:text-primary-accent cursor-pointer transition-colors"
                  >
                    <Link href={link.path}>{link.name}</Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Section */}
          <div className="space-y-4 md:space-y-6 max-w-xs mx-auto md:mx-0">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-primary-accent text-center md:text-left">
              Stay Updated
            </h4>
            <form onSubmit={handleSubscribe} className="space-y-3 md:space-y-4">
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2 md:py-3 bg-white/5 rounded-xl border border-white/10 focus:outline-none focus:border-primary-accent focus:ring-1 focus:ring-primary-accent text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-accent to-primary-accent/80 text-black font-medium py-2 md:py-3 rounded-xl hover:opacity-90 transition-opacity text-sm md:text-base"
              >
                Subscribe
              </button>
            </form>
            <AnimatePresence>
              {isSubscribed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm text-green-400 text-center md:text-left"
                >
                  Successfully subscribed! 🎉
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-white/10 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-4 md:mb-0">
              <span>©</span>
              <span className="hidden md:block">•</span>
              <span>All rights reserved</span>
              <span className="hidden md:block">•</span>
              <span>Privacy Policy</span>
              <span>•</span>
              <span>Terms of Service</span>
            </div>
            <div className="flex items-center gap-2 text-center">
              <span>Handcrafted by</span>
              <span className="bg-gradient-to-r from-primary-accent to-white bg-clip-text text-transparent font-medium">
                Hamza Shabbir
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
