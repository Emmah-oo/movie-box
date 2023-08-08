import Navbar from "./Components/Navbar";
import { MovieProvider } from "./Context/MovieContext";
import Home from "./Pages/Home";

function App() {
  return (
    <div className="App">
      <MovieProvider>
        <Navbar />
        <Home />
      </MovieProvider>
    </div>
  );
}

export default App;
