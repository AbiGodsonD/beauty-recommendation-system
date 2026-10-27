const express = require("express");

const {
    getUserRecommendations,
    getSimilarProductsForProduct
} = require("../controllers/recommendationController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getUserRecommendations);

router.get(
    "/similar/:productId",
    protect,
    getSimilarProductsForProduct
);

module.exports = router;