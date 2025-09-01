import { Helmet } from "react-helmet-async";
import AdminLoginForm from "../components/auth/AdminLoginForm";

const AdminLoginPage = () => {
    return (
        <>
            <Helmet>
                <title>Admin Login | Techzone Learning</title>
            </Helmet>
            <div className="max-w-md mx-auto py-8">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-blue-600 mb-2">Admin Portal</h1>
                    <p className="text-gray-600">Sign in to access the TechZone Learning dashboard</p>
                </div>
                <AdminLoginForm />
            </div>
        </>
    );
};

export default AdminLoginPage;