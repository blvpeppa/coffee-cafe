import React, { useState, useEffect, useCallback } from 'react';
import g1 from '../../assets/gallery-1.jpg';
import g2 from '../../assets/gallery-2.jpg';
import g3 from '../../assets/gallery-3.jpg';
import g4 from '../../assets/gallery-4.jpg';
import g5 from '../../assets/gallery-5.jpg';
import g6 from '../../assets/gallery-6.jpg';
import g7 from '../../assets/gallery-7.jpg';
import g8 from '../../assets/gallery-8.jpg';
import g9 from '../../assets/gallery-9.jpg';

const Gallery = ({ 
  columns = { sm: 2, md: 3, lg: 4, xl: 5 }, 
  gap = 5,
  imageAspect = '5/6',
  showTitle = true,
  modalBlur = true,
  modalBackground = 'rgba(0,0,0,0.8)'
}) => {
  const allGalleryItems = [
    { img: g1, alt: "Gallery image 1" },
    { img: g2, alt: "Gallery image 2" },
    { img: g3, alt: "Gallery image 3" },
    { img: g4, alt: "Gallery image 4" },
    { img: g5, alt: "Gallery image 5" },
    { img: g6, alt: "Gallery image 6" },
    { img: g7, alt: "Gallery image 7" },
    { img: g8, alt: "Gallery image 8" },
    { img: g9, alt: "Gallery image 9" },
  ];

  const [currentIndex, setCurrentIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Preload all images
  useEffect(() => {
    allGalleryItems.forEach(item => {
      const img = new Image();
      img.src = item.img;
    });
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (currentIndex !== null) {
      if (e.key === 'Escape') {
        setCurrentIndex(null);
        setIsFullscreen(false);
      } else if (e.key === 'ArrowLeft') {
        showPrev(e);
      } else if (e.key === 'ArrowRight') {
        showNext(e);
      } else if (e.key === 'f') {
        setIsFullscreen(!isFullscreen);
      }
    }
  }, [currentIndex, isFullscreen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const showPrev = (e) => {
    e?.stopPropagation();
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : allGalleryItems.length - 1));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const showNext = (e) => {
    e?.stopPropagation();
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex(prev => (prev < allGalleryItems.length - 1 ? prev + 1 : 0));
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Touch events for mobile swipe
  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) showNext();
    if (touchStart - touchEnd < -50) showPrev();
  };

  // Dynamic grid classes based on props
  const getGridClasses = () => {
    return `grid grid-cols-${columns.sm || 2} 
            md:grid-cols-${columns.md || 3} 
            lg:grid-cols-${columns.lg || 4} 
            xl:grid-cols-${columns.xl || 5} 
            gap-${gap || 5}`;
  };

  return (
    <section className="px-4 py-12 md:py-24 mx-auto max-w-7xl">
      {showTitle && (
        <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center mb-12">
          <h1 className="text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
            <span className="block w-full text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-purple-500 lg:inline">
              Our Gallery Collection
            </span>
          </h1>
        </div>
      )}

      <div className={`max-w-6xl mx-auto animate-fade-in ${getGridClasses()}`}>
        {allGalleryItems.map((item, index) => (
          <div 
            key={index}
            className={`relative overflow-hidden rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
            style={{ aspectRatio: imageAspect }}
          >
            <img 
              onClick={() => setCurrentIndex(index)}
              src={item.img}
              className="absolute inset-0 object-cover w-full h-full cursor-zoom-in"
              alt={item.alt}
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-30">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-10 h-10 text-white opacity-0 transition-all duration-300 group-hover:opacity-100"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced Modal */}
      {currentIndex !== null && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center ${modalBlur ? 'backdrop-blur-sm' : ''}`}
          style={{ backgroundColor: modalBackground }}
          onClick={() => {
            setCurrentIndex(null);
            setIsFullscreen(false);
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className={`relative ${isFullscreen ? 'w-screen h-screen' : 'w-11/12 h-5/6 max-w-6xl'}`}>
            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev(e);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all z-10"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Image Container */}
            <div className="flex items-center justify-center w-full h-full p-4">
              <div className={`relative w-full h-full transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                <img
                  src={allGalleryItems[currentIndex].img}
                  alt={allGalleryItems[currentIndex].alt}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext(e);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all z-10"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Controls */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFullscreen(!isFullscreen);
                }}
                className="bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isFullscreen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  )}
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(null);
                  setIsFullscreen(false);
                }}
                className="bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Image Counter */}
            <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {allGalleryItems.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;