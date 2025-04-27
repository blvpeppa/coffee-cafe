import React,{useState,useEffect} from 'react'
import { FaCreditCard, FaMobileAlt, FaPrint, FaTimes, FaArrowRight } from 'react-icons/fa';
import g1 from '../../assets/gallery-1.jpg';
import g2 from '../../assets/gallery-2.jpg';
import g3 from '../../assets/gallery-3.jpg';
import {Link,useNavigate} from 'react-router-dom';
const Gallery = () => {
const navigate = useNavigate();
  const handleMoreVisitsClick = () => {
    navigate('/gallery');
    // Scroll to top after navigation
    window.scrollTo(0, 0);
  };
  const galleryItems = [
    { img: g1 },
    { img: g2 },
    { img: g3 },
  ];

  const [currentIndex, setCurrentIndex] = useState(null);

  const showPrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : galleryItems.length - 1));
  };

  const showNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev < galleryItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                onClick={() => setCurrentIndex(index)}
              >
                <div
                  className="h-64 bg-cover bg-center flex items-end transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.img})` }}
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition">
                    <span className="text-2xl">
                      <i className="fa fa-expand"></i>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {currentIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setCurrentIndex(null)}
        >
          <div className="relative max-w-full max-h-full">
            {/* Close button */}
            <button
              className="absolute top-2 right-2 text-white text-3xl"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(null);
              }}
            >
              &times;
            </button>

            {/* Left Arrow */}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl"
              onClick={showPrev}
            >
              &lt;
            </button>

            {/* Image */}
            <img
              src={galleryItems[currentIndex].img}
              alt="Selected"
              className="max-w-screen-md max-h-screen rounded"
            />

            {/* Right Arrow */}
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl"
              onClick={showNext}
            >
              &gt;
            </button>
          </div>
        </div>
      )}
      {/* More Tours Button */}
              <div className="text-center mt-12">
              <button 
      onClick={handleMoreVisitsClick}
      className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded inline-flex items-center"
    >
      Explore More Images <FaArrowRight className="ml-2" />
    </button>
              </div>
    </>
  );
};

export default Gallery;