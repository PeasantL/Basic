const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
const app = express();
const PORT = 3001;
const { pngDecode, pngEncode } = require("./extract_node");

app.use(cors());
app.use(express.json());

// Ensure the upload folder exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Variable for tracking the current image
var image = ''
// For now, upon start, it also pulls whatever first png image it finds in the directory
fs.readdir("uploads", { recursive: true }, function(err, files){
  filesList = files.filter(function(e){
    return path.extname(e).toLowerCase() === '.png'
  });
  image = filesList[0];
  console.log(filesList);
});

// Setup storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/') // Ensure this directory exists
  },
  filename: function(req, file, cb) {
    image = file.originalname
    cb(null, image) // TODO: check probably unsafe
  }
});

const upload = multer({ storage: storage });

// Serve static files from uploads directory
app.get('/api/images', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', image);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('File not found');
    }
    res.sendFile(filePath);
  });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Opens Json Data
app.get('/api/data', async (req, res) => {
  try {
    // Assuming you have a mechanism to identify the correct image
    // For demonstration, using a static file name
    const decodedData = await pngDecode(path.join(__dirname, 'uploads', image));
    if (decodedData) {
      res.json(decodedData);
    } else {
      res.status(404).send('Data not found');
    }
  } catch (err) {
    res.status(500).send('Error processing request');
  }
});

app.delete('/delete-image', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', image);
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error('Failed to delete file:', err);
      return res.status(500).send('Failed to delete file');
    }
    console.log('File deleted successfully');
    res.send('File deleted successfully');
  });
});

// Empty the uploads directory
app.delete('/delete-uploads', (req, res) => {
  const filePath = path.join(__dirname, 'uploads/');
  fsExtra.emptyDir(filePath, { recursive: true }, (err) => {
    if (err) {
      console.error(`Failed to delete "${filePath}":`, err);
      return res.status(500).send(`Failed to delete "${filePath}"`);
    }
    console.log(`"${filePath}" deleted successfully`);
    res.send(`"${filePath}" deleted successfully`);
  });
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

// Endpoint to upload image
app.post('/update', upload.single('jsonUpdate'), async (req, res) => {
  try {
    // Here, you can also implement image processing or decoding logic if needed
    /*console.log('File uploaded successfully:', req.body.data);*/
    filename = path.join(__dirname, 'uploads', image);
    const updatedPng = await pngEncode(filename, req.body.data);
    fs.writeFile(filename, updatedPng, (err) => {
      if (err) {
        console.error('Error writing file:', err);
      } else {
        console.log('File saved successfully.');
      }
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).send('Error uploading file');
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
