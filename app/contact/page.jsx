"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useState, useEffect } from "react";
import { FaLinkedin, FaFacebook, FaInstagram, FaWhatsapp, FaPhoneAlt, FaHome, FaRocket } from "react-icons/fa";
import { SiUpwork, SiFiverr } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import Confetti from 'react-dom-confetti';
import { db } from "../../firebase"; // Adjust import path as needed
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const services = ["Web Development", "Mobile Development", "Marketing", "AI Solutions", "Education", "Casual Proposal", "Need Consulting"];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Initialize LinkedIn badge and mobile detection
    const initLinkedIn = () => {
      if (window.LI) window.LI.init();
    };
    
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    
    window.addEventListener('resize', handleResize);
    initLinkedIn();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitError('');
    
    try {
      await addDoc(collection(db, "messages"), {
        ...formData,
        timestamp: serverTimestamp()
      });
      
      setIsSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      });
      
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      setSubmitError('Failed to send message. Please try again later.');
      console.error("Firestore error:", error);
    } finally {
      setLoading(false);
    }
  };

  const AnimatedButton = () => {
    const x = useMotionValue(0);
    const background = useTransform(x, [0, 100], ["#00ff99", "#00e187"]);

    useEffect(() => {
      const controls = animate(x, 100, {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 3,
        ease: "easeInOut"
      });
      return controls.stop;
    }, []);

    return (
      <motion.button
        style={{ background }}
        className="w-full text-primary font-semibold py-4 px-8 rounded-2xl relative overflow-hidden group"
        onClick={handleSubmit}
        disabled={loading}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <FaRocket className="h-5 w-5" />
            </motion.div>
          ) : (
            <FaRocket className="h-5 w-5" />
          )}
          {loading ? 'Launching...' : 'Launch Message'}
        </span>
        <motion.div
          className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ x }}
        />
      </motion.button>
    );
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-effect rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 grid grid-cols-1 md:grid-cols-2 gap-12 relative"
        >
          {/* Contact Form */}
          <div>
            <motion.h2 
              className="text-2xl md:text-4xl font-bold text-primary-accent mb-8"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
            >
              Let&apos;s Create Magic
            </motion.h2>
            
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="flex gap-6 flex-col md:flex-row">
                {['First Name', 'Last Name'].map((label) => (
                  <motion.div 
                    key={label}
                    className="flex-1 relative"
                    whileHover={{ scale: 1.02 }}
                  >
                    <input
                      name={label.toLowerCase().replace(' ', '')}
                      value={formData[label.toLowerCase().replace(' ', '')]}
                      onChange={handleInputChange}
                      placeholder={label}
                      className="w-full px-4 py-4 bg-transparent border-b-2 border-primary-accent/30 focus:border-primary-accent focus:outline-none placeholder-transparent peer"
                      required
                    />
                    <label className="absolute left-0 -top-3 text-sm text-primary-accent transition-all">
                      {label}
                    </label>
                  </motion.div>
                ))}
              </div>

              <motion.div whileHover={{ scale: 1.02 }} className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="w-full px-4 py-4 bg-transparent border-b-2 border-primary-accent/30 focus:border-primary-accent focus:outline-none placeholder-transparent peer"
                  required
                />
                <label className="absolute left-0 -top-3 text-sm text-primary-accent">
                  Email
                </label>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                  className="w-full px-4 py-4 bg-transparent border-b-2 border-primary-accent/30 focus:border-primary-accent focus:outline-none placeholder-transparent peer"
                />
                <label className="absolute left-0 -top-3 text-sm text-primary-accent">
                  Phone (Optional)
                </label>
              </motion.div>

              <motion.div className="relative" whileHover={{ scale: 1.02 }}>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 bg-transparent border-b-2 text-primary-accent border-primary-accent/30 focus:border-primary-accent focus:outline-none appearance-none"
                  required
                >
                  <option value="" className="bg-primary/10">Select Service</option>
                  {services.map((service) => (
                    <option 
                      key={service} 
                      value={service}
                      className="bg-primary/10 text-primary"
                    >
                      {service}
                    </option>
                  ))}
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 text-primary-accent">
                  ▼
                </div>
              </motion.div>

              <motion.div className="relative" whileHover={{ scale: 1.02 }}>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Vision..."
                  rows={4}
                  className="w-full px-4 py-4 bg-transparent border-b-2 border-primary-accent/30 focus:border-primary-accent focus:outline-none placeholder-transparent peer resize-none"
                  required
                />
                <label className="absolute left-0 -top-3 text-sm text-primary-accent">
                  Your Vision...
                </label>
              </motion.div>

              <div className="relative">
                <AnimatedButton />
                {submitError && (
                  <p className="text-red-500 text-sm mt-2">{submitError}</p>
                )}
                <Confetti 
                  active={isSubmitted} 
                  config={{ 
                    elementCount: 100,
                    spread: 70,
                    startVelocity: 30 
                  }} 
                />
              </div>
            </form>
          </div>

          {/* Contact Info Section */}
          <div className="space-y-8 md:pl-12 lg:pl-16">
            {/* LinkedIn Badge */}
            <motion.div 
              className=" transition-all"
              whileHover={{ y: -5 }}
            >
              
              <div className="relative">
                <div 
                  className="badge-base LI-profile-badge" 
                  data-locale="en_US" 
                  data-size="small"
                  data-theme="dark" 
                  data-type="HORIZONTAL" 
                  data-vanity="hamza-dev-tech" 
                  data-version="v1"
                >
                  <a 
                    className="badge-base__link LI-simple-link" 
                    href="https://pk.linkedin.com/in/hamza-dev-tech?trk=profile-badge"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Contact Details */}
            <motion.div 
              className="p-6 rounded-xl bg-primary/10 border border-primary-accent/20 hover:border-primary-accent/40 transition-all"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-2xl font-semibold text-primary-accent mb-6 flex items-center gap-2">
                <span className="text-accent">✦</span> Direct Lines
              </h3>
              <div className="space-y-6">
                {[
                  { icon: FaPhoneAlt, text: '+92 316 8809943' },
                  { icon: MdEmail, text: 'hamzadevtech01@gmail.com' },
                  { icon: FaHome, text: 'Abbottabad, Pakistan' },
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-4 group"
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="p-3 bg-accent/10 rounded-full group-hover:bg-accent/20 transition-all">
                      <item.icon className="h-6 w-6 text-accent group-hover:scale-110 transition-transform" />
                    </span>
                    <p className="text-white text-[12px] md:text-[18px] group-hover:text-accent transition-colors">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <div className="p-6 rounded-xl bg-primary/10 border border-primary-accent/20 hover:border-primary-accent/40 transition-all">
              <h3 className="text-2xl font-semibold text-primary-accent mb-6 flex items-center gap-2">
                <span className="text-accent">✦</span> Social Orbit
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { Icon: FaLinkedin, color: '#0A66C2', tooltip: 'LinkedIn', link: 'https://www.linkedin.com/in/hamza-dev-tech' },
                  { Icon: FaFacebook, color: '#1877F2', tooltip: 'Facebook', link: 'https://www.facebook.com/hamza.dev.tech' },
                  { Icon: FaInstagram, color: '#E4405F', tooltip: 'Instagram', link: 'https://www.instagram.com/hamza_dev_tech' },
                  { Icon: SiUpwork, color: '#6FDA44', tooltip: 'Upwork', link: 'https://www.upwork.com/freelancers/~010c9116beaf178f30' },
                  { Icon: SiFiverr, color: '#1DBF73', tooltip: 'Fiverr', link: 'https://www.linkedin.com/in/hamza-dev-tech/' },
                  { Icon: FaWhatsapp, color: '#25D366', tooltip: 'WhatsApp', link: 'https://wa.me/923168809943' },
                ].map(({ Icon, color, tooltip, link }, index) => (
                  <motion.a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-primary/5 hover:bg-primary/20 flex items-center justify-center relative group transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon className="h-6 w-6 md:h-8 md:w-8" style={{ color }} />
                    <span className="absolute bottom-full mb-2 hidden group-hover:block bg-primary-accent text-primary px-2 py-1 rounded text-xs">
                      {tooltip}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Contact;