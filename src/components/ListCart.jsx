import React from 'react';
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const ListCart = ({ updateCartCount }) => {

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      // Lấy danh sách orderDetails từ localStorage
      const orderDetails = JSON.parse(localStorage.getItem("orderDetails")) || [];

      // Nếu không có orderDetails, không cần tiếp tục
      if (orderDetails.length === 0) {
        console.warn("No products in localStorage to fetch.");
        return;
      }

      // Gửi yêu cầu API để lấy danh sách sản phẩm
      const response = await fetch("http://localhost:8080/mycoffee/product");

      if (!response.ok) {
        throw new Error("Failed to fetch products.");
      }

      const data = await response.json();
      
      // Kiểm tra xem có trường result không
      const productsData = data.result || []; // Lấy mảng sản phẩm từ trường 'result'

      // Lọc các sản phẩm có productId có trong orderDetails
      const filteredProducts = productsData.filter(product =>
        orderDetails.some(item => item.productId === product.id) // Lọc sản phẩm theo productId có trong orderDetails
      );

      // Ánh xạ sản phẩm kèm theo quantity, table, orderId từ localStorage
      const mappedProducts = filteredProducts.map((item) => {
        const orderDetail = orderDetails.find(detail => detail.productId === item.id);
        return {
          id: item.id,
          name: item.name,
          price: item.price,
          category: item.category.name,
          image_url: item.image_url,
          quantity: orderDetail ? orderDetail.quantity : 0, // Thêm quantity từ orderDetails
          table: orderDetail ? orderDetail.table : 0, // Thêm table từ orderDetails
          orderId: orderDetail ? orderDetail.orderId : '', // Thêm orderId từ orderDetails
        };
      });

      // Lưu vào state
      setProducts(mappedProducts);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };
  

  // Hàm để tăng số lượng
  const handleIncrease = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  
    // Cập nhật trong localStorage
    const orderDetails = JSON.parse(localStorage.getItem("orderDetails")) || [];
    const updatedOrderDetails = orderDetails.map((item) =>
      item.productId === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
    localStorage.setItem("orderDetails", JSON.stringify(updatedOrderDetails));
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
  
    // Cập nhật trong localStorage
    const orderDetails = JSON.parse(localStorage.getItem("orderDetails")) || [];
    const updatedOrderDetails = orderDetails.map((item) =>
      item.productId === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    localStorage.setItem("orderDetails", JSON.stringify(updatedOrderDetails));
  };
  

  // Hàm để xóa sản phẩm
  const handleRemove = (id) => {
    try {
      // Lấy danh sách orderDetails từ localStorage
      const orderDetails = JSON.parse(localStorage.getItem("orderDetails")) || [];

      // Lọc bỏ sản phẩm có productId trùng với id
      const updatedOrderDetails = orderDetails.filter(
        (item) => item.productId !== id
      );

      // Lưu danh sách mới vào localStorage
      localStorage.setItem("orderDetails", JSON.stringify(updatedOrderDetails));
      // Cập nhật lại giao diện (nếu cần)
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );

      // Gọi hàm updateCartCount để cập nhật real-time
      updateCartCount();

    } catch (error) {
      console.error("Error removing product from localStorage:", error);
    }
  };
  

  // Hàm tính tổng tiền
  const calculateTotal = () => {
    return products.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
  };

  const handleSubmitOrderDetails = async () => {
    try {
      // Lấy thông tin từ localStorage
      const orderId = localStorage.getItem("orderId");
      const orderDetails = JSON.parse(localStorage.getItem("orderDetails")) || [];
  
      // Kiểm tra nếu không có orderId hoặc orderDetails trống
      if (!orderId || orderDetails.length === 0) {
        console.log("No order or products to submit.");
        return;
      }
  
      // Lặp qua từng sản phẩm và gửi POST request
      for (const { productId, quantity } of orderDetails) {
        const response = await fetch("http://localhost:8080/mycoffee/order-detail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId,
            productId,
            quantity,
          }),
        });
  
        // Kiểm tra phản hồi
        if (!response.ok) {
          throw new Error(`Failed to submit product ${productId}`);
        }
  
        const data = await response.json();
        if (data.code === 0) {
          console.log(
            `Successfully submitted product ${productId} with quantity ${quantity}.`
          );
        } else {
          console.warn(`Error submitting product ${productId}: ${data.message}`);
        }
      }
  
      console.log("All products submitted successfully.");
    } catch (error) {
      console.error("Error submitting order details:", error);
      console.log("Failed to submit order details.");
    }
    try {
      // Xóa tất cả dữ liệu trong localStorage
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing local storage:", error);
    }
      // Reload lại trang
    window.location.reload();
  };

  const handleUpdateOrder = async () => {
    await handleSubmitOrderDetails();
    try {
      // Lấy orderId và table từ localStorage
      const orderId = localStorage.getItem("orderId");
      const table = parseInt(localStorage.getItem("table"), 10);
  
      if (!orderId || isNaN(table)) {
        console.log("Order ID or table not found in localStorage.");
        return;
      }
  
      // Tính tổng giá từ hàm calculateTotal
      const totalPrice = calculateTotal();
  
      // Tạo Request body
      const requestBody = {
        table,
        totalPrice: parseFloat(totalPrice), // Chuyển đổi từ chuỗi sang số
      };
  
      // Gửi yêu cầu PUT đến API
      const response = await fetch(`http://localhost:8080/mycoffee/order/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update order.");
      }
  
      const data = await response.json();
      if (data.code === 0) {
        console.log("Order updated successfully.");
      } else {
        console.log(`Failed to update order: ${data.message}`);
      }
    } catch (error) {
      console.error("Error updating order:", error);
      console.log("An error occurred while updating the order.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
                          <img className="ref-product-photo" src={product.image_url} alt={product.name} />
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
                    <div class="ref-button ref-standard-checkout-button" onClick = {handleUpdateOrder}>Checkout</div>
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
