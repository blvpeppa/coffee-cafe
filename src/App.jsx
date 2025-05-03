import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Training from "./components/Traininig/Training.jsx";
import SP from "./components/services&products/SP.jsx";
import Gallery from "./components/Gallery/Gallery.jsx";
// import PricingCards from "./components/Pricingcards/PricingCards.jsx";
import PaymentMethod from "./components/PaymentMethod/PaymentMethod.jsx";
import Receipt from "./components/Receipt/Receipt.jsx";
import AOS from "aos";
import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import Tour from "./components/Tour/Tour.jsx";
import Notfound from "./Notfound/Notfound.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "aos/dist/aos.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 700,
      easing: "ease-in",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Kigali Rabbit Center",
            "url": "https://kigalirabbits.org",
            "logo": "https://kigalirabbits.org/logo.png",
            "description":
              "Kigali Rabbit Center is a pioneer in rabbit breeding and artificial insemination in Rwanda.",
            "sameAs": [
              "https://facebook.com/kigalirabbits",
              "https://instagram.com/kigalirabbits"
            ]
          })}
        </script>
      </Helmet>

      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-x-hidden">
        <BrowserRouter>
          <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<SP />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/tour" element={<Tour />} />
              <Route path="/training" element={<Training />} />
              <Route path="/pay" element={<PaymentMethod />} />
              <Route path="/receipt" element={<Receipt />} />
              <Route path="*" element={<Notfound />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
