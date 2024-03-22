import React from "react";
import { Card } from "react-bootstrap";
import "./PanelFile.component.css";
import { saveData, deleteUploads as deleteUploadsAPI } from "../utils/api";
import ButtonBase from "./ButtonBase";
import ButtonUpload from "./ButtonUpload";
import ButtonUploadFolder from "./ButtonUploadFolder";
import { useNodeContext } from "../hooks/useNode";
import PropTypes from "prop-types";

export default function PanelFileState({
  jsonCard,
  refreshJsonCard,
  refreshImage,
}) {
  // Wrapped function to handle deletion with UI feedback (e.g., reloading)
  const { node, setNode } = useNodeContext();

  const deleteUploads = async () => {
    try {
      await deleteUploadsAPI();
      refreshJsonCard();
      refreshImage();
      alert("Folder deleted successfully");
      setNode("none");
    } catch (error) {
      alert("Failed to delete the folder");
    }
  };

  // Wrapped function for handleSave to use in the UI
  const handleSave = () => {
    saveData(jsonCard)
      .then((serverData) => console.log(serverData))
      .catch((error) => console.error("Error:", error));
  };

  function downloadFolder() {
    // Adjust the URL as needed based on your server configuration
    window.location.href = process.env.REACT_APP_DOWNLOAD_FOLDER_API;
  }

  return (
    <Card className="custom-glassy">
      <Card.Header>File State</Card.Header>
      <Card.Body>
        <div className="custom-grid">
          <ButtonUpload
            refreshJsonCard={refreshJsonCard}
            refreshImage={refreshImage}
          />

          <ButtonBase text="Purge Upload" onClick={deleteUploads} />
          <ButtonBase
            text="Save Changes to Image"
            onClick={handleSave}
            disabled={node === "none" || node === "folder"}
          />
        </div>
      </Card.Body>
      <Card.Header>Folder State</Card.Header>
      <Card.Body>
        <div className="custom-grid">
          <ButtonUploadFolder
            refreshJsonCard={refreshJsonCard}
            refreshImage={refreshImage}
          />
          <ButtonBase
            text="Download Folder"
            onClick={downloadFolder}
            disabled={node === "none" || node === "file"}
          />
        </div>
      </Card.Body>
    </Card>
  );
}

PanelFileState.propTypes = {
  jsonCard: PropTypes.object.isRequired,
  refreshJsonCard: PropTypes.func.isRequired,
  refreshImage: PropTypes.func.isRequired,
};
