import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Car, User, GraduationCap, RotateCcw, Maximize2 } from 'lucide-react';

interface Interactive3DProps {
  type: 'car' | 'person' | 'college';
  title: string;
  description: string;
}

const Interactive3D: React.FC<Interactive3DProps> = ({ type, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const constraintsRef = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const reset3D = () => {
    x.set(0);
    y.set(0);
  };

  const get3DModel = () => {
    switch (type) {
      case 'car':
        return <Car3DModel rotateX={rotateX} rotateY={rotateY} isHovered={isHovered} />;
      case 'person':
        return <Person3DModel rotateX={rotateX} rotateY={rotateY} isHovered={isHovered} />;
      case 'college':
        return <College3DModel rotateX={rotateX} rotateY={rotateY} isHovered={isHovered} />;
      default:
        return null;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'car':
        return Car;
      case 'person':
        return User;
      case 'college':
        return GraduationCap;
      default:
        return Car;
    }
  };

  const Icon = getIcon();

  return (
    <motion.div
      className={`relative ${isFullScreen ? 'fixed top-0 left-0 w-screen h-screen z-50 rounded-none max-w-screen-lg mx-auto p-8' : 'bg-white/10 dark:bg-gray-800/20 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-gray-700/30 shadow-2xl overflow-hidden'} group`}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ perspective: "1000px", ...(isFullScreen ? {backgroundColor: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(20px)'} : {})}}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <motion.div
            className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white shadow-lg"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="w-6 h-6" />
          </motion.div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <motion.button
            onClick={reset3D}
            className="p-2 bg-white/20 dark:bg-gray-700/30 backdrop-blur-sm rounded-lg hover:bg-white/30 dark:hover:bg-gray-600/40 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <RotateCcw className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </motion.button>
          <motion.button
              className="p-2 bg-white/20 dark:bg-gray-700/30 backdrop-blur-sm rounded-lg hover:bg-white/30 dark:hover:bg-gray-600/40 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFullScreen(!isFullScreen)}
            >
              <Maximize2 className="w-4 h-4 text-gray-700 dark:text-gray-300" />
            </motion.button>
        </div>
      </div>

      {/* 3D Model Container */}
      <motion.div
        ref={constraintsRef}
        className="relative h-64 flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{ perspective: "1000px" }}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        <motion.div
          drag
          dragConstraints={constraintsRef}
          dragElastic={0.1}
          style={{ x, y }}
          className="relative"
        >
          {get3DModel()}
        </motion.div>
        
        {/* Interaction Hint */}
        <motion.div
          className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full ${isFullScreen ? 'hidden' : ''}`}
          initial={{ opacity: 1 }}
          animate={{ opacity: isHovered || isDragging ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          Drag to rotate • Hover to interact
        </motion.div>
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
            }}
            animate={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Car 3D Model Component
const Car3DModel: React.FC<{ rotateX: any; rotateY: any; isHovered: boolean }> = ({ rotateX, rotateY, isHovered }) => {
  return (
    <motion.div
      className="relative"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      animate={isHovered ? {
        scale: [1, 1.1, 1],
      } : {}}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Car Body */}
      <motion.div
        className="relative w-32 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl shadow-2xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Car Top */}
        <div className="absolute top-0 left-4 right-4 h-8 bg-gradient-to-r from-red-400 to-red-500 rounded-t-xl transform -translate-y-2" 
             style={{ transform: "translateZ(8px) translateY(-8px)" }} />
        
        {/* Windows */}
        <div className="absolute top-1 left-6 right-6 h-6 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg opacity-80"
             style={{ transform: "translateZ(9px) translateY(-6px)" }} />
        
        {/* Wheels */}
        <motion.div
          className="absolute -bottom-2 left-2 w-6 h-6 bg-gray-800 rounded-full shadow-lg"
          animate={isHovered ? { rotate: 360 } : {}}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{ transform: "translateZ(4px)" }}
        />
        <motion.div
          className="absolute -bottom-2 right-2 w-6 h-6 bg-gray-800 rounded-full shadow-lg"
          animate={isHovered ? { rotate: 360 } : {}}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          style={{ transform: "translateZ(4px)" }}
        />
        
        {/* Headlights */}
        <motion.div
          className="absolute top-6 -left-1 w-3 h-3 bg-yellow-300 rounded-full"
          animate={isHovered ? { opacity: [1, 0.5, 1] } : {}}
          transition={{ duration: 0.5, repeat: Infinity }}
          style={{ transform: "translateZ(6px)" }}
        />
        <motion.div
          className="absolute bottom-6 -left-1 w-3 h-3 bg-yellow-300 rounded-full"
          animate={isHovered ? { opacity: [1, 0.5, 1] } : {}}
          transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }}
          style={{ transform: "translateZ(6px)" }}
        />
      </motion.div>
      
      {/* Shadow */}
      <motion.div
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-black/20 rounded-full blur-sm"
        animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
};

// Person 3D Model Component
const Person3DModel: React.FC<{ rotateX: any; rotateY: any; isHovered: boolean }> = ({ rotateX, rotateY, isHovered }) => {
  return (
    <motion.div
      className="relative"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Head */}
      <motion.div
        className="relative w-16 h-16 bg-gradient-to-br from-amber-200 to-amber-300 rounded-full mx-auto shadow-lg"
        animate={isHovered ? {
          scale: [1, 1.05, 1],
        } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{ transform: "translateZ(8px)" }}
      >
        {/* Eyes */}
        <motion.div
          className="absolute top-5 left-4 w-2 h-2 bg-gray-800 rounded-full"
          animate={isHovered ? { scaleY: [1, 0.1, 1] } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-5 right-4 w-2 h-2 bg-gray-800 rounded-full"
          animate={isHovered ? { scaleY: [1, 0.1, 1] } : {}}
          transition={{ duration: 3, repeat: Infinity, delay: 0.1 }}
        />
        
        {/* Smile */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-3 border-b-2 border-gray-800 rounded-full" />
      </motion.div>
      
      {/* Body */}
      <motion.div
        className="relative w-20 h-24 bg-gradient-to-b from-blue-500 to-blue-600 rounded-t-3xl mx-auto mt-2 shadow-lg"
        style={{ transform: "translateZ(4px)" }}
      >
        {/* Arms */}
        <motion.div
          className="absolute -left-6 top-4 w-12 h-4 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full origin-right"
          animate={isHovered ? { rotate: [0, 20, -20, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transform: "translateZ(2px)" }}
        />
        <motion.div
          className="absolute -right-6 top-4 w-12 h-4 bg-gradient-to-l from-blue-500 to-blue-400 rounded-full origin-left"
          animate={isHovered ? { rotate: [0, -20, 20, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transform: "translateZ(2px)" }}
        />
      </motion.div>
      
      {/* Legs */}
      <div className="flex gap-2 justify-center mt-1">
        <motion.div
          className="w-6 h-16 bg-gradient-to-b from-gray-700 to-gray-800 rounded-full shadow-md"
          animate={isHovered ? { rotateX: [0, 10, -10, 0] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ transform: "translateZ(2px)" }}
        />
        <motion.div
          className="w-6 h-16 bg-gradient-to-b from-gray-700 to-gray-800 rounded-full shadow-md"
          animate={isHovered ? { rotateX: [0, -10, 10, 0] } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ transform: "translateZ(2px)" }}
        />
      </div>
      
      {/* Shadow */}
      <motion.div
        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black/20 rounded-full blur-sm"
        animate={{ scale: isHovered ? [1, 1.1, 1] : 1 }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
};

// College 3D Model Component
const College3DModel: React.FC<{ rotateX: any; rotateY: any; isHovered: boolean }> = ({ rotateX, rotateY, isHovered }) => {
  return (
    <motion.div
      className="relative"
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      {/* Main Building */}
      <motion.div
        className="relative w-32 h-24 bg-gradient-to-b from-stone-300 to-stone-400 shadow-2xl"
        style={{ transform: "translateZ(16px)" }}
      >
        {/* Roof */}
        <div className="absolute -top-4 -left-2 -right-2 h-8 bg-gradient-to-b from-red-600 to-red-700 transform rotate-x-12"
             style={{ 
               clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
               transform: "translateZ(4px) rotateX(45deg)"
             }} />
        
        {/* Windows */}
        <div className="grid grid-cols-4 gap-1 p-2 h-full">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="bg-gradient-to-b from-blue-200 to-blue-300 rounded-sm"
              animate={isHovered ? {
                opacity: [0.7, 1, 0.7],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1
              }}
              style={{ transform: "translateZ(2px)" }}
            />
          ))}
        </div>
        
        {/* Door */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-12 bg-gradient-to-b from-amber-700 to-amber-800 rounded-t-lg"
          whileHover={{ scale: 1.05 }}
          style={{ transform: "translateZ(4px) translateX(-50%)" }}
        />
      </motion.div>
      
      {/* Side Buildings */}
      <div className="absolute top-4 -left-8 w-8 h-16 bg-gradient-to-b from-stone-400 to-stone-500 shadow-lg"
           style={{ transform: "translateZ(8px)" }} />
      <div className="absolute top-4 -right-8 w-8 h-16 bg-gradient-to-b from-stone-400 to-stone-500 shadow-lg"
           style={{ transform: "translateZ(8px)" }} />
      
      {/* Flag */}
      <motion.div
        className="absolute -top-8 left-1/2 transform -translate-x-1/2"
        animate={isHovered ? {
          rotate: [0, 5, -5, 0],
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ transform: "translateZ(20px) translateX(-50%)" }}
      >
        <div className="w-1 h-12 bg-gray-600" />
        <motion.div
          className="absolute top-0 left-1 w-6 h-4 bg-gradient-to-r from-blue-500 to-red-500"
          animate={{
            scaleX: [1, 0.8, 1],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
      
      {/* Shadow */}
      <motion.div
        className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-black/20 rounded-full blur-sm"
        animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
};

export default Interactive3D;