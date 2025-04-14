import React from 'react';

const Services = () => {
  const services = [
    {
      id: 1,
      title: 'Breeding Consultation',
      description: 'Expert advice on rabbit breeding techniques, genetic selection, and breeding schedules.',
      icon: '🐇'
    },
    {
      id: 2,
      title: 'Hutch Design',
      description: 'Custom rabbit hutch designs for optimal space, ventilation, and easy maintenance.',
      icon: '🏠'
    },
    {
      id: 3,
      title: 'Nutrition Planning',
      description: 'Tailored feeding programs for different rabbit breeds and growth stages.',
      icon: '🥕'
    },
    {
      id: 4,
      title: 'Health Management',
      description: 'Preventive care and treatment plans to keep your rabbits healthy and productive.',
      icon: '💉'
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Our Rabbit Farming Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Comprehensive services to help you establish and maintain a successful rabbit farming operation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-100"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-black mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;