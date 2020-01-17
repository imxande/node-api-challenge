// import express just like React
const express = require("express");

// import the projects data base
const ProjectDataBase = require("../data/helpers/projectModel.js");

// we need to use express Router goody 
const router = express.Router();

router.get("/", (req, res) =>{
    res.send("Hello from the router");
})

// we need to export router (dont forget the s for exports)
module.exports = router;