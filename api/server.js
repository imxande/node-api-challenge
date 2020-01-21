// import express to make API
const express = require('express');

// I need the projects router here now
const router = require('../projectRoute/router.js')

// I need actions router here
const actionRouter = require('../actionsRouter/router.js')

// setting up a variable to use express invoked
const server = express();

// teaching express how to handle json
server.use(express.json());

// I need to provide the path here
server.use("/api/projects", router);

// I need to provide the action path here
server.use("/api/actions", actionRouter);

// checking if server is listening
server.get('/', (req, res) => {
    res.send(`<h1> Any body home? </h1> 
              <p>Ok server is running now</p>`)
})

// exporting the server to use it on index
module.exports = server;
