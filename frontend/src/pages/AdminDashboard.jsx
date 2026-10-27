import { useEffect, useState } from "react";
import api from "../services/api";

function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get(
                    "/admin/stats"
                );

                setStats(response.data.stats);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Failed to load dashboard."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="admin-dashboard">

            <section className="admin-header">

                <div>
                    <p className="admin-eyebrow">
                        ADMINISTRATION
                    </p>

                    <h1>
                        Admin Dashboard
                    </h1>

                    <p>
                        Manage the BeautyFind platform and
                        monitor system activity.
                    </p>
                </div>

            </section>


            {loading && (
                <div className="admin-message">
                    Loading dashboard...
                </div>
            )}


            {error && (
                <div className="admin-message admin-error">
                    {error}
                </div>
            )}


            {!loading && !error && stats && (
                <>

                    <section className="admin-stats">

                        <div className="admin-stat-card">
                            <span>PRODUCTS</span>

                            <strong>
                                {stats.totalProducts}
                            </strong>

                            <p>
                                Products in catalogue
                            </p>
                        </div>


                        <div className="admin-stat-card">
                            <span>USERS</span>

                            <strong>
                                {stats.totalUsers}
                            </strong>

                            <p>
                                Registered accounts
                            </p>
                        </div>


                        <div className="admin-stat-card">
                            <span>REVIEWS</span>

                            <strong>
                                {stats.totalReviews}
                            </strong>

                            <p>
                                Customer reviews
                            </p>
                        </div>


                        <div className="admin-stat-card">
                            <span>INTERACTIONS</span>

                            <strong>
                                {stats.totalInteractions}
                            </strong>

                            <p>
                                Recorded interactions
                            </p>
                        </div>

                    </section>


                    <section className="admin-functions">

                        <div className="admin-section-heading">
                            <p>
                                MANAGEMENT
                            </p>

                            <h2>
                                Admin Functions
                            </h2>
                        </div>


                        <div className="admin-function-grid">

                            <div>
                                <span>01</span>

                                <h3>
                                    Product Management
                                </h3>

                                <p>
                                    Create, update and remove
                                    beauty products.
                                </p>
                            </div>


                            <div>
                                <span>02</span>

                                <h3>
                                    User Management
                                </h3>

                                <p>
                                    View and manage registered
                                    users.
                                </p>
                            </div>


                            <div>
                                <span>03</span>

                                <h3>
                                    Review Management
                                </h3>

                                <p>
                                    Monitor and moderate
                                    customer reviews.
                                </p>
                            </div>


                            <div>
                                <span>04</span>

                                <h3>
                                    System Analytics
                                </h3>

                                <p>
                                    Monitor products, users and
                                    interactions.
                                </p>
                            </div>

                        </div>

                    </section>

                </>
            )}

        </div>
    );
}

export default AdminDashboard;