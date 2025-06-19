import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, Zap } from 'lucide-react';
import Interactive3D from './Interactive3D';

const Interactive3DSection = () => {
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

  const models = [
    {
      type: 'car' as const,
      title: 'Car',
      description: 'Car - interactive 3D model'
    },
    {
      type: 'person' as const,
      title: 'Digital Me',
      description: 'A 3D representation of myself'
    },
    {
      type: 'college' as const,
      title: 'My College',
      description: 'Where the journey began'
    }
  ];

  return (
    <motion.section
      ref={ref}
      className="mb-24 relative"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-blue-400/5 to-teal-400/5 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Section Header */}
      <motion.div
        className="text-center mb-16"
        variants={itemVariants}
      >
        <motion.div
          className="inline-flex items-center gap-3 mb-6"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-8 h-8 text-purple-500" />
          </motion.div>
          <motion.h2
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              backgroundSize: "200% 200%"
            }}
          >
            Interactive 3D Experience
          </motion.h2>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Zap className="w-8 h-8 text-teal-500" />
          </motion.div>
        </motion.div>
        
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Explore these interactive 3D models! Drag them around, hover for animations, and have some fun while browsing my portfolio.
        </motion.p>
      </motion.div>

      {/* 3D Models Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
      >
        {models.map((model, index) => (
          <motion.div
            key={model.type}
            variants={itemVariants}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <Interactive3D
              type={model.type}
              title={model.title}
              description={model.description}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Fun Stats */}
      <motion.div
        className="mt-16 text-center"
        variants={itemVariants}
      >
        <motion.div
          className="inline-flex items-center gap-6 bg-white/10 dark:bg-gray-800/20 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/20 dark:border-gray-700/30"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center">
            <motion.div
              className="text-2xl font-bold text-blue-600 dark:text-blue-400"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              3
            </motion.div>
            <div className="text-sm text-gray-600 dark:text-gray-400">3D Models</div>
          </div>
          <div className="w-px h-8 bg-gray-300 dark:bg-gray-600" />
          <div className="text-center">
            <motion.div
              className="text-2xl font-bold text-purple-600 dark:text-purple-400"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              ∞
            </motion.div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Interactions</div>
          </div>
          <div className="w-px h-8 bg-gray-300 dark:bg-gray-600" />
          <div className="text-center">
            <motion.div
              className="text-2xl font-bold text-teal-600 dark:text-teal-400"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              100%
            </motion.div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Fun Factor</div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Interactive3DSection;