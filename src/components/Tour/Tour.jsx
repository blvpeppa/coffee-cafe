import React, { useState } from 'react';
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
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [paymentData, setPaymentData] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('');
  const [receiptData, setReceiptData] = useState(null);

  const handleApply = (option) => {
    setSelectedOption(option);
    setStep(1);
    setMessage('');
  };

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setMessage('Please fill all required fields');
      return;
    }

    const currentOption = pricingOptions.find(opt => opt.title === selectedOption);
    if (currentOption.price === 'Free' || currentOption.price === 'Negotiable') {
      generateReceipt();
      setMessage("Application submitted successfully.");
      setStep(3);
    } else {
      setStep(2);
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!paymentData.cardNumber || !paymentData.expiry || !paymentData.cvv) {
      setMessage('Please fill all payment details');
      return;
    }

    generateReceipt();
    setMessage("Payment successful!");
    setStep(3);
  };

  const getPriceAmount = (optionTitle) => {
    const option = pricingOptions.find(opt => opt.title === optionTitle);
    if (!option) return '0';
    if (option.price === 'Free' || option.price === 'Negotiable') return option.price;
    return option.price.split(' ')[0];
  };

  const generateReceipt = () => {
    const option = pricingOptions.find(opt => opt.title === selectedOption);
    const receipt = {
      id: `REC-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      customer: formData.name,
      email: formData.email,
      service: selectedOption,
      amount: getPriceAmount(selectedOption),
      image: option.image,
      paymentMethod: 'Credit Card',
      status: 'Completed'
    };
    setReceiptData(receipt);
  };

  const downloadReceipt = () => {
    const receiptWindow = window.open('', '_blank');
    receiptWindow.document.write(`
      <html>
        <head>
          <title>Receipt - ${receiptData.id}</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { max-width: 150px; margin-bottom: 10px; }
            .receipt-title { font-size: 24px; font-weight: bold; margin-bottom: 20px; }
            .receipt-details { margin-bottom: 30px; }
            .detail-row { display: flex; margin-bottom: 10px; }
            .detail-label { font-weight: bold; width: 150px; }
            .service-image { max-width: 100%; height: auto; margin: 20px 0; border-radius: 8px; }
            .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; }
            .amount { font-size: 20px; font-weight: bold; color: #2e7d32; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="header">
            <img src="https://via.placeholder.com/150x50?text=Museum+Logo" alt="Logo" class="logo">
            <div class="receipt-title">Payment Receipt</div>
          </div>
          <div class="receipt-details">
            <div class="detail-row"><div class="detail-label">Receipt ID:</div><div>${receiptData.id}</div></div>
            <div class="detail-row"><div class="detail-label">Date:</div><div>${receiptData.date} at ${receiptData.time}</div></div>
            <div class="detail-row"><div class="detail-label">Customer:</div><div>${receiptData.customer}</div></div>
            <div class="detail-row"><div class="detail-label">Email:</div><div>${receiptData.email}</div></div>
            <div class="detail-row"><div class="detail-label">Service:</div><div>${receiptData.service}</div></div>
            <div class="detail-row"><div class="detail-label">Payment Method:</div><div>${receiptData.paymentMethod}</div></div>
            <div class="detail-row"><div class="detail-label">Status:</div><div>${receiptData.status}</div></div>
            <div class="amount">Amount Paid: ${receiptData.amount}</div>
            <img src="${receiptData.image}" alt="Service" class="service-image">
          </div>
          <div class="footer">
            <p>Thank you for your payment. This receipt confirms your transaction.</p>
          </div>
          <script>window.onload = function() { setTimeout(function() { window.print(); }, 500); };</script>
        </body>
      </html>
    `);
    receiptWindow.document.close();
  };

  const resetForm = () => {
    setSelectedOption(null);
    setFormData({ name: '', email: '', phone: '' });
    setPaymentData({ cardNumber: '', expiry: '', cvv: '' });
    setStep(1);
    setMessage('');
    setReceiptData(null);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Price Details</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {pricingOptions.map((item, index) => (
            <div key={index} className="bg-white rounded shadow hover:shadow-lg overflow-hidden transition">
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
            {step === 1 && (
              <form onSubmit={handleApplicationSubmit} className="bg-white p-8 rounded shadow-lg w-full max-w-md relative">
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
                <input
                  type="tel"
                  placeholder="Phone Number (optional)"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full mb-4 p-2 border rounded"
                />
                <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded w-full">
                  {getPriceAmount(selectedOption) === 'Free' || getPriceAmount(selectedOption) === 'Negotiable' ? 'Submit Application' : 'Proceed to Payment'}
                </button>
                <button
                  onClick={resetForm}
                  type="button"
                  className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
                >
                  &times;
                </button>
                {message && <p className={`mt-4 ${message.includes('failed') ? 'text-red-600' : 'text-green-600'}`}>{message}</p>}
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handlePaymentSubmit} className="bg-white p-8 rounded shadow-lg w-full max-w-md relative">
                <h3 className="text-2xl font-semibold mb-4">Payment for {selectedOption}</h3>
                <p className="text-lg font-bold mb-4">Amount: {getPriceAmount(selectedOption)}</p>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Card Number</label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={paymentData.cardNumber}
                    onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={paymentData.expiry}
                      onChange={(e) => setPaymentData({ ...paymentData, expiry: e.target.value })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      value={paymentData.cvv}
                      onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
                
                <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded w-full">
                  Pay Now
                </button>
                <button
                  onClick={() => setStep(1)}
                  type="button"
                  className="mt-2 text-gray-600 hover:text-gray-800"
                >
                  Back to Application
                </button>
                <button
                  onClick={resetForm}
                  type="button"
                  className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
                >
                  &times;
                </button>
                {message && <p className={`mt-4 ${message.includes('failed') ? 'text-red-600' : 'text-green-600'}`}>{message}</p>}
              </form>
            )}

            {step === 3 && (
              <div className="bg-white p-8 rounded shadow-lg w-full max-w-md relative">
                <h3 className="text-2xl font-semibold mb-4">Payment Successful!</h3>
                <p className="text-lg mb-4">Thank you for your payment.</p>
                
                <div className="border p-4 rounded mb-4">
                  <h4 className="font-bold mb-2">Receipt Summary</h4>
                  <p><span className="font-semibold">Service:</span> {selectedOption}</p>
                  <p><span className="font-semibold">Amount:</span> {getPriceAmount(selectedOption)}</p>
                  <p><span className="font-semibold">Date:</span> {new Date().toLocaleDateString()}</p>
                </div>
                
                <button
                  onClick={downloadReceipt}
                  className="bg-green-700 text-white px-4 py-2 rounded w-full mb-2"
                >
                  Download Receipt
                </button>
                <button
                  onClick={resetForm}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded w-full"
                >
                  Close
                </button>
                <button
                  onClick={resetForm}
                  type="button"
                  className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
                >
                  &times;
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PricingCards;
