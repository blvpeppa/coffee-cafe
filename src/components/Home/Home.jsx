import React from "react";
import Hero from "../Hero/Hero";
import Services from "../Services/Services";
import Banner from "../Banner/Banner";
import Testimonials from "../Testimonials/Testimonials";
const Home = () => { 
    return (
    <>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-x-hidden">
        <Hero />
        <Services />
        <Banner />
        <Testimonials />
      </div>
      </>
    );
  };
  
  export default Home;
  
