import React, { useState, useEffect } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaPaperPlane,
  FaBars,
  FaTimes,
  FaWhatsapp
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
const Menu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "About", link: "/about" },
  { id: 3, name: "Services & Products", link: "/products" },
  { id: 5, name: "Visits", link: "/tour" },
  { id: 6, name: "Training", link: "/training" },
  { id: 4, name: "Contact", link: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Highlight active link
  const isActive = (path) => {
    return location.pathname === path ? "text-green-700 font-semibold" : "text-gray-800";
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-green-800 text-white text-sm">
        <div className="container mx-auto px-4 py-2 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4 flex-wrap">
            <a 
              href="tel:+250795880784" 
              className="flex items-center gap-2 hover:text-green-300 transition-colors"
              aria-label="Call us"
            >
              <FaPhone /> +250 795880784
            </a>
            <a 
              href="https://mail.google.com/mail/?view=cm&to=info@kigalirabbits.org" 
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-green-300 transition-colors"
              aria-label="Email us"
            >
              <FaPaperPlane /> info@kigalirabbits.org
            </a>
          </div>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a 
              href="https://www.facebook.com/share/1CcbvjuHKw/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-green-300 transition-colors"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a 
              href="https://x.com/kigalirabbit?s=11" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-green-300 transition-colors"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-green-300 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a 
              href="https://wa.me/250795880784" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-green-300 transition-colors"
              aria-label="WhatsApp"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-3xl font-bold text-green-900 tracking-wider hover:text-green-700 transition-colors"
            onClick={() => setIsOpen(false)}
            aria-label="Home"
          >
            KRC
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8">
            {Menu.map((menu) => (
              <li key={menu.id}>
                <Link
                  to={menu.link}
                  className={`text-lg hover:text-green-700 transition-all duration-300 ${isActive(menu.link)}`}
                >
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl text-green-900 focus:outline-none"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <ul className="flex flex-col py-4 px-6 space-y-4">
              {Menu.map((menu) => (
                <li key={menu.id}>
                  <Link
                    to={menu.link}
                    className={`block text-lg hover:text-green-700 transition-colors ${isActive(menu.link)}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;