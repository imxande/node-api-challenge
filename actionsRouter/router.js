// import express just like React
const express = require("express");

// import the projects data base
const ActionDataBase = require("../data/helpers/actionModel.js");

// we need to use express Router goody 
const router = express.Router();

// checkin if router is working
router.get("/", (req, res) =>{
    res.send("Hello from the action router");
})



// exporting router here
module.exports = router;