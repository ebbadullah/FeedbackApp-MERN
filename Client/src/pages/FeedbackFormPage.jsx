import { Helmet } from "react-helmet-async";
import FeedbackForm from "../components/feedback/FeedbackForm";

const FeedbackFormPage = () => {
    return (
        <>
            <Helmet>
                <title>Student Feedback Form | Techzone Learning</title>
            </Helmet>
            <div className="max-w-2xl mx-auto py-6">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-blue-600 mb-2">Share Your Learning Experience</h1>
                    <p className="text-gray-600 max-w-lg mx-auto">Your feedback helps us improve our courses and teaching methods. Thank you for taking the time to share your experience at TechZone Learning.</p>
                </div>
                <FeedbackForm />
            </div>
        </>
    );
};

export default FeedbackFormPage;