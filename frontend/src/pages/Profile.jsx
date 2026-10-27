import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Profile() {
    const { user } = useAuth();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get(
                    "/users/profile"
                );

                setProfile(response.data.user);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                    "Failed to load profile."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="profile-page">
                <div className="profile-message">
                    Loading profile...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="profile-page">
                <div className="profile-message">
                    {error}
                </div>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="profile-page">
                <div className="profile-message">
                    Profile not found.
                </div>
            </div>
        );
    }

    return (
        <div className="profile-page">

            <section className="profile-header">

                <p className="profile-eyebrow">
                    ACCOUNT
                </p>

                <h1>
                    My Profile
                </h1>

                <p>
                    Manage and view your BeautyFind account.
                </p>

            </section>


            <section className="profile-card">

                <div className="profile-avatar">
                    {profile.name
                        ?.charAt(0)
                        .toUpperCase()}
                </div>


                <div className="profile-info">

                    <div className="profile-field">
                        <span>
                            NAME
                        </span>

                        <strong>
                            {profile.name}
                        </strong>
                    </div>


                    <div className="profile-field">
                        <span>
                            EMAIL
                        </span>

                        <strong>
                            {profile.email}
                        </strong>
                    </div>


                    <div className="profile-field">
                        <span>
                            ACCOUNT TYPE
                        </span>

                        <strong>
                            {profile.role === "admin"
                                ? "Administrator"
                                : "User"}
                        </strong>
                    </div>

                </div>

            </section>


            <section className="profile-preferences">

                <h2>
                    Preferences
                </h2>

                <p>
                    Your product preferences are used to
                    personalize recommendations.
                </p>

                <div className="preference-placeholder">
                    Preference customization can be added
                    here as the recommendation system grows.
                </div>

            </section>

        </div>
    );
}

export default Profile;