import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

const ListCheck = () => {
  const [orders, setOrders] = useState([]);

  const parseDate = (dateString) => {
    const [date, time] = dateString.split(" ");
    const [day, month, year] = date.split("-");
    const [hours, minutes, seconds] = time.split(":");
  
    // Tạo đối tượng Date
    const dateObj = new Date(year, month - 1, day, hours, minutes, seconds);
  
    // Chuyển đổi sang UTC+7
    const utc7Offset = 7 * 60 * 60 * 1000; // Chuyển đổi từ giờ sang milliseconds
    const utc7Date = new Date(dateObj.getTime() + utc7Offset);
  
    return utc7Date.toLocaleString("en-US", {
      timeZone: "Asia/Bangkok",
      hour12: false, // Hiển thị dạng 24 giờ
    });
  };
  
  
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
        `http://${process.env.REACT_APP_API_URL}/mycoffee/order/with-details`,
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
        status: order.status, 
        orderDetails: order.orderDetails.map((detail) => ({
          quantity: detail.quantity,
          productName: detail.productName,
          image: detail.image,
          price: detail.price,
        })),
      }));

      // Sắp xếp đơn hàng theo thời gian (mới nhất lên trên)
      mappedOrders.sort((a, b) => {
        const dateA = parseDate(a.created_at);
        const dateB = parseDate(b.created_at);
        return dateB - dateA; // Ngày gần nhất lên trên
      });  
      setOrders(mappedOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };
  

  useEffect(() => {
    fetchOrders();

    // Thiết lập WebSocket để lắng nghe thông báo
    const ws = new WebSocket(`ws://${process.env.REACT_APP_API_URL}/mycoffee/ws/orders`);

    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.onmessage = async (event) => {
      console.log("Received message:", event.data);

      // Cập nhật danh sách đơn hàng khi có thông báo mới
      try {
        fetchOrders();
      } catch (error) {
        console.error("Error updating orders:", error);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Cleanup WebSocket khi component unmount
    return () => {
      ws.close();
    };
  }, []);
  

  const handleRemove = async (orderId) => {
    try {
      // Gửi request DELETE để xóa đơn hàng
      const token = localStorage.getItem("authToken");
  
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }
  
      const response = await fetch(
        `http://${process.env.REACT_APP_API_URL}/mycoffee/order/${orderId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to delete order");
      }
  
      // Nếu xóa thành công, cập nhật lại danh sách đơn hàng
      setOrders((prevOrders) => {
        const updatedOrders = prevOrders.filter(
          (order) => order.orderId !== orderId
        );
  
        // Xóa lớp `border-top-solid` khỏi order đầu tiên nếu cần
        if (updatedOrders.length > 0) {
          updatedOrders[0] = {
            ...updatedOrders[0],
            isFirstOrder: true, // Đánh dấu order đầu tiên
          };
        }
  
        return updatedOrders;
      });
    } catch (error) {
      console.error("Failed to remove order:", error);
    }
  };
  


  const handleStatusToggle = (orderId) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId
          ? {
              ...order,
              status:
                order.status === "NONE"
                  ? "pending"
                  : order.status === "pending"
                  ? "finished"
                  : "NONE",
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
                <div className="col-3-5 text-center border-end">Product</div>
                <div className="col-1 text-center border-end">Quantity</div>
                <div className="col-1-5 text-center border-end">Price</div>
                <div className="col-1-5 text-center border-end">Total</div>
                <div className="col-2 text-center">Time</div>
                <div className="col-1-5 text-center">Status</div>
              </div>
              {/* Body */}
              {orders.map((order, orderIndex) => {
                let isFirstDetail = true; // Đánh dấu lần đầu tiên hiển thị
                let productIndex = 1; // Đánh số thứ tự cho các sản phẩm trong mỗi orderId
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
                          <div className="col-3-5 product-column border-end">
                            {`${productIndex}. ${detail.productName}`}
                          </div>
                          <div className="col-1 text-center border-end">
                            {detail.quantity}
                          </div>
                          <div className="col-1-5 text-center border-end">
                            ${detail.price.toFixed(2)}
                          </div>
                          <div className="col-1-5 text-center border-end">
                            {isFirstDetail ? `$${order.totalPrice.toFixed(2)}` : ""}
                          </div>
                          <div className="col-2 text-center border-end">
                            {isFirstDetail ? parseDate(order.created_at) : ""}
                          </div>
                          <div className="col-1-5 text-center">
                            {isFirstDetail && (
                              <>
                                {order.status === "NONE" && (
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
                      productIndex++;
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

      /* Căn giữa cả chiều ngang và dọc cho tất cả các cột */
      .row > div {
        display: flex;
        align-items: center; /* Căn giữa theo chiều dọc */
        justify-content: center; /* Căn giữa theo chiều ngang */
        border-right: 1px solid #dee2e6;
        height: 100%;
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
        border-top: 2px solid #FFFFFF;
      }

      /* Căn trái nội dung trong cột Product */
      .product-column {
        display: flex;
        justify-content: flex-start !important; /* Căn trái nội dung */
        align-items: center; /* Căn giữa theo chiều dọc */
        text-align: left; /* Đảm bảo căn trái văn bản */
        padding-left: 10px; /* Thêm khoảng cách nội bộ */
      }


      .status-btn-group {
        display: flex;
        justify-content: center;
        gap: 4px;
      }

      /* Đồng đều khoảng cách giữa các row */
      .row {
        padding-top: 10px;
        padding-bottom: 10px;
        align-items: stretch;
      }

      .col-1-5 {
      flex: 0 0 12.5%; /* 1.5/12 * 100% = 12.5% */
      max-width: 12.5%;
      }

      .col-3-5 {
      flex: 0 0 29.167%; /* 3.5/12 * 100% */
      max-width: 29.167%;
      }
    `}</style>
    </div>
  );
};

export default ListCheck;
