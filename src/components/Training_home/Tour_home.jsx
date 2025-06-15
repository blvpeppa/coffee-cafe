import React, { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import l from "../../assets/pure-julia-uLoWIMCeodM-unsplash.jpg";
import g17 from '../../assets/G3.jpg';
import g7 from '../../assets/gallery-7.jpg';
import g20 from '../../assets/G6.jpg';

const Training = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleMoreTrainingClick = () => {
    navigate('/training');
    window.scrollTo(0, 0);
  };

  const trainingPrograms = [
    {
      id: 1,
      title: t("training_program_1_title"),
      description: t("training_program_1_description"),
      duration: "2 days",
      image: g20,
    },
    {
      id: 2,
      title: t("training_program_2_title"),
      description: t("training_program_2_description"),
      duration: "3 days",
      image: l,
    },
    {
      id: 3,
      title: t("training_program_3_title"),
      description: t("training_program_3_description"),
      duration: "2 days",
      image: g7,
    },
    {
      id: 4,
      title: t("training_program_4_title"),
      description: t("training_program_4_description"),
      duration: "3 days",
      image: g17,
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">{t("training_title")}</h2>
          <p className="text-gray-600 mt-2">{t("training_paragraph")}</p>
        </div>

        {/* Training Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {trainingPrograms.map((program) => (
            <div key={program.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div 
                className="h-48 bg-cover bg-center" 
                style={{ backgroundImage: `url(${program.image})` }}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{program.title}</h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* More Training Button */}
        <div className="text-center mt-12">
          <button 
            onClick={handleMoreTrainingClick}
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded inline-flex items-center"
          >
            {t("training_apply_button")} <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Training;
