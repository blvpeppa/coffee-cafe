import React, { useState } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaPhone, FaEnvelope, FaInfoCircle } from 'react-icons/fa';
import { jsPDF } from 'jspdf';

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
    method: 'credit',
    cardNumber: '', 
    expiry: '', 
    cvv: '',
    mobileNumber: '',
    network: 'airtel'
  });

  const [step, setStep] = useState(1); // 1: application, 2: payment, 3: confirmation
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const trainingPrograms = [
    {
      id: 1,
      title: "Beginner Rabbit Farming",
      description: "Learn the fundamentals of rabbit husbandry, housing, and basic care.",
      duration: "2 days",
      price: 100000,
      priceDisplay: "100,000 frw",
      dates: ["15-16 June 2024", "20-21 July 2024"]
    },
    {
      id: 2,
      title: "Advanced Breeding Techniques",
      description: "Master rabbit breeding, genetics, and reproduction management.",
      duration: "3 days",
      price: 200000,
      priceDisplay: "200,000 frw",
      dates: ["5-7 August 2024", "10-12 September 2024"]
    },
    {
      id: 3,
      title: "Rabbit Health & Disease Management",
      description: "Comprehensive training on rabbit health, common diseases, and prevention.",
      duration: "2 days",
      price: 100000,
      priceDisplay: "100,000 frw",
      dates: ["25-26 October 2024", "15-16 November 2024"]
    },
    {
      id: 4,
      title: "Rabbits Artificial Insemination Course",
      description: "Learn advanced artificial insemination techniques for rabbits.",
      duration: "2 days",
      price: "",
      priceDisplay: "negociable",
      dates: ["25-26 October 2024", "15-16 November 2024"]
    }
  ];

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
      network: 'airtel'
    });
    setMessage('');
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
          id: `TRAIN-${Date.now()}`,
          registrationDate: new Date().toLocaleDateString(), // Changed from 'date' to 'registrationDate'
          time: new Date().toLocaleTimeString(),
          customer: formData.name,
          email: formData.email,
          program: selectedProgram.title,
          price: selectedProgram.price,
          duration: selectedProgram.duration,
          trainingDate: formData.preferredDate, // Changed from 'date' to 'trainingDate'
          paymentMethod: paymentData.method === 'credit' ? 'Credit Card' : 
                        paymentData.method === 'visa' ? 'Visa Card' :
                        paymentData.method === 'airtel' ? 'Airtel Money' : 'MTN Mobile Money',
          status: 'Completed',
          mobileNumber: paymentData.method === 'airtel' || paymentData.method === 'mtn' ? 
                       paymentData.mobileNumber : null
        };
  
        localStorage.setItem('latestTrainingReceipt', JSON.stringify(receiptData));
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
      const receiptData = JSON.parse(localStorage.getItem('latestTrainingReceipt'));
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
              @media print {
                body { padding: 0; }
                .no-print { display: none; }
              }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="receipt-title">Rabbit Farm Training</div>
              <div>Registration Receipt</div>
              <div><strong>${receiptData.id}</strong></div>
            </div>
  
            <div class="section info">
    <div>
      <h4>Participant Info</h4>
      <p><strong>Name:</strong> ${receiptData.customer}</p>
      <p><strong>Email:</strong> ${receiptData.email}</p>
      ${receiptData.mobileNumber ? `<p><strong>Phone:</strong> ${receiptData.mobileNumber}</p>` : ''}
    </div>
    <div>
      <h4>Registration Info</h4>
      <p><strong>Registration Date:</strong> ${receiptData.registrationDate}</p>
      <p><strong>Time:</strong> ${receiptData.time}</p>
      <p><strong>Status:</strong> ${receiptData.status}</p>
    </div>
  </div>
  
  <div class="section">
    <h4>Training Details</h4>
    <table class="summary-table">
      <thead>
        <tr>
          <th>Program</th>
          <th>Duration</th>
          <th>Training Date</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${receiptData.program}</td>
          <td>${receiptData.duration}</td>
          <td>${receiptData.trainingDate}</td>
          <td>$${receiptData.price}</td>
        </tr>
      </tbody>
    </table>
  </div>
  
            <div class="section">
              <p><strong>Payment Method:</strong> ${receiptData.paymentMethod}</p>
            </div>
  
            <div class="footer">
              <p>Thank you for registering with Rabbit Farm Training. We'll contact you with further details.</p>
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
        a.download = `training-receipt-${receiptData.id}.html`;
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
        doc.text('Rabbit Farm Training', 105, 15, null, null, 'center');
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.text(`Registration Receipt #${receiptData.id}`, 105, 25, null, null, 'center');
        doc.setDrawColor(200, 200, 200);
        doc.line(20, 30, 190, 30);
  
        // Add Registration Info
  doc.setTextColor(100, 100, 100);
  doc.text('Registration Information', 20, 40);
  doc.setTextColor(0, 0, 0);
  doc.text(`Date: ${receiptData.registrationDate}`, 20, 50);
  doc.text(`Time: ${receiptData.time}`, 20, 60);
  if (receiptData.mobileNumber) {
    doc.text(`Phone: ${receiptData.mobileNumber}`, 20, 70);
  }
  
  // Add Training Info
  doc.setTextColor(100, 100, 100);
  doc.text('Training Information', 20, 90);
  doc.setTextColor(0, 0, 0);
  doc.text(`Program: ${receiptData.program}`, 20, 100);
  doc.text(`Duration: ${receiptData.duration}`, 20, 110);
  doc.text(`Training Date: ${receiptData.trainingDate}`, 20, 120);
  doc.text(`Price: $${receiptData.price}`, 20, 130);
  
        // Add Payment Method
        doc.setTextColor(100, 100, 100);
        doc.text('Payment Information', 20, 150);
        doc.setTextColor(0, 0, 0);
        doc.text(`Method: ${receiptData.paymentMethod}`, 20, 160);
  
        // Add Footer
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text('Thank you for registering with Rabbit Farm Training', 105, 280, null, null, 'center');
        doc.text('We will contact you with further details', 105, 285, null, null, 'center');
  
        // Save the PDF
        doc.save(`training-receipt-${receiptData.id}.pdf`);
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
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {trainingPrograms.map(program => (
            <div key={program.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
             <div className="p-6">
                             <h3 className="text-2xl font-bold text-green-700 mb-3">{program.title}</h3>
                             <p className="text-gray-600 mb-4">{program.description}</p>
                             <div className="flex items-center text-gray-700 mb-2">
                               <FaCalendarAlt className="mr-2 text-green-600" />
                               <span><strong>Duration:</strong> {program.duration}</span>
                             </div>
                             <div className="flex items-center text-gray-700 mb-2">
                               <span className="font-bold">Price:</span> {program.priceDisplay}
                             </div>
                             <div className="mt-4">
                               <h4 className="font-semibold mb-2">Available Dates:</h4>
                               <ul className="space-y-1">
                                 {program.dates.map((date, idx) => (
                                   <li key={idx} className="flex items-center">
                                     <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                                     {date}
                                   </li>
                                 ))}
                               </ul>
                             </div>
                           </div>
              <div className="bg-gray-50 px-6 py-4">
                <button 
                  onClick={() => handleProgramSelect(program)}
                  className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                >
                  Register Now
                </button>
              </div>
            </div>
          ))}
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
                                        <label htmlFor="preferredDate" className="block text-gray-700 font-medium mb-2">
                                          Preferred Training Date
                                        </label>
                                        <select
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <option value="">Select preferred date</option>
                      {selectedProgram.dates.map((date, idx) => (
                        <option key={idx} value={date}>
                          {date}
                        </option>
                      ))}
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
                    <div className="text-center">
                      <button
                        type="submit"
                        className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
                      >
                        Continue to Payment
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

                {/* Payment Method Selection */}
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-3">Payment Method</label>
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
                      <label className="block text-gray-700 font-medium mb-2">Card Number *</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={paymentData.cardNumber}
                        onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">Expiry Date *</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={paymentData.expiry}
                          onChange={(e) => setPaymentData({ ...paymentData, expiry: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-medium mb-2">CVV *</label>
                        <input
                          type="text"
                          placeholder="123"
                          value={paymentData.cvv}
                          onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Mobile Money Form */}
                {(paymentData.method === 'airtel' || paymentData.method === 'mtn') && (
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">
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
                        className="flex-1 px-4 py-2 border rounded-r-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
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
                    ) : `Pay ${selectedProgram.priceDisplay}`}
                  </button>
                </div>
                
                {message && (
                  <p className={`mt-4 text-sm text-center ${message.includes('failed') ? 'text-red-600' : 'text-green-600'}`}>
                    {message}
                  </p>
                )}
                  </form>
                )}

                {step === 3 && (
                  <div className="text-center py-8">
                    {/* ... confirmation content ... */}
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-green-700 mb-2">Registration Complete!</h3>
                <p className="text-gray-600 mb-6">
                  Thank you for registering for {selectedProgram.title}. We'll contact you with further details.
                </p>

                <div className="mb-6 p-4 bg-gray-50 rounded-lg max-w-md mx-auto">
                  <h4 className="font-bold mb-2">Registration Details</h4>
                  <p className="mb-1">{selectedProgram.title}</p>
                  <p className="mb-1">Date: {formData.preferredDate}</p>
                  <p className="font-bold">Amount Paid: {selectedProgram.priceDisplay}</p>
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