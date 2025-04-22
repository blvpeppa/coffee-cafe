import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const PaymentMethod = () => {
  const { state } = useLocation();
  const product = state?.selectedProduct;
  const navigate = useNavigate();

  const [selectedMethod, setSelectedMethod] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleContinue = () => {
    if (!selectedMethod || !agreed || !formData.name || !formData.email) {
      return alert("Please complete all fields and agree to the terms.");
    }

    navigate("/receipt", {
      state: {
        selectedProduct: product,
        selectedMethod,
        formData,
      },
    });
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        Choose Payment for: <br />
        <span className="text-green-700">{product?.name}</span>
      </h2>

      <div className="space-y-4 mb-6">
        <label>
          <input
            type="radio"
            value="MoMo"
            checked={selectedMethod === "MoMo"}
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          <span className="ml-2">Mobile Money (MoMo)</span>
        </label><br/>
        <label>
          <input
            type="radio"
            value="PayPal"
            checked={selectedMethod === "PayPal"}
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          <span className="ml-2">PayPal</span>
        </label><br/>
        <label>
          <input
            type="radio"
            value="Bank Transfer"
            checked={selectedMethod === "Bank Transfer"}
            onChange={(e) => setSelectedMethod(e.target.value)}
          />
          <span className="ml-2">Bank Transfer</span>
        </label>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-2 border rounded mb-3"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-2 border rounded"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      <label className="block mb-4">
        <input
          type="checkbox"
          checked={agreed}
          onChange={() => setAgreed(!agreed)}
        />
        <span className="ml-2">I agree to the payment terms.</span>
      </label>

      <button
        onClick={handleContinue}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Continue to Receipt
      </button>
    </div>
  );
};

export default PaymentMethod;
