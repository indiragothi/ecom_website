const category = require('../Modal/categorymodel')
const asyncHandler = require('../middleware/catcherror')


exports.createcategory = async (req, res) => {
    try {
        const data = await category.create(req.body);
        res.status(201).json({
            success: true,
            message: "Category Created Successfully",
            data,
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Failed to Create Category"
        });
    }
};

exports.getcategory = async (req, res) => {
    try {
        const apifeatures = category.find();
        const categorys = await apifeatures
        res.send(categorys)
    } catch (error) {
        res.status(500).json({ 
            success: false,
        });
    }
 
};

exports.updatecategory = async (req, res) => {
    let categorys = category.findById(req.params.id)
    if (!categorys) {
        return res.status(500).json({
            success: false,
            message: "category not found"
        })
    }
    categorys = await category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        message: "Category Update Successfully",
        categorys
    })
};

exports.deletecategory = async (req, res) => {
    let categorys = category.findById(req.params.id)
    if (!categorys) {
        return res.status(500).json({
            success: false,
            message: "product not found"
        })
    }
    await categorys.deleteOne();
    res.status(200).json({
        success: true,
        message: "delete category successfully"
    })
};