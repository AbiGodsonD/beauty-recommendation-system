import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function Recommendations() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchRecommendations = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                "/recommendations"
            );

            setProducts(response.data.products || []);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to load recommendations."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecommendations();
    }, []);

    return (
        <div className="recommendations-page">

            <section className="recommendations-header">

                <div>
                    <p className="recommendations-eyebrow">
                        PERSONALIZED FOR YOU
                    </p>

                    <h1>
                        Recommended For You
                    </h1>

                    <p>
                        Discover beauty products selected based
                        on your preferences.
                    </p>
                </div>

                <button
                    onClick={fetchRecommendations}
                    disabled={loading}
                    className="refresh-recommendations"
                >
                    {loading
                        ? "Refreshing..."
                        : "↻ Refresh"}
                </button>

            </section>


            {error && (
                <div className="recommendations-message">
                    {error}
                </div>
            )}


            {loading && (
                <div className="recommendations-message">
                    Finding products for you...
                </div>
            )}


            {!loading &&
                !error &&
                products.length === 0 && (
                    <div className="empty-recommendations">

                        <h2>
                            No recommendations yet
                        </h2>

                        <p>
                            Explore products and update your
                            preferences to get suggestions.
                        </p>

                        <Link to="/products">
                            Explore Products
                        </Link>

                    </div>
                )}


            {!loading &&
                !error &&
                products.length > 0 && (
                    <section>

                        <div className="recommendations-result-heading">
                            <h2>
                                You May Like
                            </h2>

                            <span>
                                {products.length} products
                            </span>
                        </div>

                        <div className="product-grid">

                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}

                        </div>

                    </section>
                )}

        </div>
    );
}

export default Recommendations;