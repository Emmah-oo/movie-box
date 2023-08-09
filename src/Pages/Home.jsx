import React, { useContext, useEffect } from "react";
import MovieContext from "../Context/MovieContext";
import { genres } from "../Utils/data";
import Imdb from "../Img/Imdb.svg";
import MovieCard from "../Components/MovieCard";

const Home = () => {
  const {
    fetchHomeMovies,
    homeMovie,
    getTrending,
    trendingMovie,
    setTrendingMovie,
    baseImageUrl,
  } = useContext(MovieContext);

  const matchingGenres = homeMovie?.genre_ids?.map((genreId) => {
    const matchingGenre = genres.find((genre) => genre.id === genreId);
    return matchingGenre ? matchingGenre.name : null;
  });
  console.log(matchingGenres);

  useEffect(() => {
    fetchHomeMovies();
    getTrending();
  }, []);

  return (
    <div>
      <div className="w-100% relative home mb-[4vh]">
        <img
          src={`${baseImageUrl}${homeMovie?.backdrop_path}`}
          alt=""
          className="w-[100%] darkened-image"
        />
        <div className="absolute top-[50%] px-[6rem] flex flex-col gap-3 items-start">
          <h1 className="text-white font-bold text-[2rem]">
            {homeMovie?.title}
          </h1>
          <h1 className="text-[1.5rem] text-gray-400 font-medium">
            {homeMovie?.release_date}
          </h1>
          <div className="flex gap-2">
            <img src={Imdb} alt="" />
            <h1 className="text-white">{homeMovie.vote_average}</h1>
          </div>
          <div className="flex gap-2">
            {matchingGenres?.map((genre, index) => (
              <h1 className="text-white" key={index}>
                {genre + "."}
              </h1>
            ))}
          </div>
          <h1 className="text-white font-medium text-[1rem] max-w-[50%]">
            {homeMovie?.overview}
          </h1>
        </div>
      </div>
      <h1 className="px-[6rem] text-3xl font-semibold">Trending</h1>
      <div className="grid grid-cols-4 gap-[4rem] px-[6rem]">
        {trendingMovie &&
          trendingMovie.map((movie) => <MovieCard movie={movie} />)}
      </div>
    </div>
  );
};

export default Home;
