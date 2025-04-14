import react from 'react'
import pricing from "../../assets/pricing-1.jpg";
import pricing2 from "../../assets/pricing-2.jpg";
import pricing3 from "../../assets/pricing-3.jpg";

const pricingOptions = [
    {
      title: 'Professional Visit',
      price: '$20',
      image: `${pricing}`,
    },
    {
      title: 'Academic Visit',
      price: '$400 / 1-30 people',
      image: `${pricing2}`,
    },
    {
      title: 'Institutional Visit',
      price: 'Free',
      image: `${pricing3}`,
    },
    {
      title: 'Group Visit',
      price: '$50 / 1-10',
      image: '/images/pricing-2.jpg',
    },
    {
      title: 'Kids Visit',
      price: 'Negotiable',
      image: '/images/pricing-3.jpg',
    },
  ];
  
  const PricingCards = () => {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Price Details</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingOptions.map((item, index) => (
              <div key={index} className="bg-white rounded shadow overflow-hidden hover:shadow-lg transition">
                <div className="h-80 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-lg text-green-700 font-bold mb-4">{item.price}</p>
                  <button className="bg-green-700 hover:bg-primary-dark text-white px-6 py-2 rounded">
                    APPLY
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default PricingCards;  