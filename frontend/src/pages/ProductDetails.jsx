import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/AuthContext";

function ProductDetails() {
    const { id } = useParams();
    const { user, isAuthenticated } = useAuth();

    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const [reviews, setReviews] = useState([]);

    const [rating, setRating] = useState(5);
    const [reviewText, setReviewText] = useState("");

    const [loading, setLoading] = useState(true);
    const [reviewLoading, setReviewLoading] = useState(false);
    const [error, setError] = useState("");
    const [reviewError, setReviewError] = useState("");
    const [wishlistMessage, setWishlistMessage] = useState("");

    const fetchReviews = async () => {
        try {
            const response = await api.get(
                `/reviews/product/${id}`
            );

            setReviews(response.data.reviews || []);
        } catch (err) {
            setReviewError(
                err.response?.data?.message ||
                "Failed to load reviews."
            );
        }
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(
                    `/products/${id}`
                );

                setProduct(response.data.product);

                if (isAuthenticated) {
                    const similarResponse = await api.get(
                        `/recommendations/similar/${id}`
                    );

                    setSimilarProducts(
                        similarResponse.data.products || []
                    );
                }

                await fetchReviews();
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Failed to load product."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, isAuthenticated]);

    const addToWishlist = async () => {
        if (!isAuthenticated) {
            setWishlistMessage(
                "Please login to add this product to your wishlist."
            );
            return;
        }

        try {
            setWishlistMessage("");

            await api.post("/wishlist/add", {
                productId: Number(id)
            });

            setWishlistMessage(
                "Product added to your wishlist."
            );
        } catch (err) {
            setWishlistMessage(
                err.response?.data?.message ||
                "Failed to add product to wishlist."
            );
        }
    };

    const submitReview = async (event) => {
        event.preventDefault();

        if (!isAuthenticated) {
            setReviewError(
                "Please login to submit a review."
            );
            return;
        }

        try {
            setReviewLoading(true);
            setReviewError("");

            await api.post("/reviews", {
                productId: Number(id),
                rating: Number(rating),
                reviewText
            });

            setReviewText("");
            setRating(5);

            await fetchReviews();
        } catch (err) {
            setReviewError(
                err.response?.data?.message ||
                "Failed to add review."
            );
        } finally {
            setReviewLoading(false);
        }
    };

    const deleteReview = async (reviewId) => {
        try {
            await api.delete(`/reviews/${reviewId}`);

            await fetchReviews();
        } catch (err) {
            setReviewError(
                err.response?.data?.message ||
                "Failed to delete review."
            );
        }
    };

    if (loading) {
        return (
            <div className="product-details-page">
                <div className="product-page-message">
                    Loading product...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-details-page">
                <div className="product-page-message">
                    {error}
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-details-page">
                <div className="product-page-message">
                    Product not found.
                </div>
            </div>
        );
    }

    return (
        <div className="product-details-page">

            {/* Breadcrumb */}

            <div className="product-breadcrumb">
                <Link to="/products">
                    Beauty Products
                </Link>

                <span>/</span>

                <span>Product</span>
            </div>


            {/* Main Product */}

            <section className="product-main-card">

                <div className="product-main-image">

                    <img
                        src={product.image_link}
                        alt={product.name}
                        onError={(event) => {
                            event.currentTarget.style.display =
                                "none";

                            event.currentTarget.parentElement.classList.add(
                                "product-image-fallback"
                            );
                        }}
                    />

                    <div className="product-fallback-content">
                        <strong>BEAUTY</strong>
                        <span>FIND</span>
                    </div>

                </div>


                <div className="product-main-info">

                    <p className="product-details-brand">
                        {product.brand || "Unknown"}
                    </p>

                    <h1>
                        {product.name}
                    </h1>

                    <p className="product-details-type">
                        {product.product_type || "Unknown"}
                    </p>

                    <p className="product-details-price">
                        {product.price !== null &&
                        product.price !== undefined
                            ? `${product.currency || "$"} ${product.price}`
                            : "Price unavailable"}
                    </p>

                    <p className="product-details-rating">
                        Product rating unavailable
                    </p>

                    <div className="product-description">

                        <p className="section-label">
                            DESCRIPTION
                        </p>

                        <p>
                            {product.description ||
                                "No description available for this product."}
                        </p>

                    </div>


                    <div className="product-actions">

                        <button
                            onClick={addToWishlist}
                            className="primary-action"
                        >
                            Add to Wishlist
                        </button>

                        {product.product_link && (
                            <a
                                href={product.product_link}
                                target="_blank"
                                rel="noreferrer"
                                className="secondary-action"
                            >
                                View Product
                            </a>
                        )}

                    </div>

                    {wishlistMessage && (
                        <p className="wishlist-message">
                            {wishlistMessage}
                        </p>
                    )}

                </div>

            </section>


            {/* Reviews */}

            <section className="product-reviews-section">

                <h2>
                    Reviews & Ratings
                </h2>


                <div className="reviews-layout">

                    {/* Add Review */}

                    <div className="review-form-card">

                        <h3>
                            Share your experience
                        </h3>

                        {isAuthenticated ? (
                            <form
                                onSubmit={submitReview}
                                className="review-form"
                            >

                                <div>
                                    <label>
                                        Rating
                                    </label>

                                    <select
                                        value={rating}
                                        onChange={(event) =>
                                            setRating(
                                                event.target.value
                                            )
                                        }
                                    >
                                        <option value="5">
                                            5 - Excellent
                                        </option>

                                        <option value="4">
                                            4 - Good
                                        </option>

                                        <option value="3">
                                            3 - Average
                                        </option>

                                        <option value="2">
                                            2 - Poor
                                        </option>

                                        <option value="1">
                                            1 - Very Poor
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label>
                                        Your Review
                                    </label>

                                    <textarea
                                        value={reviewText}
                                        onChange={(event) =>
                                            setReviewText(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Write your review..."
                                        rows="5"
                                    />
                                </div>

                                {reviewError && (
                                    <p className="review-error">
                                        {reviewError}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={reviewLoading}
                                >
                                    {reviewLoading
                                        ? "Submitting..."
                                        : "Submit Review"}
                                </button>

                            </form>
                        ) : (
                            <p className="login-review-message">
                                Please login to write a review.
                            </p>
                        )}

                    </div>


                    {/* Existing Reviews */}

                    <div className="existing-reviews-card">

                        <h3>
                            Customer Reviews
                        </h3>

                        {reviews.length === 0 ? (
                            <p className="no-reviews">
                                No reviews yet.
                            </p>
                        ) : (
                            <div className="reviews-list">

                                {reviews.map((review) => (
                                    <div
                                        className="review-item"
                                        key={review._id}
                                    >

                                        <div className="review-user">
                                            {review.user_id?.name ||
                                                "User"}
                                        </div>

                                        <div className="review-rating">
                                            Rating:{" "}
                                            {review.rating}/5
                                        </div>

                                        <p>
                                            {review.review_text ||
                                                "No written review."}
                                        </p>

                                        {user &&
                                            String(
                                                review.user_id?._id
                                            ) ===
                                                String(user.id) && (
                                                <button
                                                    className="delete-review"
                                                    onClick={() =>
                                                        deleteReview(
                                                            review._id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            )}

                                    </div>
                                ))}

                            </div>
                        )}

                    </div>

                </div>

            </section>


            {/* Similar Products */}

            {isAuthenticated &&
                similarProducts.length > 0 && (
                    <section className="similar-products-section">

                        <h2>
                            You May Also Like
                        </h2>

                        <div className="product-grid">
                            {similarProducts
                                .slice(0, 4)
                                .map((item) => (
                                    <ProductCard
                                        key={item.id}
                                        product={item}
                                    />
                                ))}
                        </div>

                    </section>
                )}


            <Link
                to="/products"
                className="back-products-link"
            >
                ← Back to Products
            </Link>

        </div>
    );
}

export default ProductDetails;