import React from "react";
import LoadingImage from "../../assets/img/logo.png";
import "./Loader.scss";

function Loader({ type, text }) {
  return (
    <>
      {type === "primary" ? (
        <div className="loader zoomer">
          <img src={LoadingImage} alt="" srcSet="" />
          <div>{text}</div>
        </div>
      ) : (
        <div id="loading-bar-spinner" className="loader spinner">
          <div className="spinner-icon"></div>
        </div>
      )}
    </>
  );
}

export default Loader;
