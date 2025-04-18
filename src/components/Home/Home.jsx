import React from "react";
import Hero from "../Hero/Hero";
import Services from "../Services/Services";
import Banner from "../Banner/Banner";
import Testimonials from "../Testimonials/Testimonials";
import Gallery from "../Gallery/Gallery"
import Training_home from "../Training_home/Training_home";
const Home = () => { 
    return (
    <>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-x-hidden">
        <Hero />
        <Services />
        <Banner />
        <Training_home />
        <Gallery />
        <Testimonials />
      </div>
      </>
    );
  };
  
  export default Home;
  
