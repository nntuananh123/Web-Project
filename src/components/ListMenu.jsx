import React from 'react';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const ListMenu = ({ searchResults, updateCartCount }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (searchResults.length > 0) {
      setProducts(searchResults);
    } else {
      setProducts([]); // Rỗng nếu không có kết quả
    }
  }, [searchResults]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://${process.env.REACT_APP_API_URL}/mycoffee/product`);
      const data = await response.json();
      setProducts(data.result || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const location = useLocation();

  const getTableFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return parseInt(params.get("table")) || 0; // Trả về số bàn hoặc 0 nếu không có
  };

  const table = getTableFromUrl();

  const handleAddToOrder = async (productId) => {
    try {
      const selectedProduct = products.find(product => product.id === productId);
      if (!selectedProduct) throw new Error("Product not found");

      let orderId = localStorage.getItem("orderId");

      if (!orderId) {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/mycoffee/order`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ table }),
        });

        if (!response.ok) {
          throw new Error("Failed to create order");
        }

        const data = await response.json();
        orderId = data.result.orderId;

        localStorage.setItem("orderId", orderId);
      }

      localStorage.setItem("table", table);

      let currentOrder = JSON.parse(localStorage.getItem("orderDetails")) || [];
      const existingProduct = currentOrder.find(item => item.productId === productId);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        currentOrder.push({ productId, quantity: 1 });
      }

      localStorage.setItem("orderDetails", JSON.stringify(currentOrder));
      updateCartCount();

      // Hiển thị thông báo SweetAlert2
      Swal.fire({
        title: 'Success!',
        text: `Add "${selectedProduct.name}" to cart successfully 😘`,
        icon: 'success',
        confirmButtonText: 'OK'
      });

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add product to order',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.error("Error adding product to order:", error);
    }
  };

  return (
    <div className="container py-5">
      <div className="row mx-auto">
        <div className="col">
          <div
            data-reflow-type="product-list"
            data-reflow-layout="cards"
            data-reflow-order="date_desc"
            data-reflow-product-link="/product.html?product={id}"
          >
            <div className="reflow-product-list ref-cards">
              <div className="ref-products">
                {products.map((product) => (
                  <a className="ref-product pb-5" key={product.id}>
                    <div className="ref-media">
                      <img
                        className="ref-image"
                        src={product.image_url}
                        loading="lazy"
                      />
                    </div>
                    <div className="ref-product-data">
                      <div className="ref-product-info">
                        <h5 className="ref-name">{product.name}</h5>
                      </div>
                      <strong className="ref-price">${product.price}</strong>
                    </div>
                    <div className="ref-addons">
                      <a
                        className="ref-button preview-toggle"
                        href="#"
                        onClick={(event) => {
                          event.preventDefault();
                          handleAddToOrder(product.id);
                        }}
                      >
                        Add to Cart
                      </a>
                    </div>
                  </a>
                ))}
              </div>
              <div className="ref-product-preview">
                <div className="ref-product-preview-header">
                  <div className="ref-title"></div>
                  <div className="ref-close-button">×</div>
                </div>
                <div className="ref-product-preview-content"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListMenu;
