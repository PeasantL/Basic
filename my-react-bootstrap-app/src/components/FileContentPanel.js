import React from "react";
import { Card, Button } from "react-bootstrap";
import { StringProcessButtons } from "./StringProcessButtons";
import "./FileStatePanel.component.css";

export default function FileStatePanel(data, setData) {
  return (
    <Card bg="success">
      <Card.Header>File Content Panel</Card.Header>
      <Card.Body>
        <div className="custom-grid">
          <StringProcessButtons data={data} setData={setData} />
          <Button variant="primary" disabled>
            Change Image
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
