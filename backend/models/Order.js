const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
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

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [OrderItemSchema],
    totalAmount: {
        type: Number,
        required: true,
    },
    subtotal: {
        type: Number,
        required: true,
    },
    tax: {
        type: Number,
        required: true,
        default: 0,
    },
    shipping: {
        type: Number,
        required: true,
        default: 0,
    },
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending",
    },
    shippingAddress: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    paymentInfo: {
        method: {
            type: String,
            enum: ["card", "paypal", "bank_transfer"],
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "completed", "failed", "refunded"],
            default: "pending",
        },
        transactionId: String,
    },
    orderNotes: {
        type: String,
        maxlength: [500, "Order notes cannot exceed 500 characters"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    deliveredAt: Date,
});

// Update updatedAt field before saving
OrderSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

// Set deliveredAt when status is set to delivered
OrderSchema.pre("save", function (next) {
    if (this.isModified("status") && this.status === "delivered" && !this.deliveredAt) {
        this.deliveredAt = Date.now();
    }
    next();
});

// Calculate totals before saving
OrderSchema.pre("save", function (next) {
    if (this.items && this.items.length > 0) {
        this.subtotal = this.items.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);

        this.tax = this.subtotal * 0.1; // 10% tax
        this.shipping = this.subtotal > 100 ? 0 : 9.99; // Free shipping over $100
        this.totalAmount = this.subtotal + this.tax + this.shipping;
    }
    next();
});

// Get order with populated product details
OrderSchema.methods.getPopulatedOrder = function () {
    return this.populate("items.product");
};

module.exports = mongoose.model("Order", OrderSchema);