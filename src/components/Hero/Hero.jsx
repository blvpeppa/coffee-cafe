import React, { useContext } from "react";
import { TranslationContext } from "../../contexts/TranslationContext";
import BgImage from "../../assets/bg_1.jpg";

const Hero = () => {
  const { t } = useContext(TranslationContext);

  return (
    <div
      className="relative w-full bg-cover bg-no-repeat bg-center min-h-[500px] sm:min-h-[600px] md:min-h-[300px] lg:h-screen flex items-center justify-center"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

      {/* Hero Content */}
      <section className="relative z-20 w-full">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="max-w-xl mx-auto sm:mx-0 py-16 sm:py-24 lg:py-32">
            <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
              {t.hero.titlePart1} <span className="text-green-600">{t.hero.titlePart2}</span>
            </h1>
            <p className="mt-4 text-base sm:text-lg text-gray-300">
              {t.hero.subtitle}
            </p>

            {/* CTA Button */}
            <div className="mt-6 flex justify-center sm:justify-start">
              <a
                href="/#services"
                className="inline-flex items-center gap-2 border border-white px-6 py-2 sm:px-8 sm:py-3 rounded-sm text-sm sm:text-base text-white hover:bg-white hover:text-green-700 transition duration-300"
              >
                {t.hero.cta}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;