import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import g5 from '../../assets/gallery-5.jpg';//manue product image
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
      price: 40000,
      priceDisplay: '40,000 frw',
      image: 'https://images.unsplash.com/photo-1585969646097-a1b0038c37a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
      category: 'Live Stock'
    },
    {
      id: 2,
      name: 'Rabbit Hutch Kit',
      description: 'Complete DIY hutch kit with all materials and instructions for easy assembly.',
      price: 350000,
      priceDisplay: '350,000 frw',
      image: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
      category: 'Equipment'
    },
    {
      id: 3,
      name: 'Organic Rabbit Pellets',
      description: 'Nutritionally balanced feed for optimal growth and reproduction.',
      price: 15000,
      priceDisplay: '15,000 frw/bag',
      image: 'https://images.unsplash.com/photo-1607623488994-03c6c4b51a4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
      category: 'Feed'
    },
    {
      id: 4,
      name: 'Farming Starter Guide',
      description: 'Comprehensive manual covering all aspects of commercial rabbit farming.',
      price: 50000,
      priceDisplay: '50,000 frw',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=200&q=80',
      category: 'Resources'
    },
    {
      id: 5,
      name: 'Organic felterizer',
      description: 'Comprehensive manual covering all aspects of commercial rabbit farming.',
      price:"",
      priceDisplay: 'negociable',
      image: g5,
      category: 'Manue'
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
    className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
  >
    {/* Product Image with Hover Effect */}
    <div className="relative h-64 overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
      />
      {/* Secondary image or product details on hover */}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <p className="text-center text-white">{product.description}</p>
      </div>
    </div>

    {/* Product Info */}
    <div className="bg-white p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500">{product.category}</p>
        </div>
        
        {/* Price Ribbon for negotiable prices */}
        {product.priceDisplay === 'negociable' ? (
          <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
            Price Negotiable
          </span>
        ) : (
          <p className="text-lg font-bold text-green-600">
            {product.priceDisplay}
          </p>
        )}
      </div>

      {/* Action Button */}
      <button
        onClick={() => handleOrder(product)}
        className="mt-4 w-full rounded-md bg-green-600 py-2 text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        {product.priceDisplay === 'negociable' ? 'Contact Us' : 'Order Now'}
      </button>

      {/* Special badge for negotiable items */}
      {product.priceDisplay === 'negociable' && (
        <div className="mt-2 flex items-center justify-center text-xs text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
            />
          </svg>
          Price negotiable based on quantity
        </div>
      )}
    </div>

    {/* Hot/Ribbon Badge */}
    {product.category === 'Live Stock' && (
      <div className="absolute top-2 right-2 rotate-12 rounded bg-red-600 px-2 py-1 text-xs font-bold text-white shadow-lg">
        HOT DEAL!
      </div>
    )}
  </div>
))}
        </div>

        {/* Order Modal */}
        {selectedProduct && (
  <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
    <div className="bg-gray-800 rounded-lg max-w-md w-full p-6">
      {/* Close Button */}
      <button
        onClick={resetOrder}
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {step === 1 && (
        <form onSubmit={handleOrderSubmit}>
          <h3 className="text-2xl font-bold text-white mb-4">Order {selectedProduct.name}</h3>
          
          {/* Simplified Quantity Selector */}
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
          
          {/* Compact Form Fields */}
          <div className="space-y-3 mb-4">
            <input
              type="text"
              required
              placeholder="Full Name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
            />
            <input
              type="email"
              required
              placeholder="Email *"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
            />
            <textarea
              required
              placeholder="Shipping Address *"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
              rows="2"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
          >
            Continue to Payment
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handlePaymentSubmit}>
          <h3 className="text-2xl font-bold text-white mb-4">Payment Method</h3>
          
          {/* Simple Payment Toggle */}
          <div className="flex mb-4">
            <button
              type="button"
              onClick={() => handlePaymentMethodChange('credit')}
              className={`flex-1 py-2 ${paymentData.method === 'credit' ? 'bg-gray-700 text-white' : 'bg-gray-600 text-gray-300'}`}
            >
              Card
            </button>
            <button
              type="button"
              onClick={() => handlePaymentMethodChange('airtel')}
              className={`flex-1 py-2 ${paymentData.method === 'airtel' ? 'bg-gray-700 text-white' : 'bg-gray-600 text-gray-300'}`}
            >
              Airtel
            </button>
            <button
              type="button"
              onClick={() => handlePaymentMethodChange('mtn')}
              className={`flex-1 py-2 ${paymentData.method === 'mtn' ? 'bg-gray-700 text-white' : 'bg-gray-600 text-gray-300'}`}
            >
              MTN
            </button>
          </div>

          {paymentData.method === 'credit' && (
            <div className="space-y-3 mb-4">
              <input
                type="text"
                placeholder="Card Number"
                value={paymentData.cardNumber}
                onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
              />
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={paymentData.expiry}
                  onChange={(e) => setPaymentData({ ...paymentData, expiry: e.target.value })}
                  className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={paymentData.cvv}
                  onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                  className="w-1/3 p-2 bg-gray-700 text-white rounded border border-gray-600"
                />
              </div>
            </div>
          )}

          {(paymentData.method === 'airtel' || paymentData.method === 'mtn') && (
            <div className="mb-4">
              <input
                type="tel"
                placeholder={`${paymentData.method === 'airtel' ? 'Airtel' : 'MTN'} Number`}
                value={paymentData.mobileNumber}
                onChange={(e) => setPaymentData({ ...paymentData, mobileNumber: e.target.value })}
                className="w-full p-2 bg-gray-700 text-white rounded border border-gray-600"
              />
            </div>
          )}

          <button 
            type="submit" 
            className="w-full py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : `Pay ${calculateTotal()} frws`}
          </button>
        </form>
      )}

{step === 3 && (
  <div>
    <div className="text-center mb-4">
      <div className="w-12 h-12 bg-green-900 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-2">
        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h3 className="text-xl font-bold text-white mb-1">Payment Successful!</h3>
      <p className="text-gray-300 text-sm">Order #{`ORD-${Date.now()}`.slice(0, 10)}</p>
    </div>
    
    {/* Order Summary */}
    <div className="bg-gray-700 rounded p-3 mb-4">
      <p className="text-white font-medium">{selectedProduct.name} (x{quantity})</p>
      <p className="text-gray-300 text-sm">{calculateTotal()} frws</p>
    </div>
    
    {/* Download Receipt Button */}
    <button
      onClick={() => downloadReceipt('pdf')}
      className="w-full py-2 bg-gray-700 text-white rounded hover:bg-gray-600 mb-2 flex items-center justify-center"
    >
      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
      </svg>
      Download Receipt
    </button>
    
    {/* Continue Shopping Button */}
    <button
      onClick={resetOrder}
      className="w-full py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
    >
      Continue Shopping
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