import React from "react";
import { Image } from "react-bootstrap";

import "./components.scss";

const ImageLogo = () => {
  return (
    <div className="main-page--image-logo-container">
      <Image
        className="main-page--image-logo"
        src={require("../assets/search-movies.png")}
        fluid
        rounded
      />
    </div>
  );
};

export default ImageLogo;
