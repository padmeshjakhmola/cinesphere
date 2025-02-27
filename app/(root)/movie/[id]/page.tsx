"use client";

import movies from "@/dummydata";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const Page = () => {
  const pathName = usePathname();
  const movieId = pathName.split("/")[2];
  const movie = movies.find((movie) => movie.id === movieId);

  if (!movie) {
    return <div className="text-center text-red-500">Movie not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Image
        src={movie.poster}
        alt="poster"
        width={300}
        height={500}
        className="mt-4"
      />
      <h1 className="text-2xl font-bold">{movie.name}</h1>
    </div>
  );
};

export default Page;
