import React, { useContext } from "react";
import MovieContext from "../Context/MovieContext";
import { genres } from "../Utils/data";
import Imdb from "../Img/Imdb.svg";

const MovieCard = ({ movie }) => {
  const { baseImageUrl } = useContext(MovieContext);

  //Iterate over each ID in the movie arr, then for each of the find the id that matches with the ID from the genre data
  const matchingGenres = movie?.genre_ids?.map((genreId) => {
    const matchingGenre = genres.find((genre) => genre.id === genreId);
    return matchingGenre ? matchingGenre.name : null;
  });

  // console.log(matchingGenres);

  return (
    <div className="mt-[2rem] cursor-pointer hover:scale-105 transition-all">
      {movie && (
        <div>
          <img
            src={`${baseImageUrl}${movie?.poster_path}`}
            alt=""
            className="w-[100%] border rounded-lg"
          />
          <div className="flex flex-col gap-2">
            <h1
              className={`${
                movie.media_type &&
                "py-2 px-3 bg-slate-300 rounded-lg self-start mt-3"
              }`}
            >
              {movie.media_type?.toUpperCase()}
            </h1>
            <div className="flex gap-2">
              <img src={Imdb} alt="" />
              <h1 className="text-black">
                {movie.vote_average ? movie.vote_average?.toFixed(2) : ""}
              </h1>
              <h1>{movie.release_date}</h1>
            </div>
            <h1 className="font-bold text-2xl">{movie.title}</h1>

            <div className="flex gap-2">
              {matchingGenres?.map((genre, index) => (
                <h1 className="text-black" key={index}>
                  {genre && genre + "."}
                </h1>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
