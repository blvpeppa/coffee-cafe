import React, { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Check scroll position and show/hide button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-green-800 text-white pt-10 px-6 bg-gradient-to-b from-green-800 to-green-950 relative">
      {/* Scroll to Top Button - Conditionally rendered */}
      {showScrollButton && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50 animate-bounce"
          aria-label="Back to top"
        >
          <FaArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Rest of your footer content remains the same */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">KIGALIRABBITCENTER</h2>
          <p className="mb-4">
            is a limited liability company incorporated in Rwanda under the Companies Act (NO 17/2018 of 13/04/2018) Laws of Rwanda.
            <h1>Join us :</h1> 
          </p>
          <div className="flex gap-4">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaWhatsapp /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link to='/' onClick={scrollToTop}>Home</Link></li>
            <li><Link to='/About' onClick={scrollToTop}>About</Link></li>
            <li><Link to='/Contact' onClick={scrollToTop}>Contact</Link></li>
          </ul>
        </div>

        {/* More Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">More Links</h2>
          <ul className="space-y-2">
            <li><Link to='/products' onClick={scrollToTop}>Services & Products</Link></li>
            <li><Link to='/Gallery' onClick={scrollToTop}>Gallery</Link></li>
            <li><Link to='/Tours' onClick={scrollToTop}>Tours</Link></li>
            <li><Link to='/Training' onClick={scrollToTop}>Training</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-bold mb-4">Have a Question?</h2>
          <ul className="space-y-3 text-sm">
            <li>nyamirambo, Nyarugenge Kigali, Rwanda</li>
            <li><a href="tel:+250780797881">+250 780797881</a></li>
            <li><a href="mailto:kigalirabbit@gmail.com">info@kigalirabbit.org</a></li>
          </ul>
        </div>
      </div>

      <div className="text-center py-6 mt-10 border-t border-green-800 text-sm">
        © {new Date().getFullYear()} made with <i className="fa fa-heart text-green-800" aria-hidden="true"></i> by <a href="https://orgindreams.com" className="hover:underline">OrginDreams.com</a>
      </div>
    </footer>
  );
};

export default Footer;