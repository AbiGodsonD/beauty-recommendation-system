const Product = require("../models/product");
const {
    getRecommendations,
    getSimilarProducts
} = require("../services/recommendationService");

const getUserRecommendations = async (req, res) => {
    try {
        const products = await getRecommendations(req.user);

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to generate recommendations",
            error: error.message
        });
    }
};

const getSimilarProductsForProduct = async (req, res) => {
    try {
        const product = await Product.findOne({
            id: Number(req.params.productId)
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        const products = await getSimilarProducts(product);

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to find similar products",
            error: error.message
        });
    }
};

module.exports = {
    getUserRecommendations,
    getSimilarProductsForProduct
};