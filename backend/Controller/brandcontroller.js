const brand = require('../Modal/brandmodel')
const asyncHandler = require('../middleware/catcherror')

exports.createbrand = async (req, res) => {
    try {
        const data = await brand.create(req.body);
        res.status(201).json({
            success: true,
            message: "brand created successfully",
            data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create brand",
        });
    }
};

exports.getbrand = async (req, res) => {
    try {
        const brands = await brand.find().populate('category');
        res.send(brands)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updatebrand = async (req, res) => {
    // console.log("req.params.id", req.params.id)
    try {
        let brands = await brand.findById(req.params.id)
        if (!brands) {
            return res.status(500).json({
                success: false,
                message: "brand not found"
            })
        }
        brands = await brand.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
        })
        res.status(200).json({
            success: true,
            message: "Update brand successfully",
            brands
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
};

exports.deletebrand = async (req, res) => {
    let brands = brand.findById(req.params.id)
    if (!brands) {
        return res.status(500).json({
            success: false,
            message: "brand not found"
        })
    }
    await brands.deleteOne();
    res.status(200).json({
        success: true,
        message: "delete brand successfully"
    })
};

exports.getBrandByCategory = async(req, res) =>{
    // console.log("req.params.categoryId", req.params.categoryId)
    try {
        const brands = await brand.find({ category: req.params.categoryId });
        res.json(brands);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch brands' });
      }
}