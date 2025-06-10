import React, { useState } from 'react';
import { FaCreditCard, FaMobileAlt, FaPrint, FaTimes, FaArrowRight, FaSpinner, FaCheck, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { jsPDF } from 'jspdf';
import logo from "../../assets/logo2.png";
import l from "../../assets/pure-julia-uLoWIMCeodM-unsplash.jpg";
import g17 from '../../assets/G3.jpg';
import g7 from '../../assets/gallery-7.jpg';
import g20 from '../../assets/G6.jpg';
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
      numericPrice: 100000,
      image: g20,
      requiresPayment: true
    },
    {
      id: 2,
      title: "Advanced Breeding Techniques",
      description: "Master rabbit breeding, genetics, and reproduction management.",
      duration: "3 days",
      numericPrice: 200000,
      image: l,
      requiresPayment: true
    },
    {
      id: 3,
      title: "Rabbit Health & Disease Management",
      description: "Comprehensive training on rabbit health, common diseases, and prevention.",
      duration: "2 days",
      numericPrice: 150000,
      image: g7,
      requiresPayment: true
    },
    {
      id: 4,
      title: "Rabbit Business Fundamentals",
      description: "Learn how to turn your rabbit farming into a profitable business.",
      duration: "3 days",
      numericPrice: 250000,
      image: g17,
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
              </div>
            </div>
          ))}
        </div>

        {/* More Training Button */}
        <div className="text-center mt-12">
          <button 
            onClick={handleMoreTrainingClick}
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded inline-flex items-center"
          >
            Apply here <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Training;