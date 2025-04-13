import React, { useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaDribbble,
  FaPhone,
  FaPaperPlane,
  FaBars,
  FaTimes,
  FaWhatsapp
} from "react-icons/fa";

const Menu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "About", link: "/#about" },
  { id: 3, name: "Services & Products", link: "/#services" },
  { id: 4, name: "Contact", link: "/#contact" },
  { id: 5, name: "Tour", link: "/#tour" },
  { id: 6, name: "Training", link: "/#training" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-green-800 text-white text-sm">
        <div className="container mx-auto px-4 py-2 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4 flex-wrap">
            <a href="#" className="flex items-center gap-2">
              <FaPhone /> +250 780797881
            </a>
            <a href="#" className="flex items-center gap-2">
              <FaPaperPlane /> kigalirabbit@gmail.com
            </a>
          </div>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-green-300">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-green-300">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-green-300">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-green-300">
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <a
            href="/"
            className="text-3xl font-bold text-green-900 tracking-wider"
          >
            KRC
          </a>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8">
            {Menu.map((menu) => (
              <li key={menu.id}>
                <a
                  href={menu.link}
                  className="text-lg text-gray-800 hover:text-green-700 transition-all duration-300"
                >
                  {menu.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-2xl text-green-900"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
            <ul className="flex flex-col gap-4 p-4">
              {Menu.map((menu) => (
                <li key={menu.id}>
                  <a
                    href={menu.link}
                    className="block text-gray-800 text-lg hover:text-green-700"
                    onClick={() => setIsOpen(false)}
                  >
                    {menu.name}
                  </a>
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
