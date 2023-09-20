import React, { useEffect, useState } from "react";
import MovieCard from "../Components/MovieCard";
import axios from "axios";
import Pagination from "../Components/Pagination";
import { useContext } from "react";
import MovieContext from "../Context/MovieContext";

const TopRated = () => {
  const { page } = useContext(MovieContext);

  const [topRatedMovies, setTopRatedMovies] = useState([]);

  useEffect(() => {
    const getTopRated = () => {
      const options = {
        method: "GET",
        url: "https://api.themoviedb.org/3/movie/top_rated",
        params: { language: "en-US", page },
        headers: {
          accept: "application/json",
          Authorization: process.env.REACT_APP_API_KEY,
        },
      };

      axios
        .request(options)
        .then(function (response) {
          setTopRatedMovies(response.data.results);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    getTopRated();
  }, [page]);
  return (
    <div className="pt-[10vh] ">
      <h1 className="text-black px-[2rem] lg:px-[4rem]text-3xl font-semibold">
        Top Rated Movies
      </h1>
      <Pagination />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[4rem] px-[2rem] lg:px-[4rem]">
        {topRatedMovies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default TopRated;
