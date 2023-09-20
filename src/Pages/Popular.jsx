import React, { useContext, useEffect, useState } from "react";

import MovieCard from "../Components/MovieCard";
import axios from "axios";
import Pagination from "../Components/Pagination";
import MovieContext from "../Context/MovieContext";

const Popular = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const { page } = useContext(MovieContext);

  useEffect(() => {
    const getPopular = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular",
          {
            params: { language: "en-US", page },
            headers: {
              accept: "application/json",
              Authorization: process.env.REACT_APP_API_KEY,
            },
          }
        );
        setPopularMovies(response.data.results);
      } catch (err) {
        console.error(err);
      }
    };
    getPopular();
  }, [page, setPopularMovies]);

  return (
    <div className="pt-[10vh] ">
      <h1 className="text-black px-[2rem] lg:px-[4rem] text-3xl font-semibold">
        Popular Movies
      </h1>
      <Pagination />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[4rem] px-[2rem] lg:px-[4rem]">
        {popularMovies.map((movie) => (
          <MovieCard movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Popular;
