const sendResponse = require("../helpers/response");
const Fetch = require("../utils/fetch");
const { genId } = require("../helpers");
const { sendMail } = require("../services/mailer");
const query = require("../helpers/query");

class WaitlistControler {
    async add(res, payload) {
        const { email, valid } = payload;
        const adminEmail = "ikorosamuel1@gmail.com";

        const result = await query("SELECT * FROM waitlist WHERE email = ?", [
            email,
        ]);

        if (result.length == 0 && valid) {
            const message = `Thank you for joining our waitlist.<br>
            You will be among the first to know when we go live.<br>`;
            await sendMail("👋", email, "Welcome to Kluster", message);

            // add to db
            await query("INSERT INTO waitlist(email,valid) VALUES(?,?)", [
                email,
                valid.toString(),
            ]);

            const toAdmin = `${email} Joined the waitlist!`;
            await sendMail("Admin", adminEmail, "Waitlist Alert", toAdmin);
            sendResponse(res, 200, true, "Added to Waitlist", "success");
        } else {
            sendResponse(res, 200, true, "Already in Waitlist", "already");
        }
    }
}

module.exports = WaitlistControler;
