const express = require("express");
const MessageControler = require("../controller/message.controller");
const isLoggedIn = require("../middlewares/auth");

const Router = express.Router();

const Message = new MessageControler();

// Get Message
Router.get("/get/:visitorId", isLoggedIn, (req, res) => {
    const visitorId = req.params.visitorId;
    const limit = req.query.limit || 40;
    Message.getMessages(res, visitorId, undefined, limit);
});

// Get Message for Visitor
Router.get("/get/:userId/:visitorId", (req, res) => {
    const visitorId = req.params.visitorId;
    const id = req.params.userId;
    const limit = req.query.limit || 40;
    Message.getMessages(res, visitorId, id, limit);
});

//Send Message
Router.post("/send/:visitorId", isLoggedIn, (req, res) => {
    const visitorId = req.params.visitorId;
    let payload = req.body;
    console.log(payload);
    Message.sendMessage(res, payload,visitorId);
});

//Send Message for Visitor
Router.post("/send/:userId/:visitorId", (req, res) => {
    const userId = req.params.userId;
    let payload = req.body;
    payload.id = req.params.visitorId;
    Message.sendMessage(res, payload,userId);
});


module.exports = Router;