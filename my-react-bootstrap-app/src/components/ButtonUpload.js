import React, { useRef } from "react";
import ButtonBase from "./ButtonBase";

export default function ButtonUpload() {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    // Directly open the file dialog
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      uploadFile(selectedFile); // Upload the file immediately after selection
    }
  };

  const uploadFile = async (selectedFile) => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log("Success:", result);
      alert("File uploaded successfully!");
      // Reset the file input for the next upload
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to upload file.");
    }
    window.location.reload(); //To remove, change to something that updates all necessary states
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
