const Interaction = require("../models/interaction");

const createInteraction = async (req, res) => {
    try {
        const {
            product_id,
            interaction_type
        } = req.body;

        if (!product_id || !interaction_type) {
            return res.status(400).json({
                message: "Product ID and interaction type are required"
            });
        }

        const interaction = await Interaction.create({
            user_id: req.user._id,
            product_id: Number(product_id),
            interaction_type
        });

        res.status(201).json(interaction);
    } catch (error) {
        res.status(500).json({
            message: "Failed to record interaction",
            error: error.message
        });
    }
};

module.exports = {
    createInteraction
};