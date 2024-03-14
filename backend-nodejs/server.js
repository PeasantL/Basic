const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;
const { pngDecode} = require("./extract_node");


app.use(cors())

app.get('/api/data', async (req, res) => {
  try {
    const decodedData = await pngDecode("main_awkward-questions-fm_spec_v2.png");
    if (decodedData) {
      res.json(decodedData);
    } else {
      res.status(404).send('Data not found');
    }
  } catch (err) {
    res.status(500).send('Error processing request');
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));
