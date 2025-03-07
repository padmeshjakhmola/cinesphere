import { db } from "@/database/drizzle";
import { movies } from "@/database/schema";
import { eq } from "drizzle-orm";
import config from "../config";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import s3 from "@/utils/aws";

export const deleteSingleMovie = async (movieId: string) => {
  try {
    const response = await db
      .delete(movies)
      .where(eq(movies.id, movieId))
      .returning({ image: movies.moviePoster, video: movies.movieVideo });

    const imageKey = response[0].image;
    const videoKey = response[0].video;

    const imageParams = {
      Bucket: config.env.awsBucketname,
      Key: imageKey,
    };

    const videoParams = {
      Bucket: config.env.awsBucketname,
      Key: videoKey,
    };

    await Promise.all([
      s3.send(new DeleteObjectCommand(imageParams)),
      s3.send(new DeleteObjectCommand(videoParams)),
    ]);

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
