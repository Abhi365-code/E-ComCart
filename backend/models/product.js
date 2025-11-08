const mongoose = require("mongoose");
//defining schema
const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number
});

module.exports = mongoose.model("Product", ProductSchema);

