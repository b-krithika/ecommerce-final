const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("✅ MongoDB Connected! Project 100%"))
.catch(err=> console.log("❌ Error:", err));

const Product = mongoose.model('Product', {
  name: String, price: Number, image: String, description: String
});

const Order = mongoose.model('Order', {
  customerName: String, address: String, products: Array, total: Number, orderId: String, date: { type: Date, default: Date.now }
});

app.get('/', (req,res)=> res.send('Backend 100% Working with MongoDB!'));

app.get('/api/products', async (req,res)=>{
  let products = await Product.find();
  if(products.length===0){
    products = await Product.insertMany([
      { name:"iPhone 15", price:79999, image:"https://images.unsplash.com/photo-1591337676887-a217a6970a8a", description:"Latest iPhone" },
      { name:"Nike Shoes", price:5999, image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff", description:"Running Shoes" },
      { name:"MacBook Air", price:119999, image:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8", description:"Apple Laptop" }
    ]);
  }
  res.json(products);
});

app.post('/api/orders', async (req,res)=>{
  const order = new Order(req.body);
  await order.save();
  console.log("✅ Order Saved:", order.orderId);
  res.json({ message:"Order Saved!", order });
});

app.get('/api/orders', async (req,res)=>{
  const orders = await Order.find();
  res.json(orders);
});

app.listen(process.env.PORT, ()=> console.log(`Backend running on ${process.env.PORT}`));