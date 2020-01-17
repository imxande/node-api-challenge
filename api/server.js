// import express to make API 
const express = require('express');

// setting up a variable to use express invoked
const server = express();

// teaching express how to handle json
server.use(express.json());

// checking if server is listening
server.use('/', (req, res) =>{
    res.send(`<h1> Any body home? </h1>`)
})

// exporting the server to use it on index
module.exports = server;