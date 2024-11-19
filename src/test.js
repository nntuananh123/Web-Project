import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: '1168761308',
      name: 'Vintage Clock',
      category: 'Tech',
      price: 18.34,
      quantity: 2,
      img: 'https://cdn.bootstrapstudio.io/products/product-21_sm.jpg',
    },
    {
      id: '589605485',
      name: 'Reusable Cup',
      category: 'Cups',
      price: 35.39,
      quantity: 1,
      img: 'https://cdn.bootstrapstudio.io/products/product-18_sm.jpg',
    },
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + delta, 1) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="assets/bootstrap/css/bootstrap.min.css" />
      </Helmet>
      <NavBar showSearch={false} />
      <section className="py-5">
        <div className="container py-5">
          <h2>Shopping Cart</h2>
          {cartItems.map((item) => (
            <div key={item.id} className="d-flex align-items-center mb-4">
              <img src={item.img} alt={item.name} className="img-thumbnail" style={{ width: '100px' }} />
              <div className="ms-3">
                <h5>{item.name}</h5>
                <p className="mb-1">{item.category}</p>
                {item.variant && <p className="mb-1">{item.variant}</p>}
                <p className="fw-bold">${item.price.toFixed(2)}</p>
              </div>
              <div className="ms-auto">
                <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, -1)}>-</button>
                <input
                  type="text"
                  value={item.quantity}
                  className="form-control d-inline-block mx-2"
                  style={{ width: '50px', textAlign: 'center' }}
                  readOnly
                />
                <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>
              <button className="btn btn-danger ms-3" onClick={() => removeItem(item.id)}>
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4">
            <h4>Subtotal: ${subtotal.toFixed(2)}</h4>
            <button className="btn btn-primary mt-3">Proceed to Checkout</button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Cart;
