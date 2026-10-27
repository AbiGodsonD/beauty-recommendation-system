const express = require("express");

const {
  addReview,
  getProductReviews,
  deleteReview
} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/product/:productId", getProductReviews);


console.log("protect type:", typeof protect);
console.log("addReview type:", typeof addReview);

router.post("/", protect, addReview);

router.delete("/:id", protect, deleteReview);

module.exports = router;