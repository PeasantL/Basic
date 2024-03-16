import React from "react";
import { Image } from "react-bootstrap";
import { imageStyle } from "../utils/dataFormat";

export default function ImagePanel() {
  return (
    <Image
      src="http://localhost:3001/api/images"
      style={imageStyle}
      alt="Image"
      className="width=20% mx-auto d-block"
      rounded
    />
  );
}
