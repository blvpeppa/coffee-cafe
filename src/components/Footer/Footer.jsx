import React from "react";
import image1 from "../../assets/image_1.jpg";
import image2 from "../../assets/image_2.jpg";
import {FaFacebook,FaTwitter,FaInstagram,FaDribbble,FaPhone,FaPaperPlane,FaWhatsapp} from "react-icons/fa";
import BgImg from "../../assets/website/coffee-texture.jpg";
const Footer = () => {
  const FooterMenu = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "About", link: "/#about" },
    { id: 4, name: "Contact", link: "/#about" }
  ];
  return (
    <footer className="bg-green-800 text-white pt-10 px-6 bg-gradient-to-b from-green-800 to-green-950 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About Section */}
        <div>
          <h2 className="text-xl font-bold mb-4">KIGALIRABBITCENTER</h2>
          <p className="mb-4">
          is a limited liability company incorporated in Rwanda under the Companies Act (NO 17/2018 of 13/04/2018) Laws of Rwanda.
          <h1>Join us :</h1> </p>
          <div className="flex gap-4">
            <a href="#"><i><FaFacebook /></i></a>
            <a href="#"><i><FaWhatsapp /></i></a>
            <a href="#"><i><FaInstagram /></i></a>
            <a href="#"><i><FaTwitter /></i></a>
          </div>
        </div>

        {/* Latest News */}
        <div>
          <h2 className="text-xl font-bold mb-4">Latest News</h2>
          {[{ img: image1 }, { img: image2 }].map((item, idx) => (
            <div key={idx} className="flex mb-4">
              <div
                className="w-16 h-16 bg-cover bg-center rounded mr-4"
                style={{ backgroundImage: `url(${item.img})` }}
              />
              <div>
                <h3 className="text-sm font-semibold">
                  <a href="#">Even the all-powerful Pointing has no control about</a>
                </h3>
                <div className="text-xs opacity-75">
                  <div><i className="fa fa-calendar mr-1"></i> April 7, 2020</div>
                  <div><i className="fa fa-user mr-1"></i> Admin</div>
                  <div><i className="fa fa-comments mr-1"></i> 19</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/#about" className="hover:underline">About</a></li>
            <li><a href="/#contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-xl font-bold mb-4">Have a Question?</h2>
          <ul className="space-y-3 text-sm">
            <li><i className="fa fa-map mr-2"></i>nyamirambo, Nyarugenge Kigali, Rwanda</li>
            <li><a href="tel:+250780797881"><i className="fa fa-phone mr-2"></i>+250 780797881</a></li>
            <li><a href="mailto:kigalirabbit@gmail.com"><i className="fa fa-paper-plane mr-2"></i>kigalirabbit@gmail.com</a></li>
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
