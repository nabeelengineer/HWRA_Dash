import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            navigate("/");
        }
    }, [navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (email === "admin@example.com" && password === "password123") {
            const user = { email, token: "fake-jwt-token" };
            localStorage.setItem("user", JSON.stringify(user));
            navigate("/");
            window.location.reload();
        } else {
            alert("Invalid credentials!");
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-100 shadow-2xl">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg">
                {/* Logo Image */}
                <img src="./src/assets/login.png" alt="Login Illustration" className="mx-auto w-40 h-44" />

                <h2 className="text-2xl text-center font-semibold my-4">Login</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-md mb-2"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-md mb-2"
                    />

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                                className="mr-2"
                            />
                            Remember Me
                        </label>
                        <a href="#" className="text-blue-500">Forgot Password?</a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-black text-white py-2 rounded-md py-2"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
