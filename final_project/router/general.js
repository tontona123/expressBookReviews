const express = require('express');
let books = require("./booksdb.js");
const public_users = express.Router();

public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        if (!users[username]) {
            users[username] = { username, password };
            return res.status(200).json({ message: "User successfully registered. Now you can login" });
        } else {
            return res.status(404).json({ message: "User already exists!" });
        }
    }
    return res.status(404).json({ message: "Unable to register user." });
});

public_users.get('/', function (req, res) {
    res.status(200).send(JSON.stringify(books, null, 4));
});

public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    res.status(200).send(books[isbn]);
});

public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    let result = [];
    for (let key in books) {
        if (books[key].author === author) {
            result.push(books[key]);
        }
    }
    res.status(200).send(result);
});

public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    let result = [];
    for (let key in books) {
        if (books[key].title === title) {
            result.push(books[key]);
        }
    }
    res.status(200).send(result);
});

public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    res.status(200).send(books[isbn].reviews);
});

module.exports.general = public_users;
