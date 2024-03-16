import React from "react";
import { Card, Button } from "react-bootstrap";
import "./FileStatePanel.component.css";
import { saveData, deleteHotfile as deleteHotfileAPI } from "../utils/api";
import { UploadImage } from "./UploadButton";

export default function FileContentPanel(data) {
  // Wrapped function to handle deletion with UI feedback (e.g., reloading)
  const deleteHotfile = async () => {
    try {
      await deleteHotfileAPI();
      window.location.reload();
      alert("File deleted successfully");
    } catch (error) {
      alert("Failed to delete the file");
    }
  };

  // Wrapped function for handleSave to use in the UI
  const handleSave = () => {
    saveData(data)
      .then((serverData) => console.log(serverData))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <Card bg="success">
      <Card.Header>File State Panel</Card.Header>
      <Card.Body>
        <div className="custom-grid">
          <UploadImage />
          <Button variant="primary" disabled>
            Upload Folder
          </Button>
          <Button variant="primary" disabled>
            Download From Cloud
          </Button>
          <Button variant="primary" onClick={deleteHotfile}>
            Purge Upload
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save File
          </Button>
          <Button variant="primary" disabled>
            Download Folder
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
