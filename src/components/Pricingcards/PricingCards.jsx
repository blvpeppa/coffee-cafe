import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
// Inside component
export default function PricingCards() {
const navigate = useNavigate();
    const handleApply = (option) => {
        navigate('/pay', { state: { selectedOption: option } });
      };
}