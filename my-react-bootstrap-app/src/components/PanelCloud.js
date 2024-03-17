import React from "react";
import { Card, Form } from "react-bootstrap";
import ButtonBase from "./ButtonBase";
import "./PanelFile.component.css";

export default function PanelCloud() {
  return (
    <Card className="custom-glassy mt-3">
      <Card.Header>Cloud</Card.Header>
      <Card.Body>
        <Form.Control
          type="text"
          placeholder="https://chub.ai/characters/absolutelysfw/awkward-questions-fm"
        />
        <div className="custom-grid mt-4">
          <ButtonBase text="Load from Chub.ai" disabled />
        </div>
      </Card.Body>
    </Card>
  );
}
