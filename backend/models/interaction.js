const mongoose = require("mongoose");

const interactionSchema = new mongoose.Schema(
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
        interaction_type: {
            type: String,
            enum: ["view", "like", "wishlist", "cart", "purchase"],
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Interaction",
    interactionSchema,
    "interactions"
);