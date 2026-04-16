import { db } from "@/db";
import { submissions } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, answer, tier, name, email, tradition, references, rationale } = body;

    if (!question || !tier || !name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [row] = await db
      .insert(submissions)
      .values({ question, answer, tier, name, email, tradition, references, rationale })
      .returning({ id: submissions.id });

    return NextResponse.json({ id: row.id });
  } catch (e) {
    console.error("Submit error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
