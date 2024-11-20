import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ListCart = () => {
  // Dữ liệu sản phẩm sử dụng state
  const [products, setProducts] = useState([
    {
      id: 1168761308,
      quantity: 2,
      name: 'Vintage Clock',
      category: 'Tech',
      price: 18.34,
      image: 'https://cdn.bootstrapstudio.io/products/product-21_sm.jpg',
    },
    {
      id: 589605485,
      quantity: 1,
      name: 'Reusable Cup',
      category: 'Cups',
      price: 35.39,
      image: 'https://cdn.bootstrapstudio.io/products/product-18_sm.jpg',
    },
  ]);

  // Hàm để tăng số lượng
  const handleIncrease = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  // Hàm để giảm số lượng
  const handleDecrease = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  // Hàm để xóa sản phẩm
  const handleRemove = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  // Hàm tính tổng tiền
  const calculateTotal = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
  };


  return (
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
                  {products.map((product) => (
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
                            <div className="ref-product-controls ref-mobile-product-controls" style={{justifyContent: 'space-between'}}>
                              <div className="ref-product-quantity">
                                <div className="ref-quantity-container">
                                  <div className="ref-quantity-widget">
                                    <div className="ref-decrease" onClick={() => handleDecrease(product.id)}><span></span></div>
                                    <input type="text" value={product.quantity} />
                                    <div className="ref-increase" onClick={() => handleIncrease(product.id)}><span></span></div>
                                  </div>
                                </div>
                              </div>
                              <div className="ref-product-remove" onClick={() => handleRemove(product.id)}>
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
                              <div className="ref-decrease" onClick={() => handleDecrease(product.id)}><span></span></div>
                              <input type="text" value={product.quantity} />
                              <div className="ref-increase" onClick={() => handleIncrease(product.id)}><span></span></div>
                            </div>
                          </div>
                          <div className="ref-product-remove" onClick={() => handleRemove(product.id)}>Remove</div>
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
                    <div className="ref-subtotal">Subtotal: ${calculateTotal()}</div>
                    <div class="ref-button ref-standard-checkout-button">Checkout</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCart;
