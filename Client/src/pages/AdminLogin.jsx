import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Lock, Mail } from "lucide-react";
import { loginAdmin } from "../services/authService";

const AdminLogin = ({ setIsAuthenticated }) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!credentials.email || !credentials.password) {
            toast.error("Please enter both email and password");
            return;
        }

        setLoading(true);

        try {
            const response = await loginAdmin(credentials);
            const { token } = response;

            localStorage.setItem("token", token);
            setIsAuthenticated(true);

            toast.success("Login successful!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Login error:", error);
            toast.error(error.response?.data?.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-4 text-blue-600">Admin Login</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="email" name="email" value={credentials.email} onChange={handleChange} className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md" placeholder="admin@techzone.com" required />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="password" name="password" value={credentials.password} onChange={handleChange} className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md" placeholder="••••••••" required />
                    </div>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50">
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default AdminLogin;