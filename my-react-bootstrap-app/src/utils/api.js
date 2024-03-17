// Function to fetch data from API
export const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/data");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation", error);
    throw error; // Re-throw to handle it in the component
  }
};

// Function to save data
export const saveData = async (data) => {
  try {
    const response = await fetch("http://localhost:3001/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
    const serverData = await response.json();
    console.log(serverData);
    return serverData;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw to handle it in the component
  }
};

/*
// Function to delete hotfile
export const deleteHotfile = async () => {
  try {
    const response = await fetch("http://localhost:3001/delete-hotfile", {
      method: "DELETE",
    });
    const responseData = await response.text();
    console.log(responseData);
    return responseData; // You might want to return something to indicate success
  } catch (error) {
    console.error("Failed to delete the file:", error);
    throw error; // Re-throw to handle it in the component
  }
};
*/

// Function to clear upload folder
export const deleteUploads = async () => {
  try {
    const response = await fetch("http://localhost:3001/delete-uploads", {
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
