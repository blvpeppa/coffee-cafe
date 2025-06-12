import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Bgcontact from "../../assets/image_2.jpg";
import axios from "axios";
// Notification component
const Notification = ({ type = "info", message, onClose }) => {
  const colors = {
    success: "bg-green-100 text-green-700 border-green-400",
    error: "bg-red-100 text-red-700 border-red-400",
    info: "bg-blue-100 text-blue-700 border-blue-400",
  };

  return (
    <div className={`border px-4 py-3 rounded relative mb-4 ${colors[type]}`}>
      <strong className="font-bold capitalize">{type}:</strong>{" "}
      <span className="block sm:inline">{message}</span>
      <button
        onClick={onClose}
        className="absolute top-0 bottom-0 right-0 px-4 py-3"
      >
        <span className="text-2xl text-black">&times;</span>
      </button>
    </div>
  );
};

const Contact = () => {
  const contactInfo = [
    {
      icon: "fa-map-marker",
      label: "Address",
      value: "Nyamirambo, Nyarugenge Kigali, Rwanda",
    },
    {
      icon: "fa-phone",
      label: "Phone",
      value: "(+250) 795880784",
      link: "tel:+250795880784",
    },
    {
      icon: "fa-paper-plane",
      label: "Email",
      value: "info@kigalirabbits.org",
      link: "https://mail.google.com/mail/?view=cm&to=info@kigalirabbits.org",
    },
    {
      icon: "fa-globe",
      label: "Website",
      value: "kigalirabbits.org",
      link: "https://www.kigalirabbits.org/",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (Object.values(formData).some((field) => !field.trim())) {
      setNotification({ type: "error", message: "Please fill in all fields." });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setNotification({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    setIsSubmitting(true);
    setNotification({ type: "", message: "" });

    try {
      const response = await axios.post(
        "https://umuhuza.store/send/contact",
        formData
      );
      if (response.status === 201) {
        setNotification({
          type: "success",
          message: "Your message was sent successfully.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      console.error("Error contacting server:", error.response || error.message);
      setNotification({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Get in Touch</h2>
            <div className="w-20 h-1 bg-green-600 mx-auto mt-4"></div>
          </div>

          {/* Info Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <div className="text-3xl text-green-600 mb-3">
                  <i className={`fa ${item.icon}`} aria-hidden="true"></i>
                </div>
                <p className="font-semibold text-gray-700 mb-1">{item.label}:</p>
                <p className="text-gray-600">
                  {item.link ? (
                    <a
                      href={item.link}
                      className="text-blue-500 hover:underline hover:text-blue-600 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Form + Image */}
          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Contact Form */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Contact Us
              </h3>

              {notification.message && (
                <Notification
                  type={notification.type}
                  message={notification.message}
                  onClose={() => setNotification({ type: "", message: "" })}
                />
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mt-4">
                  <textarea
                    name="message"
                    placeholder="Message"
                    className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors w-full font-medium disabled:opacity-70"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>

            {/* Image */}
            <div
              className="rounded-lg shadow-md h-[450px] bg-cover bg-center hidden md:block"
              style={{ backgroundImage: `url(${Bgcontact})` }}
              aria-label="Contact us visual"
            ></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
