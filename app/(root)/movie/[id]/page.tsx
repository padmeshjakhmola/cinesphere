"use client";

import movies from "@/dummydata";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useRef } from "react";

const Page = () => {
  const pathName = usePathname();
  const movieId = pathName.split("/")[2];
  const movie = movies.find((movie) => movie.id === movieId);

  if (!movie) {
    return <div className="text-center text-red-500">Movie not found</div>;
  }

  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="flex flex-col items-center justify-center pb-10">
      <Image
        src={movie.poster}
        alt="poster"
        width={300}
        height={500}
        className="mt-4"
      />
      <h1 className="text-2xl font-bold">{movie.name}</h1>

      <video
        ref={videoRef}
        // src="/videos/ocean.mp4"
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
        className="mt-4 w-full max-w-7xl aspect-video rounded-lg shadow-lg"
        controls
        onError={(e) => console.error("Video Error:", e)}
      />
    </div>
  );
};

export default Page;
