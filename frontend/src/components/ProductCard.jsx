import { Link } from "react-router-dom";

function ProductCard({ product }) {
    return (
        <article className="product-card">

            <Link
                to={`/products/${product.id}`}
                className="product-image-container"
            >
                <img
                    src={product.image_link}
                    alt={product.name}
                    className="product-image"
                    onError={(event) => {
                        event.currentTarget.style.display = "none";
                        event.currentTarget.parentElement.classList.add(
                            "image-unavailable"
                        );
                    }}
                />

                <div className="image-fallback">
                    <span>BEAUTY</span>
                    <small>FIND</small>
                </div>
            </Link>


            <div className="product-card-content">

                <p className="product-brand">
                    {product.brand || "Unknown"}
                </p>

                <h3>
                    {product.name}
                </h3>

                <p className="product-category">
                    {product.category || "Unknown"}
                </p>

                <div className="product-card-bottom">

                    <p className="product-price">
                        {product.price !== null &&
                        product.price !== undefined
                            ? `${product.currency || "$"} ${product.price}`
                            : "Price unavailable"}
                    </p>

                    <Link
                        to={`/products/${product.id}`}
                        className="product-view-link"
                    >
                        View
                    </Link>

                </div>

            </div>

        </article>
    );
}

export default ProductCard;