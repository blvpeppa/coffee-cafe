import React from "react";
import Hero from "../Hero/Hero";
import Services from "../Services/Services";
import Banner from "../Banner/Banner";
import Testimonials from "../Testimonials/Testimonials";
import Gallery from "../Gallery_home/Gallery_home"
import Training_home from "../Training_home/Training_home";
import Tour_home from "../Training_home/Tour_home";
import { TranslationProvider } from '../../contexts/TranslationContext';
const Home = () => { 
    return (
    <>
    <TranslationProvider>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-x-hidden">
        <Hero />
        <Services />
        <Banner />
        <Training_home />
        <Tour_home />
        <Gallery />
        <Testimonials />
      </div></TranslationProvider>
      </>
    );
  };
  
  export default Home;
  
