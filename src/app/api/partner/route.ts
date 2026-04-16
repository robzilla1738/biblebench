import { db } from "@/db";
import { partnerInquiries } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, email, organization, message } = await req.json();

    if (!name || !email || !email.includes("@")) {
      return NextResponse.json({ error: "Name and valid email required" }, { status: 400 });
    }

    const [row] = await db
      .insert(partnerInquiries)
      .values({ name, email, organization, message })
      .returning({ id: partnerInquiries.id });

    return NextResponse.json({ id: row.id });
  } catch (e) {
    console.error("Partner inquiry error:", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
