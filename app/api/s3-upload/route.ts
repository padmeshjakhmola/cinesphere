import config from "@/lib/config";
import s3 from "@/utils/aws";
import { PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "@/database/drizzle";
import { movies } from "@/database/schema";

export async function POST(req: NextRequest) {
  const uniqueFileName = (bytes = 32) =>
    crypto.randomBytes(bytes).toString("hex");

  try {
    const formData = await req.formData();

    const image = formData.get("image") as File | null;
    const video = formData.get("video") as File | null;

    if (!image || !video) {
      return NextResponse.json(
        { error: "Image file is required" },
        { status: 400 }
      );
    }

    const imageBuffer = image
      ? Buffer.from(await image.arrayBuffer())
      : undefined;
    const videoBuffer = video
      ? Buffer.from(await video.arrayBuffer())
      : undefined;

    const fileProps = {
      image: image instanceof File ? image : null,
      video: video instanceof File ? video : null,
    };

    const uniqueFileNameforfetchingImage = uniqueFileName();
    const imageParams: AWSFILEUPLOAD = {
      Bucket: config.env.awsBucketname,
      Key: uniqueFileNameforfetchingImage,
      Body: imageBuffer,
      ContentType: image.type || "image/jpeg",
      // ACL: "public-read",
    };

    const uniqueFileNameforfetchingVideo = uniqueFileName();
    const videoParams: AWSFILEUPLOAD = {
      Bucket: config.env.awsBucketname,
      Key: uniqueFileNameforfetchingVideo,
      Body: videoBuffer,
      ContentType: video.type || "video/mp4",
    };

    const imageupload_command = new PutObjectCommand(
      imageParams as PutObjectCommandInput
    );
    const videoupload_command = new PutObjectCommand(
      videoParams as PutObjectCommandInput
    );
    await Promise.all([
      s3.send(imageupload_command),
      s3.send(videoupload_command),
    ]);

    try {
      await db.insert(movies).values({
        moviePoster: uniqueFileNameforfetchingImage,
        movieVideo: uniqueFileNameforfetchingVideo,
      });
    } catch (error) {
      console.error("Error updating database:", error);
      return NextResponse.json(
        { error: "Failed to update database" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "files_uploaded_successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("error_uploading_files:", error);
    return NextResponse.json(
      { error: "Failed to process upload", details: (error as Error).message },
      { status: 500 }
    );
  }
}
