import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

function CheckoutPage() {
  const [stage, setStage] = useState(1); // 1: Account 2: Shipping, 3: Payment, 4: Review
  const navigate = useNavigate();

  return (
    <div className="CheckOutPage">

    </div>
  )
}

export default CheckoutPage;