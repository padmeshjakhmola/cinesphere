import { db } from "@/database/drizzle";
import { movies } from "@/database/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await db.select().from(movies);
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Database Fetch Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch movies" },
      { status: 500 }
    );
  }
}
