import { deleteSingleMovie } from "@/lib/actions/delete";
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

    await deleteSingleMovie(id);

    // Fetch the movie from the database

    return NextResponse.json({ error: "Success!! Movie deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/delete/[id]:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";

    return NextResponse.json(
      { error: "Failed to fetch movie", details: errorMessage },
      { status: 500 }
    );
  }
}
