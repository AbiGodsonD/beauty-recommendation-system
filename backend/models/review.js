const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        product_id: {
            type: Number,
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        review_text: {
            type: String,
            default: "",
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Review", reviewSchema, "reviews");