const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");
const { protect, authorize } = require("../middleware/auth");

// All order routes require authentication
router.use(protect);

// Customer routes
router.get("/", orderController.getOrders);
router.get("/:id", orderController.getOrder);
router.post("/", orderController.createOrder);
router.put("/:id/cancel", orderController.cancelOrder);

// Admin routes
router.put("/:id/status", authorize("admin"), orderController.updateOrderStatus);

module.exports = router;