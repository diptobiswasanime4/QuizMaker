import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
  quizIndex: String,
  question: String,
  options: [String],
  rightAnswerIndices: [Number],
});

const QuizModel =
  mongoose.models.quizCollections ||
  mongoose.model("quizCollections", QuizSchema);

export default QuizModel;
