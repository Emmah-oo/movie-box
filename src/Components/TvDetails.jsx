import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import MovieContext from "../Context/MovieContext";
import Loader from "./Loader";
import MovieCard from "../Components/MovieCard";

const TvDetails = () => {
  const [details, setDetails] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { baseImageUrl } = useContext(MovieContext);

  const { tvId } = useParams();
  console.log(tvId);

  useEffect(() => {
    window.scrollTo(0, 0);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.REACT_APP_API_KEY,
      },
    };

    fetch(`https://api.themoviedb.org/3/tv/${tvId}?language=en-US`, options)
      .then((response) => response.json())
      .then((response) => setDetails(response))
      .catch((err) => console.error(err));
    setIsLoading(false);

    fetch(
      `https://api.themoviedb.org/3/tv/${tvId}/similar?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setSimilar(response.results))
      .catch((err) => console.error(err));
  }, [tvId]);

  return (
    <div className="w-[80%] m-auto">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 min-h-[85vh] items-center justify-center gap-10">
          <div>
            <img
              src={`${baseImageUrl}${details?.backdrop_path}`}
              alt=""
              className="w-[100%] border rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-2">{details.name}</h1>
            <p className="mb-4">{details.overview}</p>
            <h1>Runtime: {details.runtime} mins</h1>
            <div className="flex gap-2">
              <h1 className="font-bold">Genre:</h1>
              {details.genres?.map((genre, i) => (
                <h1 key={i}>{genre.name}</h1>
              ))}
            </div>
            <div>
              <div className="mt-3">
                <h1 className="font-bold">Production Companies</h1>
                {details.production_companies?.map((company, i) => (
                  <h1 key={i}>{company.name}</h1>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <h1 className="text-3xl font-bold">Similar Movies</h1>
        <div className="grid grid-cols-4 gap-x-5">
          {similar.map((movie, i) => (
            <MovieCard movie={movie} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TvDetails;
