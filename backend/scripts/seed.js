const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("../models/Product");
const User = require("../models/User");

// Load environment variables
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected for seeding");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

const sampleProducts = [
    {
        title: "Premium Wireless Headphones",
        price: 199.99,
        description: "High-quality wireless headphones with noise cancellation and premium sound quality. Perfect for music lovers and professionals.",
        category: "electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
        rating: { rate: 4.5, count: 120 },
        stock: 25,
    },
    {
        title: "Smart Fitness Watch",
        price: 299.99,
        description: "Advanced fitness tracking watch with heart rate monitoring, GPS, and smartphone connectivity.",
        category: "electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
        rating: { rate: 4.2, count: 85 },
        stock: 15,
    },
    {
        title: "Organic Cotton T-Shirt",
        price: 29.99,
        description: "Comfortable and sustainable organic cotton t-shirt. Available in multiple colors and sizes.",
        category: "clothing",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
        rating: { rate: 4.0, count: 200 },
        stock: 50,
    },
    {
        title: "Professional Camera Lens",
        price: 899.99,
        description: "85mm f/1.4 professional portrait lens with exceptional image quality and beautiful bokeh.",
        category: "electronics",
        image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500",
        rating: { rate: 4.8, count: 45 },
        stock: 8,
    },
    {
        title: "Ergonomic Office Chair",
        price: 349.99,
        description: "Premium ergonomic office chair with lumbar support, adjustable height, and breathable mesh material.",
        category: "furniture",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500",
        rating: { rate: 4.3, count: 67 },
        stock: 12,
    },
    {
        title: "Stainless Steel Water Bottle",
        price: 24.99,
        description: "Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
        category: "home",
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",
        rating: { rate: 4.1, count: 150 },
        stock: 100,
    },
    {
        title: "Mechanical Gaming Keyboard",
        price: 159.99,
        description: "RGB backlit mechanical gaming keyboard with blue switches and customizable lighting effects.",
        category: "electronics",
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500",
        rating: { rate: 4.6, count: 98 },
        stock: 20,
    },
    {
        title: "Minimalist Desk Lamp",
        price: 79.99,
        description: "Modern LED desk lamp with touch controls, adjustable brightness, and wireless charging base.",
        category: "home",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
        rating: { rate: 4.4, count: 76 },
        stock: 30,
    },
];

const sampleUsers = [
    {
        username: "admin",
        email: "admin@example.com",
        password: "admin123",
        role: "admin",
    },
    {
        username: "customer1",
        email: "customer1@example.com",
        password: "customer123",
        role: "customer",
    },
    {
        username: "customer2",
        email: "customer2@example.com",
        password: "customer123",
        role: "customer",
    },
];

const seedDatabase = async () => {
    try {
        // Clear existing data
        await Product.deleteMany({});
        await User.deleteMany({});

        console.log("Cleared existing data");

        // Insert sample products
        const createdProducts = await Product.insertMany(sampleProducts);
        console.log(`Created ${createdProducts.length} sample products`);

        // Insert sample users
        const createdUsers = await User.insertMany(sampleUsers);
        console.log(`Created ${createdUsers.length} sample users`);

        console.log("Database seeded successfully!");

        // Display created data
        console.log("\nSample Products:");
        createdProducts.forEach((product, index) => {
            console.log(`${index + 1}. ${product.title} - $${product.price} (${product.category})`);
        });

        console.log("\nSample Users:");
        createdUsers.forEach((user, index) => {
            console.log(`${index + 1}. ${user.username} - ${user.email} (${user.role})`);
        });

    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        process.exit();
    }
};

// Run the seeder
connectDB().then(() => {
    seedDatabase();
});