import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Calendar, MapPin, Download, ExternalLink, X, Eye, Maximize } from 'lucide-react';

interface Certificate {
  id: string;
  title: string;
  organization: string;
  date: string;
  category: string;
  description: string;
  imageUrl: string;
  downloadUrl?: string;
  verifyUrl?: string;
  skills: string[];
}

interface CertificateGalleryProps {
  certificates: Certificate[];
}

const CertificateGallery: React.FC<CertificateGalleryProps> = ({ certificates }) => {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [showFullImage, setShowFullImage] = useState(false);

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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
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
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        <AnimatePresence>
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50"
              variants={cardVariants}
              layout
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Certificate Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={cert.imageUrl}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* View Button */}
                <button
                  onClick={() => setSelectedCert(cert)}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-lg">
                    <Eye className="w-4 h-4" />
                    View Details
                  </div>
                </button>
              </div>

              {/* Certificate Info */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {cert.title}
                </h3>
                
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                  {cert.organization}
                </div>
                
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <Calendar className="w-4 h-4 mr-2 text-green-500" />
                  {cert.date}
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {cert.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {cert.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                      +{cert.skills.length - 3} more
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {cert.downloadUrl && (
                    <a
                      href={cert.downloadUrl}
                      download
                      className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white text-sm rounded-lg font-medium hover:bg-green-600 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  )}
                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-purple-500 text-white text-sm rounded-lg font-medium hover:bg-purple-600 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Verify
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-5xl w-full max-h-screen overflow-y-auto shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                {!showFullImage ? (
                  <>
                    <img
                      src={selectedCert.imageUrl}
                      alt={selectedCert.title}
                      className="w-full h-64 object-contain rounded-t-2xl"
                    />
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2">{selectedCert.title}</h3>
                      
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                          {selectedCert.organization}
                        </div>
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <Calendar className="w-4 h-4 mr-2 text-green-500" />
                          {selectedCert.date}
                        </div>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                        {selectedCert.description}
                      </p>

                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-3">Skills & Technologies:</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedCert.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        {selectedCert.downloadUrl && (
                          <a
                            href={selectedCert.downloadUrl}
                            download
                            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            Download Certificate
                          </a>
                        )}
                        {selectedCert.verifyUrl && (
                          <a
                            href={selectedCert.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Verify Certificate
                          </a>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full bg-black">
                    <img
                      src={selectedCert.imageUrl}
                      alt={selectedCert.title}
                      className="w-full h-full object-contain"
                      style={{ transform: 'scale(1)' }} // Initial zoom level
                    />
                    <p className="text-white text-center mt-4">Pinch to zoom</p>
                  </div>
                )}
                
                <button
                  onClick={() => setSelectedCert(null)}
                  className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setShowFullImage(!showFullImage)}
                  className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2 border border-gray-300"
                >
                  <Maximize className="w-5 h-5 text-gray-700" />
                  <span className="text-gray-700">Full Screen</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default CertificateGallery;