import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Laptop, LogOut, Home } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const handleLogout = () => {
        logout();
        navigate("/admin");
    };

    const navLinks = [
        { name: "Home", path: "/", icon: <Home className="w-5 h-5" /> },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header className="bg-blue-600 text-white w-full sticky top-0 z-40">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex h-14 items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Techzone-Learning-Logo-120x117-uUGY2esfrxZHjEwkgj6r5cDYpI2FKZ.png" alt="TechZone Learning Logo" className="h-8 w-auto mr-2" />
                            <span className="hidden sm:block text-lg font-bold text-white">Techzone Learning</span>
                        </Link>
                    </div>

                    <nav className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link key={link.path} to={link.path} className={`flex items-center px-3 py-2 text-sm ${isActive(link.path) ? "bg-blue-700 text-white" : "text-white hover:bg-blue-700"}`}>
                                <span className="mr-2">{link.icon}</span>
                                {link.name}
                            </Link>
                        ))}

                        {isAuthenticated ? (
                            <>
                                <Link to="/dashboard" className={`flex items-center px-3 py-2 text-sm ${isActive("/dashboard") ? "bg-blue-700 text-white" : "text-white hover:bg-blue-700"}`}>
                                    <span className="mr-2"><Laptop className="w-5 h-5" /></span>
                                    Dashboard
                                </Link>
                                <button onClick={handleLogout} className="ml-2 flex items-center gap-1 bg-yellow-500 text-blue-900 px-3 py-2">
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/admin" className="ml-2 flex items-center gap-1 bg-yellow-500 text-blue-900 px-3 py-2">
                                <Laptop className="h-4 w-4" />
                                Admin Login
                            </Link>
                        )}
                    </nav>

                    <div className="flex md:hidden">
                        <button type="button" className="p-2 text-white" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-expanded={isMenuOpen} aria-label="Toggle menu">
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-blue-700">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {navLinks.map((link) => (
                            <Link key={link.path} to={link.path} className={`flex items-center px-3 py-2 text-base ${isActive(link.path) ? "bg-blue-800 text-white" : "text-white hover:bg-blue-800"}`}>
                                <span className="mr-3">{link.icon}</span>
                                {link.name}
                            </Link>
                        ))}

                        {isAuthenticated ? (
                            <>
                                <Link to="/dashboard" className={`flex items-center px-3 py-2 text-base ${isActive("/dashboard") ? "bg-blue-800 text-white" : "text-white hover:bg-blue-800"}`}>
                                    <span className="mr-3"><Laptop className="w-5 h-5" /></span>
                                    Dashboard
                                </Link>
                                <button onClick={handleLogout} className="w-full flex items-center justify-center gap-1 bg-yellow-500 text-blue-900 px-3 py-2 mt-2">
                                    <LogOut className="h-4 w-4" />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/admin" className="w-full flex items-center justify-center gap-1 bg-yellow-500 text-blue-900 px-3 py-2 mt-2">
                                <Laptop className="h-4 w-4" />
                                Admin Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;