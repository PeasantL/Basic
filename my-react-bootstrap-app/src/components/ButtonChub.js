import React from "react";
import ButtonBase from "./ButtonBase";
import PropTypes from "prop-types";
import { useNodeContext } from "../hooks/useNode";

export default function ButtonChub({ urlString, refreshData, refreshImage }) {
  const { setNode } = useNodeContext();

  const chubRetrieve = async () => {
    try {
      const url = new URL(urlString);
      const fullPath = url.pathname.slice("/characters/".length);
      const response = await fetch(
        "https://api.chub.ai/api/characters/download",
        {
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
        },
      );
      const blob = await response.blob(); // Get the response as a blob

      await sendFileToAnotherBackend(blob); // Wait for the blob to be sent to another backend

      setNode("file");
      refreshData();
      refreshImage();
    } catch (error) {
      console.error("Error:", error);
      throw error; // Re-throw to handle it in the component
    }
  };

  // You also need to adjust sendFileToAnotherBackend to return a promise that resolves once the fetch operation is complete:
  function sendFileToAnotherBackend(fileBlob) {
    return new Promise((resolve, reject) => {
      var formData = new FormData();
      formData.append("image", fileBlob, "image.png");

      fetch("http://localhost:3001/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((data) => {
          console.log(data); // Handle success response
          resolve(data); // Resolve the promise with the data
        })
        .catch((error) => {
          console.error(
            "There was a problem with your fetch operation:",
            error,
          );
          reject(error); // Reject the promise with the error
        });
    });
  }

  return (
    <div className="d-grid">
      <ButtonBase text="Load from Chub.ai" onClick={chubRetrieve} />
    </div>
  );
}

ButtonChub.propTypes = {
  urlString: PropTypes.string.isRequired,
  refreshData: PropTypes.func.isRequired,
  refreshImage: PropTypes.func.isRequired,
};
