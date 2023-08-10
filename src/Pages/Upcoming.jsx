import React, { useEffect, useState } from "react";

import MovieCard from "../Components/MovieCard";
import axios from "axios";

const Upcoming = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    const getUpcoming = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/upcoming",
          {
            params: { language: "en-US", page: "1" },
            headers: {
              accept: "application/json",
              Authorization: process.env.REACT_APP_API_KEY,
            },
          }
        );
        setUpcomingMovies(response.data.results);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUpcoming();
  }, []);
  return (
    <div className="pt-[10vh] ">
      <h1 className="text-black px-[6rem] text-3xl font-semibold">
        Upcoming Movies
      </h1>
      <div className="grid grid-cols-4 gap-[4rem] px-[6rem]">
        {upcomingMovies.map((movie) => (
          <MovieCard movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Upcoming;
