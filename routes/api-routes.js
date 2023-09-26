// required packages
const router = require('express').Router();
const {v4: uuidv4} = require('uuid');
const fs = require('fs');

// GET notes
router.get('/api/notes', async (req, res) => {
    const data = await JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    res.json(data);
})

// POST new note
router.post('/api/notes', async (req, res) => {
    const data = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    const newNote = {
        id: uuidv4(),
        title: req.body.title,
        text: req.body.text
    };
    data.push(newNote);
    fs.writeFileSync('db/db.json', JSON.stringify(data));
    res.json(data);
})


// DELETE note 
// new endpoint
router.delete('/api/notes/:id', async (req, res) => {
    let data = fs.readFileSync('db/db.json', 'utf8');
    const dataJson = JSON.parse(data);
    const notes = dataJson.filter((note) => {
        return note.id !== req.params.id;
    })
    fs.writeFileSync('db/db.json', JSON.stringify(notes));
    res.json("This note has been deleted.");
})



module.exports = router;