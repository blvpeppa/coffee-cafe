import React from 'react';
import s2 from '../../assets/S3.jpg'; // manue product image
import s3 from '../../assets/gallery-1.jpg'; // manue product image
import s5 from '../../assets/kit.jpg';
import s6 from '../../assets/Rabbit.jpeg';
import s7 from '../../assets/rabbits.jpg';
const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Breeding Consultation',
      description: 'Expert advice on rabbit breeding techniques, genetic selection, and breeding schedules.',
      icon: '🐇',
      image: 'https://images.unsplash.com/photo-1585969646097-a1b0038c37a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=772&q=80',
      hoverImage: s7
    },
    {
      id: 2,
      title: 'Hutch Design',
      description: 'Custom rabbit hutch designs for optimal space, ventilation, and easy maintenance.',
      icon: '🏠',
      image: s2,
      hoverImage: s5
    },
    {
      id: 3,
      title: 'Nutrition Planning',
      description: 'Tailored feeding programs for different rabbit breeds and growth stages.',
      icon: '🥕',
      image: s3,
      hoverImage: s6
    },
    {
      id: 4,
      title: 'Health Management',
      description: 'Preventive care and treatment plans to keep your rabbits healthy and productive.',
      icon: '💉',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=772&q=80',
      hoverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=772&q=80'
    }
  ];

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block mb-4 px-4 py-1 text-sm font-semibold text-pink-500 uppercase tracking-widest">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Premium Rabbit Farming Solutions
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Comprehensive services from breeding to market-ready rabbits, delivered by industry experts.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group relative block h-96 overflow-hidden rounded-lg shadow-xl"
            >
              {/* Enhanced Image Hover Effect */}
              <div className="absolute inset-0 h-full w-full">
                <img
                  alt={service.title}
                  src={service.image}
                  className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-500"
                />
                <img
                  alt={`${service.title} alternate view`}
                  src={service.hoverImage}
                  className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>

              <div className="relative p-6 h-full flex flex-col bg-gradient-to-t from-black/70 via-black/40 to-transparent">
                <div className="mb-4">
                  <span className="text-sm font-medium tracking-widest text-pink-500 uppercase">
                    {service.icon} {service.title.split(' ')[0]}
                  </span>
                  <p className="text-xl font-bold text-white sm:text-2xl">
                    {service.title.split(' ').slice(1).join(' ')}
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="translate-y-8 transform opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-sm text-white">
                      {service.description}
                    </p>
                    <button className="mt-4 inline-flex items-center px-4 py-2 bg-pink-600 text-white text-sm font-medium rounded hover:bg-pink-700 transition-colors">
                      Learn More
                      <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;