const Review = require("../models/review");
const Product = require("../models/product");

const addReview = async (req, res) => {
    try {
        const {
            productId,
            rating,
            reviewText
        } = req.body;

        if (!productId || !rating) {
            return res.status(400).json({
                success: false,
                message: "Product ID and rating are required"
            });
        }

        const numericRating = Number(rating);

        if (
            !Number.isInteger(numericRating) ||
            numericRating < 1 ||
            numericRating > 5
        ) {
            return res.status(400).json({
                success: false,
                message: "Rating must be an integer between 1 and 5"
            });
        }

        const product = await Product.findOne({
            id: Number(productId)
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const review = await Review.create({
            user_id: req.user._id,
            product_id: Number(productId),
            rating: numericRating,
            review_text: reviewText || ""
        });

        res.status(201).json({
            success: true,
            message: "Review added successfully",
            review
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add review",
            error: error.message
        });
    }
};

const getProductReviews = async (req, res) => {
    try {
        const reviews = await Review.find({
            product_id: Number(req.params.productId)
        })
            .populate("user_id", "name")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: reviews.length,
            reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch reviews",
            error: error.message
        });
    }
};

const deleteReview = async (req, res) => {
    try {
        const review = await Review.findOne({
            _id: req.params.id,
            user_id: req.user._id
        });

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

        await review.deleteOne();

        res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete review",
            error: error.message
        });
    }
};

module.exports = {
    addReview,
    getProductReviews,
    deleteReview
};