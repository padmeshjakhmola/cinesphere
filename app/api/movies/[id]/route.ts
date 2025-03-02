/* eslint-disable @typescript-eslint/no-unused-vars */

import { db } from "@/database/drizzle";
import { movies } from "@/database/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> } // Explicitly type params as a Promise
) {
  try {
    // Await the params Promise to resolve
    const resolvedParams = await params;
    const { id } = resolvedParams;

    if (!id) {
      return NextResponse.json(
        { error: "Movie ID is required" },
        { status: 400 }
      );
    }

    // Fetch the movie from the database
    const response = await db.select().from(movies).where(eq(movies.id, id));

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error in GET /api/movies/[id]:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { error: "Failed to fetch movie", details: errorMessage },
      { status: 500 }
    );
  }
}
