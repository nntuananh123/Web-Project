export default class Order {
    constructor(data) {
      this.orderId = data.orderId || "";
      this.userId = data.userId || "";
      this.table = data.table || 0;
      this.totalPrice = data.totalPrice || 0;
      this.message = data.message || "";
      this.code = data.code || 0;
    }
  }