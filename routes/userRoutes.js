const User = require("../models/User")
const express = require("express")
const { removeListener } = require("../models/User")

const router = express.Router()


//RETURN ALL USERS 
router.get("/", async (req, res)=>{
    try {
        const  allUsers = await User.find({})
        res.send(allUsers)
        
    } catch (error) {
        console.log(error)
        res.status(400).send({msg:"failed to get users"})
        
    }
})

//ADD A NEW USER TO THE DATABASE 
router.post("/addUser", async (req, res)=>{
    try {
        const existUSer = await User.findOne({name:req.body.name})
        if(existUSer){ return res.status(400).send({msg: "name already exist"})} 

        const newUser = new User({...req.body})
        await newUser.save()
        res.send({msg:"user added with succes", newUser})
    } catch (error) {
        console.log(error);
        res.status(400).send("fialed to save")
        
    }
})


//EDIT A USER BY ID 
router.put("/:id", async (req, res)=>{
    try {
        const editUser= await User.updateOne({_id: req.params.id}, {$set:{...req.body}})
        const newUser = await User.find({_id: req.params.id})
        if(editUser.modifiedCount){ return res.send({msg: "user updated", newUser})}
        res.status(400).send("user already edited")
    } catch (error) {
        console.log(error)
        res.status(400).send("failed to edit user")
    }
})


//REMOVE A USER BY ID 
router.delete("/:id", async(req, res)=>{
    try {
        const removeUser = await User.deleteOne({ _id: req.params.id})
        if(removeUser.deletedCount){ return res.send({msg:"User deleted"})}
        res.status(400).send({msg:" User is already deleted"})
    } catch (error) {
        console.log(error)
        res.status(400).send("failed to delete user")
        
    }
})

module.exports= router