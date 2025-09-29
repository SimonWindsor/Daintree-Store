import { useContext } from 'react';
import { FunctionContext } from '../App';
import './CartPage.css';

function CartPage() {
  const { cart, addToCart, updateCartItem, clearCart} = useContext(FunctionContext);
  return (
    <div className="CartPage">

    </div>
  )
}

export default CartPage;