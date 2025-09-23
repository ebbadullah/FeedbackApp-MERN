import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { useToast } from "./components/ui/Toast"
import MainLayout from "./layouts/MainLayout";
import FeedbackFormPage from "./pages/FeedbackFormPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import DashboardPage from "./pages/DashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { ToastContainer } from "./components/ui/Toast";

function App() {
    const { isAuthenticated, isLoading } = useAuth();
    const { toasts, removeToast, addToast } = useToast();
    const [isFirstVisit, setIsFirstVisit] = useState(false);

    useEffect(() => {
        console.log("App.jsx - Auth State:", { isAuthenticated, isLoading });
    }, [isAuthenticated, isLoading]);

    useEffect(() => {
        const hasVisited = localStorage.getItem("hasVisitedTechZone");
        if (!hasVisited) {
            setIsFirstVisit(true);
            localStorage.setItem("hasVisitedTechZone", "true");
            setTimeout(() => {
                addToast("Welcome to TechZone Learning! We're excited to have you here.", { type: "info", duration: 6000 });
            }, 1000);
        }
    }, [addToast]);

    return (
        <>
            <ToastContainer toasts={toasts} removeToast={removeToast} />
            <div className="circuit-bg min-h-screen">
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<FeedbackFormPage />} />
                        <Route path="/admin" element={<AdminLoginPage />} />
                        <Route path="/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}><DashboardPage /></ProtectedRoute>} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                </Routes>
            </div>
        </>
    );
}

export default App;