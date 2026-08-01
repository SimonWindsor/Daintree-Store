import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartCard from '../components/CartCard';
import { FunctionContext } from '../App';
import './CartPage.css';

import { getItemById } from '../services/api.js';

function CartPage() {
  const { withLoading, cart, updateCartItem, clearCart} = useContext(FunctionContext);
  const [cartItems, setCartItems] = useState(cart);
  const [total, setTotal] = useState('$0');
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length > 0) {
      withLoading(async () => {
        const enriched = await Promise.all(cart.map(async (item) => {
          const response = await getItemById(item.itemId);

          return {...item, ...response};
        }));
        setCartItems(enriched);
      });
    } else {
      setCartItems([]);
    }
  }, [cart, withLoading])

  useEffect(() =>{
    const calculateTotal = () => {
      if (cartItems.length === 0) {
        setTotal("0.00");
        return;
      }

      const totalPrice = cartItems.reduce((acc, item) => {
        if (!item.price) return acc; // return 0 incase price is missing

        return acc + (Number(item.price.replace('$', '')) * item.quantity);
      }, 0);
      setTotal(`$${totalPrice.toFixed(2)}`);
    };

    calculateTotal();
  }, [cartItems]);


  return (
    <div className="CartPage">
      <h2>Your Cart</h2>
      <div className='cart-list'>
        {cartItems.length > 0 && cartItems[0].price ? cartItems.map((item) => (
          <CartCard
            key={item.itemId}
            onUpdate={updateCartItem}
            {...item }
          />
        )) : <p>Cart is empty</p>}
      </div>
      <div className="cart-footer">
        <button className='clear-cart-btn' onClick={clearCart}>Clear Cart</button>
        <div className="total-price">TOTAL: ${Number(total.replace('$', '')).toFixed(2)}</div>
        <button 
          className='proceed-btn'
          onClick={() => cartItems.length > 0 && navigate('/checkout')}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}

export default CartPage;