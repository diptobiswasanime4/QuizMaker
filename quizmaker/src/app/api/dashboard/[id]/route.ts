import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/db";
import QuizModel from "@/models/QuizModel";
import getParamFromPath from "@/utils/getParamFromPath";

connect();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const path = req.nextUrl.pathname;
    const param = getParamFromPath(path);
    console.log(param);

    const QuizDoc = await QuizModel.findOne({ quizIndex: param });
    return NextResponse.json({ data: QuizDoc });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
