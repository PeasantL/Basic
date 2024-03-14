const fs = require('fs').promises; // Note the change here to use promise-based FS
const extractChunks = require('png-chunks-extract');

const pngDecode = async (filePath) => {
  try {
    const data = await fs.readFile(filePath);

    const allChunks = extractChunks(data);
    const textChunks = allChunks.filter(chunk => chunk.name === 'tEXt');

    if (textChunks.length > 0) {
      const textChunk = textChunks[0];
      const contentArray = textChunk.data;
      const contentText = Buffer.from(contentArray).toString('utf-8');
      const decodedText = Buffer.from(contentText.slice(5), 'base64').toString('utf-8');

      return JSON.parse(decodedText);
    } else {
      console.log('No tEXt chunks found.');
      return null; // Or an appropriate default/fallback value
    }
  } catch (err) {
    console.error('Error reading the PNG file:', err);
    throw err; // Rethrow or handle as appropriate
  }
};

module.exports = { pngDecode };
