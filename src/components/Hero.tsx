import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Award, Zap, ArrowDown, Sparkles } from 'lucide-react';

const Hero = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Simplified Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-teal-400/5 to-pink-400/5 rounded-full blur-2xl"
          animate={{
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div
        ref={ref}
        className="container mx-auto px-4 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Profile Image */}
        <motion.div
          className="relative w-32 h-32 mx-auto mb-8"
          variants={itemVariants}
        >
          <motion.div
            className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-600 to-teal-500 rounded-full flex items-center justify-center shadow-xl"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Code className="w-16 h-16 text-white" />
          </motion.div>
        </motion.div>

        {/* Name */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-4"
          variants={itemVariants}
        >
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
            Prince Kumar
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 font-light mb-6"
          variants={itemVariants}
        >
          Crafting <span className="text-purple-600">Tech</span>, Winning <span className="text-teal-600">Challenges</span>
        </motion.p>

        {/* Brief Intro */}
        <motion.div
          className="max-w-3xl mx-auto mb-12"
          variants={itemVariants}
        >
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            B.Tech Computer Science Engineering student passionate about innovation, problem-solving, and building the future through code. 
            From hackathon victories to industry internships, I'm constantly pushing boundaries and learning new technologies.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {[
              { icon: Award, text: "15+ Certifications", color: "purple" },
              { icon: Zap, text: "2 Hackathons Won", color: "purple" },
              { icon: Code, text: "0 Internships", color: "teal" },
              
            ].map((stat) => (
              <motion.div
                key={stat.text}
                className={`flex items-center gap-2 bg-${stat.color}-100 dark:bg-${stat.color}-900/20 text-white px-4 py-2 rounded-full`}
                style={{textShadow: 'none'}}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <stat.icon className="w-4 h-4" />
                {stat.text}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="flex flex-col items-center"
          variants={itemVariants}
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-2 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mt-2"
              animate={{
                y: [0, 12, 0],
                opacity: [1, 0, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          <ArrowDown className="w-4 h-4 text-gray-500 mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;