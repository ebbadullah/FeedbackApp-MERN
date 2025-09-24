import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { useToast } from "../hooks/useToast";
import { getAllFeedbacks, getDashboardStats, exportFeedbacks } from "../services/feedbackService";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import FeedbackFilters from "../components/dashboard/FeedbackFilters";
import FeedbackTable from "../components/dashboard/FeedbackTable";
import SearchBar from "../components/dashboard/SearchBar";

const DashboardPage = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [statsLoading, setStatsLoading] = useState(true);
    const [filters, setFilters] = useState({ course: "", teacher: "", timing: "", days: "", searchTerm: "" });
    const { showSuccess, showError } = useToast();

    const getUniqueValues = (key) => {
        return [...new Set(feedbacks.map((item) => item[key]))].filter(Boolean);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch feedbacks and stats in parallel
                const [feedbacksResponse, statsResponse] = await Promise.all([
                    getAllFeedbacks(),
                    getDashboardStats()
                ]);
                
                setFeedbacks(feedbacksResponse.data || []);
                setFilteredFeedbacks(feedbacksResponse.data || []);
                setStats(statsResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                showError("Failed to load dashboard data");
            } finally {
                setLoading(false);
                setStatsLoading(false);
            }
        };

        fetchData();
    }, [showError]);

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
            const blob = await exportFeedbacks();

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `feedback_export_${new Date().toISOString().split("T")[0]}.xlsx`);
            document.body.appendChild(link);
            link.click();
            link.remove();

            showSuccess("Export successful!");
        } catch (error) {
            console.error("Export error:", error);
            showError("Failed to export data");
        }
    };

    return (
        <>
            <Helmet>
                <title>Feedback Dashboard | Techzone Learning</title>
            </Helmet>

            <div className="p-4">
                <DashboardHeader onExport={handleExport} stats={stats} loading={statsLoading} />

                <div className="bg-white p-4 border">
                    <FeedbackFilters filters={filters} onFilterChange={handleFilterChange} onClearFilters={clearFilters} courseOptions={getUniqueValues("courseName")} teacherOptions={getUniqueValues("teacherName")} timingOptions={getUniqueValues("batchTiming")} daysOptions={getUniqueValues("classDays")} />

                    <div>
                        <SearchBar value={filters.searchTerm} onChange={(value) => handleFilterChange("searchTerm", value)} />

                        <FeedbackTable feedbacks={filteredFeedbacks} loading={loading} />

                        {!loading && filteredFeedbacks.length === 0 && (
                            <div className="text-center py-6 text-gray-500">No feedback data found matching your filters.</div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardPage;