import React from "react";
import { useTranslation } from 'react-i18next';

const Services = () => {
  const { t } = useTranslation();

  const ServicesData = [
    {
      id: 1,
      icon: "flaticon-blind",
      name: t("service1_title"),
      description: t("service1_description"),
      aosDelay: "100",
    },
    {
      id: 2,
      icon: "flaticon-dog-eating",
      name: t("service2_title"),
      description: t("service2_description"),
      aosDelay: "300",
    },
    {
      id: 3,
      icon: "flaticon-grooming",
      name: t("service3_title"),
      description: t("service3_description"),
      aosDelay: "500",
    },
  ];

  return (
    <>
      <span id="services"></span>
      <div className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          {/* Heading section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-green-800">
              {t("services_title")}
            </h1>
            <p className="text-gray-600 mt-2">
              {t("services_paragraph")}
            </p>
          </div>

          {/* Services Card section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {ServicesData.map((service) => (
              <div
                key={service.id}
                data-aos="fade-up"
                data-aos-delay={service.aosDelay}
                className="bg-white shadow-lg p-6 rounded-xl text-center transition-transform transform hover:-translate-y-2"
              >
                <div className="text-green-700 text-5xl mb-4">
                  <span className={service.icon}></span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-green-800">
                  {service.name}
                </h3>
                <p className="text-gray-700 text-sm mb-4">
                  {service.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center justify-center w-8 h-8 bg-green-700 text-white rounded-full hover:bg-green-800 transition"
                >
                  <span className="fa fa-chevron-right" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
