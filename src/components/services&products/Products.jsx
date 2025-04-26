import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    address: '' 
  });
  const [paymentData, setPaymentData] = useState({ 
    method: 'credit', // 'credit', 'visa', 'airtel', 'mtn'
    cardNumber: '', 
    expiry: '', 
    cvv: '',
    mobileNumber: '',
    network: 'airtel'
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
    setPaymentData({ 
      method: 'credit',
      cardNumber: '', 
      expiry: '', 
      cvv: '',
      mobileNumber: '',
      network: 'airtel'
    });
    setMessage('');
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentData({
      ...paymentData,
      method,
      cardNumber: '',
      expiry: '',
      cvv: '',
      mobileNumber: ''
    });
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
    
    // Validate based on payment method
    if (paymentData.method === 'credit' || paymentData.method === 'visa') {
      if (!paymentData.cardNumber || !paymentData.expiry || !paymentData.cvv) {
        setMessage('Please fill all payment details');
        return;
      }
    } else if (paymentData.method === 'airtel' || paymentData.method === 'mtn') {
      if (!paymentData.mobileNumber) {
        setMessage('Please enter your mobile money number');
        return;
      }
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
        paymentMethod: paymentData.method === 'credit' ? 'Credit Card' : 
                      paymentData.method === 'visa' ? 'Visa Card' :
                      paymentData.method === 'airtel' ? 'Airtel Money' : 'MTN Mobile Money',
        status: 'Completed',
        shippingAddress: formData.address,
        mobileNumber: paymentData.method === 'airtel' || paymentData.method === 'mtn' ? 
                     paymentData.mobileNumber : null
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

  const downloadReceipt = (format = 'both') => {
    const receiptData = JSON.parse(localStorage.getItem('latestReceipt'));
    if (!receiptData) return;

    if (format === 'html' || format === 'both') {
      // HTML Version
      const receiptHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>Receipt - ${receiptData.id}</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; color: #333; }
            .header { text-align: center; margin-bottom: 30px; }
            .receipt-title { font-size: 28px; font-weight: bold; margin-bottom: 10px; }
            .section { margin-bottom: 20px; }
            .info { display: flex; justify-content: space-between; }
            .info div { width: 48%; }
            .summary-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            .summary-table th, .summary-table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            .summary-table th { background-color: #f4f4f4; }
            .footer { text-align: center; font-size: 14px; color: #777; margin-top: 40px; }
            .product-img { width: 150px; height: auto; border-radius: 8px; margin-top: 10px; }
            @media print {
              body { padding: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="receipt-title">Rabbit Farm Co.</div>
            <div>Order Receipt</div>
            <div><strong>${receiptData.id}</strong></div>
          </div>

          <div class="section info">
            <div>
              <h4>Customer Info</h4>
              <p><strong>Name:</strong> ${receiptData.customer}</p>
              <p><strong>Email:</strong> ${receiptData.email}</p>
              <p><strong>Shipping Address:</strong><br>${receiptData.shippingAddress.replace(/\n/g, '<br>')}</p>
            </div>
            <div>
              <h4>Order Info</h4>
              <p><strong>Date:</strong> ${receiptData.date}</p>
              <p><strong>Time:</strong> ${receiptData.time}</p>
              <p><strong>Status:</strong> ${receiptData.status}</p>
            </div>
          </div>

          <div class="section">
            <h4>Product Details</h4>
            <img src="${receiptData.image}" alt="Product Image" class="product-img" />
            <table class="summary-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${receiptData.product}</td>
                  <td>$${receiptData.unitPrice}</td>
                  <td>${receiptData.quantity}</td>
                  <td>$${receiptData.total}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="section">
            <p><strong>Payment Method:</strong> ${receiptData.paymentMethod}</p>
            ${receiptData.mobileNumber ? `<p><strong>Mobile Number:</strong> +256 ${receiptData.mobileNumber}</p>` : ''}
          </div>

          <div class="footer">
            <p>Thank you for shopping with Rabbit Farm Co. – Empowering sustainable agriculture!</p>
            <div class="no-print" style="margin-top: 20px;">
              <button onclick="window.print()" style="
                background: #3498db;
                color: white;
                border: none;
                padding: 8px 16px;
                border-radius: 4px;
                cursor: pointer;
              ">Print Receipt</button>
            </div>
          </div>
        </body>
        </html>
      `;

      const blob = new Blob([receiptHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipt-${receiptData.id}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }

    if (format === 'pdf' || format === 'both') {
      // PDF Version
      const doc = new jsPDF();
      doc.setFont('helvetica', 'normal');

      // Add Title
      doc.setFontSize(20);
      doc.setTextColor(40, 180, 100);
      doc.text('Rabbit Farm Co.', 105, 15, null, null, 'center');
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text(`Order Receipt #${receiptData.id}`, 105, 25, null, null, 'center');
      doc.setDrawColor(200, 200, 200);
      doc.line(20, 30, 190, 30);

      // Add Customer Info
      doc.setFontSize(12);
      doc.setTextColor(100, 100, 100);
      doc.text('Customer Information', 20, 40);
      doc.setTextColor(0, 0, 0);
      doc.text(`Name: ${receiptData.customer}`, 20, 50);
      doc.text(`Email: ${receiptData.email}`, 20, 60);
      doc.text(`Shipping Address:`, 20, 70);
      const splitAddress = doc.splitTextToSize(receiptData.shippingAddress, 170);
      doc.text(splitAddress, 20, 80);

      // Add Order Info
      doc.setTextColor(100, 100, 100);
      doc.text('Order Information', 20, 110);
      doc.setTextColor(0, 0, 0);
      doc.text(`Date: ${receiptData.date}`, 20, 120);
      doc.text(`Time: ${receiptData.time}`, 20, 130);
      doc.text(`Status: ${receiptData.status}`, 20, 140);

      // Add Product Info
      doc.setTextColor(100, 100, 100);
      doc.text('Product Details', 20, 160);
      doc.setTextColor(0, 0, 0);
      doc.text(`Product: ${receiptData.product}`, 20, 170);
      doc.text(`Unit Price: $${receiptData.unitPrice}`, 20, 180);
      doc.text(`Quantity: ${receiptData.quantity}`, 20, 190);
      doc.text(`Total: $${receiptData.total}`, 20, 200);

      // Add Payment Method
      doc.setTextColor(100, 100, 100);
      doc.text('Payment Information', 20, 220);
      doc.setTextColor(0, 0, 0);
      doc.text(`Method: ${receiptData.paymentMethod}`, 20, 230);
      if (receiptData.mobileNumber) {
        doc.text(`Mobile Number: +256 ${receiptData.mobileNumber}`, 20, 240);
      }

      // Add Footer
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('Thank you for shopping with Rabbit Farm Co.', 105, 280, null, null, 'center');
      doc.text('Empowering sustainable agriculture!', 105, 285, null, null, 'center');

      // Save the PDF
      doc.save(`receipt-${receiptData.id}.pdf`);
    }
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

        {/* Order Modal */}
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

                  {/* Payment Method Selection */}
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-3">Payment Method</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handlePaymentMethodChange('credit')}
                        className={`px-4 py-2 rounded-md border ${
                          paymentData.method === 'credit' 
                            ? 'bg-green-100 border-green-500 text-green-700' 
                            : 'bg-white border-gray-300'
                        }`}
                      >
                        Credit Card
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePaymentMethodChange('visa')}
                        className={`px-4 py-2 rounded-md border ${
                          paymentData.method === 'visa' 
                            ? 'bg-blue-100 border-blue-500 text-blue-700' 
                            : 'bg-white border-gray-300'
                        }`}
                      >
                        Visa Card
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePaymentMethodChange('airtel')}
                        className={`px-4 py-2 rounded-md border ${
                          paymentData.method === 'airtel' 
                            ? 'bg-red-100 border-red-500 text-red-700' 
                            : 'bg-white border-gray-300'
                        }`}
                      >
                        Airtel Money
                      </button>
                      <button
                        type="button"
                        onClick={() => handlePaymentMethodChange('mtn')}
                        className={`px-4 py-2 rounded-md border ${
                          paymentData.method === 'mtn' 
                            ? 'bg-yellow-100 border-yellow-500 text-yellow-700' 
                            : 'bg-white border-gray-300'
                        }`}
                      >
                        MTN Mobile Money
                      </button>
                    </div>
                  </div>

                  {/* Card Payment Form */}
                  {(paymentData.method === 'credit' || paymentData.method === 'visa') && (
                    <>
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
                    </>
                  )}

                  {/* Mobile Money Form */}
                  {(paymentData.method === 'airtel' || paymentData.method === 'mtn') && (
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">
                        {paymentData.method === 'airtel' ? 'Airtel' : 'MTN'} Mobile Number *
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                          +250
                        </span>
                        <input
                          type="tel"
                          placeholder={`7XXXXXXXX (${paymentData.method === 'airtel' ? 'Airtel' : 'MTN'} number)`}
                          value={paymentData.mobileNumber}
                          onChange={(e) => setPaymentData({ ...paymentData, mobileNumber: e.target.value })}
                          className="flex-1 p-2 border rounded-r-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                      </div>
                      <p className="mt-2 text-sm text-green-700">
                        You'll receive a payment request on your {paymentData.method === 'airtel' ? 'Airtel' : 'MTN'} number
                      </p>
                    </div>
                  )}

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
                      ) : `Pay $${calculateTotal()}`}
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
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => downloadReceipt('html')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Download HTML
                      </button>
                      <button
                        onClick={() => downloadReceipt('pdf')}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      >
                        Download PDF
                      </button>
                    </div>
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