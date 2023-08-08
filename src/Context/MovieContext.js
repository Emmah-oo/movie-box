import axios from "axios";
import { useEffect, useState, createContext } from "react";

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [homeMovie, setHomeMovie] = useState([]);

  const [trendingMovie, setTrendingMovie] = useState([]);

  const baseImageUrl = "https://image.tmdb.org/t/p/original";

  const randomDecimal = Math.random();
  const random = Math.floor(randomDecimal * 20) + 1;

  const fetchHomeMovies = () => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/discover/movie",
      params: {
        include_adult: "false",
        include_video: "true",
        language: "en-US",
        page: 1,
        sort_by: "popularity.desc",
      },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzk5ZWIyOTRkZDhiNDBhNDg1NTk3NmM0ZjVlYjIyYSIsInN1YiI6IjY0Y2EzZjZmZGQ4M2ZhMDBmZjUxODEwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CoTAs4nhvVWLzTXbtt-fYiJ_HfefqjkBe36Ee2hMzW8",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setHomeMovie(response.data.results[random]);
        console.log(response.data.results[random]);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const getTrending = () => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/trending/all/day",
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzk5ZWIyOTRkZDhiNDBhNDg1NTk3NmM0ZjVlYjIyYSIsInN1YiI6IjY0Y2EzZjZmZGQ4M2ZhMDBmZjUxODEwNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CoTAs4nhvVWLzTXbtt-fYiJ_HfefqjkBe36Ee2hMzW8",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.results);
        setTrendingMovie(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <MovieContext.Provider
      value={{
        fetchHomeMovies,
        homeMovie,
        setHomeMovie,
        getTrending,
        trendingMovie,
        setTrendingMovie,
        baseImageUrl,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export default MovieContext;
