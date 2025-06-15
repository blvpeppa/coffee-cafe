import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaMapMarkerAlt, FaUser, FaPhone, FaEnvelope, FaSpinner, FaCheck, FaTimes, FaPrint } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Training = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    experience: '',
    preferredDate: '',
    questions: ''
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
          priceDisplay: `${program.price.toLocaleString()} ${t('common.rwf')}`,
          requiresPayment: program.price > 0,
          features: program.features || []
        })));
      } catch (error) {
        console.error('Fetch error:', error);
        setMessage({
          text: t('errors.fetch_programs'),
          isError: true
        });
      }
    };
    fetchPrograms();
  }, [t]);

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
    setMessage({ text: '', isError: false });
    setReceiptData(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.location) {
      setMessage({ text: t('errors.required_fields'), isError: true });
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({ text: t('errors.invalid_email'), isError: true });
      return false;
    }

    return true;
  };

  const handleApplicationSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      setMessage({ text: t('messages.processing'), isError: false });

      const response = await axios.post(`${API_BASE_URL}/register`, {
        ...formData,
        programId: selectedProgram.id,
        amount: selectedProgram.price
      });

      if (response.data.success) {
        setReceiptData(response.data.data.receiptData || {
          registrationId: `TR-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          customer: formData.name,
          email: formData.email,
          phone: formData.phone,
          program: selectedProgram.title,
          duration: selectedProgram.duration,
          trainingDate: formData.preferredDate || t('receipt.to_be_confirmed'),
          price: selectedProgram.priceDisplay,
          paymentMethod: t('receipt.payment_pending'),
          status: t('receipt.pending_contact')
        });
        setStep(2);
      } else {
        setMessage({ text: response.data.message || t('errors.registration_failed'), isError: true });
      }
    } catch (error) {
      console.error('Registration error:', error);
      const errorMsg = error.response?.data?.message || t('errors.registration_error');
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
      doc.text(t('receipt.farm_name'), 105, 15, null, null, 'center');
      
      // Add receipt details
      doc.setFontSize(12);
      doc.text(`${t('receipt.receipt_id')}: ${receiptData.registrationId}`, 20, 30);
      doc.text(`${t('receipt.date')}: ${receiptData.date} ${t('receipt.at')} ${receiptData.time}`, 20, 40);
      doc.text(`${t('name')}: ${receiptData.customer}`, 20, 50);
      doc.text(`${t('email')}: ${receiptData.email}`, 20, 60);
      doc.text(`${t('phone')}: ${receiptData.phone}`, 20, 70);
      
      // Training details
      doc.text(`${t('receipt.program')}: ${receiptData.program}`, 20, 90);
      doc.text(`${t('receipt.duration')}: ${receiptData.duration}`, 20, 100);
      doc.text(`${t('receipt.training_date')}: ${receiptData.trainingDate}`, 20, 110);
      doc.text(`${t('receipt.amount')}: ${receiptData.price}`, 20, 120);
      doc.text(`${t('receipt.payment_method')}: ${receiptData.paymentMethod}`, 20, 130);
      
      // Save the PDF
      doc.save(`${t('receipt.filename_prefix')}-${receiptData.registrationId}.pdf`);
    } else {
      // HTML receipt implementation
      const receiptHtml = `<!DOCTYPE html>
        <html>
        <head>
          <title>${t('receipt.title')} - ${receiptData.registrationId}</title>
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
            <div class="title">${t('receipt.farm_name')}</div>
            <div>${t('receipt.title')}</div>
            <div><strong>${receiptData.registrationId}</strong></div>
          </div>
          <div class="divider"></div>
          <div class="section info-grid">
            <div>
              <h3>${t('receipt.participant_info')}</h3>
              <p><strong>${t('name')}:</strong> ${receiptData.customer}</p>
              <p><strong>${t('email')}:</strong> ${receiptData.email}</p>
              <p><strong>${t('phone')}:</strong> ${receiptData.phone}</p>
            </div>
            <div>
              <h3>${t('receipt.registration_details')}</h3>
              <p><strong>${t('receipt.date')}:</strong> ${receiptData.date}</p>
              <p><strong>${t('receipt.time')}:</strong> ${receiptData.time}</p>
              <p><strong>${t('receipt.status')}:</strong> ${receiptData.status}</p>
            </div>
          </div>
          <div class="section">
            <h3>${t('receipt.training_details')}</h3>
            <p><strong>${t('receipt.program')}:</strong> ${receiptData.program}</p>
            <p><strong>${t('receipt.duration')}:</strong> ${receiptData.duration}</p>
            <p><strong>${t('receipt.training_date')}:</strong> ${receiptData.trainingDate}</p>
            <p><strong>${t('receipt.amount')}:</strong> ${receiptData.price}</p>
          </div>
          <div class="section">
            <h3>${t('receipt.payment_info')}</h3>
            <p><strong>${t('receipt.payment_method')}:</strong> ${receiptData.paymentMethod}</p>
          </div>
          <div class="divider"></div>
          <div class="footer">
            <p>${t('receipt.thank_you')}</p>
            <p>${t('receipt.contact_soon')}</p>
          </div>
        </body>
        </html>`;
      
      const blob = new Blob([receiptHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${t('receipt.filename_prefix')}-${receiptData.registrationId}.html`;
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
          <h1 className="text-4xl font-extrabold text-green-800 mb-4">{t('training.title')}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('training.subtitle')}
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
                  {t('common.register_now')}
                </button>
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">{t('training.includes')}:</h3>
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
                    {t('')} {selectedProgram.title}
                  </h2>
                  
                  {/* Form fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name Field */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        {t('name')} <span className="text-red-500">*</span>
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
                          placeholder={t('name')}
                        />
                      </div>
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        {t('email')} <span className="text-red-500">*</span>
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
                          placeholder={t('email')}
                        />
                      </div>
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        {t('phone')} <span className="text-red-500">*</span>
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
                          placeholder={t('phone')}
                        />
                      </div>
                    </div>

                    {/* Location Field */}
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">
                        {t('location')} <span className="text-red-500">*</span>
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
                          placeholder={t('location')}
                        />
                      </div>
                    </div>

                    {/* Experience Field */}
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2">
                        {t('experience')}
                      </label>
                      <select
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">{t('select_experience')}</option>
                        <option value="none">{t('none')}</option>
                        <option value="beginner">{t('beginner')}</option>
                        <option value="intermediate">{t('intermediate')}</option>
                        <option value="advanced">{t('advanced')}</option>
                      </select>
                    </div>

                    {/* Preferred Date Field */}
                    <div className="md:col-span-2">
                      <label className="block text-gray-700 font-medium mb-2">
                        {t('preferred_date')}
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
                        {t('questions')}
                      </label>
                      <textarea
                        name="questions"
                        value={formData.questions}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder={t('questions')}
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
                      {t('agree to terms')}
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
                          {t('common.processing')}
                        </>
                      ) : t('submit_registration')}
                    </button>
                  </div>
                </form>
              )}

              {step === 2 && receiptData && (
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
                    {t('confirmation.title')}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {t('confirmation.message', { program: selectedProgram.title })}
                  </p>

                  {/* Registration Details */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg max-w-md mx-auto">
                    <h4 className="font-bold mb-2">{t('receipt.registration_details')}</h4>
                    <p className="mb-1">{selectedProgram.title}</p>
                    <p className="mb-1">{t('receipt.duration')}: {selectedProgram.duration}</p>
                    <p className="mb-1">{t('receipt.training_date')}: {receiptData.trainingDate}</p>
                    {selectedProgram.price > 0 && (
                      <p className="font-bold">{t('receipt.amount')}: {receiptData.price}</p>
                    )}
                    <p className="mt-2 text-sm">{t('receipt.reference_id')}: {receiptData.registrationId}</p>
                  </div>

                  {/* Download Buttons */}
                  <div className="flex justify-center space-x-4 mb-6">
                    <button
                      onClick={() => downloadReceipt('pdf')}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center"
                    >
                      <FaPrint className="mr-2" /> {t('receipt.download_pdf')}
                    </button>
                    <button
                      onClick={() => downloadReceipt('html')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300 flex items-center"
                    >
                      <FaPrint className="mr-2" /> {t('receipt.download_html')}
                    </button>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={handleCloseModal}
                    className="bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-6 rounded transition-colors duration-300"
                  >
                    {t('common.close')}
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