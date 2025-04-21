import React, { useState } from 'react'
import t1 from '../../assets/pricing-1.jpg';
import t2 from '../../assets/pricing-2.jpg';
import t3 from '../../assets/pricing-3.jpg';
import { Link } from "react-router-dom";
const pricingOptions = [
  {
    title: 'Professional Visit',
    price: '$20',
    image: `${t1}`,
  },
  {
    title: 'Academic Visit',
    price: '$400 / 1-30 people',
    image: `${t2}`,
  },
  {
    title: 'Institutional Visit',
    price: 'Free',
    image: `${t3}`,
  }
];

const Training_home = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [message, setMessage] = useState('');

  const handleApply = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:7000/api/apply", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, selectedOption, tour_id: 1 }),      
      });

      const data = await res.json();
      setMessage(data.message);
      setFormData({ name: '', email: '' });
      setSelectedOption(null);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong.");
    }
  };

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
                <button
                  className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded"
                  onClick={() => handleApply(item.title)}
                >
                  APPLY
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedOption && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-lg w-full max-w-md relative">
              <h3 className="text-2xl font-semibold mb-4">Apply for {selectedOption}</h3>
              <input
                type="text"
                required
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
              />
              <input
                type="email"
                required
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full mb-4 p-2 border rounded"
              />
              <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded w-full">
                Submit
              </button>
              <button
                onClick={() => setSelectedOption(null)}
                type="button"
                className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
              >
                &times;
              </button>
              {message && <p className="mt-4 text-green-600">{message}</p>}
            </form>
          </div>
        )}
      </div>
             {/* More Gallery Button */}
       <div className="w-full md:w-1/3 px-4 text-center"></div>
                  <div className="w-full md:w-1/3 px-4 text-center">
                    <div className="text-center p-6">
                    <Link to="/tour" className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded inline-block text-center">
                        more visits <span className="ml-2">&rarr;</span>
                      </Link>
                    </div>
                  </div>
    </section>
  );
};
export default Training_home;