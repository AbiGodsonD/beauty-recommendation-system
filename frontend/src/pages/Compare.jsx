import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Compare() {
    const [productIds, setProductIds] = useState("");
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCompare = async () => {
        try {
            setError("");
            setLoading(true);

            const ids = productIds
                .split(",")
                .map((id) => Number(id.trim()))
                .filter((id) => id);

            if (ids.length < 2 || ids.length > 3) {
                setError("Enter 2 or 3 product IDs.");
                setProducts([]);
                return;
            }

            const uniqueIds = [...new Set(ids)];

            if (uniqueIds.length !== ids.length) {
                setError("Please enter different product IDs.");
                setProducts([]);
                return;
            }

            const responses = await Promise.all(
                ids.map((id) =>
                    api.get(`/products/${id}`)
                )
            );

            setProducts(
                responses.map(
                    (response) => response.data.product
                )
            );
        } catch (err) {
            setProducts([]);

            setError(
                err.response?.data?.message ||
                "Failed to load products for comparison."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="compare-page">

            <section className="compare-header">

                <p className="compare-eyebrow">
                    COMPARE BEAUTY
                </p>

                <h1>
                    Compare Products
                </h1>

                <p>
                    Compare 2 or 3 beauty products side by side
                    before making your choice.
                </p>

            </section>


            <section className="compare-input-card">

                <label>
                    Product IDs
                </label>

                <div className="compare-input-row">

                    <input
                        type="text"
                        placeholder="Example: 99, 100, 101"
                        value={productIds}
                        onChange={(event) =>
                            setProductIds(
                                event.target.value
                            )
                        }
                    />

                    <button
                        onClick={handleCompare}
                        disabled={loading}
                    >
                        {loading
                            ? "Loading..."
                            : "Compare"}
                    </button>

                </div>

                <p>
                    Enter product IDs separated by commas.
                </p>

                {error && (
                    <div className="compare-error">
                        {error}
                    </div>
                )}

            </section>


            {products.length > 0 && (
                <section className="comparison-section">

                    <div className="comparison-title">
                        <h2>
                            Product Comparison
                        </h2>

                        <span>
                            {products.length} products
                        </span>
                    </div>


                    <div className="comparison-table-wrapper">

                        <table className="comparison-table">

                            <thead>
                                <tr>
                                    <th>Feature</th>

                                    {products.map(
                                        (product) => (
                                            <th
                                                key={product.id}
                                            >
                                                <Link
                                                    to={`/products/${product.id}`}
                                                >
                                                    {product.name}
                                                </Link>
                                            </th>
                                        )
                                    )}
                                </tr>
                            </thead>


                            <tbody>

                                <tr>
                                    <td>Image</td>

                                    {products.map(
                                        (product) => (
                                            <td
                                                key={product.id}
                                            >
                                                <img
                                                    src={
                                                        product.image_link
                                                    }
                                                    alt={
                                                        product.name
                                                    }
                                                />
                                            </td>
                                        )
                                    )}
                                </tr>


                                <tr>
                                    <td>Brand</td>

                                    {products.map(
                                        (product) => (
                                            <td
                                                key={product.id}
                                            >
                                                {product.brand ||
                                                    "Unknown"}
                                            </td>
                                        )
                                    )}
                                </tr>


                                <tr>
                                    <td>Category</td>

                                    {products.map(
                                        (product) => (
                                            <td
                                                key={product.id}
                                            >
                                                {product.category ||
                                                    "Unknown"}
                                            </td>
                                        )
                                    )}
                                </tr>


                                <tr>
                                    <td>Product Type</td>

                                    {products.map(
                                        (product) => (
                                            <td
                                                key={product.id}
                                            >
                                                {product.product_type ||
                                                    "Unknown"}
                                            </td>
                                        )
                                    )}
                                </tr>


                                <tr>
                                    <td>Price</td>

                                    {products.map(
                                        (product) => (
                                            <td
                                                key={product.id}
                                                className="comparison-price"
                                            >
                                                {product.price !==
                                                    null &&
                                                product.price !==
                                                    undefined
                                                    ? `${product.currency || "$"} ${product.price}`
                                                    : "Unavailable"}
                                            </td>
                                        )
                                    )}
                                </tr>


                                <tr>
                                    <td>Description</td>

                                    {products.map(
                                        (product) => (
                                            <td
                                                key={product.id}
                                            >
                                                {product.description ||
                                                    "No description available."}
                                            </td>
                                        )
                                    )}
                                </tr>


                                <tr>
                                    <td>Product</td>

                                    {products.map(
                                        (product) => (
                                            <td
                                                key={product.id}
                                            >
                                                <Link
                                                    className="comparison-view-link"
                                                    to={`/products/${product.id}`}
                                                >
                                                    View Details
                                                </Link>
                                            </td>
                                        )
                                    )}
                                </tr>

                            </tbody>

                        </table>

                    </div>

                </section>
            )}

        </div>
    );
}

export default Compare;