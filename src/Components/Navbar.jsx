import React from "react";
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-[6rem] h-[10vh] fixed w-[100%] z-10">
      <h1 className="text-white">MovieBox.</h1>
      <nav>
        <ul className="flex gap-4">
          <li className="text-white">Home</li>
          <li className="text-white">Trending</li>
          <li className="text-white">Discover</li>
          <li className="text-white">Latest</li>
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
