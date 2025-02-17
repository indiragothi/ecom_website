const mongoose = require('mongoose');
const { Schema } = mongoose;

const BrandSchema = new Schema({
    name: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const brand = mongoose.model('Brand', BrandSchema);
module.exports = brand;