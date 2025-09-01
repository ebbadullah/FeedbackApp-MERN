import { Star } from "lucide-react";

const RatingStars = ({ name, value, onChange, readOnly = false }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-6 h-6 ${
            readOnly ? "" : "cursor-pointer"
          } transition-all duration-200 ${
            star <= value
              ? "fill-brand-yellow-500 text-brand-yellow-500"
              : "text-gray-300 hover:text-brand-yellow-400"
          }`}
          onClick={() => !readOnly && onChange && onChange(name, star)}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">
        {value > 0 ? `${value}/5` : ""}
      </span>
    </div>
  );
};

export default RatingStars;
