import React from "react";
import Image from "next/image";
import Link from "next/link";

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="flex flex-col items-center justify-center hover:cursor-pointer"
        >
          <Link href={`/movie/${movie.id}`}>
            <div className="relative">
              <Image
                src={movie.imageUrl}
                width={200}
                height={300}
                alt="movie_poster"
                loading="lazy"
                className="flex flex-1"
              />
              <Image
                src="/icons/playbutton.svg"
                width={50}
                height={50}
                alt="playbutton"
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-in-out hover:scale-125"
                fetchPriority="high"
              />
            </div>
          </Link>

          <div className="flex flex-col items-center justify-center text-xl">
            <h1>{movie.name}</h1>
            <p>{movie.year}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
