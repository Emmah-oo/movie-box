import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { MovieProvider } from "./Context/MovieContext";
import Home from "./Pages/Home";
import Popular from "./Pages/Popular";
import TopRated from "./Pages/TopRated";
import Upcoming from "./Pages/Upcoming";

function App() {
  return (
    <div className="App">
      <MovieProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/toprated" element={<TopRated />} />
          <Route path="/upcoming" element={<Upcoming />} />
        </Routes>
      </MovieProvider>
    </div>
  );
}

export default App;
