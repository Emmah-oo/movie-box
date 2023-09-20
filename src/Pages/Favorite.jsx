import React, { useContext, useEffect } from "react";
import MovieContext from "../Context/MovieContext";
import MovieCard from "../Components/MovieCard";

const Favorite = () => {
  const { savedMovies, setSavedMovies } = useContext(MovieContext);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("savedMovies"));

    if (items) {
      setSavedMovies(items);
    }
  }, []);
  return (
    <div className="pt-[10vh] w-[80%] m-auto">
      <h1 className="text-2xl font-bold">Favorite Movies</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[4rem]">
        {savedMovies.map((movie) => (
          <MovieCard movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Favorite;
