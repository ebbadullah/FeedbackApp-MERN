import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Download, Filter, Search } from "lucide-react";
import FeedbackTable from "../components/FeedbackTable";
import FilterBar from "../components/FilterBar";

const Dashboard = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ course: "", teacher: "", timing: "", days: "", searchTerm: "" });

    const getUniqueValues = (key) => {
        return [...new Set(feedbacks.map((item) => item[key]))].filter(Boolean);
    };

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("/api/admin/feedbacks", { headers: { Authorization: `Bearer ${token}` } });
                setFeedbacks(response.data);
                setFilteredFeedbacks(response.data);
            } catch (error) {
                console.error("Error fetching feedbacks:", error);
                toast.error("Failed to load feedback data");
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    useEffect(() => {
        let results = [...feedbacks];

        if (filters.course) results = results.filter((item) => item.courseName === filters.course);
        if (filters.teacher) results = results.filter((item) => item.teacherName === filters.teacher);
        if (filters.timing) results = results.filter((item) => item.batchTiming === filters.timing);
        if (filters.days) results = results.filter((item) => item.classDays === filters.days);

        if (filters.searchTerm) {
            const searchLower = filters.searchTerm.toLowerCase();
            results = results.filter((item) => item.studentName.toLowerCase().includes(searchLower) || item.comments?.toLowerCase().includes(searchLower));
        }

        setFilteredFeedbacks(results);
    }, [filters, feedbacks]);

    const handleFilterChange = (name, value) => {
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const clearFilters = () => {
        setFilters({ course: "", teacher: "", timing: "", days: "", searchTerm: "" });
    };

    const handleExport = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("/api/admin/feedbacks/export", { headers: { Authorization: `Bearer ${token}` }, responseType: "blob" });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `feedback_export_${new Date().toISOString().split("T")[0]}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            toast.success("Export successful!");
        } catch (error) {
            console.error("Export error:", error);
            toast.error("Failed to export data");
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between mb-4">
                <h1 className="text-xl font-bold text-blue-600">Feedback Dashboard</h1>

                <div>
                    <button onClick={handleExport} className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4">
                        <Download className="h-4 w-4" />
                        Export to Excel
                    </button>
                </div>
            </div>

            <div className="bg-white p-4 border">
                <div className="mb-4">
                    <div className="flex mb-2">
                        <Filter className="h-5 w-5 text-blue-600 mr-2" />
                        <h2 className="font-medium">Filters</h2>
                    </div>

                    <FilterBar filters={filters} onFilterChange={handleFilterChange} onClearFilters={clearFilters} courseOptions={getUniqueValues("courseName")} teacherOptions={getUniqueValues("teacherName")} timingOptions={getUniqueValues("batchTiming")} daysOptions={getUniqueValues("classDays")} />
                </div>

                <div>
                    <div className="mb-4">
                        <div className="relative flex border">
                            <Search className="h-5 w-5 m-2 text-gray-400" />
                            <input type="text" placeholder="Search by student name or comments..." value={filters.searchTerm} onChange={(e) => handleFilterChange("searchTerm", e.target.value)} className="w-full p-2 outline-none" />
                        </div>
                    </div>

                    <FeedbackTable feedbacks={filteredFeedbacks} loading={loading} />

                    {!loading && filteredFeedbacks.length === 0 && (
                        <div className="text-center py-6 text-gray-500">No feedback data found matching your filters.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;