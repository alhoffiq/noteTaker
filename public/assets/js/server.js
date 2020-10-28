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
    db.push(newNote);
    fs.writeFile('../../../db/db.json', JSON.stringify(db), (err) => {
        if (err) throw err;
        console.log('Data appended!');
      });
    res.json(newNote);
});

app.listen(PORT, function () {
    console.log("App listening on PORT, http://localhost:" + PORT);
});