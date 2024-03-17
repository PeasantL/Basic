import React from "react";
import { Card } from "react-bootstrap";
import ButtonBase from "./ButtonBase";
import ButtonStringProcess from "./ButtonStringProcess";
import "./PanelFile.component.css";
import PropTypes from "prop-types";

export default function PanelFileContent({ setData }) {
  return (
    <Card className="custom-glassy">
      <Card.Header>File Content</Card.Header>
      <Card.Body>
        <div className="custom-grid">
          <ButtonStringProcess setData={setData} />
          <ButtonBase text="Change Image" disabled />
        </div>
      </Card.Body>
    </Card>
  );
}

PanelFileContent.propTypes = {
  setData: PropTypes.func.isRequired,
};
