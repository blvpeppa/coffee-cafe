import React, { useState,useEffect } from 'react';
import { FaCreditCard, FaMobileAlt, FaPrint, FaTimes, FaArrowRight } from 'react-icons/fa';
import { Link,useNavigate } from "react-router-dom";
import { jsPDF } from 'jspdf';
import pricing1 from "../../assets/pricing-1.jpg";
import pricing5 from "../../assets/government.jpg";
import pricing4 from "../../assets/academic.jpg";

const Training_home = () => {
  const navigate = useNavigate();  // Initialize the navigate function
  const handleMoreVisitsClick = () => {
    navigate('/tour');
    // Scroll to top after navigation
    window.scrollTo(0, 0);
  };
  const pricingOptions = [
   {
         id: 1,
         title: 'Professional Visit',
         price: '20,000 frws',
         numericPrice: 20000,
         description: 'For researchers and professionals in related fields',
         image: pricing1,
         requiresPayment: true
       },
       {
         id: 2,
         title: 'Academic Visit',
         price: '400,000 frws / 1-30 people',
         numericPrice: 400000,
         description: 'Special rates for school and university groups',
         image: pricing4,
         requiresPayment: true
       },
       {
         id: 3,
         title: 'Institutional Visit',
         price: 'Free',
         numericPrice: 0,
         description: 'For government and partner organizations',
         image: pricing5,
         requiresPayment: false
       }
  ];

  // State management
  const [selectedOption, setSelectedOption] = useState(null);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      institution: '',
      visitDate: '',
      specialRequests: ''
    });
    
    const [paymentData, setPaymentData] = useState({
      method: 'credit', // 'credit' or 'mobile'
      cardNumber: '',
      expiry: '',
      cvv: '',
      mobileNumber: '',
      network: 'mtn'
    });
    
    const [step, setStep] = useState(1); // 1: application, 2: payment, 3: confirmation
    const [message, setMessage] = useState({ text: '', isError: false });
    const [receiptData, setReceiptData] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
  
    // Handlers
    const handleSelectOption = (option) => {
      setSelectedOption(option);
      setStep(1);
      setMessage({ text: '', isError: false });
    };
  
    const handleApplicationSubmit = (e) => {
      e.preventDefault();
      
      if (!formData.name || !formData.email) {
        setMessage({ text: 'Please fill all required fields', isError: true });
        return;
      }
  
      if (selectedOption.requiresPayment) {
        setStep(2);
      } else {
        handleFreeBooking();
      }
    };
  
    const handleFreeBooking = async () => {
      try {
        setIsProcessing(true);
        setMessage({ text: 'Processing booking...', isError: false });
  
        const response = await fetch('http://localhost:4700/api/tour/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            institution: formData.institution,
            visitDate: formData.visitDate,
            specialRequests: formData.specialRequests,
            visitType: selectedOption.title,
            amount: selectedOption.numericPrice,
            paymentMethod: 'free'
          })
        });
  
        const data = await response.json();
  
        if (data.success) {
          generateReceipt(data.data);
          setStep(3);
        } else {
          setMessage({ text: data.message || 'Booking failed', isError: true });
        }
      } catch (error) {
        console.error('Booking error:', error);
        setMessage({ text: 'An error occurred during booking', isError: true });
      } finally {
        setIsProcessing(false);
      }
    };
  
    const handlePaymentSubmit = async (e) => {
      e.preventDefault();
      
      if (paymentData.method === 'credit' && 
          (!paymentData.cardNumber || !paymentData.expiry || !paymentData.cvv)) {
        setMessage({ text: 'Please fill all payment details', isError: true });
        return;
      }
      
      if (paymentData.method === 'mobile' && !paymentData.mobileNumber) {
        setMessage({ text: 'Please enter mobile number', isError: true });
        return;
      }
  
      try {
        setIsProcessing(true);
        setMessage({ text: 'Processing payment...', isError: false });
  
        const paymentPayload = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          institution: formData.institution,
          visitDate: formData.visitDate,
          specialRequests: formData.specialRequests,
          visitType: selectedOption.title,
          amount: selectedOption.numericPrice,
          paymentMethod: paymentData.method,
          ...(paymentData.method === 'mobile' && {
            mobileNumber: paymentData.mobileNumber,
            network: paymentData.network
          })
        };
  
        const response = await fetch('http://localhost:4700/api/tour/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentPayload)
        });
  
        const data = await response.json();
  
        if (data.success) {
          generateReceipt(data.data);
          setStep(3);
        } else {
          setMessage({ text: data.message || 'Payment failed', isError: true });
        }
      } catch (error) {
        console.error('Payment error:', error);
        setMessage({ text: 'An error occurred during payment', isError: true });
      } finally {
        setIsProcessing(false);
      }
    };
  
    const generateReceipt = (apiData) => {
      const receipt = {
        id: apiData.bookingId ? `KRC-${apiData.bookingId.toString().padStart(6, '0')}` : `KRC-${Date.now().toString().slice(-6)}`,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        customer: apiData.name || formData.name,
        email: apiData.email || formData.email,
        service: selectedOption.title,
        amount: selectedOption.price,
        description: selectedOption.description,
        image: selectedOption.image,
        paymentMethod: apiData.paymentMethod || 
                     (selectedOption.requiresPayment ? 
                      (paymentData.method === 'credit' ? 'Credit Card' : `${paymentData.network.toUpperCase()} Mobile Money`) : 
                      'Not Applicable'),
        status: apiData.status || 'Completed',
        transactionId: apiData.transactionId || null
      };
      
      setReceiptData(receipt);
      setMessage({ text: apiData.status === 'pending' ? 
        'Payment initiated! Check your phone to complete the transaction' : 
        'Registration successful!', 
        isError: false });
    };
  
    const generatePDFReceipt = () => {
      const doc = new jsPDF();
      
      // Add logo and header
      doc.setFontSize(20);
      doc.setTextColor(40, 103, 45); // Dark green
      doc.text('Kigali Rabbit Farm', 105, 20, null, null, 'center');
      
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text('Visit Confirmation Receipt', 105, 30, null, null, 'center');
      
      // Add receipt details
      doc.setFontSize(12);
      doc.text(`Receipt ID: ${receiptData.id}`, 20, 50);
      doc.text(`Date: ${receiptData.date} at ${receiptData.time}`, 20, 60);
      doc.text(`Customer: ${receiptData.customer}`, 20, 70);
      doc.text(`Email: ${receiptData.email}`, 20, 80);
      doc.text(`Visit Type: ${receiptData.service}`, 20, 90);
      doc.text(`Amount: ${receiptData.amount}`, 20, 100);
      doc.text(`Payment Method: ${receiptData.paymentMethod}`, 20, 110);
      if (receiptData.transactionId) {
        doc.text(`Transaction ID: ${receiptData.transactionId}`, 20, 120);
      }
      
      // Add note
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      const noteY = receiptData.transactionId ? 150 : 140;
      doc.text('Thank you for your visit request. Present this receipt at the KRC entrance.', 20, noteY);
      
      // Save the PDF
      doc.save(`KRC_receipt_${receiptData.id}.pdf`);
    };
  
    const resetForm = () => {
      setSelectedOption(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        institution: '',
        visitDate: '',
        specialRequests: ''
      });
      setPaymentData({
        method: 'credit',
        cardNumber: '',
        expiry: '',
        cvv: '',
        mobileNumber: '',
        network: 'mtn'
      });
      setStep(1);
      setMessage({ text: '', isError: false });
      setReceiptData(null);
      setIsProcessing(false);
    };
  
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Visit Options</h2>
            <p className="text-gray-600 mt-2">Choose the visit type that fits your needs</p>
          </div>
  
          {/* Pricing Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {pricingOptions.map((option) => (
              <div key={option.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div 
                  className="h-80 bg-cover bg-center" 
                  style={{ backgroundImage: `url(${option.image})` }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{option.title}</h3>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-green-700">{option.price}</span>
                    <button
                      onClick={() => handleSelectOption(option)}
                      className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded transition-colors duration-300"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
  
          {/* Registration Modal */}
          {selectedOption && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="p-6 relative">
                  {/* Close button */}
                  <button
                    onClick={resetForm}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
  
                  {/* Step 1: Application Form */}
                  {step === 1 && (
                    <form onSubmit={handleApplicationSubmit} className="space-y-4">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        Book {selectedOption.title}
                      </h3>
                      
                      <div>
                        <label className="block text-gray-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full p-2 border rounded"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-1">Email *</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full p-2 border rounded"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      
                      {selectedOption.title.includes('Academic') || selectedOption.title.includes('Institutional') ? (
                        <div>
                          <label className="block text-gray-700 mb-1">Institution Name</label>
                          <input
                            type="text"
                            value={formData.institution}
                            onChange={(e) => setFormData({...formData, institution: e.target.value})}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                      ) : null}
                      
                      <div>
                        <label className="block text-gray-700 mb-1">Preferred Visit Date</label>
                        <input
                          type="date"
                          value={formData.visitDate}
                          onChange={(e) => setFormData({...formData, visitDate: e.target.value})}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 mb-1">Special Requests</label>
                        <textarea
                          value={formData.specialRequests}
                          onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                          className="w-full p-2 border rounded"
                          rows="3"
                        />
                      </div>
                      
                      {message.text && (
                        <p className={`mt-2 ${message.isError ? 'text-red-600' : 'text-green-600'}`}>
                          {message.text}
                        </p>
                      )}
                      
                      <button
                        type="submit"
                        className="w-full bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded mt-4 flex items-center justify-center"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <FaSpinner className="animate-spin mr-2" />
                            Processing...
                          </>
                        ) : (
                          selectedOption.requiresPayment ? 'Continue to Payment' : 'Submit Request'
                        )}
                      </button>
                    </form>
                  )}
  
                  {/* Step 2: Payment Form */}
                  {step === 2 && (
                    <form onSubmit={handlePaymentSubmit} className="space-y-4">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">
                        Payment for {selectedOption.title}
                      </h3>
                      
                      <div className="bg-gray-100 p-4 rounded">
                        <p className="font-semibold">Amount Due: {selectedOption.price}</p>
                      </div>
                      
                      <div className="flex space-x-4 mb-4">
                        <button
                          type="button"
                          onClick={() => setPaymentData({...paymentData, method: 'credit'})}
                          className={`flex-1 py-2 rounded flex items-center justify-center space-x-2 ${paymentData.method === 'credit' ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                          <FaCreditCard />
                          <span>Credit Card</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentData({...paymentData, method: 'mobile'})}
                          className={`flex-1 py-2 rounded flex items-center justify-center space-x-2 ${paymentData.method === 'mobile' ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                          <FaMobileAlt />
                          <span>Mobile Money</span>
                        </button>
                      </div>
                      
                      {paymentData.method === 'credit' ? (
                        <>
                          <div>
                            <label className="block text-gray-700 mb-1">Card Number *</label>
                            <input
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              value={paymentData.cardNumber}
                              onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                              className="w-full p-2 border rounded"
                              required
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-gray-700 mb-1">Expiry Date *</label>
                              <input
                                type="text"
                                placeholder="MM/YY"
                                value={paymentData.expiry}
                                onChange={(e) => setPaymentData({...paymentData, expiry: e.target.value})}
                                className="w-full p-2 border rounded"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-gray-700 mb-1">CVV *</label>
                              <input
                                type="text"
                                placeholder="123"
                                value={paymentData.cvv}
                                onChange={(e) => setPaymentData({...paymentData, cvv: e.target.value})}
                                className="w-full p-2 border rounded"
                                required
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div>
                            <label className="block text-gray-700 mb-1">Mobile Number *</label>
                            <input
                              type="tel"
                              placeholder="0781234567"
                              value={paymentData.mobileNumber}
                              onChange={(e) => setPaymentData({...paymentData, mobileNumber: e.target.value})}
                              className="w-full p-2 border rounded"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-gray-700 mb-1">Network *</label>
                            <select
                              value={paymentData.network}
                              onChange={(e) => setPaymentData({...paymentData, network: e.target.value})}
                              className="w-full p-2 border rounded"
                            >
                              <option value="mtn">MTN</option>
                              <option value="airtel">Airtel</option>
                            </select>
                          </div>
                        </>
                      )}
                      
                      {message.text && (
                        <p className={`mt-2 ${message.isError ? 'text-red-600' : 'text-green-600'}`}>
                          {message.text}
                        </p>
                      )}
                      
                      <div className="flex space-x-4">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
                          disabled={isProcessing}
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded flex items-center justify-center"
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <>
                              <FaSpinner className="animate-spin mr-2" />
                              Processing...
                            </>
                          ) : (
                            'Complete Payment'
                          )}
                        </button>
                      </div>
                    </form>
                  )}
  
                  {/* Step 3: Confirmation */}
                  {step === 3 && receiptData && (
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h3>
                      <p className="text-green-600 mb-6">{message.text}</p>
                      
                      <div className="bg-gray-100 p-4 rounded-lg mb-6 text-left">
                        <h4 className="font-bold mb-3">Booking Summary</h4>
                        <p><span className="font-semibold">Reference:</span> {receiptData.id}</p>
                        <p><span className="font-semibold">Visit Type:</span> {receiptData.service}</p>
                        <p><span className="font-semibold">Date:</span> {receiptData.date}</p>
                        <p><span className="font-semibold">Amount:</span> {receiptData.amount}</p>
                        {receiptData.paymentMethod !== 'Not Applicable' && (
                          <p><span className="font-semibold">Payment Method:</span> {receiptData.paymentMethod}</p>
                        )}
                        {receiptData.transactionId && (
                          <p><span className="font-semibold">Transaction ID:</span> {receiptData.transactionId}</p>
                        )}
                      </div>
                      
                      <div className="flex flex-col space-y-3">
                        <button
                          onClick={generatePDFReceipt}
                          className="bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded flex items-center justify-center space-x-2"
                        >
                          <FaPrint />
                          <span>Download Receipt</span>
                        </button>
                        <button
                          onClick={resetForm}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
                  {/* More Tours Button */}
        <div className="text-center mt-12">
        <button 
      onClick={handleMoreVisitsClick}
      className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded inline-flex items-center"
    >
      Explore More Visits <FaArrowRight className="ml-2" />
    </button>
        </div>
        </div>
      </section>
    );
  };

export default Training_home;