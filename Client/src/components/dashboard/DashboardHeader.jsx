import { Download, BarChart2, Filter, RefreshCw, Users, BookOpen, Star, Clock } from "lucide-react";

const DashboardHeader = ({ onExport, onRefresh }) => {
    return (
        <div className="p-4 mb-4">
            <div className="flex justify-between mb-4">
                <div>
                    <h1 className="text-xl font-bold text-blue-600">Feedback Dashboard</h1>
                    <p className="text-sm text-gray-600">View and analyze student feedback data</p>
                </div>

                <div className="flex gap-2">
                    <button onClick={onRefresh} className="p-2 border text-gray-700 hover:bg-gray-50">
                        <RefreshCw className="h-4 w-4" />
                        <span>Refresh</span>
                    </button>

                    <button className="p-2 border text-gray-700 hover:bg-gray-50">
                        <Filter className="h-4 w-4" />
                        <span>Filter</span>
                    </button>

                    <button className="p-2 border text-gray-700 hover:bg-gray-50">
                        <BarChart2 className="h-4 w-4" />
                        <span>Analytics</span>
                    </button>

                    <button onClick={onExport} className="p-2 bg-blue-600 text-white">
                        <Download className="h-4 w-4" />
                        <span>Export</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
                <div className="border p-2">
                    <div className="flex">
                        <div className="p-1 bg-blue-600 text-white mr-2">
                            <Users className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Total Feedbacks</div>
                            <div className="font-bold">247</div>
                            <div className="text-xs text-blue-600">12% from last month</div>
                        </div>
                    </div>
                </div>

                <div className="border p-2">
                    <div className="flex">
                        <div className="p-1 bg-green-500 text-white mr-2">
                            <Star className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Average Teaching Rating</div>
                            <div className="font-bold">4.7/5</div>
                            <div className="text-xs text-green-600">0.3 from last month</div>
                        </div>
                    </div>
                </div>

                <div className="border p-2">
                    <div className="flex">
                        <div className="p-1 bg-yellow-500 text-white mr-2">
                            <BookOpen className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Average Content Rating</div>
                            <div className="font-bold">4.5/5</div>
                            <div className="text-xs text-yellow-700">0.2 from last month</div>
                        </div>
                    </div>
                </div>

                <div className="border p-2">
                    <div className="flex">
                        <div className="p-1 bg-purple-500 text-white mr-2">
                            <Clock className="h-5 w-5" />
                        </div>
                        <div>
                            <div className="text-sm text-gray-500">Most Popular Course</div>
                            <div className="font-bold">Web Development</div>
                            <div className="text-xs text-purple-600">56 feedbacks this month</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHeader;