const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');
mongoose.connect(process.env.MONGO_URI).then(async () => {
  await Product.deleteMany();
  await Product.insertMany([
    { name: 'Nike Air Max', price: 2999, description: 'Comfort', category: 'Shoes', image: '👟' },
    { name: 'T-Shirt', price: 499, description: 'Cotton', category: 'Clothing', image: '👕' },
    { name: 'Headphones', price: 1999, description: 'Sound', category: 'Electronics', image: '🎧' },
    { name: 'Watch', price: 3999, description: 'Smart', category: 'Electronics', image: '⌚' },
    { name: 'Bag', price: 1299, description: 'Laptop bag', category: 'Bags', image: '🎒' },
    { name: 'Sunglasses', price: 899, description: 'UV', category: 'Fashion', image: '🕶️' },
  ]);
  console.log('DONE 6 Products Added!');
  process.exit();
});