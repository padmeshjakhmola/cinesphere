import { db } from "@/database/drizzle";
import { movies } from "@/database/schema";
import { eq } from "drizzle-orm";

export const deleteSingleMovie = async (movieId: string) => {
  try {
    await db.delete(movies).where(eq(movies.id, movieId));

    return {
      sucess: true,
      message: "Successfully deleted",
    };
  } catch (error) {
    console.error("unable_to_delete", error);
    return {
      sucess: true,
      message: "unable to delete",
    };
  }
};
