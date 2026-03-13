const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const sendOTP = require("../utils/sendEmail");


function generateOTP(){
  return Math.floor(100000 + Math.random() * 900000).toString();
}



router.post("/signup", async (req,res)=>{

  try{

    const {name,email,password} = req.body;

    const existing = await User.findOne({email});

    if(existing){
      return res.status(400).json({message:"User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const otp = generateOTP();

    const user = new User({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpires: Date.now() + 10 * 60 * 1000
    });

    await user.save();

    await sendOTP(email, otp);

    res.json({
      message:"OTP sent to your email"
    });

  }catch(err){
    res.status(500).json(err);
  }

});



router.post("/verify", async (req,res)=>{

  const {email, otp} = req.body;

  const user = await User.findOne({email});

  if(!user){
    return res.status(404).json({message:"User not found"});
  }

  if(user.otp !== otp){
    return res.status(400).json({message:"Invalid OTP"});
  }

  if(user.otpExpires < Date.now()){
    return res.status(400).json({message:"OTP expired"});
  }

  user.isVerified = true;
  user.otp = null;

  await user.save();

  res.json({
    message:"Email verified successfully"
  });

});



router.post("/login", async (req,res)=>{

  const {email,password} = req.body;

  const user = await User.findOne({email});

  if(!user){
    return res.status(404).json({message:"User not found"});
  }

  if(!user.isVerified){
    return res.status(400).json({
      message:"Please verify your email first"
    });
  }

  const valid = await bcrypt.compare(password, user.password);

  if(!valid){
    return res.status(400).json({
      message:"Invalid password"
    });
  }

  res.json({
    message:"Login successful",
    user
  });

});

module.exports = router;