const fs = require('fs').promises;
const extractChunks = require('png-chunks-extract');
const encodeChunks = require('png-chunks-encode');

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
      return null;
    }
  } catch (err) {
    console.error('Error reading the PNG file:', err);
    throw err;
  }
};

const pngEncode = async (filePath, newTextContent) => {
  try {
    // Encode newTextContent in Base64


    const pngBuffer = await fs.readFile(filePath);
    const chunks = extractChunks(pngBuffer);

    const stringJson = JSON.stringify(newTextContent)
    const base64EncodedTextContent = Buffer.from(stringJson).toString('base64');

    let found = false;
    for (let i = 0; i < chunks.length; i++) {
      if (chunks[i].name === 'tEXt') {
        const text = Buffer.from(chunks[i].data).toString('utf-8');
        if (text.startsWith('chara')) {
          // Include the 'chara\0' prefix and then the Base64 encoded content
          const newText = `chara\0${base64EncodedTextContent}`;
          chunks[i].data = Buffer.from(newText, 'utf8');
          found = true;
          break;
        }
      }
    }

    if (!found) {
      console.log("'chara' tEXt chunk not found.");
      return null;
    } else {
      const newPngBuffer = encodeChunks(chunks);
      console.log('tEXt chunk edited and PNG recompiled successfully.');
      return newPngBuffer;
    }
  } catch (error) {
    console.error('Error processing PNG:', error);
    throw error;
  }
};

module.exports = { pngDecode, pngEncode };
