import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import pricing5 from "../../assets/government.jpg";
import g17 from '../../assets/G3.jpg';
import g20 from '../../assets/G6.jpg';

const Training_home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleMoreVisitsClick = () => {
    navigate('/tour');
    window.scrollTo(0, 0);
  };

  const pricingOptions = [
    {
      id: 1,
      title: t("visit_professional_title"),
      description: t("visit_professional_description"),
      image: g20,
    },
    {
      id: 2,
      title: t("visit_academic_title"),
      description: t("visit_academic_description"),
      image: g17,
    },
    {
      id: 3,
      title: t("visit_institutional_title"),
      description: t("visit_institutional_description"),
      image: pricing5,
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">{t("visit_title")}</h2>
          <p className="text-gray-600 mt-2">{t("visit_paragraph")}</p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {pricingOptions.map((option) => (
            <div key={option.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div 
                className="h-80 bg-cover bg-center" 
                style={{ backgroundImage: `url(${option.image})` }}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* More Tours Button */}
        <div className="text-center mt-12">
          <button 
            onClick={handleMoreVisitsClick}
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded inline-flex items-center"
          >
            {t("visit_apply_button")} <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Training_home;
