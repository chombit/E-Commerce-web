const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");
const { protect } = require("../middleware/auth");

// All cart routes require authentication
router.use(protect);

router.get("/", cartController.getCart);
router.post("/", cartController.addToCart);
router.put("/", cartController.updateCartItem);
router.delete("/item/:productId", cartController.removeFromCart);
router.delete("/", cartController.clearCart);

module.exports = router;