import MovieList from "@/components/MovieList";
import movies from "@/dummydata";

export default function Home() {
  return (
    <>
      <div className="py-10">
        <MovieList data={movies} />
      </div>
    </>
  );
}
