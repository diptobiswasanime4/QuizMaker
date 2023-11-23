import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/db";
import QuizModel from "@/models/QuizModel";

connect();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const allQuiz = await QuizModel.find({});

    return NextResponse.json({ data: allQuiz });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
