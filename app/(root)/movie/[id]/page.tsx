"use client";

import config from "@/lib/config";
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
      // const signedUrlResponse = await fetch("/api/geturl");
      // if (!signedUrlResponse.ok) throw new Error("Unable to fetch signed URLs");

      // const signedUrls = await signedUrlResponse.json();
      // console.log("Signed URLs:", signedUrls);

      // try {
      //   if (Array.isArray(signedUrls)) {
      //     const currentMovie = signedUrls.find((item) => item.id === movieId);
      //     console.log("Current Movie Signed URL:", currentMovie);
      //     setImage(currentMovie.imageUrl);
      //     setMovie({
      //       id: currentMovie.id,
      //       moviename: currentMovie.name,
      //       year: currentMovie.year,
      //       moviePoster: currentMovie.imageUrl,
      //       movieVideo: currentMovie.videoUrl,
      //     });
      //   } else {
      //     console.error("Expected an array but got:", signedUrls);
      //   }
      // } catch (error) {
      //   console.error("Error fetching movie data:", error);
      // }

      try {
        const response = await fetch(`/api/movies/${movieId}`);
        if (!response.ok) throw new Error("Failed to fetch movie data");
        const movieData: Movie = await response.json();

        const getCdnUrl = await fetch("/api/cdn");
        if (!getCdnUrl.ok) throw new Error("Unable to fetch URL");

        const urlArray: Movie[] = await getCdnUrl.json();

        const singleUrl = urlArray.find((item) => item.id === movieId);
        if (!singleUrl) throw new Error("Movie not found in CDN data");

        const moviePosterUrl = `${config.env.awsCloudfront}/${singleUrl.moviePoster}`;
        const movieVideoUrl = `${config.env.awsCloudfront}/${singleUrl.movieVideo}`;

        setImage(moviePosterUrl);
        setMovie({ ...movieData, movieVideo: movieVideoUrl });
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
        className="mt-4 aspect-video w-full max-w-7xl rounded-lg shadow-lg"
        controls
        onError={(e) => console.error("Video Error:", e)}
      />
    </div>
  );
};

export default Page;
