//@ts-ignore
const mongoose = require('mongoose');
//@ts-ignore
const { Schema } = mongoose;
//@ts-ignore
const products = new Schema({
  title: String,
  description: String,
  images: [String],
  price: Number,
  sizes: [Number],
  color: String,
  season: String,
  top:{
    type: Boolean,
    required: false
  }
});

module.exports = mongoose.model("products", products);