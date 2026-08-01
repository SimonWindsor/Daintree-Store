import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutAccount from '../components/CheckoutAccount';
import CheckoutShipping from '../components/CheckoutShipping';
import CheckoutPayment from '../components/CheckoutPayment';
import CheckoutReview from '../components/CheckoutReview';
import './CheckoutPage.css';

function CheckoutPage() {
  const [stage, setStage] = useState(1); // 1: Account 2: Shipping, 3: Payment, 4: Review
  const navigate = useNavigate();

  return (
    <div className="CheckOutPage">
      {stage === 1 && <CheckoutAccount />}
      {stage === 2 && <CheckoutShipping />}
      {stage === 3 && <CheckoutPayment />}
      {stage === 4 && <CheckoutReview />}
    </div>
  )
}

export default CheckoutPage;