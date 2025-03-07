import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingMovies = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="flex flex-col gap-2">
          <Skeleton className="h-56 w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4 rounded-md" />
          <Skeleton className="h-4 w-1/2 rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default LoadingMovies;
