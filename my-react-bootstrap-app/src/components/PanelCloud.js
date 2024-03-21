import React from "react";
import { useState } from "react";
import { Card, Form } from "react-bootstrap";
import ButtonChub from "./ButtonChub";
import "./PanelFile.component.css";
import PropTypes from "prop-types";

export default function PanelCloud({ refreshJsonCard, refreshImage }) {
  const [urlString, setUrlString] = useState("");

  const handleChange = (event) => {
    setUrlString(event.target.value);
  };

  return (
    <Card className="custom-glassy mt-3">
      <Card.Header>Cloud</Card.Header>
      <Card.Body>
        <Form.Control
          type="text"
          placeholder="https://chub.ai/characters/absolutelysfw/awkward-questions-fm"
          value={urlString}
          onChange={handleChange}
        />
        <div className="custom-grid mt-4">
          <ButtonChub
            urlString={urlString}
            refreshJsonCard={refreshJsonCard}
            refreshImage={refreshImage}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

PanelCloud.propTypes = {
  refreshJsonCard: PropTypes.func.isRequired,
  refreshImage: PropTypes.func.isRequired,
};
