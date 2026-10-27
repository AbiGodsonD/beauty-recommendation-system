const User = require("../models/user");
const Product = require("../models/product");

const addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required"
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

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (!user.wishlist) {
            user.wishlist = [];
        }

        if (user.wishlist.includes(Number(productId))) {
            return res.status(400).json({
                success: false,
                message: "Product already in wishlist"
            });
        }

        user.wishlist.push(Number(productId));

        await user.save();

        res.status(200).json({
            success: true,
            message: "Product added to wishlist",
            wishlist: user.wishlist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add product to wishlist",
            error: error.message
        });
    }
};


const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.wishlist = (user.wishlist || []).filter(
            id => id !== Number(productId)
        );

        await user.save();

        res.status(200).json({
            success: true,
            message: "Product removed from wishlist",
            wishlist: user.wishlist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to remove product",
            error: error.message
        });
    }
};


const getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        const wishlist = await Product.find({
            id: { $in: user.wishlist || [] }
        });

        res.status(200).json({
            success: true,
            count: wishlist.length,
            wishlist
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get wishlist",
            error: error.message
        });
    }
};


module.exports = {
    addToWishlist,
    removeFromWishlist,
    getWishlist
};