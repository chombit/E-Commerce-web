const express = require("express");
const router = express.Router();
const productController = require("../controllers/Product");

// Public routes
router.get("/", productController.getAllProducts);
router.get("/category/:category", productController.getProductsByCategory);
router.get("/:id", productController.getProductById);

// Protected routes (admin only for creating/updating/deleting)
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;