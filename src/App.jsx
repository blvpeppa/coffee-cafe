import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Training from "./components/Traininig/Training.jsx";
import SP from "./components/services&products/SP.jsx";
import Gallery from "./components/Gallery/Gallery.jsx";
import AOS from "aos";
import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import Tour from "./components/Tour/Tour.jsx";
import Notfound from "./Notfound/Notfound.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "aos/dist/aos.css";
import { BrowserRouter,Router,Route,Routes,Link } from "react-router-dom";


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
          <Route path="*" element={<Notfound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
    </div> </>
  );
};

export default App;
