import React from "react";
import BannerImg from "../../assets/about-1.jpg"; 
import { MdHealthAndSafety, MdSupportAgent, MdEmergency } from "react-icons/md";
import { GiRabbit } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const bgImage = {
  backgroundColor: "white",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100%",
  width: "100%",
};

const Banner = () => {
  const { t } = useTranslation();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
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
                <h1 data-aos="fade-up" className="text-3xl sm:text-4xl font-bold font-sans">
                  {t("why_choose")}
                </h1>
                <p data-aos="fade-up" className="text-sm text-gray-700 tracking-wide leading-5">
                  {t("banner_paragraph")}
                </p>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-5">
                    <div data-aos="fade-up" className="flex items-center gap-3 text-gray-700">
                      <MdHealthAndSafety className="text-3xl h-12 w-12 shadow-sm p-3 rounded-full bg-green-100 text-green-700" />
                      <span>{t("care_advices")}</span>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="300" className="flex items-center gap-3 text-gray-700">
                      <MdSupportAgent className="text-3xl h-12 w-12 shadow-sm p-3 rounded-full bg-blue-100 text-blue-700" />
                      <span>{t("customer_supports")}</span>
                    </div>
                    <div data-aos="fade-up" data-aos-delay="500" className="flex items-center gap-3 text-gray-700">
                      <MdEmergency className="text-3xl h-12 w-12 shadow-sm p-3 rounded-full bg-red-100 text-red-700" />
                      <span>{t("emergency_services")}</span>
                    </div>
                  </div>

                  <div data-aos="slide-left" className="border-l-4 border-primary/50 pl-6 space-y-2 text-white">
                    <h1 className="text-2xl font-semibold text-black">
                      {t("veterinary_help")} <GiRabbit className="text-4xl text-green-600 inline" />
                    </h1>
                    <p className="text-sm text-gray-700">
                      {t("veterinary_paragraph")}
                    </p>
                    <div className="mt-6 flex justify-center sm:justify-start">
                      <Link to="/about" onClick={scrollToTop} className="inline-flex items-center gap-2 border border-green-700 px-6 py-2 sm:px-8 sm:py-3 rounded-sm text-sm sm:text-base text-green-700 hover:bg-green-700 hover:text-white transition duration-300">
                        {t("more_about")}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
