import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {FaArrowRight } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
// Import your images
import g1 from '../../assets/gallery-1.jpg';
import g2 from '../../assets/gallery-2.jpg';
import g3 from '../../assets/gallery-3.jpg';
import g5 from '../../assets/gallery-5.jpg';

const Gallery = ({ 
  columns = { sm: 2, md: 3, lg: 4, xl: 5 }, 
  gap = 6,
  showTitle = true
}) => {
  const allGalleryItems = [
    { img: g1, alt: "Gallery image 1" },
    { img: g2, alt: "Gallery image 2" },
    { img: g3, alt: "Gallery image 3" },
    { img: g5, alt: "Gallery image 4" },
  ];
  const navigate = useNavigate();
const handleMoreVisitsClick = () => {
    navigate('/gallery');
    // Scroll to top after navigation
    window.scrollTo(0, 0);
  };
  const [currentIndex, setCurrentIndex] = useState(null);
  const [direction, setDirection] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (currentIndex !== null) {
      switch(e.key) {
        case 'Escape':
          closeModal();
          break;
        case 'ArrowLeft':
          showPrev(e);
          break;
        case 'ArrowRight':
          showNext(e);
          break;
        case 'f':
          setIsFullscreen(!isFullscreen);
          break;
        case ' ':
        case 'z':
          setIsZoomed(!isZoomed);
          break;
      }
    }
  }, [currentIndex, isFullscreen, isZoomed]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const showPrev = (e) => {
    e?.stopPropagation();
    setDirection(-1);
    setImageLoaded(false);
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : allGalleryItems.length - 1));
    setIsZoomed(false);
  };

  const showNext = (e) => {
    e?.stopPropagation();
    setDirection(1);
    setImageLoaded(false);
    setCurrentIndex(prev => (prev < allGalleryItems.length - 1 ? prev + 1 : 0));
    setIsZoomed(false);
  };

  const closeModal = () => {
    setCurrentIndex(null);
    setIsFullscreen(false);
    setIsZoomed(false);
  };

  const openModal = (index) => {
    setCurrentIndex(index);
    setIsFullscreen(false);
    setIsZoomed(false);
    setImageLoaded(false);
  };

  // Animation variants
  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  const imageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    })
  };

  const zoomVariants = {
    normal: { scale: 1 },
    zoomed: { scale: 2 }
  };

  return (
    <section className="px-4 py-12 mx-auto max-w-7xl">
      {/* Gallery Title */}
      {showTitle && (
        <div className="w-full mx-auto text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight text-gray-900 md:text-5xl"
          >
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Image Gallery
            </span>
          </motion.h1>
        </div>
      )}

      {/* Gallery Grid */}
      <div className={`mx-auto grid grid-cols-${columns.sm} md:grid-cols-${columns.md} lg:grid-cols-${columns.lg} xl:grid-cols-${columns.xl} gap-${gap}`}>
        {allGalleryItems.map((item, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            onClick={() => openModal(index)}
          >
            <div className="aspect-[4/3] w-full">
              <img 
                src={item.img}
                className="absolute inset-0 object-cover w-full h-full"
                alt={item.alt}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-medium truncate">{item.alt}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence custom={direction}>
        {currentIndex !== null && (
          <motion.div
            key="modal"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={modalVariants}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
            onClick={closeModal}
          >
            <div className={`relative ${isFullscreen ? 'w-screen h-screen' : 'w-full h-full max-w-6xl max-h-[90vh]'}`}>
              {/* Navigation Arrows */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev(e);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full z-10 shadow-xl"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>

              {/* Image Container */}
              <div className="flex items-center justify-center w-full h-full p-4">
                <AnimatePresence custom={direction}>
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={imageVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className={`absolute w-full h-full ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                    onClick={(e) => {
                      if (!isZoomed) e.stopPropagation();
                      setIsZoomed(!isZoomed);
                    }}
                  >
                    <motion.img
                      src={allGalleryItems[currentIndex].img}
                      alt={allGalleryItems[currentIndex].alt}
                      className="object-contain w-full h-full select-none"
                      variants={zoomVariants}
                      animate={isZoomed ? "zoomed" : "normal"}
                      transition={{ type: "spring", damping: 20 }}
                      onLoad={() => setImageLoaded(true)}
                    />
                    {!imageLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
                        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  showNext(e);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full z-10 shadow-xl"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>

              {/* Controls */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-6 left-0 right-0 flex justify-center gap-4 z-10"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsFullscreen(!isFullscreen);
                  }}
                  className="bg-black/50 text-white p-3 rounded-full shadow-xl"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {isFullscreen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    )}
                  </svg>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsZoomed(!isZoomed);
                  }}
                  className="bg-black/50 text-white p-3 rounded-full shadow-xl"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    closeModal();
                  }}
                  className="bg-black/50 text-white p-3 rounded-full shadow-xl"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </motion.div>

              {/* Image Counter */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-6 right-6 bg-black/50 text-white px-4 py-2 rounded-full text-sm shadow-xl"
              >
                {currentIndex + 1} / {allGalleryItems.length}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
       {/* More Tours Button */}
              <div className="text-center mt-12">
              <button 
      onClick={handleMoreVisitsClick}
      className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded inline-flex items-center"
    >
      Explore More Images <FaArrowRight className="ml-2" />
    </button>
              </div>
    </section>
  );
};

export default Gallery;