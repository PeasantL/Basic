import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Button } from "react-bootstrap";
import "./ButtonBase.component.css";

const ButtonBase = ({ text, onClick, disabled }) => {
  return (
    <Button
      className="custom-button"
      variant="white"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </Button>
  );
};

// Define prop types for the BaseButton component
ButtonBase.propTypes = {
  text: PropTypes.string.isRequired, // text is required and must be a string
  onClick: PropTypes.func, // onClick is optional but, if provided, must be a function
  disabled: PropTypes.bool, // disabled is optional but, if provided, must be a boolean
};

export default ButtonBase;
