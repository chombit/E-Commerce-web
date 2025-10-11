const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Get user's cart
exports.getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ user: req.user.userId }).populate(
            "items.product"
        );

        if (!cart) {
            // Create empty cart if none exists
            cart = await Cart.create({ user: req.user.userId, items: [] });
            await cart.populate("items.product");
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add item to cart
exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Validate product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Check stock availability
        if (product.stock < quantity) {
            return res.status(400).json({
                message: `Only ${product.stock} items available in stock`,
            });
        }

        let cart = await Cart.findOne({ user: req.user.userId });

        if (!cart) {
            // Create new cart if none exists
            cart = await Cart.create({
                user: req.user.userId,
                items: [
                    {
                        product: productId,
                        quantity,
                        price: product.price,
                    },
                ],
            });
        } else {
            // Update existing cart
            const existingItem = cart.items.find(
                (item) => item.product.toString() === productId
            );

            if (existingItem) {
                // Update quantity if item exists
                const newQuantity = existingItem.quantity + quantity;

                // Check stock again
                if (product.stock < newQuantity) {
                    return res.status(400).json({
                        message: `Only ${product.stock} items available in stock`,
                    });
                }

                existingItem.quantity = newQuantity;
            } else {
                // Add new item to cart
                cart.items.push({
                    product: productId,
                    quantity,
                    price: product.price,
                });
            }

            await cart.save();
        }

        // Populate product details before sending response
        await cart.populate("items.product");

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (quantity < 1) {
            return res.status(400).json({ message: "Quantity must be at least 1" });
        }

        // Validate product exists and check stock
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        if (product.stock < quantity) {
            return res.status(400).json({
                message: `Only ${product.stock} items available in stock`,
            });
        }

        const cart = await Cart.findOne({ user: req.user.userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.find(
            (item) => item.product.toString() === productId
        );

        if (!item) {
            return res.status(404).json({ message: "Item not found in cart" });
        }

        item.quantity = quantity;
        await cart.save();
        await cart.populate("items.product");

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: req.user.userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = cart.items.filter(
            (item) => item.product.toString() !== productId
        );

        await cart.save();
        await cart.populate("items.product");

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Clear cart
exports.clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        cart.items = [];
        await cart.save();

        res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};