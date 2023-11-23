const express = require("express");
const UserControler = require("../controller/user.controller");
const isLoggedIn = require("../middlewares/auth");

const Router = express.Router();

const User = new UserControler();

//Get User
Router.get("/:userId", (req, res) => {
    const userId = req.params.userId;
    User.getUser(res, userId);
});

module.exports = Router;
