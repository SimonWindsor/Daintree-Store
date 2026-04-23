import { useState, useContext, useEffect } from 'react';
import CartCard from '../components/CartCard';
import { FunctionContext } from '../App';
import './CartPage.css';

import { getItemById } from '../services/api.js';

function CartPage() {
  const { handleLoading, cart, updateCartItem, clearCart} = useContext(FunctionContext);
  const [cartItems, setCartItems] = useState(cart);
  const [total, setTotal] = useState('$0');

  useEffect(() => {
    const enrichCart = async () => {
      try {
        handleLoading(true);
        const enriched = await Promise.all(cart.map(async (item) => {
          const response = await getItemById(item.itemId);
          return {...item, ...response};
        }));
        setCartItems(enriched);
      } catch (error) {
        console.error('Error enriching cart:', error);
      } finally {
        handleLoading(false);
      }
    };

    if (cart.length > 0) {
      enrichCart();
    } else {
      setCartItems([]);
    }
  }, [cart])

  useEffect(() =>{
    const calculateTotal = () => {
      const totalPrice = cartItems.reduce((acc, item) => {
        return acc + (Number(item.price.replace('$', '')) * item.quantity);
      }, 0);
      setTotal(`$${totalPrice.toFixed(2)}`);
    };

    if (cartItems.length > 0 && cartItems[0]?.price) {
      calculateTotal();
    }
  }, [cartItems]);


  return (
    <div className="CartPage">
      <h2>Your Cart</h2>
      <div className='cart-list'>
        {cartItems.length > 0 && cartItems[0].price ? cartItems.map((item) => {
          const {itemId, quantity, picture, name, price} = item;

          return (
          <CartCard
            key={itemId}
            itemId={itemId}
            picture={picture}
            name={name}
            price={price}
            quantity={quantity}
            onUpdate={updateCartItem}
          />
          )
        }) : <p>Loading cart...</p>}
      </div>
      <div className="cart-footer">
        <button className='clear-cart-btn' onClick={clearCart}>Clear Cart</button>
        <div className="total-price">TOTAL: ${Number(total.replace('$', '')).toFixed(2)}</div>
        <button className='proceed-btn'>Proceed to Checkout</button>
      </div>
    </div>
  )
}

export default CartPage;