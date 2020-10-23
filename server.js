const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(db);
});

// Post notes
app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = Math.floor(Math.random().toFixed(2)*100);
  db.push(newNote);
  fs.writeFileSync(path.join(__dirname, 'db', 'db.json'), JSON.stringify(db));
  res.json(newNote);
});

//listening
app.listen(PORT, () => { console.log('App listening on PORT ' + PORT); });