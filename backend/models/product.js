const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        brand: {
            type: String,
            default: "Unknown",
            index: true
        },
        name: {
            type: String,
            required: true,
            index: true
        },
        price: {
            type: Number,
            default: null
        },
        price_sign: {
            type: String,
            default: "$"
        },
        currency: {
            type: String,
            default: "USD"
        },
        image_link: {
            type: String,
            default: ""
        },
        product_link: {
            type: String,
            default: ""
        },
        website_link: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: ""
        },
        category: {
            type: String,
            default: "Unknown",
            index: true
        },
        product_type: {
            type: String,
            default: "Unknown",
            index: true
        },
        tag_list: {
            type: [String],
            default: []
        },
        created_at: String,
        updated_at: String,
        api_featured_image: {
            type: String,
            default: ""
        },
        product_colors: {
            type: mongoose.Schema.Types.Mixed,
            default: []
        }
    },
    {
        timestamps: false
    }
);

module.exports = mongoose.model("Product", productSchema, "products");