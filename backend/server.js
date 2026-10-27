const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const interactionRoutes = require("./routes/interactionRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Beauty Recommendation API is running"
    });
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/interactions", interactionRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/wishlist", wishlistRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});