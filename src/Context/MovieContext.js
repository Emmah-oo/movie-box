import { createContext, useState } from "react";

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const baseImageUrl = "https://image.tmdb.org/t/p/original";

  const [page, setPage] = useState(1);

  const [savedMovies, setSavedMovies] = useState([]);

  const handleSave = (movie) => {
    // Check if the movie is already in the savedMovies array
    const movieIndex = savedMovies.findIndex(
      (savedMovie) => savedMovie.id === movie.id
    );

    if (movieIndex !== -1) {
      // If it's already saved, remove it from the array
      const updatedMovies = [...savedMovies];
      updatedMovies.splice(movieIndex, 1);
      setSavedMovies(updatedMovies);
      localStorage.setItem("savedMovies", JSON.stringify(updatedMovies));
    } else {
      // If it's not saved, add it to the array
      const updatedMovies = [...savedMovies, movie];
      setSavedMovies(updatedMovies);
      localStorage.setItem("savedMovies", JSON.stringify(updatedMovies));
    }
  };

  const randomDecimal = Math.random();
  const random = Math.floor(randomDecimal * 20) + 1;

  return (
    <MovieContext.Provider
      value={{
        baseImageUrl,
        random,
        page,
        setPage,
        savedMovies,
        setSavedMovies,
        handleSave,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export default MovieContext;
