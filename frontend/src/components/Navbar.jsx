import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const isActive = (path) => {
        if (path === "/") {
            return location.pathname === "/";
        }

        return location.pathname.startsWith(path);
    };

    return (
        <header className="site-header">

            <nav className="navbar">

                <Link to="/" className="brand">

                    <div className="brand-icon">
                        ✦
                    </div>

                    <div className="brand-text">
                        <strong>
                            BeautyFind
                        </strong>

                        <span>
                            Beauty Recommendation
                        </span>
                    </div>

                </Link>


                <div className="nav-links">

                    <Link
                        to="/"
                        className={isActive("/")
                            ? "nav-link active"
                            : "nav-link"}
                    >
                        Home
                    </Link>

                    <Link
                        to="/products"
                        className={isActive("/products")
                            ? "nav-link active"
                            : "nav-link"}
                    >
                        Products
                    </Link>

                    {user && (
                        <Link
                            to="/recommendations"
                            className={
                                isActive("/recommendations")
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                        >
                            Recommendations
                        </Link>
                    )}

                    {user && (
                        <Link
                            to="/compare"
                            className={
                                isActive("/compare")
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                        >
                            Compare
                        </Link>
                    )}

                    {user && (
                        <Link
                            to="/wishlist"
                            className={
                                isActive("/wishlist")
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                        >
                            Wishlist
                        </Link>
                    )}

                    {user ? (
                        <>
                            <Link
                                to="/profile"
                                className={
                                    isActive("/profile")
                                        ? "nav-link active"
                                        : "nav-link"
                                }
                            >
                                Profile
                            </Link>

                            {user.role === "admin" && (
                                <Link
                                    to="/admin"
                                    className={
                                        isActive("/admin")
                                            ? "nav-link admin-link active"
                                            : "nav-link admin-link"
                                    }
                                >
                                    Admin
                                </Link>
                            )}

                            <button
                                className="logout-button"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="nav-link"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="nav-register"
                            >
                                Get Started
                            </Link>
                        </>
                    )}

                </div>

            </nav>

        </header>
    );
}

export default Navbar;