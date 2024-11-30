import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

const ListCheck = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      // Lấy token từ localStorage
      const token = localStorage.getItem("authToken");
  
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }
  
      // Gửi request với Authorization Header
      const response = await fetch(
        "http://localhost:8080/mycoffee/order/with-details",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào Header
            "Content-Type": "application/json", // Đảm bảo định dạng JSON
          },
        }
      );
  
      const data = await response.json();
  
      const ordersData = data.result || []; // Lấy mảng đơn hàng từ API
  
      // Ánh xạ đơn hàng
      const mappedOrders = ordersData.map((order) => ({
        orderId: order.orderId,
        table: order.table,
        totalPrice: order.totalPrice,
        created_at: order.created_at,
        status: "none", // Trạng thái mặc định
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

  const handleRemove = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.orderId !== orderId)
    );
  };

  const handleStatusToggle = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId
          ? {
              ...order,
              status:
                order.status === "none"
                  ? "pending"
                  : order.status === "pending"
                  ? "finished"
                  : "none",
            }
          : order
      )
    );
  };

  return (
    
  <div>

    <div className="container py-5">
      <div className="row">
        <div className="col">
          <div className="shopping-cart">
            {/* Header */}
            <div className="row fw-bold border-bottom pb-2">
              <div className="col-1 text-center border-end">Table</div>
              <div className="col-4 text-center border-end">Product</div>
              <div className="col-1 text-center border-end">Price</div>
              <div className="col-1 text-center border-end">Quantity</div>
              <div className="col-1 text-center border-end">Total</div>
              <div className="col-2 text-center">Time</div>
              <div className="col-2 text-center">Status</div>
            </div>
            {/* Body */}
            {orders.map((order, orderIndex) => {
              let isFirstDetail = true; // Đánh dấu lần đầu tiên hiển thị
              return (
                <div
                  className={`order-group ${
                    orderIndex > 0 ? "border-top-solid" : ""
                  }`}
                  key={order.orderId}
                >
                  {order.orderDetails.map((detail, index) => {
                    const row = (
                      <div
                        className={`row py-2 align-items-center ${
                          index === order.orderDetails.length - 1
                            ? ""
                            : "border-bottom-dashed"
                        }`}
                        key={`${order.orderId}-${index}`}
                        style={{ height: "52.5208px" }}
                      >
                        <div className="col-1 text-center border-end">
                          {isFirstDetail ? order.table : ""}
                        </div>
                        <div className="col-4 ps-3 border-end">
                          {detail.productName}
                        </div>
                        <div className="col-1 text-center border-end">
                          ${detail.price.toFixed(2)}
                        </div>
                        <div className="col-1 text-center border-end">
                          {detail.quantity}
                        </div>
                        <div className="col-1 text-center border-end">
                          {isFirstDetail ? `$${order.totalPrice.toFixed(2)}` : ""}
                        </div>
                        <div className="col-2 text-center border-end">
                          {isFirstDetail ? order.created_at : ""}
                        </div>
                        <div className="col-2 text-center">
                          {isFirstDetail && (
                            <>
                              {order.status === "none" && (
                                <div className="status-btn-group">
                                  <button
                                    className="btn btn-success btn-sm"
                                    onClick={() =>
                                      handleStatusToggle(order.orderId)
                                    }
                                  >
                                    ✔
                                  </button>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                      handleRemove(order.orderId)
                                    }
                                  >
                                    ✖
                                  </button>
                                </div>
                              )}
                              {order.status === "pending" && (
                                <div className="status-btn-group">
                                  <span className="badge bg-warning text-dark">
                                    Pending
                                  </span>
                                  <button
                                    className="btn btn-success btn-sm"
                                    onClick={() =>
                                      handleStatusToggle(order.orderId)
                                    }
                                  >
                                    ✔
                                  </button>
                                </div>
                              )}
                              {order.status === "finished" && (
                                <span className="badge bg-success text-dark">
                                  Finished
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    );
                    isFirstDetail = false; // Sau lần đầu tiên, không hiển thị nữa
                    return row;
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
    <style jsx>{`
  .shopping-cart {
    width: 100%;
    border-collapse: collapse;
  }

  /* Border giữa các cột */
  .row > div {
    border-right: 1px solid #dee2e6;
    height: 100%; /* Kéo dài toàn bộ chiều cao */
  }

  /* Xóa border-right cho cột cuối */
  .row > div:last-child {
    border-right: none;
  }

  /* Loại bỏ border giữa các detail trong cùng một order-group */
  .order-group > .row:last-child {
    border-bottom: none;
  }

  /* Border nét liền giữa các order-group */
  .border-top-solid {
    border-top: 2px solid #FFFFFF; /* Điều chỉnh độ dày và màu của border */
  }

  .status-btn-group {
    display: flex;
    justify-content: center;
    gap: 4px;
  }

  /* Đồng đều khoảng cách giữa các row */
  .row {
    padding-top: 10px; /* Khoảng cách phía trên */
    padding-bottom: 10px; /* Khoảng cách phía dưới */
    align-items: stretch; /* Kéo dài nội dung theo chiều cao */
  }

  /* Đảm bảo các cột trong chi tiết đơn hàng liền mạch */
  .row > div {
    display: flex;
    align-items: center;
  }
`}</style>

  </div>


  );
};

export default ListCheck;
