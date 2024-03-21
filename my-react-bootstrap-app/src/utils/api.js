// Function to fetch data from API
export const fetchData = async (filename) => {
  let url = process.env.REACT_APP_JSON_DATA_FETCH_API;
  // given a filename is specified, send query parameter to the backend
  if (filename) {
    url += `?filename=${filename}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation", error);
    throw error; // Re-throw to handle it in the component
  }
};

// Function to save data
export const saveData = async (jsonCard, filename) => {
  let url = process.env.REACT_APP_JSON_DATA_SAVE_API;
  // given a filename is specified, send query parameter to the backend
  if (filename) {
    url += `?filename=${filename}`;
  }

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: jsonCard }),
    });
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw to handle it in the component
  }
};

// Function to clear upload folder
export const deleteUploads = async () => {
  try {
    const response = await fetch(process.env.REACT_APP_FOLDER_DELETE_API, {
      method: "DELETE",
    });
    const responseData = await response.text();
    console.log(responseData);
    return responseData; // You might want to return something to indicate success
  } catch (error) {
    console.error("Failed to delete the folder contents:", error);
    throw error; // Re-throw to handle it in the component
  }
};

export const fetchFileList = async () => {
  try {
    const response = await fetch(process.env.REACT_APP_FOLDER_LIST_FETCH_API);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation", error);
    throw error; // Re-throw to handle it in the component
  }
};

export const uploadFile = async (formData) => {
  try {
    const response = await fetch(process.env.REACT_APP_FILE_UPLOAD_API, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const result = await response.json();
    console.log("Success:", result);
    alert("File uploaded successfully!");

    // Reset the file input for the next upload (if applicable)

    // Assuming setNode function is for setting some state after a successful upload
  } catch (error) {
    console.error("Error during file upload:", error);
    alert("Failed to upload file.");
    throw error; // Re-throw the error if you need to handle it later
  }
};
