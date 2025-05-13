import React, { useState } from 'react';
import { FaCreditCard, FaMobileAlt, FaPrint, FaTimes, FaArrowRight, FaSpinner, FaCheck, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { jsPDF } from 'jspdf';
import logo from "../../assets/logo2.png";
import l from "../../assets/pure-julia-uLoWIMCeodM-unsplash.jpg";

const Training = () => {
  const navigate = useNavigate();
  const handleMoreTrainingClick = () => {
    navigate('/training');
    window.scrollTo(0, 0);
  };

  const trainingPrograms = [
    {
      id: 1,
      title: "Beginner Rabbit Farming",
      description: "Learn the fundamentals of rabbit husbandry, housing, and basic care.",
      duration: "2 days",
      price: "100,000 frws",
      numericPrice: 100000,
      image: l,
      requiresPayment: true
    },
    {
      id: 2,
      title: "Advanced Breeding Techniques",
      description: "Master rabbit breeding, genetics, and reproduction management.",
      duration: "3 days",
      price: "200,000 frws",
      numericPrice: 200000,
      image: l,
      requiresPayment: true
    },
    {
      id: 3,
      title: "Rabbit Health & Disease Management",
      description: "Comprehensive training on rabbit health, common diseases, and prevention.",
      duration: "2 days",
      price: "150,000 frws",
      numericPrice: 150000,
      image: l,
      requiresPayment: true
    },
    {
      id: 4,
      title: "Rabbit Business Fundamentals",
      description: "Learn how to turn your rabbit farming into a profitable business.",
      duration: "3 days",
      price: "250,000 frws",
      numericPrice: 250000,
      image: l,
      requiresPayment: true
    }
  ];

  // State management
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    preferredDate: '',
    questions: ''
  });
  
  const [step, setStep] = useState(1); // 1: application, 2: payment, 3: confirmation
  const [message, setMessage] = useState({ text: '', isError: false });
  const [receiptData, setReceiptData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Handlers
  const handleSelectProgram = (program) => {
    setSelectedProgram(program);
    setStep(1);
    setMessage({ text: '', isError: false });
  };

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      setMessage({ text: 'Please fill all required fields', isError: true });
      return;
    }

    if (selectedProgram.requiresPayment) {
      setStep(2);
    } else {
      handleFreeRegistration();
    }
  };

  const handleFreeRegistration = async () => {
    try {
      setIsProcessing(true);
      setMessage({ text: 'Processing registration...', isError: false });

      // Generate receipt for free registration
      generateReceipt({
        registrationId: Date.now(),
        status: 'completed',
        paymentMethod: 'free'
      });
      setStep(3);
    } catch (error) {
      console.error('Registration error:', error);
      setMessage({ text: 'An error occurred during registration', isError: true });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFlutterwavePayment = () => {
    if (!formData.email || !formData.name) {
      setMessage({ text: 'Please complete the application form first', isError: true });
      return null;
    }

    return {
      public_key: 'FLWPUBK_TEST-33a6aff2a70fd1845eed0d3784f9e212-X',
      tx_ref: Date.now().toString(),
      amount: selectedProgram.numericPrice,
      currency: 'RWF',
      payment_options: 'card,mobilemoney,ussd',
      customer: {
        email: formData.email,
        phone_number: formData.phone || '250780000000',
        name: formData.name,
      },
      customizations: {
        title: 'Kigali Rabbit Farm',
        description: `Payment for ${selectedProgram.title} Training`,
        logo: logo,
      },
      callback: (response) => {
        console.log('Payment response:', response);
        if (response.status === 'successful') {
          generateReceipt({
            registrationId: Date.now(),
            status: 'completed',
            transactionId: response.transaction_id,
            paymentMethod: response.payment_type
          });
          setStep(3);
        } else {
          setMessage({ text: 'Payment was not successful', isError: true });
        }
        closePaymentModal();
      },
      onClose: () => {
        setMessage({ text: 'Payment window closed', isError: false });
      },
    };
  };

  const generateReceipt = (apiData) => {
    const receipt = {
      id: apiData.registrationId ? `TRAIN-${apiData.registrationId.toString().padStart(6, '0')}` : `TRAIN-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      customer: apiData.name || formData.name,
      email: apiData.email || formData.email,
      program: selectedProgram.title,
      price: selectedProgram.price,
      duration: selectedProgram.duration,
      trainingDate: formData.preferredDate || 'To be confirmed',
      paymentMethod: apiData.paymentMethod || 'Not Applicable',
      status: apiData.status || 'Completed',
      transactionId: apiData.transactionId || null
    };
    
    setReceiptData(receipt);
    setMessage({ 
      text: apiData.status === 'pending' ? 
        'Payment initiated! Check your phone to complete the transaction' : 
        'Registration successful!', 
      isError: false 
    });
  };

  const generatePDFReceipt = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.setTextColor(40, 103, 45);
    doc.text('Kigali Rabbit Farm', 105, 20, null, null, 'center');
    
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Training Registration Receipt', 105, 30, null, null, 'center');
    
    doc.setFontSize(12);
    doc.text(`Receipt ID: ${receiptData.id}`, 20, 50);
    doc.text(`Date: ${receiptData.date} at ${receiptData.time}`, 20, 60);
    doc.text(`Participant: ${receiptData.customer}`, 20, 70);
    doc.text(`Email: ${receiptData.email}`, 20, 80);
    doc.text(`Program: ${receiptData.program}`, 20, 90);
    doc.text(`Duration: ${receiptData.duration}`, 20, 100);
    doc.text(`Training Date: ${receiptData.trainingDate}`, 20, 110);
    doc.text(`Amount: ${receiptData.price}`, 20, 120);
    doc.text(`Payment Method: ${receiptData.paymentMethod}`, 20, 130);
    
    if (receiptData.transactionId) {
      doc.text(`Transaction ID: ${receiptData.transactionId}`, 20, 140);
    }
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const noteY = receiptData.transactionId ? 170 : 160;
    doc.text('Thank you for your registration. We will contact you with further details.', 20, noteY);
    
    doc.save(`training_receipt_${receiptData.id}.pdf`);
  };

  const resetForm = () => {
    setSelectedProgram(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      location: '',
      experience: '',
      preferredDate: '',
      questions: ''
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
          <h2 className="text-3xl font-bold text-gray-800">Rabbit Farming Training Programs</h2>
          <p className="text-gray-600 mt-2">Gain practical skills and knowledge from experienced rabbit farming professionals</p>
        </div>

        {/* Training Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {trainingPrograms.map((program) => (
            <div key={program.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div 
                className="h-48 bg-cover bg-center" 
                style={{ backgroundImage: `url(${program.image})` }}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{program.title}</h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-green-700">{program.price}</span>
                  <button
                    onClick={() => handleSelectProgram(program)}
                    className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded transition-colors duration-300"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Registration Modal */}
        {selectedProgram && (
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
                      Register for {selectedProgram.title}
                    </h3>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">Full Name *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaUser className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full pl-10 p-2 border rounded"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">Email *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaEnvelope className="text-gray-400" />
                        </div>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full pl-10 p-2 border rounded"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">Phone Number *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaPhone className="text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="w-full pl-10 p-2 border rounded"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">Location *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaMapMarkerAlt className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          className="w-full pl-10 p-2 border rounded"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">Experience Level</label>
                      <select
                        value={formData.experience}
                        onChange={(e) => setFormData({...formData, experience: e.target.value})}
                        className="w-full p-2 border rounded"
                      >
                        <option value="">Select your experience</option>
                        <option value="none">No experience</option>
                        <option value="beginner">Beginner (less than 1 year)</option>
                        <option value="intermediate">Intermediate (1-3 years)</option>
                        <option value="advanced">Advanced (3+ years)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">Preferred Training Date</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaCalendarAlt className="text-gray-400" />
                        </div>
                        <input
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                          className="w-full pl-10 p-2 border rounded"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">Questions or Special Requests</label>
                      <textarea
                        value={formData.questions}
                        onChange={(e) => setFormData({...formData, questions: e.target.value})}
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
                        selectedProgram.requiresPayment ? 'Continue to Payment' : 'Submit Registration'
                      )}
                    </button>
                  </form>
                )}

                {/* Step 2: Payment Form */}
                {step === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      Payment for {selectedProgram.title}
                    </h3>
                    
                    <div className="bg-gray-100 p-4 rounded">
                      <p className="font-semibold">Amount Due: {selectedProgram.price}</p>
                      <p className="text-sm text-gray-600">Duration: {selectedProgram.duration}</p>
                    </div>
                    
                    <div className="text-center">
                      <FlutterWaveButton 
                        {...handleFlutterwavePayment()}
                        className="w-full bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded mt-4"
                      />
                    </div>
                    
                    {message.text && (
                      <p className={`mt-2 ${message.isError ? 'text-red-600' : 'text-green-600'}`}>
                        {message.text}
                      </p>
                    )}
                    
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
                    >
                      Back
                    </button>
                  </div>
                )}

                {/* Step 3: Confirmation */}
                {step === 3 && receiptData && (
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Registration Confirmed!</h3>
                    <p className="text-green-600 mb-6">{message.text}</p>
                    
                    <div className="bg-gray-100 p-4 rounded-lg mb-6 text-left">
                      <h4 className="font-bold mb-3">Registration Summary</h4>
                      <p><span className="font-semibold">Reference:</span> {receiptData.id}</p>
                      <p><span className="font-semibold">Program:</span> {receiptData.program}</p>
                      <p><span className="font-semibold">Duration:</span> {receiptData.duration}</p>
                      <p><span className="font-semibold">Training Date:</span> {receiptData.trainingDate}</p>
                      <p><span className="font-semibold">Amount:</span> {receiptData.price}</p>
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

        {/* More Training Button */}
        <div className="text-center mt-12">
          <button 
            onClick={handleMoreTrainingClick}
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded inline-flex items-center"
          >
            Explore More Training <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Training;