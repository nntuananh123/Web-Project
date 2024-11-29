import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

const ListCheck = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/mycoffee/order/with-details"
      );
      const data = await response.json();

      const ordersData = data.result || []; // Lấy mảng đơn hàng từ API

      // Ánh xạ đơn hàng
      const mappedOrders = ordersData.map((order) => ({
        orderId: order.orderId,
        table: order.table,
        totalPrice: order.totalPrice,
        status: "none", // Trạng thái mặc định
        orderDetails: order.orderDetails.map((detail) => ({
          quantity: detail.quantity,
          productName: detail.productName,
          image: detail.image,
          price: detail.price,
          status: "none", // Trạng thái của sản phẩm
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

  const handleRemove = (orderId, productName) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId
          ? {
              ...order,
              orderDetails: order.orderDetails.filter(
                (detail) => detail.productName !== productName
              ),
            }
          : order
      )
    );
  };

  const handleStatusToggle = (orderId, productName) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId
          ? {
              ...order,
              orderDetails: order.orderDetails.map((detail) =>
                detail.productName === productName
                  ? {
                      ...detail,
                      status:
                        detail.status === "none"
                          ? "pending"
                          : detail.status === "pending"
                          ? "finished"
                          : "none",
                    }
                  : detail
              ),
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
          <div className="d-flex fw-bold border-bottom pb-2">
            <div className="col-1 text-center border-end">Table</div>
            <div className="col-5 text-center border-end">Product</div>
            <div className="col-2 text-center border-end">Price</div>
            <div className="col-1 text-center border-end">Quantity</div>
            <div className="col-2 text-center border-end">Total</div>
            <div className="col-1 text-center">Status</div>
          </div>
          {/* Body */}
          {orders.map((order) => {
            let isFirstDetail = true; // Đánh dấu lần đầu tiên hiển thị
            return (
              <React.Fragment key={order.orderId}>
                <div className="border-bottom">
                  {order.orderDetails.map((detail, index) => {
                    const row = (
                      <div className="row-group py-2" key={`${order.orderId}-${index}`}>
                        <div className="col-1 text-center">
                          {isFirstDetail ? order.table : ""}
                        </div>
                        <div className="col-5 ps-3">
                          {detail.productName}
                        </div>
                        <div className="col-2 text-center">
                          ${detail.price.toFixed(2)}
                        </div>
                        <div className="col-1 text-center">
                          {detail.quantity}
                        </div>
                        <div className="col-2 text-center">
                          {isFirstDetail
                            ? `$${order.totalPrice.toFixed(2)}`
                            : ""}
                        </div>
                        <div className="col-1 text-center">
                          {isFirstDetail && (
                            <>
                              {detail.status === "none" && (
                                <>
                                  <button
                                    className="btn btn-success btn-sm mx-2"
                                    onClick={() =>
                                      handleStatusToggle(order.orderId, detail.productName)
                                    }
                                  >
                                    ✔
                                  </button>
                                  <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                      handleRemove(order.orderId, detail.productName)
                                    }
                                  >
                                    ✖
                                  </button>
                                </>
                              )}
                              {detail.status === "pending" && (
                                <>
                                  <span className="badge bg-warning text-dark">Pending</span>
                                  <button
                                    className="btn btn-success btn-sm mx-1"
                                    onClick={() =>
                                      handleStatusToggle(order.orderId, detail.productName)
                                    }
                                  >
                                    ✔
                                  </button>
                                </>
                              )}
                              {detail.status === "finished" && (
                                <span className="badge bg-success text-dark">Finished</span>
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
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  </div>
    <style jsx>{`
    /* Container tổng */
    .shopping-cart {
      display: table; /* Gộp các hàng thành một bảng */
      width: 100%;
      border-collapse: collapse; /* Loại bỏ khoảng cách giữa các ô */
    }

    /* Hàng (row) */
    .row-group {
      display: table-row; /* Gộp các cột thành hàng */
    }

    /* Cột (cell) */
    .row-group > div {
      display: table-cell; /* Gộp các cell lại */
      border-right: 1px solid #dee2e6; /* Đường viền dọc */
      padding: 8px; /* Khoảng cách giữa nội dung */
      vertical-align: middle; /* Căn giữa nội dung */
    }

    /* Loại bỏ đường viền phải ở cột cuối */
    .row-group > div:last-child {
      border-right: none;
    }

    `}</style>
        </div>
  );
};

export default ListCheck;
