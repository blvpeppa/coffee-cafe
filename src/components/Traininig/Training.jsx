import React, { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaPhone, FaEnvelope, FaInfoCircle, FaSpinner, FaCheck, FaTimes, FaPrint } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';

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
    method: 'flutterwave', // Default to Flutterwave
    cardNumber: '', 
    expiry: '', 
    cvv: '',
    mobileNumber: '',
    network: 'mtn'
  });

  const [step, setStep] = useState(1); // 1: application, 2: payment, 3: confirmation
  const [message, setMessage] = useState({ text: '', isError: false });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  
  const trainingPrograms = [
    {
      id: 1,
      title: "Beginner Rabbit Farming",
      description: "Learn the fundamentals of rabbit husbandry, housing, and basic care.",
      duration: "2 days",
      price: 100000,
      requiresPayment: true,
      features: [
        { text: "Basic rabbit care", included: true },
        { text: "Housing setup", included: true },
        { text: "Feeding techniques", included: true },
        { text: "Breeding basics", included: false },
        { text: "Disease prevention", included: false },
        { text: "Business fundamentals", included: false }
      ]
    },
    {
      id: 2,
      title: "Advanced Breeding Techniques",
      description: "Master rabbit breeding, genetics, and reproduction management.",
      duration: "3 days",
      price: 200000,
      requiresPayment: true,
      features: [
        { text: "Advanced genetics", included: true },
        { text: "Breeding strategies", included: true },
        { text: "Reproduction management", included: true },
        { text: "Pedigree analysis", included: true },
        { text: "Disease prevention", included: true },
        { text: "Business planning", included: true }
      ]
    },
    {
      id: 3,
      title: "Rabbit Health & Disease Management",
      description: "Comprehensive training on rabbit health, common diseases, and prevention.",
      duration: "2 days",
      price: 150000,
      requiresPayment: true,
      features: [
        { text: "Common diseases", included: true },
        { text: "Prevention methods", included: true },
        { text: "Treatment protocols", included: true },
        { text: "Vaccination schedules", included: true },
        { text: "Biosecurity", included: true },
        { text: "Business planning", included: false }
      ]
    },
    {
      id: 4,
      title: "Rabbits Artificial Insemination Course",
      description: "Learn how to turn your rabbit farming into a profitable business.",
      duration: "3 days",
      price: 250000,
      requiresPayment: true,
      features: [
        { text: "Market analysis", included: true },
        { text: "Business planning", included: true },
        { text: "Financial management", included: true },
        { text: "Marketing strategies", included: true },
        { text: "Value addition", included: true },
        { text: "Export opportunities", included: true }
      ]
    }
  ];

  // Flutterwave payment configuration
  const fwConfig = {
    public_key: 'FLWPUBK_TEST-XXXXXXXXXXXXXXXXXXXX', // Replace with your public key
    tx_ref: Date.now().toString(),
    amount: selectedProgram?.price || 0,
    currency: 'RWF',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: formData.email,
      phone_number: formData.phone || '250780000000',
      name: formData.name,
    },
    customizations: {
      title: 'Kigali Rabbit Farm',
      description: `Payment for ${selectedProgram?.title || 'Training Program'}`,
      logo: 'https://your-logo-url.png', // Add your logo URL
    },
  };

  const handleFlutterwavePayment = () => {
    if (!formData.email || !formData.name) {
      setMessage({ text: 'Please complete the application form first', isError: true });
      return null;
    }

    return {
      ...fwConfig,
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

const handleProgramSelect = (program) => {
    setSelectedProgram(program);
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
      method: 'credit',
      cardNumber: '', 
      expiry: '', 
      cvv: '',
      mobileNumber: '',
      network: 'mtn'
    });
    setMessage({ text: '', isError: false });
    setReceiptData(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone || !formData.location) {
      setMessage({ text: 'Please fill all required fields', isError: true });
      return;
    }

    if (selectedProgram.requiresPayment) {
      setStep(2);
    } else {
      handleFreeRegistration();
    }
    setMessage({ text: '', isError: false });
  };

  const handleFreeRegistration = async () => {
    try {
      setIsLoading(true);
      setMessage({ text: 'Processing registration...', isError: false });

      const response = await fetch('http://localhost:4700/api/training/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          experience: formData.experience,
          preferredDate: formData.preferredDate,
          questions: formData.questions,
          program: selectedProgram.title,
          programId: selectedProgram.id,
          price: selectedProgram.price,
          paymentMethod: 'free',
          status: 'registered'
        })
      });

      const data = await response.json();

      if (data.success) {
        generateReceipt(data.data);
        setStep(3);
      } else {
        setMessage({ text: data.message || 'Registration failed', isError: true });
      }
    } catch (error) {
      console.error('Registration error:', error);
      setMessage({ text: 'An error occurred during registration', isError: true });
    } finally {
      setIsLoading(false);
    }
  };
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    if (paymentData.method === 'flutterwave') {
      // Flutterwave handles the payment process
      return;
    }
    
    if ((paymentData.method === 'credit' || paymentData.method === 'visa') && 
        (!paymentData.cardNumber || !paymentData.expiry || !paymentData.cvv)) {
      setMessage({ text: 'Please fill all payment details', isError: true });
      return;
    }
    
    if ((paymentData.method === 'mtn' || paymentData.method === 'airtel') && !paymentData.mobileNumber) {
      setMessage({ text: 'Please enter mobile number', isError: true });
      return;
    }

    try {
      setIsLoading(true);
      setMessage({ text: 'Processing payment...', isError: false });

      const paymentPayload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        experience: formData.experience,
        preferredDate: formData.preferredDate,
        questions: formData.questions,
        program: selectedProgram.title,
        programId: selectedProgram.id,
        amount: selectedProgram.price,
        paymentMethod: paymentData.method === 'credit' || paymentData.method === 'visa' ? 'card' : 'mobile',
        ...(paymentData.method === 'mtn' || paymentData.method === 'airtel' ? {
          mobileNumber: paymentData.mobileNumber,
          network: paymentData.method // 'mtn' or 'airtel'
        } : {})
      };

      const response = await fetch('http://localhost:4700/api/training/payment', {
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
      setIsLoading(false);
    }
  };

  const generateReceipt = (apiData) => {
    const receipt = {
      id: apiData.registrationId ? `TRAIN-${apiData.registrationId.toString().padStart(6, '0')}` : `TRAIN-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      customer: apiData.name || formData.name,
      email: apiData.email || formData.email,
      program: selectedProgram.title,
      price: selectedProgram.priceDisplay,
      duration: selectedProgram.duration,
      trainingDate: apiData.preferredDate || formData.preferredDate,
      paymentMethod: apiData.paymentMethod || 
                   (selectedProgram.requiresPayment ? 
                    (paymentData.method === 'credit' ? 'Credit Card' : 
                     paymentData.method === 'visa' ? 'Visa Card' :
                     `${paymentData.network.toUpperCase()} Mobile Money`) : 
                    'Not Applicable'),
      status: apiData.status || 'Completed',
      transactionId: apiData.transactionId || null,
      mobileNumber: paymentData.mobileNumber || null
    };
    
    setReceiptData(receipt);
    setMessage({ 
      text: apiData.status === 'pending' ? 
        'Payment initiated! Check your phone to complete the transaction' : 
        'Registration successful!', 
      isError: false 
    });
  };

  const downloadReceipt = (format = 'pdf') => {
    if (!receiptData) return;

    if (format === 'pdf') {
      const doc = new jsPDF();
      
      // Add logo and header
      doc.setFontSize(20);
      doc.setTextColor(40, 103, 45);
      doc.text('Kigali Rabbit Farm', 105, 15, null, null, 'center');
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text('Training Registration Receipt', 105, 25, null, null, 'center');
      
      // Add receipt details
      doc.setFontSize(12);
      doc.text(`Receipt ID: ${receiptData.id}`, 20, 40);
      doc.text(`Date: ${receiptData.date} at ${receiptData.time}`, 20, 50);
      doc.text(`Customer: ${receiptData.customer}`, 20, 60);
      doc.text(`Email: ${receiptData.email}`, 20, 70);
      if (receiptData.mobileNumber) {
        doc.text(`Phone: ${receiptData.mobileNumber}`, 20, 80);
      }
      
      // Training details
      doc.text(`Program: ${receiptData.program}`, 20, 100);
      doc.text(`Duration: ${receiptData.duration}`, 20, 110);
      doc.text(`Training Date: ${receiptData.trainingDate || 'To be confirmed'}`, 20, 120);
      doc.text(`Amount: ${receiptData.price}`, 20, 130);
      doc.text(`Payment Method: ${receiptData.paymentMethod}`, 20, 140);
      if (receiptData.transactionId) {
        doc.text(`Transaction ID: ${receiptData.transactionId}`, 20, 150);
      }
      
      // Add note
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('Thank you for your registration. We will contact you with further details.', 20, 180);
      
      // Save the PDF
      doc.save(`training-receipt-${receiptData.id}.pdf`);
    } else {
      // HTML receipt implementation
      const receiptHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Training Receipt - ${receiptData.id}</title>
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
            <div><strong>${receiptData.id}</strong></div>
          </div>
          
          <div class="divider"></div>
          
          <div class="section info-grid">
            <div>
              <h3>Participant Information</h3>
              <p><strong>Name:</strong> ${receiptData.customer}</p>
              <p><strong>Email:</strong> ${receiptData.email}</p>
              ${receiptData.mobileNumber ? `<p><strong>Phone:</strong> ${receiptData.mobileNumber}</p>` : ''}
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
            <p><strong>Training Date:</strong> ${receiptData.trainingDate || 'To be confirmed'}</p>
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
        </html>
      `;
      
      const blob = new Blob([receiptHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `training-receipt-${receiptData.id}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-green-800 mb-4">Rabbit Farming Training Programs</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Gain practical skills and knowledge from experienced rabbit farming professionals.
          </p>
        </div>
        
        {/* Updated Cards Section */}
        <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-stretch md:grid-cols-4 md:gap-8">
            {trainingPrograms.map(program => (
              <div key={program.id} className="divide-y divide-gray-200 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6 sm:px-8">
                  <h2 className="text-lg font-medium text-gray-900">
                    {program.title}
                    <span className="sr-only">Plan</span>
                  </h2>

                  <p className="mt-2 text-gray-700">{program.description}</p>

                  <p className="mt-2 sm:mt-4">
                    <strong className="text-3xl font-bold text-gray-900 sm:text-4xl">
                      {program.priceDisplay}
                    </strong>
                    <span className="text-sm font-medium text-gray-700"> / {program.duration}</span>
                  </p>

                  <button
                    onClick={() => handleProgramSelect(program)}
                    className="mt-4 block w-full rounded-md border border-green-600 bg-green-600 px-12 py-3 text-center text-sm font-medium text-white hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:mt-6"
                  >
                    Register Now
                  </button>
                </div>

                <div className="p-6 sm:px-8">
                  <p className="text-lg font-medium text-gray-900 sm:text-xl">What's included:</p>

                  <ul className="mt-2 space-y-2 sm:mt-4">
                    {program.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-1">
                        {feature.included ? (
                          <FaCheck className="h-5 w-5 text-green-600" />
                        ) : (
                          <FaTimes className="h-5 w-5 text-red-600" />
                        )}
                        <span className="text-gray-700">{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        {showModal && selectedProgram && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                {/* Close button */}
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
                    <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
                      Register for {selectedProgram.title}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaUser className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>
                    
                      <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaEnvelope className="text-gray-400" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                    
                      <div>
                        <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaPhone className="text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="0780 123 456"
                          />
                        </div>
                      </div>
                    
                      <div>
                        <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
                          Location <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaMapMarkerAlt className="text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Kigali, Rwanda"
                          />
                        </div>
                      </div>
                    
                      <div className="md:col-span-2">
                        <label htmlFor="experience" className="block text-gray-700 font-medium mb-2">
                          Previous Rabbit Farming Experience
                        </label>
                        <select
                          id="experience"
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
                      <div className="md:col-span-2">
                        <label htmlFor="questions" className="block text-gray-700 font-medium mb-2">
                          Questions or Special Requests
                        </label>
                        <textarea
                          id="questions"
                          name="questions"
                          value={formData.questions}
                          onChange={handleChange}
                          rows="4"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                          placeholder="Any specific topics you'd like covered?"
                        ></textarea>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        required
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label htmlFor="terms" className="ml-2 block text-gray-700">
                        I agree to the <a href="#" className="text-green-600 hover:underline">terms and conditions</a>
                      </label>
                    </div>

                    {message.text && (
                      <p className={`mt-2 text-center ${message.isError ? 'text-red-600' : 'text-green-600'}`}>
                        {message.text}
                      </p>
                    )}

                    <div className="text-center">
                      <button
                        type="submit"
                        className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300 flex items-center justify-center mx-auto"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <FaSpinner className="animate-spin mr-2" />
                            Processing...
                          </>
                        ) : (
                          selectedProgram.requiresPayment ? 'Continue to Payment' : 'Submit Registration'
                        )}
                      </button>
                    </div>
                  </form>
                )}

  {step === 2 && (
    <form onSubmit={handlePaymentSubmit} className="space-y-6">
      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">
        Payment for {selectedProgram.title}
      </h2>
      <div className="p-4 bg-gray-50 rounded-lg">
        <h3 className="font-bold text-lg mb-2">Order Summary</h3>
        <div className="flex justify-between mb-1">
          <span>Training Program:</span>
          <span>{selectedProgram.title}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Duration:</span>
          <span>{selectedProgram.duration}</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Selected Date:</span>
          <span>{formData.preferredDate || 'Not selected'}</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-3">
          <span>Total:</span>
          <span>{selectedProgram.priceDisplay}</span>
        </div>
      </div>

      {/* Updated Payment Method Selection */}
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-3">Payment Method</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handlePaymentMethodChange('flutterwave')}
            className={`px-4 py-2 rounded-md border ${
              paymentData.method === 'flutterwave' 
                ? 'bg-blue-100 border-blue-500 text-blue-700' 
                : 'bg-white border-gray-300'
            }`}
          >
            Flutterwave
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
        </div>
      </div>

      {/* Show Flutterwave payment button when selected */}
      {paymentData.method === 'flutterwave' && (
        <div className="text-center">
          <FlutterWaveButton 
            {...handleFlutterwavePayment()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          />
        </div>
      )}

      {/* Keep existing payment forms for other methods */}
      {(paymentData.method === 'mtn' || paymentData.method === 'airtel') && (
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            {paymentData.method === 'mtn' ? 'MTN' : 'Airtel'} Mobile Number *
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
              +250
            </span>
            <input
              type="tel"
              placeholder={`7XXXXXXXX (${paymentData.method === 'mtn' ? 'MTN' : 'Airtel'} number)`}
              value={paymentData.mobileNumber}
              onChange={(e) => setPaymentData({ ...paymentData, mobileNumber: e.target.value })}
              className="flex-1 px-4 py-2 border rounded-r-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            You'll receive a payment request on your {paymentData.method === 'mtn' ? 'MTN' : 'Airtel'} number
          </p>
        </div>
      )}

      {message.text && (
        <p className={`mt-2 text-center ${message.isError ? 'text-red-600' : 'text-green-600'}`}>
          {message.text}
        </p>
      )}

      <div className="flex space-x-3">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 flex-grow"
          disabled={isLoading}
        >
          Back
        </button>
        {paymentData.method !== 'flutterwave' && (
          <button 
            type="submit" 
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex-grow flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Processing...
              </>
            ) : `Pay ${selectedProgram.priceDisplay}`}
          </button>
        )}
      </div>
    </form>
  )}

   {step === 3 && receiptData && (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-green-700 mb-2">
                      {receiptData.status === 'pending' ? 'Payment Initiated!' : 'Registration Complete!'}
                    </h3>
                    <p className="text-gray-600 mb-6">
                      {receiptData.status === 'pending' ? 
                        'Please check your phone to complete the payment' : 
                        `Thank you for registering for ${selectedProgram.title}. We'll contact you with further details.`}
                    </p>

                    <div className="mb-6 p-4 bg-gray-50 rounded-lg max-w-md mx-auto">
                      <h4 className="font-bold mb-2">Registration Details</h4>
                      <p className="mb-1">{selectedProgram.title}</p>
                      <p className="mb-1">Duration: {selectedProgram.duration}</p>
                      <p className="mb-1">Date: {receiptData.trainingDate || 'To be confirmed'}</p>
                      {selectedProgram.requiresPayment && (
                        <p className="font-bold">Amount Paid: {selectedProgram.priceDisplay}</p>
                      )}
                      {receiptData.transactionId && (
                        <p className="text-sm mt-2">Transaction ID: {receiptData.transactionId}</p>
                      )}
                    </div>

                    <div className="flex justify-center space-x-4">
                      <button
                        onClick={() => downloadReceipt('pdf')}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                      >
                        Download PDF Receipt
                      </button>
                      <button
                        onClick={() => downloadReceipt('html')}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                      >
                        Download HTML Receipt
                      </button>
                    </div>
                    <button 
                      onClick={handleCloseModal}
                      className="mt-6 bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-6 rounded transition-colors duration-300"
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
    </div>
  );
};

export default Training;