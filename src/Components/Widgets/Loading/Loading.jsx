import React from "react";
import "./Loading.scss";
import loadingGif from "../../Assets/loading.gif";

const Loading = () => {
  return (
    <div className="loading-container">
      <img src={loadingGif} alt="Loading..." />
    </div>
  );
};

export default Loading;
