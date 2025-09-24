import { useState } from "react";
import toast from "react-hot-toast";
import { Star } from "lucide-react";
import { submitFeedback } from "../../services/feedbackService";

const FeedbackForm = () => {
    const [formData, setFormData] = useState({
        studentName: "", courseName: "", teacherName: "", batchTiming: "", classDays: "", teachingRating: 0, contentRating: 0, comments: "",
    });

    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const courseOptions = ["Web Development", "Graphics Design", "Digital Marketing", "Mobile App Development", "Data Science"];
    const teacherOptions = ["Sir Abdul Rehman", "Sir Rehan Mughal", "Sir Ahmed Khan", "Sir Mohsin", "Sir Anas"];
    const timingOptions = ["9AM-12PM", "2PM-5PM", "6PM-9PM"];
    const daysOptions = ["MWF", "TTS"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRatingChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.studentName || !formData.courseName || !formData.teacherName || !formData.batchTiming || !formData.classDays || formData.teachingRating === 0 || formData.contentRating === 0) {
            toast.error("Please fill all required fields");
            return;
        }

        setLoading(true);

        try {
            await submitFeedback(formData);
            toast.success("Feedback submitted successfully!");
            setIsSubmitted(true);
        } catch (error) {
            console.error("Error submitting feedback:", error);
            toast.error("Failed to submit feedback. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const RatingStars = ({ name, value, onChange }) => {
        return (
            <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`w-6 h-6 cursor-pointer ${star <= value ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} onClick={() => onChange(name, star)} />
                ))}
            </div>
        );
    };

    const ThankYouCard = () => (
        <div className="border border-green-200 p-8 bg-white text-center">
            <div className="mb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-600 mb-2">Thank You!</h2>
                <p className="text-gray-600 mb-4">
                    Your feedback has been submitted successfully. We truly appreciate you taking the time to share your experience with us.
                </p>
                <p className="text-sm text-gray-500 mb-6">
                    Your input helps us improve our teaching quality and student experience.
                </p>
            </div>
            <button 
                onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                        studentName: "", courseName: "", teacherName: "", batchTiming: "", classDays: "", teachingRating: 0, contentRating: 0, comments: "",
                    });
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            >
                Submit Another Feedback
            </button>
        </div>
    );

    if (isSubmitted) {
        return <ThankYouCard />;
    }

    return (
        <div className="border border-blue-200 p-4 bg-white">
            <h1 className="text-xl font-bold text-center mb-2 text-blue-600">Student Feedback Form</h1>
            <p className="text-center mb-4">Help us improve by sharing your experience at Techzone Learning Center</p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1">Student Name *</label>
                    <input type="text" name="studentName" value={formData.studentName} onChange={handleChange} className="w-full p-2 border" placeholder="Enter your full name" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1">Course Name *</label>
                        <select name="courseName" value={formData.courseName} onChange={handleChange} className="w-full p-2 border" required>
                            <option value="">Select Course</option>
                            {courseOptions.map((course) => (
                                <option key={course} value={course}>{course}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1">Teacher Name *</label>
                        <select name="teacherName" value={formData.teacherName} onChange={handleChange} className="w-full p-2 border" required>
                            <option value="">Select Teacher</option>
                            {teacherOptions.map((teacher) => (
                                <option key={teacher} value={teacher}>{teacher}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block mb-1">Batch Timing *</label>
                        <select name="batchTiming" value={formData.batchTiming} onChange={handleChange} className="w-full p-2 border" required>
                            <option value="">Select Timing</option>
                            {timingOptions.map((timing) => (
                                <option key={timing} value={timing}>{timing}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-1">Class Days *</label>
                        <select name="classDays" value={formData.classDays} onChange={handleChange} className="w-full p-2 border" required>
                            <option value="">Select Days</option>
                            {daysOptions.map((days) => (
                                <option key={days} value={days}>{days}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block mb-1">Teaching Rating *</label>
                    <RatingStars name="teachingRating" value={formData.teachingRating} onChange={handleRatingChange} />
                </div>

                <div>
                    <label className="block mb-1">Content Rating *</label>
                    <RatingStars name="contentRating" value={formData.contentRating} onChange={handleRatingChange} />
                </div>

                <div>
                    <label className="block mb-1">Comments</label>
                    <textarea name="comments" value={formData.comments} onChange={handleChange} rows="4" className="w-full p-2 border" placeholder="Share your experience, suggestions, or any additional feedback..."></textarea>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2">
                    {loading ? "Submitting..." : "Submit Feedback"}
                </button>
            </form>
        </div>
    );
};

export default FeedbackForm;