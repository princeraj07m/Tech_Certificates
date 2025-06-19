import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Briefcase, Award, Star, Sparkles } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'hackathon' | 'internship' | 'award' | 'milestone';
  organization?: string;
}

interface TimelineProps {
  achievements: Achievement[];
}

const Timeline: React.FC<TimelineProps> = ({ achievements }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const getIcon = (type: Achievement['type']) => {
    switch (type) {
      case 'hackathon':
        return Trophy;
      case 'internship':
        return Briefcase;
      case 'award':
        return Award;
      default:
        return Star;
    }
  };

  const getColor = (type: Achievement['type']) => {
    switch (type) {
      case 'hackathon':
        return {
          bg: 'from-yellow-400 to-orange-500',
          text: 'text-yellow-600 dark:text-yellow-400',
        };
      case 'internship':
        return {
          bg: 'from-blue-400 to-indigo-500',
          text: 'text-blue-600 dark:text-blue-400',
        };
      case 'award':
        return {
          bg: 'from-purple-400 to-pink-500',
          text: 'text-purple-600 dark:text-purple-400',
        };
      default:
        return {
          bg: 'from-green-400 to-teal-500',
          text: 'text-green-600 dark:text-green-400',
        };
    }
  };

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
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="mb-24"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.div
        className="text-center mb-12"
        variants={itemVariants}
      >
        <div className="inline-flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-purple-500" />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
            Achievement Timeline
          </h2>
          <Sparkles className="w-6 h-6 text-teal-500" />
        </div>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          A chronological journey through my key milestones and accomplishments in technology and professional development.
        </p>
      </motion.div>

      <div className="relative max-w-4xl mx-auto">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-teal-500" />

        {achievements.map((achievement, index) => {
          const Icon = getIcon(achievement.type);
          const colors = getColor(achievement.type);
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={achievement.id}
              className={`relative flex items-center mb-12 ${
                isEven ? 'flex-row' : 'flex-row-reverse'
              }`}
              variants={itemVariants}
            >
              {/* Content Card */}
              <div className={`w-5/12 ${isEven ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                <motion.div
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Type Badge */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-semibold mb-3 bg-gradient-to-r ${colors.bg} text-white`}>
                    <Icon className="w-4 h-4" />
                    {achievement.type.charAt(0).toUpperCase() + achievement.type.slice(1)}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {achievement.title}
                  </h3>
                  
                  {achievement.organization && (
                    <p className={`text-lg font-semibold mb-2 ${colors.text}`}>
                      {achievement.organization}
                    </p>
                  )}
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {achievement.description}
                  </p>
                  
                  <time className="text-sm text-gray-500 dark:text-gray-500 font-semibold bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {achievement.date}
                  </time>
                </motion.div>
              </div>

              {/* Center Icon */}
              <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-12 h-12 bg-white dark:bg-gray-800 border-4 border-white dark:border-gray-700 rounded-full flex items-center justify-center shadow-lg">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r ${colors.bg} text-white`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Empty space */}
              <div className="w-5/12" />
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
};

export default Timeline;