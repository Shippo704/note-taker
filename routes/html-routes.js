// required packages
const router = require('express').Router();
const path = require('path');

// HTML Routes
// sends main page index.html
router.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// sends notes page notes.html
router.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);



module.exports = router;