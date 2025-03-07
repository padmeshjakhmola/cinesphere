import { FaExclamationTriangle } from "react-icons/fa";

const NoMovieData = () => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-gray-600">
      <FaExclamationTriangle className="mb-4 text-6xl text-red-500" />
      <h2 className="text-2xl font-semibold">No Movie Data Available</h2>
      <p className="max-w-md text-center text-lg">
        We couldn&apos;t find any details for this movie. Please try again later
        or check another movie.
      </p>
    </div>
  );
};

export default NoMovieData;
