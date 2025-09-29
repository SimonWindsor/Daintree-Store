import { useContext } from 'react';
import CartCard from '../components/CartCard';
import { FunctionContext } from '../App';
import './CartPage.css';

function CartPage() {
  const { cart, updateCartItem, clearCart} = useContext(FunctionContext);
  return (
    <div className="CartPage">
      <h2>Your Cart</h2>
      <div className='cart-list'>
        {cart.map((item) => {
          const { id, picture, name, description, price, quantity } = item;

          return (
          <CartCard
            key={id}
            id={id}
            picture={picture}
            name={name}
            description={description}
            price={price}
            quantity={quantity}
            onUpdate={updateCartItem}
          />
          )
        })}
      </div>
      <button className='clear-cart-btn'>Clear Cart</button>
    </div>
  )
}

export default CartPage;