import React, { useRef } from "react";
import ButtonBase from "./ButtonBase";
import PropTypes from "prop-types";
import { useNodeContext } from "../hooks/useNode";

export default function ButtonUploadFolder({ refreshData, refreshImage }) {
  const fileInputRef = useRef(null);

  const { setNode } = useNodeContext();

  const handleButtonClick = () => {
    // Directly open the file dialog
    setNode("folder");
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    var files = event.target.files;

    try {
      for (var ii = 0; ii < files.length; ii++) {
        var selectedFile = files[ii];

        if (selectedFile) {
          var folder = selectedFile.webkitRelativePath.replace(
            selectedFile.name,
            "",
          );
          uploadFolder(selectedFile, folder); // Upload the file immediately after selection
        }
      }
      alert("Folder uploaded");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to upload folder.");
    }

    refreshData();
    refreshImage();
  };

  const uploadFolder = async (selectedFile, folder) => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    const response = await fetch(`http://localhost:3001/upload/${folder}`, {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    console.log("Success:", result);
    // Reset the file input for the next upload
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="d-grid">
      <input
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
        ref={fileInputRef}
        webkitdirectory="true"
      />
      <ButtonBase text="Upload Folder" onClick={handleButtonClick} />
    </div>
  );
}

ButtonUploadFolder.propTypes = {
  refreshData: PropTypes.func.isRequired,
  refreshImage: PropTypes.func.isRequired,
};
