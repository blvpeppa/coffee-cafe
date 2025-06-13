import React, { useState, useEffect, useContext } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPhone,
  FaPaperPlane,
  FaBars,
  FaTimes,
  FaWhatsapp,
  FaGlobe
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { TranslationContext } from "../../contexts/TranslationContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const location = useLocation();
  const { t, changeLanguage, language } = useContext(TranslationContext);

  // Menu items with translations
  const Menu = [
    { id: 1, name: t.navbar.home, link: "/" },
    { id: 2, name: t.navbar.about, link: "/about" },
    { id: 3, name: t.navbar.products, link: "/products" },
    { id: 4, name: t.navbar.visits, link: "/tour" },
    { id: 5, name: t.navbar.training, link: "/training" },
    { id: 6, name: t.navbar.archive, link: "/archive" },
    { id: 7, name: t.navbar.contact, link: "/contact" },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Highlight active link
  const isActive = (path) => {
    return location.pathname === path ? "text-green-700 font-semibold" : "text-gray-800";
  };

  // Toggle language menu
  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
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
              aria-label={t.navbar.callUs}
            >
              <FaPhone /> +250 795880784
            </a>
            <a 
              href="https://mail.google.com/mail/?view=cm&to=info@kigalirabbits.org" 
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-green-300 transition-colors"
              aria-label={t.navbar.emailUs}
            >
              <FaPaperPlane /> info@kigalirabbits.org
            </a>
          </div>
          <div className="flex items-center space-x-4 mt-2 md:mt-0">
            {/* Improved Language Switcher */}
            <div className="relative">
              <button
                onClick={toggleLanguageMenu}
                className="flex items-center gap-1 hover:text-green-300 transition-colors bg-white bg-opacity-20 px-2 py-1 rounded"
                aria-label="Change language"
              >
                <FaGlobe className="text-white" />
                <span className="uppercase text-xs text-white">{language}</span>
              </button>
              
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                  <div className="py-1">
                    {Object.entries({
                      en: "English",
                      fr: "Français",
                      rw: "Kinyarwanda"
                    }).map(([langCode, langName]) => (
                      <button
                        key={langCode}
                        onClick={() => {
                          changeLanguage(langCode);
                          setIsLanguageMenuOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          language === langCode 
                            ? 'bg-green-600 text-white' 
                            : 'text-gray-800 hover:bg-gray-100'
                        }`}
                      >
                        {langName}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex space-x-4">
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
      </div>

      {/* Main Navbar */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-3xl font-bold text-green-900 tracking-wider hover:text-green-700 transition-colors"
            onClick={() => setIsOpen(false)}
            aria-label={t.navbar.home}
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
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-2xl text-green-900 focus:outline-none"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
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