// required packages
const express = require('express');
const path = require('path');
const fs = require('fs');


// set port for heroku/testing
const PORT = process.env.PORT || 3001;

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// HTML Routes
// sends main page index.html
app.get('/', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// sends notes page notes.html
app.get('/notes', (req, res) => 
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// API Routes
// GET notes
app.get('/api/notes', (req, res) => {
  console.log('get /api/notes');
  fs.readFile('db/db.json', 'utf8', (error, data) => {
    if (error) {
      return console.log(error)
    }
    res.json(JSON.parse(data));
  })
});

// POST new note
app.post('/api/notes', (req, res) => {
  console.log('post /api/notes')
  fs.readFile('db/db.json', 'utf8', (error, data) => {
      if (error) {
          return console.log(error);
      }

      // set up the data (note) and database
      const note = req.body;
      const dbData = JSON.parse(data);

      // add data (note) to database variable
      dbData.push({"title": note.title, "text": note.text, "id": note.id });

      // save the new database
      fs.writeFile('db/db.json', JSON.stringify(dbData), (error) => {
          if (error) {
              return console.log(error);
          }
          res.json(data);
      })
  });
})

//DELETE note
app.delete('/api/notes/:id', (req, res) => {
  console.log('delete /api/notes/:id')
  fs.readFile('db/db.json', 'utf8', (error, data) => {
      if (error) {
          return console.log(error);
      }

      // save the db data
      const dbNotes = JSON.parse(data);

      // filter out the note that is getting deleted
      const notes = dbNotes.filter((note) => {
          return note.id !== req.params.id;
      })

      // save the db data without the deleted note
      fs.writeFile('db/db.json', JSON.stringify(notes), 'utf8', (error) => {
          if (error) {
              return console.log(error);
          }
      });

  });


  const dataJson = JSON.parse(data);
  const notes = dataJson.filter((note) => {
      return note.id !== req.params.id;
  })
  fs.writeFileSync('db/db.json', JSON.stringify(notes));
  res.json("This note has been deleted.");
})

// run the server
app.listen(PORT, () => 
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
