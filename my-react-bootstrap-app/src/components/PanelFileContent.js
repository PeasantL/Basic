import React from "react";
import { Card } from "react-bootstrap";
import ButtonStringProcess from "./ButtonStringProcess";
import "./PanelFile.component.css";
import PropTypes from "prop-types";
import ButtonChangeImage from "./ButtonChangeImage";

export default function PanelFileContent({
  jsonCard,
  setJsonCard,
  refreshJsonCard,
  refreshImage,
}) {
  return (
    <Card className="custom-glassy">
      <Card.Header>File Content</Card.Header>
      <Card.Body>
        <div className="custom-grid">
          <ButtonStringProcess setJsonCard={setJsonCard} />
          <ButtonChangeImage
            jsonCard={jsonCard}
            refreshJsonCard={refreshJsonCard}
            refreshImage={refreshImage}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

PanelFileContent.propTypes = {
  jsonCard: PropTypes.object.isRequired,
  setJsonCard: PropTypes.func.isRequired,
  refreshJsonCard: PropTypes.func.isRequired,
  refreshImage: PropTypes.func.isRequired,
};
