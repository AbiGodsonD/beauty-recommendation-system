const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        product_ids: {
            type: [Number],
            default: []
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Recommendation",
    recommendationSchema,
    "recommendations"
);