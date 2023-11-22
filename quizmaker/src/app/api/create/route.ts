import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/db/db";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const data = req.body;
    console.log(data);
    console.log("POST fn");

    return NextResponse.json({ data: data });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
