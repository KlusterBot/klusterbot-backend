const express = require("express");
const MeControler = require("../controller/me.controller");
const isLoggedIn = require("../middlewares/auth");

const Router = express.Router();

const Me = new MeControler();

// Get my details
Router.get("/", isLoggedIn, (req, res) => {
    Me.getMe(res);
});

// Get calls
Router.get("/calls", isLoggedIn, (req, res) => {
    Me.getCalls(res);
});

//Update Me
Router.post("/update", isLoggedIn, (req, res) => {
    let payload = req.body;
    Me.updateMe(res, payload);
});

//Get User Triggers
Router.get("/triggers", isLoggedIn, (req, res) => {
    const { id } = req.user;
    Me.getTrigger(res, id);
});

//Get JS Static File
Router.get("/embed/:id/kluster.js", (req, res) => {
    const id = req.params.id;
    Me.getEmbed(res, id);
});

module.exports = Router;
