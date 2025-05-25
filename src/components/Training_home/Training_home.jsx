import React, { useState } from 'react';
import { FaCreditCard, FaMobileAlt, FaPrint, FaTimes, FaArrowRight, FaSpinner } from 'react-icons/fa';
import { Link, useNavigate } from "react-router-dom";
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';
import { jsPDF } from 'jspdf';
import pricing1 from "../../assets/pricing-1.jpg";
import pricing5 from "../../assets/government.jpg";
import pricing4 from "../../assets/academic.jpg";
import logo from "../../assets/logo2.png";

const Training_home = () => {
  const navigate = useNavigate();
  const handleMoreVisitsClick = () => {
    navigate('/tour');
    window.scrollTo(0, 0);
  };

  const pricingOptions = [
    {
      id: 1,
      title: 'Professional Visit',
      numericPrice: 20000,
      description: 'For researchers and professionals in related fields',
      image: pricing1,
      requiresPayment: true
    },
    {
      id: 2,
      title: 'Academic Visit',
      numericPrice: 400000,
      description: 'Special rates for school and university groups',
      image: pricing4,
      requiresPayment: true
    },
    {
      id: 3,
      title: 'Institutional Visit',
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

      // Generate receipt for free booking
      generateReceipt({
        bookingId: Date.now(),
        status: 'completed',
        paymentMethod: 'free'
      });
      setStep(3);
    } catch (error) {
      console.error('Booking error:', error);
      setMessage({ text: 'An error occurred during booking', isError: true });
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
      amount: selectedOption.numericPrice,
      currency: 'RWF',
      payment_options: 'card,mobilemoney,ussd',
      customer: {
        email: formData.email,
        phone_number: formData.phone || '250780000000',
        name: formData.name,
      },
      customizations: {
        title: 'Kigali Rabbit Farm',
        description: `Payment for ${selectedOption.title} Visit`,
        logo: logo,
      },
      callback: (response) => {
        console.log('Payment response:', response);
        if (response.status === 'successful') {
          generateReceipt({
            bookingId: Date.now(),
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
      id: apiData.bookingId ? `KRC-${apiData.bookingId.toString().padStart(6, '0')}` : `KRC-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      customer: apiData.name || formData.name,
      email: apiData.email || formData.email,
      service: selectedOption.title,
      amount: selectedOption.price,
      description: selectedOption.description,
      image: selectedOption.image,
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
    doc.text('Visit Confirmation Receipt', 105, 30, null, null, 'center');
    
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
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const noteY = receiptData.transactionId ? 150 : 140;
    doc.text('Thank you for your visit request. Present this receipt at the KRC entrance.', 20, noteY);
    
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
              </div>
            </div>
          ))}
        </div>

        {/* More Tours Button */}
        <div className="text-center mt-12">
          <button 
            onClick={handleMoreVisitsClick}
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded inline-flex items-center"
          >
            Apply here <FaArrowRight className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Training_home;