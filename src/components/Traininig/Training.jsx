import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaPhone, FaEnvelope, FaSpinner, FaCheck, FaTimes, FaPrint } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Training = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    preferredDate: '',
    questions: ''
  });
  const [paymentData, setPaymentData] = useState({
    method: 'mobile',
    transactionId: '',
    amount: 0
  });
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState({ text: '', isError: false });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [programs, setPrograms] = useState([]);
  const navigate = useNavigate();

  // API configuration
  const API_BASE_URL = 'https://umuhuza.store/api/training';

  // Fetch training programs from API
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/programs`);
        setPrograms(response.data.data.map(program => ({
          ...program,
          priceDisplay: `${program.price.toLocaleString()} RWF`,
          requiresPayment: program.price > 0,
          features: program.features || []
        })));
      } catch (error) {
        console.error('Fetch error:', error);
        setMessage({
          text: 'Failed to load programs. Please try again later.',
          isError: true
        });
      }
    };
    fetchPrograms();
  }, []);

  const makePayment = () => {
    if (!window.IremboPay) {
      setMessage({
        text: 'Payment system is not available. Please try again later.',
        isError: true
      });
      return;
    }

    // For testing purposes - use sandbox environment
    IremboPay.initiate({
      publicKey: "pk_live_ae75302d3d84495e9c6282287f2a4643", // Replace with your test public key
      invoiceNumber: `880523640095`, // Generate a unique invoice number
      amount: selectedProgram.price, // Amount from the selected program
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
            text: 'Payment successful! Please confirm to complete registration.',
            isError: false
          });
        } else {
          // Handle error
          setMessage({
            text: err.message || 'Payment failed. Please try again.',
            isError: true
          });
        }
      }
    });
  };

  const handleProgramSelect = (program) => {
    setSelectedProgram(program);
    setPaymentData(prev => ({
      ...prev,
      amount: program.price
    }));
    setStep(1);
    resetForm();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      experience: '',
      preferredDate: '',
      questions: ''
    });
    setPaymentData({
      method: 'mobile',
      transactionId: '',
      amount: selectedProgram?.price || 0
    });
    setMessage({ text: '', isError: false });
    setReceiptData(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentData({ ...paymentData, method });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.location) {
      setMessage({ text: 'Please fill all required fields', isError: true });
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({ text: 'Please enter a valid email address', isError: true });
      return false;
    }

    return true;
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      setMessage({ text: 'Processing registration...', isError: false });

      const response = await axios.post(`${API_BASE_URL}/register`, {
        ...formData,
        programId: selectedProgram.id,
        amount: selectedProgram.price
      });

      if (response.data.success) {
        if (selectedProgram.requiresPayment) {
          setStep(2);
          setReceiptData(response.data.data.receiptData);
        } else {
          setReceiptData(response.data.data.receiptData);
          setStep(3);
        }
      } else {
        setMessage({ text: response.data.message || 'Registration failed', isError: true });
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMsg = error.response?.data?.message || 'An error occurred during registration';
      setMessage({ text: errorMsg, isError: true });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    if (!paymentData.transactionId) {
      setMessage({ text: 'Please complete the payment first', isError: true });
      return;
    }

    try {
      setIsLoading(true);
      setMessage({ text: 'Confirming payment...', isError: false });

      const response = await axios.post(`${API_BASE_URL}/confirm-payment`, {
        registrationId: receiptData.registrationId.replace('KRC-TR-', ''),
        transactionId: paymentData.transactionId,
        paymentMethod: paymentData.method,
        amount: selectedProgram.price
      });

      if (response.data.success) {
        setReceiptData(response.data.data);
        setStep(3);
      } else {
        setMessage({ text: response.data.message || 'Payment confirmation failed', isError: true });
      }
    } catch (error) {
      console.error('Payment error:', error);
      const errorMsg = error.response?.data?.message || 'An error occurred during payment confirmation';
      setMessage({ text: errorMsg, isError: true });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadReceipt = (format = 'pdf') => {
    if (!receiptData) return;

    if (format === 'pdf') {
      const doc = new jsPDF();
      
      // Add logo and header
      doc.setFontSize(20);
      doc.setTextColor(40, 103, 45);
      doc.text('Kigali Rabbit Farm', 105, 15, null, null, 'center');
      
      // Add receipt details
      doc.setFontSize(12);
      doc.text(`Receipt ID: ${receiptData.registrationId}`, 20, 30);
      doc.text(`Date: ${receiptData.date} at ${receiptData.time}`, 20, 40);
      doc.text(`Customer: ${receiptData.customer}`, 20, 50);
      doc.text(`Email: ${receiptData.email}`, 20, 60);
      doc.text(`Phone: ${receiptData.phone}`, 20, 70);
      
      // Training details
      doc.text(`Program: ${receiptData.program}`, 20, 90);
      doc.text(`Duration: ${receiptData.duration}`, 20, 100);
      doc.text(`Training Date: ${receiptData.trainingDate}`, 20, 110);
      doc.text(`Amount: ${receiptData.price}`, 20, 120);
      doc.text(`Payment Method: ${receiptData.paymentMethod}`, 20, 130);
      
      if (receiptData.transactionId) {
        doc.text(`Transaction ID: ${receiptData.transactionId}`, 20, 140);
      }
      
      // Save the PDF
      doc.save(`training-receipt-${receiptData.registrationId}.pdf`);
    } else {
      // HTML receipt implementation
      const receiptHtml = `<!DOCTYPE html>
        <html>
        <head>
          <title>Training Receipt - ${receiptData.registrationId}</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            .title { font-size: 24px; font-weight: bold; color: #286641; }
            .section { margin-bottom: 15px; }
            .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
            .divider { border-top: 1px solid #ddd; margin: 20px 0; }
            .footer { text-align: center; font-size: 14px; color: #777; margin-top: 30px; }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="title">Kigali Rabbit Farm</div>
            <div>Training Registration Receipt</div>
            <div><strong>${receiptData.registrationId}</strong></div>
          </div>
          <div class="divider"></div>
          <div class="section info-grid">
            <div>
              <h3>Participant Information</h3>
              <p><strong>Name:</strong> ${receiptData.customer}</p>
              <p><strong>Email:</strong> ${receiptData.email}</p>
              <p><strong>Phone:</strong> ${receiptData.phone}</p>
            </div>
            <div>
              <h3>Registration Details</h3>
              <p><strong>Date:</strong> ${receiptData.date}</p>
              <p><strong>Time:</strong> ${receiptData.time}</p>
              <p><strong>Status:</strong> ${receiptData.status}</p>
            </div>
          </div>
          <div class="section">
            <h3>Training Details</h3>
            <p><strong>Program:</strong> ${receiptData.program}</p>
            <p><strong>Duration:</strong> ${receiptData.duration}</p>
            <p><strong>Training Date:</strong> ${receiptData.trainingDate}</p>
            <p><strong>Amount:</strong> ${receiptData.price}</p>
          </div>
          <div class="section">
            <h3>Payment Information</h3>
            <p><strong>Method:</strong> ${receiptData.paymentMethod}</p>
            ${receiptData.transactionId ? `<p><strong>Transaction ID:</strong> ${receiptData.transactionId}</p>` : ''}
          </div>
          <div class="divider"></div>
          <div class="footer">
            <p>Thank you for registering with Kigali Rabbit Farm</p>
            <p>We will contact you with further details about your training</p>
          </div>
        </body>
        </html>`;
      
      const blob = new Blob([receiptHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `training-receipt-${receiptData.registrationId}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Programs Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-green-800 mb-4">Rabbit Farming Training Programs</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Gain practical skills and knowledge from experienced rabbit farming professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {programs.map(program => (
            <div key={program.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{program.title}</h2>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-500">{program.duration}</span>
                </div>
                <button
                  onClick={() => handleProgramSelect(program)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                >
                  Register Now
                </button>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">What's included:</h3>
                <ul className="space-y-2">
                  {program.features?.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      {feature.included ? (
                        <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      ) : (
                        <FaTimes className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                      )}
                      <span className="text-gray-600">{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Registration Modal */}
      {showModal && selectedProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 relative">
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>

              {step === 1 && (
                <form onSubmit={handleApplicationSubmit} className="space-y-6">
                  <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
                    Register for {selectedProgram.title}
                  </h2>
                  
                  {/* Form fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaUser className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaEnvelope className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaPhone className="text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="0780 123 456"
                        />
                      </div>
                    </div>

                    {/* Location Field */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        Location <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaMapMarkerAlt className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          required
                          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Kigali, Rwanda"
                        />
                      </div>
                    </div>

                    {/* Experience Field */}
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2">
                        Previous Rabbit Farming Experience
                      </label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select your experience level</option>
                        <option value="none">No experience</option>
                        <option value="beginner">Beginner (less than 1 year)</option>
                        <option value="intermediate">Intermediate (1-3 years)</option>
                        <option value="advanced">Advanced (3+ years)</option>
                      </select>
                    </div>

                    {/* Preferred Date Field */}
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2">
                        Preferred Training Date
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaCalendarAlt className="text-gray-400" />
                        </div>
                        <input
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleChange}
                          className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>

                    {/* Questions Field */}
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2">
                        Questions or Special Requests
                      </label>
                      <textarea
                        name="questions"
                        value={formData.questions}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Any specific topics you'd like covered?"
                      ></textarea>
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-start">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-1"
                    />
                    <label htmlFor="terms" className="ml-2 block text-gray-700">
                      I agree to the <a href="#" className="text-green-600 hover:underline">terms and conditions</a>
                    </label>
                  </div>

                  {/* Message Display */}
                  {message.text && (
                    <p className={`mt-2 text-center ${message.isError ? 'text-red-600' : 'text-green-600'}`}>
                      {message.text}
                    </p>
                  )}

                  {/* Submit Button */}
                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <FaSpinner className="animate-spin mr-2 inline" />
                          Processing...
                        </>
                      ) : selectedProgram.requiresPayment ? 'Continue to Payment' : 'Submit Registration'}
                    </button>
                  </div>
                </form>
              )}

              {step === 2 && (
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
                    Payment for {selectedProgram.title}
                  </h2>
                  
                  {/* Order Summary */}
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h3 className="font-bold text-lg mb-2">Order Summary</h3>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">Program:</span>
                      <span>{selectedProgram.title}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">Duration:</span>
                      <span>{selectedProgram.duration}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">Date:</span>
                      <span>{formData.preferredDate || 'To be confirmed'}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-3 pt-2 border-t border-gray-200">
                      <span>Total:</span>
                      <span>{selectedProgram.priceDisplay}</span>
                    </div>
                  </div>

                  {/* Payment Action */}
                  <div className="mb-6">
                    <button
                      type="button"
                      onClick={makePayment}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 mb-4"
                    >
                      Pay with IremboPay
                    </button>

                    {/* Test Payment Button (remove in production) 
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentData(prev => ({
                          ...prev,
                          transactionId: `TEST-${Math.random().toString(36).substr(2, 9)}`,
                          method: 'mobile'
                        }));
                        setMessage({
                          text: 'Test payment successful. Click confirm to proceed.',
                          isError: false
                        });
                      }}
                      className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-md transition-colors duration-300"
                    >
                      Simulate Test Payment
                    </button>*/}
                  </div>

                  {/* Transaction ID 
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
                      Transaction ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={paymentData.transactionId}
                      onChange={(e) => setPaymentData({ ...paymentData, transactionId: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Enter your payment transaction ID"
                      required
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      After making payment, enter the transaction ID you received here.
                    </p>
                  </div>*/}

                  {/* Message Display */}
                  {message.text && (
                    <p className={`mt-2 text-center ${message.isError ? 'text-red-600' : 'text-green-600'}`}>
                      {message.text}
                    </p>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                      disabled={isLoading}
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center justify-center"
                      disabled={isLoading || !paymentData.transactionId}
                    >
                      {isLoading ? (
                        <>
                          <FaSpinner className="animate-spin mr-2" />
                          Confirming...
                        </>
                      ) : (
                        'Confirm Payment'
                      )}
                    </button>
                  </div>
                </form>
              )}

              {step === 3 && receiptData && (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-700 mb-2">
                    {receiptData.status === 'Pending'
                      ? 'Registration Received!'
                      : 'Registration Complete!'}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {receiptData.status === 'Pending'
                      ? 'Please complete your payment to confirm your registration.'
                      : `Thank you for registering for ${selectedProgram.title}. We'll contact you with further details.`}
                  </p>

                  {/* Registration Details */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg max-w-md mx-auto">
                    <h4 className="font-bold mb-2">Registration Details</h4>
                    <p className="mb-1">{selectedProgram.title}</p>
                    <p className="mb-1">Duration: {selectedProgram.duration}</p>
                    <p className="mb-1">Date: {receiptData.trainingDate}</p>
                    {selectedProgram.requiresPayment && (
                      <p className="font-bold">Amount: {receiptData.price}</p>
                    )}
                    <p className="mt-2 text-sm">Reference ID: {receiptData.registrationId}</p>
                    {receiptData.transactionId && (
                      <p className="text-sm">Transaction ID: {receiptData.transactionId}</p>
                    )}
                  </div>

                  {/* Download Buttons */}
                  <div className="flex justify-center space-x-4 mb-6">
                    <button
                      onClick={() => downloadReceipt('pdf')}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center"
                    >
                      <FaPrint className="mr-2" /> PDF Receipt
                    </button>
                    <button
                      onClick={() => downloadReceipt('html')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center"
                    >
                      <FaPrint className="mr-2" /> HTML Receipt
                    </button>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={handleCloseModal}
                    className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-6 rounded transition-colors duration-300"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Training;