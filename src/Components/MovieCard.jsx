import React, { useContext, useState } from "react";
import MovieContext from "../Context/MovieContext";
import { genres } from "../Utils/data";
import Imdb from "../Img/Imdb.svg";
import { Link } from "react-router-dom";
import save from "../Img/save.svg";
import save2 from "../Img/save-2.svg";

const MovieCard = ({ movie }) => {
  const { baseImageUrl, isSaved, handleSave } = useContext(MovieContext);

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
          <Link to={`/${movie.media_type || "movie"}/${movie.id}`}>
            <img
              src={`${baseImageUrl}${movie?.poster_path}`}
              alt=""
              className="w-[100%] border rounded-lg"
            />
          </Link>
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
            <div className="flex justify-between">
              <h1 className="font-bold text-[1rem]">{movie.title}</h1>
              <img
                src={isSaved ? save2 : save}
                alt="save"
                className="cursor-pointer"
                onClick={() => handleSave(movie)}
              />
            </div>
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
