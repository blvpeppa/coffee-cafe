import React from "react";
import HeroPng from "../../assets/coffee2.png";
import BgImage from "../../assets/bg_1.jpg";

const Menu = [
  {
    id: 2,
    name: "Services & Products",
    link: "/#services",
  },
  {
    id: 3,
    name: "About",
    link: "/#about",
  },
];

const Hero = () => {
  return (
    <>
      <div
        className="relative w-full bg-cover bg-no-repeat bg-center lg:h-screen flex items-center justify-center"
        style={{ backgroundImage: `url(${BgImage})` }}
      >
        {/* Transparent overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

        {/* Content goes here */}
        <section className="relative z-20 w-full">
          <div className="mx-auto w-screen max-w-screen-xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <div className="max-w-prose text-left">
              <h1 className="text-4xl font-bold text-white sm:text-5xl">
                RABBIT<span className="text-green-600">GENETIC</span> CENTER
              </h1>
              <div className="mt-4 flex gap-4 sm:mt-6">
                <a
                  className="inline-flex items-center gap-2 rounded-sm border border-white px-8 py-3 text-white hover:bg-indigo-50 hover:text-green-700 focus:ring-3 focus:outline-hidden"
                  href="#"
                >
                  <span className="text-sm font-medium">Learn More</span>
                  <svg
                    className="size-5 shadow-sm rtl:rotate-180"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Hero;
