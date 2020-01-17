// import express just like React
const express = require("express");

// import the projects data base
const ProjectDataBase = require("../data/helpers/projectModel.js");

// we need to use express Router goody 
const router = express.Router();

// checkin if router is working
// router.get("/", (req, res) =>{
//     res.send("Hello from the router");
// })

// i need to get all the projects here
router.get("/", (req, res) => {

    // Using get function from the data base to get all projects
    ProjectDataBase.get()
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

// to create a new project
router.post("/", (req, res) =>{

    // checking for name and description here
    if(!req.body.name || !req.body.description){
        // return a bad request
        return res.status(400).json({
            errorMessage: "Please provide name and description for new a project"
        })
    }
    // i need to use insert function here
    ProjectDataBase.insert(req.body)
    .then(response =>{
        // return a create is successful 
        return res.status(200).json(response)
    })
    .catch(error =>{
        console.log(error)
        res.status(500).json("There is an error in the server")
    })
})

// now i want to update the project
router.put("/:id", (req, res) =>{
    // I need to check if we have the id firts
    if(!req.params.id){
        // if no id then return a 404
        return res.status(404).json({errorMessage:"Project with such ID does not exist"})
    }

    else if(!req.body.name || !req.body.description){
        // return a bad request
        return res.status(400).json({
            errorMessage: "Please provide name and description for new a project"
        })
    }

    // im going to use update function provided to update the project
    ProjectDataBase.update(req.params.id, req.body)
        .then(response =>{
            // return successful status if it works 
            return res.status(200).json(response)
        })
        .catch(error =>{
            console.log(error)
            res.status(500).json("There is an error in the server while trying to update")
        })
})

// we need to export router (dont forget the s for exports)
module.exports = router;