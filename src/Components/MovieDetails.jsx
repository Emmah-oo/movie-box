import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieContext from "../Context/MovieContext";

const MovieDetails = () => {
  const [details, setDetails] = useState([]);

  const [videos, setVideos] = useState([]);

  const { baseImageUrl } = useContext(MovieContext);

  const { movieId } = useParams();
  console.log(movieId);

  useEffect(() => {
    window.scrollTo(0, 0);
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: process.env.REACT_APP_API_KEY,
      },
    };

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => setDetails(response))
      .catch((err) => console.error(err));

    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      options
    )
      .then((response) => response.json())
      .then((response) => setVideos(response.results))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="mx-[5%]">
      <div className="grid grid-cols-2 min-h-[85vh] items-center justify-center gap-10">
        <div>
          <img
            src={`${baseImageUrl}${details?.backdrop_path}`}
            alt=""
            className="w-[100%] border rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-2">{details.original_title}</h1>
          <p className="mb-4">{details.overview}</p>
          <h1>Runtime: {details.runtime} mins</h1>
          <div className="flex gap-2">
            <h1>Genre:</h1>
            {details.genres?.map((genre) => (
              <h1>{genre.name}</h1>
            ))}
          </div>
          <div>
            <div className="mt-3">
              <h1 className="font-bold">Production Companies</h1>
              {details.production_companies?.map((company) => (
                <h1>{company.name}</h1>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-3xl font-bold">Videos</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus
          laborum itaque ipsam tempore cum, debitis optio, accusamus esse totam
          eum eius omnis animi mollitia voluptatem quod iste, obcaecati
          doloribus. Cumque nisi et mollitia? Reiciendis cupiditate, voluptas
          nisi dolore possimus vel.
        </p>
        {/* <div>
        {videos.map((video, id) => (
          <iframe
          key={id}
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${video.key}`}
            title="YouTube video player"
            frameBorder={0}
            allowFullScreen
          ></iframe>
        ))}
      </div> */}
      </div>

      <div className="mt-[5rem]">
        <h1 className="text-3xl font-bold">Similar Movies</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellendus
          laborum itaque ipsam tempore cum, debitis optio, accusamus esse totam
          eum eius omnis animi mollitia voluptatem quod iste, obcaecati
          doloribus. Cumque nisi et mollitia? Reiciendis cupiditate, voluptas
          nisi dolore possimus vel.
        </p>
      </div>
    </div>
  );
};

export default MovieDetails;
