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
            res.status(500).json("There is an error in the server while trying to update the project")
        })
})

// need to delete project here
router.delete("/:id", (req,res) =>{
     // I need to check if we have the id firts
     if(!req.params.id){
        // if no id then return a 404
        return res.status(404).json({errorMessage:"Project with such ID does not exist"})
    }
    ProjectDataBase.remove(req.params.id)
        .then(response =>{
            return res.status(200).json({message : "Project deleted"})
        })
        .catch(error => {
            console.log(error);
            res.status(500).json("There is an error in the server while trying to delete the project")
        })
})

// get project actions here 
router.get("/:id/actions", (req, res) => {

    ProjectDataBase.getProjectActions(req.params.id)
    .then(response => {
        if (!req.params.id) {
             // if no id return a 404
            return res.status(404).json({notice: "No project matches the specified ID "})
         } 
        else {
            // if everything is good then return a successful code status, and the response
           return  res.status(200).json(response);
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: "The actions information could not be found"
        })
    })
})
  
// we need to export router (dont forget the s for exports)
module.exports = router;

