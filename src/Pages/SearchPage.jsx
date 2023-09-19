import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "../Components/MovieCard";
import { useContext } from "react";
import MovieContext from "../Context/MovieContext";
import Pagination from "../Components/Pagination";

const SearchPage = () => {
  const [searchResult, setSearchResult] = useState([]);

  const { page } = useContext(MovieContext)
  const { searchTerm } = useParams();
  useEffect(() => {
    const getSearchResult = () => {
      const options = {
        method: "GET",
        url: `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US`,
        params: { language: "en-US", page},
        headers: {
          accept: "application/json",
          Authorization: process.env.REACT_APP_API_KEY,
        },
      };

      axios
        .request(options)
        .then(function (response) {
          console.log(response.data.results);
          setSearchResult(response.data.results);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    getSearchResult();
  }, [searchTerm, page]);

  return (
    <div className="pt-[10vh]">
      <h1 className="text-black px-[2rem] lg:px-[4rem] text-3xl font-semibold">
        Showing Search Results
      </h1>
      <Pagination />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[4rem] px-[2rem] lg:px-[4rem]">
        {searchResult.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
