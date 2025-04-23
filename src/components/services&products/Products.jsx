import React, { useState } from 'react';

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    address: '' 
  });
  const [paymentData, setPaymentData] = useState({ 
    cardNumber: '', 
    expiry: '', 
    cvv: '' 
  });
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Premium Breeding Rabbits',
      description: 'Healthy, pedigreed breeding stock of New Zealand White and California breeds.',
      price: 75,
      priceDisplay: '$75 each',
      image: 'https://images.unsplash.com/photo-1585969646097-a1b0038c37a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
      category: 'Live Stock'
    },
    {
      id: 2,
      name: 'Rabbit Hutch Kit',
      description: 'Complete DIY hutch kit with all materials and instructions for easy assembly.',
      price: 299,
      priceDisplay: '$299',
      image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
      category: 'Equipment'
    },
    {
      id: 3,
      name: 'Organic Rabbit Pellets',
      description: 'Nutritionally balanced feed for optimal growth and reproduction.',
      price: 25,
      priceDisplay: '$25/bag',
      image: 'https://images.unsplash.com/photo-1607623488994-03c6c4b51a4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
      category: 'Feed'
    },
    {
      id: 4,
      name: 'Farming Starter Guide',
      description: 'Comprehensive manual covering all aspects of commercial rabbit farming.',
      price: 39,
      priceDisplay: '$39',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
      category: 'Resources'
    }
  ];

  const handleOrder = (product) => {
    setSelectedProduct(product);
    setStep(1);
    setQuantity(1);
    setFormData({ name: '', email: '', phone: '', address: '' });
    setPaymentData({ cardNumber: '', expiry: '', cvv: '' });
    setMessage('');
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address) {
      setMessage('Please fill all required fields');
      return;
    }
    setStep(2);
    setMessage('');
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!paymentData.cardNumber || !paymentData.expiry || !paymentData.cvv) {
      setMessage('Please fill all payment details');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const receiptData = {
        id: `ORD-${Date.now()}`,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        customer: formData.name,
        email: formData.email,
        product: selectedProduct.name,
        quantity,
        unitPrice: selectedProduct.price,
        total: (selectedProduct.price * quantity).toFixed(2),
        image: selectedProduct.image,
        paymentMethod: 'Credit Card',
        status: 'Completed',
        shippingAddress: formData.address
      };

      localStorage.setItem('latestReceipt', JSON.stringify(receiptData));
      setStep(3);
      setMessage('Payment successful!');
    } catch (error) {
      console.error("Payment error:", error);
      setMessage("Payment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const downloadReceipt = () => {
    const receiptData = JSON.parse(localStorage.getItem('latestReceipt'));
    if (!receiptData) return;

    const receiptHtml = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Receipt - ${receiptData.id}</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .receipt-title { font-size: 24px; font-weight: bold; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="receipt-title">Rabbit Farm Co.</div>
          <div>Order Receipt</div>
        </div>
        <!-- Add the rest of your receipt HTML structure here -->
      </body>
      </html>`;

    const blob = new Blob([receiptHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt-${receiptData.id}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetOrder = () => {
    setSelectedProduct(null);
    setStep(1);
    setMessage('');
  };

  const calculateTotal = () => {
    if (!selectedProduct) return '0.00';
    return (selectedProduct.price * quantity).toFixed(2);
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
      <div 
        key={product.id} 
        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
      >
        <div className="relative pt-[70%] overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="absolute top-0 left-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-5 flex-grow flex flex-col">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full mb-3 self-start">
            {product.category}
          </span>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">
            {product.name}
          </h3>
          <p className="text-gray-600 mb-4 flex-grow">
            {product.description}
          </p>
          <div className="flex justify-between items-center mt-auto">
            <span className="text-lg font-bold text-gray-900">
              {product.priceDisplay}
            </span>
            <button 
              onClick={() => handleOrder(product)}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>

  {/* Order Modal - Fixed to show content properly */}
  {selectedProduct && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {step === 1 && (
          <form onSubmit={handleOrderSubmit} className="p-6">
            <h3 className="text-2xl font-semibold mb-4">Order {selectedProduct.name}</h3>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                required
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                placeholder="(123) 456-7890"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Shipping Address *</label>
              <textarea
                required
                placeholder="Street, City, State, ZIP Code"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows="3"
              />
            </div>
            
            <div className="mb-4 p-3 bg-gray-50 rounded">
              <p className="font-semibold">Order Summary</p>
              <div className="flex justify-between mt-2">
                <span>{selectedProduct.name} (x{quantity})</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={resetOrder}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex-grow"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex-grow"
              >
                Continue to Payment
              </button>
            </div>
            
            {message && <p className="mt-4 text-red-600 text-sm">{message}</p>}
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handlePaymentSubmit} className="p-6">
            <h3 className="text-2xl font-semibold mb-4">Payment Details</h3>
            
            <div className="mb-6 p-4 bg-gray-50 rounded">
              <p className="font-semibold mb-2">Order Summary</p>
              <p className="mb-1">{selectedProduct.name} (x{quantity})</p>
              <p className="text-lg font-bold">Total: ${calculateTotal()}</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Card Number *</label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={paymentData.cardNumber}
                onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">Expiry Date *</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={paymentData.expiry}
                  onChange={(e) => setPaymentData({ ...paymentData, expiry: e.target.value })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">CVV *</label>
                <input
                  type="text"
                  placeholder="123"
                  value={paymentData.cvv}
                  onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex-grow"
              >
                Back
              </button>
              <button 
                type="submit" 
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex-grow flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : 'Complete Payment'}
              </button>
            </div>
            
            {message && (
              <p className={`mt-4 text-sm ${message.includes('failed') ? 'text-red-600' : 'text-green-600'}`}>
                {message}
              </p>
            )}
          </form>
        )}

        {step === 3 && (
          <div className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Order Confirmed!</h3>
              <p className="text-gray-600">Thank you for your purchase.</p>
            </div>
            
            <div className="mb-6 p-4 bg-gray-50 rounded">
              <p className="font-semibold mb-2">Order #{`ORD-${Date.now()}`.slice(0, 10)}</p>
              <p className="mb-1">{selectedProduct.name} (x{quantity})</p>
              <p className="font-bold">Total: ${calculateTotal()}</p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={downloadReceipt}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Download Receipt
              </button>
              <button
                onClick={resetOrder}
                className="w-full px-4 py-2 bg-white text-gray-800 rounded-md border hover:bg-gray-50"
              >
                Continue Shopping
              </button>
            </div>
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
