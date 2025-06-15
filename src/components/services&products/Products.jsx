import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import g5 from '../../assets/gallery-5.jpg';
import s2 from '../../assets/S3.jpg';
import s3 from '../../assets/gallery-1.jpg';
import s5 from '../../assets/kit.jpg';
import s6 from '../../assets/Rabbit.jpeg';
import s7 from '../../assets/rabbits.jpg';
import Imite from '../../assets/Imite.jpg';
import s8 from '../../assets/bleeding.jpg';
import s4 from '../../assets/bleeding7.jpg';
import s from '../../assets/WhatsApp Image 2025-05-28 at 08.54.48_0cb807a8.jpg';

const Products = () => {
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', message: '' });
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://umuhuza.store/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const { data } = await response.json();
        setProducts(data);
      } catch (error) {
        setProducts([
          { id: 1, name: 'Premium Breeding Rabbits', description: 'Healthy, pedigreed breeding stock.', image: s8, hoverImage: s4, category: 'Live Stock' },
          { id: 2, name: 'Rabbit Hutch Kit', description: 'Complete DIY hutch kit.', image: s2, hoverImage: s5, category: 'Equipment' },
          { id: 3, name: 'Organic Rabbit Pellets', description: 'Nutritionally balanced feed.', image: s3, hoverImage: s6, category: 'Feed' },
          { id: 4, name: 'Farming Starter Guide', description: 'Comprehensive manual.', image: Imite, hoverImage: s7, category: 'Resources' },
          { id: 5, name: 'Organic Fertilizer', description: 'High-quality organic fertilizer.', image: g5, hoverImage: s, category: 'Manure' }
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
        body: JSON.stringify({ ...formData, productName: selectedProduct.name, quantity })
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('products.title')}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">{t('products.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <div key={product.id} className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="relative h-[250px] sm:h-[350px]">
                <img src={product.image} alt={product.name} className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-500" />
                <img src={product.hoverImage} alt={`${product.name} alternate view`} className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="bg-white p-4">
                <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <button onClick={() => handleOrder(product)} className="w-full rounded-md bg-green-600 py-2 text-white mt-4">{t('products.contact')}</button>
              </div>
            </div>
          ))}
        </div>

        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 relative">
              <button onClick={resetOrder} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              {!ticket ? (
                <form onSubmit={handleSubmit}>
                  <h3 className="text-2xl font-bold text-white mb-4">Contact About {selectedProduct.name}</h3>

                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">{t('products.quantity')}</label>
                    <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600" />
                  </div>

                  <div className="space-y-3 mb-4">
                    <input type="text" required placeholder="Full Name *" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600" />
                    <input type="email" required placeholder="Email *" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600" />
                  </div>

                  <button type="submit" className="w-full py-2 bg-pink-600 text-white rounded hover:bg-pink-700" disabled={isLoading}>
                    {isLoading ? t('products.submitting') : t('products.submit')}
                  </button>
                </form>
              ) : (
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">{t('products.submitted')}</h3>
                  <p className="text-gray-300 text-sm">{t('products.reference')}: {ticket.reference}</p>
                  <button onClick={resetOrder} className="w-full py-2 bg-pink-600 text-white rounded hover:bg-pink-700">{t('products.close')}</button>
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
