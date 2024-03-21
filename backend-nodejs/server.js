const express = require('express');
const cors = require('cors');
const multer = require('multer');
const archiver = require('archiver');
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
// Set as relative to "uploads" to (potentially) reduce chance a bug allows IO outside the folder
var image = ''
// For now, upon start, it also pulls whatever first png image it finds in the directory
fs.readdir("uploads", { recursive: true }, function(err, files){
  filesList = files.filter(function(e){
    return path.extname(e).toLowerCase() === '.png'
  });
  image = filesList[0];
  if (!image) {
    console.log("No uploaded images!");
  }
  else {
    console.log(`Found uploaded image: ${image}`);
  }
});

// Setup storage engine
//TODO: we do not yet handle errors, there is potential for the backend to just crash
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    dir = req.url.replace('/upload', 'uploads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir) // Ensure this directory exists
  },
  filename: function(req, file, cb) {
    file = file.originalname
    cb(null, file) //TODO: check probably unsafe
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

// allows us to get any files within the uploads folder (including subdirectory files, but never folders)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// returns a list of png files found in the uploads folder
app.get('/api/get-png-list', async (req, res) => {
  try {
    fs.readdir("uploads", { recursive: true }, function(err, files){
      filesList = files.filter(function(e){
        return path.extname(e).toLowerCase() === '.png'
      });
      res.json({ files: filesList });
    });
  } catch (err) {
    res.status(500).send('Error processing request');
  }
});

// Empty the uploads directory
app.delete('/api/delete-uploads', (req, res) => {
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
app.post('/upload*', upload.single('image'), async (req, res) => {
  try {
    // need to remove the "uploads/"" as image is used relative to the folder already
    image = req.file.path.replace("uploads/", "");
    console.log('File uploaded successfully:', req.file.path);
    res.json({ message: 'File uploaded successfully', filePath: req.file.path });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).send('Error uploading file');
  }
});

// GET request for the json data from target image
app.get('/api/data', async (req, res) => {
  let filename = "";

  try {
    let filename = getImageFilename(req);
    // get decoded png data from target file
    const decodedData = await pngDecode(filename);
    if (decodedData) {
      res.json(decodedData);
    } else {
      res.status(404).send(`Data not found for ${filename}`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing request');
  }
});

// Updates and re-encodes the image with received json data
// Allows the target file to be specified by "filename" query
app.post('/api/save-data', upload.single('jsonUpdate'), async (req, res) => {
  let filename = "";
  
  try {
    filename = getImageFilename(req);
    // re-encode the png and write to file
    const updatedPng = await pngEncode(filename, req.body.data);
    fs.writeFileSync(filename, updatedPng);

    res.send(`${filename} has been encoded with new data`);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Unable to re-encode ${filename}`);
  }
});

// Returns a valid image file or throws an error
// -- does not currently check if it is a .png
function getImageFilename(req) {
  let filename = path.join(__dirname, 'uploads')
  
  // if filename ios given, use this instead
  if (req.query.filename) {
    filename = path.join(filename, req.query.filename);
  }
  else if (image) {
    filename = path.join(filename, image)
  }
  else {
    throw `Missing filename in query (or backend image var was not set)`;
  }

  // return if filename given is invalid
  if (!fs.existsSync(filename)) {
    throw `The file "${filename}" could not be found on the server`;
  }

  return filename;
}

app.get('/download-folder', (req, res) => {
  const filePath = path.join(__dirname, 'uploads')
  const folderPath = filePath; // Update this to your folder's path
  res.writeHead(200, {
    'Content-Type': 'application/zip',
    'Content-Disposition': 'attachment; filename=folder.zip',
  });

  const archive = archiver('zip', {
    zlib: { level: 9 }, // Compression level
  });

  archive.on('error', (err) => {
    throw err;
  });

  archive.pipe(res);
  archive.directory(folderPath, false);
  archive.finalize();
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
