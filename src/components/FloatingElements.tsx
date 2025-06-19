import React from 'react';
import { motion } from 'framer-motion';

const FloatingElements = () => {
  // Reduced number of elements for better performance
  const shapes = [
    { size: 'w-3 h-3', color: 'bg-blue-400/10', delay: 0 },
    { size: 'w-4 h-4', color: 'bg-purple-400/10', delay: 2 },
    { size: 'w-2 h-2', color: 'bg-teal-400/10', delay: 4 },
    { size: 'w-3 h-3', color: 'bg-pink-400/10', delay: 6 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute ${shape.size} ${shape.color} rounded-full`}
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
          }}
          animate={{
            x: [
              Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
            ],
            y: [
              Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
            ],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            delay: shape.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;