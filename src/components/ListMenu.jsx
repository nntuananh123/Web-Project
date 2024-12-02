import React from 'react';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer, Flip } from "react-toastify/dist/react-toastify.umd";
import "react-toastify/dist/ReactToastify.css";



const ListMenu = ({ searchResults, updateCartCount }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (searchResults.length > 0) {
      setProducts(searchResults);
    } 
    else {
      setProducts([]); // Rỗng nếu không có kết quả
    }
  }, [searchResults]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://${process.env.URL}/mycoffee/product`);
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

  // Lấy số bàn từ URL
  const getTableFromUrl = () => {
    const params = new URLSearchParams(location.search);
    return parseInt(params.get("table")) || 0; // Trả về số bàn hoặc 0 nếu không có
  };
  
  const table = getTableFromUrl();
  
  const handleAddToOrder = async (productId) => {
    try {
        // Lấy thông tin sản phẩm theo productId để hiển thị tên
        const selectedProduct = products.find(product => product.id === productId);
        if (!selectedProduct) throw new Error("Product not found");

        // Kiểm tra nếu đã có orderId trong localStorage
        let orderId = localStorage.getItem("orderId");

        // Nếu chưa có orderId, gọi API để tạo mới
        if (!orderId) {
            const response = await fetch(`http://${process.env.REACT_APP_API_URL}/mycoffee/order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ table }), // Gửi số bàn đến backend
            });

            if (!response.ok) {
                throw new Error("Failed to create order");
            }

            const data = await response.json();
            orderId = data.result.orderId; // Lấy orderId từ phản hồi API

            // Lưu orderId vào localStorage
            localStorage.setItem("orderId", orderId);
        }

        // Lưu số bàn vào localStorage
        localStorage.setItem("table", table);

        // Lưu productId và quantity vào localStorage
        let currentOrder = JSON.parse(localStorage.getItem("orderDetails")) || [];

        // Kiểm tra xem sản phẩm đã có trong đơn hàng chưa
        const existingProduct = currentOrder.find(item => item.productId === productId);

        if (existingProduct) {
            // Nếu đã có, tăng quantity lên 1
            existingProduct.quantity += 1;
        } else {
            // Nếu chưa có, thêm mới sản phẩm với quantity = 1
            currentOrder.push({ productId, quantity: 1 });
        }

        // Lưu lại thông tin đơn hàng với quantity được cập nhật
        localStorage.setItem("orderDetails", JSON.stringify(currentOrder));
        // Gọi hàm updateCartCount để cập nhật số lượng sản phẩm real-time
        updateCartCount();
        // Hiển thị thông báo đẹp mắt
        toast.success(`Add "${selectedProduct.name}" to cart successfully 😘`);
        console.log(`Product ${productId} added to order ${orderId} in table ${table}. Quantity: ${existingProduct ? existingProduct.quantity : 1}`);
    } catch (error) {
        toast.error("Failed to add product to order");
        console.error("Error adding product to order:", error);
    }
};

  

return (
  <>
      <ToastContainer transition={Flip} position="top-center" autoClose={3000} />
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
                                            event.preventDefault(); // Ngăn việc điều hướng mặc định
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


  </>
);

};

export default ListMenu;
