import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { MovieProvider } from "./Context/MovieContext";
import Home from "./Pages/Home";
import Popular from "./Pages/Popular";
import TopRated from "./Pages/TopRated";
import Upcoming from "./Pages/Upcoming";
import SearchPage from "./Pages/SearchPage";
import MovieDetails from "./Components/MovieDetails";
import TvDetails from "./Components/TvDetails";
import Favorite from "./Pages/Favorite";

function App() {
  return (
    <div className="mb-[5rem]">
      <MovieProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/toprated" element={<TopRated />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/search/:searchTerm" element={<SearchPage />} />
          <Route path="/movie/:movieId" element={<MovieDetails />} />
          <Route path="/tv/:tvId" element={<TvDetails />} />
          <Route path="/favorite" element={<Favorite />} />
        </Routes>
      </MovieProvider>
    </div>
  );
}

export default App;
