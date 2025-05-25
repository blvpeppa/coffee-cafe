import React, { useState, useEffect } from 'react';
import { FaCreditCard, FaMobileAlt, FaPrint, FaTimes, FaSpinner, FaUsers, FaCheck } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import pricing1 from "../../assets/pricing-1.jpg";
import pricing2 from "../../assets/gallery-7.jpg";
import pricing3 from "../../assets/gallery-8.jpg";
import pricing4 from "../../assets/academic.jpg";
import pricing5 from "../../assets/government.jpg";
import s4 from '../../assets/satyabratasm-u_kMWN-BWyU-unsplash.jpg';
import s5 from '../../assets/kit.jpg';
import s6 from '../../assets/Rabbit.jpeg';
import s7 from '../../assets/rabbits.jpg';

const PricingCards = () => {
  // State management
  const [pricingOptions, setPricingOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    visitDate: '',
    specialRequests: '',
    visitorsCount: 1
  });
  
  const [paymentData, setPaymentData] = useState({
    method: 'irembo',
    transactionId: ''
  });
  
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState({ text: '', isError: false });
  const [receiptData, setReceiptData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // API configuration
  const API_BASE_URL = 'https://umuhuza.store/api';

  // Fetch pricing options from API
  useEffect(() => {
    const fetchPricingOptions = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/visit-options`);
        setPricingOptions(response.data.data.map(option => ({
          id: option.id,
          title: option.title,
          numericPrice: option.price,
          price: `${option.price.toLocaleString()} RWF`,
          description: option.description,
          image: getImageForOption(option.id),
          hoverImage: getHoverImageForOption(option.id),
          requiresPayment: option.price > 0,
          maxVisitors: option.max_visitors,
          includes: option.includes || []
        })));
      } catch (error) {
        console.error('Error fetching pricing options:', error);
        setMessage({
          text: 'Failed to load visit options. Please try again later.',
          isError: true
        });
      }
    };
    fetchPricingOptions();
  }, []);

  // Helper functions to get images based on option ID
  const getImageForOption = (id) => {
    switch(id) {
      case 1: return pricing1;
      case 2: return pricing4;
      case 3: return pricing5;
      case 4: return pricing2;
      case 5: return pricing3;
      default: return pricing1;
    }
  };

  const getHoverImageForOption = (id) => {
    switch(id) {
      case 1: return s7;
      case 2: return s6;
      case 3: return s5;
      case 4: return s4;
      case 5: return 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=772&q=80';
      default: return s7;
    }
  };

  // Initialize IremboPay payment
  const initiateIremboPayment = async () => {
    if (!window.IremboPay) {
      setMessage({
        text: 'Payment system is not available. Please try again later.',
        isError: true
      });
      return;
    }

    try {
      setIsProcessing(true);
      setMessage({ text: 'Initializing payment...', isError: false });

      const totalAmount = selectedOption.numericPrice * formData.visitorsCount;
      
      // For testing purposes - use sandbox environment
      IremboPay.initiate({
        publicKey: "pk_live_ae75302d3d84495e9c6282287f2a4643", // Replace with your test public key
        invoiceNumber: `KRC-${Date.now()}`, // Generate a unique invoice number
        amount: totalAmount, // Amount from the selected program
        currency: "RWF",
        locale: IremboPay.locale.EN,
        callback: (err, resp) => {
          if (!err) {
            // Payment was successful
            setPaymentData(prev => ({
              ...prev,
              transactionId: resp.transactionId
            }));
            setMessage({
              text: 'Payment successful! Please confirm to complete booking.',
              isError: false
            });
            // Automatically proceed to verify payment
            verifyPayment(resp.transactionId);
          } else {
            // Handle error
            setMessage({
              text: err.message || 'Payment failed. Please try again.',
              isError: true
            });
          }
          setIsProcessing(false);
        }
      });
    } catch (error) {
      console.error('Payment initialization error:', error);
      setMessage({
        text: 'An error occurred while initializing payment',
        isError: true
      });
      setIsProcessing(false);
    }
  };

  // Verify payment status
  const verifyPayment = async (transactionId) => {
    try {
      setIsProcessing(true);
      setMessage({ text: 'Verifying payment...', isError: false });

      const totalAmount = selectedOption.numericPrice * formData.visitorsCount;
      
      const response = await axios.post(`${API_BASE_URL}/book-visit`, {
        ...formData,
        visitType: selectedOption.id,
        amount: totalAmount,
        requiresPayment: true,
        visitorsCount: formData.visitorsCount,
        transactionId
      });

      generateReceipt({
        bookingId: response.data.data.bookingId,
        status: 'completed',
        paymentMethod: 'irembo',
        transactionId,
        totalAmount
      });
      
      setStep(3);
      setMessage({
        text: 'Payment and booking confirmed!',
        isError: false
      });
    } catch (error) {
      console.error('Payment verification error:', error);
      setMessage({
        text: error.response?.data?.message || 'An error occurred while verifying payment',
        isError: true
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Handlers
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setFormData(prev => ({
      ...prev,
      visitorsCount: 1 // Reset to 1 when selecting new option
    }));
    setStep(1);
    setMessage({ text: '', isError: false });
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      setMessage({ text: 'Please fill all required fields', isError: true });
      return;
    }

    if (selectedOption.maxVisitors && formData.visitorsCount > selectedOption.maxVisitors) {
      setMessage({ 
        text: `Maximum visitors for this option is ${selectedOption.maxVisitors}`, 
        isError: true 
      });
      return;
    }

    if (selectedOption.requiresPayment) {
      // Use IremboPay for payments
      await initiateIremboPayment();
    } else {
      await handleFreeBooking();
    }
  };

  const handleFreeBooking = async () => {
    try {
      setIsProcessing(true);
      setMessage({ text: 'Processing booking...', isError: false });

      const totalAmount = selectedOption.numericPrice * formData.visitorsCount;

      const response = await axios.post(`${API_BASE_URL}/book-visit`, {
        ...formData,
        visitType: selectedOption.id,
        amount: totalAmount,
        requiresPayment: false,
        visitorsCount: formData.visitorsCount
      });

      generateReceipt({
        bookingId: response.data.data.bookingId,
        status: 'completed',
        paymentMethod: 'free',
        totalAmount
      });
      setStep(3);
    } catch (error) {
      console.error('Booking error:', error);
      setMessage({ 
        text: error.response?.data?.message || 'An error occurred during booking', 
        isError: true 
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const generateReceipt = (apiData) => {
    const paymentMethod = apiData.paymentMethod === 'irembo' ? 'IremboPay' : 'Free';

    const totalAmount = apiData.totalAmount || selectedOption.numericPrice * formData.visitorsCount;

    const receipt = {
      id: apiData.bookingId,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      customer: formData.name,
      email: formData.email,
      service: selectedOption.title,
      amount: `${totalAmount.toLocaleString()} RWF`,
      description: selectedOption.description,
      image: selectedOption.image,
      paymentMethod,
      status: apiData.status || 'Completed',
      transactionId: apiData.transactionId || null,
      visitDate: formData.visitDate || 'To be scheduled',
      specialRequests: formData.specialRequests || 'None',
      visitorsCount: formData.visitorsCount,
      includes: selectedOption.includes
    };
    
    setReceiptData(receipt);
  };

  const generatePDFReceipt = () => {
    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(20);
    doc.setTextColor(40, 103, 45);
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
    doc.text(`Phone: ${formData.phone || 'Not provided'}`, 20, 90);
    doc.text(`Visit Type: ${receiptData.service}`, 20, 100);
    doc.text(`Visit Date: ${receiptData.visitDate}`, 20, 110);
    doc.text(`Number of Visitors: ${receiptData.visitorsCount}`, 20, 120);
    doc.text(`Amount: ${receiptData.amount}`, 20, 130);
    doc.text(`Payment Method: ${receiptData.paymentMethod}`, 20, 140);
    if (receiptData.transactionId) {
      doc.text(`Transaction ID: ${receiptData.transactionId}`, 20, 150);
    }
    doc.text(`Special Requests: ${receiptData.specialRequests}`, 20, 160);
    
    // Add included features
    doc.setFontSize(12);
    doc.text('Included in this package:', 20, 180);
    let yPosition = 190;
    receiptData.includes.forEach((item, index) => {
      doc.text(`✓ ${item}`, 25, yPosition);
      yPosition += 10;
    });
    
    // Add note
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Thank you for your visit request. Present this receipt at the KRC entrance.', 20, yPosition + 10);
    
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
      specialRequests: '',
      visitorsCount: 1
    });
    setPaymentData({
      method: 'irembo',
      transactionId: ''
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

        {/* Pricing Cards Grid with Hover Effect */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {pricingOptions.map((option) => (
            <div 
              key={option.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
            >
              {/* Enhanced Image Hover Container */}
              <div className="relative h-80 overflow-hidden">
                {/* Main Image */}
                <img
                  src={option.image}
                  alt={option.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-500"
                />
                {/* Hover Image */}
                <img
                  src={option.hoverImage}
                  alt={`${option.title} alternate view`}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                
                {/* Included features */}
                <div className="mb-4">
                  <h4 className="font-semibold text-green-700 mb-2">Includes:</h4>
                  <ul className="space-y-1">
                    {option.includes.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    {option.maxVisitors && (
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <FaUsers className="mr-1" />
                        <span>Max {option.maxVisitors} visitors</span>
                      </div>
                    )}
                  </div>
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
                    
                    {/* Visitors Count */}
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Number of Visitors *
                        {selectedOption.maxVisitors && (
                          <span className="text-sm text-gray-500 ml-2">
                            (Max {selectedOption.maxVisitors})
                          </span>
                        )}
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={selectedOption.maxVisitors || 100}
                        value={formData.visitorsCount}
                        onChange={(e) => setFormData({...formData, visitorsCount: parseInt(e.target.value) || 1})}
                        className="w-full p-2 border rounded"
                        required
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
                    
                    {/* Included features reminder */}
                    <div className="bg-gray-50 p-3 rounded">
                      <h4 className="font-semibold text-green-700 mb-2">This package includes:</h4>
                      <ul className="space-y-1">
                        {selectedOption.includes.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
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

                {/* Step 2: Payment Verification */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      Complete Your Payment
                    </h3>
                    
                    <div className="bg-blue-50 p-4 rounded mb-4">
                      <p className="text-blue-800">
                        Please complete your payment using IremboPay.
                      </p>
                    </div>
                    
                    <p className="text-gray-700">
                      After completing payment, your booking will be automatically confirmed.
                    </p>
                    
                    {message.text && (
                      <p className={`mt-2 ${message.isError ? 'text-red-600' : 'text-green-600'}`}>
                        {message.text}
                      </p>
                    )}
                    
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => verifyPayment(paymentData.transactionId)}
                        className="flex-1 bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded flex items-center justify-center"
                        disabled={isProcessing || !paymentData.transactionId}
                      >
                        {isProcessing ? (
                          <>
                            <FaSpinner className="animate-spin mr-2" />
                            Verifying...
                          </>
                        ) : (
                          'Verify Payment'
                        )}
                      </button>
                    </div>
                  </div>
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
                      <p><span className="font-semibold">Number of Visitors:</span> {receiptData.visitorsCount}</p>
                      <p><span className="font-semibold">Amount:</span> {receiptData.amount}</p>
                      <p><span className="font-semibold">Payment Method:</span> {receiptData.paymentMethod}</p>
                      {receiptData.transactionId && (
                        <p><span className="font-semibold">Transaction ID:</span> {receiptData.transactionId}</p>
                      )}
                    </div>

                    {/* Included features */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
                      <h4 className="font-bold mb-3">Your package includes:</h4>
                      <ul className="space-y-2">
                        {receiptData.includes.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
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
      </div>
    </section>
  );
};

export default PricingCards;