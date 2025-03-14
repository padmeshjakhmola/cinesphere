"use client";

import LoadingMovies from "@/components/LoadingMovies";
import MovieList from "@/components/MovieList";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch("/api/geturl");
        if (!response.ok) throw new Error("Unable to fetch movies for DB");

        const data = await response.json();

        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    fetchMovies();
  }, []);
  return (
    <>
      <div className="p-10">
        {movies.length > 0 ? (
          <MovieList movies={movies} />
        ) : (
          <LoadingMovies />
        )}
      </div>
    </>
  );
}
