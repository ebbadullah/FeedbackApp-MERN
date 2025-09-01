import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, "Student name is required"],
    },
    courseName: {
      type: String,
      required: [true, "Course name is required"],
    },
    teacherName: {
      type: String,
      required: [true, "Teacher name is required"],
    },
    batchTiming: {
      type: String,
      required: [true, "Batch timing is required"],
    },
    classDays: {
      type: String,
      required: [true, "Class days are required"],
    },
    teachingRating: {
      type: Number,
      required: [true, "Teaching rating is required"],
      min: 1,
      max: 5,
    },
    contentRating: {
      type: Number,
      required: [true, "Content rating is required"],
      min: 1,
      max: 5,
    },
    comments: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
