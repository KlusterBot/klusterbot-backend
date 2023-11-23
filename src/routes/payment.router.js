const express = require("express");
const PaymentController = require("../controller/payment.controller");
const isLoggedIn = require("../middlewares/auth");
const Router = express.Router();

const Payment = new PaymentController();

// Verify Transaction
Router.get("/verify/:tranId", isLoggedIn, (req, res) => {
    const tranId = req.params.tranId;
    Payment.verify(req, res, tranId);
})

// get all link
Router.post("/event", (req, res) => {
    let payload = req.body;
    Payment.event(res, payload);
})


module.exports = Router;