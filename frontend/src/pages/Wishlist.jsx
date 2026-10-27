import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Wishlist() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchWishlist = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/wishlist");

            setProducts(response.data.wishlist || []);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to load your wishlist."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    const removeFromWishlist = async (productId) => {
        try {
            await api.delete(`/wishlist/remove/${productId}`);

            setProducts((current) =>
                current.filter(
                    (product) => product.id !== productId
                )
            );
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to remove product."
            );
        }
    };

    if (loading) {
        return (
            <div className="wishlist-page">
                <div className="wishlist-message">
                    Loading your wishlist...
                </div>
            </div>
        );
    }

    return (
        <div className="wishlist-page">

            <section className="wishlist-header">
                <p className="wishlist-eyebrow">
                    YOUR COLLECTION
                </p>

                <h1>My Wishlist</h1>

                <p>
                    Keep the beauty products you love in one place.
                </p>
            </section>

            {error && (
                <div className="wishlist-error">
                    {error}
                </div>
            )}

            {!error && products.length === 0 && (
                <div className="empty-wishlist">

                    <div className="empty-wishlist-icon">
                        ♡
                    </div>

                    <h2>
                        Your wishlist is empty
                    </h2>

                    <p>
                        Explore our beauty collection and save
                        products you want to remember.
                    </p>

                    <Link to="/products">
                        Explore Products
                    </Link>

                </div>
            )}

            {products.length > 0 && (
                <>
                    <div className="wishlist-count">
                        {products.length} saved product
                        {products.length !== 1 ? "s" : ""}
                    </div>

                    <div className="wishlist-grid">

                        {products.map((product) => (
                            <article
                                className="wishlist-card"
                                key={product.id}
                            >

                                <Link
                                    to={`/products/${product.id}`}
                                    className="wishlist-image"
                                >
                                    <img
                                        src={product.image_link}
                                        alt={product.name}
                                        onError={(event) => {
                                            event.currentTarget.style.display =
                                                "none";
                                        }}
                                    />
                                </Link>

                                <div className="wishlist-card-content">

                                    <p className="product-brand">
                                        {product.brand || "Unknown"}
                                    </p>

                                    <h3>
                                        {product.name}
                                    </h3>

                                    <p className="wishlist-category">
                                        {product.category || "Unknown"}
                                    </p>

                                    <div className="wishlist-card-bottom">

                                        <strong>
                                            {product.price !== null &&
                                            product.price !== undefined
                                                ? `${product.currency || "$"} ${product.price}`
                                                : "Price unavailable"}
                                        </strong>

                                        <button
                                            onClick={() =>
                                                removeFromWishlist(
                                                    product.id
                                                )
                                            }
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>

                            </article>
                        ))}

                    </div>
                </>
            )}

        </div>
    );
}

export default Wishlist;