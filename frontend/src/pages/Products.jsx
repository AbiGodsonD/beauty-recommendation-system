import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();

    const search = searchParams.get("search") || "";
    const brand = searchParams.get("brand") || "";
    const category = searchParams.get("category") || "";
    const productType = searchParams.get("product_type") || "";
    const minPrice = searchParams.get("minPrice") || "";
    const maxPrice = searchParams.get("maxPrice") || "";

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError("");

            const params = {};

            if (search) params.search = search;
            if (brand) params.brand = brand;
            if (category) params.category = category;
            if (productType) params.product_type = productType;
            if (minPrice) params.minPrice = minPrice;
            if (maxPrice) params.maxPrice = maxPrice;

            const response = await api.get("/products", { params });

            setProducts(response.data.products || []);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to load products."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [
        search,
        brand,
        category,
        productType,
        minPrice,
        maxPrice
    ]);

    const updateFilter = (key, value) => {
        const params = new URLSearchParams(searchParams);

        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        setSearchParams(params);
    };

    const handleSearch = (value) => {
        updateFilter("search", value);
    };

    const clearFilters = () => {
        setSearchParams({});
    };

    return (
        <div className="products-page">

            {/* Page Header */}

            <section className="products-header">

                <p className="products-eyebrow">
                    DISCOVER BEAUTY
                </p>

                <h1>Beauty Products</h1>

                <p>
                    Browse, search and filter products from
                    our beauty collection.
                </p>

            </section>


            {/* Search */}

            <section className="products-search">

                <SearchBar onSearch={handleSearch} />

            </section>


            {/* Filters */}

            <section className="products-filter-panel">

                <div className="filter-heading">
                    <span>FILTERS</span>

                    <button
                        type="button"
                        onClick={clearFilters}
                        className="clear-filter-button"
                    >
                        Clear all
                    </button>
                </div>

                <div className="products-filters">

                    <input
                        type="text"
                        placeholder="Brand"
                        value={brand}
                        onChange={(event) =>
                            updateFilter(
                                "brand",
                                event.target.value
                            )
                        }
                    />

                    <input
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={(event) =>
                            updateFilter(
                                "category",
                                event.target.value
                            )
                        }
                    />

                    <input
                        type="text"
                        placeholder="Product Type"
                        value={productType}
                        onChange={(event) =>
                            updateFilter(
                                "product_type",
                                event.target.value
                            )
                        }
                    />

                    <input
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(event) =>
                            updateFilter(
                                "minPrice",
                                event.target.value
                            )
                        }
                    />

                    <input
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={(event) =>
                            updateFilter(
                                "maxPrice",
                                event.target.value
                            )
                        }
                    />

                </div>

            </section>


            {/* Results */}

            <section className="products-results">

                <div className="products-results-header">

                    <div>
                        <h2>Beauty Products</h2>

                        <p>
                            {loading
                                ? "Loading products..."
                                : `${products.length} products`}
                        </p>
                    </div>

                </div>


                {error && (
                    <div className="products-message">
                        {error}
                    </div>
                )}


                {loading && (
                    <div className="products-message">
                        Loading products...
                    </div>
                )}


                {!loading &&
                    !error &&
                    products.length === 0 && (
                        <div className="products-message">
                            No products found.
                        </div>
                    )}


                {!loading &&
                    !error &&
                    products.length > 0 && (
                        <div className="product-grid">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </div>
                    )}

            </section>

        </div>
    );
}

export default Products;