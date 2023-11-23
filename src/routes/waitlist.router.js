const express = require("express");
const WaitlistControler = require("../controller/waitlist.controller");
const isLoggedIn = require("../middlewares/auth");

const Router = express.Router();

const Waitlist = new WaitlistControler();

// Add To waitlist
Router.post("/add", (req, res) => {
    const payload = req.body;
    Waitlist.add(res, payload);
});

module.exports = Router;