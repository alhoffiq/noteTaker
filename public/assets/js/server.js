const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("../../../db/db.json");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '../../../public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../../index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../../notes.html"));
});

app.get("/api/notes", function (req, res) {
    return res.json(db);
});

app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    newNote.id = db.length; // adds the new note's id property to be equal to the index position it will be in
    db.push(newNote); // puts the new note to the end of the database array
    fs.writeFile('../../../db/db.json', JSON.stringify(db), (err) => {
        if (err) throw err;
        console.log('Data appended!');
    });
    res.json(newNote);
});


app.delete("/api/notes/:id", function (req, res) {
    db.splice(req.params.id, 1);
    for (let i = 0; i < db.length; i++) { // Makes sure the id property of all notes is equal to their index at all times
        const note = db[i];
        note.id = i;
    };
    fs.writeFile('../../../db/db.json', JSON.stringify(db), (err) => {
        if (err) throw err;
        console.log(`Note with id:${req.params.id} was removed`)
    });
    res.json(db);

});
app.listen(PORT, function () {
    console.log(`App listening on PORT:${PORT}`);
});