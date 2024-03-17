import React from "react";
import { Card } from "react-bootstrap";
import "./PanelFileState.component.css";
import { saveData, deleteUploads as deleteUploadsAPI } from "../utils/api";
import ButtonBase from "./ButtonBase";
import ButtonUpload from "./ButtonUpload";
import PropTypes from "prop-types";

export default function FileStatePanel({ data, refreshData }) {
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
    <Card className="custom-card">
      <Card.Header>File State Panel</Card.Header>
      <Card.Body>
        <div className="custom-grid">
          <ButtonUpload refreshData={refreshData} />
          <ButtonBase text="Upload Folder" disabled />
          <ButtonBase text="Download From Cloud" disabled />
          <ButtonBase text="Purge Upload" onClick={deleteUploads} />
          <ButtonBase text="Save File" onClick={handleSave} />
          <ButtonBase text="Download From Cloud" disabled />
          <ButtonBase text="Download Folder" disabled />
        </div>
      </Card.Body>
    </Card>
  );
}

FileStatePanel.propTypes = {
  data: PropTypes.object.isRequired,
  refreshData: PropTypes.func.isRequired,
};
