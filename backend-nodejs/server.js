const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;
const { pngDecode } = require("./extract_node");

// Setup storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/') // Ensure this directory exists
  },
  filename: function(req, file, cb) {
    cb(null, "hotfile.png")
  }
});

const upload = multer({ storage: storage });

// Serve static files from uploads directory
app.get('/api/images', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', 'hotfile.png');
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('File not found');
    }
    res.sendFile(filePath);
  });
});

app.use(cors());
app.use(express.json());

app.get('/api/data', async (req, res) => {
  try {
    // Assuming you have a mechanism to identify the correct image
    // For demonstration, using a static file name
    const decodedData = await pngDecode("uploads/hotfile.png");
    if (decodedData) {
      res.json(decodedData);
    } else {
      res.status(404).send('Data not found');
    }
  } catch (err) {
    res.status(500).send('Error processing request');
  }
});

// Endpoint to upload image
app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    // Here, you can also implement image processing or decoding logic if needed
    console.log('File uploaded successfully:', req.file.path);
    res.json({ message: 'File uploaded successfully', filePath: req.file.path });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).send('Error uploading file');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
