import React from 'react';
import { useEffect, useState } from "react";


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
            createdAt: new Date(item.createdAt),
            updatedAt: new Date(item.updatedAt),
            deletedAt: item.deletedAt ? new Date(item.deletedAt) : null,
          }));
      
          setProducts(mappedProducts);
        } catch (error) {
          console.error("Failed to fetch products:", error);
        }
      };
  
    useEffect(() => {
      fetchProducts();
    }, []);


  return (
        <div class="container py-5">
            <div class="row mx-auto">
                <div class="col">
                    <div data-reflow-type="product-list" data-reflow-layout="cards" data-reflow-order="date_desc" data-reflow-product-link="/product.html?product={id}">

                        <div class="reflow-product-list ref-cards">
                        

                        <div class="ref-products">
                        {products.map((product) => (
                            <a class="ref-product">
                            
                                    <div class="ref-media"><img class="ref-image" src={product.image_url} loading="lazy" />
                                    </div>
                                    <div class="ref-product-data">
                                        <div class="ref-product-info">
                                            <h5 class="ref-name">{product.name}</h5>
                                            </div><strong class="ref-price">${product.price}</strong>
                                    </div>
                                    <div class="ref-addons"><a class="ref-button preview-toggle" href="#">Add to Cart</a></div>
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
