import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, LogIn, AlertCircle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";
import { loginAdmin } from "../../services/authService";

const AdminLoginForm = () => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();
    const { addToast } = useToast();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!credentials.email || !credentials.password) {
            setError("Please enter both email and password");
            addToast("Please enter both email and password", { type: "error" });
            return;
        }

        setLoading(true);
        setError("");

        try {
            console.log("Attempting login with:", credentials.email);
            const response = await loginAdmin(credentials);
            console.log("Login response:", response);

            login(response.token);

            setTimeout(() => {
                addToast("Login successful! Welcome to Techzone Learning Dashboard", { type: "success" });
                navigate("/dashboard");
            }, 100);
        } catch (error) {
            console.error("Login error:", error);
            const errorMessage = error.response?.data?.message || "Login failed. Please check your credentials.";
            setError(errorMessage);
            addToast(errorMessage, { type: "error" });

            if (error.response) {
                console.log("Error response data:", error.response.data);
                console.log("Error response status:", error.response.status);
            } else if (error.request) {
                console.log("No response received:", error.request);
            } else {
                console.log("Error setting up request:", error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border border-blue-200 max-w-md mx-auto">
            <div className="bg-blue-600 p-4 text-center">
                <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Techzone-Learning-Logo-120x117-uUGY2esfrxZHjEwkgj6r5cDYpI2FKZ.png" alt="Techzone Learning Logo" className="h-12 w-auto mx-auto mb-2" />
                <h2 className="text-xl font-bold text-white">Admin Portal</h2>
                <p className="text-white">Sign in to access the dashboard</p>
            </div>

            <div className="p-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                        <div className="bg-red-100 border border-red-200 text-red-700 p-2 flex items-start" role="alert">
                            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <div>
                        <label className="block mb-1">Email</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input type="email" name="email" value={credentials.email} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border" placeholder="email" required />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input type="password" name="password" value={credentials.password} onChange={handleChange} className="w-full pl-10 pr-3 py-2 border" placeholder="••••••••" required />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 border" />
                            <label htmlFor="remember-me" className="ml-2 block text-sm">Remember me</label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="text-blue-600">Forgot password?</a>
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 px-4 flex items-center justify-center gap-2 disabled:opacity-70">
                        {loading ? (
                            <>
                                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                <span>Signing in...</span>
                            </>
                        ) : (
                            <>
                                <LogIn className="h-4 w-4" />
                                <span>Sign in</span>
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginForm;