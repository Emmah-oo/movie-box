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

  const { baseImageUrl, page } = useContext(MovieContext);

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
              <div className="w-100% relative mb-[4vh]">
                <img
                  src={`${baseImageUrl}${homeMovie.backdrop_path}`}
                  alt=""
                  className="w-[100%] darkened-image"
                />
                <div className="absolute top-[10%] lg:top-[30%] px-[3rem] lg:px-[6rem] flex flex-col gap-3 items-start">
                  <h1 className="text-white font-bold text-[1rem] md:text-[1.2rem] lg:text-[2rem]">
                    {homeMovie?.title}
                  </h1>
                  <h1 className="text-[0.8rem] lg:text-[1rem] text-white font-medium">
                    {homeMovie?.release_date}
                  </h1>
                  <div className="flex gap-2 text-[0.8rem] lg:text-[1rem]">
                    <img src={Imdb} alt="" className="w-[50%] lg:w-[100%]" />
                    <h1 className="text-white">{homeMovie.vote_average}</h1>
                  </div>
                  <div className="flex gap-2">
                    {matchingGenres?.map((genre, index) => (
                      <h1 className="text-white" key={index}>
                        {genre + "."}
                      </h1>
                    ))}
                  </div>
                  <h1 className="text-white font-medium text-[0.5rem] md:text-[0.8rem] lg:text-[1rem] max-w-[70%]">
                    {homeMovie?.overview}
                  </h1>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <h1 className="text-black px-[2rem] lg:px-[4rem] text-3xl font-semibold">
        Trending
      </h1>
      <Pagination />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[4rem] px-[2rem] lg:px-[4rem]">
        {trendingMovie &&
          trendingMovie.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </div>
    </div>
  );
};

export default Home;
