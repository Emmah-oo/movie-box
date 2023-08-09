import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [navColor, setNavColor] = useState(false);
  const handleNavColor = () => {
    if (window.scrollY > 10) {
      setNavColor(true);
    } else {
      setNavColor(false);
    }
  };

  // const handleNavClick = () => setNav(false)

  window.addEventListener("scroll", handleNavColor);
  return (
    <div
      className={`bg-black flex justify-between items-center px-[6rem] h-[8vh] fixed w-[100%] transition-all z-10 ${
        navColor ? "bg-black" : ""
      }`}
    >
      <h1 className="text-white">MovieBox.</h1>
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
      <div className="flex border-2 rounded-md px-2 py-1">
        <input
          type="search"
          name="search"
          placeholder="search..."
          className="outline-none bg-transparent text-white"
        />
        <CiSearch className="text-2xl cursor-pointer text-white" />
      </div>
    </div>
  );
};

export default Navbar;
