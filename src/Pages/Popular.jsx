import React, { useEffect, useContext } from "react";
import MovieContext from "../Context/MovieContext";
import MovieCard from "../Components/MovieCard";

const Popular = () => {
  const { popularMovies, setPopularMovies, getPopular } =
    useContext(MovieContext);
  useEffect(() => {
    getPopular();
  }, []);

  return (
    <div className="pt-[10vh] ">
      <h1 className="text-black px-[6rem] text-3xl font-semibold">
        Popular Movies
      </h1>
      <div className="grid grid-cols-4 gap-[4rem] px-[6rem]">
        {popularMovies.map((movie) => (
          <MovieCard movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Popular;
