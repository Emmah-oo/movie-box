import React, { useContext, useEffect } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import MovieContext from "../Context/MovieContext";
import { useLocation } from "react-router-dom";

const Pagination = () => {
  const location = useLocation();
  const { page, setPage } = useContext(MovieContext);
  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };
  useEffect(() => {
    // Set page to 1 whenever the location (route) changes
    setPage(1);
  }, [location, setPage]);

  return (
    <div className="flex gap-3 px-[6rem] items-center mt-[1.5rem]">
      <BsFillArrowLeftCircleFill
        className="text-2xl cursor-pointer"
        onClick={prevPage}
      />
      <h1>{page}</h1>
      <BsFillArrowRightCircleFill
        className="text-2xl cursor-pointer"
        onClick={nextPage}
      />
    </div>
  );
};

export default Pagination;
