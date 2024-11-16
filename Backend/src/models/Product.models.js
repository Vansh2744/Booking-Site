import mongoose, { Schema } from "mongoose";

const productSchema = newSchema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
},
  { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
