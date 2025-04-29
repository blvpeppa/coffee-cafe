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

const Gallery = () => {
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

  const [displayedItems, setDisplayedItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [pageOffset, setPageOffset] = useState(0);
  const itemsPerPage = 8;

  // Initialize displayed items
  useEffect(() => {
    updateDisplayedItems();
  }, [pageOffset]);

  const updateDisplayedItems = () => {
    const start = pageOffset % allGalleryItems.length;
    let items = [];
    
    // Handle wrapping around the array
    if (start + itemsPerPage <= allGalleryItems.length) {
      items = allGalleryItems.slice(start, start + itemsPerPage);
    } else {
      items = [
        ...allGalleryItems.slice(start),
        ...allGalleryItems.slice(0, itemsPerPage - (allGalleryItems.length - start))
      ];
    }
    
    setDisplayedItems(items);
  };

  // Preload all images for better modal performance
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
      } else if (e.key === 'ArrowLeft') {
        showPrev(e);
      } else if (e.key === 'ArrowRight') {
        showNext(e);
      }
    }
  }, [currentIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const showPrev = (e) => {
    e?.stopPropagation();
    if (isAnimating) return;
    
    setIsAnimating(true);
    if (currentIndex === null) {
      // Navigate gallery pages
      setPageOffset(prev => (prev - 1 + allGalleryItems.length) % allGalleryItems.length);
    } else {
      // Navigate modal images
      setCurrentIndex(prev => (prev > 0 ? prev - 1 : allGalleryItems.length - 1));
    }
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const showNext = (e) => {
    e?.stopPropagation();
    if (isAnimating) return;
    
    setIsAnimating(true);
    if (currentIndex === null) {
      // Navigate gallery pages
      setPageOffset(prev => (prev + 1) % allGalleryItems.length);
    } else {
      // Navigate modal images
      setCurrentIndex(prev => (prev < allGalleryItems.length - 1 ? prev + 1 : 0));
    }
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  // Touch events for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      showNext();
    }

    if (touchStart - touchEnd < -50) {
      // Swipe right
      showPrev();
    }
  };

  // Find the actual index in the full array when an image is clicked
  const getFullIndex = (displayIndex) => {
    const start = pageOffset % allGalleryItems.length;
    if (start + itemsPerPage <= allGalleryItems.length) {
      return start + displayIndex;
    } else {
      const wrapPoint = allGalleryItems.length - start;
      return displayIndex < wrapPoint 
        ? start + displayIndex 
        : displayIndex - wrapPoint;
    }
  };

  return (
    <>
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Gallery Collection</h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedItems.map((item, displayIndex) => {
              const fullIndex = getFullIndex(displayIndex);
              return (
                <div
                  key={fullIndex}
                  className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl"
                  onClick={() => setCurrentIndex(fullIndex)}
                  role="button"
                  tabIndex="0"
                  aria-label={`View ${item.alt}`}
                >
                  <div className="aspect-w-4 aspect-h-3 w-full">
                    <img
                      src={item.img}
                      alt={item.alt}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300">
                    <span className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-12">
            <button 
              onClick={showPrev}
              className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </button>
            
            <div className="text-gray-700">
              Showing {Math.min(pageOffset + 1, allGalleryItems.length)}-{Math.min(pageOffset + itemsPerPage, allGalleryItems.length)} of {allGalleryItems.length} images
            </div>
            
            <button 
              onClick={showNext}
              className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors flex items-center"
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Lightbox Modal */}
      {currentIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setCurrentIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
        >
          <div 
            className="relative w-full max-w-6xl max-h-full"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close button */}
            <button
              className="absolute -top-12 right-0 text-white text-3xl hover:text-gray-300 transition-colors focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(null);
              }}
              aria-label="Close gallery"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation Arrows */}
            <button
              className="hidden sm:block absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors focus:outline-none"
              onClick={showPrev}
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Image container with animation */}
            <div className="flex justify-center items-center h-full">
              <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                <img
                  src={allGalleryItems[currentIndex].img}
                  alt={allGalleryItems[currentIndex].alt}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-xl"
                  id="lightbox-title"
                />
              </div>
            </div>

            <button
              className="hidden sm:block absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300 transition-colors focus:outline-none"
              onClick={showNext}
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Mobile navigation buttons */}
            <div className="sm:hidden flex justify-between w-full mt-4">
              <button
                className="text-white text-2xl px-6 py-2 bg-black bg-opacity-50 rounded-full"
                onClick={showPrev}
                aria-label="Previous image"
              >
                &lt;
              </button>
              <button
                className="text-white text-2xl px-6 py-2 bg-black bg-opacity-50 rounded-full"
                onClick={showNext}
                aria-label="Next image"
              >
                &gt;
              </button>
            </div>

            {/* Image counter */}
            <div className="text-white text-center mt-4 text-lg">
              {currentIndex + 1} / {allGalleryItems.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;