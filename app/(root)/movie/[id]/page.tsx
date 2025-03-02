"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Page = () => {
  const pathName = usePathname();
  const movieId = pathName.split("/")[2];

  const [image, setImage] = useState("");
  const [movie, setMovie] = useState<Movie | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(`/api/movies/${movieId}`);
      const data = await response.json();

      const signedUrlResponse = await fetch("/api/geturl");
      if (!signedUrlResponse.ok) throw new Error("Unable to fetch signed URLs");

      const signedUrls = await signedUrlResponse.json();
      console.log("Signed URLs:", signedUrls);

      try {
        if (Array.isArray(signedUrls)) {
          const currentMovie = signedUrls.find((item) => item.id === movieId);
          console.log("Current Movie Signed URL:", currentMovie);
          setImage(currentMovie.imageUrl);
          setMovie({
            id: currentMovie.id,
            moviename: currentMovie.name,
            year: currentMovie.year,
            moviePoster: currentMovie.imageUrl,
            movieVideo: currentMovie.videoUrl,
          });
        } else {
          console.error("Expected an array but got:", signedUrls);
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    if (movieId) fetchMovies();
  }, [movieId]);

  if (!movie) {
    return <div className="text-center text-red-500">Movie not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center pb-10">
      <Image
        src={image}
        alt="poster"
        width={300}
        height={500}
        className="mt-4"
      />
      <h1 className="text-2xl font-bold">{movie.moviename}</h1>

      <video
        ref={videoRef}
        src={movie.movieVideo}
        className="mt-4 w-full max-w-7xl aspect-video rounded-lg shadow-lg"
        controls
        onError={(e) => console.error("Video Error:", e)}
      />
    </div>
  );
};

export default Page;
