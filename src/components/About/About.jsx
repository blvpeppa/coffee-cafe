import React, { useState } from 'react';
import BgImage from "../../assets/bg_4.jpg";
import CEOImage from "../../assets/CEO.jpg";
import AboutMain from "../../assets/about.jpg";
import AboutImg2 from "../../assets/about-2.jpg";
import AboutImg3 from "../../assets/about-3.jpg";
import { Link } from "react-router-dom";
import BannerImg from "../../assets/about-1.jpg"; 
import { MdHealthAndSafety } from "react-icons/md";
import { MdSupportAgent } from "react-icons/md";
import { MdEmergency } from "react-icons/md";
import { GiRabbit } from "react-icons/gi";
import { Helmet } from 'react-helmet-async';
import Video from "../../assets/sample-video.mp4";
const bgImage = { 
  //backgroundImage: `url(${BgImg})`,
  backgroundColor: "white",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};
const About = () => {
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const toggleNewsModal = () => {
    setShowNewsModal(!showNewsModal);
  };
  const toggleVideoModal = () => {
    setShowVideoModal(!showVideoModal);
  };
  return (
    <>
    <Helmet>
        <title>About Kigali Rabbit Center | Sustainable Rabbit Farming in Rwanda</title>
        <meta name="description" content="Learn about Kigali Rabbit Center, Rwanda's pioneer in rabbit artificial insemination, sustainable farming, and rabbit breeding training." />
        <meta name="keywords" content="Rabbit farming Rwanda, Kigali Rabbit Center, rabbit breeding, sustainable agriculture, rabbit artificial insemination" />
        <link rel="canonical" href="https://yourdomain.com/about" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Kigali Rabbit Center",
            "url": "https://kigalirabbits.org",
            "logo": "https://kigalirabbits.org/logo.png",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Kigali",
              "addressCountry": "RW"
            },
            "description": "Rabbit farming tours and sales in Kigali, Rwanda"
          })}
        </script>
      </Helmet>
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
      <Link to="/products" className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md text-lg font-medium transition duration-300" >Explore Services</Link>
    </div>
  </div>
</div>

{/* CEO Section */}
      <section className="py-10">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10">
          <div className="flex justify-center">
            <div className="w-80 bg-white shadow-lg rounded-md overflow-hidden">
              <img src={CEOImage} alt="Dieudonne Musoni, CEO of Kigali Rabbit Center" className="w-full object-cover" />
              <div className="p-4 text-center">
                <h1 className="text-2xl font-semibold">Dieudonne Musoni</h1>
                <h2 className="text-green-700 font-semibold text-sm">
                  CEO of Kigali Rabbit Center
                </h2>
<h4 className="text-green-800 font-semibold text-sm">
                  Rabbit Expert
                </h4>
              </div>
            </div>
          </div>
          {}
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
              <h2 className="text-4xl font-bold text-green-600">128</h2>
              <p className="mt-2 text-gray-700">Outgrowers</p>
            </div>
            <div className="bg-gray-100 p-6 rounded shadow-md">
              <h2 className="text-4xl font-bold text-green-600">16</h2>
              <p className="mt-2 text-gray-700">Veterinarians</p>
            </div>
            <div className="bg-gray-100 p-6 rounded shadow-md">
              <h2 className="text-4xl font-bold text-green-600">34</h2>
              <p className="mt-2 text-gray-700">Farm Workers</p>
            </div>
            <div className="bg-gray-100 p-6 rounded shadow-md">
              <h2 className="text-4xl font-bold text-green-600">10</h2>
              <p className="mt-2 text-gray-700">Limited Tours/Day</p>
            </div>
          </div>
        </div>
      </section>
      {/* banner Section */}
       {/* Banner Section */}
       <span id="about"></span>
      <div style={bgImage}>
        <div className="min-h-[550px] flex justify-center items-center py-12 sm:py-0">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Image section */}
              <div data-aos="zoom-in">
                <img
                  src={BannerImg}
                  alt="kigali rabbit center"
                  className="max-w-[430px] w-full mx-auto rounded-lg"
                />
              </div>
      
              {/* Text content section */}
              <div className="flex flex-col justify-center gap-6 sm:pt-0">
                <h1
                  data-aos="fade-up"
                  className="text-3xl sm:text-4xl font-bold font-sans text"
                >
                  Why Choose Kigali Rabbit Center?
                </h1>
                <p
                  data-aos="fade-up"
                  className="text-sm text-gray-700 tracking-wide leading-5"
                >
                  We are the first company to introduce Rabbit Artificial
                  Insemination system in East African Community. Since 2018, we
                  have been a leading force in sustainable rabbit farming,
                  genetics, training, and innovation.
                </p>
      
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-5">
                    <div
                      data-aos="fade-up"
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <MdHealthAndSafety className="text-3xl h-12 w-12 shadow-sm p-3 rounded-full bg-green-100 text-green-700" />
                      <span>Care Advices</span>
                    </div>
                    <div
                      data-aos="fade-up"
                      data-aos-delay="300"
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <MdSupportAgent className="text-3xl h-12 w-12 shadow-sm p-3 rounded-full bg-blue-100 text-blue-700" />
                      <span>Customer Supports</span>
                    </div>
                    <div
                      data-aos="fade-up"
                      data-aos-delay="500"
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <MdEmergency className="text-3xl h-12 w-12 shadow-sm p-3 rounded-full bg-red-100 text-red-700" />
                      <span>Emergency Services</span>
                    </div>
                  </div>
      
                  <div
                    data-aos="slide-left"
                    className="border-l-4 border-primary/50 pl-6 space-y-2 text-white"
                  >
                    <h1 className="text-2xl font-semibold font-cursive2 text-black">
                      Veterinary <GiRabbit className="text-4xl text-green-600 inline" /> Help
                    </h1>
                    <p className="text-sm text-gray-700">
                      Our experienced team provides expert veterinary assistance
                      to ensure optimal health and breeding of rabbits using the
                      latest technologies.
                    </p>
                    <div className="mt-6 flex justify-center sm:justify-start gap-4">
                      <button
                        onClick={toggleNewsModal}
                        className="inline-flex items-center gap-2 border border-blue-700 px-6 py-2 sm:px-8 sm:py-3 rounded-sm text-sm sm:text-base text-blue-700 hover:bg-blue-700 hover:text-white transition duration-300"
                      >
                        Latest News
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* End text content */}
            </div>
          </div>
        </div>
      </div>
      {/* End banner section */}

      {/* News Modal */}
      {showNewsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Latest News & Updates</h2>
                <button 
                  onClick={toggleNewsModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                {/* News Item 1 */}
                <div className="border-b pb-4">
                  <h3 className="text-xl font-semibold text-green-700">New Rabbit Breeding Techniques</h3>
                  <p className="text-gray-600 text-sm mt-1">June 15, 2023</p>
                  <p className="text-gray-700 mt-2">
                    We've introduced innovative breeding techniques that increase success rates by 40%. 
                    Join our upcoming workshop to learn more.
                  </p>
                </div>

                {/* News Item 2 */}
                <div className="border-b pb-4">
                  <h3 className="text-xl font-semibold text-green-700">Farm Expansion Complete</h3>
                  <p className="text-gray-600 text-sm mt-1">May 28, 2023</p>
                  <p className="text-gray-700 mt-2">
                    Our new state-of-the-art facility is now open, doubling our capacity for 
                    rabbit production and research.
                  </p>
                </div>

                {/* News Item 3 */}
                <div className="border-b pb-4">
                  <h3 className="text-xl font-semibold text-green-700">AI Training Program</h3>
                  <p className="text-gray-600 text-sm mt-1">April 10, 2023</p>
                  <p className="text-gray-700 mt-2">
                    Registration is now open for our Artificial Insemination certification 
                    program starting next month.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    onClick={toggleNewsModal}
                    className="w-full bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded transition-colors duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
            {/* End banner section */}
      <section className="bg-green-50 py-16">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-start">
        
        {/* Video & Images */}
        <div className="flex flex-col space-y-6 order-2 lg:order-1">
          {/* Video Thumbnail Section */}
      <div
        className="relative bg-cover bg-center h-96 flex items-center justify-center rounded-md shadow-md"
        style={{ backgroundImage: `url(${AboutMain})` }}
      >
        <button
          onClick={toggleVideoModal}
          className="flex items-center justify-center w-16 h-16 bg-green-600 rounded-full text-white text-2xl hover:bg-green-700 transition"
          aria-label="Play video"
        >
          ▶
        </button>
      </div>

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <button 
              onClick={toggleVideoModal}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 text-3xl"
              aria-label="Close video"
            >
              &times;
            </button>
            
            <div className="aspect-w-16 aspect-h-9">
              <video 
                controls 
                autoPlay 
                className="w-full rounded-lg shadow-xl"
              >
                <source src={Video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
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
