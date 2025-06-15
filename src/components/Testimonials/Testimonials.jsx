import React from "react";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import t from '../../assets/t.jpg';
import tt from '../../assets/tt.jpg';
import ttt from '../../assets/ttt.jpg';

const Testimonials = () => {
  const { t: translate } = useTranslation();

  const TestimonialData = [
    {
      id: 1,
      name: translate("testimonials.1.name"),
      text: translate("testimonials.1.text"),
      img: tt,
    },
    {
      id: 2,
      name: translate("testimonials.2.name"),
      text: translate("testimonials.2.text"),
      img: t,
    },
    {
      id: 3,
      name: translate("testimonials.3.name"),
      text: translate("testimonials.3.text"),
      img: "https://picsum.photos/104/104",
    },
    {
      id: 4,
      name: translate("testimonials.4.name"),
      text: translate("testimonials.4.text"),
      img: ttt,
    },
  ];

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      { breakpoint: 10000, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="py-10 mb-10">
      <div className="container">
        {/* header section */}
        <div className="mb-10">
          <h1 data-aos="fade-up" className="text-center text-4xl font-bold font-cursive">
            {translate("testimonials.title")}
          </h1>
        </div>

        {/* Testimonial cards */}
        <div data-aos="zoom-in">
          <Slider {...settings}>
            {TestimonialData.map((data) => (
              <div key={data.id} className="my-6">
                <div className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl bg-primary/10 relative">
                  <div className="mb-4">
                    <img src={data.img} alt="testimonial" className="rounded-full w-20 h-20" />
                  </div>
                  <div className="flex flex-col items-center gap-4">
                    <div className="space-y-3">
                      <p className="text-xs text-gray-500">{data.text}</p>
                      <h1 className="text-xl font-bold text-black/80 font-cursive2">
                        {data.name}
                      </h1>
                    </div>
                  </div>
                  <p className="text-black/20 text-9xl font-serif absolute top-0 right-0">,,</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
