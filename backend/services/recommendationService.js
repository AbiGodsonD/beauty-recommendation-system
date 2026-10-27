const Product = require("../models/product");

const getRecommendations = async (user) => {
    const preferences = user.preferences || {};
    const query = {};

    if (preferences.categories?.length) {
        query.category = {
            $in: preferences.categories
        };
    }

    if (preferences.brands?.length) {
        query.brand = {
            $in: preferences.brands
        };
    }

    if (preferences.product_types?.length) {
        query.product_type = {
            $in: preferences.product_types
        };
    }

    if (
        preferences.max_price !== null &&
        preferences.max_price !== undefined
    ) {
        query.price = {
            $lte: preferences.max_price
        };
    }

    // Randomly select products matching the user's preferences
    let products = await Product.aggregate([
        { $match: query },
        { $sample: { size: 20 } }
    ]);

    // If there are not enough matching products,
    // randomly select from the complete product collection
    if (products.length < 10) {
        products = await Product.aggregate([
            { $sample: { size: 20 } }
        ]);
    }

    return products;
};

const getSimilarProducts = async (product) => {
    const conditions = [];

    if (
        product.category &&
        product.category !== "Unknown"
    ) {
        conditions.push({
            category: product.category
        });
    }

    if (
        product.product_type &&
        product.product_type !== "Unknown"
    ) {
        conditions.push({
            product_type: product.product_type
        });
    }

    if (
        product.brand &&
        product.brand !== "Unknown"
    ) {
        conditions.push({
            brand: product.brand
        });
    }

    const query = {
        id: {
            $ne: product.id
        }
    };

    if (conditions.length > 0) {
        query.$or = conditions;
    }

    return Product.find(query).limit(12);
};

module.exports = {
    getRecommendations,
    getSimilarProducts
};