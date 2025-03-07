import React from "react";
import Image from "next/image";
import Link from "next/link";
import { EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface Movie {
  id?: string;
  name?: string;
  year?: number;
  poster?: string;
  imageUrl: string;
  videoUrl: string;
}

interface MovieListProps {
  movies: Movie[];
}

const handleDelete = async (movieId: string) => {
  if (!movieId) {
    throw new Error("error_movie_id");
  }

  try {
    await fetch(`/api/delete/${movieId}`);
    // const response = await sendDeleteApi.json();

    toast.success("Movie deleted Successfully");
  } catch (error) {
    console.error("check /api", error);
  }
};

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="flex flex-col items-center justify-center transition-transform duration-300 ease-in-out hover:scale-105 hover:cursor-pointer"
        >
          <div className="relative">
            <Link href={`/movie/${movie.id}`}>
              <Image
                src={movie.imageUrl}
                width={200}
                height={300}
                alt="movie_poster"
                // loading="lazy"
                className="h-[300px] w-[200px] rounded-lg object-cover"
                priority
              />
              <Image
                src="/icons/playbutton.svg"
                width={50}
                height={50}
                alt="playbutton"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-in-out hover:scale-125"
                fetchPriority="high"
              />
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  className="absolute right-1 top-2 cursor-pointer"
                  variant="outline"
                  size="icon"
                >
                  <EllipsisVertical />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Delete Movie?</DialogTitle>
                  <DialogDescription>
                    You will not be able to undo this!
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button onClick={() => movie.id && handleDelete(movie.id)}>
                      Delete
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Cancel
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-col items-center justify-center text-lg">
            <h1>{movie.name}</h1>
            <p>{movie.year}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
