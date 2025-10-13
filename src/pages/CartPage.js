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
          const { itemId, picture, name, price, quantity } = item;

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
        })}
      </div>
      <button className='clear-cart-btn' onCllck={clearCart}>Clear Cart</button>
    </div>
  )
}

export default CartPage;