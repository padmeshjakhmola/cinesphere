import { db } from "@/database/drizzle";
import { movies } from "@/database/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  if (!id) {
    return NextResponse.json(
      { error: "Movie ID is required" },
      { status: 400 }
    );
  }

  const response = await db.select().from(movies).where(eq(movies.id, id));

  return NextResponse.json(response);
}
