import { db } from "@/db";
import { emailSignups } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    await db
      .insert(emailSignups)
      .values({ email })
      .onConflictDoNothing();

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Signup error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
