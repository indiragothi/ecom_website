const product = require('../Modal/productmodal');
const Apifeatures = require('../utils/apifeatures');
const asyncHandler = require('../middleware/catcherror')

exports.createproduct = asyncHandler(async (req, res) => {
    try {
        // console.log("Request body:", req.body);
        const data = await product.create(req.body);
        res.status(201).json({
            data,
            status: true,
            message: "product created successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "failed to create product"
        });
    }
});

exports.getproduct = asyncHandler(async (req, res) => {
    try {
        const products = await product.find().populate('category').populate('brand');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

exports.getsingleproduct = async (req, res) => {
    try {
        const products = await product.findById(req.params.id).populate('category').populate('brand');
        res.status(200).json(products)
    } catch (error) {
        res.status(500).send('product not found');
    }
}

exports.getproductbyslug = asyncHandler(async (req, res) => {
    try {
        const product = await product.findOne({ slug: req.params.slug });
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Product not found');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }

    // try {
    //     const { slug } = req.params;
    //     const product = await product.findOne({ slug });

    //     if (!product) {
    //         res.status(404).json({
    //             message: "Product not found",
    //             error: true,
    //             success: false,
    //         });
    //         return;
    //     }

    //     res.status(200).json({
    //         data: product,
    //         message: "Product fetched successfully",
    //         success: true,
    //         error: false,
    //     });

    // } catch (error) {
    //     res.status(400).json({
    //         message: error.message || error,
    //         error: true,
    //         success: false,
    //     });
    // }
});

exports.updateproduct = async (req, res, next) => {
    let produts = product.findById(req.params.id)
    if (!produts) {
        return res.status(500).json({
            success: false,
            message: "product not found"
        })
    }
    produts = await product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        message: "product updated successfully",
        produts,
    })
}

exports.deleteproduct = async (req, res) => {
    let products = product.findById(req.params.id)
    if (!products) {
        return res.status(500).json({
            success: false,
            message: "product not found"
        })
    }
    await products.deleteOne();
    res.status(200).json({
        success: true,
        message: "delete product successfully"
    })
}