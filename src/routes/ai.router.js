const express = require("express");
const AIController = require("../controller/ai.controller");
const isLoggedIn = require("../middlewares/auth");

const Router = express.Router();

const AI = new AIController();

// Add New AI

Router.post("/add", isLoggedIn, (req, res) => {
    const payload = req.body;
    AI.add(res, payload);
});

// Delete AI

Router.post("/delete", isLoggedIn, (req, res) => {
    AI.delete(res);
});

// Start AI

Router.post("/start", isLoggedIn, (req, res) => {
    AI.start(res);
});

// Stop AI

Router.post("/stop", isLoggedIn, (req, res) => {
    AI.stop(res);
});

// Get AI Stats

Router.get("/stats", isLoggedIn, (req, res) => {
    AI.stats(res);
});

// Send Human Attention Notification Email

Router.post("/notify", (req, res) => {
    AI.notify(res);
});

module.exports = Router;
