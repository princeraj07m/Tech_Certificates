import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Sparkles } from 'lucide-react';
import Hero from './components/Hero';
import CategoryFilter from './components/CategoryFilter';
import CertificateGallery from './components/CertificateGallery';
import Timeline from './components/Timeline';
import Interactive3DSection from './components/Interactive3DSection';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import FloatingElements from './components/FloatingElements';
import { certificates, achievements } from './data/portfolioData';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredCertificates, setFilteredCertificates] = useState(certificates);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredCertificates(certificates);
    } else {
      setFilteredCertificates(certificates.filter(cert => cert.category === selectedCategory));
    }
  }, [selectedCategory]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-500 overflow-x-hidden">
      {/* Simplified Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-purple-50/10 to-teal-50/20 dark:from-blue-900/5 dark:via-purple-900/5 dark:to-teal-900/5"></div>
        <FloatingElements />
      </div>

      {/* Optimized Theme Toggle */}
      <motion.button
        onClick={toggleDarkMode}
        className="fixed top-6 right-6 z-50 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <AnimatePresence mode="wait">
          {darkMode ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className="w-5 h-5 text-yellow-500" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className="w-5 h-5 text-gray-600" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Hero />
      </motion.div>

      {/* Main Content */}
      <motion.main 
        className="container mx-auto px-4 py-16 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <CertificateGallery certificates={filteredCertificates} />

        <Timeline achievements={achievements} />
      </motion.main>
        
      {/* Interactive 3D Section */}
        <Interactive3DSection />

      <Footer />
    </div>
  );
}

export default App;