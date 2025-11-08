const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose.connect("mongodb://127.0.0.1:27017/mockcart")
  .then(()=>console.log("Mongo Connected"))
  .catch(err=>console.log(err));

async function seedProducts(){
  await Product.deleteMany();

  await Product.insertMany([
    
    { name: "Laptop Bag", price: 1200 },
    { name: "Smart Headphones", price: 9000 },
    { name: "Mechanical Keyboard", price: 3500 },
    { name: "Portable SSD", price: 4200 },
    { name: "Smartwatch", price: 4999 },
    { name: "Gaming Mouse", price: 1800 },
    { name:"Electric ToothBrush",price:500},
    { name:"Mobile Cover",price:200},
    { name:"Trimer",price:900},
    { name:"Kids Bike",price:5000},
    { name:"Books Of HarryPotter",price:1500},
    { name:"HouseKeeping Products set",price:2500},
    { name:"Wooden Chappels",price:1500}
    
  ]);
  console.log("Products Seeded");
  process.exit();
}

seedProducts();
