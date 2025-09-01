import { Search, X } from "lucide-react";
import { useState } from "react";

const SearchBar = ({ value, onChange }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div className="mb-4">
            <div className={`relative flex border ${isFocused ? "border-blue-300" : "border-gray-300"}`}>
                <Search className={`h-5 w-5 m-2 ${isFocused ? "text-blue-500" : "text-gray-400"}`} />
                <input type="text" placeholder="Search by student name, course, teacher or comments..." value={value} onChange={(e) => onChange(e.target.value)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} className="w-full p-2 outline-none" aria-label="Search feedbacks" />
                {value && (
                    <button onClick={() => onChange("")} className="p-2 text-gray-400 hover:text-gray-600">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Clear search</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;