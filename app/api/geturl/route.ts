import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/drizzle";
import { movies } from "@/database/schema";
import config from "@/lib/config";
import s3 from "@/utils/aws";
import { signedUrl } from "@/lib/actions/sign";

export async function GET(req: NextRequest) {
  const response = await db.select().from(movies);

  const movieUrls = await Promise.all(
    response.map(async (movie) => {
      const getObjectParamsofImage = {
        Bucket: config.env.awsBucketname,
        Key: movie.moviePoster,
      };

      const getObjectParamsofVideo = {
        Bucket: config.env.awsBucketname,
        Key: movie.movieVideo,
      };

      const [imageUrl, videoUrl] = await Promise.all([
        signedUrl(getObjectParamsofImage),
        signedUrl(getObjectParamsofVideo),
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
