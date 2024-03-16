import React from "react";
import { Image } from "react-bootstrap";

export default function ImagePanel() {
  return (
    <Image
      src="http://localhost:3001/api/images"
      alt="Image"
      className="custom-image"
      rounded
    />
  );
}
