import React, { useRef } from "react";
import ButtonBase from "./ButtonBase";
import PropTypes from "prop-types";
import { useNodeContext } from "../hooks/useNode";
import { uploadFile } from "../utils/api";

export default function ButtonUpload({ refreshData, refreshImage }) {
  const fileInputRef = useRef(null);

  const { setNode } = useNodeContext();

  const handleButtonClick = () => {
    // Directly open the file dialog

    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      uploadFileImage(selectedFile); // Upload the file immediately after selection
      if (fileInputRef && fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Utility function to upload a file to the backend
  const uploadFileImage = async (selectedFile) => {
    const formData = new FormData();
    formData.append("image", selectedFile, "image.png");
    await uploadFile(formData);
    setNode("file"); // or any other relevant action post-upload
    refreshData();
    refreshImage();
  };

  return (
    <div className="d-grid">
      <input
        type="file"
        style={{ display: "none" }}
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      <ButtonBase text="Upload Image" onClick={handleButtonClick} />
    </div>
  );
}

ButtonUpload.propTypes = {
  refreshData: PropTypes.func.isRequired,
  refreshImage: PropTypes.func.isRequired,
};
