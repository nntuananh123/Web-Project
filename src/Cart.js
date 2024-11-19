import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
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
        <link 
          rel="stylesheet" 
          href="assets/bootstrap/css/bootstrap.min.css?h=ae25e30cd2ef0f4f5b70ebf4c668048b" 
        />
        <link 
          rel="stylesheet" 
          href="assets/bootstrap/js/bootstrap.min.js" 
        />
      </Helmet>
      <NavBar showSearch={false} />
      <section className="py-5">
        <div className="container py-5">
          <div className="row mx-auto">
            <div className="col">
              <div data-reflow-type="shopping-cart">
                <div className="reflow-shopping-cart" style={{ display: 'block' }}>
                  <div className="ref-loading-overlay"></div>
                  <div className="ref-message" style={{ display: 'none' }}>
                    Unable to load shopping cart.
                  </div>
                  <div className="ref-cart" style={{ display: 'block' }}>
                    <div className="ref-heading">Shopping Cart</div>
                    <div className="ref-th">
                      <div className="ref-product-col">Product</div>
                      <div className="ref-price-col">Price</div>
                      <div className="ref-quantity-col">Quantity</div>
                      <div className="ref-total-col">Total</div>
                    </div>
                    <div className="ref-cart-table">
                      {[
                        {
                          id: 1168761308,
                          quantity: 2,
                          name: 'Vintage Clock',
                          category: 'Tech',
                          price: 18.34,
                          image: 'https://cdn.bootstrapstudio.io/products/product-21_sm.jpg'
                        },
                        {
                          id: 589605485,
                          quantity: 1,
                          name: 'Reusable Cup',
                          category: 'Cups',
                          price: 35.39,
                          image: 'https://cdn.bootstrapstudio.io/products/product-18_sm.jpg'
                        },
                      ].map((product) => (
                        <div className="ref-product" key={product.id} data-id={product.id} data-quantity={product.quantity}>
                          <div className="ref-product-col">
                            <div className="ref-product-wrapper">
                              <img className="ref-product-photo" src={product.image} alt={product.name} />
                              <div className="ref-product-data">
                                <div className="ref-product-info">
                                  <div>
                                    <div className="ref-product-name">{product.name}</div>
                                    <div className="ref-product-category">{product.category}</div>
                                  </div>
                                  <div className="ref-product-price ref-mobile-product-price">${product.price.toFixed(2)}</div>
                                </div>
                                <div className="ref-product-controls ref-mobile-product-controls">
                                  <div className="ref-product-quantity">
                                    <div className="ref-quantity-container">
                                      <div className="ref-quantity-widget">
                                        <div className="ref-decrease"><span></span></div>
                                        <input type="text" value={product.quantity} />
                                        <div className="ref-increase"><span></span></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="ref-product-remove">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 48 48">
                                      <path fill="currentColor" d="M13.05 42q-1.2 0-2.1-.9-.9-.9-.9-2.1V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Z"></path>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="ref-price-col">
                            <div className="ref-product-price">${product.price.toFixed(2)}</div>
                          </div>
                          <div className="ref-quantity-col">
                            <div className="ref-product-quantity">
                              <div className="ref-quantity-container">
                                <div className="ref-quantity-widget">
                                  <div className="ref-decrease"><span></span></div>
                                  <input type="text" value={product.quantity} />
                                  <div className="ref-increase"><span></span></div>
                                </div>
                              </div>
                              <div className="ref-product-remove">Remove</div>
                            </div>
                          </div>
                          <div className="ref-total-col">
                            <div className="ref-product-total">
                              <div className="ref-product-total-sum">${(product.price * product.quantity).toFixed(2)}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                      <div className="ref-totals">
                        <div className="ref-subtotal">Subtotal: $107.46</div>
                        <div class="ref-button ref-standard-checkout-button">Checkout</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Cart;
