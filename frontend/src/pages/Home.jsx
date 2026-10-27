import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";

function Home() {
    const navigate = useNavigate();

    const handleSearch = (searchTerm) => {
        if (searchTerm) {
            navigate(
                `/products?search=${encodeURIComponent(searchTerm)}`
            );
        }
    };

    return (
        <div className="home-page">

            {/* Hero */}
            <section className="home-hero">

                {/* Background overlay */}
                <div className="home-hero-overlay"></div>

                {/* Hero content */}
                <div className="home-hero-content">

                    <p className="hero-eyebrow">
                        BEAUTY, SIMPLIFIED
                    </p>

                    <h1>
                        Find Your Perfect
                        <br />
                        Beauty Products
                    </h1>

                    <p className="hero-description">
                        Discover products that match your preferences,
                        style, and beauty routine.
                    </p>

                    <SearchBar onSearch={handleSearch} />

                </div>

            </section>


            {/* Features */}
            <section className="home-features-section">

                <h2>
                    Everything you need to discover better
                </h2>

                <div className="home-features">

                    <div className="home-feature-card">

                        <span className="feature-number">
                            01
                        </span>

                        <h3>
                            Explore Products
                        </h3>

                        <p>
                            Browse and filter our beauty product
                            collection.
                        </p>

                    </div>


                    <div className="home-feature-card">

                        <span className="feature-number">
                            02
                        </span>

                        <h3>
                            Personalized Recommendations
                        </h3>

                        <p>
                            Get suggestions based on your preferences.
                        </p>

                    </div>


                    <div className="home-feature-card">

                        <span className="feature-number">
                            03
                        </span>

                        <h3>
                            Save Your Favorites
                        </h3>

                        <p>
                            Keep your favorite products in one place.
                        </p>

                    </div>

                </div>

            </section>


            {/* Categories */}
            <section className="home-category-section">

                <h2>
                    Shop by category
                </h2>

                <div className="category-grid">

                    <Link
                        to="/products?category=Makeup"
                        className="category-pill"
                    >
                        Makeup
                    </Link>

                    <Link
                        to="/products?category=Skincare"
                        className="category-pill"
                    >
                        Skincare
                    </Link>

                    <Link
                        to="/products?category=Haircare"
                        className="category-pill"
                    >
                        Haircare
                    </Link>

                    <Link
                        to="/products?category=Fragrance"
                        className="category-pill"
                    >
                        Fragrance
                    </Link>

                </div>

            </section>

        </div>
    );
}

export default Home;