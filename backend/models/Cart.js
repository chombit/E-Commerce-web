const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, "Quantity must be at least 1"],
    },
    price: {
        type: Number,
        required: true,
    },
});

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [CartItemSchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Update updatedAt field before saving
CartSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

// Calculate total price
CartSchema.methods.calculateTotal = function () {
    return this.items.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);
};

// Get cart with populated product details
CartSchema.methods.getPopulatedCart = function () {
    return this.populate("items.product");
};

module.exports = mongoose.model("Cart", CartSchema);