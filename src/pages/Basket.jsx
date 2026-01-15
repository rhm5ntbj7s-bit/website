import React from 'react';
import { useAppContext } from '../context/AppContext';
import './Basket.css';

const Basket = () => {
  // Get basket data and functions from context
  const { basket, removeFromBasket, updateQuantity } = useAppContext();
  
  // Calculate total price of all items in basket
  const total = basket.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Show empty basket message if no items
  if (!basket.length) return <div className="basket"><h2>Basket</h2><p>Your basket is empty</p></div>;

  return (
    <div className="basket">
      <h2>Basket</h2>
      {/* Display each item in basket with controls */}
      {basket.map(item => (
        <div key={item.id} className="item">
          <img src={item.image} alt={item.name} />
          <div>
            <h3>{item.name}</h3>
            <p>£{item.price}</p>
          </div>
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
          <p>£{(item.price * item.quantity).toFixed(2)}</p>
          <button onClick={() => removeFromBasket(item.id)}>Remove</button>
        </div>
      ))}
      {/* Display total price and checkout button */}
      <div className="total">
        <h3>Total: £{total.toFixed(2)}</h3>
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default Basket;
