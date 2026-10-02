const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req,res)=>{
  const user = new User(req.body);
  await user.save();
  res.json({message:"Registered"});
});

router.post('/login', async (req,res)=>{
  const user = await User.findOne({email:req.body.email, password:req.body.password});
  if(user) res.json({user});
  else res.status(400).json({error:"Invalid"});
});

module.exports = router;