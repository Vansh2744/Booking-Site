import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  coupons: [
    {
      type: Schema.Types.ObjectId,
      ref: "Coupon",
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
