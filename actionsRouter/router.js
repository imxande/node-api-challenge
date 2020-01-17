// import express just like React
const express = require("express");

// import the Actions data base
const ActionDataBase = require("../data/helpers/actionModel.js");

// we need to use express Router goody 
const router = express.Router();

// // checkin if router is working
// router.get("/", (req, res) =>{
//     res.send("Hello from the action router");
// })

// Getting all actions here
router.get("/", (req, res) => {

    // Using get function from the data base to get all Actions
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


// to create a new Action
router.post("/:id", (req, res) =>{

     // I need to check if we have the id firts
     if(!req.params.id){
        // if no id then return a 404
        return res.status(404).json({errorMessage:"Action with such ID does not exist"})
    }

    // checking for name and description here
    else if(!req.body.description || !req.body.notes){
        // return a bad request
        return res.status(400).json({
            errorMessage: "Please provide description and notes for new action"
        })
    }
    // i need to use insert function here
    ActionDataBase.insert(req.body)
    .then(response =>{
        // return a create is successful 
        return res.status(200).json(response)
    })
    .catch(error =>{
        console.log(error)
        res.status(500).json("There is an error in the server")
    })
})

// / now i want to update the Action
router.put("/:id", (req, res) =>{
    // I need to check if we have the id firts
    if(!req.params.id){
        // if no id then return a 404
        return res.status(404).json({errorMessage:"Action with such ID does not exist"})
    }

    else if(!req.body.name || !req.body.description){
        // return a bad request
        return res.status(400).json({
            errorMessage: "Please provide name and description for new a Action"
        })
    }

    // im going to use update function provided to update the Action
    ActionDataBase.update(req.params.id, req.body)
        .then(response =>{
            // return successful status if it works 
            return res.status(200).json(response)
        })
        .catch(error =>{
            console.log(error)
            res.status(500).json("There is an error in the server while trying to update the Action")
        })
})

// need to delete Action here
router.delete("/:id", (req,res) =>{
     // I need to check if we have the id firts
     if(!req.params.id){
        // if no id then return a 404
        return res.status(404).json({errorMessage:"Action with such ID does not exist"})
    }
    ActionDataBase.remove(req.params.id)
        .then(response =>{
            return res.status(200).json({message : "Action deleted"})
        })
        .catch(error => {
            console.log(error);
            res.status(500).json("There is an error in the server while trying to delete the Action")
        })
})


// exporting router here
module.exports = router;