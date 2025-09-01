import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Home } from "lucide-react";
import { Button } from "../components/ui/Button";

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Techzone Learning</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
        <div className="relative mb-8">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-24 h-24 bg-brand-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-4xl">?</span>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 max-w-md mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <Button animation="slide" asChild>
          <Link to="/" className="flex items-center">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </>
  );
};

export default NotFoundPage;
