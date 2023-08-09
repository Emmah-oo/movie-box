import React, { useEffect, useContext } from "react";
import MovieContext from "../Context/MovieContext";
import MovieCard from "../Components/MovieCard";

const TopRated = () => {
  const { topRatedMovies, getTopRated } = useContext(MovieContext);
  useEffect(() => {
    getTopRated();
  }, []);
  return (
    <div className="pt-[10vh] ">
      <h1 className="text-black px-[6rem] text-3xl font-semibold">
        Top Rated Movies
      </h1>
      <div className="grid grid-cols-4 gap-[4rem] px-[6rem]">
        {topRatedMovies.map((movie) => (
          <MovieCard movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default TopRated;
