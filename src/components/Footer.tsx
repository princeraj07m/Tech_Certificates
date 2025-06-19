import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Linkedin, Mail, MapPin, Phone, Heart } from 'lucide-react';

const Footer = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const stats = [
    { value: "15+", label: "Certificates", color: "from-blue-400 to-blue-600" },
    { value: "2", label: "Hackathons Won", color: "from-purple-400 to-purple-600" },
    { value: "0", label: "Internships", color: "from-green-400 to-green-600" },
    { value: "25+", label: "Projects", color: "from-yellow-400 to-yellow-600" },
  ];

  return (
    <motion.footer
      ref={ref}
      className="bg-gray-900 dark:bg-black text-white"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={containerVariants}
        >
          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Get In Touch
            </h3>
            
            <div className="space-y-4">
              {[
                { icon: Mail, text: "princerajm31@gmail.com", href: "mailto:princerajm31@gmail.com" },
                { icon: Phone, text: "+91 9142223604", href: "tel:+919142223604" },
                { icon: MapPin, text: "Chennai, Tamil Nadu, India" },
              ].map((contact, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <contact.icon className="w-5 h-5 text-blue-400" />
                  {contact.href ? (
                    <a href={contact.href} className="hover:text-blue-400 transition-colors">
                      {contact.text}
                    </a>
                  ) : (
                    <span>{contact.text}</span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-teal-400 bg-clip-text text-transparent">
              Connect With Me
            </h3>
            
            <div className="space-y-4">
              {[
                { icon: Github, text: "GitHub Profile", href: "https://github.com/princeraj07m" },
                { icon: Linkedin, text: "LinkedIn Profile", href: "https://linkedin.com/in/princeraj07m" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-blue-400 transition-colors"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <social.icon className="w-5 h-5" />
                  {social.text}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-teal-400 to-yellow-400 bg-clip-text text-transparent">
              Quick Stats
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-4 bg-gray-800/50 rounded-lg border border-gray-700/50"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;