import React, { useContext } from "react";
import MovieContext from "../Context/MovieContext";
import { genres } from "../Utils/data";

const MovieCard = ({ movie }) => {
  const { baseImageUrl } = useContext(MovieContext);

  //   const moviesWithGenres = movie.map((movie) => {
  //     const matchingGenres = movie.genre_ids?.map((genreId) => {
  //       const matchingGenre = genres?.find((genre) => genre.id === genreId);
  //       return matchingGenre ? matchingGenre.name : null;
  //     });
  //     return {
  //       ...movie,
  //       genres: matchingGenres,
  //     };
  //   });

  //   console.log(moviesWithGenres);
  return (
    <div className="mt-[2rem] cursor-pointer hover:scale-105 transition-all">
      <img
        src={`${baseImageUrl}${movie?.poster_path}`}
        alt=""
        className="w-[100%] border rounded-lg"
      />
      <div>
        <h1>{movie.media_type}</h1>
        <h1>{movie.title}</h1>
        <h1>{movie.overview}</h1>
      </div>
    </div>
  );
};

export default MovieCard;
