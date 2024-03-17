import React from "react";
import { Card, Button } from "react-bootstrap";
import { StringProcessButtons } from "./StringProcessButtons";
import "./FileContentPanel.component.css";
import PropTypes from "prop-types";

export default function FileContentPanel({ data, setData }) {
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

FileContentPanel.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
};
