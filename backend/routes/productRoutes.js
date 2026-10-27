const express = require("express");

const {
    getProducts,
    getProductById,
    getFeaturedProducts,
    getProductsByCategory
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getProducts);

router.get("/featured", getFeaturedProducts);

router.get("/category/:category", getProductsByCategory);

router.get("/:id", getProductById);

module.exports = router;