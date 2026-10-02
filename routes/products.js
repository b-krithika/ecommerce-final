const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req,res)=>{
  const products = await Product.find();
  res.json(products);
});

router.post('/add', async (req,res)=>{
  const p = new Product(req.body);
  await p.save();
  res.json(p);
});

module.exports = router;