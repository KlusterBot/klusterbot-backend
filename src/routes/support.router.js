const express = require("express");
const SupportControler = require("../controller/support.controller");
const isLoggedIn = require("../middlewares/auth");

const Router = express.Router();

const Support = new SupportControler();

// Get All Supports
Router.get("/all", isLoggedIn, (req, res) => {
    Support.getSupports(res);
});

// Get Single Support
Router.get("/:id", isLoggedIn, (req, res) => {
    const visitorId = req.params.id;
    Support.getSupport(res, visitorId);
});

// Update Support
Router.post("/update/:id", isLoggedIn, (req, res) => {
    const visitorId = req.params.id;
    const payload = req.body
    Support.updateSupport(res, visitorId, payload);
});

Router.post("/info/:id", (req, res) => {
    const visitorId = req.params.id;
    const payload = req.body
    Support.updateSupportInfo(res, visitorId, payload);
});

module.exports = Router;
