import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/db";
import QuizModel from "@/models/QuizModel";
import { v4 } from "uuid";

connect();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody = await req.json();
    const { question, options, rightAnswerIndices } = reqBody;
    const id = v4();

    const newQuiz = new QuizModel({
      quizIndex: `${id}`,
      question,
      options,
      rightAnswerIndices,
    });

    const savedQuiz = await newQuiz.save();

    return NextResponse.json({
      savedQuiz,
      msg: "Quiz saved successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
