import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FunctionContext } from '../App';
import './CheckoutAccount.css';

function CheckoutAccount(props) {
  const { onStageChange } = props;
  const { user } = useContext(FunctionContext);
  const navigate = useNavigate();

  
  return (
    <div className="CheckoutAccount"> 
      {user ? (
        <div>
          <p>Signed in as {user.email}</p>
          <button onClick={() => onStageChange(3)}>Continue to Payment</button>
        </div>
      ) : (
        <div>
          <p>Would you like to log in?</p>
          <div classname="checkout-option-btns">
            <button 
              onClick={() => onStageChange(2)}
            >
              Checkout as Guest
            </button>
            <button
              onClick={() => navigate('/login', { state: { from: '/checkout' } })}
            >
              Log In
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 

export default CheckoutAccount;