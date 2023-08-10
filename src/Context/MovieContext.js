import { createContext, useState } from "react";

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const baseImageUrl = "https://image.tmdb.org/t/p/original";

  const [page, setPage] = useState(1);

  const randomDecimal = Math.random();
  const random = Math.floor(randomDecimal * 20) + 1;

  return (
    <MovieContext.Provider
      value={{
        baseImageUrl,
        random,
        page,
        setPage,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export default MovieContext;
