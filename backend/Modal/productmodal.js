const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: {
        type: String,
    },
    title: {
        type: String,
    },
    slug: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    discount: {
        type: Number,
    }, 
    rating: {
        type: Number,
        default: 0
    },
    image: [],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
    },
    stock: {
        type: Number
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

ProductSchema.pre('save', function (next) {
    if (this.title) {
        this.slug = this.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    }
    next();
});

const product = mongoose.model('Product', ProductSchema);
module.exports = product;
