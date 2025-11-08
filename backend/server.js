//required exp,mongoose and cors for backend db or server
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");//cross origin resourse sharing for express

const app = express();
app.use(cors());
app.use(express.json());

// mongo connect
mongoose.connect("mongodb://127.0.0.1:27017/mockcart")
.then(()=>
    console.log("Mongo Connected"))
.catch(err=>
    console.log("Mongo error", err));

app.get("/", (req,res)=>{
  res.send("Backend running...");
});

app.listen(5000, ()=>{
  console.log("Server running on 5000");
});
//from products.js imported
const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);
//from routes cart.js imported
const cartRoute = require("./routes/cart");
app.use("/api/cart", cartRoute);
//form routes checkout.js imported
app.use("/api/checkout", require("./routes/checkout"));















