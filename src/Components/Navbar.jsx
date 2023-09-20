import React, { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import heart from "../Img/heart.png";
import MovieContext from "../Context/MovieContext";
import { AiOutlineMenu } from "react-icons/ai";
import { HiOutlineX } from "react-icons/hi";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const { savedMovies } = useContext(MovieContext);

  const [navColor, setNavColor] = useState(false);

  const [nav, setNav] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm("");
    }
  };

  const handleNavColor = () => {
    if (window.scrollY > 10) {
      setNavColor(true);
    } else {
      setNavColor(false);
    }
  };

  const handleNav = () => {
    setNav(!nav);
  };

  const location = useLocation();

  useEffect(() => {
    setNav(false);
  }, [location]);

  window.addEventListener("scroll", handleNavColor);
  return (
    <div
      className={`bg-black flex justify-between items-center px-[3rem] lg:px-[6rem] h-[8vh] fixed w-[100%] transition-all z-10 ${
        navColor ? "bg-black" : ""
      }`}
    >
      <Link to="/">
        <h1 className="text-white">MovieBox.</h1>
      </Link>

      <nav>
        <ul className="hidden lg:flex gap-4">
          <Link to="/">
            <li className="text-white">Home</li>
          </Link>
          <Link to="popular">
            <li className="text-white">Popular</li>
          </Link>
          <Link to="toprated">
            <li className="text-white">Top Rated</li>
          </Link>
          <Link to="upcoming">
            <li className="text-white">Upcoming</li>
          </Link>
        </ul>
      </nav>
      {/* Mobile Nav */}
      <ul
        className={`flex fixed w-3/4 flex-col right-0 top-0 items-center 
        justify-center h-full gap-10 bg-black lg:hidden transition-all ${
          nav ? "translate-x-0 drop-shadow-xl" : "translate-x-full"
        }`}
      >
        <Link to="/" className="mx-2 text-white">
          Home
        </Link>
        <Link to="popular" className="mx-2 text-white">
          Popular
        </Link>
        <Link to="toprated" className="mx-2 text-white">
          Top Rated
        </Link>
        <Link to="upcoming" className="mx-2 text-white">
          Upcoming
        </Link>
        <form
          className="flex border rounded-md px-2 py-1 bg-transparent outline-none"
          onSubmit={handleSubmit}
        >
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            name="search"
            placeholder="search..."
            className="outline-none bg-transparent text-white"
          />
          <CiSearch className="text-2xl cursor-pointer text-white" />
        </form>
      </ul>

      <div className="hiddem lg:flex items-center justify-center gap-5">
        <form
          className="hidden lg:flex border rounded-md px-2 py-1 bg-transparent"
          onSubmit={handleSubmit}
        >
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            name="search"
            placeholder="search..."
            className="outline-none bg-transparent text-white"
          />
          <CiSearch className="text-2xl cursor-pointer text-white" />
        </form>
        <Link to="/favorite" className="hidden lg:flex">
          <img src={heart} alt="" className="w-[70%] cursor-pointer" />
          <h1 className="text-white">{savedMovies.length}</h1>
        </Link>
      </div>
      <div
        className="flex items-center justify-center gap-4 z-10 lg:hidden"
        onClick={handleNav}
      >
        {nav ? (
          <HiOutlineX className="text-3xl cursor-pointer text-white" />
        ) : (
          <AiOutlineMenu className="text-3xl cursor-pointer text-white" />
        )}
        <Link to="/favorite" className="flex">
          <img src={heart} alt="" className="w-[70%] cursor-pointer" />
          <h1 className="text-white">{savedMovies.length}</h1>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
