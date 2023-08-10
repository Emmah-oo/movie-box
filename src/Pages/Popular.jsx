import React, { useEffect, useState } from "react";

import MovieCard from "../Components/MovieCard";
import axios from "axios";
import Pagination from "../Components/Pagination";

const Popular = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    const getPopular = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular",
          {
            params: { language: "en-US", page: 1 },
            headers: {
              accept: "application/json",
              Authorization: process.env.REACT_APP_API_KEY,
            },
          }
        );
        setPopularMovies(response.data.results);
        console.log(response.data.results);
      } catch (err) {
        console.error(err);
      }
    };
    getPopular();
  }, []);

  return (
    <div className="pt-[10vh] ">
      <h1 className="text-black px-[6rem] text-3xl font-semibold">
        Popular Movies
      </h1>
      <Pagination />
      <div className="grid grid-cols-4 gap-[4rem] px-[6rem]">
        {popularMovies.map((movie) => (
          <MovieCard movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Popular;
