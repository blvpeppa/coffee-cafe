import React from "react";
import image1 from "../../assets/image_1.jpg";
import image2 from "../../assets/image_2.jpg";
import { FaFacebook, FaTwitter, FaInstagram, FaDribbble, FaPhone, FaPaperPlane, FaWhatsapp, FaArrowUp } from "react-icons/fa";
import BgImg from "../../assets/website/coffee-texture.jpg";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // Smooth scrolling animation
    });
  };

  const FooterMenu = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "About", link: "/#about" },
    { id: 4, name: "Contact", link: "/#about" }
  ];

  return (
    <footer className="bg-green-800 text-white pt-10 px-6 bg-gradient-to-b from-green-800 to-green-950 relative">
      {/* Back to Top Button */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50"
        aria-label="Back to top"
      >
        <FaArrowUp className="w-5 h-5" />
      </button>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">KIGALIRABBITCENTER</h2>
          <p className="mb-4">
            is a limited liability company incorporated in Rwanda under the Companies Act (NO 17/2018 of 13/04/2018) Laws of Rwanda.
            <h1>Join us :</h1> 
          </p>
          <div className="flex gap-4">
            <a href="#"><i><FaFacebook /></i></a>
            <a href="#"><i><FaWhatsapp /></i></a>
            <a href="#"><i><FaInstagram /></i></a>
            <a href="#"><i><FaTwitter /></i></a>
          </div>
        </div>

        <div>
          {/* quick links*/}
          <div>
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li><Link to='/' onClick={scrollToTop}>Home</Link></li>
              <li><Link to='/About' onClick={scrollToTop}>About</Link></li>
              <li><Link to='/Contact' onClick={scrollToTop}>Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* more Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">More Links</h2>
          <ul className="space-y-2">
            <li><Link to='/products' onClick={scrollToTop}>Services&Products</Link></li>
            <li><Link to='/Gallery' onClick={scrollToTop}>Gallery</Link></li>
            <li><Link to='/Tour' onClick={scrollToTop}>Visits</Link></li>
            <li><Link to='/Training' onClick={scrollToTop}>Training</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-bold mb-4">Have a Question?</h2>
          <ul className="space-y-3 text-sm">
            <li><i className="fa fa-map mr-2"></i>nyamirambo, Nyarugenge Kigali, Rwanda</li>
            <li><a href="tel:+250780797881"><i className="fa fa-phone mr-2"></i>+250 780797881</a></li>
            <li><a href="mailto:kigalirabbit@gmail.com"><i className="fa fa-paper-plane mr-2"></i>info@kigalirabbit.org</a></li>
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