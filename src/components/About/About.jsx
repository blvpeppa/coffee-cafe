import React from "react";
import BgImage from "../../assets/bg_4.jpg";
import CEOImage from "../../assets/CEO.jpg";
import About1 from "../../assets/about-1.jpg";
import Banner from "../Banner/Banner";
const About = () => {
  return (
    <>
      <div
            className="relative w-full bg-cover bg-no-repeat bg-center min-h-[300px] sm:min-h-[100px] md:min-h-[100px] lg:h-screen flex items-center justify-center"
            style={{ backgroundImage: `url(${BgImage})` }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-700 bg-opacity-50 z-10"></div>
      
            {/* Hero Content */}
            <section className="relative z-20 w-full">
              <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                <div className="max-w-xl mx-auto sm:mx-0 py-16 sm:py-24 lg:py-32">
                  <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
                    KNOW MORE ABOUT <span className="text-green-500">KRC</span>
                  </h1>
                </div>
              </div>
            </section>
          </div>

      {/* CEO Card and Company Overview */}
      <section className="py-10">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10">
          <div className="flex justify-center">
            <div className="w-80 bg-white shadow-lg rounded-md overflow-hidden">
              <img src={CEOImage} alt="CEO" className="w-full object-cover" />
              <div className="p-4 text-center">
                <h2 className="text-2xl font-semibold">Dieudonne Musoni</h2>
                <h4 className="text-green-700 font-semibold text-sm">CEO of Kigali Rabbit Center</h4>
                <p className="text-gray-600 mt-2">I am a rabbit farmer.</p>
              </div>
            </div>
          </div>

          <div className="text-gray-700 space-y-4">
            <h2 className="text-2xl font-bold">KIGALI RABBIT FARM</h2>
            <p>
              is a limited liability company incorporated in Rwanda under the Companies Act (NO 17/2018 of 13/04/2018) Laws of Rwanda.
            </p>
            <p>
              It was set up in 2018 primarily as a sustainable farming breeding, trainer, and consultancy firm. And now it became a{" "}
              <span className="text-green-600 font-semibold">RABBIT GENETIC CENTER</span>.
            </p>
            <p>
              We are the first company to{" "}
              <span className="text-green-600 font-semibold">introduce Rabbit Artificial Insemination</span> system in EAC.
              It was geared towards encouraging farmers to set up and put in place sustainable projects in various corners in Rwanda and in Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Rabbit Farming Info */}
      <section className="bg-gray-100 py-10">
        <div className="container mx-auto px-4 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">RABBIT FARMING</h2>
          <h3 className="text-xl font-semibold text-gray-700">A Sustainable and Profitable Venture</h3>
          <p className="text-gray-600">
            Rabbit farming is a lucrative and sustainable agricultural practice that has gained popularity in recent years. At KIGALI RABBIT CENTER, we are dedicated to promoting and supporting rabbit farming as a viable business opportunity for farmers in Rwanda and across Africa.
          </p>
          <p className="text-gray-600">
            Rabbits are known for their high reproductive rate, efficient feed conversion, and ability to thrive in various environments.
            This makes them ideal livestock for small-scale farmers looking to increase income.
            Additionally, rabbit meat is lean, high in protein, and in demand in the market.
          </p>
          <p className="text-gray-600">
            Our team at KIGALI RABBIT CENTER offers training and consultancy to help farmers with breeding, feeding, disease management, and marketing.
          </p>
          <p className="text-gray-600">
            Join us at KIGALI RABBIT CENTER and embark on a journey toward a more sustainable and profitable future in agriculture through rabbit farming.
          </p>
        </div>
      </section>
      <Banner />
      </>
  );
};

export default About;
