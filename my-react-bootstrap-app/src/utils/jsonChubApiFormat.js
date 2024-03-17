// The URL you're starting with
const urlString =
  "https://chub.ai/characters/absolutelysfw/awkward-questions-fm";

// Parse the URL
const url = new URL(urlString);

// Extract the relevant part of the pathname
// Assuming the structure is always /characters/{extracted_part}
// You can adjust the slice index based on your URL structure
const fullPath = url.pathname.slice("/characters/".length);

// Create the JSON request
const jsonRequest = {
  format: "tavern",
  fullPath: fullPath, // Use the extracted part
  version: "main",
};

console.log(jsonRequest);
