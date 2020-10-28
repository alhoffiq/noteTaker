const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

let json = "";
fs.readFile(path.join(__dirname, "../../../db/db.json"), "utf8", (err, data) => {
    if (err) throw err;
    json = data;
});

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
    return res.json(json);
});

app.post("/api/tables", function (req, res) {
    let newNote = req.body;
    console.log(newNote);
    json.push(newNote);
    res.json(newNote);
});

app.listen(PORT, function () {
    console.log("App listening on PORT, http://localhost:" + PORT);
});