import React from "react";
import { Card } from "react-bootstrap";
import ButtonBase from "./ButtonBase";
import ButtonStringProcess from "./ButtonStringProcess";
import "./PanelFileContent.component.css";
import PropTypes from "prop-types";

export default function FileContentPanel({ setData }) {
  return (
    <Card bg="success">
      <Card.Header>File Content Panel</Card.Header>
      <Card.Body>
        <div className="custom-grid">
          <ButtonStringProcess setData={setData} />
          <ButtonBase text="Change Image" disabled />
        </div>
      </Card.Body>
    </Card>
  );
}

FileContentPanel.propTypes = {
  setData: PropTypes.func.isRequired,
};
