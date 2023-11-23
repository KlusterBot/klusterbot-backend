const express = require("express");
const VisitorControler = require("../controller/visitor.controller");
const isLoggedIn = require("../middlewares/auth");

const Router = express.Router();

const Visitor = new VisitorControler();

// Get All Visitors
Router.get("/all", isLoggedIn, (req, res) => {
    Visitor.getVisitors(res);
});

// Get Single Visitor
Router.get("/:id", isLoggedIn, (req, res) => {
    const visitorId = req.params.id;
    Visitor.getVisitor(res, visitorId);
});

// Update Visitor
Router.post("/update/:id", isLoggedIn, (req, res) => {
    const visitorId = req.params.id;
    const payload = req.body
    Visitor.updateVisitor(res, visitorId, payload);
});

Router.post("/info/:id", (req, res) => {
    const visitorId = req.params.id;
    const payload = req.body
    Visitor.updateVisitorInfo(res, visitorId, payload);
});

module.exports = Router;
