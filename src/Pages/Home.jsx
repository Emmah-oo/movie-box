import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import MovieContext from "../Context/MovieContext";
import { genres } from "../Utils/data";
import Imdb from "../Img/Imdb.svg";
import MovieCard from "../Components/MovieCard";
import Pagination from "../Components/Pagination";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, EffectFade } from "swiper/modules";
import Loader from "../Components/Loader";

const Home = () => {
  const [homeMovie, setHomeMovie] = useState([]);
  const [trendingMovie, setTrendingMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { random, baseImageUrl, page } = useContext(MovieContext);

  const matchingGenres = homeMovie?.genre_ids?.map((genreId) => {
    const matchingGenre = genres.find((genre) => genre.id === genreId);
    return matchingGenre ? matchingGenre.name : null;
  });

  useEffect(() => {
    async function fetchHomeMovies() {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/discover/movie",
          {
            params: {
              include_adult: "false",
              include_video: "true",
              language: "en-US",
              page: 1,
              sort_by: "popularity.desc",
            },
            headers: {
              accept: "application/json",
              Authorization: process.env.REACT_APP_API_KEY,
            },
          }
        );
        setHomeMovie(response.data.results);
        setIsLoading(false);
        // console.log(homeMovie);
        // console.log(response.data.results);
      } catch (error) {
        console.error(error);
      }
    }

    fetchHomeMovies();
  }, []);

  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/all/day",
          {
            params: { language: "en-US", page },
            headers: {
              accept: "application/json",
              Authorization: process.env.REACT_APP_API_KEY,
            },
          }
        );

        setTrendingMovie(response.data.results);
        console.log(response.data.results);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTrendingMovies();
  }, [page]);

  return (
    <div className="pt-[8vh]">
      {isLoading ? (
        <Loader />
      ) : (
        <Swiper
          spaceBetween={30}
          effect={"fade"}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, EffectFade]}
          className="mySwiper"
        >
          {homeMovie.map((homeMovie, i) => (
            <SwiperSlide key={i}>
              <div className="w-100% relative home mb-[4vh]">
                <img
                  src={`${baseImageUrl}${homeMovie.backdrop_path}`}
                  alt=""
                  className="w-[100%] darkened-image"
                />
                <div className="absolute top-[50%] px-[6rem] flex flex-col gap-3 items-start">
                  <h1 className="text-white font-bold text-[2rem]">
                    {homeMovie?.title}
                  </h1>
                  <h1 className="text-[1.5rem] text-white font-medium">
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
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <h1 className="px-[6rem] text-3xl font-semibold">Trending</h1>
      <Pagination />
      <div className="grid grid-cols-4 gap-[4rem] px-[6rem]">
        {trendingMovie &&
          trendingMovie.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </div>
    </div>
  );
};

export default Home;
