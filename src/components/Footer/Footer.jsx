import React, { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaArrowUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-green-800 text-white pt-10 px-6 bg-gradient-to-b from-green-800 to-green-950 relative">
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50 animate-bounce"
          aria-label={t("footer.scrollTop")}
        >
          <FaArrowUp className="w-5 h-5" />
        </button>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h2 className="text-xl font-bold mb-4">{t("footer.companyName")}</h2>
          <p className="mb-4">{t("footer.description")}</p>
          <h1>{t("footer.joinUs")}</h1>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/share/1CcbvjuHKw/"><FaFacebook /></a>
            <a href="#"><FaWhatsapp /></a>
            <a href="#"><FaInstagram /></a>
            <a href="https://x.com/kigalirabbit?s=11"><FaTwitter /></a>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">{t("footer.quickLinks")}</h2>
          <ul className="space-y-2">
            <li><Link to='/' onClick={scrollToTop}>{t("footer.home")}</Link></li>
            <li><Link to='/About' onClick={scrollToTop}>{t("footer.about")}</Link></li>
            <li><Link to='/Contact' onClick={scrollToTop}>{t("footer.contact")}</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">{t("footer.moreLinks")}</h2>
          <ul className="space-y-2">
            <li><Link to='/products' onClick={scrollToTop}>{t("footer.products")}</Link></li>
            <li><Link to='/Gallery' onClick={scrollToTop}>{t("footer.gallery")}</Link></li>
            <li><Link to='/Tour' onClick={scrollToTop}>{t("footer.visits")}</Link></li>
            <li><Link to='/Training' onClick={scrollToTop}>{t("footer.training")}</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4">{t("footer.haveQuestion")}</h2>
          <ul className="space-y-3 text-sm">
            <li>{t("footer.address")}</li>
            <li><a href="tel:+250795880784">+250 795880784</a></li>
            <li className="flex items-center gap-2">
              <a href="https://mail.google.com/mail/?view=cm&to=info@kigalirabbits.org" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
                {t("footer.emailUs")}
              </a>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                <path d="M12 13.065L1.5 6.375V17.25c0 .966.784 1.75 1.75 1.75h17.5c.966 0 1.75-.784 1.75-1.75V6.375l-10.5 6.69zM12 10.935L22.5 4.25H1.5L12 10.935z"/>
              </svg>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center py-6 mt-10 border-t border-green-800 text-sm">
        © {new Date().getFullYear()} {t("footer.madeWith")} <i className="fa fa-heart text-green-800" aria-hidden="true"></i> {t("footer.by")} <a href="https://orgindreams.com" className="hover:underline">OrginDreams.com</a>
      </div>
    </footer>
  );
};

export default Footer;
