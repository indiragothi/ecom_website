const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
    name: {
        type: String,
    },
    image: [],
    brands: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const category = mongoose.model('Category', CategorySchema);
module.exports = category;
