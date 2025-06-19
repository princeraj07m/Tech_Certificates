import React from 'react';
import { motion } from 'framer-motion';
import { Code, Zap, Trophy } from 'lucide-react';

const LoadingScreen = () => {
  const icons = [Code, Zap, Trophy];

  return (
    <motion.div
      className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-teal-600 flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        {/* Icons */}
        <div className="flex justify-center space-x-6 mb-8">
          {icons.map((Icon, index) => (
            <motion.div
              key={index}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center"
              animate={{
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                delay: index * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>
          ))}
        </div>

        {/* Text */}
        <motion.h1
          className="text-3xl font-bold text-white mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Prince Kumar
        </motion.h1>

        <motion.p
          className="text-lg text-white/80 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Loading Certificates ...
        </motion.p>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-white/20 rounded-full mx-auto overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 to-pink-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;