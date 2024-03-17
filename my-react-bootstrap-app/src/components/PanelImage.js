import React from "react";
import { Image } from "react-bootstrap";
import PropTypes from "prop-types";
import "./PanelImage.component.css";

export default function PanelImage({ imageUrl }) {
  // Now, `refreshImage` can be called to refresh the image. This can be done here or passed to other components/events.
  console.log(imageUrl);
  return (
    <div>
      <Image
        src={imageUrl}
        onError={(e) => {
          console.log(e);
          e.target.onError = null;
          e.target.src = "/defaultImage.png";
        }}
        alt="Dynamic Image"
        className="custom-image"
      />
      {/* The refreshImage function can be called on some event, like a button click, or from parent components */}
    </div>
  );
}

PanelImage.propTypes = {
  imageUrl: PropTypes.string.isRequired,
};
