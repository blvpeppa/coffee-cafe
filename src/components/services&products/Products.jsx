import React, { useState, useEffect } from 'react';
import g5 from '../../assets/gallery-5.jpg';
import s2 from '../../assets/S3.jpg';
import s3 from '../../assets/gallery-1.jpg';
import s4 from '../../assets/satyabratasm-u_kMWN-BWyU-unsplash.jpg';
import s5 from '../../assets/kit.jpg';
import s6 from '../../assets/Rabbit.jpeg';
import s7 from '../../assets/rabbits.jpg';
const Notification = ({ type = "info", message, onClose }) => {
  const colors = {
    success: "bg-green-100 text-green-700 border-green-400",
    error: "bg-red-100 text-red-700 border-red-400",
    info: "bg-blue-100 text-blue-700 border-blue-400",
  };

  return (
    <div className={`border px-4 py-3 rounded relative mb-4 ${colors[type]}`}>
      <strong className="font-bold capitalize">{type}:</strong>{" "}
      <span className="block sm:inline">{message}</span>
      <button
        onClick={onClose}
        className="absolute top-0 bottom-0 right-0 px-4 py-3"
      >
        <span className="text-2xl text-black">&times;</span>
      </button>
    </div>
  );
};
const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    address: '',
    message: ''
  });
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [ticket, setTicket] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://umuhuza.store/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const { data } = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products:", error);
        // Fallback to default products
        setProducts([
          {
            id: 1,
            name: 'Premium Breeding Rabbits',
            description: 'Healthy, pedigreed breeding stock of New Zealand White and California breeds.',
            image: 'https://images.unsplash.com/photo-1585969646097-a1b0038c37a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
            hoverImage: s7,
            category: 'Live Stock'
          },
          {
                id: 2,
                name: 'Rabbit Hutch Kit',
                description: 'Complete DIY hutch kit with all materials and instructions for easy assembly.',
                image: s2,
                hoverImage: s5,
                category: 'Equipment'
              },
              {
                id: 3,
                name: 'Organic Rabbit Pellets',
                description: 'Nutritionally balanced feed for optimal growth and reproduction.',
                image: s3,
                hoverImage: s6,
                category: 'Feed'
              },
              {
                id: 4,
                name: 'Farming Starter Guide',
                description: 'Comprehensive manual covering all aspects of commercial rabbit farming.',
                image: s4,
                hoverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
                category: 'Resources'
              },
              {
                id: 5,
                name: 'Organic Fertilizer',
                description: 'High-quality organic fertilizer for optimal plant growth.',
                image: g5,
                hoverImage: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
                category: 'Manure'
              }
        ]);
      } finally {
        setIsFetching(false);
      }
    };
    fetchProducts();
  }, []);

  const handleOrder = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setFormData({ name: '', email: '', phone: '', address: '', message: '' });
    setTicket(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert('Please provide at least your name and email');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://umuhuza.store/api/contact-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          productName: selectedProduct.name,
          quantity
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Request failed');

      setTicket(data.ticket);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit contact request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetOrder = () => {
    setSelectedProduct(null);
    setTicket(null);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Rabbit Farming Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Everything you need to start or expand your rabbit farming business.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <div key={product.id} className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="relative h-[250px] sm:h-[350px]">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-500"
                />
                <img 
                  src={product.hoverImage} 
                  alt={`${product.name} alternate view`}
                  className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>

              <div className="bg-white p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <button
                    onClick={() => handleOrder(product)}
                    className="w-full rounded-md bg-green-600 py-2 text-white transition-colors hover:bg-green-700"
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
              <button onClick={resetOrder} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {!ticket ? (
                <form onSubmit={handleSubmit}>
                  <h3 className="text-2xl font-bold text-white mb-4">Contact About {selectedProduct.name}</h3>
                  
                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
                    />
                  </div>
              
                  <div className="space-y-3 mb-4">
                    <input
                      type="text"
                      required
                      placeholder="Full Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email *"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
                    />
                    <textarea
                      placeholder="Address"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
                      rows="2"
                    />
                    <textarea
                      placeholder="Additional Message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
                      rows="3"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Submitting...' : 'Submit Request'}
                  </button>
                </form>
              ) : (
                <div>
                  <div className="text-center mb-4">
                    <div className="w-12 h-12 bg-green-900 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">Request Submitted!</h3>
                    <p className="text-gray-300 text-sm">Reference: {ticket.reference}</p>
                  </div>
                  
                  <div className="bg-gray-700 rounded p-3 mb-4">
                    <p className="text-white font-medium">{selectedProduct.name}</p>
                    <p className="text-gray-300">We'll contact you at {ticket.email}</p>
                  </div>
              
                  <button
                    onClick={resetOrder}
                    className="w-full py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
                  >
                    Close
                  </button>
                </div>
                )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;