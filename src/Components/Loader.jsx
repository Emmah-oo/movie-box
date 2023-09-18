import React from "react";
import loader from "../Img/Loader.svg";

const Loader = () => {
  return (
    <div className="flex items-center justify-center pt-[8vh]">
      <img src={loader} alt="loader" />
    </div>
  );
};

export default Loader;
