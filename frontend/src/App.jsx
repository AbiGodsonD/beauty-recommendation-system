import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import Recommendations from "./pages/Recommendations";
import Compare from "./pages/Compare";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route
                        path="/products/:id"
                        element={<ProductDetails />}
                    />

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                        <Route
                            path="/recommendations"
                            element={<Recommendations />}
                        />
                        <Route path="/compare" element={<Compare />} />
                    </Route>

                    <Route element={<AdminRoute />}>
                        <Route
                            path="/admin"
                            element={<AdminDashboard />}
                        />
                    </Route>
                </Routes>
            </main>

            <Footer />
        </BrowserRouter>
    );
}

export default App;