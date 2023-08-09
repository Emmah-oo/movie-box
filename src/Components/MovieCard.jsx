import React, { useContext } from "react";
import MovieContext from "../Context/MovieContext";
import { genres } from "../Utils/data";

const MovieCard = ({ movie }) => {
  const { baseImageUrl } = useContext(MovieContext);

  //Iterate over each ID in the movie arr, then for each of the find the id that matches with the ID from the genre data
  const matchingGenres = movie.genre_ids.map((genreId) => {
    const matchingGenre = genres.find((genre) => genre.id === genreId);
    return matchingGenre ? matchingGenre.name : null;
  });

  // console.log(matchingGenres);

  return (
    <div className="mt-[2rem] cursor-pointer hover:scale-105 transition-all">
      <img
        src={`${baseImageUrl}${movie?.poster_path}`}
        alt=""
        className="w-[100%] border rounded-lg"
      />
      <div className="flex flex-col gap-2">
        <h1 className="py-2 px-3 bg-slate-300 rounded-lg self-start mt-3">
          {movie.media_type}
        </h1>
        <h1 className="font-bold text-2xl">{movie.title}</h1>
        <h1 className="align-start">{movie.overview}</h1>
      </div>
    </div>
  );
};

export default MovieCard;
