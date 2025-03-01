"use client";

import MovieList from "@/components/MovieList";
import { error } from "console";
// import movies from "@/dummydata";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch("/api/geturl");
        if (!response.ok) throw new Error("Unable to fetch movies for DB");

        const data = await response.json();

        console.log("aaaaaaaaaaaaa", data);

        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    fetchMovies();
  }, []);
  return (
    <>
      <div className="py-10">
        {movies.length > 0 ? (
          <MovieList movies={movies} />
        ) : (
          <p>Loading movies...</p>
        )}
      </div>
    </>
  );
}
