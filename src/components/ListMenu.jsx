import React from 'react';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
const ListMenu = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/mycoffee/product");
        const data = await response.json();
      
        // Kiểm tra xem có trường result không
        const productsData = data.result || []; // Lấy mảng sản phẩm từ trường 'result'
    
        // Ánh xạ sản phẩm
        const mappedProducts = productsData.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          category: item.category.name,
          image_url: item.image_url,
        }));
    
        setProducts(mappedProducts);
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
      // Kiểm tra nếu đã có orderId trong localStorage
      let orderId = localStorage.getItem("orderId");
  
      // Nếu chưa có orderId, gọi API để tạo mới
      if (!orderId) {
        const response = await fetch("http://localhost:8080/mycoffee/order", {
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
  
      alert(`Product ${productId} added to order ${orderId} in table ${table}. Quantity: ${existingProduct ? existingProduct.quantity : 1}`);
    } catch (error) {
      console.error("Error adding product to order:", error);
    }
  };
  
  






  return (

        <div class="container py-5">
            <div class="row mx-auto">
                <div class="col">
                    <div data-reflow-type="product-list" data-reflow-layout="cards" data-reflow-order="date_desc" data-reflow-product-link="/product.html?product={id}">

                        <div class="reflow-product-list ref-cards">
                        

                        <div class="ref-products">
                        {products.map((product) => (
                            <a class="ref-product" key={product.id}>
                            
                                    <div class="ref-media"><img class="ref-image" src={product.image_url} loading="lazy" />
                                    </div>
                                    <div class="ref-product-data">
                                        <div class="ref-product-info">
                                            <h5 class="ref-name">{product.name}</h5>
                                            </div><strong class="ref-price">${product.price}</strong>
                                    </div>
                                    <div class="ref-addons"><a class="ref-button preview-toggle" href="#" onClick={() => handleAddToOrder(product.id)}>Add to Cart</a></div>
                                </a>))}
                            </div>


                                
                            <div class="ref-product-preview">
                                <div class="ref-product-preview-header">
                                    <div class="ref-title"></div>
                                    <div class="ref-close-button">×</div>
                                </div>
                                <div class="ref-product-preview-content"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default ListMenu;
