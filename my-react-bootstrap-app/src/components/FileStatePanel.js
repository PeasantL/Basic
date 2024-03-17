import React from "react";
import { Card, Button } from "react-bootstrap";
import "./FileStatePanel.component.css";
import { saveData, deleteUploads as deleteUploadsAPI } from "../utils/api";
import { UploadImage } from "./UploadButton";

export default function FileStatePanel(data) {
  // Wrapped function to handle deletion with UI feedback (e.g., reloading)
  const deleteUploads = async () => {
    try {
      await deleteUploadsAPI();
      window.location.reload(); //Must change to something that does not refresh the whole page
      alert("Folder deleted successfully");
    } catch (error) {
      alert("Failed to delete the folder");
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
          <Button variant="primary" onClick={deleteUploads}>
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
