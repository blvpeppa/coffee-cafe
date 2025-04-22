import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const Receipt = () => {
  const { state } = useLocation();
  const [message, setMessage] = useState('');
  const product = state?.selectedProduct;
const paymentMethod = state?.selectedMethod;
const formData = state?.formData;

useEffect(() => {
    const sendData = async () => {
      const res = await fetch("http://localhost:7000/api/apply", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          selectedOption: product?.name,
          paymentMethod,
          tour_id: product?.id || 1
        }),
      });
  
      const data = await res.json();
      setMessage(data.message);
    };
  
    sendData();
  }, []);  

  const handleDownload = () => {
    const receiptData = `
      Customer: ${formData.name}
      Email: ${formData.email}
      Product: ${product.name}
      Payment Method: ${paymentMethod}
      Price: ${product.price}
      Confirmation: ${message}
      Date: ${new Date().toLocaleString()}
    `;
    const blob = new Blob([receiptData], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${product.name.replace(/\s+/g, "_")}_receipt.txt`;
    link.click();
  };  
  
  return (
    <div className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Payment Complete</h2>
      <p>{message}</p>
      <button
        onClick={handleDownload}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Download Receipt
      </button>
    </div>
  );
};

export default Receipt;
