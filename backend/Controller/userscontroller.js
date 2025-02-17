const asyncHandler = require("express-async-handler");
const bcrypt = require('bcryptjs');
const {User} = require('../Modal/usermodal');
const { generateTokenAndSetCookie } = require('../utils/generateToken')

// For Register user
const handleSignUp = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone } = req.body;

    if (!name || !email || !password || !confirmPassword || !phone) {
      throw new Error("Please add all fields");
    }

    if( password !== confirmPassword ){
      throw new Error("Password don't match");
    }
   
    //   Check if user exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new Error("User already exists");
    }

    // generate salt and hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if(!hashedPassword){
      throw new Error("Something is wrong");
    }

    // Create user
    const newUser = await User.create({
      name,
      email,
      password : hashedPassword,
      phone,
    });

    if(newUser){
      // Token generate and set cookie
      generateTokenAndSetCookie(newUser._id, res)
      const saveUser = await newUser.save();

      res.json({
        data : saveUser,
        success : true,
        error : false,
        message : "User created Successfully!"
      });
    }else {
      throw new Error("User don't create");
    } 
  } catch (err) { 
    res.json({
      message : err.message || err  ,
      error : true,
      success : false,
  })
  }   
});

// For Login user  
const handleSignIn = asyncHandler(async(req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new Error("please enter email and password")
    }

    const user = await User.findOne({ email })
    const isPasswordCorrect = await bcrypt.compare(password, user.password || "")

    if(!user || !isPasswordCorrect){
      throw new Error("Invalid email or password");
    }

    if(user && isPasswordCorrect){
      generateTokenAndSetCookie(user._id, res)

      res.json({
        message : "Login successfully",
        data : user,
        success : true,
        error : false
      });
   } else {
      throw new Error("Invalid user data");
    } 
  } catch (err) {
    res.json({
      message : err.message || err  ,
      error : true,
      success : false,
  })
  } 
});

// For Logout
const handleLogout = asyncHandler(async(req, res) =>{
  try {
    res.clearCookie("token")

    res.json({
      message : "Logged out successfully",
      error : false,
      success : true,
      data : [],
    })
    
  } catch (error) {
    res.json({
      message : error.message || error,
      error : true,
      success : false,
    })
  }
})

module.exports = {
    handleSignUp,
    handleSignIn,
    handleLogout,
  };