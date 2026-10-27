const Product = require("../models/product");
const User = require("../models/user");
const Review = require("../models/review");
const Interaction = require("../models/interaction");

const getDashboardStats = async (req, res) => {
    try {
        const [
            totalProducts,
            totalUsers,
            totalReviews,
            totalInteractions
        ] = await Promise.all([
            Product.countDocuments(),
            User.countDocuments(),
            Review.countDocuments(),
            Interaction.countDocuments()
        ]);

        res.status(200).json({
            success: true,
            stats: {
                totalProducts,
                totalUsers,
                totalReviews,
                totalInteractions
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard statistics",
            error: error.message
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create product",
            error: error.message
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate(
            { id: Number(req.params.id) },
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update product",
            error: error.message
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({
            id: Number(req.params.id)
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete product",
            error: error.message
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password_hash")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: users.length,
            users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: error.message
        });
    }
};

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate("user_id", "name email")
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
        const review = await Review.findByIdAndDelete(req.params.id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }

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
    getDashboardStats,
    createProduct,
    updateProduct,
    deleteProduct,
    getUsers,
    deleteUser,
    getReviews,
    deleteReview
};