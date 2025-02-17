const asyncHandler = require('../middleware/catcherror');
const errorHandler = require('../utils/errorhandler');
const Cart = require('../Modal/cartmodel')
// const product = require('../Modal/productmodal')

exports.addToCart = asyncHandler(async (req, res, next) => {
    
    try {
        const { product: productId } = req.body;
        // const userId = req.user;
        const userId = "66a22092360adeb34394d28d"

        console.log("userId is", userId);
        console.log("productId is", productId);

        if (!productId) {
            return next(new errorHandler("Product ID is required", 400));
        }
 
        let cart = await Cart.findOne({ user: userId });
 
        if (cart) {
            let productExists = cart.items.find(item => item.product.toString() === productId);

            if (productExists) {
                return next(new errorHandler("Product already exists in cart", 400));
            } else {
                cart.items.push({ product: productId, quantity: 1 });
            }
        } else {
            cart = new Cart({
                user: userId,
                items: [{ product: productId, quantity: 1 }]
            });
        }

        await cart.save();
        res.status(200).json({ success: true, message: 'Item added to cart', cart });
    } catch (error) {
        return next(new errorHandler(error.message || "Failed to add item to cart", 500));
    }
});

exports.countAddToCartProduct = asyncHandler(async(req, res) =>{
    try {
        // const userId = req.user._id;
        const userId = "66a22092360adeb34394d28d"

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.json({
                data: {
                    count: 0
                },
                message: "Cart is empty",
                success: true,
                error: false
            });
        }

        const count = cart.items.length;

        res.json({
            data: {
                count: count
            },
            message: "ok",
            success: true,
            error: false
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || "Failed to get cart count",
            error: true,
            success: false,
        });
    }
})

exports.viewAddToCartProduct = asyncHandler(async(req, res) =>{
    try {
        // const userId = req.user._id;
        const userId = "66a22092360adeb34394d28d"

        const cart = await Cart.findOne({ user: userId }).populate('items.product');

        if (!cart) {
            return res.json({
                data: [],
                message: "Cart is empty",
                success: true,
                error: false
            });
        }

        res.json({
            data: cart.items,
            success: true,
            error: false
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || "Failed to retrieve cart items",
            error: true,
            success: false,
        });
    }
})

exports.updateAddToCartProduct = asyncHandler(async(req, res) =>{
    try {
        // const userId = req.user._id;
         const userId = "66a22092360adeb34394d28d"
        const { product: productId, quantity } = req.body;

        if (!productId || !quantity) {
            return res.status(400).json({
                message: "Product ID and quantity are required",
                error: true,
                success: false,
            });
        }

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
                error: true,
                success: false,
            });
        }

        const productIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({
                message: "Product not found in cart",
                error: true,
                success: false,
            });
        }

        cart.items[productIndex].quantity = quantity;

        await cart.save();

        res.json({
            data: cart,
            message: "Product quantity updated",
            success: true,
            error: false
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || "Failed to update product quantity",
            error: true,
            success: false,
        });
    }
})

exports.deleteAddToCartProduct = asyncHandler(async (req, res) => {
    
    try {
        // const userId = req.user._id;
        const userId = "66a22092360adeb34394d28d"
        const { product: productId } = req.body;

        if (!productId) {
            return res.status(400).json({
                message: "Product ID is required",
                error: true,
                success: false,
            });
        }

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({
                message: "Cart not found",
                error: true,
                success: false,
            });
        }

        const productIndex = cart.items.findIndex(item => item.product.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({
                message: "Product not found in cart",
                error: true,
                success: false,
            });
        }

        cart.items.splice(productIndex, 1);
        // cart.items.deleteOne()
         
        const newCart = await cart.save();

        res.json({
            data: newCart,
            message: "Product removed from cart",
            success: true,
            error: false
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || "Failed to remove product from cart",
            error: true,
            success: false,
        });
    }
});
