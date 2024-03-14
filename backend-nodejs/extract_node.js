const fs = require('fs');
const extractChunks = require('png-chunks-extract');
const Buffer = require('buffer').Buffer;

const extractAndDecodePngTextChunk = (filePath) => {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Error reading the PNG file:', err);
      return;
    }

    // Extract all chunks from the PNG file
    const allChunks = extractChunks(data);

    // Filter the chunks to keep only those of name 'tEXt'
    const textChunks = allChunks.filter(chunk => chunk.name === 'tEXt');

    if (textChunks.length > 0) {
      // Assuming there's only one tEXt chunk
      const textChunk = textChunks[0];

      // Convert the content from Uint8Array to a string
      const contentArray = textChunk.data;
      const contentText = Buffer.from(contentArray).toString('utf-8');

      // Decode the base64 string
      const decodedText = Buffer.from(contentText.slice(5), 'base64').toString('utf-8');

      console.log(decodedText);
      // Here, you can process the decoded text as needed.
    } else {
      console.log('No tEXt chunks found.');
    }
  });
};

// Usage
// Provide the path relative to your project root. Assuming the public folder is at the root.
extractAndDecodePngTextChunk('main_awkward-questions-fm_spec_v2.png');
