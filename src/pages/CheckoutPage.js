import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FunctionContext } from '../App';
import CheckoutAccount from '../components/CheckoutAccount';
import CheckoutShipping from '../components/CheckoutShipping';
import CheckoutPayment from '../components/CheckoutPayment';
import CheckoutReview from '../components/CheckoutReview';
import './CheckoutPage.css';

function CheckoutPage() {
  const [stage, setStage] = useState(1); // 1: Account 2: Shipping, 3: Payment, 4: Review
  const { withLoading, user, cart } = useContext(FunctionContext);
  const navigate = useNavigate();

  return (
    <div className="CheckoutPage">
      <h2 className='checkout-header'>Checkout</h2>
      {stage === 1 && <CheckoutAccount onStageChange={setStage} />}
      {stage === 2 && <CheckoutShipping onStageChange={setStage} />}
      {stage === 3 && <CheckoutPayment onStageChange={setStage} />}
      {stage === 4 && <CheckoutReview onStageChange={setStage} />}
    </div>
  )
}

export default CheckoutPage;