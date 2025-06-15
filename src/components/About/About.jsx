import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import { 
  MdHealthAndSafety, 
  MdSupportAgent, 
  MdEmergency 
} from "react-icons/md";
import { GiRabbit } from "react-icons/gi";

// Import your images
import BgImage from "../../assets/bg_4.jpg";
import CEOImage from "../../assets/CEO.jpg";
import AboutMain from "../../assets/about.jpg";
import AboutImg2 from "../../assets/about-2.jpg";
import AboutImg3 from "../../assets/about-3.jpg";
import BannerImg from "../../assets/about-1.jpg"; 
import Video from "../../assets/sample-video.mp4";

const About = () => {
  const { t } = useTranslation();
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const toggleNewsModal = () => setShowNewsModal(!showNewsModal);
  const toggleVideoModal = () => setShowVideoModal(!showVideoModal);

  const bgImageStyle = { 
    backgroundColor: "white",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100%",
    width: "100%",
  };

  return (
    <>
      <Helmet>
        <title>{t('about.meta.title')}</title>
        <meta name="description" content={t('about.meta.description')} />
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
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
        <div className="relative z-20 text-center px-4 max-w-3xl text-white animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
            {t('about.hero.title')} <span className="text-green-400">KRC</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-100 mt-2 drop-shadow-md">
            {t('about.hero.subtitle')}
          </p>
          <div className="mt-6">
            <Link 
              to="/products" 
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md text-lg font-medium transition duration-300"
            >
              {t('about.hero.button')}
            </Link>
          </div>
        </div>
      </div>

      {/* CEO Section */}
      <section className="py-10 overflow-hidden bg-gray-50">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative order-last md:order-first">
              <div className="relative w-full max-w-md mx-auto">
                <div className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
                  <img 
                    src={CEOImage} 
                    alt={t('about.ceo.name')} 
                    className="w-full h-100 object-cover" 
                  />
                  <div className="p-4 text-center">
                    <h1 className="text-xl font-bold text-gray-900">
                      {t('about.ceo.name')}
                    </h1>
                    <h2 className="text-green-600 font-semibold text-md">
                      {t('about.ceo.title')}
                    </h2>
                    <h4 className="text-green-700 font-medium text-sm">
                      {t('about.ceo.subtitle')}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
                KIGALI RABBIT FARM
              </h2>
              
              <div className="space-y-4 mt-4 text-gray-600">
                <p>
                  {t('about.ceo.intro')}
                </p>
                
                <p>
                  {t('about.ceo.mission')}{" "}
                  <span className="font-semibold text-green-700">
                    {t('about.ceo.highlight')}
                  </span>.
                </p>
                
                <p>
                  {t('about.ceo.ai')}{" "}
                  <span className="font-semibold text-green-700">
                    {t('about.ceo.ai_highlight')}
                  </span>{" "}
                  {t('about.ceo.rest')}
                </p>
              </div>

              <p className="mt-6 text-gray-600">
                <span className="font-medium">{t('about.ceo.contact')}</span>{" "}
                <a href="mailto:info@kigalirabbit.com" className="text-green-600 hover:underline">
                  info@kigalirabbit.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Farming Info Section */}
      <section className="relative flex items-center justify-center min-h-screen">
        <div className="absolute inset-0 bg-black/50">
          <img 
            src="https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308" 
            alt={t('about.farming.title')} 
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="container relative mx-auto px-4 py-20 text-white max-w-4xl space-y-6">
          <div className="bg-green-800/90 backdrop-blur-sm p-8 rounded-lg">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              {t('about.farming.title')}
            </h2>
            <h3 className="text-2xl md:text-3xl font-semibold text-green-200 mb-6">
              {t('about.farming.subtitle')}
            </h3>
            
            <div className="space-y-4 text-lg">
              <p>{t('about.farming.content1')}</p>
              <p>{t('about.farming.content2')}</p>
              <p>{t('about.farming.content3')}</p>
              <p className="font-medium text-green-100">
                {t('about.farming.highlight')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="min-h-screen bg-black py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Outgrowers Card */}
            <div className="flex flex-col rounded-xl border border-gray-800 p-6 hover:border-gray-600 transition-colors">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-900 mb-4">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-500">
                  <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
              <h3 className="text-4xl font-bold text-green-500 mb-2">128</h3>
              <p className="text-gray-400 text-sm sm:text-base">
                {t('about.stats.outgrowers')}
              </p>
            </div>

            {/* Veterinarians Card */}
            <div className="flex flex-col rounded-xl border border-gray-800 p-6 hover:border-gray-600 transition-colors">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-900 mb-4">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-500">
                  <path d="M14 16H9M12 7V5M12 21V19M9 9H5M19 9H15M17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V5C19 3.89543 18.1046 3 17 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
              <h3 className="text-4xl font-bold text-green-500 mb-2">16</h3>
              <p className="text-gray-400 text-sm sm:text-base">
                {t('about.stats.vets')}
              </p>
            </div>

            {/* Farm Workers Card */}
            <div className="flex flex-col rounded-xl border border-gray-800 p-6 hover:border-gray-600 transition-colors">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-900 mb-4">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-500">
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"></path>
                  <path d="M2 12.88V11.12C2 10.08 2.85 9.22 3.9 9.22C5.71 9.22 6.45 7.94 5.54 6.37C5.02 5.47 5.33 4.3 6.24 3.78L7.97 2.79C8.76 2.32 9.78 2.6 10.25 3.39L10.36 3.58C11.26 5.15 12.74 5.15 13.65 3.58L13.76 3.39C14.23 2.6 15.25 2.32 16.04 2.79L17.77 3.78C18.68 4.3 18.99 5.47 18.47 6.37C17.56 7.94 18.3 9.22 20.11 9.22C21.15 9.22 22.01 10.07 22.01 11.12V12.88C22.01 13.92 21.16 14.78 20.11 14.78C18.3 14.78 17.56 16.06 18.47 17.63C18.99 18.54 18.68 19.7 17.77 20.22L16.04 21.21C15.25 21.68 14.23 21.4 13.76 20.61L13.65 20.42C12.75 18.85 11.27 18.85 10.36 20.42L10.25 20.61C9.78 21.4 8.76 21.68 7.97 21.21L6.24 20.22C5.33 19.7 5.02 18.53 5.54 17.63C6.45 16.06 5.71 14.78 3.9 14.78C2.85 14.78 2 13.92 2 12.88Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"></path>
                </svg>
              </div>
              <h3 className="text-4xl font-bold text-green-500 mb-2">34</h3>
              <p className="text-gray-400 text-sm sm:text-base">
                {t('about.stats.workers')}
              </p>
            </div>

            {/* Limited Tours Card */}
            <div className="flex flex-col rounded-xl border border-gray-800 p-6 hover:border-gray-600 transition-colors">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-900 mb-4">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-500">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>
              <h3 className="text-4xl font-bold text-green-500 mb-2">10</h3>
              <p className="text-gray-400 text-sm sm:text-base">
                {t('about.stats.tours')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <span id="about"></span>
      <div style={bgImageStyle}>
        <div className="min-h-[550px] flex justify-center items-center py-12 sm:py-0">
          <div className="container">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div data-aos="zoom-in">
                <img
                  src={BannerImg}
                  alt={t('about.why.title')}
                  className="max-w-[430px] w-full mx-auto rounded-lg"
                />
              </div>
      
              <div className="flex flex-col justify-center gap-6 sm:pt-0">
                <h1 className="text-3xl sm:text-4xl font-bold font-sans">
                  {t('about.why.title')}
                </h1>
                <p className="text-sm text-gray-700 tracking-wide leading-5">
                  {t('about.why.content')}
                </p>
      
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-5">
                    <div className="flex items-center gap-3 text-gray-700">
                      <MdHealthAndSafety className="text-3xl h-12 w-12 shadow-sm p-3 rounded-full bg-green-100 text-green-700" />
                      <span>{t('about.why.services.care')}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <MdSupportAgent className="text-3xl h-12 w-12 shadow-sm p-3 rounded-full bg-blue-100 text-blue-700" />
                      <span>{t('about.why.services.support')}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <MdEmergency className="text-3xl h-12 w-12 shadow-sm p-3 rounded-full bg-red-100 text-red-700" />
                      <span>{t('about.why.services.emergency')}</span>
                    </div>
                  </div>
      
                  <div className="border-l-4 border-primary/50 pl-6 space-y-2 text-white">
                    <h1 className="text-2xl font-semibold font-cursive2 text-black">
                      {t('about.why.services.vet.title')}{" "}
                      <GiRabbit className="text-4xl text-green-600 inline" />
                    </h1>
                    <p className="text-sm text-gray-700">
                      {t('about.why.services.vet.content')}
                    </p>
                    <div className="mt-6 flex justify-center sm:justify-start gap-4">
                      <button
                        onClick={toggleNewsModal}
                        className="inline-flex items-center gap-2 border border-blue-700 px-6 py-2 sm:px-8 sm:py-3 rounded-sm text-sm sm:text-base text-blue-700 hover:bg-blue-700 hover:text-white transition duration-300"
                      >
                        {t('about.why.news_button')}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video & FAQ Section */}
      <section className="bg-green-50 py-16">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-start">
          <div className="flex flex-col space-y-6 order-2 lg:order-1">
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

          <div className="order-1 lg:order-2">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2">
                {t('about.faq.title')}
              </h2>
              <p className="text-gray-600">
                {t('about.faq.subtitle')}
              </p>
            </div>

            {t('about.faq.items', { returnObjects: true }).map((item, index) => (
              <details key={index} className="mb-4 bg-white shadow-md rounded-md">
                <summary className="cursor-pointer px-6 py-4 font-semibold text-lg text-green-700">
                  {item.question}
                </summary>
                <div className="px-6 py-4 text-gray-700">
                  {Array.isArray(item.answer) ? (
                    <ul className="list-disc ml-6 space-y-1">
                      {item.answer.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm leading-relaxed">{item.answer}</p>
                  )}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* News Modal */}
      {showNewsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                  {t('about.modals.news.title')}
                </h2>
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
                {t('about.modals.news.items', { returnObjects: true }).map((item, index) => (
                  <div key={index} className="border-b pb-4">
                    <h3 className="text-xl font-semibold text-green-700">{item.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{item.date}</p>
                    <p className="text-gray-700 mt-2">{item.content}</p>
                  </div>
                ))}

                <div className="pt-4">
                  <button
                    onClick={toggleNewsModal}
                    className="w-full bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded transition-colors duration-300"
                  >
                    {t('about.modals.close')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl">
            <button 
              onClick={toggleVideoModal}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 text-3xl"
              aria-label={t('about.modals.close')}
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
                {t('about.modals.video.not_supported')}
              </video>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default About;