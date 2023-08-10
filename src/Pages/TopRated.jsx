import React, { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import axios from "axios";
import Pagination from "../Components/Pagination";

const TopRated = () => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  useEffect(() => {
    const getTopRated = async () => {
      try {
        const response = axios.get(
          "https://api.themoviedb.org/3/movie/top_rated",
          {
            params: { language: "en-US", page: "1" },
            headers: {
              accept: "application/json",
              Authorization: process.env.REACT_APP_API_KEY,
            },
          }
        );
        console.log(response.data.results);
        setTopRatedMovies(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };
    getTopRated();
  }, []);
  return (
    <div className="pt-[10vh] ">
      <h1 className="text-black px-[6rem] text-3xl font-semibold">
        Top Rated Movies
      </h1>
      <Pagination />
      <div className="grid grid-cols-4 gap-[4rem] px-[6rem]">
        {topRatedMovies.map((movie) => (
          <MovieCard movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default TopRated;
