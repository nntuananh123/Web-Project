import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ListCart = () => {

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:8080/mycoffee/order/with-details");
      const data = await response.json();
  
      // Kiểm tra xem có trường result không
      const ordersData = data.result || []; // Lấy mảng đơn hàng từ trường 'result'
  
      // Ánh xạ đơn hàng
      const mappedOrders = ordersData.map((order) => ({
        orderId: order.orderId,
        table: order.table,
        totalPrice: order.totalPrice,
        orderDetails: order.orderDetails.map((detail) => ({
          quantity: detail.quantity,
          productName: detail.productName,
          image: detail.image,
          price: detail.price,
        })),
      }));
  
      setOrders(mappedOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };
  
  useEffect(() => {
    fetchOrders();
  }, []);
  
  const [products, setProducts] = useState([
    {
      id: 1168761308,
      quantity: 2,
      name: '1. Vintage Clock',
      category: 'Tech',
      price: 18.34,
      image: 'https://cdn.bootstrapstudio.io/products/product-21_sm.jpg',
      status: 'none', // Trạng thái xử lý
    },
    {
      id: 589605485,
      quantity: 1,
      name: '2. Reusable Cup',
      category: 'Cups',
      price: 35.39,
      image: 'https://cdn.bootstrapstudio.io/products/product-18_sm.jpg',
      status: 'none', // Trạng thái xử lý
    },
  ]);

  const handleRemove = (id) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== id)
    );
  };

  const handleStatusToggle = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              status:
                product.status === 'none'
                  ? 'pending'
                  : product.status === 'pending'
                  ? 'finished'
                  : 'none',
            }
          : product
      )
    );
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col">
          <div className="shopping-cart">
            {/* Header */}
            <div className="d-flex fw-bold border-bottom pb-2">
              <div className="col-1 text-center border-end">Table</div>
              <div className="col-4 ps-3 border-end">Product</div>
              <div className="col-2 text-center border-end">Price</div>
              <div className="col-2 text-center border-end">Quantity</div>
              <div className="col-2 text-center border-end">Total</div>
              <div className="col-1 text-center">Status</div>
            </div>
            {/* Body */}
            {products.map((product, index) => (
              <div className="d-flex align-items-center py-2 border-bottom" key={product.id}>
                <div className="col-1 text-center border-end">{index + 1}</div>
                <div className="col-4 ps-3 border-end">{product.name}</div>
                <div className="col-2 text-center border-end">${product.price.toFixed(2)}</div>
                <div className="col-2 text-center border-end">{product.quantity}</div>
                <div className="col-2 text-center border-end">
                  ${(product.price * product.quantity).toFixed(2)}
                </div>
                <div className="col-1 text-center">
                  {product.status === 'none' && (
                    <>
                      <button
                        className="btn btn-success btn-sm mx-1"
                        onClick={() => handleStatusToggle(product.id)}
                      >
                        ✔
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleRemove(product.id)}
                      >
                        ✖
                      </button>
                    </>
                  )}
                  {product.status === 'pending' && (
                    <>
                      <span className="badge bg-warning text-dark">Pending</span>
                      <button
                        className="btn btn-success btn-sm mx-1"
                        onClick={() => handleStatusToggle(product.id)}
                      >
                        ✔
                      </button>
                    </>
                  )}
                  {product.status === 'finished' && (
                    <span className="badge bg-success text-dark">Finished</span>
                  )}
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCart;
