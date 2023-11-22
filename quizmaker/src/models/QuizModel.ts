import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
  question: String,
  options: [String],
  rightAnswerIndices: [Number],
});

const QuizModel = mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema);

export default QuizModel;
