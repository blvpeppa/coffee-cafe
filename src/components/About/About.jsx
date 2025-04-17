import React from "react";
import BgImage from "../../assets/bg_4.jpg";
import CEOImage from "../../assets/CEO.jpg";
import Banner from "../Banner/Banner";
import AboutMain from "../../assets/about.jpg";
import AboutImg2 from "../../assets/about-2.jpg";
import AboutImg3 from "../../assets/about-3.jpg";
import { Link, useLocation } from "react-router-dom";
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
      <Link to="/products" className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md text-lg font-medium transition duration-300" onClick={() => setIsOpen(false)} aria-label="Home">Explore Services</Link>
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
                <h1 className="text-2xl font-semibold">Dieudonne Musoni</h1>
                <h2 className="text-green-700 font-semibold text-sm">
                  CEO of Kigali Rabbit Center
                </h2>
                <h3 className="text-green-800 font-semibold text-sm">
                  Rabbit Center
                </h3><h4 className="text-green-800 font-semibold text-sm">
                  Rabbit Expert
                </h4>
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
      <section className="bg-green-50 py-10">
        <div className="container mx-auto px-4 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">RABBIT FARMING</h2>
          <h3 className="text-xl font-semibold text-gray-700">
            A Sustainable and Profitable Venture
          </h3>
          <p className="text-gray-800">
            Rabbit farming is a lucrative and sustainable agricultural practice
            that has gained popularity in recent years. At KIGALI RABBIT CENTER,
            we are dedicated to promoting and supporting rabbit farming as a
            viable business opportunity for farmers in Rwanda and across Africa.
          </p>
          <p className="text-gray-800">
            Rabbits are known for their high reproductive rate, efficient feed
            conversion, and ability to thrive in various environments. This makes
            them ideal livestock for small-scale farmers looking to increase
            income. Additionally, rabbit meat is lean, high in protein, and in
            demand in the market.
          </p>
          <p className="text-gray-800">
            Our team at KIGALI RABBIT CENTER offers training and consultancy to
            help farmers with breeding, feeding, disease management, and
            marketing.
          </p>
          <p className="text-gray-800">
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
              <p className="mt-2 text-gray-700">Outgrowers</p>
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
      <section className="bg-green-50 py-16">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-start">
        
        {/* Video & Images */}
        <div className="flex flex-col space-y-6 order-2 lg:order-1">
          <div
            className="relative bg-cover bg-center h-72 flex items-center justify-center rounded-md shadow-md"
            style={{ backgroundImage: `url(${AboutMain})` }}
          >
            <a
              href="/videos/sample-video.mp4"
              className="flex items-center justify-center w-16 h-16 bg-green-600 rounded-full text-white text-2xl hover:bg-green-700 transition"
            >
              ▶
            </a>
          </div>
          <div className="flex gap-4">
            <div
              className="w-1/2 h-60 bg-cover bg-center rounded-md shadow"
              style={{ backgroundImage: `url(${AboutImg2})` }}
            ></div>
            <div
              className="w-1/2 h-60 bg-cover bg-center rounded-md shadow"
              style={{ backgroundImage: `url(${AboutImg3})` }}
            ></div>
          </div>
        </div>

        {/* FAQs */}
        <div className="order-1 lg:order-2">
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2">Frequently Asked</h2>
            <p className="text-gray-600">Read the following to understand more about rabbit farming.</p>
          </div>

          {/* Accordion 1 */}
          <details className="mb-4 bg-white shadow-md rounded-md">
            <summary className="cursor-pointer px-6 py-4 font-semibold text-lg text-green-700">
              Why Rabbit farming?
            </summary>
            <div className="px-6 py-4 text-gray-700 space-y-4 text-sm leading-relaxed">
              <p>
                The domestic rabbit, *Oryctolagus cuniculus*, is a descendant of wild rabbits of southern Europe and North Africa...
              </p>
              <p>
                Rabbits are ideal small livestock for peri-urban or rural areas, especially in developing countries...
              </p>
              <p>
                Rabbits produce lean white meat high in protein, low in fat and cholesterol. Their skins are also used in garments and crafts...
              </p>
              <p>
                In 2020, world production of rabbit meat was estimated at 1.8 million tons annually. Top producers include Italy, France, China...
              </p>
            </div>
          </details>

          {/* Accordion 2 */}
          <details className="mb-4 bg-white shadow-md rounded-md">
            <summary className="cursor-pointer px-6 py-4 font-semibold text-lg text-green-700">
              Advantages of keeping rabbits:
            </summary>
            <div className="px-6 py-4 text-gray-700 text-sm leading-relaxed space-y-2">
              <ul className="list-disc ml-6 space-y-1">
                <li>Small body size</li>
                <li>Low cost for animals and housing</li>
                <li>Efficient reproduction and feed conversion</li>
                <li>Can give birth to 25+ offspring per year</li>
                <li>Short fattening period, market-ready in 8 weeks</li>
                <li>Highly nutritious meat, over 300 recipe variations</li>
                <li>Low land requirements and low upkeep costs</li>
              </ul>
            </div>
          </details>
        </div>
      </div>
    </section>
    </>
  );
};

export default About;
