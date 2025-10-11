const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Get user's orders
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.userId })
            .populate("items.product")
            .sort({ createdAt: -1 });

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get single order
exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user.userId,
        }).populate("items.product");

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create new order from cart
exports.createOrder = async (req, res) => {
    try {
        const { shippingAddress, orderNotes, paymentMethod } = req.body;

        // Get user's cart
        const cart = await Cart.findOne({ user: req.user.userId }).populate(
            "items.product"
        );

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // Check stock availability for all items
        for (const item of cart.items) {
            if (item.product.stock < item.quantity) {
                return res.status(400).json({
                    message: `${item.product.title} only has ${item.product.stock} items in stock`,
                });
            }
        }

        // Calculate totals
        const subtotal = cart.calculateTotal();
        const tax = subtotal * 0.1;
        const shipping = subtotal > 100 ? 0 : 9.99;
        const totalAmount = subtotal + tax + shipping;

        // Create order items
        const orderItems = cart.items.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price,
        }));

        // Create order
        const order = await Order.create({
            user: req.user.userId,
            items: orderItems,
            subtotal,
            tax,
            shipping,
            totalAmount,
            shippingAddress,
            orderNotes,
            paymentInfo: {
                method: paymentMethod,
                status: "pending",
            },
        });

        // Update product stock
        for (const item of cart.items) {
            await Product.findByIdAndUpdate(item.product._id, {
                $inc: { stock: -item.quantity },
            });
        }

        // Clear cart
        cart.items = [];
        await cart.save();

        // Populate order with product details
        await order.populate("items.product");

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update order status (admin only)
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = status;
        await order.save();
        await order.populate("items.product");

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user.userId,
        });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if (order.status === "shipped" || order.status === "delivered") {
            return res.status(400).json({
                message: "Cannot cancel order that has been shipped or delivered",
            });
        }

        // Restore stock
        for (const item of order.items) {
            await Product.findByIdAndUpdate(item.product, {
                $inc: { stock: item.quantity },
            });
        }

        order.status = "cancelled";
        await order.save();

        res.status(200).json({ message: "Order cancelled successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};