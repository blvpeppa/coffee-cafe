import React from 'react';

const Products = () => {
  const products = [
    {
      id: 1,
      name: 'Premium Breeding Rabbits',
      description: 'Healthy, pedigreed breeding stock of New Zealand White and California breeds.',
      price: '$75',
      image: 'https://images.unsplash.com/photo-1585969646097-a1b0038c37a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
      category: 'Live Stock'
    },
    {
      id: 2,
      name: 'Rabbit Hutch Kit',
      description: 'Complete DIY hutch kit with all materials and instructions for easy assembly.',
      price: '$299',
      image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
      category: 'Equipment'
    },
    {
      id: 3,
      name: 'Organic Rabbit Pillets',
      description: 'Nutritionally balanced feed for optimal growth and reproduction.',
      price: '$25/bag',
      image: 'https://images.unsplash.com/photo-1607623488994-03c6c4b51a4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
      category: 'Feed'
    },
    {
      id: 4,
      name: 'Farming Starter Guide',
      description: 'Comprehensive manual covering all aspects of commercial rabbit farming.',
      price: '$39',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
      category: 'Resources'
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Rabbit Farming Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to start or expand your rabbit farming business.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-green-600 bg-green-100 rounded-full mb-2">
                  {product.category}
                </span>
                <h3 className="text-xl font-semibold text-black mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-black">{product.price}</span>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;