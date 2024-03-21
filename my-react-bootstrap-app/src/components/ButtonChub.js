import React from "react";
import ButtonBase from "./ButtonBase";
import PropTypes from "prop-types";
import { useNodeContext } from "../hooks/useNode";
import { uploadFile } from "../utils/api";

export default function ButtonChub({
  urlString,
  refreshJsonCard,
  refreshImage,
}) {
  const { setNode } = useNodeContext();

  const chubRetrieve = async () => {
    try {
      const url = new URL(urlString);
      const fullPath = url.pathname.slice("/characters/".length);
      const response = await fetch(process.env.REACT_APP_CHUB_EXT_API, {
        method: "POST",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          format: "tavern",
          fullPath: fullPath,
          version: "main",
        }),
      });
      const blob = await response.blob(); // Get the response as a blob

      await sendFileToAnotherBackend(blob); // Wait for the blob to be sent to another backend

      setNode("file");
      refreshJsonCard();
      refreshImage();
    } catch (error) {
      console.error("Error:", error);
      throw error; // Re-throw to handle it in the component
    }
  };

  // You also need to adjust sendFileToAnotherBackend to return a promise that resolves once the fetch operation is complete:
  const sendFileToAnotherBackend = async (selectedFile) => {
    const formData = new FormData();
    formData.append("image", selectedFile, "image.png");
    await uploadFile(formData);
  };

  return (
    <div className="d-grid">
      <ButtonBase text="Load from Chub.ai" onClick={chubRetrieve} />
    </div>
  );
}

ButtonChub.propTypes = {
  urlString: PropTypes.string.isRequired,
  refreshJsonCard: PropTypes.func.isRequired,
  refreshImage: PropTypes.func.isRequired,
};
