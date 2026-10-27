const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password_hash: {
            type: String,
            required: true
        },
        preferences: {
            brands: {
                type: [String],
                default: []
            },
            categories: {
                type: [String],
                default: []
            },
            product_types: {
                type: [String],
                default: []
            },
            tags: {
                type: [String],
                default: []
            },
            max_price: {
                type: Number,
                default: null
            }
        },
        wishlist: {
            type: [Number],
            default: []
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema, "users");