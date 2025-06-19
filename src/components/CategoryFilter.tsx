import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, BookOpen, Briefcase, Users, Code, Star, Sparkles } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', label: 'All', icon: Star, color: 'from-gray-500 to-gray-600' },
  { id: 'hackathons', label: 'Hackathons', icon: Trophy, color: 'from-yellow-500 to-orange-500' },
  { id: 'contests', label: 'Contests', icon: Code, color: 'from-red-500 to-rose-500' },
  { id: 'courses', label: 'Courses', icon: BookOpen, color: 'from-blue-500 to-indigo-500' },
  { id: 'internships', label: 'Internships', icon: Briefcase, color: 'from-green-500 to-teal-500' },
  { id: 'workshops', label: 'Workshops', icon: Users, color: 'from-purple-500 to-pink-500' },
  { id: 'projects', label: 'Projects', icon: Code, color: 'from-red-500 to-rose-500' },
];

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
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
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      ref={ref}
      className="mb-20"
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.div className="text-center mb-12" variants={itemVariants}>
        <div className="inline-flex items-center gap-2 mb-4">
          <Sparkles className="w-6 h-6 text-purple-500" />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
            My Achievements
          </h2>
          <Sparkles className="w-6 h-6 text-teal-500" />
        </div>
        
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore my journey through various learning experiences, competitions, and professional development milestones.
        </p>
      </motion.div>

      <motion.div
        className="flex flex-wrap justify-center gap-4"
        variants={containerVariants}
      >
        {categories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;
          
          return (
            <motion.button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`relative flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                isSelected
                  ? 'text-white shadow-lg scale-105'
                  : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:shadow-md hover:scale-102 border border-gray-200/50 dark:border-gray-700/50'
              }`}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              layout
            >
              {/* Background for Selected */}
              {isSelected && (
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${category.color} rounded-xl`}
                  layoutId="selectedBackground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* Icon */}
              <Icon className="w-5 h-5 relative z-10" />
              
              {/* Label */}
              <span className="relative z-10">{category.label}</span>
            </motion.button>
          );
        })}
      </motion.div>
    </motion.section>
  );
};

export default CategoryFilter;