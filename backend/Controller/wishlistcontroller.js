const Wishlist = require('../Modal/wishlistmodel')
const asyncHandler = require('../middleware/catcherror');
const errorHandler = require('../utils/errorhandler');

exports.addToWishlist = asyncHandler(async (req, res, next) => {
    try {
        const { product: productId } = req.body;
        // const userId = req.user._id;
        const userId = "66a22092360adeb34394d28d"

        if (!productId) {
            return next(new errorHandler("Product ID is required", 400));
        }

        let wishlist = await Wishlist.findOne({ user: userId });

        if (wishlist) {
            let productExists = wishlist.items.find(item => item.product.toString() === productId);

            if (productExists) {
                return next(new errorHandler("Product already exists in wishlist", 400));
            } else {
                wishlist.items.push({ product: productId });
            }
        } else {
            wishlist = new Wishlist({
                user: userId,
                items: [{ product: productId }]
            });
        }

        await wishlist.save();
        res.status(200).json({ success: true, message: 'Item added to wishlist', wishlist });
    } catch (error) {
        return next(new errorHandler(error.message || "Failed to add item to wishlist", 500));
    }
});

exports.countAddToWishlistProduct = asyncHandler(async (req, res) => {
    try {
        // const userId = req.user._id;
        const userId = "66a22092360adeb34394d28d"

        if (!userId) {
            return res.status(400).json({
                message: "User ID is required",
                error: true,
                success: false,
            });
        }

        const wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            return res.json({
                data: {
                    count: 0
                },
                message: "Wishlist is empty",
                success: true,
                error: false
            });
        }

        const count = wishlist.items.length;

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
            message: error.message || "Failed to get wishlist count",
            error: true,
            success: false,
        });
    }
});

exports.viewWishlist = asyncHandler(async (req, res) => {
    try {
        // const userId = req.user._id;
        const userId = "66a22092360adeb34394d28d"

        const wishlist = await Wishlist.findOne({ user: userId }).populate('items.product');

        if (!wishlist) {
            return res.json({
                data: [],
                message: "Wishlist is empty",
                success: true,
                error: false
            });
        }

        res.json({
            data: wishlist.items,
            success: true,
            error: false
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || "Failed to retrieve wishlist items",
            error: true,
            success: false,
        });
    }
});

exports.deleteFromWishlist = asyncHandler(async (req, res) => {
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

        const wishlist = await Wishlist.findOne({ user: userId });

        if (!wishlist) {
            return res.status(404).json({
                message: "Wishlist not found",
                error: true,
                success: false,
            });
        }

        const productIndex = wishlist.items.findIndex(item => item.product.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({
                message: "Product not found in wishlist",
                error: true,
                success: false,
            });
        }

        wishlist.items.splice(productIndex, 1);

        await wishlist.save();

        res.json({
            data: wishlist,
            message: "Product removed from wishlist",
            success: true,
            error: false
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || "Failed to remove product from wishlist",
            error: true,
            success: false,
        });
    }
});