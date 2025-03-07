"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import NoMovieData from "@/components/NoMovieData";
import config from "@/lib/config";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

const Page = () => {
  const pathName = usePathname();
  const movieId = pathName.split("/")[2];

  const [image, setImage] = useState("");
  const [movie, setMovie] = useState<string | null>(null);
  const [movieData, setMovieData] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/movies/${movieId}`);
        if (!response.ok) throw new Error("Failed to fetch movie data");
        const movieResponse = await response.json();
        const movieData: Movie = movieResponse[0];

        setMovieData(movieData);

        const getCdnUrl = await fetch("/api/cdn");
        if (!getCdnUrl.ok) throw new Error("Unable to fetch URL");

        const urlArray: Movie[] = await getCdnUrl.json();

        const singleUrl = urlArray.find((item) => item.id === movieId);
        if (!singleUrl) throw new Error("Movie not found in CDN data");

        const moviePosterUrl = `${config.env.awsCloudfront}/${singleUrl.moviePoster}`;
        const movieVideoUrl = `${config.env.awsCloudfront}/${singleUrl.movieVideo}`;

        setImage(moviePosterUrl);
        setMovie(movieVideoUrl);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setIsLoading(false);
      }
    };

    if (movieId) fetchMovies();
  }, [movieId]);

  return (
    <div className="flex flex-col items-center justify-center pb-10">
      {isLoading ? (
        <LoadingSpinner />
      ) : movieData && image && movie ? (
        <>
          <Image
            src={image}
            alt="poster"
            width={300}
            height={500}
            className="mt-4"
          />
          <h1 className="text-2xl font-bold">{movieData.moviename}</h1>
          <video
            ref={videoRef}
            src={movie}
            className="mt-4 aspect-video w-full max-w-7xl rounded-lg shadow-lg"
            controls
            onError={(e) => console.error("Video Error:", e)}
          />
        </>
      ) : (
        <NoMovieData />
      )}
    </div>
  );
};

export default Page;
