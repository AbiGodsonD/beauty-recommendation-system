const Product = require("../models/product");

// Get all products + search + filters
const getProducts = async (req, res) => {
    try {
        const {
            search,
            brand,
            category,
            product_type,
            minPrice,
            maxPrice,
            minRating
        } = req.query;

        const filter = {};

        if (search) {
            filter.name = { $regex: search, $options: "i" };
        }

        if (brand) {
            filter.brand = {
                $regex: `^${brand}$`,
                $options: "i"
            };
        }

        if (category) {
            filter.category = {
                $regex: `^${category}$`,
                $options: "i"
            };
        }

        if (product_type) {
            filter.product_type = {
                $regex: `^${product_type}$`,
                $options: "i"
            };
        }

        if (minPrice || maxPrice) {
            filter.price = {};

            if (minPrice) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        if (minRating) {
            filter.rating = {
                $gte: Number(minRating)
            };
        }

        const products = await Product.find(filter).sort({
            rating: -1
        });

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch products",
            error: error.message
        });
    }
};


// Get single product
const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({
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
            product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch product",
            error: error.message
        });
    }
};


// Get featured products
const getFeaturedProducts = async (req, res) => {
    try {
        const products = await Product.find({
            rating: { $ne: null }
        })
            .sort({ rating: -1 })
            .limit(10);

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch featured products",
            error: error.message
        });
    }
};


// Get products by category
const getProductsByCategory = async (req, res) => {
    try {
        const products = await Product.find({
            category: {
                $regex: req.params.category,
                $options: "i"
            }
        });

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch category products",
            error: error.message
        });
    }
};


module.exports = {
    getProducts,
    getProductById,
    getFeaturedProducts,
    getProductsByCategory
};