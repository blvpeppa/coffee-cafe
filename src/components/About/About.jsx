import React from "react";
import BgImage from "../../assets/bg_4.jpg";
import CEOImage from "../../assets/CEO.jpg";
import Banner from "../Banner/Banner";

const About = () => {
  return (
    <>
      {/* Hero Section */}
      <div
  className="relative w-full bg-cover bg-center min-h-[70vh] lg:min-h-[90vh] flex items-center justify-center overflow-hidden"
  style={{ backgroundImage: `url(${BgImage})` }}
>
   {/* Overlay */}
   <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

  {/* Hero Text Content */}
  <div className="relative z-20 text-center px-4 max-w-3xl text-white animate-fade-in">
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
      Discover the Vision Behind <span className="text-green-400">KRC</span>
    </h1>
    <p className="mt-4 text-lg sm:text-xl text-gray-100 drop-shadow-md">
      Learn more about our mission, our team, and how we're transforming rabbit farming across Africa.
    </p>
    <div className="mt-6">
      <a
        href="http://localhost:5173/about/#about"
        className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md text-lg font-medium transition duration-300"
      >
        Explore Services
      </a>
    </div>
  </div>
</div>

{/* CEO Section */}
      <section className="py-10">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10">
          <div className="flex justify-center">
            <div className="w-80 bg-white shadow-lg rounded-md overflow-hidden">
              <img src={CEOImage} alt="CEO" className="w-full object-cover" />
              <div className="p-4 text-center">
                <h2 className="text-2xl font-semibold">Dieudonne Musoni</h2>
                <h4 className="text-green-700 font-semibold text-sm">
                  CEO of Kigali Rabbit Center
                </h4>
                <p className="text-gray-600 mt-2">I am a rabbit farmer.</p>
              </div>
            </div>
          </div>

          <div className="text-gray-700 space-y-4">
            <h2 className="text-2xl font-bold">KIGALI RABBIT FARM</h2>
            <p>
              is a limited liability company incorporated in Rwanda under the
              Companies Act (NO 17/2018 of 13/04/2018) Laws of Rwanda.
            </p>
            <p>
              It was set up in 2018 primarily as a sustainable farming breeding,
              trainer, and consultancy firm. And now it became a{" "}
              <span className="text-green-600 font-semibold">
                RABBIT GENETIC CENTER
              </span>
              .
            </p>
            <p>
              We are the first company to{" "}
              <span className="text-green-600 font-semibold">
                introduce Rabbit Artificial Insemination
              </span>{" "}
              system in EAC. It was geared towards encouraging farmers to set up
              and put in place sustainable projects in various corners in Rwanda
              and in Africa.
            </p>
          </div>
        </div>
      </section>

      {/* Farming Info */}
      <section className="bg-gray-100 py-10">
        <div className="container mx-auto px-4 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">RABBIT FARMING</h2>
          <h3 className="text-xl font-semibold text-gray-700">
            A Sustainable and Profitable Venture
          </h3>
          <p className="text-gray-600">
            Rabbit farming is a lucrative and sustainable agricultural practice
            that has gained popularity in recent years. At KIGALI RABBIT CENTER,
            we are dedicated to promoting and supporting rabbit farming as a
            viable business opportunity for farmers in Rwanda and across Africa.
          </p>
          <p className="text-gray-600">
            Rabbits are known for their high reproductive rate, efficient feed
            conversion, and ability to thrive in various environments. This makes
            them ideal livestock for small-scale farmers looking to increase
            income. Additionally, rabbit meat is lean, high in protein, and in
            demand in the market.
          </p>
          <p className="text-gray-600">
            Our team at KIGALI RABBIT CENTER offers training and consultancy to
            help farmers with breeding, feeding, disease management, and
            marketing.
          </p>
          <p className="text-gray-600">
            Join us at KIGALI RABBIT CENTER and embark on a journey toward a more
            sustainable and profitable future in agriculture through rabbit
            farming.
          </p>
        </div>
      </section>

      {/* Counter Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="bg-gray-100 p-6 rounded shadow-md">
              <h2 className="text-4xl font-bold text-green-600">20</h2>
              <p className="mt-2 text-gray-700">Branches</p>
            </div>
            <div className="bg-gray-100 p-6 rounded shadow-md">
              <h2 className="text-4xl font-bold text-green-600">15</h2>
              <p className="mt-2 text-gray-700">Veterinarians</p>
            </div>
            <div className="bg-gray-100 p-6 rounded shadow-md">
              <h2 className="text-4xl font-bold text-green-600">30</h2>
              <p className="mt-2 text-gray-700">Farm Workers</p>
            </div>
            <div className="bg-gray-100 p-6 rounded shadow-md">
              <h2 className="text-4xl font-bold text-green-600">6</h2>
              <p className="mt-2 text-gray-700">Limited Tours/Day</p>
            </div>
          </div>
        </div>
      </section>

      <Banner />
    </>
  );
};

export default About;
