import React, { useState } from "react";
import {
  FaFacebook, FaTwitter, FaInstagram, FaPhone, FaPaperPlane,
  FaBars, FaTimes, FaWhatsapp, FaGlobe
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import logo from '../../assets/vite.svg';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const isActive = (path) => location.pathname === path ? "text-green-700 font-semibold" : "text-gray-800";

  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  const Menu = [
    { id: 1, key: "home", link: "/" },
    { id: 2, key: "aboutus", link: "/about" },
    { id: 3, key: "service", link: "/products" },
    { id: 4, key: "visits", link: "/tour" },
    { id: 5, key: "trainings", link: "/training" },
    { id: 6, key: "archive", link: "/archive" },
    { id: 7, key: "contact", link: "/contact" }
  ];

  return (
    <>
      <div className="bg-green-800 text-white text-sm">
        <div className="container mx-auto px-4 py-2 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4 flex-wrap">
            <a href="tel:+250795880784" className="flex items-center gap-2 hover:text-green-300 transition-colors">
              <FaPhone /> +250 795880784
            </a>
            <a href="https://mail.google.com/mail/?view=cm&to=info@kigalirabbits.org" target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-2 hover:text-green-300 transition-colors">
              <FaPaperPlane /> info@kigalirabbits.org
            </a>
          </div>

          <div className="flex space-x-4 mt-2 md:mt-0 items-center">
            <div className="relative flex items-center gap-1 bg-white bg-opacity-20 px-2 py-1 rounded">
              <FaGlobe className="text-white" />
              <span className="uppercase text-xs text-white">{t("translate")}:</span>
              <select onChange={(e) => changeLanguage(e.target.value)} className="bg-transparent text-black outline-none">
                <option value="en">EN</option>
                <option value="fr">FR</option>
                <option value="rw">RW</option>
              </select>
            </div>

            <a href="https://www.facebook.com/share/1CcbvjuHKw/" target="_blank" rel="noopener noreferrer" className="hover:text-green-300"><FaFacebook /></a>
            <a href="https://x.com/kigalirabbit?s=11" target="_blank" rel="noopener noreferrer" className="hover:text-green-300"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300"><FaInstagram /></a>
            <a href="https://wa.me/250795880784" target="_blank" rel="noopener noreferrer" className="hover:text-green-300"><FaWhatsapp /></a>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-50 bg-white shadow-md">
  <div className="container mx-auto px-4 py-4 flex justify-between items-center">
    <Link to="/" className="flex items-center">
      <img 
        src={logo} 
        alt="KRC" 
        className="h-12 w-auto" 
      />
      <span className="ml-2 text-3xl font-bold text-green-900 tracking-wider hover:text-green-700 transition-colors">
      </span>
    </Link>
    
    <ul className="hidden md:flex gap-8">
      {Menu.map((menu) => (
        <li key={menu.id}>
          <Link 
            to={menu.link} 
            className={`text-lg hover:text-green-700 transition-all duration-300 ${isActive(menu.link)}`}
          >
            {t(menu.key)}
          </Link>
        </li>
      ))}
    </ul>

    <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl text-green-900">
      {isOpen ? <FaTimes /> : <FaBars />}
    </button>
  </div>
</div>


        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <ul className="flex flex-col py-4 px-6 space-y-4">
              {Menu.map((menu) => (
                <li key={menu.id}>
                  <Link to={menu.link} className={`block text-lg hover:text-green-700 ${isActive(menu.link)}`} onClick={() => setIsOpen(false)}>
                    {t(menu.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
    </>
  );
};

export default Navbar;
