const asyncHandler = require('../middleware/catcherror')
const errorHandler = require('../utils/errorhandler')
const jwt = require('jsonwebtoken')
const { user } = require('../Modal/usermodal')

exports.isAuthenticatedUser = asyncHandler(async (req, res, next) => {
    // const { token } = req.cookies;
    const {token} = req.cookies || req.headers.authorization.split(" ")[1];
    
    // console.log("Cookies:", req.cookies);
    console.log("Token:", token);

    if (!token) {
        return next(new errorHandler("please login to access", 401))
    }

    const decodedata = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decodedata", decodedata)

    if(!decodedata) {
        return next(new errorHandler("Unauthorized access", 401))
    }

    const userId = await user.findById(decodedata.id).select("-password");
    console.log("user", userId)
    if(!userId) {
        return next(new errorHandler("User not found", 404))
    }
    
    req.user = userId
    next();
})