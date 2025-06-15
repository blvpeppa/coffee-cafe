import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FaPrint, FaTimes, FaSpinner, FaUsers, FaCheck } from 'react-icons/fa';
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
import Imite from '../../assets/Imite.jpg';

const PricingCards = () => {
  const { t } = useTranslation();
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
  
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState({ text: '', isError: false });
  const [receiptData, setReceiptData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const API_BASE_URL = 'https://umuhuza.store/api';

  useEffect(() => {
    const fetchPricingOptions = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/visit-options`);
        setPricingOptions(response.data.data.map(option => ({
          id: option.id,
          title: t(`pricing.options.${option.id}.title`),
          numericPrice: option.price,
          price: `${option.price.toLocaleString()} ${t('common.rwf')}`,
          description: t(`pricing.options.${option.id}.description`),
          image: getImageForOption(option.id),
          hoverImage: getHoverImageForOption(option.id),
          requiresPayment: option.price > 0,
          maxVisitors: option.max_visitors,
          includes: option.includes.map(item => t(`${item}`))
        })));
      } catch (error) {
        console.error('Error fetching pricing options:', error);
        setMessage({
          text: t('errors.fetch_options'),
          isError: true
        });
      }
    };
    fetchPricingOptions();
  }, [t]);

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
      case 5: return Imite;
      default: return s7;
    }
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setFormData(prev => ({
      ...prev,
      visitorsCount: 1
    }));
    setStep(1);
    setMessage({ text: '', isError: false });
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      setMessage({ text: t('errors.required_fields'), isError: true });
      return;
    }

    await handleBooking();
  };

  const handleBooking = async () => {
    try {
      setIsProcessing(true);
      setMessage({ text: t('messages.processing'), isError: false });

      const totalAmount = selectedOption.numericPrice * formData.visitorsCount;

      const response = await axios.post(`${API_BASE_URL}/book-visit`, {
        ...formData,
        visitType: selectedOption.id,
        amount: totalAmount,
        requiresPayment: selectedOption.requiresPayment,
        visitorsCount: formData.visitorsCount
      });

      generateReceipt({
        bookingId: response.data.data?.bookingId || `KRC-${Date.now()}`,
        status: 'pending',
        paymentMethod: selectedOption.requiresPayment ? 'pending' : 'free',
        totalAmount
      });
      setStep(2);
    } catch (error) {
      console.error('Booking error:', error);
      setMessage({ 
        text: error.response?.data?.message || t('errors.booking_error'), 
        isError: true 
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const generateReceipt = (apiData) => {
    const paymentMethod = selectedOption.requiresPayment ? 
      t('receipt.payment_pending') : t('receipt.free');

    const totalAmount = apiData.totalAmount || selectedOption.numericPrice * formData.visitorsCount;

    const receipt = {
      id: apiData.bookingId,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      customer: formData.name,
      email: formData.email,
      service: selectedOption.title,
      amount: `${totalAmount.toLocaleString()} ${t('common.rwf')}`,
      description: selectedOption.description,
      image: selectedOption.image,
      paymentMethod,
      status: apiData.status || t('receipt.pending'),
      visitDate: formData.visitDate || t('receipt.to_be_scheduled'),
      specialRequests: formData.specialRequests || t('common.none'),
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
    doc.text(t('receipt.farm_name'), 105, 20, null, null, 'center');
    
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text(t('receipt.title'), 105, 30, null, null, 'center');
    
    // Add receipt details
    doc.setFontSize(12);
    doc.text(`${t('receipt.request_id')}: ${receiptData.id}`, 20, 50);
    doc.text(`${t('receipt.date')}: ${receiptData.date} ${t('receipt.at')} ${receiptData.time}`, 20, 60);
    doc.text(`${t('form.name')}: ${receiptData.customer}`, 20, 70);
    doc.text(`${t('form.email')}: ${receiptData.email}`, 20, 80);
    doc.text(`${t('form.phone')}: ${formData.phone || t('common.not_provided')}`, 20, 90);
    doc.text(`${t('receipt.visit_type')}: ${receiptData.service}`, 20, 100);
    doc.text(`${t('form.visit_date')}: ${receiptData.visitDate}`, 20, 110);
    doc.text(`${t('form.visitors_count')}: ${receiptData.visitorsCount}`, 20, 120);
    doc.text(`${t('receipt.amount')}: ${receiptData.amount}`, 20, 130);
    doc.text(`${t('receipt.payment_status')}: ${receiptData.paymentMethod}`, 20, 140);
    doc.text(`${t('form.special_requests')}: ${receiptData.specialRequests}`, 20, 150);
    
    // Add included features
    doc.setFontSize(12);
    doc.text(t('receipt.included_features'), 20, 170);
    let yPosition = 180;
    receiptData.includes.forEach((item, index) => {
      doc.text(`✓ ${item}`, 25, yPosition);
      yPosition += 10;
    });
    
    // Add note
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(t('receipt.thank_you_note'), 20, yPosition + 10);
    
    // Save the PDF
    doc.save(`${t('receipt.filename_prefix')}_${receiptData.id}.pdf`);
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
    setStep(1);
    setMessage({ text: '', isError: false });
    setReceiptData(null);
    setIsProcessing(false);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">{t('pricing.title')}</h2>
          <p className="text-gray-600 mt-2">{t('pricing.subtitle')}</p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {pricingOptions.map((option) => (
            <div 
              key={option.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={option.image}
                  alt={option.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-0 transition-opacity duration-500"
                />
                <img
                  src={option.hoverImage}
                  alt={`${option.title} ${t('common.alternate_view')}`}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{option.title}</h3>
                <p className="text-gray-600 mb-4">{option.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-green-700 mb-2">{t('pricing.includes')}:</h4>
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
                  <button
                    onClick={() => handleSelectOption(option)}
                    className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded transition-colors duration-300"
                  >
                    {t('common.book_now')}
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
                <button
                  onClick={resetForm}
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  <FaTimes className="w-5 h-5" />
                </button>

                {step === 1 && (
                  <form onSubmit={handleApplicationSubmit} className="space-y-4">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">
                      {t('booking.title', { option: selectedOption.title })}
                    </h3>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">{t('form.name')} *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">{t('form.email')} *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">{t('form.phone')}</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">
                        {t('form.visitors_count')} *
                        {selectedOption.maxVisitors && (
                          <span className="text-sm text-gray-500 ml-2">
                            ({t('common.max')} {selectedOption.maxVisitors})
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
                    
                    {(selectedOption.title.includes(t('pricing.academic')) || selectedOption.title.includes(t('pricing.institutional'))) && (
                      <div>
                        <label className="block text-gray-700 mb-1">{t('form.institution')}</label>
                        <input
                          type="text"
                          value={formData.institution}
                          onChange={(e) => setFormData({...formData, institution: e.target.value})}
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-gray-700 mb-1">{t('form.visit_date')}</label>
                      <input
                        type="date"
                        value={formData.visitDate}
                        onChange={(e) => setFormData({...formData, visitDate: e.target.value})}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-1">{t('form.special_requests')}</label>
                      <textarea
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                        className="w-full p-2 border rounded"
                        rows="3"
                      />
                    </div>
                    
                    <div className="bg-gray-50 p-3 rounded">
                      <h4 className="font-semibold text-green-700 mb-2">{t('pricing.includes')}:</h4>
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
                          {t('common.processing')}
                        </>
                      ) : (
                        t('form.submit_request')
                      )}
                    </button>
                  </form>
                )}

                {step === 2 && receiptData && (
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('confirmation.title')}</h3>
                    <p className="text-green-600 mb-6">
                      {t('confirmation.message')}
                    </p>
                    
                    <div className="bg-gray-100 p-4 rounded-lg mb-6 text-left">
                      <h4 className="font-bold mb-3">{t('receipt.summary')}</h4>
                      <p><span className="font-semibold">{t('receipt.reference')}:</span> {receiptData.id}</p>
                      <p><span className="font-semibold">{t('receipt.visit_type')}:</span> {receiptData.service}</p>
                      <p><span className="font-semibold">{t('receipt.date')}:</span> {receiptData.date}</p>
                      <p><span className="font-semibold">{t('form.visitors_count')}:</span> {receiptData.visitorsCount}</p>
                      <p><span className="font-semibold">{t('receipt.amount')}:</span> {receiptData.amount}</p>
                      <p><span className="font-semibold">{t('receipt.payment_status')}:</span> {receiptData.paymentMethod}</p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
                      <h4 className="font-bold mb-3">{t('receipt.your_package_includes')}:</h4>
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
                        <span>{t('receipt.download_receipt')}</span>
                      </button>
                      <button
                        onClick={resetForm}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
                      >
                        {t('common.close')}
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