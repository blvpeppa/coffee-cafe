import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer.jsx";
import Contact from "./components/Contact/Contact.jsx";
import SP from "./components/services&products/SP.jsx";
import AOS from "aos";
import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import Tour from "./components/Tour/Tour.jsx";
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
      <Navbar />
     
   
    <BrowserRouter >
<Routes>
  <Route path='/' element={<Home />} />
  <Route path='/About' element={<About />} />
  <Route path='/Contact' element={<Contact />} />
  <Route path='/Products' element={<SP />} />
  <Route path='/Tour' element={<Tour />} />
</Routes>
    </BrowserRouter>
    <Footer />
    </div> </>
  );
};

export default App;
