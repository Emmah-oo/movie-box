import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [navColor, setNavColor] = useState(false);

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

  window.addEventListener("scroll", handleNavColor);
  return (
    <div
      className={`bg-black flex justify-between items-center px-[6rem] h-[8vh] fixed w-[100%] transition-all z-10 ${
        navColor ? "bg-black" : ""
      }`}
    >
      <Link to="/">
        <h1 className="text-white">MovieBox.</h1>
      </Link>
      <nav>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="text-white">Home</li>
          </Link>
          <Link to="/popular">
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
      <form
        className="flex border rounded-md px-2 py-1 bg-transparent"
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
    </div>
  );
};

export default Navbar;
