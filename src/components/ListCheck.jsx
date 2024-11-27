import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ListCart = () => {

  
  const [products, setProducts] = useState([
    {
      id: 1168761308,
      quantity: 2,
      name: 'Vintage Clock',
      category: 'Tech',
      price: 18.34,
      image: 'https://cdn.bootstrapstudio.io/products/product-21_sm.jpg',
      status: 'none', // Trạng thái xử lý
    },
    {
      id: 589605485,
      quantity: 1,
      name: 'Reusable Cup',
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
