// import express just like React
const express = require("express");

// import the projects data base
const ActionDataBase = require("../data/helpers/actionModel.js");

// we need to use express Router goody 
const router = express.Router();

// // checkin if router is working
// router.get("/", (req, res) =>{
//     res.send("Hello from the action router");
// })

// Getting all actions here
router.get("/", (req, res) => {

    // Using get function from the data base to get all projects
    ActionDataBase.get()
    .then(response=> {
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: "Ok something went wrong with the server"
        });
    });
});




// exporting router here
module.exports = router;