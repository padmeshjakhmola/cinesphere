import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { movies } from "@/database/schema";
import config from "@/lib/config";
import s3 from "@/utils/aws";

export async function GET(req: NextRequest) {
  const response = await db.select().from(movies);

  const movieUrls = await Promise.all(
    response.map(async (movie) => {
      console.log("bbbbbbbbbbbbbbbbbbb", movie);
      const getObjectParamsofImage = {
        Bucket: config.env.awsBucketname,
        Key: movie.moviePoster,
      };

      const getObjectParamsofVideo = {
        Bucket: config.env.awsBucketname,
        Key: movie.movieVideo,
      };

      const [imageUrl, videoUrl] = await Promise.all([
        getSignedUrl(s3, new GetObjectCommand(getObjectParamsofImage), {
          expiresIn: 3600,
        }),
        getSignedUrl(s3, new GetObjectCommand(getObjectParamsofVideo), {
          expiresIn: 3600,
        }),
      ]);

      return {
        id: movie.id,
        imageUrl,
        videoUrl,
        name: movie.moviename,
        year: movie.year,
      };
    })
  );

  return NextResponse.json(movieUrls);
}
