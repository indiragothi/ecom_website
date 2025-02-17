const asyncHandler = require("../middleware/catcherror");
const errorHandler = require("../utils/errorhandler");
const sendToken = require("../utils/jwtToken");
const { user } = require("../Modal/usermodal");

exports.registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword, phone } = req.body;

    if (!name || !email || !password || !confirmPassword || !phone) {
      return next(new errorHandler("Please add all fields"));
    }

    if (password !== confirmPassword) {
      return next(new errorHandler("Password don't match"));
    }

    // Check if user exists
    const userExists = await user.findOne({ email });

    if (userExists) {
      return next(new errorHandler("User already exists"));
    }

    const users = await user.create({
      name,
      email,
      password,
      phone,
    });

    if (users) {
      const token = users.getJWTToken();
      const saveUser = await users.save();

      res.status(200).json({
        saveUser,
        token,
        success: true,
        error: false,
        message: "User created Successfully!",
      });
    }
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
});

exports.loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new errorHandler("please enter email and password", 400));
    }

    const users = await user.findOne({ email }).select("+password");
    if (!users) {
      return next(new errorHandler("invalid email or password", 401));
    }

    const ispasswordmatch = await users.comparePassword(password);

    if (!ispasswordmatch) {
      return next(new errorHandler("invalid email or password", 401));
    }

    if(users && ispasswordmatch){
      sendToken(users, 200, res);
    }
    
  } catch (err) {
    return next(err);
  }
});

exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "logged Out",
  });
});

exports.getalluser = asyncHandler(async (req, res, next) => {
  try {
      const users = await user.find({});
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  try {
    const userToDelete = await user.findById(req.params.id);

    if (!userToDelete) {
      return next(new errorHandler("User not found", 404));
    }

    await userToDelete.deleteOne();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return next(new errorHandler(error.message || "Failed to delete user", 500));
  }
});