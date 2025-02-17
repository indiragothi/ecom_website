const express = require("express");
// const { handleSignUp, handleSignIn, handleLogout } = require("../Controller/userscontroller");

const { registerUser, loginUser, logout, getalluser, deleteUser } = require("../Controller/usercontroller");
const user = express.Router();

user.post("/register", registerUser)
user.post("/login", loginUser)
user.get("/logout", logout)
user.get("/user", getalluser)
user.delete("/user/:id", deleteUser) 

// user.post("/register", handleSignUp)
// user.post("/login",  handleSignIn)
// user.get("/logout",  handleLogout)


module.exports = user;