const express = require("express");

const {
    getDashboardStats,
    createProduct,
    updateProduct,
    deleteProduct,
    getUsers,
    deleteUser,
    getReviews,
    deleteReview
} = require("../controllers/adminController");

const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect, adminOnly);

router.get("/stats", getDashboardStats);

router.post("/products", createProduct);
router.put("/products/:id", updateProduct);
router.delete("/products/:id", deleteProduct);

router.get("/users", getUsers);
router.delete("/users/:id", deleteUser);

router.get("/reviews", getReviews);
router.delete("/reviews/:id", deleteReview);

module.exports = router;