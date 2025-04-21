import react,{useState} from "react";
import { useNavigate } from "react-router-dom";
import BgImage from "../../assets/bg_4.jpg";
import Bgcontact from "../../assets/image_2.jpg";
import axios from "axios";
const Contact = () => {
    const info = [
      {
        icon: "fa-map-marker",
        label: "Address",
        value: "Nyamirambo, Nyarugenge Kigali, Rwanda"
      },
      {
        icon: "fa-phone",
        label: "Phone",
        value: "(+250) 780797881",
        link: "tel:+250780797881"
      },
      {
        icon: "fa-paper-plane",
        label: "Email",
        value: "info@kigalirabbit.org",
        link: "mailto:info@kigalirabbit.org"
      },
      {
        icon: "fa-globe",
        label: "Website",
        value: "kigalirabbits.org",
        link: "https://www.kigalirabbits.org/"
      }
    ];
  const [name,setName] = useState("")
  const [message,setMessage] = useState("")
  const [email,setEmail] = useState("")
  const [subject,setSubject] = useState("")
const navigate = useNavigate()
const dataSubmit = async () => {
  if (!name || !email || !subject || !message) {
    window.alert("Please fill in all fields.");
    return;
  }
  try {
    const response = await axios.post("http://localhost:7000/send/contact", {
      name: name,
      email: email,
      subject: subject,
      message: message,
    });

    if (response.status === 201) {
      window.alert("Contact was sent successfully.");
      navigate("/");
    }
  } catch (error) {
    console.error("Error contacting server:", error.response || error.message);
    window.alert("Failed to send contact. Please try again.");
  }
};
  
    return (
      <div>
  
        {/* Contact Section */}
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Get in Touch</h2>
            </div>
  
            {/* Info Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {info.map((item, i) => (
                <div key={i} className="bg-white p-6 rounded shadow text-center">
                  <div className="text-2xl text-green-600 mb-3">
                    <i className={`fa ${item.icon}`}></i>
                  </div>
                  <p className="font-semibold">{item.label}:</p>
                  <p>
                    {item.link ? (
                      <a href={item.link} className="text-blue-500 hover:underline">
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
              <div className="bg-white shadow-md rounded p-6">
                <h3 className="text-2xl font-bold mb-6">Contact Us</h3>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className="border border-gray-300 p-3 rounded w-full"
                      onChange={(e) =>setName(e.target.value)}
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      className="border border-gray-300 p-3 rounded w-full"
                      onChange={(e) =>setEmail(e.target.value)}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="border border-gray-300 p-3 rounded w-full mt-4"
                    onChange={(e) =>setSubject(e.target.value)}
                  />
                  <textarea
                    placeholder="Message"
                    className="border border-gray-300 p-3 rounded w-full mt-4"
                    onChange={(e) =>setMessage(e.target.value)}
                    rows="5"
                  ></textarea>
                  <button
                    type="submit"
                    className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                    onClick={()=>dataSubmit()}
                  >
                    Send Message
                  </button>
                </form>
              </div>
  
              {/* Right Image */}
              <div
                className="rounded shadow bg-cover bg-center h-[450px]"
                style={{ backgroundImage: `url(${Bgcontact})` }}
              ></div>
            </div>
          </div>
        </section>
      </div>
    );
  };
  export default Contact;
  