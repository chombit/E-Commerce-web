const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be positive"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true,
    },
    image: {
        type: String,
        required: [true, "Image URL is required"],
    },
    rating: {
        rate: {
            type: Number,
            required: true,
            min: 0,
            max: 5,
            default: 0,
        },
        count: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Update the updatedAt field before saving
ProductSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("Product", ProductSchema);
module.exports = mongoose.model("Product", ProductSchema);
